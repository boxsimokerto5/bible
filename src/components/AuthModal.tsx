import React, { useState } from 'react';
import { X, User, Lock, Mail, Heart, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthService } from '../data/authService';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
}

const AVATAR_OPTIONS = ['🕊️', '✝️', '⭐', '🌿', '📖', '👑', '🕯️', '🍞', '🌈', '⛪'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'register',
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🕊️');
  const [favoriteVerse, setFavoriteVerse] = useState('');
  const [churchOrCity, setChurchOrCity] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'register') {
        const res = AuthService.register({
          name,
          emailOrUsername,
          password,
          avatarEmoji: selectedAvatar,
          favoriteVerse: favoriteVerse || undefined,
          churchOrCity: churchOrCity || undefined,
        });

        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setError(res.error || 'Gagal mendaftarkan akun.');
        }
      } else {
        const res = AuthService.login({
          emailOrUsername,
          password,
        });

        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setError(res.error || 'Gagal masuk akun.');
        }
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guest = AuthService.loginAsGuest();
    onSuccess(guest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex flex-col max-h-[92vh]"
      >
        {/* Header with warm spiritual banner */}
        <div className="relative p-5 pb-4 bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent border-b border-amber-500/20 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-amber-500/20">
              {mode === 'register' ? selectedAvatar : '✝️'}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight font-serif-bible">
                {mode === 'register' ? 'Buat Akun Alkitab' : 'Masuk ke Akun Anda'}
              </h2>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Instan • Tanpa Perlu Verifikasi Email</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector (Daftar / Masuk) */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-1">
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white dark:bg-neutral-800 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400'
            }`}
          >
            Daftar Akun Baru
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-neutral-800 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400'
            }`}
          >
            Masuk Akun
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto flex-1 font-sans-ui">
          {mode === 'register' && (
            <>
              {/* Avatar Selection */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5 block">
                  Pilih Avatar Rohani:
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {AVATAR_OPTIONS.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedAvatar(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all ${
                        selectedAvatar === emoji
                          ? 'bg-amber-500/25 border-2 border-amber-500 scale-105'
                          : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
                  Nama Lengkap:
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Yohanes Setiawan"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-9.5 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1.5 focus:ring-amber-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email or Username */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
              Email atau Username:
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                required
                placeholder="nama@email.com atau username"
                value={emailOrUsername}
                onChange={e => setEmailOrUsername(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1.5 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
              Kata Sandi:
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="password"
                required
                placeholder="Minimal 4 karakter"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9.5 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1.5 focus:ring-amber-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              {/* Favorite Verse (Optional) */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
                  Ayat Favorit / Pengingat Jiwa (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Yohanes 3:16, Mazmur 23:1"
                  value={favoriteVerse}
                  onChange={e => setFavoriteVerse(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Church or City (Optional) */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1 block">
                  Asal Gereja / Kota (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: GBI Jakarta / Surabaya"
                  value={churchOrCity}
                  onChange={e => setChurchOrCity(e.target.value)}
                  className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-amber-600/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{mode === 'register' ? 'Daftar & Masuk Sekarang' : 'Masuk ke Akun'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Guest Mode Link */}
          <div className="text-center pt-1 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="text-xs text-neutral-500 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors py-1"
            >
              Lanjutkan Sementara sebagai Tamu (Guest)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
