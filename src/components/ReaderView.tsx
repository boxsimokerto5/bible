import React from 'react';
import { 
  ChevronLeft, ChevronRight, Bookmark as BookmarkIcon, 
  FileText, Plus, Minus, Volume2 
} from 'lucide-react';
import { Book, Verse, ReadingSettings, Bookmark, Highlight, Note } from '../types';

interface ReaderViewProps {
  currentBook: Book;
  currentChapter: number;
  verses: Verse[];
  settings: ReadingSettings;
  bookmarks: Bookmark[];
  highlights: Highlight[];
  notes: Note[];
  selectedVerse: Verse | null;
  speakingVerseId: string | null;
  onSelectVerse: (verse: Verse) => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  hasPrevChapter: boolean;
  hasNextChapter: boolean;
  onUpdateFontSize: (delta: number) => void;
  onOpenBookPicker: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  currentBook,
  currentChapter,
  verses,
  settings,
  bookmarks,
  highlights,
  notes,
  selectedVerse,
  speakingVerseId,
  onSelectVerse,
  onPrevChapter,
  onNextChapter,
  hasPrevChapter,
  hasNextChapter,
  onUpdateFontSize,
  onOpenBookPicker,
}) => {
  const isBookmarked = (verse: Verse) => {
    return bookmarks.some(b => b.bookId === verse.bookId && b.chapter === verse.chapter && b.verse === verse.verse);
  };

  const getHighlight = (verse: Verse) => {
    return highlights.find(h => h.bookId === verse.bookId && h.chapter === verse.chapter && h.verse === verse.verse);
  };

  const getNotesCount = (verse: Verse) => {
    return notes.filter(n => n.bookId === verse.bookId && n.chapter === verse.chapter && n.verse === verse.verse).length;
  };

  const isVintage = settings.theme === 'vintage';

  const getFontFamilyClass = () => {
    if (settings.fontFamily === 'garamond' || (isVintage && settings.fontFamily === 'serif')) {
      return 'font-garamond';
    }
    if (settings.fontFamily === 'serif') {
      return 'font-serif-bible';
    }
    return 'font-sans-ui';
  };

  const getHighlightStyles = (color?: string) => {
    switch (color) {
      case 'amber':
        return isVintage
          ? 'bg-[#e2cb9b] text-[#241306] rounded px-1 shadow-2xs font-semibold'
          : 'bg-amber-100/70 dark:bg-amber-900/30 text-amber-950 dark:text-amber-100 rounded-lg px-1';
      case 'emerald':
        return isVintage
          ? 'bg-[#c5d8ba] text-[#1c3014] rounded px-1 font-semibold'
          : 'bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-950 dark:text-emerald-100 rounded-lg px-1';
      case 'sky':
        return isVintage
          ? 'bg-[#c3d9e8] text-[#142838] rounded px-1 font-semibold'
          : 'bg-sky-100/70 dark:bg-sky-900/30 text-sky-950 dark:text-sky-100 rounded-lg px-1';
      case 'rose':
        return isVintage
          ? 'bg-[#e5c5c0] text-[#3d1512] rounded px-1 font-semibold'
          : 'bg-rose-100/70 dark:bg-rose-900/30 text-rose-950 dark:text-rose-100 rounded-lg px-1';
      case 'purple':
        return isVintage
          ? 'bg-[#d8cae6] text-[#2c193e] rounded px-1 font-semibold'
          : 'bg-purple-100/70 dark:bg-purple-900/30 text-purple-950 dark:text-purple-100 rounded-lg px-1';
      default:
        return '';
    }
  };

  const getLineHeightClass = () => {
    switch (settings.lineHeight) {
      case 'normal': return 'leading-normal';
      case 'loose': return 'leading-loose';
      default: return 'leading-relaxed';
    }
  };

  return (
    <div className={`relative pb-24 pt-1 ${isVintage ? 'vintage-book-edge' : ''}`}>
      {/* Chapter Title & Header banner - Compact & Slim for Phone */}
      <div className={`text-center py-2 sm:py-3 px-3 mb-2 transition-all ${
        isVintage 
          ? 'border-y border-[#d3be9a] bg-[#ebdcc2]/40 rounded-2xl mx-2 sm:mx-4 shadow-2xs' 
          : 'border-b border-neutral-200/40 dark:border-neutral-800/40'
      }`}>
        <div className="flex items-center justify-between gap-2 max-w-3xl mx-auto">
          {/* Testament & Category Badge */}
          <button
            onClick={onOpenBookPicker}
            className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors ${
              isVintage
                ? 'text-[#7c2d12] bg-[#dfcbab]/80 border border-[#c9b28b] font-cinzel hover:bg-[#d4be98]'
                : 'text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
            }`}
          >
            <span>{currentBook.category}</span> • <span>{currentBook.testament === 'PB' ? 'PB' : 'PL'}</span>
          </button>

          {/* Inline Chapter Title */}
          <h2 className={`text-lg sm:text-2xl font-extrabold tracking-tight truncate ${
            isVintage 
              ? 'font-cinzel text-[#2c1a0e]' 
              : 'text-neutral-900 dark:text-neutral-50'
          }`}>
            {currentBook.name} {currentChapter}
          </h2>

          {/* Quick Font Size Controls Inline */}
          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border text-xs shrink-0 ${
            isVintage
              ? 'bg-[#ebdcc2] border-[#c9b28b] text-[#2c1a0e]'
              : 'bg-neutral-100/90 dark:bg-neutral-800/90 border-neutral-200 dark:border-neutral-700'
          }`}>
            <button
              id="quick-font-decrease"
              onClick={() => onUpdateFontSize(-2)}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:opacity-75 active:scale-90"
              title="Kecilkan Huruf"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-bold text-[11px] w-5 text-center select-none">
              {settings.fontSize}
            </span>
            <button
              id="quick-font-increase"
              onClick={() => onUpdateFontSize(2)}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:opacity-75 active:scale-90"
              title="Besarkan Huruf"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Verses Reading Canvas */}
      <div 
        className={`max-w-3xl mx-auto px-2.5 sm:px-6 space-y-1.5 sm:space-y-2.5 ${getFontFamilyClass()}`}
        style={{ fontSize: `${settings.fontSize}px` }}
      >
        {verses.map((verse, index) => {
          const bookmarked = isBookmarked(verse);
          const highlight = getHighlight(verse);
          const noteCount = getNotesCount(verse);
          const isSelected = selectedVerse?.id === verse.id;
          const isSpeaking = speakingVerseId === verse.id;
          const isFirstVerse = index === 0;

          return (
            <div
              key={verse.id}
              id={`verse-${verse.verse}`}
              onClick={() => onSelectVerse(verse)}
              className={`group relative p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer select-text ${getLineHeightClass()} ${
                isSelected
                  ? isVintage 
                    ? 'ring-2 ring-[#8c2514] bg-[#e4cfad] shadow-inner'
                    : 'ring-2 ring-amber-500 bg-amber-500/10 dark:bg-amber-500/15'
                  : isSpeaking
                  ? isVintage
                    ? 'ring-2 ring-emerald-700 bg-emerald-700/15'
                    : 'ring-2 ring-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15'
                  : isVintage
                  ? 'hover:bg-[#ebdecb]/60'
                  : 'hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {/* Verse Number Badge */}
                {settings.showVerseNumbers && (
                  <span 
                    className={`shrink-0 font-bold select-none mt-1 flex items-center justify-center rounded-md ${
                      isVintage
                        ? isSpeaking
                          ? 'bg-emerald-700 text-white min-w-5 h-5 text-xs animate-pulse font-sans-ui'
                          : isSelected
                          ? 'bg-[#8c2514] text-white min-w-5 h-5 text-xs font-sans-ui'
                          : 'text-[#8c2514] bg-[#ebdcc2] border border-[#c9b28b] font-cinzel text-[11px] min-w-5 h-5'
                        : isSpeaking
                        ? 'bg-emerald-500 text-white animate-pulse min-w-5 h-5 text-xs font-sans-ui'
                        : isSelected
                        ? 'bg-amber-500 text-white min-w-5 h-5 text-xs font-sans-ui'
                        : 'text-amber-700 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/40 min-w-5 h-5 text-xs font-sans-ui'
                    }`}
                  >
                    {verse.verse}
                  </span>
                )}

                {/* Verse Text */}
                <div className={`flex-1 min-w-0 ${isVintage ? 'text-[#2c1a0e]' : ''}`}>
                  <span className={`${highlight ? getHighlightStyles(highlight.color) : ''}`}>
                    {verse.text}
                  </span>

                  {/* Indicator Badges (Bookmark star, Note badge) */}
                  {(bookmarked || noteCount > 0) && (
                    <span className="inline-flex items-center gap-1.5 ml-2 align-middle select-none">
                      {bookmarked && (
                        <span className={`inline-flex items-center ${isVintage ? 'text-[#8c2514]' : 'text-amber-500'}`} title="Ayat ditandai">
                          <BookmarkIcon className={`w-3.5 h-3.5 ${isVintage ? 'fill-[#8c2514]' : 'fill-amber-500'}`} />
                        </span>
                      )}
                      {noteCount > 0 && (
                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-sans-ui font-bold ${
                          isVintage
                            ? 'bg-[#8c2514]/15 text-[#8c2514] border border-[#8c2514]/30'
                            : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                        }`} title={`${noteCount} Catatan pribadi`}>
                          <FileText className="w-3 h-3" />
                          <span>{noteCount}</span>
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chapter Bottom Navigation */}
      <div className={`max-w-3xl mx-auto px-4 mt-10 pt-6 flex items-center justify-between gap-4 ${
        isVintage ? 'border-t border-[#d3be9a]' : 'border-t border-neutral-200/60 dark:border-neutral-800/60'
      }`}>
        <button
          id="prev-chapter-bottom-btn"
          onClick={onPrevChapter}
          disabled={!hasPrevChapter}
          className={`flex-1 py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 font-bold text-sm transition-all ${
            hasPrevChapter
              ? isVintage
                ? 'bg-[#ebdcc2] border-[#c9b28b] text-[#2c1a0e] hover:bg-[#dfcbab] active:scale-98 shadow-xs font-cinzel'
                : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-amber-500 hover:text-amber-600 active:scale-98 shadow-xs'
              : 'opacity-40 cursor-not-allowed bg-neutral-100 dark:bg-neutral-900 border-transparent text-neutral-400'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Pasal Sebelumnya</span>
        </button>

        <button
          id="next-chapter-bottom-btn"
          onClick={onNextChapter}
          disabled={!hasNextChapter}
          className={`flex-1 py-3 px-4 rounded-2xl border flex items-center justify-center gap-2 font-bold text-sm transition-all ${
            hasNextChapter
              ? isVintage
                ? 'bg-[#8c2514] hover:bg-[#741c0e] border-[#5c150a] text-[#f4ecd8] active:scale-98 shadow-md font-cinzel'
                : 'bg-amber-600 hover:bg-amber-700 border-amber-600 text-white active:scale-98 shadow-md'
              : 'opacity-40 cursor-not-allowed bg-neutral-100 dark:bg-neutral-900 border-transparent text-neutral-400'
          }`}
        >
          <span>Pasal Selanjutnya</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
