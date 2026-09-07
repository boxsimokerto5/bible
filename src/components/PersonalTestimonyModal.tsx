import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Trash2, Mic, MicOff, AlertCircle, Sparkles, Heart, BookOpen, Globe, Lock, User } from 'lucide-react';
import { UserPersonalTestimony, UserProfile } from '../types';
import { useSpeechToText } from '../hooks/useSpeechToText';

interface PersonalTestimonyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testimony: UserPersonalTestimony) => void;
  onDelete?: (id: string) => void;
  existingTestimony?: UserPersonalTestimony | null;
  currentUser?: UserProfile | null;
  onRequireAuth?: () => void;
}

const TESTIMONY_CATEGORIES = [
  'Mukjizat Kesembuhan',
  'Pertolongan Keuangan',
  'Pemulihan Keluarga',
  'Jawaban Doa',
  'Pertobatan Hidup',
  'Penyertaan dalam Badai',
  'Berkat Pekerjaan',
];

export const PersonalTestimonyModal: React.FC<PersonalTestimonyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  existingTestimony,
  currentUser,
  onRequireAuth,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(TESTIMONY_CATEGORIES[0]);
  const [story, setStory] = useState('');
  const [bibleVerse, setBibleVerse] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [authorName, setAuthorName] = useState(currentUser?.name || '');
  const [activeSpeechField, setActiveSpeechField] = useState<'title' | 'story' | null>(null);

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

  useEffect(() => {
    if (!transcript) {
      lastProcessedTranscriptRef.current = '';
      return;
    }

    const lastLength = lastProcessedTranscriptRef.current.length;
    const newChunk = transcript.slice(lastLength).trim();

    if (newChunk) {
      if (activeSpeechField === 'title') {
        setTitle(prev => {
          const sep = prev.trim() ? ' ' : '';
          return prev.trim() + sep + newChunk;
        });
      } else if (activeSpeechField === 'story') {
        setStory(prev => {
          const sep = prev.trim() ? ' ' : '';
          return prev.trim() + sep + newChunk;
        });
      }
      lastProcessedTranscriptRef.current = transcript;
    }
  }, [transcript, activeSpeechField]);

  useEffect(() => {
    if (existingTestimony) {
      setTitle(existingTestimony.title);
      setCategory(existingTestimony.category);
      setStory(existingTestimony.story);
      setBibleVerse(existingTestimony.bibleVerse || '');
      setIsPublic(existingTestimony.isPublic ?? true);
      setAuthorName(existingTestimony.authorName || currentUser?.name || 'Hamba Tuhan');
    } else {
      setTitle('');
      setCategory(TESTIMONY_CATEGORIES[0]);
      setStory('');
      setBibleVerse('');
      setIsPublic(true);
      setAuthorName(currentUser?.name || 'Hamba Tuhan');
    }
    stopListening();
    setActiveSpeechField(null);
    resetTranscript();
  }, [existingTestimony, isOpen, currentUser]);

  if (!isOpen) return null;

  const toggleSpeechForField = (field: 'title' | 'story') => {
    if (isListening && activeSpeechField === field) {
      stopListening();
      setActiveSpeechField(null);
      resetTranscript();
    } else {
      resetTranscript();
      lastProcessedTranscriptRef.current = '';
      setActiveSpeechField(field);
      startListening();
    }
  };

  const handleSave = () => {
    if (!title.trim() || !story.trim()) return;
    if (isListening) {
      stopListening();
    }

    const todayDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    onSave({
      id: existingTestimony?.id || `testimony-${Date.now()}`,
      title: title.trim(),
      category,
      story: story.trim(),
      bibleVerse: bibleVerse.trim() || undefined,
      date: existingTestimony?.date || todayDate,
      authorId: currentUser?.id || 'guest',
      authorName: authorName.trim() || currentUser?.name || 'Hamba Tuhan',
      authorAvatar: currentUser?.avatarEmoji || '🕊️',
      isPublic: isPublic,
      amenCount: existingTestimony?.amenCount || 1,
      createdAt: existingTestimony?.createdAt || Date.now(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-2xl bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {existingTestimony ? 'Sunting Kesaksian' : 'Tulis Kesaksian Berkat Tuhan'}
              </h2>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Dokumentasikan karya dan pertolongan Tuhan dalam hidup Anda
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopListening();
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Speech Recognition Bar if Active */}
        {isListening && (
          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-2.5 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold uppercase">
                  Mendengarkan ({activeSpeechField === 'title' ? 'Judul' : 'Kisah'})...
                </span>
                {interimTranscript && (
                  <p className="text-xs italic text-red-100 truncate">"{interimTranscript}..."</p>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                stopListening();
                setActiveSpeechField(null);
                resetTranscript();
              }}
              className="px-2.5 py-1 bg-white text-red-700 font-extrabold text-xs rounded-lg active:scale-95 flex items-center gap-1"
            >
              <MicOff className="w-3.5 h-3.5" />
              <span>Selesai</span>
            </button>
          </div>
        )}

        {speechError && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-800 dark:text-amber-300 px-4 py-2 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>{speechError}</span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Public vs Private Sharing Toggle */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isPublic ? 'bg-amber-600 text-white' : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200'
              }`}>
                {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  {isPublic ? 'Bagikan ke Komunitas Jemaat' : 'Simpan Khusus Pribadi (Private)'}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {isPublic
                    ? 'Dapat dibaca oleh jemaat lain di tab Komunitas untuk saling menguatkan'
                    : 'Hanya tersimpan di catatan pribadi akun Anda'}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all self-start sm:self-center shrink-0 ${
                isPublic
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200'
              }`}
            >
              {isPublic ? 'Publik Aktif' : 'Pribadi'}
            </button>
          </div>

          {/* Author Name */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
              Nama Penulis Kesaksian:
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Nama Anda atau Anonim (Hamba Tuhan)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1.5 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5 block">
              Kategori Kesaksian:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TESTIMONY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    category === cat
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Judul Kesaksian:
              </label>
              {isSpeechSupported && (
                <button
                  type="button"
                  onClick={() => toggleSpeechForField('title')}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                    isListening && activeSpeechField === 'title'
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isListening && activeSpeechField === 'title' ? 'Mendengarkan...' : 'Dikte'}</span>
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Contoh: Pertolongan Tuhan Saat Menghadapi Sakit Berat..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-bold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>

          {/* Bible Verse Reference (Optional) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Ayat Alkitab Pijakan (Opsional):</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Mazmur 23:1, Filipi 4:13, Yeremia 29:11"
              value={bibleVerse}
              onChange={(e) => setBibleVerse(e.target.value)}
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Story Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Isi Kesaksian Nyata Anda:
              </label>
              {isSpeechSupported && (
                <button
                  type="button"
                  onClick={() => toggleSpeechForField('story')}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    isListening && activeSpeechField === 'story'
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isListening && activeSpeechField === 'story' ? 'Sedang Merekam...' : 'Bicara untuk Mengetik'}</span>
                </button>
              )}
            </div>
            <textarea
              rows={6}
              placeholder="Ceritakan bagaimana Tuhan campur tangan, menolong, dan menyatakan kasih-Nya dalam hidup Anda secara nyata..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 leading-relaxed font-sans-ui focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 px-5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between">
          {existingTestimony && onDelete ? (
            <button
              onClick={() => {
                if (window.confirm('Hapus kesaksian ini?')) {
                  onDelete(existingTestimony.id);
                  onClose();
                }
              }}
              className="px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                stopListening();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 text-xs font-bold"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim() || !story.trim()}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Kesaksian</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
