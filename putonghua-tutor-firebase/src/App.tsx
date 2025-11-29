import { useState } from 'react';
import { Reader } from './components/Reader';
import { Dashboard } from './components/Dashboard';
import { VocabularyMenu } from './components/VocabularyMenu';
import { PRACTICE_DATA, AZURE_CONFIG } from './constants';
import { Key, Settings, X } from 'lucide-react';
import type { Chapter } from './data/vocabularyData';

type AppMode = 'HOME' | 'READING' | 'VOCAB' | 'EXAM';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Kept for UI but not checked
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState('');

  // Navigation State
  const [mode, setMode] = useState<AppMode>('HOME');
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  // Global Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [availableMics, setAvailableMics] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicId, setSelectedMicId] = useState<string>('');

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
    if (username.trim()) {
      setHasStarted(true);
      setError('');
    } else {
      setError('Please enter a username');
    }
  };

  const handleSelectChapter = (chapter: Chapter) => {
    setActiveChapter(chapter);
  };

  const renderContent = () => {
    if (mode === 'HOME') {
      return <Dashboard onSelectMode={setMode} username={username} />;
    }

    if (mode === 'READING') {
      return (
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setMode('HOME')} className="mb-4 text-stone-500 hover:text-stone-800 font-bold px-6 pt-6">
            ← Back to Dashboard
          </button>
          <Reader
            data={PRACTICE_DATA}
            subscriptionKey={AZURE_CONFIG.key}
            serviceRegion={AZURE_CONFIG.region}
            selectedMicId={selectedMicId}
            mode="reading"
          />
        </div>
      );
    }

    if (mode === 'VOCAB') {
      if (activeChapter) {
        return (
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setActiveChapter(null)} className="mb-4 text-stone-500 hover:text-stone-800 font-bold px-6 pt-6">
              ← Back to Chapters
            </button>
            <Reader
              data={activeChapter.content}
              subscriptionKey={AZURE_CONFIG.key}
              serviceRegion={AZURE_CONFIG.region}
              selectedMicId={selectedMicId}
              mode="vocab"
            />
          </div>
        );
      }
      return <VocabularyMenu onSelectChapter={handleSelectChapter} onBack={() => setMode('HOME')} />;
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
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 bg-[url('/chinese_bg.png')] bg-cover bg-center bg-fixed bg-no-repeat">
        <div className="min-h-screen bg-white/90 backdrop-blur-sm overflow-y-auto">
          {/* Header */}
          <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-stone-200 flex justify-between items-center sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setMode('HOME'); setActiveChapter(null); }}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-serif font-bold shadow-md">
                文
              </div>
              <span className="font-bold text-lg hidden md:inline font-serif-sc tracking-wide">文淵 Putonghua</span>
              <span className="font-bold text-lg md:hidden font-serif-sc">文淵</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
                title="Settings"
              >
                <Settings size={20} />
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

          {renderContent()}
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
            <h1 className="text-4xl font-bold text-white mb-2 font-serif-sc tracking-wide">普通話</h1>
            <p className="text-indigo-100 text-lg font-medium">Intensive Oral Practice</p>
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
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Password (Optional)"
                className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-4 py-3 text-lg text-stone-700 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none placeholder:text-stone-400"
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
