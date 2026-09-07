import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Clock, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { Verse, Testament } from '../types';
import { BibleService } from '../data/bibleService';

interface SearchViewProps {
  onNavigateToVerse: (bookId: string, chapter: number, verseNum?: number) => void;
}

const POPULAR_TOPICS = [
  'Kasih',
  'Damai Sejahtera',
  'Doa Bapa Kami',
  'Mazmur 23',
  'Yohanes 3:16',
  'Iman dan Pengharapan',
  'Kekuatan',
  'Pengampunan',
  'Jangan Kuatir',
  'Roh Kudus',
];

export const SearchView: React.FC<SearchViewProps> = ({ onNavigateToVerse }) => {
  const [query, setQuery] = useState('');
  const [testamentFilter, setTestamentFilter] = useState<'ALL' | 'PL' | 'PB'>('ALL');
  const [results, setResults] = useState<Verse[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(BibleService.getSearchHistory());
  }, []);

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    setQuery(term);
    const res = BibleService.search(term, testamentFilter);
    setResults(res);
    setHasSearched(true);
    BibleService.addSearchHistory(term);
    setHistory(BibleService.getSearchHistory());
  };

  const handleClearHistory = () => {
    BibleService.clearSearchHistory();
    setHistory([]);
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 space-y-3 pb-24">
      {/* Slim Header Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-1.5">
          <Search className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Pencarian Ayat & Topik</span>
        </h2>
        <span className="text-[11px] text-neutral-400 hidden sm:inline">
          Cari ayat, kata kunci, atau tema
        </span>
      </div>

      {/* Main Search Input - Slim */}
      <div className="space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="relative flex items-center"
        >
          <Search className="absolute left-3.5 w-4 h-4 text-amber-600 dark:text-amber-400" />
          <input
            id="main-bible-search-input"
            type="text"
            placeholder="Cari kata atau ayat (cth: 'kasih', 'Yoh 3:16')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9.5 pr-20 py-2 sm:py-2.5 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1.5 focus:ring-amber-500 shadow-2xs"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setHasSearched(false);
              }}
              className="absolute right-14 text-[11px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 px-1.5 py-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            id="submit-search-btn"
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-lg shadow-xs transition-all"
          >
            Cari
          </button>
        </form>

        {/* Testament Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <span className="text-[11px] font-bold text-neutral-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-amber-600" />
          </span>
          {[
            { id: 'ALL' as const, label: 'Semua' },
            { id: 'PB' as const, label: 'Perjanjian Baru (PB)' },
            { id: 'PL' as const, label: 'Perjanjian Lama (PL)' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                setTestamentFilter(f.id);
                if (query) {
                  const res = BibleService.search(query, f.id);
                  setResults(res);
                }
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                testamentFilter === f.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {hasSearched ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
              Hasil Pencarian: <span className="text-amber-600 dark:text-amber-400">{results.length} ayat ditemukan</span>
            </h3>
          </div>

          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((verse) => (
                <div
                  key={verse.id}
                  id={`search-result-${verse.id}`}
                  onClick={() => onNavigateToVerse(verse.bookId, verse.chapter, verse.verse)}
                  className="p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300">
                      {verse.bookName} {verse.chapter}:{verse.verse}
                    </span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Buka Pasal <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="font-serif-bible text-neutral-800 dark:text-neutral-200 text-base leading-relaxed">
                    {verse.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-neutral-800/50 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6">
              <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-2 opacity-60" />
              <p className="font-bold text-neutral-700 dark:text-neutral-300">Tidak ada ayat yang cocok</p>
              <p className="text-xs text-neutral-500 mt-1">
                Coba gunakan kata kunci lain seperti "kasih", "damai", "iman", atau referensi seperti "Yoh 3:16"
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Popular Search Topics */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Topik & Ayat Populer:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleSearch(topic)}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-amber-500 hover:text-amber-600 text-neutral-700 dark:text-neutral-200 text-xs font-semibold shadow-xs transition-all active:scale-95"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {history.length > 0 && (
            <div className="space-y-2.5 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Riwayat Pencarian Terakhir:</span>
                </div>
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-neutral-400 hover:text-rose-500 transition-colors"
                >
                  Bersihkan Riwayat
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
