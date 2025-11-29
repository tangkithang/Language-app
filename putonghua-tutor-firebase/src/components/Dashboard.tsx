import React from 'react';
import { BookOpen, Library, GraduationCap, Star } from 'lucide-react';

interface DashboardProps {
    onSelectMode: (mode: 'READING' | 'VOCAB' | 'EXAM') => void;
    username: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectMode, username }) => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-800">Welcome back, {username}!</h1>
                    <p className="text-stone-500">Ready to continue your mastery path?</p>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full text-yellow-700 font-bold">
                    <Star className="fill-current" size={20} />
                    <span>0 XP</span>
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
