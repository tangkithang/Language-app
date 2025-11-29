import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { pinyin } from 'pinyin-pro';
import type { PronunciationResult, WordEvaluation } from '../types';

export const evaluatePronunciation = async (
    subscriptionKey: string,
    serviceRegion: string,
    audioBlob: Blob,
    targetText: string
): Promise<PronunciationResult> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Create speech configuration
            const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
            speechConfig.speechRecognitionLanguage = 'zh-CN';

            // Create pronunciation assessment config
            const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
                targetText,
                sdk.PronunciationAssessmentGradingSystem.HundredMark,
                sdk.PronunciationAssessmentGranularity.Phoneme,
                true
            );
            pronunciationConfig.enableProsodyAssessment = true;
            pronunciationConfig.phonemeAlphabet = "IPA";

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

                        const overallScore = Math.round(
                            accuracyScore * 0.4 +
                            fluencyScore * 0.3 +
                            completenessScore * 0.2 +
                            prosodyScore * 0.1
                        );

                        const wordEvaluations: WordEvaluation[] = [];
                        const azureWords = pronunciationResult.detailResult?.Words || [];

                        // Use Intl.Segmenter to group characters into vocab words
                        const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' });
                        const segments = Array.from(segmenter.segment(targetText));

                        let azureWordIndex = 0;

                        for (const segment of segments) {
                            const vocabWord = segment.segment;
                            // Skip punctuation/whitespace segments if Azure didn't return them
                            // Azure usually returns only pronounced words. 
                            // We need to match vocabWord characters to azureWords characters.

                            const segmentChars = vocabWord.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''); // Keep only alphanumeric/hanzi
                            if (!segmentChars) continue; // Skip pure punctuation segments

                            const vocabSubWords: any[] = [];
                            let matchedChars = 0;

                            // Collect Azure words that make up this vocab
                            while (matchedChars < segmentChars.length && azureWordIndex < azureWords.length) {
                                const azWord = azureWords[azureWordIndex];
                                vocabSubWords.push(azWord);
                                matchedChars += azWord.Word.length;
                                azureWordIndex++;
                            }

                            if (vocabSubWords.length === 0) continue;

                            // Calculate Average Scores
                            const totalAccuracy = vocabSubWords.reduce((sum, w) => sum + (w.PronunciationAssessment?.AccuracyScore || 0), 0);
                            const avgAccuracy = totalAccuracy / vocabSubWords.length;

                            // Determine Error Type (Priority: Tone > Pronunciation > None)
                            // If any sub-word has an error, the whole vocab is marked? 
                            // Or maybe we only mark it if the average is low?
                            // Let's look at individual errors.
                            let vocabErrorType: 'tone' | 'pronunciation' | 'skipped' | 'insertion' | 'none' = 'none';

                            const hasToneError = vocabSubWords.some(w => w.PronunciationAssessment?.ErrorType?.includes('Tone'));
                            const hasPronError = vocabSubWords.some(w => w.PronunciationAssessment?.ErrorType === 'Mispronunciation');
                            const hasOmission = vocabSubWords.some(w => w.PronunciationAssessment?.ErrorType === 'Omission');
                            const hasInsertion = vocabSubWords.some(w => w.PronunciationAssessment?.ErrorType === 'Insertion');

                            if (hasOmission) vocabErrorType = 'skipped';
                            else if (hasInsertion) vocabErrorType = 'insertion';
                            else if (hasToneError) vocabErrorType = 'tone';
                            else if (hasPronError) vocabErrorType = 'pronunciation';

                            // Collect all phonemes
                            const allPhonemes = vocabSubWords.flatMap(w => w.Phonemes || []).map((p: any) => ({
                                phoneme: p.Phoneme,
                                accuracyScore: p.PronunciationAssessment?.AccuracyScore || 0,
                                isCorrect: (p.PronunciationAssessment?.AccuracyScore || 0) >= 80
                            }));

                            // Collect sub-word (character) evaluations
                            // We need to generate pinyin for each character. 
                            // Since we have the original characters in `vocabSubWords`, we can use them.
                            // Note: Azure might return multiple characters in one 'Word' object if it's a phrase.
                            // We MUST split them to ensure 1 box per character.
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

                            wordEvaluations.push({
                                word: vocabWord,
                                correct: avgAccuracy >= 80 && vocabErrorType === 'none',
                                errorType: vocabErrorType,
                                accuracyScore: avgAccuracy,
                                phonemes: allPhonemes,
                                subWords: subWords.map(s => ({ ...s, pinyin: '' })) // Placeholder pinyin, UI will generate
                            });
                        }

                        let comment = '';
                        if (overallScore >= 90) comment = '非常優秀！您的發音準確，語調自然，流暢度極佳。';
                        else if (overallScore >= 80) comment = '很好！發音基本準確，但有少數字詞的聲調需要改進。';
                        else if (overallScore >= 70) comment = '不錯！但有些字詞的發音和聲調需要多加練習。';
                        else if (overallScore >= 60) comment = '尚可。建議多聽標準發音，特別注意聲調變化。';
                        else comment = '需要加強練習。請仔細聽示範發音，注意每個字的聲調和發音方式。';

                        if (prosodyScore < 60) comment += ' 特別注意聲調的準確性。';
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

export const playTTS = (text: string, subscriptionKey: string, serviceRegion: string): void => {
    try {
        const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        speechConfig.speechSynthesisVoiceName = "zh-CN-XiaoxiaoNeural"; // Standard Mandarin voice
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

        synthesizer.speakTextAsync(
            text,
            (result) => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    // Success
                } else {
                    console.error("TTS Error:", result.errorDetails);
                }
                synthesizer.close();
            },
            (error) => {
                console.error("TTS Error:", error);
                synthesizer.close();
            }
        );
    } catch (error) {
        console.error("TTS Init Error:", error);
    }
};
