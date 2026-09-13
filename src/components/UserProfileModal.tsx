import React, { useState, useEffect } from 'react';
import { 
  X, User, Edit3, Heart, Download, Upload, LogOut, 
  Sparkles, BookOpen, Bookmark, FileText, Check, 
  ShieldCheck, AlertCircle, History, Clock, ChevronRight, Trash2 
} from 'lucide-react';
import { UserProfile, ReadingHistoryItem } from '../types';
import { AuthService } from '../data/authService';
import { BibleService } from '../data/bibleService';

interface UserProfileModalProps {
  user: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (updated: UserProfile) => void;
  onLogout: () => void;
  onOpenAuth: () => void;
  stats: {
    notesCount: number;
    bookmarksCount: number;
    highlightsCount: number;
    testimoniesCount: number;
  };
  onExportAllData: () => void;
  onImportData: (file: File) => void;
  onOpenSupabase?: () => void;
  onSelectChapter?: (bookId: string, chapter: number) => void;
}

const AVATAR_OPTIONS = ['🕊️', '✝️', '⭐', '🌿', '📖', '👑', '🕯️', '🍞', '🌈', '⛪'];

const formatTimeAgo = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return 'Baru saja';
  if (minutes < 60) return `${minutes} mnt lalu`;
  const hours = Math.floor(minutes / (1000 * 60 * 60));
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 1) return 'Kemarin';
  if (days < 7) return `${days} hari lalu`;
  return new Date(timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateUser,
  onLogout,
  onOpenAuth,
  stats,
  onExportAllData,
  onImportData,
  onOpenSupabase,
  onSelectChapter,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatarEmoji || '🕊️');
  const [favoriteVerse, setFavoriteVerse] = useState(user?.favoriteVerse || '');
  const [churchOrCity, setChurchOrCity] = useState(user?.churchOrCity || '');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [readingHistory, setReadingHistory] = useState<ReadingHistoryItem[]>(() => BibleService.getReadingHistory());

  useEffect(() => {
    if (isOpen) {
      setReadingHistory(BibleService.getReadingHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="w-full sm:max-w-md bg-white dark:bg-neutral-900 rounded-3xl p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-2xl">
            ✝️
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Masuk ke Akun Alkitab Anda
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Buat akun instan tanpa verifikasi email untuk menyimpan catatan, stabilo, dan berbagi kesaksian rohani.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs"
            >
              Masuk / Daftar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    if (!name.trim()) return;
    const updated = AuthService.updateProfile({
      name: name.trim(),
      avatarEmoji: avatar,
      favoriteVerse: favoriteVerse.trim() || undefined,
      churchOrCity: churchOrCity.trim() || undefined,
    });
    if (updated) {
      onUpdateUser(updated);
      setIsEditing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportData(file);
      setImportStatus('Data berhasil dipulihkan!');
      setTimeout(() => setImportStatus(null), 3000);
    }
  };

  const handleOpenChapter = (bookId: string, chapter: number) => {
    if (onSelectChapter) {
      onSelectChapter(bookId, chapter);
    }
    onClose();
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = BibleService.deleteReadingHistoryItem(id);
    setReadingHistory(updated);
  };

  const handleClearHistory = () => {
    BibleService.clearReadingHistory();
    setReadingHistory([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-lg bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="relative p-5 pb-4 bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border-b border-amber-500/20 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-amber-500/20">
              {user.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight font-serif-bible">
                  {user.name}
                </h2>
                {user.isGuest && (
                  <span className="px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
                    Tamu
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {user.emailOrUsername}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 font-sans-ui text-xs sm:text-sm">
          {isEditing ? (
            /* Editing Form */
            <div className="space-y-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Sunting Profil Anda</span>
              </h3>

              {/* Avatar options */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
                  Pilih Avatar:
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {AVATAR_OPTIONS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setAvatar(emoji)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 transition-all ${
                        avatar === emoji
                          ? 'bg-amber-500/25 border-2 border-amber-500 scale-105'
                          : 'bg-white dark:bg-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
                  Nama Lengkap:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
                  Ayat Favorit:
                </label>
                <input
                  type="text"
                  value={favoriteVerse}
                  onChange={e => setFavoriteVerse(e.target.value)}
                  placeholder="Contoh: Mazmur 23:1"
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
                  Gereja / Kota:
                </label>
                <input
                  type="text"
                  value={churchOrCity}
                  onChange={e => setChurchOrCity(e.target.value)}
                  placeholder="Contoh: GBI Jakarta"
                  className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 font-semibold text-xs"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          ) : (
            /* Profile Info Box */
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Detail Profil
                </span>
                <button
                  onClick={() => {
                    setName(user.name);
                    setAvatar(user.avatarEmoji);
                    setFavoriteVerse(user.favoriteVerse || '');
                    setChurchOrCity(user.churchOrCity || '');
                    setIsEditing(true);
                  }}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sunting</span>
                </button>
              </div>

              {user.favoriteVerse && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-500">Ayat Favorit:</span>
                  <span className="font-bold text-amber-700 dark:text-amber-300 font-serif-bible">
                    {user.favoriteVerse}
                  </span>
                </div>
              )}

              {user.churchOrCity && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-500">Gereja / Kota:</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {user.churchOrCity}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Riwayat Bacaan (10 Pasal Terakhir) Section */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Riwayat Bacaan
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                  {readingHistory.length} dari 10
                </span>
              </div>
              {readingHistory.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-[11px] font-semibold text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors px-1 py-0.5 rounded"
                  title="Hapus seluruh riwayat bacaan"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Bersihkan</span>
                </button>
              )}
            </div>

            {readingHistory.length === 0 ? (
              <div className="py-4 text-center text-neutral-400 space-y-1">
                <Clock className="w-6 h-6 mx-auto opacity-40 mb-1" />
                <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                  Belum ada riwayat bacaan
                </p>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 max-w-xs mx-auto">
                  Pasal yang Anda buka saat membaca Alkitab akan tersimpan di sini secara otomatis untuk akses cepat.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-0.5">
                {readingHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenChapter(item.bookId, item.chapter)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleOpenChapter(item.bookId, item.chapter);
                      }
                    }}
                    className="group relative flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 hover:border-amber-400 dark:hover:border-amber-500/60 hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                        item.testament === 'PB'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-stone-200 dark:bg-stone-700/80 text-stone-700 dark:text-stone-300'
                      }`}>
                        {item.testament}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-serif-bible font-bold text-neutral-900 dark:text-neutral-100 text-xs truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {item.bookName} {item.chapter}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-500 truncate">
                          {item.category && <span>{item.category}</span>}
                          <span>•</span>
                          <span>{formatTimeAgo(item.visitedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      <button
                        type="button"
                        onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-rose-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 opacity-60 sm:opacity-0 group-hover:opacity-100 transition-all"
                        title="Hapus dari riwayat"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-neutral-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Spiritual Activity Stats Grid */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
              Ringkasan Aktivitas Rohani
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <FileText className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <div className="text-base font-extrabold text-amber-900 dark:text-amber-200">
                  {stats.notesCount}
                </div>
                <div className="text-[10px] text-neutral-500">Catatan Khotbah</div>
              </div>

              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                <Bookmark className="w-4 h-4 text-rose-600 mx-auto mb-1" />
                <div className="text-base font-extrabold text-rose-900 dark:text-rose-200">
                  {stats.bookmarksCount}
                </div>
                <div className="text-[10px] text-neutral-500">Bookmark Ayat</div>
              </div>

              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-center">
                <BookOpen className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                <div className="text-base font-extrabold text-sky-900 dark:text-sky-200">
                  {stats.highlightsCount}
                </div>
                <div className="text-[10px] text-neutral-500">Stabilo Warna</div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <Heart className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <div className="text-base font-extrabold text-emerald-900 dark:text-emerald-200">
                  {stats.testimoniesCount}
                </div>
                <div className="text-[10px] text-neutral-500">Kesaksian Iman</div>
              </div>
            </div>
          </div>

          {/* Backup & Restore Data Section */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
              Cadangan & Pemulihan Data
            </span>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Anda dapat mengunduh seluruh catatan, bookmark, dan kesaksian Anda ke dalam file cadangan, atau memulihkannya kapan saja.
            </p>

            {importStatus && (
              <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>{importStatus}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={onExportAllData}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-amber-600" />
                <span>Cadangkan Data (Export)</span>
              </button>

              <label className="px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all">
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pulihkan Data (Import)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 px-5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
