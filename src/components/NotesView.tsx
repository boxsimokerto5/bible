import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Tag, BookOpen, Trash2, 
  Edit3, Download, Upload, Calendar, ChevronRight 
} from 'lucide-react';
import { Note } from '../types';
import { BibleService } from '../data/bibleService';

interface NotesViewProps {
  notes: Note[];
  onOpenCreateNote: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onNavigateToVerse: (bookId: string, chapter: number, verseNum?: number) => void;
  onRefreshData: () => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  onOpenCreateNote,
  onEditNote,
  onDeleteNote,
  onNavigateToVerse,
  onRefreshData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(notes.flatMap(n => n.tags || []))
  );

  const filteredNotes = notes.filter(n => {
    const matchesTag = selectedTag ? n.tags?.includes(selectedTag) : true;
    const matchesSearch = searchQuery.trim() === '' || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.verseText?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  const handleExport = () => {
    const dataStr = BibleService.exportBackupData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Alkitab_Jurnal_Catatan_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = BibleService.importBackupData(content);
        if (success) {
          alert('Data catatan dan bookmark berhasil dipulihkan!');
          onRefreshData();
        } else {
          alert('Format file cadangan tidak valid.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 space-y-3 pb-24">
      {/* Slim & Professional Header Section */}
      <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/20 dark:via-neutral-900 border border-amber-500/20 dark:border-amber-500/10 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-1.5 truncate">
                <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Jurnal & Refleksi Firman</span>
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 shrink-0">
                {notes.length}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
              Dokumentasi studi firman, khotbah & doa pribadi
            </p>
          </div>

          <button
            id="create-new-note-btn"
            onClick={onOpenCreateNote}
            className="px-3 sm:px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">Refleksi Baru</span>
            <span className="xs:hidden">Tulis</span>
          </button>
        </div>
      </div>

      {/* Search and Filters - Compact */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="search-notes-input"
            type="text"
            placeholder="Cari dalam judul, isi catatan, atau nama kitab..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1.5 focus:ring-amber-500 shadow-2xs"
          />
        </div>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            <span className="text-[11px] font-bold text-neutral-400 flex items-center gap-1 shrink-0">
              <Tag className="w-3 h-3 text-amber-600" />
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                selectedTag === null
                  ? 'bg-amber-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              Semua
            </button>
            {allTags.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTag(t)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                  selectedTag === t
                    ? 'bg-amber-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              id={`note-card-${note.id}`}
              className="p-5 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-xs hover:shadow-md transition-all space-y-3"
            >
              {/* Header: Title and Actions */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 leading-snug">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => onNavigateToVerse(note.bookId, note.chapter, note.verse)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-lg hover:bg-amber-500/20 transition-colors"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{note.bookName} {note.chapter}:{note.verse}</span>
                    </button>
                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(note.updatedAt || note.createdAt).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    id={`edit-note-${note.id}`}
                    onClick={() => onEditNote(note)}
                    className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                    title="Edit Catatan"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    id={`delete-note-${note.id}`}
                    onClick={() => {
                      if (window.confirm(`Hapus catatan "${note.title}"?`)) {
                        onDeleteNote(note.id);
                      }
                    }}
                    className="p-2 rounded-xl text-neutral-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Hapus Catatan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Verse Snippet */}
              {note.verseText && (
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 text-xs italic font-serif-bible text-neutral-600 dark:text-neutral-300 line-clamp-2">
                  "{note.verseText}"
                </div>
              )}

              {/* Content Body */}
              <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans-ui whitespace-pre-line">
                {note.content}
              </p>

              {/* Tags and Footer */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-700/60 text-[11px] font-semibold text-neutral-600 dark:text-neutral-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-neutral-800/50 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <p className="font-bold text-base text-neutral-800 dark:text-neutral-200">
                Belum Ada Catatan Refleksi
              </p>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-md mx-auto leading-relaxed">
                Mulai dokumentasikan ayat hafalan, pesan khotbah, perenungan harian, atau doa Anda dengan menekan tombol <strong className="text-amber-700 dark:text-amber-400 font-semibold">"Tulis Refleksi Baru"</strong> di atas.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Backup and Restore Box */}
      <div className="p-5 rounded-3xl bg-neutral-100/80 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
            Sinkronisasi & Pencadangan Data Jurnal
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Ekspor arsip catatan dan pembatas ayat agar aman serta dapat dipindahkan ke perangkat lain dengan mudah.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="export-backup-btn"
            onClick={handleExport}
            className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-50 shadow-xs active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>Ekspor Cadangan</span>
          </button>

          <label className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-600 text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-50 shadow-xs cursor-pointer active:scale-95 transition-all">
            <Upload className="w-3.5 h-3.5 text-indigo-600" />
            <span>Impor Cadangan</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};
