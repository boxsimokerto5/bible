import React, { useState } from 'react';
import { Bookmark as BookmarkIcon, Highlighter, Trash2, Copy, ChevronRight, Check, Sparkles } from 'lucide-react';
import { Bookmark, Highlight, HighlightColor } from '../types';

interface BookmarksViewProps {
  bookmarks: Bookmark[];
  highlights: Highlight[];
  onNavigateToVerse: (bookId: string, chapter: number, verseNum?: number) => void;
  onDeleteBookmark: (id: string) => void;
  onDeleteHighlight: (bookId: string, chapter: number, verse: number) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  highlights,
  onNavigateToVerse,
  onDeleteBookmark,
  onDeleteHighlight,
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'highlights'>('bookmarks');
  const [selectedColor, setSelectedColor] = useState<HighlightColor | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string, ref: string) => {
    navigator.clipboard.writeText(`"${text}"\n— ${ref} (TB)`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredHighlights = highlights.filter(h => {
    return selectedColor === 'all' ? true : h.color === selectedColor;
  });

  const getColorBg = (color: HighlightColor) => {
    switch (color) {
      case 'amber': return 'bg-amber-100 dark:bg-amber-900/40 text-amber-950 dark:text-amber-100 border-amber-300';
      case 'emerald': return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-950 dark:text-emerald-100 border-emerald-300';
      case 'sky': return 'bg-sky-100 dark:bg-sky-900/40 text-sky-950 dark:text-sky-100 border-sky-300';
      case 'rose': return 'bg-rose-100 dark:bg-rose-900/40 text-rose-950 dark:text-rose-100 border-rose-300';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900/40 text-purple-950 dark:text-purple-100 border-purple-300';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 space-y-3 pb-24">
      {/* Slim Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        <h2 className="text-base sm:text-xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-1.5">
          <BookmarkIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Ayat Tersimpan & Sorotan</span>
        </h2>

        {/* Tabs - Compact */}
        <div className="flex items-center gap-2">
          <button
            id="bookmarks-tab-btn"
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
            }`}
          >
            <BookmarkIcon className={`w-3.5 h-3.5 ${activeTab === 'bookmarks' ? 'fill-white' : ''}`} />
            <span>Bookmark ({bookmarks.length})</span>
          </button>

          <button
            id="highlights-tab-btn"
            onClick={() => setActiveTab('highlights')}
            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'highlights'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
            }`}
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>Sorotan ({highlights.length})</span>
          </button>
        </div>
      </div>

      {/* Bookmarks Tab Content */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length > 0 ? (
            bookmarks.map((bm) => (
              <div
                key={bm.id}
                id={`bookmark-item-${bm.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-xs hover:shadow-md transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300">
                    {bm.bookName} {bm.chapter}:{bm.verse}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(bm.id, bm.text, `${bm.bookName} ${bm.chapter}:${bm.verse}`)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      title="Salin Ayat"
                    >
                      {copiedId === bm.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onDeleteBookmark(bm.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      title="Hapus Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p 
                  onClick={() => onNavigateToVerse(bm.bookId, bm.chapter, bm.verse)}
                  className="font-serif-bible text-base text-neutral-800 dark:text-neutral-200 leading-relaxed cursor-pointer hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                >
                  "{bm.text}"
                </p>

                <div className="flex items-center justify-between pt-1 text-xs text-neutral-400">
                  <span>{new Date(bm.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                  <button
                    onClick={() => onNavigateToVerse(bm.bookId, bm.chapter, bm.verse)}
                    className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                  >
                    Buka Ayat <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white dark:bg-neutral-800/50 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6">
              <BookmarkIcon className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-2" />
              <p className="font-bold text-neutral-700 dark:text-neutral-300">Belum ada ayat yang di-bookmark</p>
              <p className="text-xs text-neutral-500 mt-1">
                Sentuh ayat saat membaca, lalu pilih tanda bintang (Bookmark) untuk menyimpannya di sini.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Highlights Tab Content */}
      {activeTab === 'highlights' && (
        <div className="space-y-3">
          {/* Color Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-neutral-500">Filter Warna:</span>
            <button
              onClick={() => setSelectedColor('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                selectedColor === 'all'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Semua
            </button>
            {(['amber', 'emerald', 'sky', 'rose', 'purple'] as HighlightColor[]).map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  c === 'amber' ? 'bg-amber-300' :
                  c === 'emerald' ? 'bg-emerald-300' :
                  c === 'sky' ? 'bg-sky-300' :
                  c === 'rose' ? 'bg-rose-300' : 'bg-purple-300'
                } ${selectedColor === c ? 'scale-125 ring-2 ring-neutral-900 dark:ring-white' : 'opacity-70 hover:opacity-100'}`}
              />
            ))}
          </div>

          {filteredHighlights.length > 0 ? (
            filteredHighlights.map((hl) => (
              <div
                key={hl.id}
                id={`highlight-item-${hl.id}`}
                className={`p-4 rounded-2xl border ${getColorBg(hl.color)} shadow-xs space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-black/10 text-current">
                    {hl.bookName} {hl.chapter}:{hl.verse}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(hl.id, hl.text, `${hl.bookName} ${hl.chapter}:${hl.verse}`)}
                      className="p-1.5 rounded-lg hover:bg-black/10"
                      title="Salin Ayat"
                    >
                      {copiedId === hl.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onDeleteHighlight(hl.bookId, hl.chapter, hl.verse)}
                      className="p-1.5 rounded-lg hover:bg-rose-500/20 text-rose-700 dark:text-rose-300"
                      title="Hapus Sorotan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p 
                  onClick={() => onNavigateToVerse(hl.bookId, hl.chapter, hl.verse)}
                  className="font-serif-bible text-base leading-relaxed cursor-pointer font-medium"
                >
                  "{hl.text}"
                </p>

                <div className="flex items-center justify-between pt-1 text-xs opacity-75">
                  <span>{new Date(hl.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                  <button
                    onClick={() => onNavigateToVerse(hl.bookId, hl.chapter, hl.verse)}
                    className="font-bold underline flex items-center gap-0.5"
                  >
                    Buka Ayat <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white dark:bg-neutral-800/50 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6">
              <Sparkles className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-2" />
              <p className="font-bold text-neutral-700 dark:text-neutral-300">Belum ada ayat dengan warna sorotan ini</p>
              <p className="text-xs text-neutral-500 mt-1">
                Sentuh ayat saat membaca, lalu pilih warna sorotan untuk mewarnai ayat.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
