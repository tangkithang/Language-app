import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { pinyin } from 'pinyin-pro';
import type { PronunciationResult, WordEvaluation } from '../types';

export const evaluatePronunciation = async (
    subscriptionKey: string,
    serviceRegion: string,
    audioBlob: Blob,
    targetText: string,
    referenceWords?: string[],
    referencePinyin?: string[],
    scoringWeights?: {
        accuracy: number;
        fluency: number;
        completeness: number;
        prosody: number;
        wordThreshold?: number; // New: Threshold for marking a word as correct
    }
): Promise<PronunciationResult> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Create speech configuration
            const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
            // Set timeouts to prevent premature stopping
            // Initial silence: 10s to wait for user to start speaking
            // End silence: 15s to allow natural pauses during long readings
            speechConfig.setProperty(sdk.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, "10000");
            speechConfig.setProperty(sdk.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, "15000");
            // Segmentation silence: 5s (default is often lower) to allow slow reading without breaking sentences
            speechConfig.setProperty(sdk.PropertyId.Speech_SegmentationSilenceTimeoutMs, "5000");

            // Create pronunciation assessment config
            const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
                targetText,
                sdk.PronunciationAssessmentGradingSystem.HundredMark,
                sdk.PronunciationAssessmentGranularity.Phoneme,
                true
            );
            pronunciationConfig.enableProsodyAssessment = true;
            pronunciationConfig.phonemeAlphabet = "SAPI"; // Use SAPI to get Pinyin-like phonemes if possible, or IPA

            // Convert WebM Blob to PCM (16kHz, 16-bit, mono)
            const audioContext = new AudioContext();
            const arrayBuffer = await audioBlob.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            // Resample to 16000Hz if needed
            const offlineContext = new OfflineAudioContext(1, audioBuffer.duration * 16000, 16000);
            const source = offlineContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(offlineContext.destination);
            source.start(0);
            const resampledBuffer = await offlineContext.startRendering();

            // Convert Float32 to Int16
            const float32Data = resampledBuffer.getChannelData(0);
            const int16Data = new Int16Array(float32Data.length);
            for (let i = 0; i < float32Data.length; i++) {
                const s = Math.max(-1, Math.min(1, float32Data[i]));
                int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }

            // Create push stream
            const pushStream = sdk.AudioInputStream.createPushStream();
            pushStream.write(int16Data.buffer);
            pushStream.close();

            const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
            const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

            pronunciationConfig.applyTo(recognizer);

            recognizer.recognizeOnceAsync(
                (result) => {
                    if (result.reason === sdk.ResultReason.RecognizedSpeech) {
                        const pronunciationResult = sdk.PronunciationAssessmentResult.fromResult(result);
                        const accuracyScore = pronunciationResult.accuracyScore;
                        const fluencyScore = pronunciationResult.fluencyScore;
                        const completenessScore = pronunciationResult.completenessScore;
                        const prosodyScore = pronunciationResult.prosodyScore || 0;

                        // Custom Weighted Score
                        // Use provided weights or default to Accuracy-focused for Tutor Context
                        const weights = scoringWeights || {
                            accuracy: 0.8,
                            fluency: 0,
                            completeness: 0.2,
                            prosody: 0
                        };

                        // Normalize weights to ensure they sum to 1 (just in case)
                        const totalWeight = weights.accuracy + weights.fluency + weights.completeness + weights.prosody;
                        const norm = totalWeight > 0 ? totalWeight : 1;

                        const overallScore = Math.round(
                            (accuracyScore * weights.accuracy +
                                fluencyScore * weights.fluency +
                                completenessScore * weights.completeness +
                                prosodyScore * weights.prosody) / norm
                        );

                        const wordEvaluations: WordEvaluation[] = [];
                        const azureWords = pronunciationResult.detailResult?.Words || [];

                        // Use referenceWords if provided, otherwise use Intl.Segmenter
                        let segments: { segment: string }[] = [];

                        if (referenceWords && referenceWords.length > 0) {
                            segments = referenceWords.map(word => ({ segment: word }));
                        } else {
                            const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' });
                            segments = Array.from(segmenter.segment(targetText));
                        }

                        let azureWordIndex = 0;

                        for (const segment of segments) {
                            const vocabWord = segment.segment;
                            // Skip punctuation/whitespace segments if Azure didn't return them
                            // Azure usually returns only pronounced words. 
                            // We need to match vocabWord characters to azureWords characters.

                            const segmentChars = vocabWord.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''); // Keep only alphanumeric/hanzi

                            if (!segmentChars) {
                                // It is punctuation - add it but mark as punctuation
                                wordEvaluations.push({
                                    word: vocabWord,
                                    correct: true,
                                    errorType: 'none',
                                    accuracyScore: 0,
                                    phonemes: [],
                                    subWords: [],
                                    isPunctuation: true
                                });
                                continue;
                            }

                            const vocabSubWords: any[] = [];

                            // Collect Azure words that make up this vocab
                            // We need to be careful not to consume words if they don't match, 
                            // but since we are iterating sequentially, we assume Azure output follows text order.
                            // If Azure skipped a word, we won't find it.

                            // Peek at next Azure words to see if they match
                            let tempIndex = azureWordIndex;
                            let tempMatched = 0;
                            let foundMatch = false;

                            while (tempMatched < segmentChars.length && tempIndex < azureWords.length) {
                                const azWord = azureWords[tempIndex];
                                vocabSubWords.push(azWord);
                                tempMatched += azWord.Word.length;
                                tempIndex++;
                            }

                            // Simple check: if we found enough chars, assume match. 
                            // In reality, Azure might skip a word. 
                            // If we don't match enough chars, it might be a skip.
                            // BUT, since we have reference text, we can just consume whatever Azure gave us 
                            // that "looks like" it belongs here, or if we run out of Azure words, mark as skipped.

                            if (vocabSubWords.length > 0) {
                                // Commit the consumption
                                azureWordIndex = tempIndex;
                                foundMatch = true;
                            } else {
                                // No more Azure words, or mismatch?
                                // If we are here, it means we have a reference word but no corresponding Azure word.
                                foundMatch = false;
                            }

                            if (!foundMatch) {
                                // Mark as skipped
                                wordEvaluations.push({
                                    word: vocabWord,
                                    correct: false,
                                    errorType: 'skipped',
                                    accuracyScore: 0,
                                    phonemes: [],
                                    subWords: vocabWord.split('').map(c => ({
                                        char: c,
                                        pinyin: pinyin(c),
                                        accuracyScore: 0
                                    })),
                                    isPunctuation: false
                                });
                                continue;
                            }

                            // Calculate Average Scores
                            const totalAccuracy = vocabSubWords.reduce((sum, w) => sum + (w.PronunciationAssessment?.AccuracyScore || 0), 0);
                            const avgAccuracy = totalAccuracy / vocabSubWords.length;

                            // Determine Error Type (Priority: Tone > Pronunciation > None)
                            let vocabErrorType: 'tone' | 'pronunciation' | 'skipped' | 'insertion' | 'none' = 'none';

                            const hasToneError = vocabSubWords.some(w => w.PronunciationAssessment?.ErrorType?.includes('Tone'));
                            const hasPronError = vocabSubWords.some(w => w.PronunciationAssessment?.ErrorType === 'Mispronunciation');
                            const hasOmission = vocabSubWords.some(w => w.PronunciationAssessment?.ErrorType === 'Omission');
                            const hasInsertion = vocabSubWords.some(w => w.PronunciationAssessment?.ErrorType === 'Insertion');

                            if (hasOmission) vocabErrorType = 'skipped';
                            else if (hasInsertion) vocabErrorType = 'insertion';
                            else if (hasToneError) vocabErrorType = 'tone';
                            else if (hasPronError) vocabErrorType = 'pronunciation';

                            // Collect all phonemes (needed for pinyin priority logic)
                            const allPhonemes = vocabSubWords.flatMap(w => w.Phonemes || []).map((p: any) => ({
                                phoneme: p.Phoneme,
                                accuracyScore: p.PronunciationAssessment?.AccuracyScore || 0,
                                isCorrect: (p.PronunciationAssessment?.AccuracyScore || 0) >= 80
                            }));

                            // PINYIN PRIORITY LOGIC (Client-Side Override)
                            // If we have reference pinyin and there's a tone or pronunciation error,
                            // check if the user actually said the correct pinyin (for polyphonic characters)
                            if (referencePinyin && (vocabErrorType === 'tone' || vocabErrorType === 'pronunciation')) {
                                const segmentIndex = wordEvaluations.length; // Current index in our iteration
                                if (segmentIndex < referencePinyin.length) {
                                    const expectedPinyin = referencePinyin[segmentIndex];

                                    // Extract tone number from expected pinyin (e.g., "wéi" -> 2, "wèi" -> 4, "de" -> 5)
                                    const toneMap: { [key: string]: string } = {
                                        'ā': '1', 'á': '2', 'ǎ': '3', 'à': '4',
                                        'ē': '1', 'é': '2', 'ě': '3', 'è': '4',
                                        'ī': '1', 'í': '2', 'ǐ': '3', 'ì': '4',
                                        'ō': '1', 'ó': '2', 'ǒ': '3', 'ò': '4',
                                        'ū': '1', 'ú': '2', 'ǔ': '3', 'ù': '4',
                                        'ǖ': '1', 'ǘ': '2', 'ǚ': '3', 'ǜ': '4'
                                    };

                                    let expectedTone = '5'; // Default to neutral tone (5) if no mark found
                                    for (const char of expectedPinyin) {
                                        if (toneMap[char]) {
                                            expectedTone = toneMap[char];
                                            break;
                                        }
                                    }

                                    // Check if any phoneme in the recognized speech has this tone
                                    // SAPI phonemes often include tone numbers (e.g., "ni3", "hao3")
                                    const hasExpectedTone = allPhonemes.some(p => p.phoneme.includes(expectedTone));

                                    // If the user said the expected tone, override the error
                                    // Use the user's configured wordThreshold (or default 80) but lower it slightly (e.g. * 0.6)
                                    // because if Azure expected a different word, the accuracy score is naturally lower.
                                    // We want to catch "Right Tone, Wrong Word" scenarios.
                                    const overrideThreshold = (scoringWeights?.wordThreshold ?? 80) * 0.6;

                                    if (hasExpectedTone && avgAccuracy >= overrideThreshold) {
                                        vocabErrorType = 'none';
                                    }
                                }
                            }

                            // Collect sub-word (character) evaluations
                            const subWords: any[] = [];

                            vocabSubWords.forEach(w => {
                                const wordStr = w.Word;
                                const score = w.PronunciationAssessment?.AccuracyScore || 0;

                                if (wordStr.length > 1) {
                                    // Split into chars
                                    const chars = wordStr.split('');
                                    chars.forEach((c: string) => {
                                        subWords.push({
                                            char: c,
                                            pinyin: pinyin(c),
                                            accuracyScore: score // Inherit score
                                        });
                                    });
                                } else {
                                    subWords.push({
                                        char: wordStr,
                                        pinyin: pinyin(wordStr),
                                        accuracyScore: score
                                    });
                                }
                            });

                            // Use custom threshold or default to 80
                            const threshold = scoringWeights?.wordThreshold ?? 80;

                            wordEvaluations.push({
                                word: vocabWord,
                                correct: avgAccuracy >= threshold && vocabErrorType === 'none',
                                errorType: vocabErrorType,
                                accuracyScore: avgAccuracy,
                                phonemes: allPhonemes,
                                subWords: subWords.map(s => ({ ...s, pinyin: '' })) // Placeholder pinyin, UI will generate
                            });
                        }

                        let comment = '';
                        if (overallScore >= 90) comment = '非常優秀！您的發音非常準確。';
                        else if (overallScore >= 80) comment = '很好！發音基本準確，繼續保持。';
                        else if (overallScore >= 70) comment = '不錯！但有些字詞的聲調需要多加練習。';
                        else if (overallScore >= 60) comment = '尚可。建議多聽示範發音，注意聲調。';
                        else comment = '需要加強練習。請仔細聽示範發音，模仿每個字的讀音。';

                        if (completenessScore < 80) comment += ' 請確保完整讀出所有文字。';

                        resolve({
                            score: overallScore,
                            accuracyScore,
                            fluencyScore,
                            completenessScore,
                            prosodyScore,
                            comment,
                            languageDetected: 'Mandarin',
                            wordEvaluations
                        });
                    } else if (result.reason === sdk.ResultReason.NoMatch) {
                        reject(new Error('未能識別語音。請確保說話清晰，環境安靜。'));
                    } else {
                        reject(new Error(`語音識別失敗: ${result.errorDetails}`));
                    }
                    recognizer.close();
                },
                (error) => {
                    recognizer.close();
                    reject(new Error(`發音評估錯誤: ${error}`));
                }
            );
        } catch (error) {
            reject(new Error(`初始化錯誤: ${error}`));
        }
    });
};

export const playTTS = (
    text: string,
    subscriptionKey: string,
    serviceRegion: string,
    pinyinData?: string | { word: string; pinyin: string }[],
    onBoundary?: (e: sdk.SpeechSynthesisWordBoundaryEventArgs) => void,
    rate: number = 1.0
): sdk.SpeechSynthesizer => {
    let synthesizer: sdk.SpeechSynthesizer;
    try {
        const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        speechConfig.speechSynthesisVoiceName = "zh-CN-XiaoxiaoNeural"; // Standard Mandarin voice
        synthesizer = new sdk.SpeechSynthesizer(speechConfig);

        if (onBoundary) {
            synthesizer.wordBoundary = (_, e) => onBoundary(e);
        }

        // Convert rate to percentage string for SSML
        // e.g. 1.0 -> "+0%", 0.8 -> "-20%", 1.2 -> "+20%"
        const ratePct = Math.round((rate - 1) * 100);
        const rateStr = `${ratePct >= 0 ? '+' : ''}${ratePct}%`;

        let ssmlBody = '';

        if (pinyinData) {
            if (Array.isArray(pinyinData)) {
                // Construct SSML from array of words and pinyin
                ssmlBody = pinyinData.map(item => {
                    // If pinyin is provided and valid, use phoneme tag
                    if (item.pinyin && item.pinyin.trim()) {
                        return `<phoneme alphabet="x-microsoft-pinyin" ph="${item.pinyin}">${item.word}</phoneme>`;
                    }
                    // Otherwise just the text
                    return item.word;
                }).join('');
            } else {
                // Single string pinyin for the whole text
                ssmlBody = `<phoneme alphabet="x-microsoft-pinyin" ph="${pinyinData}">${text}</phoneme>`;
            }
        } else {
            // Standard text
            ssmlBody = text;
        }

        const ssml = `
            <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN">
                <voice name="zh-CN-XiaoxiaoNeural">
                    <prosody rate="${rateStr}">
                        ${ssmlBody}
                    </prosody>
                </voice>
            </speak>`;

        synthesizer.speakSsmlAsync(
            ssml,
            (result) => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    // Success
                } else {
                    console.error("TTS SSML Error:", result.errorDetails);
                }
                synthesizer.close();
            },
            (error) => {
                console.error("TTS SSML Error:", error);
                synthesizer.close();
            }
        );

        return synthesizer;
    } catch (error) {
        console.error("TTS Init Error:", error);
        if (synthesizer!) synthesizer!.close();
        throw error;
    }
};
