import React, { useState } from 'react';
import { VOCAB_COURSE } from '../data/vocabularyData';
import type { Chapter } from '../data/vocabularyData';
import { ChevronRight, BookOpen } from 'lucide-react';

interface VocabularyMenuProps {
    onSelectChapter: (chapter: Chapter, pageIndex?: number) => void;
    onBack: () => void;
    scores: Record<string, number>;
}

export const VocabularyMenu: React.FC<VocabularyMenuProps> = ({ onSelectChapter, onBack, scores }) => {
    // Flatten all units from all parts into a single list of "Lessons"
    const allUnits = VOCAB_COURSE.flatMap(part => part.chapters);
    const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);

    const selectedUnit = allUnits[selectedUnitIndex];

    // Helper to get Chinese number
    const getChineseNumber = (num: number) => {
        const map = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        return map[num - 1] || num;
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex-none mb-8">
                <button
                    onClick={onBack}
                    className="text-stone-500 hover:text-stone-800 font-bold mb-4 flex items-center gap-2 transition-colors"
                >
                    ← Back to Dashboard
                </button>
                <h1 className="text-4xl font-bold text-stone-800 font-serif-sc">Vocabulary Builder</h1>
            </div>

            {/* Lesson Tabs */}
            <div className="flex-none flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {allUnits.map((unit, index) => (
                    <button
                        key={unit.id}
                        onClick={() => setSelectedUnitIndex(index)}
                        className={`
                            px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all duration-300
                            ${selectedUnitIndex === index
                                ? 'bg-stone-800 text-white shadow-lg scale-105'
                                : 'bg-white text-stone-500 hover:bg-stone-100 border border-stone-200'}
                        `}
                    >
                        第{getChineseNumber(index + 1)}課
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                {selectedUnit && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Lesson Title */}
                        <div className="flex items-baseline gap-4 border-b border-stone-200 pb-4">
                            <h2 className="text-2xl font-bold text-stone-800">
                                第{getChineseNumber(selectedUnitIndex + 1)}課: {selectedUnit.title.replace(/^\d+\.\s*/, '')}
                            </h2>
                            {/* Calculate overall progress for this unit */}
                            {(() => {
                                // In the new structure, a "Unit" is a "Chapter" in VOCAB_COURSE
                                // But conceptually, this Unit might have multiple "pages" if we split it
                                // However, currently generate_vocab.js creates ONE chapter per unit.
                                // So we just show the score for this chapter.
                                const score = scores[selectedUnit.id];
                                return score !== undefined ? (
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${score >= 80 ? 'bg-emerald-100 text-emerald-700' :
                                        score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-stone-100 text-stone-500'
                                        }`}>
                                        {Math.round(score)}% Mastery
                                    </div>
                                ) : (
                                    <div className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-400">
                                        0% Mastery
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Sections / Levels */}
                        {/* Since we currently have 1 chapter per unit, we will simulate "Levels" based on the content length 
                            OR we can just show one big "Start" button if it's not split.
                            
                            Wait, the user wanted "learning chapters in groups of 10 vocabs or less".
                            I previously implemented splitting in generate_vocab.js but then reverted it because the user complained about "missing chapters".
                            
                            If I reverted the splitting, then `selectedUnit` is one big chapter.
                            To achieve the UI with "1, 2, 3..." buttons, I need to handle pagination *here* or re-implement splitting.
                            
                            Let's check the Reader. The Reader handles pagination internally (`groupSentencesIntoPages`).
                            So, clicking "Start" will open the Reader, which will have pages 1, 2, 3...
                            
                            BUT the user's UI shows buttons "1", "2", "3" *outside* the Reader.
                            This implies they want to jump to a specific page?
                            Or maybe they want the "Chapters" to be the "Pages"?
                            
                            If I split the Unit into multiple Chapters in `generate_vocab.js` (like I did before), 
                            then `allUnits` would contain `Unit 1-1`, `Unit 1-2`, etc.
                            And I would need to group them back into "Lesson 1".
                            
                            Let's try to group them here.
                        */}

                        <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-stone-100 p-2 rounded-lg">
                                    <BookOpen size={20} className="text-stone-600" />
                                </div>
                                <h3 className="font-bold text-stone-700">Vocabulary Levels</h3>
                                <span className="bg-stone-100 text-stone-500 text-xs px-2 py-1 rounded-full">
                                    {Math.ceil(selectedUnit.content.sections[0].sentences.length / 10)} Levels
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {/* We will create "Levels" based on chunks of 10 words */}
                                {Array.from({ length: Math.ceil(selectedUnit.content.sections[0].sentences.length / 10) }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            // We need to pass the chapter, but maybe with a specific page index?
                                            // The Reader takes `pageIndex` prop.
                                            // But `onSelectChapter` only takes `Chapter`.
                                            // We might need to modify `onSelectChapter` or pass state differently.
                                            // For now, let's just open the chapter. The Reader starts at page 1.
                                            // Ideally, we would pass the starting page.
                                            onSelectChapter(selectedUnit);
                                        }}
                                        className="aspect-square rounded-2xl border-2 border-stone-100 hover:border-indigo-500 hover:bg-indigo-50 flex flex-col items-center justify-center gap-2 transition-all group"
                                    >
                                        <span className="text-2xl font-bold text-stone-300 group-hover:text-indigo-600 transition-colors">
                                            {idx + 1}
                                        </span>
                                        {/* We could show score for this specific page if we had it tracked separately */}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
