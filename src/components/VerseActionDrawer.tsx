import React, { useState } from 'react';
import { 
  X, Bookmark as BookmarkIcon, Highlighter, 
  FileText, Volume2, Copy, Share2, Check, Sparkles 
} from 'lucide-react';
import { Verse, HighlightColor } from '../types';

interface VerseActionDrawerProps {
  verse: Verse | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  currentHighlightColor?: HighlightColor;
  onToggleBookmark: () => void;
  onSetHighlight: (color: HighlightColor | null) => void;
  onOpenNoteEditor: () => void;
  onPlayAudio: () => void;
}

export const VerseActionDrawer: React.FC<VerseActionDrawerProps> = ({
  verse,
  isOpen,
  onClose,
  isBookmarked,
  currentHighlightColor,
  onToggleBookmark,
  onSetHighlight,
  onOpenNoteEditor,
  onPlayAudio,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !verse) return null;

  const handleCopy = () => {
    const textToCopy = `"${verse.text}"\n— ${verse.bookName} ${verse.chapter}:${verse.verse} (TB)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const shareData = {
      title: `${verse.bookName} ${verse.chapter}:${verse.verse}`,
      text: `"${verse.text}" — ${verse.bookName} ${verse.chapter}:${verse.verse} (Alkitab TB)`,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const highlightColors: { color: HighlightColor; bg: string; border: string; name: string }[] = [
    { color: 'amber', bg: 'bg-amber-300', border: 'border-amber-400', name: 'Kuning' },
    { color: 'emerald', bg: 'bg-emerald-300', border: 'border-emerald-400', name: 'Hijau' },
    { color: 'sky', bg: 'bg-sky-300', border: 'border-sky-400', name: 'Biru' },
    { color: 'rose', bg: 'bg-rose-300', border: 'border-rose-400', name: 'Mawar' },
    { color: 'purple', bg: 'bg-purple-300', border: 'border-purple-400', name: 'Ungu' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="verse-action-drawer-content"
        className="w-full sm:max-w-xl bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-bottom-6 duration-200"
      >
        {/* Header with Reference */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-xs tracking-wide">
              Ayat Terpilih
            </span>
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base">
              {verse.bookName} {verse.chapter}:{verse.verse}
            </h3>
          </div>
          <button
            id="close-verse-action-drawer"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verse Excerpt Preview */}
        <div className="p-5 bg-amber-50/30 dark:bg-amber-950/10 border-b border-neutral-100 dark:border-neutral-800 max-h-32 overflow-y-auto">
          <p className="font-serif-bible text-base text-neutral-800 dark:text-neutral-200 italic leading-relaxed">
            "{verse.text}"
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="p-5 space-y-4">
          {/* Color Highlighting Row */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
              Beri Warna Sorotan (Highlight)
            </div>
            <div className="flex items-center gap-3">
              {highlightColors.map((h) => {
                const isActive = currentHighlightColor === h.color;
                return (
                  <button
                    key={h.color}
                    id={`highlight-btn-${h.color}`}
                    onClick={() => {
                      if (isActive) {
                        onSetHighlight(null);
                      } else {
                        onSetHighlight(h.color);
                      }
                    }}
                    className={`flex-1 h-10 rounded-xl ${h.bg} ${h.border} border-2 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xs`}
                    title={h.name}
                  >
                    {isActive && <Check className="w-4 h-4 text-neutral-900 font-bold" />}
                  </button>
                );
              })}
              {currentHighlightColor && (
                <button
                  id="clear-highlight-btn"
                  onClick={() => onSetHighlight(null)}
                  className="px-3 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>

          {/* Action Tools */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {/* 1. Bookmark */}
            <button
              id="action-toggle-bookmark-btn"
              onClick={onToggleBookmark}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 font-bold'
                  : 'bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
            >
              <BookmarkIcon className={`w-5 h-5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="text-xs font-semibold">
                {isBookmarked ? 'Ditandai' : 'Bookmark'}
              </span>
            </button>

            {/* 2. Catatan Pribadi */}
            <button
              id="action-add-note-btn"
              onClick={() => {
                onClose();
                onOpenNoteEditor();
              }}
              className="p-3 rounded-2xl border bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex flex-col items-center justify-center gap-1.5 transition-all text-center"
            >
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-semibold">Tulis Catatan</span>
            </button>

            {/* 3. Baca Suara (TTS) */}
            <button
              id="action-audio-tts-btn"
              onClick={() => {
                onPlayAudio();
                onClose();
              }}
              className="p-3 rounded-2xl border bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex flex-col items-center justify-center gap-1.5 transition-all text-center"
            >
              <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-semibold">Dengar Suara</span>
            </button>

            {/* 4. Salin / Bagikan */}
            <button
              id="action-copy-verse-btn"
              onClick={handleCopy}
              className="p-3 rounded-2xl border bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex flex-col items-center justify-center gap-1.5 transition-all text-center"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-600">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-semibold">Salin Ayat</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Share full button */}
          <button
            id="action-share-full-btn"
            onClick={handleShare}
            className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Bagikan Firman (WhatsApp / Media Sosial)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
