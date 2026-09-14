import React, { useState } from 'react';
import { ChevronDown, Search, Type, Volume2, BookOpen, User, Languages } from 'lucide-react';
import { Book, UserProfile, Language } from '../types';
import { CrossLogo } from './CrossLogo';
import { getBookName } from '../data/books';

interface HeaderProps {
  currentBook: Book;
  currentChapter: number;
  onOpenBookPicker: () => void;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
  onStartAudio: () => void;
  isPlayingAudio: boolean;
  activeTab: string;
  theme?: string;
  currentUser?: UserProfile | null;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  language?: Language;
  onToggleLanguage?: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBook,
  currentChapter,
  onOpenBookPicker,
  onOpenSettings,
  onOpenSearch,
  onStartAudio,
  isPlayingAudio,
  activeTab,
  theme,
  currentUser,
  onOpenProfile,
  onOpenAuth,
  language = 'id',
  onToggleLanguage,
}) => {
  const isVintage = theme === 'vintage';
  const isEn = language === 'en';
  const [showChristmasAtmosphere, setShowChristmasAtmosphere] = useState(true);

  // 9 subtle falling snowflakes with staggered positions and delays
  const snowflakes = [
    { id: 1, left: '6%', delay: '0s', duration: '5.2s', size: 'text-[9px]', opacity: 'opacity-70' },
    { id: 2, left: '14%', delay: '1.8s', duration: '6.5s', size: 'text-[12px]', opacity: 'opacity-50' },
    { id: 3, left: '25%', delay: '0.7s', duration: '4.8s', size: 'text-[8px]', opacity: 'opacity-60' },
    { id: 4, left: '38%', delay: '2.5s', duration: '7.1s', size: 'text-[11px]', opacity: 'opacity-65' },
    { id: 5, left: '49%', delay: '1.1s', duration: '5.6s', size: 'text-[13px]', opacity: 'opacity-80' },
    { id: 6, left: '62%', delay: '3.2s', duration: '6.2s', size: 'text-[8px]', opacity: 'opacity-55' },
    { id: 7, left: '73%', delay: '0.4s', duration: '5.0s', size: 'text-[10px]', opacity: 'opacity-75' },
    { id: 8, left: '85%', delay: '2.1s', duration: '6.8s', size: 'text-[12px]', opacity: 'opacity-60' },
    { id: 9, left: '94%', delay: '1.4s', duration: '5.4s', size: 'text-[9px]', opacity: 'opacity-70' },
  ];

  const bookDisplayName = getBookName(currentBook, language);

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md transition-colors relative overflow-hidden ${
      isVintage
        ? 'bg-[#ebdcc2]/95 border-b border-[#c9b28b] shadow-xs'
        : 'bg-white/95 dark:bg-neutral-900/95 border-b border-neutral-200/80 dark:border-neutral-800'
    }`}>
      {/* --- CHRISTMAS FAIRY LIGHTS & GARLAND TRIM ON TOP --- */}
      {showChristmasAtmosphere && (
        <div className="absolute top-0 left-0 right-0 h-1.5 flex items-center justify-between px-3 z-10 pointer-events-none overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] fairy-light-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] fairy-light-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] fairy-light-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8] fairy-light-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e] fairy-light-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#fcd34d] fairy-light-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] fairy-light-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#eab308] fairy-light-4" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] fairy-light-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] fairy-light-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8] fairy-light-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] fairy-light-4" />
        </div>
      )}

      {/* --- FALLING SNOWFLAKES ANIMATION --- */}
      {showChristmasAtmosphere && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {snowflakes.map((s) => (
            <span
              key={s.id}
              className={`snowflake-particle ${s.size} ${s.opacity} ${
                isVintage ? 'text-[#8c2514]/30' : 'text-amber-500/40 dark:text-sky-200/50'
              }`}
              style={{
                left: s.left,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            >
              ❄
            </span>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-2 relative z-10">
        {/* Left: Christian Cross Logo & Book-Chapter Selector */}
        {activeTab === 'read' ? (
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {/* Golden Cross Logo Icon */}
            <div 
              className="cursor-pointer transition-transform active:scale-90 hover:scale-105 shrink-0"
              title={isEn ? "Cross of Christ • Peace of God" : "Salib Kristus • Damai Sejahtera Allah"}
              onClick={() => setShowChristmasAtmosphere(!showChristmasAtmosphere)}
            >
              <CrossLogo className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <button
              id="header-book-picker-btn"
              onClick={onOpenBookPicker}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-2xl active:scale-95 transition-all border shrink min-w-0 truncate ${
                isVintage
                  ? 'bg-[#dfcbab] text-[#2c1a0e] border-[#c9b28b] font-cinzel hover:bg-[#d5bf9b]'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 border-neutral-200/60 dark:border-neutral-700/60'
              }`}
              title={isEn ? "Select Book and Chapter" : "Pilih Kitab dan Pasal"}
            >
              <BookOpen className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isVintage ? 'text-[#8c2514]' : 'text-amber-600 dark:text-amber-400'}`} />
              <span className="font-extrabold text-xs sm:text-base tracking-tight truncate">
                {bookDisplayName} {currentChapter}
              </span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60 shrink-0" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div 
              onClick={() => setShowChristmasAtmosphere(!showChristmasAtmosphere)}
              className="cursor-pointer transition-transform active:scale-90 hover:scale-105 shrink-0"
              title={isEn ? "Cross of Christ • Peace of God" : "Salib Kristus • Damai Sejahtera Allah"}
            >
              <CrossLogo className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className={`font-extrabold text-xs sm:text-base tracking-tight truncate ${
                  isVintage ? 'font-cinzel text-[#2c1a0e]' : 'text-neutral-900 dark:text-neutral-100'
                }`}>
                  {activeTab === 'stories' 
                    ? (isEn ? 'Stories & Faith' : 'Kisah & Kesaksian')
                    : activeTab === 'devotional' 
                    ? (isEn ? 'Daily Devotion' : 'Renungan Harian')
                    : activeTab === 'notes' 
                    ? (isEn ? 'Sermon Notes' : 'Catatan Khotbah')
                    : activeTab === 'bookmarks' 
                    ? (isEn ? 'Bookmarks' : 'Bookmark & Stabilo')
                    : activeTab === 'search' 
                    ? (isEn ? 'Search Scripture' : 'Cari Firman')
                    : (isEn ? 'Holy Bible' : 'Alkitab Digital')}
                </h1>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-600/25 hidden md:inline-flex items-center gap-0.5 shrink-0">
                  <span>🎄</span> Natal
                </span>
              </div>
              <p className={`text-[9px] sm:text-[10px] hidden xs:block -mt-0.5 truncate ${isVintage ? 'text-[#7a5b3a] font-garamond italic' : 'text-neutral-400 dark:text-neutral-500'}`}>
                {activeTab === 'stories' 
                  ? (isEn ? 'Love of Christ & Testimonies' : 'Kasih Kristus & Teladan Iman') 
                  : (isEn ? 'Emmanuel • God With Us' : 'Immanuel • Allah Beserta Kita')}
              </p>
            </div>
          </div>
        )}

        {/* Right Tools & Language Switcher */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* USER REQUEST: Clean & Neat IND-ENG Language Toggle Switch */}
          <div 
            id="header-language-toggle-wrapper"
            className={`flex items-center p-0.5 rounded-xl border text-[10px] sm:text-xs font-black transition-all ${
              isVintage
                ? 'bg-[#dfcbab]/80 border-[#c9b28b]'
                : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200/80 dark:border-neutral-700'
            }`}
            title={isEn ? "Switch language: Indonesian / English" : "Ganti bahasa: Indonesia / Inggris"}
          >
            <button
              id="lang-toggle-ind-btn"
              type="button"
              onClick={() => onToggleLanguage?.('id')}
              className={`px-1.5 sm:px-2 py-0.5 rounded-lg transition-all text-[10px] sm:text-[11px] font-extrabold ${
                language === 'id'
                  ? isVintage
                    ? 'bg-[#8c2514] text-white shadow-2xs'
                    : 'bg-amber-600 text-white shadow-2xs'
                  : isVintage
                    ? 'text-[#5a3b22] hover:text-[#8c2514]'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Bahasa Indonesia (Terjemahan Baru)"
            >
              IND
            </button>
            <button
              id="lang-toggle-eng-btn"
              type="button"
              onClick={() => onToggleLanguage?.('en')}
              className={`px-1.5 sm:px-2 py-0.5 rounded-lg transition-all text-[10px] sm:text-[11px] font-extrabold ${
                language === 'en'
                  ? isVintage
                    ? 'bg-[#8c2514] text-white shadow-2xs'
                    : 'bg-amber-600 text-white shadow-2xs'
                  : isVintage
                    ? 'text-[#5a3b22] hover:text-[#8c2514]'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="English (KJV / WEB Translation)"
            >
              ENG
            </button>
          </div>

          {/* Audio narration button (in read mode) */}
          {activeTab === 'read' && (
            <>
              <button
                id="header-audio-narration-btn"
                onClick={onStartAudio}
                className={`p-1.5 sm:p-2 rounded-xl transition-all ${
                  isPlayingAudio
                    ? isVintage ? 'bg-[#8c2514] text-white animate-pulse' : 'bg-amber-500 text-white animate-pulse'
                    : isVintage 
                    ? 'text-[#4a301a] hover:bg-[#dfcbab]' 
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title={isEn ? "Listen to Bible audio recitation" : "Dengarkan Suara Pembacaan Firman"}
              >
                <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Display & Font Sizing (Aa) */}
              <button
                id="header-font-settings-btn"
                onClick={onOpenSettings}
                className={`flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl transition-all font-bold text-sm ${
                  isVintage
                    ? 'text-[#2c1a0e] hover:bg-[#dfcbab]'
                    : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title={isEn ? "Reading Settings (Font & Theme)" : "Pengaturan Ukuran Huruf & Warna"}
              >
                <Type className={`w-4 h-4 ${isVintage ? 'text-[#8c2514]' : 'text-amber-600 dark:text-amber-400'}`} />
                <span className="text-xs hidden md:inline">{isEn ? 'Size' : 'Teks'}</span>
              </button>
            </>
          )}

          {/* Search Button */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className={`p-1.5 sm:p-2 rounded-xl transition-all ${
              isVintage
                ? 'text-[#4a301a] hover:bg-[#dfcbab]'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title={isEn ? "Search Scripture" : "Cari Ayat atau Kata"}
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* User Account / Profile Button */}
          {currentUser ? (
            <button
              id="header-user-profile-btn"
              onClick={onOpenProfile}
              className={`flex items-center gap-1 p-1 sm:px-2 sm:py-1 rounded-xl transition-all border ${
                isVintage
                  ? 'bg-[#dfcbab] text-[#2c1a0e] border-[#c9b28b] hover:bg-[#d5bf9b]'
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200/80 dark:border-neutral-700 hover:border-amber-500/50'
              }`}
              title={isEn ? `Account: ${currentUser.name}` : `Akun: ${currentUser.name}`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">
                {currentUser.avatarEmoji || '🕊️'}
              </div>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 hidden lg:inline truncate max-w-[65px]">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              id="header-auth-btn"
              onClick={onOpenAuth}
              className="px-2 sm:px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] sm:text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1 shrink-0"
              title={isEn ? "Sign in or Create Account" : "Masuk atau Buat Akun Alkitab"}
            >
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{isEn ? 'Sign In' : 'Masuk'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
