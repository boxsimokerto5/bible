import React from 'react';
import { X, Type, Sun, Moon, Coffee, Eye, Minus, Plus, AlignLeft, Check, Sparkles, User, ShieldCheck, Download, Database, Languages } from 'lucide-react';
import { ReadingSettings, ThemeMode, FontFamilyType, LineHeightType, UserProfile } from '../types';
import { isSupabaseConnected } from '../lib/supabase';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReadingSettings;
  onUpdateSettings: (newSettings: Partial<ReadingSettings>) => void;
  onShowSplashScreen?: () => void;
  currentUser?: UserProfile | null;
  onOpenProfile?: () => void;
  onOpenAuth?: () => void;
  onShowPostSplashAuth?: () => void;
  onOpenSupabase?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onShowSplashScreen,
  currentUser,
  onOpenProfile,
  onOpenAuth,
  onShowPostSplashAuth,
  onOpenSupabase,
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemeMode; name: string; icon: React.ReactNode; bgClass: string; textClass: string; borderClass: string }[] = [
    { id: 'light', name: 'Terang', icon: <Sun className="w-4 h-4" />, bgClass: 'bg-white', textClass: 'text-neutral-900', borderClass: 'border-neutral-300' },
    { id: 'sepia', name: 'Sepia (Lembut)', icon: <Coffee className="w-4 h-4" />, bgClass: 'bg-[#fbf7ee]', textClass: 'text-[#3d2f1d]', borderClass: 'border-[#dfd3c3]' },
    { id: 'vintage', name: 'Kitab Kuno (Perkamen)', icon: <span className="text-amber-800 font-bold font-cinzel text-xs">📜</span>, bgClass: 'bg-[#f4ecd8]', textClass: 'text-[#2c1a0e]', borderClass: 'border-[#c9b28b]' },
    { id: 'dark', name: 'Gelap', icon: <Moon className="w-4 h-4" />, bgClass: 'bg-slate-900', textClass: 'text-slate-100', borderClass: 'border-slate-700' },
    { id: 'oled', name: 'Hitam OLED', icon: <Eye className="w-4 h-4" />, bgClass: 'bg-black', textClass: 'text-neutral-100', borderClass: 'border-neutral-800' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="settings-modal-content"
        className="w-full sm:max-w-lg bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Pengaturan Tampilan
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Atur ukuran huruf dan warna agar nyaman dibaca
              </p>
            </div>
          </div>
          <button
            id="close-settings-modal-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* 0. Language Selection (Pilihan Bahasa: Indonesia - English) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{settings.language === 'en' ? 'Scripture Language / Translation:' : 'Bahasa Terjemahan Alkitab:'}</span>
              </label>
              <span className="text-xs text-neutral-500 font-medium">
                {settings.language === 'en' ? 'Global (176 Countries)' : 'Bahasa Indonesia'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                id="settings-lang-id-btn"
                type="button"
                onClick={() => onUpdateSettings({ language: 'id' })}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                  (settings.language || 'id') === 'id'
                    ? 'border-amber-600 bg-amber-500/10 text-amber-950 dark:text-amber-100 font-bold ring-1 ring-amber-600 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>🇮🇩 Indonesia</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-normal mt-0.5">Terjemahan Baru (TB)</div>
                </div>
                {(settings.language || 'id') === 'id' && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
              </button>

              <button
                id="settings-lang-en-btn"
                type="button"
                onClick={() => onUpdateSettings({ language: 'en' })}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                  settings.language === 'en'
                    ? 'border-amber-600 bg-amber-500/10 text-amber-950 dark:text-amber-100 font-bold ring-1 ring-amber-600 shadow-xs'
                    : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>🌐 English</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-normal mt-0.5">KJV / WEB Translation</div>
                </div>
                {settings.language === 'en' && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
              </button>
            </div>
          </div>

          {/* 1. Font Size (Ukuran Teks) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                Ukuran Huruf Ayat: <span className="text-amber-600 dark:text-amber-400 font-extrabold">{settings.fontSize}px</span>
              </label>
              <span className="text-xs text-neutral-500">
                {settings.fontSize >= 24 ? '🔍 Sangat Besar (Ramah Mata)' : settings.fontSize >= 20 ? 'Standard Nyaman' : 'Kecil'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="font-size-decrease-btn"
                onClick={() => onUpdateSettings({ fontSize: Math.max(14, settings.fontSize - 2) })}
                className="w-11 h-11 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center font-bold text-base hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 transition-all border border-neutral-200 dark:border-neutral-700"
                aria-label="Kecilkan Huruf"
              >
                <Minus className="w-5 h-5" />
              </button>

              <input
                id="font-size-slider"
                type="range"
                min="14"
                max="32"
                step="1"
                value={settings.fontSize}
                onChange={(e) => onUpdateSettings({ fontSize: parseInt(e.target.value, 10) })}
                className="flex-1 accent-amber-600 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg cursor-pointer"
              />

              <button
                id="font-size-increase-btn"
                onClick={() => onUpdateSettings({ fontSize: Math.min(32, settings.fontSize + 2) })}
                className="w-11 h-11 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center font-bold text-base hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 transition-all border border-neutral-200 dark:border-neutral-700"
                aria-label="Besarkan Huruf"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Live Text Preview Card */}
            <div className="p-3.5 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
              <div className="text-xs text-neutral-400 mb-1 font-medium">Contoh Tampilan Ayat:</div>
              <p 
                style={{ fontSize: `${settings.fontSize}px` }}
                className={`${settings.fontFamily === 'garamond' ? 'font-garamond' : settings.fontFamily === 'serif' ? 'font-serif-bible' : 'font-sans-ui'} text-neutral-900 dark:text-neutral-100 leading-relaxed`}
              >
                <span className="font-bold text-amber-600 mr-1.5">16</span>
                Karena begitu besar kasih Allah akan dunia ini...
              </p>
            </div>
          </div>

          {/* 2. Theme Mode Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-neutral-800 dark:text-neutral-200 block">
              Pilihan Warna / Mode Baca:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {themes.map(t => {
                const isSelected = settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    id={`theme-btn-${t.id}`}
                    onClick={() => onUpdateSettings({ theme: t.id })}
                    className={`p-3 rounded-2xl border-2 flex items-center gap-3 transition-all ${t.bgClass} ${t.textClass} ${
                      isSelected 
                        ? 'ring-2 ring-amber-500 border-amber-500 shadow-md' 
                        : `${t.borderClass} opacity-85 hover:opacity-100`
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center border border-current/20">
                      {t.icon}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{t.name}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Font Family (Jenis Huruf) */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-neutral-800 dark:text-neutral-200 block">
              Jenis Huruf:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                id="font-family-garamond-btn"
                onClick={() => onUpdateSettings({ fontFamily: 'garamond' })}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  settings.fontFamily === 'garamond'
                    ? 'border-amber-700 bg-amber-600/10 text-amber-950 dark:text-amber-100 font-bold ring-1 ring-amber-700'
                    : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="font-garamond text-lg font-bold">EB Garamond</div>
                <div className="text-[11px] text-neutral-500 font-normal">Kitab Antik & Autentik</div>
              </button>

              <button
                id="font-family-serif-btn"
                onClick={() => onUpdateSettings({ fontFamily: 'serif' })}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  settings.fontFamily === 'serif'
                    ? 'border-amber-600 bg-amber-500/10 text-amber-900 dark:text-amber-100 font-bold ring-1 ring-amber-600'
                    : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="font-serif-bible text-base font-bold">Literata</div>
                <div className="text-[11px] text-neutral-500 font-normal">Serif Alkitab TB</div>
              </button>

              <button
                id="font-family-sans-btn"
                onClick={() => onUpdateSettings({ fontFamily: 'sans' })}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  settings.fontFamily === 'sans'
                    ? 'border-amber-600 bg-amber-500/10 text-amber-900 dark:text-amber-100 font-bold ring-1 ring-amber-600'
                    : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="font-sans-ui text-base font-bold">Jakarta</div>
                <div className="text-[11px] text-neutral-500 font-normal">Modern & Bersih</div>
              </button>
            </div>
          </div>

          {/* 4. Spasi Baris (Line Height) & Opsi Nomor Ayat */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-neutral-800 dark:text-neutral-200 block">
              Jarak Antar Baris:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal' as LineHeightType, label: 'Rapat' },
                { id: 'relaxed' as LineHeightType, label: 'Nyaman (Standard)' },
                { id: 'loose' as LineHeightType, label: 'Lapang (Lebar)' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => onUpdateSettings({ lineHeight: item.id })}
                  className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                    settings.lineHeight === item.id
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Tampilkan Nomor Ayat Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <div>
              <div className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                Tampilkan Angka Nomor Ayat
              </div>
              <div className="text-xs text-neutral-500">
                Tampilkan angka kecil di depan setiap ayat
              </div>
            </div>
            <button
              id="toggle-verse-numbers-btn"
              onClick={() => onUpdateSettings({ showVerseNumbers: !settings.showVerseNumbers })}
              className={`w-12 h-7 rounded-full transition-colors relative p-0.5 ${
                settings.showVerseNumbers ? 'bg-amber-600' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
            >
              <div 
                className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                  settings.showVerseNumbers ? 'translate-x-5' : 'translate-x-0'
                }`} 
              />
            </button>
          </div>

          {/* 6. Account & Data Backup Tile */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (currentUser && onOpenProfile) {
                  onOpenProfile();
                } else if (onShowPostSplashAuth) {
                  onShowPostSplashAuth();
                } else if (onOpenAuth) {
                  onOpenAuth();
                }
              }}
              className="w-full p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between text-left transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {currentUser ? (currentUser.avatarEmoji || '🕊️') : <User className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                    <span>{currentUser ? `Akun: ${currentUser.name}` : 'Buat Akun / Masuk'}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    {currentUser 
                      ? `${currentUser.emailOrUsername || 'Akun Lokal'} • Simpan catatan & pencadangan` 
                      : 'Daftar atau masuk untuk simpan catatan & kuis'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-600/15 text-amber-700 dark:text-amber-300 shrink-0">
                {currentUser ? 'Buka' : 'Masuk'}
              </span>
            </button>
          </div>

          {/* 6.5. Supabase Cloud Database Tile */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenSupabase) onOpenSupabase();
              }}
              className="w-full p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/15 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/35 border border-emerald-500/30 text-left flex items-center justify-between transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                    <span>Database Supabase</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSupabaseConnected()
                        ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                        : 'bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                    }`}>
                      {isSupabaseConnected() ? '● Terhubung' : '○ Konfigurasi'}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Sinkronisasi cloud PostgreSQL, skrip tabel SQL & pencadangan
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 shrink-0">
                Kelola
              </span>
            </button>
          </div>

          {/* 7. Replay Jesus Story Splash Screen */}
          {onShowSplashScreen && (
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onShowSplashScreen();
                }}
                className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-transparent hover:from-amber-500/20 dark:from-amber-500/15 dark:hover:from-amber-500/25 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-center justify-between text-left transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    ✝
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold flex items-center gap-1">
                      <span>Putar Animasi Kisah Kasih Kristus</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Tampilkan ulang intro animasi kelahiran, karya, salib & kebangkitan
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 shrink-0">
                  Lihat
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex justify-end">
          <button
            id="save-close-settings-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
