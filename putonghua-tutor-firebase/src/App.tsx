import React, { useState } from 'react';
import { Reader } from './components/Reader';
import { Dashboard } from './components/Dashboard';
import { VocabularyMenu } from './components/VocabularyMenu';
import { PRACTICE_DATA, AZURE_CONFIG } from './constants';
import { Key, Settings, X, Star, LogOut, ArrowUp } from 'lucide-react';
import { VOCAB_COURSE } from './data/vocabularyData';
import type { Chapter } from './data/vocabularyData';
import { PassageMenu } from './components/PassageMenu';

type AppMode = 'HOME' | 'READING' | 'VOCAB' | 'PASSAGE_MENU' | 'EXAM';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Kept for UI but not checked
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState('');

  // Navigation State
  const [mode, setMode] = useState<AppMode>('HOME');
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [initialPageIndex, setInitialPageIndex] = useState(1);

  // Global Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [availableMics, setAvailableMics] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicId, setSelectedMicId] = useState<string>('');
  const [devMode, setDevMode] = useState(true);


  // Scroll to Top State
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

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

  // Load microphones on mount
  useState(() => {
    const getMics = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter(device => device.kind === 'audioinput');
        setAvailableMics(audioInputs);
        if (audioInputs.length > 0) {
          const defaultMic = audioInputs.find(d => d.deviceId === 'default') || audioInputs[0];
          setSelectedMicId(defaultMic.deviceId);
        }
      } catch (e) {
        console.error("Error fetching mics:", e);
      }
    };
    getMics();
  });

  const handleStart = () => {
    if (!username.trim()) {
      setUsername('Student');
    }
    setHasStarted(true);
    setError('');
  };

  const handleSelectChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
    // Check if this chapter belongs to VOCAB_COURSE or PASSAGE_COURSE
    const isVocab = VOCAB_COURSE.some(part => part.chapters.some(c => c.id === chapter.id));
    if (isVocab) {
      setMode('VOCAB');
    } else {
      setMode('READING');
    }
  };
  // Gamification State
  // Gamification State
  const [xp, setXp] = useState(0);
  const [chapterScores, setChapterScores] = useState<Record<string, number>>({});
  const [readingScore, setReadingScore] = useState<number>(0);

  const handleSessionComplete = (score: number, chapterId?: string) => {
    // XP Logic: Match Reader.tsx logic (10 base + 5 bonus)
    let earnedXp = 0;
    if (score >= 50) {
      earnedXp = 10;
      if (score >= 80) {
        earnedXp += 5;
      }
    }
    setXp(prev => prev + earnedXp);

    // Update Chapter Score if it's a vocab chapter
    if (chapterId) {
      setChapterScores(prev => ({
        ...prev,
        [chapterId]: Math.max(prev[chapterId] || 0, score)
      }));
    } else {
      // It's a reading session
      setReadingScore(prev => Math.max(prev, score));
    }
  };

  // Passage Progress State
  // Record<chapterId, { pageScores: Record<pageIndex, number>, totalPages: number }>
  const [passageProgress, setPassageProgress] = useState<Record<string, { pageScores: Record<number, number>, totalPages: number }>>({});

  const handlePageComplete = (chapterId: string, pageIndex: number, score: number, totalPages: number) => {
    setPassageProgress(prev => {
      const chapterProgress = prev[chapterId] || { pageScores: {}, totalPages };
      const newPageScores = { ...chapterProgress.pageScores, [pageIndex]: score };

      // Calculate average score for the chapter
      const scores = Object.values(newPageScores);
      const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

      // Update the main chapterScores for dashboard/menu display
      setChapterScores(prevScores => ({
        ...prevScores,
        [chapterId]: avgScore
      }));

      return {
        ...prev,
        [chapterId]: {
          pageScores: newPageScores,
          totalPages
        }
      };
    });
  };

  const getAdjacentChapter = (offset: number) => {
    if (!activeChapter) return null;
    const allChapters = VOCAB_COURSE.flatMap(part => part.chapters);
    const currentIndex = allChapters.findIndex(c => c.id === activeChapter.id);
    if (currentIndex !== -1 && currentIndex + offset >= 0 && currentIndex + offset < allChapters.length) {
      return allChapters[currentIndex + offset];
    }
    return null;
  };

  const handleNextChapter = () => {
    const next = getAdjacentChapter(1);
    if (next) {
      setActiveChapter(next);
    } else {
      setActiveChapter(null);
      setMode('HOME');
    }
  };

  const handlePrevChapter = () => {
    const prev = getAdjacentChapter(-1);
    if (prev) {
      setActiveChapter(prev);
    }
  };

  const renderContent = () => {
    if (mode === 'HOME') {
      return <Dashboard
        onSelectMode={setMode}
        username={username}
        chapterScores={chapterScores}
        readingScore={readingScore}
      />;
    }

    if (mode === 'PASSAGE_MENU') {
      return <PassageMenu
        onSelectChapter={handleSelectChapter}
        onBack={() => setMode('HOME')}
        scores={chapterScores}
        passageProgress={passageProgress}
      />;
    }



    if (mode === 'READING') {
      // If we are in READING mode but have an active chapter (from Passage Menu), use it
      if (activeChapter) {
        return (
          <div className="h-full flex flex-col">
            <div className="sticky top-0 z-10 bg-stone-50/95 backdrop-blur-sm -mx-6 px-6 py-4 border-b border-stone-200/50 flex-none">
              <button onClick={() => {
                setActiveChapter(null);
                setMode('PASSAGE_MENU');
              }} className="text-stone-500 hover:text-stone-800 font-bold flex items-center gap-2 transition-colors">
                ← Back to Menu
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <Reader
                data={activeChapter.content}
                subscriptionKey={AZURE_CONFIG.key}
                serviceRegion={AZURE_CONFIG.region}
                selectedMicId={selectedMicId}
                mode="reading"
                devMode={devMode}
                onComplete={(score) => handleSessionComplete(score)}
                onPageComplete={(pageIndex, score) => handlePageComplete(activeChapter.id, pageIndex, score, activeChapter.content.sections?.length || 1)}
                savedPageScores={passageProgress[activeChapter.id]?.pageScores || {}}
                pageIndex={1}
                totalPages={activeChapter.content.sections?.length || 1}
              />
            </div>
          </div>
        );
      }

      // Fallback to legacy READING mode (if any) or redirect
      return (
        <div className="h-full flex flex-col">
          <div className="sticky top-0 z-10 bg-stone-50/95 backdrop-blur-sm -mx-6 px-6 py-4 border-b border-stone-200/50 flex-none">
            <button onClick={() => setMode('HOME')} className="text-stone-500 hover:text-stone-800 font-bold flex items-center gap-2 transition-colors">
              ← Back to Dashboard
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <Reader
              data={PRACTICE_DATA}
              subscriptionKey={AZURE_CONFIG.key}
              serviceRegion={AZURE_CONFIG.region}
              selectedMicId={selectedMicId}
              mode="reading"
              devMode={devMode}
              onComplete={(score) => handleSessionComplete(score)}
            />
          </div>
        </div>
      );
    }

    if (mode === 'VOCAB') {
      if (activeChapter) {
        return (
          <div className="h-full flex flex-col">
            <div className="sticky top-0 z-10 bg-stone-50/95 backdrop-blur-sm -mx-6 px-6 py-4 border-b border-stone-200/50 flex-none">
              <button onClick={() => setActiveChapter(null)} className="text-stone-500 hover:text-stone-800 font-bold flex items-center gap-2 transition-colors">
                ← Back to Chapters
              </button>
            </div>
            <div
              className="flex-1 min-h-0 overflow-y-auto scroll-smooth"
              ref={scrollContainerRef}
              onScroll={handleScroll}
            >
              {(() => {
                // Calculate context: Which page is this in the current group?
                const currentPart = VOCAB_COURSE.find(part => part.chapters.some(c => c.id === activeChapter.id));

                if (currentPart) {
                  // Group chapters by base title to find the specific group this chapter belongs to
                  const groups: Record<string, Chapter[]> = {};
                  currentPart.chapters.forEach(c => {
                    const baseTitle = c.title.replace(/\s*\(\d+\)$/, '').trim();
                    if (!groups[baseTitle]) groups[baseTitle] = [];
                    groups[baseTitle].push(c);
                  });

                  // Find which group contains our active chapter
                  const activeBaseTitle = activeChapter.title.replace(/\s*\(\d+\)$/, '').trim();
                  const groupChapters = groups[activeBaseTitle] || [];

                  return (
                    <Reader
                      data={activeChapter.content}
                      subscriptionKey={AZURE_CONFIG.key}
                      serviceRegion={AZURE_CONFIG.region}
                      selectedMicId={selectedMicId}
                      mode="vocab"
                      devMode={devMode}
                      onComplete={(score) => handleSessionComplete(score, activeChapter.id)}
                      onNextChapter={handleNextChapter}
                      onPrevChapter={handlePrevChapter}
                      hasNextChapter={!!getAdjacentChapter(1)}
                      nextChapterTitle={getAdjacentChapter(1)?.title}
                      previousChapterTitle={getAdjacentChapter(-1)?.title}
                      groupChapters={groupChapters}
                      onJumpToChapter={(chapterId) => {
                        const chapter = groupChapters.find(c => c.id === chapterId);
                        if (chapter) handleSelectChapter(chapter);
                      }}
                    />
                  );
                }

                return (
                  <Reader
                    data={activeChapter.content}
                    subscriptionKey={AZURE_CONFIG.key}
                    serviceRegion={AZURE_CONFIG.region}
                    selectedMicId={selectedMicId}
                    mode="vocab"
                    devMode={devMode}
                    onComplete={(score) => handleSessionComplete(score, activeChapter.id)}
                    onNextChapter={handleNextChapter}
                    onPrevChapter={handlePrevChapter}
                    hasNextChapter={!!getAdjacentChapter(1)}
                    nextChapterTitle={getAdjacentChapter(1)?.title}
                    previousChapterTitle={getAdjacentChapter(-1)?.title}
                    pageIndex={initialPageIndex}
                  />
                );
              })()}

              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                aria-label="Scroll to top"
              >
                <ArrowUp size={24} />
              </button>
            </div>
          </div>
        );
      }
      return <VocabularyMenu
        onSelectChapter={(chapter: Chapter, pageIndex?: number) => {
          handleSelectChapter(chapter);
          // If a page index is provided (1-based), we need to pass it to the Reader.
          // We can store it in a temporary state or pass it via activeChapter if we extend the type,
          // but simpler is to just use a new state variable for initial page.
          if (pageIndex) {
            // We'll add a new state for this: const [initialPageIndex, setInitialPageIndex] = useState(1);
            // But for now, let's just hack it by modifying the activeChapter state or adding a new one.
            // Let's add `initialPageIndex` state to App.
            setInitialPageIndex(pageIndex);
          } else {
            setInitialPageIndex(1);
          }
        }}
        onBack={() => setMode('HOME')}
        scores={chapterScores}
      />;
    }

    if (mode === 'EXAM') {
      return (
        <div className="max-w-md mx-auto mt-20 text-center p-8 bg-white rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Oral Examination</h2>
          <p className="text-stone-500 mb-6">This module is coming soon. It will simulate a real exam environment.</p>
          <button onClick={() => setMode('HOME')} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold">
            Back to Dashboard
          </button>
        </div>
      );
    }
  };

  if (hasStarted) {
    return (
      <div className="h-full w-full bg-stone-50 flex flex-col overflow-hidden">
        <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 h-full overflow-hidden flex flex-col">
          {/* Header */}
          <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-stone-200 flex justify-between items-center sticky top-0 z-50 shadow-sm rounded-2xl mb-4 flex-none">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setMode('HOME'); setActiveChapter(null); }}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-serif font-bold shadow-md">
                文
              </div>
              <span className="font-bold text-lg hidden md:inline font-serif-sc tracking-wide">文淵 | AI 普通話學習網</span>
              <span className="font-bold text-lg md:hidden font-serif-sc">文淵</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1.5 rounded-full text-yellow-700 font-bold text-sm border border-yellow-200 shadow-sm">
                <Star className="fill-current" size={16} />
                <span>{xp} XP</span>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
                title="Settings"
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={() => setHasStarted(false)}
                className="p-2 rounded-full hover:bg-red-50 text-stone-500 hover:text-red-500 transition-colors"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
              <div className="text-xs font-mono text-stone-500 bg-stone-100/80 px-3 py-1.5 rounded-full flex items-center gap-2 border border-stone-200">
                <span className="font-bold text-indigo-600">v2.1</span>
                <span className="w-px h-3 bg-stone-300"></span>
                <span>{username}</span>
              </div>
            </div>
          </header>

          {/* Settings Modal */}
          {showSettings && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-stone-800">Settings</h3>
                  <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-stone-100 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-600 mb-2">Microphone</label>
                    <select
                      value={selectedMicId}
                      onChange={(e) => setSelectedMicId(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {availableMics.map(mic => (
                        <option key={mic.deviceId} value={mic.deviceId}>
                          {mic.label || `Microphone ${mic.deviceId.slice(0, 5)}...`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <label className="block text-sm font-bold text-stone-800">Developer Mode</label>
                      <p className="text-xs text-stone-500">Skip Azure processing and use mock data</p>
                    </div>
                    <button
                      onClick={() => setDevMode(!devMode)}
                      className={`w-12 h-7 rounded-full transition-colors relative ${devMode ? 'bg-indigo-600' : 'bg-stone-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm absolute top-1 transition-transform ${devMode ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 relative overflow-hidden flex flex-col h-full">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 bg-[url('/chinese_bg.png')] bg-cover bg-center bg-fixed bg-no-repeat flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-stone-100 overflow-hidden">

        {/* Hero */}
        <div className="bg-indigo-600/90 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-inner border border-white/30">
              <span className="text-3xl font-serif">文</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 font-serif-sc tracking-wide">文淵普通話</h1>
            <p className="text-indigo-100 text-lg font-medium">AI Putonghua Practice</p>
            <div className="mt-6 inline-block bg-indigo-500/50 backdrop-blur rounded-lg px-4 py-1 text-xs text-indigo-50 border border-indigo-400">
              Powered by Azure Speech AI
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-stone-700 font-bold text-sm uppercase tracking-wide">
              <Key size={14} /> Student Login
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Username (Any name)"
                className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 text-lg text-stone-700 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none placeholder:text-stone-400"
                aria-label="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Password (Optional)"
                className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 text-lg text-stone-700 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none placeholder:text-stone-400"
                aria-label="Password"
              />
            </div>

            {error && (
              <div className="text-rose-500 text-sm font-medium bg-rose-50 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleStart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Start Session
            </button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-stone-400 text-xs">
              Restricted Access • Student Use Only
            </p>
            <p className="text-stone-300 text-[10px]">
              v2.1 • Updated: {__BUILD_TIMESTAMP__}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
