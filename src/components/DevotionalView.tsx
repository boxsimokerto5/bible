import React, { useState } from 'react';
import { Sparkles, Share2, Copy, Check, Heart, BookOpen, Volume2, Brain, ArrowRight, BookMarked } from 'lucide-react';
import { DailyDevotional } from '../types';
import { getTodayDevotional, DAILY_DEVOTIONALS } from '../data/dailyDevotionals';
import { BibleQuizSection } from './BibleQuizSection';

interface DevotionalViewProps {
  onNavigateToVerse: (bookId: string, chapter: number, verseNum?: number) => void;
  onStartAudioForVerse: (verseText: string, title: string) => void;
  currentBookName?: string;
  currentBookId?: string;
  currentChapter?: number;
  theme?: string;
}

export const DevotionalView: React.FC<DevotionalViewProps> = ({
  onNavigateToVerse,
  onStartAudioForVerse,
  currentBookName = 'Yohanes',
  currentBookId = 'yoh',
  currentChapter = 1,
  theme,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'renungan' | 'kuis'>('renungan');
  const [selectedDevotional, setSelectedDevotional] = useState<DailyDevotional>(() => getTodayDevotional());
  const [copied, setCopied] = useState(false);
  const [cardTheme, setCardTheme] = useState<'amber' | 'emerald' | 'navy' | 'dark'>('amber');

  const handleCopy = () => {
    const text = `📖 Ayat Hari Ini: ${selectedDevotional.verse.bookName} ${selectedDevotional.verse.chapter}:${selectedDevotional.verse.verse}\n\n"${selectedDevotional.verse.text}"\n\n✨ Renungan: ${selectedDevotional.themeTitle}\n${selectedDevotional.reflection}\n\n🙏 Doa:\n${selectedDevotional.prayer}\n\n— Alkitab Digital TB`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareData = {
      title: `Ayat Hari Ini: ${selectedDevotional.verse.bookName} ${selectedDevotional.verse.chapter}:${selectedDevotional.verse.verse}`,
      text: `"${selectedDevotional.verse.text}"\n— ${selectedDevotional.verse.bookName} ${selectedDevotional.verse.chapter}:${selectedDevotional.verse.verse} (TB)\n\n${selectedDevotional.reflection}`,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const getCardBg = () => {
    switch (cardTheme) {
      case 'amber':
        return 'from-amber-600 to-amber-800 text-white';
      case 'emerald':
        return 'from-emerald-700 to-teal-900 text-white';
      case 'navy':
        return 'from-blue-900 to-indigo-950 text-white';
      case 'dark':
        return 'from-neutral-900 to-neutral-950 text-neutral-100 border border-neutral-800';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 space-y-3.5 pb-24">
      {/* Sub Tab Navigation Header */}
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200/80 dark:border-neutral-800 pb-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700">
          <button
            id="tab-renungan-sub"
            onClick={() => setActiveSubTab('renungan')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'renungan'
                ? 'bg-white dark:bg-neutral-700 text-amber-700 dark:text-amber-300 shadow-2xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Renungan Harian</span>
          </button>

          <button
            id="tab-kuis-sub"
            onClick={() => setActiveSubTab('kuis')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'kuis'
                ? 'bg-white dark:bg-neutral-700 text-amber-700 dark:text-amber-300 shadow-2xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-amber-500" />
            <span>Kuis Alkitab</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500 text-white leading-tight">
              Baru
            </span>
          </button>
        </div>

        <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline">
          {activeSubTab === 'renungan' ? 'Inspirasi & doa harian' : 'Asah ingatan ayat & firman'}
        </span>
      </div>

      {/* RENDER KUIS ALKITAB TAB */}
      {activeSubTab === 'kuis' ? (
        <BibleQuizSection
          currentBookName={currentBookName}
          currentBookId={currentBookId}
          currentChapter={currentChapter}
          onNavigateToVerse={onNavigateToVerse}
          onStartAudioForVerse={onStartAudioForVerse}
          theme={theme}
        />
      ) : (
        /* RENDER RENUNGAN HARIAN TAB */
        <div className="space-y-3.5">
          {/* Main Verse Card (Shareable Visual Card) */}
          <div 
            id="devotional-main-card"
            className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${getCardBg()} shadow-md space-y-3.5 relative overflow-hidden transition-all duration-300`}
          >
            {/* Background watermark cross */}
            <div className="absolute -right-6 -bottom-8 text-white/5 text-8xl font-serif pointer-events-none select-none">
              ✝
            </div>

            {/* Top tag & reference */}
            <div className="flex items-center justify-between relative z-10">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold tracking-wide uppercase">
                Ayat Hari Ini
              </span>

              <button
                onClick={() => onNavigateToVerse(selectedDevotional.verse.bookId, selectedDevotional.verse.chapter, selectedDevotional.verse.verse)}
                className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" />
                <span>{selectedDevotional.verse.bookName} {selectedDevotional.verse.chapter}:{selectedDevotional.verse.verse}</span>
              </button>
            </div>

            {/* Scripture Quote */}
            <div className="relative z-10 space-y-1">
              <p className="font-serif-bible text-base sm:text-lg font-normal leading-relaxed italic">
                "{selectedDevotional.verse.text}"
              </p>
              <p className="text-right text-xs font-semibold opacity-90">
                — {selectedDevotional.verse.bookName} {selectedDevotional.verse.chapter}:{selectedDevotional.verse.verse} (TB)
              </p>
            </div>

            {/* Card Theme Picker & Quick Actions inside card */}
            <div className="pt-2.5 border-t border-white/20 flex items-center justify-between gap-2 relative z-10 flex-wrap">
              <div className="flex items-center gap-1">
                <span className="text-[10px] opacity-75 mr-0.5">Tema:</span>
                {[
                  { id: 'amber' as const, bg: 'bg-amber-500' },
                  { id: 'emerald' as const, bg: 'bg-emerald-600' },
                  { id: 'navy' as const, bg: 'bg-blue-900' },
                  { id: 'dark' as const, bg: 'bg-neutral-900' },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setCardTheme(t.id)}
                    className={`w-4 h-4 rounded-full ${t.bg} border border-white/60 transition-transform ${cardTheme === t.id ? 'scale-125 ring-1.5 ring-white' : 'opacity-70'}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onStartAudioForVerse(selectedDevotional.verse.text, `${selectedDevotional.verse.bookName} ${selectedDevotional.verse.chapter}:${selectedDevotional.verse.verse}`)}
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 backdrop-blur-xs transition-all text-xs font-semibold flex items-center gap-1"
                  title="Dengarkan Pembacaan Suara"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengar</span>
                </button>

                <button
                  id="copy-devotional-card-btn"
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/30 backdrop-blur-xs transition-all text-xs font-semibold flex items-center gap-1"
                  title="Salin Ayat dan Renungan"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-amber-200" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                </button>

                <button
                  id="share-devotional-card-btn"
                  onClick={handleShare}
                  className="px-2.5 py-1.5 rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs shadow-xs transition-all flex items-center gap-1 active:scale-95"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Bagikan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reflection and Prayer Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-2xs space-y-2.5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Perenungan Firman
              </div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                {selectedDevotional.themeTitle}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mt-1 font-sans-ui">
                {selectedDevotional.reflection}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 mb-0.5">
                <Heart className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>Pokok Doa Hari Ini:</span>
              </div>
              <p className="text-xs text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
                "{selectedDevotional.prayer}"
              </p>
            </div>
          </div>

          {/* Quick Quiz Callout / Banner */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-orange-500/15 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-neutral-100">
                  Uji Pengetahuan: Kuis Ayat & Firman
                </h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  Asah hafalan dan pemahaman tentang ayat renungan & kitab yang baru saja dibaca!
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveSubTab('kuis')}
              className="px-3 sm:px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 shrink-0"
            >
              <span>Mulai Kuis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Other Devotionals Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Renungan Pilihan Lainnya:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DAILY_DEVOTIONALS.map((item) => {
                const isSelected = item.date === selectedDevotional.date;
                return (
                  <button
                    key={item.date}
                    onClick={() => setSelectedDevotional(item)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-amber-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-700 dark:text-amber-300">
                      {item.verse.bookName} {item.verse.chapter}:{item.verse.verse}
                    </div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-1 line-clamp-1">
                      {item.themeTitle}
                    </div>
                    <div className="text-xs text-neutral-500 line-clamp-2 mt-1 font-serif-bible">
                      "{item.verse.text}"
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

