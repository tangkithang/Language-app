import React, { useState, useRef, useEffect } from 'react';
import type { AnalysisResult, PronunciationResult } from '../types';
import { evaluatePronunciation } from '../services/azureSpeechService';
import { AudioVisualizer } from './AudioVisualizer';
import { Mic, Square, RotateCcw, AlertCircle, BookOpen, Volume2, ArrowRight, Trophy, Clock, HelpCircle, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
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
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Score</span>
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
}

export const Reader: React.FC<ReaderProps> = ({ data, subscriptionKey, serviceRegion, selectedMicId, mode,
    devMode,
    onComplete,
    onNextChapter,
    onPrevChapter,
    hasNextChapter,
    nextChapterTitle,
    previousChapterTitle
}) => {
    // Navigation State
    const [sectionIndex, setSectionIndex] = useState(0);

    // Interaction State
    const [status, setStatus] = useState<string>('IDLE');

    // Playback Highlight State
    const [activeWordIndex, setActiveWordIndex] = useState<number>(-1);
    const [countdown, setCountdown] = useState(3);
    const [timeLeft, setTimeLeft] = useState(0); // Timer for recording
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

    const currentSection = data.sections[sectionIndex];
    const currentTokens = currentSection.sentences.flatMap(s => s.tokens);
    // Construct fullText from tokens to ensure 1:1 mapping for highlighting
    const fullText = currentTokens.map(t => t.hanzi).join("");

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

    const stopAudio = () => {
        window.speechSynthesis.cancel();
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
    const speakWord = (text: string) => {
        if (status !== 'IDLE' && status !== 'FEEDBACK') return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
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

        // Join with Chinese comma for pause in vocab mode, but continuous for reading
        const separator = mode === 'reading' ? "" : "，";
        const spokenText = currentTokens.map(t => t.hanzi).join(separator);

        const utterance = new SpeechSynthesisUtterance(spokenText);
        utterance.lang = 'zh-CN';
        // Use override if provided, otherwise state
        const rateToUse = rateOverride !== undefined ? rateOverride : playbackRate;
        utterance.rate = rateToUse * 0.9;

        const voices = window.speechSynthesis.getVoices();
        const bestVoice = voices.find(v =>
            (v.lang === 'zh-CN' || v.lang === 'zh_CN') &&
            (v.name.includes('Xiaoxiao') || v.name.includes('Yunxi') || v.name.includes('Google'))
        );
        if (bestVoice) utterance.voice = bestVoice;

        setActiveWordIndex(-1);
        setStatus('PLAYING');

        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                const charIndex = event.charIndex;
                let charCount = 0;

                for (let i = 0; i < currentTokens.length; i++) {
                    const tokenLen = currentTokens[i].hanzi.length;

                    // Check if charIndex matches the start of this token
                    if (charIndex === charCount) {
                        setActiveWordIndex(i);
                        break;
                    }

                    // Advance charCount: token length + separator length
                    charCount += tokenLen + separator.length;
                }
            }
        };

        utterance.onend = () => {
            setStatus('IDLE');
            setActiveWordIndex(-1);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
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
            const initialTime = mode === 'vocab' ? 45 : 60;
            setTimeLeft(initialTime);
        } catch (e) {
            console.error(e);
            setErrorMsg("Microphone access denied");
            setStatus('IDLE');
        }
    };

    const generateMockResult = (): PronunciationResult => {
        const words = currentTokens.map(t => t.hanzi);
        const mockWordEvaluations = words.map(word => {
            const rand = Math.random();
            let errorType: 'tone' | 'pronunciation' | 'skipped' | 'insertion' | 'none' = 'none';
            let accuracyScore = 95 + Math.random() * 5;

            const isPunctuation = /^[^\u4e00-\u9fa5a-zA-Z0-9]+$/.test(word);

            if (isPunctuation) {
                return {
                    word,
                    correct: true,
                    errorType: 'none' as const,
                    accuracyScore: 0,
                    phonemes: [],
                    isPunctuation: true
                };
            }

            if (rand < 0.1) {
                errorType = 'tone';
                accuracyScore = 70 + Math.random() * 10;
            } else if (rand < 0.2) {
                errorType = 'pronunciation';
                accuracyScore = 60 + Math.random() * 10;
            } else if (rand < 0.25) {
                errorType = 'skipped';
                accuracyScore = 0;
            }

            return {
                word,
                correct: errorType === 'none',
                errorType,
                accuracyScore: Math.round(accuracyScore),
                phonemes: [], // Mock empty phonemes for now
                isPunctuation: false
            };
        });

        const overallScore = mockWordEvaluations.reduce((acc, curr) => acc + curr.accuracyScore, 0) / mockWordEvaluations.length;

        return {
            score: Math.round(overallScore),
            accuracyScore: Math.round(overallScore),
            fluencyScore: 85,
            completenessScore: 90,
            comment: "Mock feedback generated.",
            wordEvaluations: mockWordEvaluations
        };
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

            if (devMode) {
                // Simulate network delay
                setTimeout(() => {
                    const result = generateMockResult();
                    setEvalResult(result);
                    setStatus('FEEDBACK');

                    // Calculate XP and Notify Parent
                    const score = result.score;
                    onComplete(score);

                    if (score >= 50) {
                        const baseXp = 10;
                        const bonusXp = score >= 80 ? 5 : 0;
                        const totalXp = baseXp + bonusXp;
                        setXpGained(totalXp);
                        setShowCelebration(true);
                        setIsAnimatingXp(true);
                        setTimeout(() => setIsAnimatingXp(false), 1000);
                        setTimeout(() => setShowCelebration(false), 5000);
                    } else {
                        // Low score feedback
                        setXpGained(0);
                        setShowCelebration(true); // Show "Try Again" modal
                    }
                }, 1000);
                return;
            }

            try {
                const result = await evaluatePronunciation(
                    subscriptionKey,
                    serviceRegion,
                    audioBlob,
                    fullText,
                    currentTokens.map(t => t.hanzi),
                    currentTokens.map(t => t.pinyin)
                );
                setEvalResult(result);
                setStatus('FEEDBACK');

                // Calculate XP and Notify Parent
                const score = result.score;
                onComplete(score);

                if (score >= 50) {
                    const baseXp = 10;
                    const bonusXp = score >= 80 ? 5 : 0;
                    const totalXp = baseXp + bonusXp;
                    setXpGained(totalXp);
                    setShowCelebration(true);
                    setIsAnimatingXp(true);
                    setTimeout(() => setIsAnimatingXp(false), 1000);
                    setTimeout(() => setShowCelebration(false), 5000);
                } else {
                    // Low score feedback
                    setXpGained(0);
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

    // Timer Effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'RECORDING' && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && status === 'RECORDING') {
            // Optional: Auto-stop or just show 0
        }
        return () => clearInterval(interval);
    }, [status, timeLeft]);

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
        setCountdown(0);
        setTimeLeft(0);
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
                                Section {sectionIndex + 1} / {data.sections.length}
                            </p>
                            {/* Progress Bar */}
                            <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
                                    style={{
                                        width: `${((sectionIndex + 1) / data.sections.length) * 100}%`
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
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
                                if (sectionIndex < data.sections.length - 1) {
                                    setSectionIndex(sectionIndex + 1);
                                } else if (onNextChapter) {
                                    onNextChapter();
                                }
                            }}
                            disabled={(sectionIndex === data.sections.length - 1 && !hasNextChapter) || status === 'RECORDING'}
                            className="p-2 rounded-full hover:bg-stone-200 disabled:opacity-30 transition-colors"
                            aria-label="Next"
                            title={
                                sectionIndex < data.sections.length - 1
                                    ? "Next Section"
                                    : nextChapterTitle
                                        ? `Next Chapter: ${nextChapterTitle}`
                                        : "No Next Chapter"
                            }
                        >
                            <ChevronRight size={20} />
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
                    <div className="flex-1 relative overflow-y-auto overflow-x-hidden p-3 md:p-5 flex flex-col items-center">

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
                                        onClick={() => speakWord(token.hanzi)}
                                    >
                                        {/* Pinyin above-Hidden during recording but keeps space */}
                                        <span className={`
                                            text-sm font-sans mb-1 transition-all duration-200 select-none
                                            ${isActive ? 'text-indigo-600 font-bold scale-110' : 'text-stone-400 group-hover:text-indigo-400'}
                                            ${status === 'RECORDING' ? 'opacity-0' : 'opacity-100'}
                                        `}>
                                            {token.pinyin}
                                        </span>
                                        {/* Hanzi */}
                                        <span className={`
px-1 rounded transition-colors duration-200
                                ${isActive ? 'bg-indigo-100 text-indigo-900 shadow-sm ring-2 ring-indigo-200' : 'text-stone-800 group-hover:text-indigo-600'}
`}>
                                            {token.hanzi}
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

                        {/* Timer Display */}
                        <div className="h-20 flex items-center justify-center w-full">
                            {status === 'RECORDING' ? (
                                <div className="flex flex-col items-center animate-in fade-in zoom-in">
                                    <div className={`text-6xl font-black font-mono ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-stone-700'} `}>
                                        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Recording Time</div>
                                </div>
                            ) : (
                                <div className="text-stone-300 font-mono text-6xl font-bold select-none opacity-50">
                                    --:--
                                </div>
                            )}
                        </div>

                        {/* Main Action Button */}
                        <div className="relative flex flex-col items-center gap-2 h-32 justify-center">
                            {status !== 'PLAYING' && status !== 'FEEDBACK' && (
                                <>
                                    <div className="h-24 flex items-center justify-center">
                                        <button
                                            onClick={status === 'RECORDING' ? finishRecording : startPracticeSequence}
                                            disabled={status === 'ANALYZING' || status === 'COUNTDOWN'}
                                            className={`
                                                rounded-full flex items-center justify-center shadow-xl transition-all font-bold text-lg
                                                ${status === 'RECORDING'
                                                    ? 'w-24 h-24 bg-red-500 text-white animate-pulse ring-4 ring-red-200'
                                                    : 'w-24 h-24 bg-stone-900 text-white hover:bg-black hover:scale-105 shadow-stone-300'
                                                }
                                                ${status === 'ANALYZING' ? 'opacity-50 cursor-not-allowed' : ''}
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
            {showCelebration && (
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
            )}

            {/* FULL SCREEN FEEDBACK OVERLAY */}
            {status === 'FEEDBACK' && evalResult && (
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
                            <div className="col-span-1 flex justify-center">
                                <ScoreGauge score={Math.round(evalResult.score)} shouldAnimate={!showCelebration} />
                            </div>

                            {/* Time Used */}
                            <div className="bg-orange-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-orange-100 h-32 w-full">
                                <div className="text-4xl font-black text-orange-600 mb-1">
                                    {(mode === 'vocab' ? 45 : 60) - timeLeft}s
                                </div>
                                <div className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1">
                                    <Clock size={14} /> Time Used
                                </div>
                            </div>

                            {/* Accuracy (Hidden/Extra) - Placeholder for layout balance if needed, or just keep 2 cols on mobile, 4 on desktop? 
                                Let's stick to the 2 main stats for now, maybe make them wider on desktop.
                            */}
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
                                            onClick={() => !word.isPunctuation && speakWord(word.word)}
                                        >
                                            {/* Pinyin Display */}
                                            {!word.isPunctuation && token && (
                                                <span className="text-sm text-stone-400 font-sans mb-1 opacity-70">
                                                    {token.pinyin}
                                                </span>
                                            )}

                                            {/* Hanzi Display */}
                                            <span className={`${colorClass} ${decorationClass} font-bold transition-colors drop-shadow-sm`}>
                                                {word.word}
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
            )}
            {/* SCORING GUIDE MODAL */}
            {showScoringGuide && (
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
            )}
        </div>
    );
};

