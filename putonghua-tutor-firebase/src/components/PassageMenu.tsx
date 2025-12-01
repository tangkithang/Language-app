import React, { useState, useRef } from 'react';
import { PASSAGE_COURSE } from '../data/passageData';
import type { Chapter } from '../data/vocabularyData';
import { Star, Check, ArrowUp, BookOpen } from 'lucide-react';

interface PassageMenuProps {
    onSelectChapter: (chapter: Chapter) => void;
    onBack: () => void;
    scores: Record<string, number>;
    passageProgress?: Record<string, { pageScores: Record<number, number>, totalPages: number }>;
}

export const PassageMenu: React.FC<PassageMenuProps> = ({ onSelectChapter, onBack, scores, passageProgress }) => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            setShowScrollTop(scrollContainerRef.current.scrollTop > 300);
        }
    };

    const scrollToTop = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element && scrollContainerRef.current) {
            // Calculate offset relative to container
            const container = scrollContainerRef.current;
            const offsetTop = element.offsetTop - container.offsetTop - 100; // 100px buffer for sticky header
            container.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <div
            className="w-full mx-auto h-full overflow-y-auto relative scroll-smooth"
            ref={scrollContainerRef}
            onScroll={handleScroll}
        >
            {/* Sticky Header Container */}
            <div className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200/50 shadow-sm">
                <div className="px-6 pt-6 pb-2">
                    <button onClick={onBack} className="text-stone-500 hover:text-stone-800 font-bold flex items-center gap-2 transition-colors">
                        ← Back to Dashboard
                    </button>

                    <div className="flex items-center justify-between mt-4 mb-2">
                        <h1 className="text-3xl font-bold text-stone-800 font-serif-sc">Reading Practice</h1>
                    </div>
                </div>

                {/* Quick Nav */}
                <div className="px-6 pb-4 flex gap-2 overflow-x-auto no-scrollbar">
                    {PASSAGE_COURSE.map((part) => (
                        <button
                            key={part.id}
                            onClick={() => scrollToSection(part.id)}
                            className="px-4 py-2 bg-white border border-stone-200 rounded-full text-sm font-bold text-stone-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all whitespace-nowrap shadow-sm"
                        >
                            {part.title.split(':')[0]} {/* e.g. "Chapter 1" */}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 pt-8">
                <div className="space-y-12 pb-12">
                    {PASSAGE_COURSE.map((part) => {
                        // Calculate part progress
                        const totalChapters = part.chapters.length;
                        const completedChapters = part.chapters.filter(c => scores[c.id] !== undefined).length;
                        const progressPercentage = Math.round((completedChapters / totalChapters) * 100);

                        return (
                            <div key={part.id} id={part.id} className="space-y-6 scroll-mt-24">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-2xl font-bold text-stone-800 font-serif-sc">{part.title}</h2>

                                        {/* Speedometer for Chapter (CoursePart) */}
                                        <div className="w-12 h-12 relative flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="20"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="transparent"
                                                    className="text-stone-200"
                                                />
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="20"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="transparent"
                                                    strokeDasharray={125.66}
                                                    strokeDashoffset={125.66 - (progressPercentage / 100) * 125.66}
                                                    className="text-emerald-500 transition-all duration-1000 ease-out"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-xs font-bold text-stone-600">{progressPercentage}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-px flex-1 bg-stone-200 ml-4"></div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {part.chapters.map((chapter, idx) => {
                                        const score = scores[chapter.id];
                                        const isCompleted = score !== undefined;
                                        const isPerfect = score >= 80;

                                        // Determine styles based on status
                                        let bgClass = "bg-white hover:bg-indigo-50 border-stone-200 hover:border-indigo-200";
                                        let textClass = "text-stone-600 hover:text-indigo-600";

                                        if (isCompleted) {
                                            if (score >= 80) {
                                                bgClass = "bg-emerald-50 border-emerald-200";
                                                textClass = "text-emerald-700";
                                            } else if (score >= 60) {
                                                bgClass = "bg-amber-50 border-amber-200";
                                                textClass = "text-amber-700";
                                            } else {
                                                bgClass = "bg-rose-50 border-rose-200";
                                                textClass = "text-rose-700";
                                            }
                                        }

                                        return (
                                            <button
                                                key={chapter.id}
                                                onClick={() => onSelectChapter(chapter)}
                                                className={`
                                                    w-full p-6 rounded-2xl flex items-center justify-between
                                                    border-2 transition-all duration-200 group
                                                    ${bgClass}
                                                `}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`
                                                        w-12 h-12 rounded-xl flex items-center justify-center
                                                        ${isCompleted ? 'bg-white/50' : 'bg-stone-100 group-hover:bg-indigo-100'}
                                                        transition-colors
                                                    `}>
                                                        <BookOpen size={20} className={isCompleted ? textClass : "text-stone-400 group-hover:text-indigo-500"} />
                                                    </div>
                                                    <div className="text-left">
                                                        <h3 className={`font-bold text-lg ${textClass}`}>
                                                            {chapter.title}
                                                        </h3>
                                                        <p className="text-sm text-stone-400">
                                                            Passage {idx + 1}
                                                        </p>
                                                    </div>
                                                </div>

                                                {isCompleted && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex flex-col items-end mr-2">
                                                            <span className={`font-bold text-lg ${textClass}`}>{score}</span>
                                                            {passageProgress?.[chapter.id] && (
                                                                <span className="text-xs text-stone-400">
                                                                    {Object.keys(passageProgress[chapter.id].pageScores).length}/{passageProgress[chapter.id].totalPages} Pages
                                                                </span>
                                                            )}
                                                        </div>
                                                        {isPerfect ? (
                                                            <Star size={20} className="fill-yellow-400 text-yellow-400" />
                                                        ) : (
                                                            <Check size={20} className={score >= 60 ? "text-emerald-500" : "text-rose-500"} />
                                                        )}
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>
        </div>
    );
};
