import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Trash2, Tag, BookOpen, FileText, Mic, MicOff, AlertCircle, Check, Volume2 } from 'lucide-react';
import { Note, Verse } from '../types';
import { useSpeechToText } from '../hooks/useSpeechToText';

interface NoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse?: Verse | null;
  existingNote?: Note | null;
  onSave: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  onDelete?: (id: string) => void;
}

const COMMON_TAGS = ['Renungan Harian', 'Khotbah & Pengajaran', 'Studi Eksegesis', 'Pokok Doa & Syukur', 'Janji Tuhan', 'Aplikasi Hidup'];

const QUICK_TITLES = [
  'Refleksi Firman:',
  'Khotbah Minggu:',
  'Pokok Doa & Syukur:',
  'Studi Eksegesis:',
];

export const NoteEditorModal: React.FC<NoteEditorModalProps> = ({
  isOpen,
  onClose,
  verse,
  existingNote,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState('');
  const [activeSpeechField, setActiveSpeechField] = useState<'title' | 'content' | null>(null);

  const {
    isListening,
    transcript,
    interimTranscript,
    error: speechError,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText({
    lang: 'id-ID',
    continuous: true,
    interimResults: true,
  });

  const lastProcessedTranscriptRef = useRef('');

  // Handle live speech transcript insertion
  useEffect(() => {
    if (!transcript) {
      lastProcessedTranscriptRef.current = '';
      return;
    }

    // Determine the newly added chunk
    const lastLength = lastProcessedTranscriptRef.current.length;
    const newChunk = transcript.slice(lastLength).trim();

    if (newChunk) {
      if (activeSpeechField === 'title') {
        setTitle(prev => {
          const sep = prev.trim() ? ' ' : '';
          return prev.trim() + sep + newChunk;
        });
      } else if (activeSpeechField === 'content') {
        setContent(prev => {
          const sep = prev.trim() ? ' ' : '';
          return prev.trim() + sep + newChunk;
        });
      }
      lastProcessedTranscriptRef.current = transcript;
    }
  }, [transcript, activeSpeechField]);

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setTags(existingNote.tags || []);
    } else if (verse) {
      setTitle(`Refleksi ${verse.bookName} ${verse.chapter}:${verse.verse}`);
      setContent('');
      setTags(['Renungan Harian']);
    } else {
      setTitle('');
      setContent('');
      setTags(['Renungan Harian']);
    }
    stopListening();
    setActiveSpeechField(null);
    resetTranscript();
  }, [existingNote, verse, isOpen]);

  if (!isOpen) return null;

  const targetBookName = existingNote?.bookName || verse?.bookName || 'Alkitab';
  const targetChapter = existingNote?.chapter || verse?.chapter || 1;
  const targetVerse = existingNote?.verse || verse?.verse || 1;
  const targetVerseText = existingNote?.verseText || verse?.text || '';
  const targetBookId = existingNote?.bookId || verse?.bookId || 'yoh';

  const toggleTag = (t: string) => {
    if (tags.includes(t)) {
      setTags(tags.filter(item => item !== t));
    } else {
      setTags([...tags, t]);
    }
  };

  const addCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTagInput.trim() && !tags.includes(customTagInput.trim())) {
      setTags([...tags, customTagInput.trim()]);
      setCustomTagInput('');
    }
  };

  const toggleSpeechForField = (field: 'title' | 'content') => {
    if (isListening && activeSpeechField === field) {
      // Stop
      stopListening();
      setActiveSpeechField(null);
      resetTranscript();
    } else {
      // Start or Switch
      resetTranscript();
      lastProcessedTranscriptRef.current = '';
      setActiveSpeechField(field);
      startListening();
    }
  };

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    if (isListening) {
      stopListening();
    }

    onSave({
      id: existingNote?.id,
      bookId: targetBookId,
      bookName: targetBookName,
      chapter: targetChapter,
      verse: targetVerse,
      verseText: targetVerseText,
      title: title.trim() || `Refleksi ${targetBookName} ${targetChapter}:${targetVerse}`,
      content: content.trim(),
      tags,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="note-editor-modal-content"
        className="w-full sm:max-w-2xl bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {existingNote ? 'Sunting Catatan & Refleksi' : 'Tulis Jurnal & Refleksi Firman'}
              </h2>
              <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                {targetBookName} {targetChapter}:{targetVerse} • Dikte Suara & Catatan Pribadi
              </p>
            </div>
          </div>
          <button
            id="close-note-editor-btn"
            onClick={() => {
              stopListening();
              onClose();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Speech Recognition Floating Banner if Active */}
        {isListening && (
          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2.5 flex items-center justify-between shadow-inner animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="relative flex items-center justify-center shrink-0">
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider">
                    Mendengarkan Suara ({activeSpeechField === 'title' ? 'Judul' : 'Isi Refleksi'})...
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                    Bahasa Indonesia
                  </span>
                </div>
                {interimTranscript && (
                  <p className="text-xs italic text-red-100 truncate mt-0.5">
                    "{interimTranscript}..."
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                stopListening();
                setActiveSpeechField(null);
                resetTranscript();
              }}
              className="px-3 py-1 bg-white text-red-700 hover:bg-red-50 text-xs font-extrabold rounded-lg shadow-xs shrink-0 active:scale-95 transition-all flex items-center gap-1"
            >
              <MicOff className="w-3.5 h-3.5" />
              <span>Selesai Bicara</span>
            </button>
          </div>
        )}

        {/* Speech Error Banner */}
        {speechError && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-800 dark:text-amber-300 px-4 py-2 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{speechError}</span>
          </div>
        )}

        {/* Note Body Form */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          {/* Verse Reference Card */}
          {targetVerseText && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-neutral-800 dark:text-neutral-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">
                <BookOpen className="w-4 h-4" />
                <span>{targetBookName} {targetChapter}:{targetVerse}</span>
              </div>
              <p className="text-xs italic font-serif-bible text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{targetVerseText}"
              </p>
            </div>
          )}

          {/* Title Input with Voice Button */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Judul Refleksi / Tema Studi:
              </label>

              {/* Speak-to-Text Button for Title */}
              {isSpeechSupported && (
                <button
                  type="button"
                  id="voice-title-btn"
                  onClick={() => toggleSpeechForField('title')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    isListening && activeSpeechField === 'title'
                      ? 'bg-red-600 text-white animate-pulse shadow-xs'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300'
                  }`}
                  title="Diktekan judul dengan suara"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isListening && activeSpeechField === 'title' ? 'Mendengarkan...' : 'Dikte Judul'}</span>
                </button>
              )}
            </div>
            
            <input
              id="note-title-input"
              type="text"
              placeholder="Contoh: Kasih Karunia yang Memulihkan, Makna Pengorbanan Kristus..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />

            {/* Quick Title Prefix Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-neutral-400 font-semibold mr-1">Awalan Cepat:</span>
              {QUICK_TITLES.map((qt) => (
                <button
                  key={qt}
                  type="button"
                  onClick={() => {
                    if (!title.includes(qt)) {
                      setTitle(`${qt} ${title.replace(/^(Refleksi|Catatan|Khotbah|Pokok Doa)[^:]*:\s*/i, '').trim()}`.trim());
                    }
                  }}
                  className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-[11px] font-semibold text-neutral-600 dark:text-neutral-300 hover:text-amber-700 dark:hover:text-amber-300 transition-colors border border-neutral-200/60 dark:border-neutral-700"
                >
                  + {qt}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Klasifikasi Kategori & Topik:</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_TAGS.map(t => {
                const isSelected = tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            
            {/* Custom tag add */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="+ Tambah kategori / topik kustom..."
                value={customTagInput}
                onChange={(e) => setCustomTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomTag(e);
                  }
                }}
                className="flex-1 px-3.5 py-1.5 sm:py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={addCustomTag}
                className="px-4 py-1.5 sm:py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-bold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
              >
                Tambah
              </button>
            </div>
          </div>

          {/* Content Textarea with Prominent Voice Dictation Bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Isi Refleksi, Pelajaran Teologis & Doa:
              </label>

              {/* Primary Speak-to-Text Button for Content */}
              {isSpeechSupported ? (
                <button
                  type="button"
                  id="voice-content-btn"
                  onClick={() => toggleSpeechForField('content')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    isListening && activeSpeechField === 'content'
                      ? 'bg-red-600 text-white animate-pulse ring-2 ring-red-300 dark:ring-red-900'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                  title="Tekan dan mulai berbicara untuk mengetik otomatis"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>
                    {isListening && activeSpeechField === 'content'
                      ? 'Sedang Merekam Suara...'
                      : 'Bicara untuk Mengetik'}
                  </span>
                </button>
              ) : (
                <span className="text-[11px] text-neutral-400">
                  (Dikte suara butuh Chrome / Safari)
                </span>
              )}
            </div>

            <div className="relative">
              <textarea
                id="note-content-textarea"
                rows={6}
                placeholder="Tuliskan perenungan firman atau tekan tombol 'Bicara untuk Mengetik' di atas untuk mendiktekan pemikiran Anda secara otomatis..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full p-4 bg-neutral-50 dark:bg-neutral-800 border rounded-2xl text-sm sm:text-base text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-sans-ui shadow-2xs transition-all ${
                  isListening && activeSpeechField === 'content'
                    ? 'border-red-500 ring-2 ring-red-500/20'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              />

              {/* Floating Mic indicator at bottom-right of textarea */}
              {isSpeechSupported && (
                <button
                  type="button"
                  onClick={() => toggleSpeechForField('content')}
                  className={`absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isListening && activeSpeechField === 'content'
                      ? 'bg-red-600 text-white scale-110'
                      : 'bg-white dark:bg-neutral-700 text-neutral-600 dark:text-neutral-200 hover:bg-amber-50 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600'
                  }`}
                  title="Diktekan isi catatan"
                >
                  {isListening && activeSpeechField === 'content' ? (
                    <MicOff className="w-4 h-4 animate-spin" />
                  ) : (
                    <Mic className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  )}
                </button>
              )}
            </div>

            <p className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
              <span>💡</span>
              <span>Tekan tombol mikrofon, lalu ucapkan renungan Anda. Sistem otomatis mengenali Bahasa Indonesia.</span>
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-3.5 sm:p-4 px-4 sm:px-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between">
          {existingNote && onDelete ? (
            <button
              id="delete-note-btn"
              onClick={() => {
                if (window.confirm('Yakin ingin menghapus catatan ini?')) {
                  onDelete(existingNote.id);
                  onClose();
                }
              }}
              className="px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="cancel-note-btn"
              onClick={() => {
                stopListening();
                onClose();
              }}
              className="px-3.5 sm:px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs sm:text-sm font-bold"
            >
              Batal
            </button>
            <button
              id="save-note-btn"
              onClick={handleSave}
              disabled={!title.trim() && !content.trim()}
              className="px-5 sm:px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 sm:gap-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Catatan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

