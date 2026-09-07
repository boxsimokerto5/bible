import React, { useState } from 'react';
import { X, Search, ChevronRight, BookOpen } from 'lucide-react';
import { Book, Testament } from '../types';
import { BIBLE_BOOKS } from '../data/books';

interface BookChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBookId: string;
  currentChapter: number;
  onSelect: (bookId: string, chapter: number) => void;
}

export const BookChapterModal: React.FC<BookChapterModalProps> = ({
  isOpen,
  onClose,
  currentBookId,
  currentChapter,
  onSelect,
}) => {
  const [activeTestament, setActiveTestament] = useState<Testament>('PB');
  const [selectedBook, setSelectedBook] = useState<Book | null>(() => {
    return BIBLE_BOOKS.find(b => b.id === currentBookId) || BIBLE_BOOKS[39];
  });
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredBooks = BIBLE_BOOKS.filter(book => {
    const matchesTestament = book.testament === activeTestament;
    const matchesSearch = searchQuery.trim() === '' || 
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return searchQuery.trim() !== '' ? matchesSearch : matchesTestament;
  });

  const categories = Array.from(new Set(filteredBooks.map(b => b.category)));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="book-chapter-modal-content"
        className="w-full sm:max-w-2xl bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden border border-neutral-200 dark:border-neutral-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Pilih Kitab & Pasal
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {selectedBook ? `${selectedBook.name} (${selectedBook.chaptersCount} Pasal)` : 'Pilih kitab'}
              </p>
            </div>
          </div>
          <button
            id="close-book-chapter-modal-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3.5 border-b border-neutral-100 dark:border-neutral-800">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="search-book-input"
              type="text"
              placeholder="Ketik nama kitab (cth: Yohanes, Mazmur, Roma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                Hapus
              </button>
            )}
          </div>
        </div>

        {/* Testament Switcher Tabs (Hidden when searching) */}
        {!searchQuery && (
          <div className="flex border-b border-neutral-100 dark:border-neutral-800 px-4 pt-2 gap-2 bg-neutral-50/40 dark:bg-neutral-900">
            <button
              id="tab-perjanjian-baru"
              onClick={() => {
                setActiveTestament('PB');
                const firstPB = BIBLE_BOOKS.find(b => b.testament === 'PB');
                if (firstPB && selectedBook?.testament !== 'PB') setSelectedBook(firstPB);
              }}
              className={`flex-1 pb-2.5 pt-1 font-semibold text-sm transition-all border-b-2 ${
                activeTestament === 'PB'
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              Perjanjian Baru (27)
            </button>
            <button
              id="tab-perjanjian-lama"
              onClick={() => {
                setActiveTestament('PL');
                const firstPL = BIBLE_BOOKS.find(b => b.testament === 'PL');
                if (firstPL && selectedBook?.testament !== 'PL') setSelectedBook(firstPL);
              }}
              className={`flex-1 pb-2.5 pt-1 font-semibold text-sm transition-all border-b-2 ${
                activeTestament === 'PL'
                  ? 'border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              Perjanjian Lama (39)
            </button>
          </div>
        )}

        {/* Main Grid: Left Book Selector, Right Chapter Selector */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden min-h-[360px]">
          {/* Books List Column (Width: 5 cols mobile, 5 cols desktop) */}
          <div className="col-span-5 sm:col-span-5 border-r border-neutral-100 dark:border-neutral-800 overflow-y-auto p-2 space-y-1">
            {categories.map(category => (
              <div key={category} className="mb-2">
                <div className="px-2 py-1 text-[11px] font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                  {category}
                </div>
                {filteredBooks
                  .filter(b => b.category === category)
                  .map(book => {
                    const isSelected = selectedBook?.id === book.id;
                    return (
                      <button
                        key={book.id}
                        id={`select-book-${book.id}`}
                        onClick={() => setSelectedBook(book)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-white font-semibold shadow-sm'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <span className="truncate">{book.name}</span>
                        <span className={`text-xs ml-1 ${isSelected ? 'text-amber-100' : 'text-neutral-400'}`}>
                          {book.chaptersCount}
                        </span>
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>

          {/* Chapters Column (Width: 7 cols mobile, 7 cols desktop) */}
          <div className="col-span-7 sm:col-span-7 overflow-y-auto p-3 sm:p-4 bg-neutral-50/50 dark:bg-neutral-900/40">
            {selectedBook ? (
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200/70 dark:border-neutral-800">
                  <div>
                    <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base">
                      {selectedBook.name}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Pilih nomor pasal (1 - {selectedBook.chaptersCount})
                    </p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                    {selectedBook.category}
                  </span>
                </div>

                {/* Big Touchable Numbers Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map(ch => {
                    const isCurrent = selectedBook.id === currentBookId && ch === currentChapter;
                    return (
                      <button
                        key={ch}
                        id={`select-chapter-${selectedBook.id}-${ch}`}
                        onClick={() => {
                          onSelect(selectedBook.id, ch);
                          onClose();
                        }}
                        className={`aspect-square flex items-center justify-center rounded-xl font-bold text-base transition-all ${
                          isCurrent
                            ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400 ring-offset-2 dark:ring-offset-neutral-900'
                            : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 hover:shadow-xs active:scale-95'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-neutral-400 text-sm">
                Pilih kitab di sebelah kiri
              </div>
            )}
          </div>
        </div>

        {/* Footer info for elderly clarity */}
        <div className="px-5 py-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <span>Sentuh angka pasal untuk langsung membuka ayat</span>
          <button
            onClick={onClose}
            className="font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
