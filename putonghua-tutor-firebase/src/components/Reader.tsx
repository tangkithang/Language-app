
import React, { useState, useRef, useEffect } from 'react';
import type { AnalysisResult, PronunciationResult } from '../types';
import { evaluatePronunciation } from '../services/azureSpeechService';
import { AudioVisualizer } from './AudioVisualizer';
import { Mic, Square, Volume2, Trophy, Star, RotateCcw, AlertCircle, Loader2, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { Confetti } from './Confetti';

interface ReaderProps {
    data: AnalysisResult;
    subscriptionKey: string;
    serviceRegion: string;
    selectedMicId: string;
    mode: 'reading' | 'vocab';
}

export const Reader: React.FC<ReaderProps> = ({ data, subscriptionKey, serviceRegion, selectedMicId, mode }) => {
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
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    // Result State
    const [evalResult, setEvalResult] = useState<PronunciationResult | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);

    // XP & Celebration State
    const [xp, setXp] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [xpGained, setXpGained] = useState(0);
    const [, setIsAnimatingXp] = useState(false);

    const currentSection = data.sections[sectionIndex];
    const currentTokens = currentSection.sentences.flatMap(s => s.tokens);
    const fullText = currentSection.sentences.map(s => s.original).join("");

    useEffect(() => {
        // Reset state when section changes
        setStatus('IDLE');
        setActiveWordIndex(-1);
        setEvalResult(null);
        setUserAudioUrl(null);
        window.speechSynthesis.cancel();
    }, [sectionIndex]);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            if (userAudioUrl) {
                URL.revokeObjectURL(userAudioUrl);
            }
        };
    }, []);

    // --- TTS LOGIC ---
    const speakWord = (text: string) => {
        if (status !== 'IDLE' && status !== 'FEEDBACK') return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = playbackRate * 0.8; // Scale base rate by user selection

        // Find nice voice
        const voices = window.speechSynthesis.getVoices();
        const bestVoice = voices.find(v =>
            (v.lang === 'zh-CN' || v.lang === 'zh_CN') &&
            (v.name.includes('Xiaoxiao') || v.name.includes('Yunxi') || v.name.includes('Google'))
        );
        if (bestVoice) utterance.voice = bestVoice;

        window.speechSynthesis.speak(utterance);
    };

    const playDemo = () => {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.lang = 'zh-CN';
        utterance.rate = playbackRate * 0.9; // Scale base rate by user selection

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
                    if (charIndex >= charCount && charIndex < charCount + tokenLen) {
                        setActiveWordIndex(i);
                        break;
                    }
                    charCount += tokenLen;
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

    const stopAudio = () => {
        window.speechSynthesis.cancel();
        setStatus('IDLE');
        setActiveWordIndex(-1);
    };

    const playUserRecording = () => {
        if (!userAudioUrl) return;
        const audio = new Audio(userAudioUrl);
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
                const result = await evaluatePronunciation(subscriptionKey, serviceRegion, audioBlob, fullText);
                setEvalResult(result);
                setStatus('FEEDBACK');

                // Calculate XP
                if (result.score >= 60) {
                    const baseXp = 10;
                    const bonusXp = result.score >= 80 ? 5 : 0;
                    const totalXp = baseXp + bonusXp;
                    setXp(prev => prev + totalXp);
                    setXpGained(totalXp);
                    setShowCelebration(true);

                    // Trigger XP Animation
                    setIsAnimatingXp(true);
                    setTimeout(() => setIsAnimatingXp(false), 1000);

                    // Hide celebration after 5s
                    setTimeout(() => setShowCelebration(false), 5000);
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

    // --- RENDER ---
    return (
        <div className="flex flex-col h-screen bg-stone-50">
            {/* Header */}
            <div className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between flex-none z-20">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <h2 className="font-bold text-stone-800">{data.title || "Practice"}</h2>
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">
                            Section {sectionIndex + 1} / {data.sections.length}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* XP Display */}
                    <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1.5 rounded-full text-yellow-700 font-bold text-sm mr-4">
                        <Star className="fill-current" size={16} />
                        <span>{xp} XP</span>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center bg-stone-100 rounded-full p-1">
                        <button
                            onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
                            disabled={sectionIndex === 0 || status === 'RECORDING'}
                            className="p-2 rounded-full hover:bg-stone-200 disabled:opacity-30 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => setSectionIndex(Math.min(data.sections.length - 1, sectionIndex + 1))}
                            disabled={sectionIndex === data.sections.length - 1 || status === 'RECORDING'}
                            className="p-2 rounded-full hover:bg-stone-200 disabled:opacity-30 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Split Layout-Stack on mobile, side-by-side on desktop */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6 overflow-hidden relative p-4 md:p-6">

                {/* CELEBRATION OVERLAY (Full Screen) */}
                {showCelebration && (
                    <div
                        className="absolute inset-0 z-50 flex items-center justify-center cursor-pointer bg-white/80 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setShowCelebration(false)}
                    >
                        <Confetti />
                        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-yellow-400 flex flex-col items-center animate-in zoom-in-50 duration-500 pointer-events-none">
                            <Trophy className="w-24 h-24 text-yellow-500 mb-4 animate-bounce" />
                            <h2 className="text-3xl font-black text-stone-800 mb-2">Lesson Complete!</h2>
                            <div className="text-5xl font-black text-yellow-500 mb-2">+{xpGained} XP</div>
                            <p className="text-stone-500 font-bold">Keep up the great work!</p>
                            <p className="text-stone-400 text-xs mt-4 font-medium">(Click anywhere to dismiss)</p>
                        </div>
                    </div>
                )}

                {/* FULL SCREEN FEEDBACK OVERLAY */}
                {status === 'FEEDBACK' && evalResult && (
                    <div className="absolute inset-0 z-40 bg-stone-50 animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center justify-center p-6 overflow-y-auto">
                        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-8 md:p-12 relative overflow-hidden">

                            {/* Background Decoration */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-black text-stone-800 mb-2">Practice Complete!</h2>
                                <p className="text-stone-500 font-medium">Here's how you performed</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 max-w-2xl mx-auto w-full">
                                {/* Score Card */}
                                <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-indigo-100">
                                    <div className="text-5xl font-black text-indigo-600 mb-2">{Math.round(evalResult.score)}</div>
                                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Overall Score</div>
                                </div>

                                {/* Time Used Card */}
                                <div className="bg-orange-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-orange-100">
                                    <div className="text-5xl font-black text-orange-600 mb-2">
                                        {(mode === 'vocab' ? 45 : 60) - timeLeft}s
                                    </div>
                                    <div className="text-xs font-bold text-orange-400 uppercase tracking-widest">Time Used</div>
                                </div>
                            </div>

                            {/* Word Analysis */}
                            <div className="mb-10">
                                <h3 className="text-center text-stone-400 text-xs font-bold uppercase tracking-widest mb-6">Detailed Analysis</h3>
                                <div className="flex flex-wrap justify-start gap-x-8 gap-y-16 text-3xl md:text-4xl font-serif-sc leading-loose px-4">
                                    {evalResult.wordEvaluations.map((word, idx) => {
                                        let colorClass = 'text-emerald-600'; // Default Good
                                        let decorationClass = '';

                                        // Error Type Visualization
                                        if (word.errorType === 'skipped') {
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
                                                className="flex flex-col items-center group relative cursor-pointer transition-transform hover:scale-110 active:scale-95"
                                                title={`Score: ${word.accuracyScore} (${word.errorType})`}
                                                onClick={() => speakWord(word.word)}
                                            >
                                                <span className={`text-xs font-sans font-bold mb-1 transition-all absolute-top-6 ${colorClass} opacity-70`}>
                                                    {word.accuracyScore}
                                                </span>
                                                <span className={`${colorClass} ${decorationClass} font-bold transition-colors drop-shadow-sm`}>
                                                    {word.word}
                                                </span>
                                                {/* Error Icon/Label */}
                                                {word.errorType !== 'none' && (
                                                    <span className="absolute -bottom-4 text-[10px] font-bold uppercase tracking-wider text-stone-400 whitespace-nowrap">
                                                        {word.errorType}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-center text-stone-400 text-xs mt-8 font-medium">Click on any word to hear correct pronunciation</p>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={playUserRecording}
                                    className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-stone-200 rounded-xl font-bold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all"
                                >
                                    <Volume2 size={20} /> Hear Recording
                                </button>
                                <button
                                    onClick={() => setStatus('IDLE')}
                                    className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-black hover:scale-105 transition-all shadow-xl shadow-stone-200"
                                >
                                    <RotateCcw size={20} /> Practice Again
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {/* LEFT PANEL: Text Display */}
                <div className="flex-1 lg:min-w-0 bg-white rounded-3xl shadow-xl border border-stone-100 flex flex-col overflow-hidden relative order-2 lg:order-1">

                    {/* Error Banner */}
                    {errorMsg && (
                        <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-sm p-2 flex items-center justify-center gap-2 z-50">
                            <AlertCircle size={14} /> {errorMsg}
                            <button onClick={() => setErrorMsg(null)} className="underline opacity-80 hover:opacity-100">Dismiss</button>
                        </div>
                    )}

                    {/* CONTENT AREA */}
                    <div className="flex-1 relative overflow-y-auto overflow-x-hidden p-6 md:p-10 flex flex-col items-center">

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
                            <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none">
                                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                                <span className="text-stone-500 font-medium">Examiner is grading...</span>
                            </div>
                        )}

                        {/* TEXT DISPLAY */}
                        <div className="w-full max-w-4xl font-serif-sc text-3xl md:text-4xl leading-[2.8] flex flex-wrap justify-center gap-x-2 gap-y-8">
                            {currentTokens.map((token, idx) => {
                                const isActive = status === 'PLAYING' && activeWordIndex === idx;
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center relative group cursor-pointer"
                                        onClick={() => speakWord(token.hanzi)}
                                    >
                                        {/* Pinyin above-Hidden during recording */}
                                        {status !== 'RECORDING' && (
                                            <span className={`
text-sm font-sans mb-1 transition-all duration-200 select-none
                                            ${isActive ? 'text-indigo-600 font-bold scale-110' : 'text-stone-400 group-hover:text-indigo-400'}
`}>
                                                {token.pinyin}
                                            </span>
                                        )}
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
                        <div className="h-20 w-full flex-none"></div>
                    </div>

                </div>

                {/* RIGHT PANEL: Controls */}
                <div className="w-full lg:w-80 flex-none flex flex-col gap-4 order-1 lg:order-2">

                    {/* Control Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-6 flex flex-col items-center gap-6 relative overflow-hidden">

                        {/* Status Header */}
                        <div className="w-full text-center border-b border-stone-100 pb-4">
                            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest">Controls</h3>
                        </div>

                        {/* Timer Display */}
                        <div className="h-24 flex items-center justify-center w-full">
                            {status === 'RECORDING' ? (
                                <div className="flex flex-col items-center animate-in fade-in zoom-in">
                                    <div className={`text-5xl font-black font-mono ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-stone-700'} `}>
                                        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                                    </div>
                                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Recording Time</div>
                                </div>
                            ) : (
                                <div className="text-stone-300 font-mono text-4xl font-bold select-none opacity-50">
                                    --:--
                                </div>
                            )}
                        </div>

                        {/* Main Action Button */}
                        <div className="relative flex flex-col items-center gap-2">
                            {status !== 'PLAYING' && status !== 'FEEDBACK' && (
                                <>
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
                                            <Square size={32} fill="currentColor" />
                                        ) : (
                                            <Mic size={36} />
                                        )}
                                    </button>
                                    {status !== 'RECORDING' && (
                                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">Practice Speaking</span>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Playback Controls */}
                        <div className="w-full flex flex-col items-center gap-3 pt-2">
                            {status !== 'RECORDING' && status !== 'ANALYZING' && status !== 'FEEDBACK' && (
                                <>
                                    <button
                                        onClick={status === 'PLAYING' ? stopAudio : playDemo}
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
                                                onClick={() => setPlaybackRate(rate)}
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
                    <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-4 flex-1 min-h-[120px] flex flex-col relative overflow-hidden">
                        <div className="absolute top-4 left-0 w-full text-center z-10">
                            <h3 className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Waveform</h3>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            {status === 'RECORDING' ? (
                                <div className="w-full h-full opacity-80">
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
        </div>
    );
};

