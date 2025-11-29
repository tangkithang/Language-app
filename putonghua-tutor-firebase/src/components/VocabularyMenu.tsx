import React from 'react';
import { VOCAB_COURSE } from '../data/vocabularyData';
import type { Chapter } from '../data/vocabularyData';
import { PlayCircle } from 'lucide-react';

interface VocabularyMenuProps {
    onSelectChapter: (chapter: Chapter) => void;
    onBack: () => void;
}

export const VocabularyMenu: React.FC<VocabularyMenuProps> = ({ onSelectChapter, onBack }) => {
    // For now, all unlocked. In future, use localStorage to track progress.

    return (
        <div className="max-w-3xl mx-auto p-6">
            <button onClick={onBack} className="text-stone-500 hover:text-stone-800 font-bold mb-6 flex items-center gap-2">
                ← Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold text-stone-800 mb-8 font-serif-sc">Vocabulary Builder</h1>

            <div className="space-y-8">
                {VOCAB_COURSE.map((part) => (
                    <div key={part.id} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                        <div className="bg-stone-50 px-6 py-4 border-b border-stone-100">
                            <h2 className="font-bold text-lg text-stone-700">{part.title}</h2>
                        </div>
                        <div className="divide-y divide-stone-100">
                            {part.chapters.map((chapter, idx) => (
                                <button
                                    key={chapter.id}
                                    onClick={() => onSelectChapter(chapter)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-indigo-50 transition-colors group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-stone-800 group-hover:text-indigo-700 transition-colors">
                                                {chapter.title}
                                            </h3>
                                            <p className="text-xs text-stone-400">
                                                {chapter.content.sections[0].sentences.length} words
                                            </p>
                                        </div>
                                    </div>
                                    <PlayCircle className="text-stone-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
