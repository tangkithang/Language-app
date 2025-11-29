import React from 'react';
import { BookOpen, Library, GraduationCap } from 'lucide-react';

interface DashboardProps {
    onSelectMode: (mode: 'READING' | 'VOCAB' | 'EXAM') => void;
    username: string;
    chapterScores: Record<string, number>;
    readingScore: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectMode, username, chapterScores, readingScore }) => {
    // Calculate progress for each section

    // Reading: 1 passage so far. If score > 0, it's "started/completed"
    // For now, let's just show score as progress if > 0, or 100% if > 80?
    // Let's just map score to percentage directly for single item
    const readingProgress = readingScore > 0 ? Math.min(100, Math.round(readingScore)) : 0;

    // Vocab: Percentage of chapters completed (score > 0)
    const totalChapters = 20; // Approximate
    const completedChapters = Object.keys(chapterScores).length;
    const vocabProgress = Math.min(100, Math.round((completedChapters / totalChapters) * 100));

    // Exam: 0%
    const examProgress = 0;

    const renderSpeedometer = (percentage: number, label: string, colorClass: string) => (
        <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-stone-100"
                    />
                    <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={175.93}
                        strokeDashoffset={175.93 - (percentage / 100) * 175.93}
                        className={`${colorClass} transition-all duration-1000 ease-out`}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-stone-700">{percentage}%</span>
                </div>
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{label}</span>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold text-stone-800">Welcome back, {username}!</h1>
                    <p className="text-stone-500">Ready to continue your mastery path?</p>
                </div>

                {/* Speedometers */}
                <div className="flex items-center gap-6">
                    {renderSpeedometer(readingProgress, "Reading", "text-indigo-600")}
                    {renderSpeedometer(vocabProgress, "Vocab", "text-emerald-600")}
                    {renderSpeedometer(examProgress, "Exam", "text-amber-600")}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Reading Passage */}
                <button
                    onClick={() => onSelectMode('READING')}
                    className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all text-left"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-stone-800 mb-2">Reading Passage</h3>
                        <p className="text-stone-500 text-sm">Practice reading full articles with native audio and detailed feedback.</p>
                    </div>
                </button>

                {/* Vocabulary Builder */}
                <button
                    onClick={() => onSelectMode('VOCAB')}
                    className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all text-left"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                            <Library size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-stone-800 mb-2">Vocabulary Builder</h3>
                        <p className="text-stone-500 text-sm">Master pronunciation of specific words, organized by topic and difficulty.</p>
                    </div>
                </button>

                {/* Oral Examination */}
                <button
                    onClick={() => onSelectMode('EXAM')}
                    className="group relative overflow-hidden bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all text-left"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                            <GraduationCap size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-stone-800 mb-2">Oral Examination</h3>
                        <p className="text-stone-500 text-sm">Test your skills in a simulated exam environment. (Coming Soon)</p>
                    </div>
                </button>
            </div>
        </div>
    );
};
