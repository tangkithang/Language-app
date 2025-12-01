import React, { useState, useRef, useEffect } from 'react';
import { evaluatePronunciation } from '../services/azureSpeechService';
import { groupSentencesIntoPages } from '../utils/textUtils';
import { formatPinyin, hasNeutralTone } from '../utils/pinyinUtils';
import type { AnalysisResult, PronunciationResult, ScriptSection } from '../types';
import { AudioVisualizer } from './AudioVisualizer';
import {
    Square, Mic, RotateCcw, Volume2,
    ChevronLeft, ChevronRight, X,
    Star, ArrowRight, HelpCircle,
    Settings, BookOpen, List, CheckCircle2, AlertCircle, Loader2, Trophy
} from 'lucide-react';
import { Confetti } from './Confetti';


const ScoreGauge = ({ score, shouldAnimate }: { score: number, shouldAnimate: boolean }) => {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        if (!shouldAnimate) return;

        let start = 0;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setDisplayScore(Math.round(start + (score - start) * ease));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [score, shouldAnimate]);

    let colorClass = 'text-rose-500';
    let strokeClass = 'text-rose-500';
    if (score >= 80) {
        colorClass = 'text-emerald-500';
        strokeClass = 'text-emerald-500';
    } else if (score >= 60) {
        colorClass = 'text-amber-500';
        strokeClass = 'text-amber-500';
    }

    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (displayScore / 100) * circumference;

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                {/* Background Circle */}
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-stone-100"
                />
                {/* Progress Circle */}
                <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={`${strokeClass} transition-all duration-300`}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-black ${colorClass}`}>
                    {displayScore}
                </span>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Page Score</span>
            </div>
        </div>
    );
};

interface ReaderProps {
    data: AnalysisResult;
    subscriptionKey: string;
    serviceRegion: string;
    selectedMicId: string;
    mode: 'reading' | 'vocab';
    devMode?: boolean;
    onComplete: (score: number) => void;
    onNextChapter?: () => void;
    onPrevChapter?: () => void;
    hasNextChapter?: boolean;
    nextChapterTitle?: string;
    previousChapterTitle?: string;
    pageIndex?: number;
    totalPages?: number;
    groupChapters?: { id: string; title: string }[];
    onJumpToChapter?: (chapterId: string) => void;
    onPageComplete?: (pageIndex: number, score: number) => void;
    savedPageScores?: Record<number, number>;
}

export const Reader: React.FC<ReaderProps> = ({ data, subscriptionKey, serviceRegion, selectedMicId, mode,
    devMode,
    onComplete,
    onNextChapter,
    onPrevChapter,
    hasNextChapter,
    previousChapterTitle,
    pageIndex,
    totalPages,
    groupChapters,
    onJumpToChapter,
    onPageComplete,
    savedPageScores
}) => {
    // Navigation State
    const [sectionIndex, setSectionIndex] = useState(0);
    const [showQuickNav, setShowQuickNav] = useState(false);
    const [showScoringDebugger, setShowScoringDebugger] = useState(false);
    const [scoringWeights, setScoringWeights] = useState({
        accuracy: 80,
        fluency: 0,
        completeness: 20,
        prosody: 0,
        wordThreshold: 80
    });
    // Local state for the mixer inputs
    const [tempWeights, setTempWeights] = useState(scoringWeights);
    const [mixerError, setMixerError] = useState<string | null>(null);

    // Sync temp weights when opening debugger
    useEffect(() => {
        if (showScoringDebugger) {
            setTempWeights(scoringWeights);
            setMixerError(null);
        }
    }, [showScoringDebugger]);
    const [flattenedSections, setFlattenedSections] = useState<ScriptSection[]>([]);

    // Interaction State
    const [status, setStatus] = useState<string>('IDLE');

    // Playback Highlight State
    const [activeWordIndex, setActiveWordIndex] = useState<number>(-1);
    const [countdown, setCountdown] = useState(3);
    const [playbackRate, setPlaybackRate] = useState<number>(1.0);

    // Audio/Recording Refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    // Result State
    const [evalResult, setEvalResult] = useState<PronunciationResult | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);

    // XP & Celebration State
    // XP is now managed    // UI State
    const [showCelebration, setShowCelebration] = useState(false);
    const [xpGained, setXpGained] = useState(0);
    const [showScoringGuide, setShowScoringGuide] = useState(false);
    const [, setIsAnimatingXp] = useState(false);
    const [isPlayingRecording, setIsPlayingRecording] = useState(false);
    const [isStarBouncing, setIsStarBouncing] = useState(false);


    // Flatten sections into pages on mount/data change
    useEffect(() => {
        if (!data || !data.sections) return;

        const newSections: ScriptSection[] = [];

        data.sections.forEach(section => {
            // Group sentences into pages of max 60 chars (approx 20-30s reading)
            const pages = groupSentencesIntoPages(section.sentences, 60);

            pages.forEach((pageSentences: any[]) => {
                newSections.push({
                    speaker: section.speaker,
                    sentences: pageSentences
                });
            });
        });

        setFlattenedSections(newSections);
        setSectionIndex(0);
    }, [data]);

    const currentSection = flattenedSections[sectionIndex] || { sentences: [], speaker: '' };
    const currentTokens = currentSection.sentences.flatMap(s => s.tokens);
    // Construct fullText from tokens to ensure 1:1 mapping for highlighting


    useEffect(() => {
        // Reset state when section changes
        stopAudio();
        setStatus('IDLE');
        setEvalResult(null);
        setUserAudioUrl(null);
    }, [sectionIndex]);

    useEffect(() => {
        // Reset state when chapter changes (data changes)
        setSectionIndex(0);
        stopAudio();
        setStatus('IDLE');
        setEvalResult(null);
        setUserAudioUrl(null);
    }, [data]);

    useEffect(() => {
        return () => {
            stopAudio();
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            if (userAudioUrl) {
                URL.revokeObjectURL(userAudioUrl);
            }
        };
    }, []);

    const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const ttsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const stopAudio = () => {
        window.speechSynthesis.cancel();
        if (ttsTimeoutRef.current) {
            clearTimeout(ttsTimeoutRef.current);
            ttsTimeoutRef.current = null;
        }
        if (userAudioPlayerRef.current) {
            userAudioPlayerRef.current.pause();
            userAudioPlayerRef.current.currentTime = 0;
            userAudioPlayerRef.current = null;
        }
        if (status === 'PLAYING') {
            setStatus('IDLE');
        }
        setActiveWordIndex(-1);
    };

    // --- TTS LOGIC ---
    const speakWord = (text: string, pinyin?: string) => {
        if (status !== 'IDLE' && status !== 'FEEDBACK') return;
        window.speechSynthesis.cancel();

        // Use formatted pinyin if available, otherwise text
        // Hybrid Strategy:
        // 1. If word has neutral tone (no tone mark), use Hanzi (text) to let TTS infer.
        // 2. If word has full tones, use Pinyin to force accuracy (polyphones).
        let textToSpeak = text;
        if (pinyin) {
            const syllables = formatPinyin(text, pinyin);
            // Check if ANY syllable is neutral (no tone mark)
            const hasNeutral = syllables.some(s => hasNeutralTone(s));

            if (hasNeutral) {
                // Use Hanzi for neutral tones
                textToSpeak = text;
            } else {
                // Use space-separated pinyin for full tones
                textToSpeak = syllables.join(' ');
            }
        }

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'zh-CN';
        const voices = window.speechSynthesis.getVoices();
        const bestVoice = voices.find(v =>
            (v.lang === 'zh-CN' || v.lang === 'zh_CN') &&
            (v.name.includes('Xiaoxiao') || v.name.includes('Yunxi') || v.name.includes('Google'))
        );
        if (bestVoice) utterance.voice = bestVoice;
        window.speechSynthesis.speak(utterance);
    };

    const playDemo = (rateOverride?: number) => {
        stopAudio();
        setStatus('PLAYING');

        const rateToUse = rateOverride !== undefined ? rateOverride : playbackRate;
        let currentIndex = 0;

        const speakNextToken = () => {
            if (currentIndex >= currentTokens.length) {
                setStatus('IDLE');
                setActiveWordIndex(-1);
                return;
            }

            // Check if stopped (status changed externally or stopAudio called)
            // Note: status ref might be needed if closure captures old status, 
            // but since we clear timeout in stopAudio, this should be safe.

            setActiveWordIndex(currentIndex);
            const token = currentTokens[currentIndex];

            // Strip bracketed pinyin from hanzi (e.g. "行 (xíng)" -> "行")
            const cleanHanzi = token.hanzi.replace(/\s*\(.*?\)/, '');
            let textToSpeak = cleanHanzi;

            if (token.pinyin) {
                const syllables = formatPinyin(cleanHanzi, token.pinyin);
                const hasNeutral = syllables.some(s => hasNeutralTone(s));
                if (!hasNeutral) {
                    textToSpeak = syllables.join(' ');
                }
            }

            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'zh-CN';
            utterance.rate = rateToUse * 0.9;

            const voices = window.speechSynthesis.getVoices();
            const bestVoice = voices.find(v =>
                (v.lang === 'zh-CN' || v.lang === 'zh_CN') &&
                (v.name.includes('Xiaoxiao') || v.name.includes('Yunxi') || v.name.includes('Google'))
            );
            if (bestVoice) utterance.voice = bestVoice;

            utterance.onend = () => {
                currentIndex++;
                // Add pause before next word
                ttsTimeoutRef.current = setTimeout(() => {
                    speakNextToken();
                }, 100); // 0.6s pause
            };

            utterance.onerror = (e) => {
                console.error("TTS Error:", e);
                setStatus('IDLE');
                setActiveWordIndex(-1);
            };

            utteranceRef.current = utterance;
            window.speechSynthesis.speak(utterance);
        };

        speakNextToken();
    };

    const playUserRecording = () => {
        stopAudio(); // Stop any existing audio/TTS
        if (!userAudioUrl) return;
        const audio = new Audio(userAudioUrl);
        userAudioPlayerRef.current = audio;
        setIsPlayingRecording(true);
        audio.onended = () => {
            userAudioPlayerRef.current = null;
            setIsPlayingRecording(false);
        };
        audio.play();
    };

    // --- RECORDING LOGIC ---
    const startPracticeSequence = () => {
        stopAudio();
        setStatus('COUNTDOWN');
        setCountdown(3);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setStatus('RECORDING');
                    beginRecording();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const beginRecording = async () => {
        try {
            const constraints = {
                audio: selectedMicId ? { deviceId: { exact: selectedMicId } } : true
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            setMediaStream(stream);
            // Use webm for best browser compatibility
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.start();
            setStatus('RECORDING');

            // Start Timer
            // const initialTime = mode === 'vocab' ? 45 : 60; // Removed timer logic
            // setTimeLeft(initialTime); // Removed timer logic
        } catch (e) {
            console.error(e);
            setErrorMsg("Microphone access denied");
            setStatus('IDLE');
        }
    };



    const calculateXp = (score: number) => {
        if (score >= 90) return 20;
        if (score >= 80) return 15;
        if (score >= 70) return 10;
        if (score >= 60) return 5;
        return 0;
    };

    const finishRecording = () => {
        if (!mediaRecorderRef.current) return;

        setStatus('ANALYZING');

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

            if (userAudioUrl) URL.revokeObjectURL(userAudioUrl);
            const url = URL.createObjectURL(audioBlob);
            setUserAudioUrl(url);

            // Stop tracks
            mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
            setMediaStream(null);

            try {
                const cleanText = currentTokens.map(t => t.hanzi.replace(/\s*\(.*?\)/, '')).join('');
                const referenceWords = currentTokens.map(t => t.hanzi.replace(/\s*\(.*?\)/, ''));
                const referencePinyin = currentTokens.map(t => t.pinyin);

                const result = await evaluatePronunciation(
                    subscriptionKey,
                    serviceRegion,
                    audioBlob,
                    cleanText,
                    referenceWords,
                    referencePinyin,
                    {
                        accuracy: scoringWeights.accuracy / 100,
                        fluency: scoringWeights.fluency / 100,
                        completeness: scoringWeights.completeness / 100,
                        prosody: scoringWeights.prosody / 100,
                        wordThreshold: scoringWeights.wordThreshold
                    }
                );
                setEvalResult(result);
                setStatus('FEEDBACK');
                setIsStarBouncing(true);
                setTimeout(() => setIsStarBouncing(false), 3000); // Stop bouncing after ~3s (3 bounces)

                // Calculate XP and Notify Parent
                // Call onComplete callback
                const score = result.score;
                onComplete(score);

                // Call onPageComplete if available (for passage progress)
                // Use sectionIndex + 1 since it's 0-indexed but we want 1-indexed for display
                if (onPageComplete && mode === 'reading') {
                    onPageComplete(sectionIndex + 1, score);
                }

                const xp = calculateXp(score);
                setXpGained(xp);

                if (xp > 0) {
                    setShowCelebration(true);
                    setIsAnimatingXp(true);
                    setTimeout(() => setIsAnimatingXp(false), 1000);
                    setTimeout(() => setShowCelebration(false), 5000);
                } else {
                    // Low score feedback
                    setShowCelebration(true); // Show "Try Again" modal
                }
            } catch (e) {
                console.error(e);
                setErrorMsg("Analysis failed. Please check your Azure keys and try again.");
                setStatus('IDLE');
            }
        };

        mediaRecorderRef.current.stop();
    };



    // Reset state when data changes (e.g., moving to a new section/chapter)
    useEffect(() => {
        setStatus('IDLE');
        setErrorMsg(null);
        setEvalResult(null);
        if (userAudioUrl) {
            URL.revokeObjectURL(userAudioUrl);
            setUserAudioUrl(null);
        }
        setXpGained(0);
        setShowCelebration(false);
        setActiveWordIndex(-1);
        // Ensure any active recording/playback is stopped
        stopAudio();
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    }, [data]);

    // --- RENDER ---
    return (
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full flex flex-col relative">
            {/* Header */}
            <div className="bg-white border-b border-stone-100 p-6 flex justify-between items-center z-10 relative">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-stone-800">{data.title || "Practice"}</h2>
                            {devMode && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full border border-amber-200 uppercase tracking-wider">
                                    Dev Mode
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">
                                {totalPages && totalPages > 1
                                    ? `Page ${pageIndex} / ${totalPages}`
                                    : `Section ${sectionIndex + 1} / ${flattenedSections.length}`
                                }
                            </p>
                            {/* Progress Bar */}
                            <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
                                    style={{
                                        width: `${totalPages && totalPages > 1
                                            ? (pageIndex! / totalPages) * 100
                                            : ((sectionIndex + 1) / flattenedSections.length) * 100}%`
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Quick Nav Button */}
                    {groupChapters && groupChapters.length > 1 && (
                        <div className="relative">
                            {/* Scoring Mixer Toggle */}
                            <div className="fixed bottom-4 left-4 z-50 flex gap-2">
                                <button
                                    onClick={() => setShowScoringDebugger(!showScoringDebugger)}
                                    className={`p-2 rounded-full shadow-lg transition-colors ${showScoringDebugger ? 'bg-indigo-500 text-white' : 'bg-white text-stone-400 border border-stone-200'}`}
                                    title="Scoring Mixer"
                                >
                                    <Settings size={20} />
                                </button>
                            </div>

                            {/* Scoring Debugger Panel */}
                            {showScoringDebugger && (
                                <div className="fixed bottom-20 left-4 z-50 bg-white p-6 rounded-xl shadow-2xl border border-stone-200 w-72 animate-in slide-in-from-bottom-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-bold text-stone-800 flex items-center gap-2">
                                            <Settings size={16} /> Scoring Mixer
                                        </h4>
                                        <button onClick={() => setShowScoringDebugger(false)} className="text-stone-400 hover:text-stone-600">
                                            <X size={16} />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {Object.entries(tempWeights).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-stone-600 capitalize w-24">
                                                    {key === 'wordThreshold' ? 'Word Pass' : key}
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={value}
                                                        onChange={(e) => {
                                                            const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                                                            setTempWeights(prev => ({ ...prev, [key]: val }));
                                                            setMixerError(null);
                                                        }}
                                                        className="w-16 px-2 py-1 text-right border border-stone-300 rounded-md text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                                                    />
                                                    <span className="text-stone-400 text-xs">%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-stone-100">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-bold text-stone-500 uppercase">Total Score Mix</span>
                                            <span className={`font-mono font-bold ${(tempWeights.accuracy + tempWeights.fluency + tempWeights.completeness + tempWeights.prosody) === 100
                                                ? 'text-emerald-600'
                                                : 'text-rose-500'
                                                }`}>
                                                {tempWeights.accuracy + tempWeights.fluency + tempWeights.completeness + tempWeights.prosody}%
                                            </span>
                                        </div>

                                        {mixerError && (
                                            <div className="mb-3 p-2 bg-rose-50 text-rose-600 text-xs rounded-lg flex items-start gap-2">
                                                <AlertCircle size={14} className="mt-0.5 flex-none" />
                                                {mixerError}
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    const sum = tempWeights.accuracy + tempWeights.fluency + tempWeights.completeness + tempWeights.prosody;
                                                    if (sum !== 100) {
                                                        setMixerError(`Score Mix must be 100% (Current: ${sum}%)`);
                                                        return;
                                                    }
                                                    setScoringWeights(tempWeights);
                                                    setShowScoringDebugger(false);
                                                }}
                                                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setTempWeights({ accuracy: 80, fluency: 0, completeness: 20, prosody: 0, wordThreshold: 80 });
                                                    setMixerError(null);
                                                }}
                                                className="px-3 py-2 bg-stone-100 text-stone-600 rounded-lg text-sm font-bold hover:bg-stone-200 transition-colors"
                                                title="Reset to Default"
                                            >
                                                <RotateCcw size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={() => setShowQuickNav(!showQuickNav)}
                                className="p-2 hover:bg-stone-100 rounded-full text-stone-500 transition-colors"
                                title="Quick Navigation"
                            >
                                <List size={20} />
                            </button>

                            {/* Dropdown Menu */}
                            {showQuickNav && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowQuickNav(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50 max-h-[60vh] overflow-y-auto">
                                        {groupChapters.map((chapter, idx) => {
                                            // Check if this is the current chapter
                                            // We don't have current chapter ID passed directly, but we can infer from title or pass it
                                            // For now, let's assume we can match by title or just list them
                                            const isCurrent = chapter.title === data.title;

                                            return (
                                                <button
                                                    key={chapter.id}
                                                    onClick={() => {
                                                        onJumpToChapter?.(chapter.id);
                                                        setShowQuickNav(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 hover:bg-stone-50 transition-colors flex items-center gap-3 ${isCurrent ? 'bg-indigo-50 text-indigo-600' : 'text-stone-600'}`}
                                                >
                                                    <span className="text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 flex-none">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="text-sm font-medium line-clamp-1">{chapter.title}</span>
                                                    {isCurrent && <CheckCircle2 size={14} className="ml-auto flex-none" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    {/* XP Display */}
                    {/* XP Display Removed from here, now in global header */}

                    {/* Navigation */}
                    <div className="flex items-center bg-stone-100 rounded-full p-1">
                        <button
                            onClick={() => {
                                if (sectionIndex > 0) {
                                    setSectionIndex(sectionIndex - 1);
                                } else if (onPrevChapter) {
                                    onPrevChapter();
                                }
                            }}
                            disabled={(sectionIndex === 0 && !onPrevChapter) || status === 'RECORDING'}
                            className="p-2 rounded-full hover:bg-stone-200 disabled:opacity-30 transition-colors"
                            aria-label="Previous"
                            title={
                                sectionIndex > 0
                                    ? "Previous Section"
                                    : previousChapterTitle
                                        ? `Previous Chapter: ${previousChapterTitle}`
                                        : "No Previous Chapter"
                            }
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => {
                                if (sectionIndex < flattenedSections.length - 1) {
                                    setSectionIndex(sectionIndex + 1);
                                } else if (onNextChapter) {
                                    onNextChapter();
                                }
                            }}
                            disabled={sectionIndex === flattenedSections.length - 1 && !onNextChapter}
                            className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-full hover:bg-stone-700 disabled:opacity-30 transition-all shadow-sm hover:shadow-md"
                            title={
                                sectionIndex < flattenedSections.length - 1
                                    ? "Next Section"
                                    : (totalPages && totalPages > 1 && pageIndex && pageIndex < totalPages)
                                        ? "Next Page"
                                        : "Next Chapter"
                            }
                        >
                            <span className="text-sm font-bold">
                                {sectionIndex < flattenedSections.length - 1
                                    ? "Next Section"
                                    : (totalPages && totalPages > 1 && pageIndex && pageIndex < totalPages)
                                        ? "Next Page"
                                        : "Next Chapter"
                                }
                            </span>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Split Layout-Stack on mobile, side-by-side on desktop */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-hidden relative p-3 md:p-4">



                {/* FULL SCREEN FEEDBACK OVERLAY */}


                {/* LEFT PANEL: Text Display */}
                <div className="flex-1 lg:min-w-0 bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 flex flex-col overflow-hidden relative order-2 lg:order-1">

                    {/* Error Banner */}
                    {errorMsg && (
                        <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-sm p-2 flex items-center justify-center gap-2 z-50">
                            <AlertCircle size={14} /> {errorMsg}
                            <button onClick={() => setErrorMsg(null)} className="underline opacity-80 hover:opacity-100">Dismiss</button>
                        </div>
                    )}

                    {/* CONTENT AREA */}
                    <div className="flex-1 relative overflow-y-auto overflow-x-hidden p-3 md:p-5 flex flex-col items-center pb-40">

                        {/* Countdown Overlay (Global) */}
                        {status === 'COUNTDOWN' && (
                            <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                                <div className="text-9xl font-black text-indigo-600 animate-bounce">
                                    {countdown}
                                </div>
                            </div>
                        )}



                        {/* Loading Overlay */}
                        {status === 'ANALYZING' && (
                            <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none" role="status" aria-live="polite">
                                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                                <span className="text-stone-500 font-medium">Examiner is grading...</span>
                            </div>
                        )}

                        {/* TEXT DISPLAY */}
                        <div className="w-full max-w-4xl font-serif-sc text-3xl md:text-4xl leading-snug flex flex-wrap justify-center gap-x-2 gap-y-3">
                            {currentTokens.map((token, idx) => {
                                const isActive = status === 'PLAYING' && activeWordIndex === idx;
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center relative group cursor-pointer"
                                        onClick={() => {
                                            // Strip bracketed pinyin from hanzi for TTS (e.g. "行 (xíng)" -> "行")
                                            // This ensures TTS doesn't read the brackets if it falls back to Hanzi
                                            const cleanHanzi = token.hanzi.replace(/\s*\(.*?\)/, '');
                                            speakWord(cleanHanzi, token.pinyin);
                                        }}
                                    >
                                        {/* Pinyin above-Hidden during recording but keeps space */}
                                        {/* Exception: Always show pinyin for Polyphonic sections so user knows which tone to read */}
                                        <span className={`
                                            text-sm font-sans mb-1 transition-all duration-200 select-none
                                            ${isActive ? 'text-indigo-600 font-bold scale-110' : 'text-stone-400 group-hover:text-indigo-400'}
                                            ${status === 'RECORDING' && !data.title?.toLowerCase().includes('polyphonic') && !data.title?.includes('多音字') ? 'opacity-0' : 'opacity-100'}
                                        `}>
                                            {token.pinyin}
                                        </span>
                                        {/* Hanzi */}
                                        <span className={`
px-1 rounded transition-colors duration-200
                                ${isActive ? 'bg-indigo-100 text-indigo-900 shadow-sm ring-2 ring-indigo-200' : 'text-stone-800 group-hover:text-indigo-600'}
`}>
                                            {/* Strip bracketed pinyin for display */}
                                            {token.hanzi.replace(/\s*\(.*?\)/, '')}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Spacer */}
                        <div className="h-8 w-full flex-none"></div>
                    </div>

                </div>

                {/* RIGHT PANEL: Controls */}
                <div className="w-full lg:w-80 flex-none flex flex-col gap-4 order-1 lg:order-2">

                    {/* Control Card */}
                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 p-6 flex flex-col items-center gap-4 relative overflow-hidden">

                        {/* Status Header */}
                        <div className="w-full text-center border-b border-stone-100 pb-2">
                            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest">Controls</h3>
                        </div>

                        {/* Timer Display - REMOVED */}
                        <div className="h-4 flex items-center justify-center w-full">
                            {/* Spacer */}
                        </div>

                        {/* Main Action Button */}
                        <div className="relative flex flex-col items-center gap-2 h-32 justify-center">
                            {status !== 'FEEDBACK' && (
                                <>
                                    <div className="h-24 flex items-center justify-center">
                                        <button
                                            onClick={status === 'RECORDING' ? finishRecording : startPracticeSequence}
                                            disabled={status === 'ANALYZING' || status === 'COUNTDOWN' || status === 'PLAYING'}
                                            className={`
                                                rounded-full flex items-center justify-center shadow-xl transition-all font-bold text-lg
                                                ${status === 'RECORDING'
                                                    ? 'w-24 h-24 bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                                                    : 'w-24 h-24 bg-stone-900 text-white hover:bg-black hover:scale-105 shadow-stone-300'
                                                }
                                                ${(status === 'ANALYZING' || status === 'PLAYING') ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                                            `}
                                        >
                                            {status === 'RECORDING' ? (
                                                <Square size={32} fill="currentColor" aria-label="Stop Recording" />
                                            ) : (
                                                <Mic size={36} aria-label="Start Recording" />
                                            )}
                                        </button>
                                    </div>
                                    <span className={`text-xs font-bold text-stone-400 uppercase tracking-wide transition-opacity duration-200 ${status === 'RECORDING' ? 'opacity-0' : 'opacity-100'}`}>
                                        Practice Speaking
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Playback Controls */}
                        <div className="w-full flex flex-col items-center gap-3 pt-2">
                            {status !== 'RECORDING' && status !== 'ANALYZING' && status !== 'FEEDBACK' && (
                                <>
                                    <button
                                        onClick={() => status === 'PLAYING' ? stopAudio() : playDemo()}
                                        disabled={status === 'COUNTDOWN'}
                                        className={`
w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all
                                            ${status === 'PLAYING'
                                                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                            }
`}
                                    >
                                        {status === 'PLAYING' ? (
                                            <>
                                                <Square size={16} fill="currentColor" /> Stop Audio
                                            </>
                                        ) : (
                                            <>
                                                <Volume2 size={18} /> Listen to Demo
                                            </>
                                        )}
                                    </button>

                                    {/* Speed Control */}
                                    <div className="flex w-full bg-stone-100 p-1 rounded-lg">
                                        {[1, 0.75, 0.5].map((rate) => (
                                            <button
                                                key={rate}
                                                onClick={() => {
                                                    setPlaybackRate(rate);
                                                    if (status === 'PLAYING') {
                                                        playDemo(rate);
                                                    }
                                                }}
                                                className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all ${playbackRate === rate
                                                    ? 'bg-white text-indigo-600 shadow-sm'
                                                    : 'text-stone-400 hover:text-stone-600'
                                                    } `}
                                            >
                                                {rate}x
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Visualizer Card */}
                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 p-4 h-28 flex-none flex flex-col relative overflow-hidden">
                        <div className="absolute top-3 left-0 w-full text-center z-10">
                            <h3 className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Waveform</h3>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            {status === 'RECORDING' ? (
                                <div className="w-full h-full opacity-90">
                                    <AudioVisualizer mediaStream={mediaStream} isRecording={status === 'RECORDING'} />
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-stone-300">
                                    <div className="h-1 w-1 bg-current rounded-full"></div>
                                    <div className="h-2 w-1 bg-current rounded-full"></div>
                                    <div className="h-4 w-1 bg-current rounded-full"></div>
                                    <div className="h-2 w-1 bg-current rounded-full"></div>
                                    <div className="h-1 w-1 bg-current rounded-full"></div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>

            {/* CELEBRATION OVERLAY (Full Screen) */}
            {
                showCelebration && (
                    <div
                        className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer bg-white/80 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setShowCelebration(false)}
                    >
                        <Confetti />
                        <div className={`bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 ${xpGained > 0 ? 'border-yellow-400' : 'border-stone-200'} flex flex-col items-center animate-in zoom-in-50 duration-500 pointer-events-none`}>
                            {xpGained > 0 ? (
                                <>
                                    <Trophy className="w-24 h-24 text-yellow-500 mb-4 animate-bounce" />
                                    <h2 className="text-3xl font-black text-stone-800 mb-2">Lesson Complete!</h2>
                                    <div className="text-5xl font-black text-yellow-500 mb-2">+{xpGained} XP</div>
                                    <p className="text-stone-500 font-bold">Keep up the great work!</p>
                                </>
                            ) : (
                                <>
                                    <RotateCcw className="w-24 h-24 text-stone-400 mb-4" />
                                    <h2 className="text-3xl font-black text-stone-800 mb-2">Keep Practicing!</h2>
                                    <div className="text-5xl font-black text-stone-300 mb-2">0 XP</div>
                                    <p className="text-stone-500 font-bold">Try again to earn XP!</p>
                                </>
                            )}
                            <p className="text-stone-400 text-xs mt-4 font-medium">(Click anywhere to dismiss)</p>
                        </div>
                    </div>
                )
            }

            {/* FULL SCREEN FEEDBACK OVERLAY */}
            {
                status === 'FEEDBACK' && evalResult && (
                    <div className="absolute inset-0 z-40 bg-stone-50 animate-in fade-in zoom-in-95 duration-300 flex flex-col overflow-hidden">
                        {/* Fixed Header & Stats Wrapper */}
                        <div className="flex-none flex flex-col gap-6 p-6 md:p-8 border-b border-stone-200/50 bg-white/80 backdrop-blur-md z-10 shadow-sm">
                            {/* Header & Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div>
                                    <h2 className="text-3xl font-black text-stone-800 mb-1">Practice Complete!</h2>
                                    <p className="text-stone-500 font-medium">Here's how you performed</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            if (isPlayingRecording) {
                                                stopAudio();
                                                setIsPlayingRecording(false);
                                            } else {
                                                playUserRecording();
                                            }
                                        }}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 rounded-lg font-bold text-sm text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all"
                                        aria-label={isPlayingRecording ? "Stop Playing" : "Hear Recording"}
                                    >
                                        {isPlayingRecording ? (
                                            <>
                                                <Square size={16} /> Stop Playing
                                            </>
                                        ) : (
                                            <>
                                                <Volume2 size={16} /> Hear Recording
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => {
                                            stopAudio();
                                            setStatus('IDLE');
                                        }}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 rounded-lg font-bold text-sm text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all"
                                        aria-label="Retry"
                                    >
                                        <RotateCcw size={16} /> Retry
                                    </button>
                                    <button
                                        onClick={() => {
                                            stopAudio();
                                            if (sectionIndex < data.sections.length - 1) {
                                                setSectionIndex(prev => prev + 1);
                                                // setStatus('IDLE') handled by effect
                                            } else if (onNextChapter) {
                                                // Reset state for next chapter
                                                // setSectionIndex(0) handled by effect on data change if parent updates data
                                                // But if parent just changes props, we might need to trigger it.
                                                // Actually, onNextChapter likely changes 'data' prop.
                                                onNextChapter();
                                            } else {
                                                setStatus('IDLE');
                                                setEvalResult(null);
                                            }
                                        }}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-lg font-bold text-sm hover:bg-black hover:scale-105 shadow-lg shadow-stone-200"
                                        aria-label={
                                            sectionIndex < data.sections.length - 1
                                                ? "Next Section"
                                                : hasNextChapter
                                                    ? "Next Chapter"
                                                    : "Finish"
                                        }
                                    >
                                        {sectionIndex < data.sections.length - 1 ? (
                                            <>Next <ArrowRight size={16} /></>
                                        ) : hasNextChapter ? (
                                            <>Next Chapter <ArrowRight size={16} /></>
                                        ) : (
                                            <>Finish <ArrowRight size={16} /></>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Overall Score */}
                                {/* Overall Score & XP */}
                                <div className="col-span-2 flex items-center justify-center gap-6 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
                                    <ScoreGauge score={Math.round(evalResult.score)} shouldAnimate={!showCelebration} />
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="text-xs font-bold text-stone-400 uppercase tracking-widest">XP Earned</div>
                                        <div className="flex items-center gap-2 text-yellow-500">
                                            <Star size={28} fill="currentColor" className={isStarBouncing ? "animate-bounce" : ""} />
                                            <span className="text-4xl font-black">+{xpGained}</span>
                                        </div>
                                        {totalPages && totalPages > 1 && (
                                            <div className="text-xs text-stone-400 font-medium mt-1">
                                                Section {sectionIndex + 1} of {totalPages}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Time Used - REMOVED */}

                                {/* Accuracy (Hidden/Extra) - Placeholder for layout balance if needed, or just keep 2 cols on mobile, 4 on desktop? 
                                Let's stick to the 2 main stats for now, maybe make them wider on desktop.
                            */}

                                {/* Page Progress Tracker */}
                                {totalPages && totalPages > 1 && (
                                    <div className="col-span-2 md:col-span-4 flex flex-col gap-2 bg-white rounded-2xl p-4 border border-stone-100 shadow-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Passage Progress</span>
                                            <span className="text-xs font-bold text-stone-600">{Object.keys(savedPageScores || {}).length} / {totalPages} Completed</span>
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                                                const score = savedPageScores?.[p];
                                                const isCurrent = p === (sectionIndex + 1);
                                                const isDone = score !== undefined;

                                                return (
                                                    <div
                                                        key={p}
                                                        className={`
                                                            flex-none w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border
                                                            ${isCurrent ? 'border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-200' : ''}
                                                            ${!isCurrent && isDone ? (score >= 80 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700') : ''}
                                                            ${!isCurrent && !isDone ? 'bg-stone-50 border-stone-100 text-stone-300' : ''}
                                                        `}
                                                    >
                                                        {isDone ? score : p}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Scrollable Analysis */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-20 bg-white">
                            <div className="max-w-3xl mx-auto">
                                <div className="flex items-center justify-center gap-2 mb-8">
                                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider text-center">
                                        Detailed Analysis
                                    </h3>
                                    <button
                                        onClick={() => setShowScoringGuide(true)}
                                        className="text-stone-300 hover:text-indigo-500 transition-colors"
                                        title="Scoring Guide"
                                    >
                                        <HelpCircle size={16} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-3xl md:text-4xl font-serif-sc leading-loose">
                                    {evalResult.wordEvaluations.map((word, idx) => {
                                        const token = currentTokens[idx];
                                        let colorClass = 'text-emerald-600'; // Default Good
                                        let decorationClass = '';

                                        // Error Type Visualization
                                        if (word.isPunctuation) {
                                            colorClass = 'text-stone-400';
                                        } else if (word.errorType === 'skipped') {
                                            colorClass = 'text-stone-300';
                                            decorationClass = 'line-through decoration-2 decoration-stone-300';
                                        } else if (word.errorType === 'insertion') {
                                            colorClass = 'text-purple-500';
                                            decorationClass = 'underline decoration-wavy decoration-purple-300';
                                        } else if (word.errorType === 'tone') {
                                            colorClass = 'text-orange-500';
                                        } else if (word.errorType === 'pronunciation') {
                                            colorClass = 'text-rose-500';
                                        } else if (word.accuracyScore < 80) {
                                            colorClass = 'text-amber-500';
                                        }

                                        return (
                                            <div
                                                key={idx}
                                                className={`flex flex-col items-center group relative cursor-pointer transition-transform ${!word.isPunctuation ? 'hover:scale-110 active:scale-95' : ''}`}
                                                title={word.isPunctuation ? 'Punctuation' : `Score: ${word.accuracyScore} (${word.errorType})`}
                                                onClick={() => {
                                                    if (!word.isPunctuation) {
                                                        // Strip bracketed pinyin from hanzi for TTS
                                                        const cleanHanzi = word.word.replace(/\s*\(.*?\)/, '');
                                                        speakWord(cleanHanzi, token?.pinyin);
                                                    }
                                                }}
                                            >
                                                {/* Pinyin Display */}
                                                {!word.isPunctuation && token && (
                                                    <span className="text-sm text-stone-400 font-sans mb-1 opacity-70">
                                                        {token.pinyin}
                                                    </span>
                                                )}

                                                {/* Hanzi Display */}
                                                <span className={`${colorClass} ${decorationClass} font-bold transition-colors drop-shadow-sm`}>
                                                    {/* Strip bracketed pinyin for display */}
                                                    {word.word.replace(/\s*\(.*?\)/, '')}
                                                </span>

                                                {/* Score Display (Below) */}
                                                {!word.isPunctuation && (
                                                    <span className={`text-[10px] font-sans font-bold mt-1 ${colorClass} opacity-80`}>
                                                        {Math.round(word.accuracyScore)}
                                                    </span>
                                                )}

                                                {/* Error Icon/Label */}
                                                {(word.errorType !== 'none' || word.accuracyScore < 80) && !word.isPunctuation && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 whitespace-nowrap mt-0.5">
                                                        {word.errorType !== 'none' ? word.errorType : 'Low Accuracy'}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-center text-stone-400 text-xs mt-8 font-medium">Click word to hear pronunciation</p>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* SCORING GUIDE MODAL */}
            {
                showScoringGuide && (
                    <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-stone-800">Scoring Guide</h3>
                                <button onClick={() => setShowScoringGuide(false)} className="p-1 hover:bg-stone-100 rounded-full text-stone-500">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm flex-none">
                                        90+
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-800">Excellent</div>
                                        <p className="text-xs text-stone-500 leading-relaxed">Native-like pronunciation and tone.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm flex-none">
                                        Low
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-800">Low Accuracy</div>
                                        <p className="text-xs text-stone-500 leading-relaxed">
                                            The word was recognized, but the pronunciation was fuzzy or not clear enough.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm flex-none">
                                        Tone
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-800">Tone Error</div>
                                        <p className="text-xs text-stone-500 leading-relaxed">
                                            The pinyin was correct, but the wrong tone was used (e.g., mā vs má).
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm flex-none">
                                        Pron
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-800">Pronunciation Error</div>
                                        <p className="text-xs text-stone-500 leading-relaxed">
                                            The wrong sound was used (e.g., zh vs z, or completely wrong vowel).
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-400 flex items-center justify-center font-bold text-sm flex-none">
                                        Skip
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-800">Skipped</div>
                                        <p className="text-xs text-stone-500 leading-relaxed">
                                            The word was not detected in the recording.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowScoringGuide(false)}
                                className="w-full mt-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-xl transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

