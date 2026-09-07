import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, BookOpen, ShieldCheck, Heart, User, Lock, Mail, 
  ArrowRight, AlertCircle, Bookmark, Brain, MessageSquare
} from 'lucide-react';
import { AuthService } from '../data/authService';
import { UserProfile } from '../types';
import { CrossLogo } from './CrossLogo';

interface PostSplashAuthScreenProps {
  onSuccess: (user: UserProfile) => void;
  onContinueAsGuest: () => void;
  initialMode?: 'register' | 'login';
}

const AVATAR_OPTIONS = [
  { emoji: '🕊️', label: 'Merpati Damai' },
  { emoji: '✝️', label: 'Salib Kasih' },
  { emoji: '⭐', label: 'Bintang Betlehem' },
  { emoji: '🌿', label: 'Ranting Zaitun' },
  { emoji: '📖', label: 'Kitab Suci' },
  { emoji: '👑', label: 'Mahkota Kehidupan' },
  { emoji: '🕯️', label: 'Pelita Terang' },
  { emoji: '🍞', label: 'Roti Hidup' },
  { emoji: '🌈', label: 'Pelangi Perjanjian' },
  { emoji: '⛪', label: 'Bait Suci' },
];

export const PostSplashAuthScreen: React.FC<PostSplashAuthScreenProps> = ({
  onSuccess,
  onContinueAsGuest,
  initialMode = 'register',
}) => {
  const [mode, setMode] = useState<'register' | 'login'>(initialMode);
  const [name, setName] = useState('');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🕊️');
  const [favoriteVerse, setFavoriteVerse] = useState('');
  const [churchOrCity, setChurchOrCity] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        } else {
          setError(res.error || 'Gagal masuk akun.');
        }
      }
    } catch {
      setError('Terjadi kendala saat memproses akun. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#f7f1e3] text-[#2c180e] overflow-y-auto font-sans-ui selection:bg-amber-700 selection:text-white"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.7) 0%, rgba(247, 241, 227, 0.5) 60%, rgba(230, 218, 195, 0.8) 100%),
          radial-gradient(circle at 10% 20%, rgba(180, 83, 9, 0.04) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(120, 53, 15, 0.04) 0%, transparent 40%)
        `,
      }}
    >
      {/* Vintage Ambient Warm Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="absolute top-1/3 left-6 w-64 h-64 rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-6 sm:py-10 flex flex-col my-auto space-y-5">
        
        {/* Top Header / Branding */}
        <div className="text-center space-y-2.5">
          <div className="flex justify-center mb-1">
            <div className="p-1 rounded-2xl bg-amber-700/5 border border-amber-800/20 shadow-md shadow-amber-900/10">
              <CrossLogo className="w-14 h-14 sm:w-16 sm:h-16" variant="badge" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eee3cd] border border-[#d6c4a8] text-[#78350f] text-xs font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Alkitab Digital • Edisi Rohani</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2c180e] tracking-tight font-cinzel">
            {mode === 'register' ? 'Buat Akun Rohani Anda' : 'Selamat Datang Kembali'}
          </h1>

          <p className="text-xs sm:text-sm text-[#614227] max-w-md mx-auto leading-relaxed">
            {mode === 'register' 
              ? 'Daftar instan tanpa verifikasi email rumit untuk menyimpan catatan renungan, stabilo ayat, dan kesaksian iman Anda.'
              : 'Masuk untuk mengakses kembali catatan pribadi, penanda buku, dan histori kuis firman Anda.'}
          </p>
        </div>

        {/* Feature Benefits Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
          <div className="p-2.5 rounded-2xl bg-[#fcf9f2] border border-[#dfceb6] shadow-xs flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-700/10 text-amber-800 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold text-[#422916] leading-tight">
              Catatan & Doa Pribadi
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#fcf9f2] border border-[#dfceb6] shadow-xs flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-emerald-700/10 text-emerald-800 flex items-center justify-center shrink-0">
              <Bookmark className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold text-[#422916] leading-tight">
              Penanda & Stabilo Ayat
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#fcf9f2] border border-[#dfceb6] shadow-xs flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-sky-700/10 text-sky-800 flex items-center justify-center shrink-0">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold text-[#422916] leading-tight">
              Kuis & Hafalan Firman
            </span>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#fcf9f2] border border-[#dfceb6] shadow-xs flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-rose-700/10 text-rose-800 flex items-center justify-center shrink-0">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-bold text-[#422916] leading-tight">
              Kisah Kesaksian Iman
            </span>
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="bg-[#fcfaf5] border border-[#dac8b0] rounded-3xl shadow-xl shadow-amber-950/10 overflow-hidden relative">
          {/* Subtle Vintage Gold Filigree Edge */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700" />

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-[#e2d3be] bg-[#f5ecdc]/80 p-1.5 gap-1.5">
            <button
              id="auth-screen-register-tab"
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 shadow-md shadow-amber-900/20'
                  : 'text-[#6d4d31] hover:text-[#2c180e] hover:bg-[#ede0ce]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daftar Akun Baru</span>
            </button>

            <button
              id="auth-screen-login-tab"
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 shadow-md shadow-amber-900/20'
                  : 'text-[#6d4d31] hover:text-[#2c180e] hover:bg-[#ede0ce]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Masuk Akun</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-5 mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {mode === 'register' && (
              <>
                {/* Spiritual Avatar Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#614227]">
                      Pilih Avatar Rohani:
                    </label>
                    <span className="text-[11px] text-amber-800 font-bold">
                      {AVATAR_OPTIONS.find(a => a.emoji === selectedAvatar)?.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {AVATAR_OPTIONS.map(item => (
                      <button
                        key={item.emoji}
                        type="button"
                        onClick={() => setSelectedAvatar(item.emoji)}
                        title={item.label}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-all cursor-pointer ${
                          selectedAvatar === item.emoji
                            ? 'bg-[#f4e2c4] border-2 border-amber-600 scale-110 shadow-md shadow-amber-800/15'
                            : 'bg-[#f3ebd9] border border-[#d6c4a8] hover:bg-[#ebe0cb]'
                        }`}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#614227] mb-1.5 block">
                    Nama Lengkap: <span className="text-amber-700">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a6b4d]" />
                    <input
                      id="input-register-fullname"
                      type="text"
                      required
                      placeholder="Contoh: Samuel Pratama"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#faf6ee] border border-[#d8c7ad] rounded-xl text-xs sm:text-sm text-[#2c180e] placeholder-[#9a7e62] focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/20 transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email or Username */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#614227] mb-1.5 block">
                {mode === 'register' ? 'Email atau Username Pengguna:' : 'Email atau Username:'} <span className="text-amber-700">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a6b4d]" />
                <input
                  id="input-auth-email"
                  type="text"
                  required
                  placeholder="samuel@gmail.com atau samuel123"
                  value={emailOrUsername}
                  onChange={e => setEmailOrUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#faf6ee] border border-[#d8c7ad] rounded-xl text-xs sm:text-sm text-[#2c180e] placeholder-[#9a7e62] focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#614227] mb-1.5 block">
                Kata Sandi: <span className="text-amber-700">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a6b4d]" />
                <input
                  id="input-auth-password"
                  type="password"
                  required
                  placeholder="Minimal 4 karakter"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#faf6ee] border border-[#d8c7ad] rounded-xl text-xs sm:text-sm text-[#2c180e] placeholder-[#9a7e62] focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/20 transition-all"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Favorite Verse */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#614227] mb-1.5 block">
                    Ayat Favorit (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Yohanes 3:16"
                    value={favoriteVerse}
                    onChange={e => setFavoriteVerse(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#faf6ee] border border-[#d8c7ad] rounded-xl text-xs text-[#2c180e] placeholder-[#9a7e62] focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/20"
                  />
                </div>

                {/* Church or City */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#614227] mb-1.5 block">
                    Asal Gereja / Kota (Opsional):
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: GBI / Surabaya"
                    value={churchOrCity}
                    onChange={e => setChurchOrCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#faf6ee] border border-[#d8c7ad] rounded-xl text-xs text-[#2c180e] placeholder-[#9a7e62] focus:outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-600/20"
                  />
                </div>
              </div>
            )}

            {/* Instant Verification Tag */}
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
              <span>Instan • Data tersimpan aman di peramban Anda</span>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                id="auth-submit-main-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 active:scale-98 text-amber-50 font-extrabold text-sm shadow-lg shadow-amber-900/20 border border-amber-600/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-amber-200 text-amber-200" />
                <span>{mode === 'register' ? 'Daftar & Mulai Membaca Alkitab' : 'Masuk ke Akun Saya'}</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </form>

          {/* Bottom Guest Mode Action */}
          <div className="p-4 bg-[#f5eddc] border-t border-[#e2d3be] text-center space-y-1">
            <button
              id="continue-as-guest-btn"
              type="button"
              onClick={onContinueAsGuest}
              className="text-xs sm:text-sm font-bold text-[#784f2d] hover:text-[#422916] transition-colors py-1.5 px-4 rounded-xl hover:bg-[#ebdcc6] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Lanjutkan Membaca Tanpa Akun (Mode Tamu)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-[#8c6b4a]">
              Anda tetap dapat membuat atau masuk akun kapan saja melalui menu Pengaturan.
            </p>
          </div>
        </div>

        {/* Footer Spiritual Scripture */}
        <div className="text-center pt-2">
          <p className="font-serif-bible text-xs text-[#5c3b1e] italic">
            "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."
          </p>
          <p className="text-[10px] font-bold text-amber-800 mt-0.5">
            — Mazmur 119:105
          </p>
        </div>

      </div>
    </motion.div>
  );
};
