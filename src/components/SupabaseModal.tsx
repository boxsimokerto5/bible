import React, { useState } from 'react';
import { X, Database, Check, Copy, RefreshCw, Server, Shield, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getSupabaseConfig, isSupabaseConnected, SupabaseService, SUPABASE_SETUP_SQL } from '../lib/supabase';
import { BibleService } from '../data/bibleService';
import { AuthService } from '../data/authService';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; message?: string } | null>(null);
  const [syncStatus, setSyncStatus] = useState<{ loading: boolean; success?: boolean; message?: string } | null>(null);
  const [showSqlPreview, setShowSqlPreview] = useState(false);

  if (!isOpen) return null;

  const config = getSupabaseConfig();
  const isConnected = isSupabaseConnected();

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleTestConnection = async () => {
    setTestStatus({ loading: true });
    try {
      const result = await SupabaseService.testConnection();
      setTestStatus({ loading: false, success: result.success, message: result.message });
    } catch (e: any) {
      setTestStatus({ loading: false, success: false, message: e.message || 'Gagal terhubung' });
    }
  };

  const handleSyncNow = async () => {
    setSyncStatus({ loading: true });
    try {
      const user = AuthService.getCurrentUser();
      const userId = user?.id || 'guest_user';
      const result = await BibleService.syncAllWithSupabase(userId);
      setSyncStatus({ loading: false, success: result.success, message: result.message });
    } catch (e: any) {
      setSyncStatus({ loading: false, success: false, message: e.message || 'Gagal sinkronisasi' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        id="supabase-modal-content"
        className="w-full sm:max-w-xl bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-cinzel">
                  Database Supabase
                </h2>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isConnected 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {isConnected ? '● Siap Terhubung' : '○ Perlu Konfigurasi'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Penyimpanan cloud multi-perangkat PostgreSQL Supabase
              </p>
            </div>
          </div>
          <button
            id="close-supabase-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Status Card */}
          <div className={`p-4 rounded-2xl border ${
            isConnected
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
          }`}>
            <div className="flex items-start gap-3">
              {isConnected ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {isConnected ? 'Konektor Supabase Aktif' : 'Konfigurasi Variabel Supabase'}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {isConnected ? (
                    <>
                      Aplikasi siap menyinkronkan data catatan, bookmark, dan stabilo ayat ke server Supabase Anda (<span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300">{config.url?.replace(/https:\/\/(.*?)\..*/, '$1.supabase.co')}</span>).
                    </>
                  ) : (
                    <>
                      Klien Supabase sudah terpasang. Untuk mengaktifkan koneksi cloud, masukkan <code className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 font-mono text-[11px]">VITE_SUPABASE_URL</code> dan <code className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code> di menu pengaturan lingkungan (*Secrets*).
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Test connection & sync buttons */}
            <div className="mt-3.5 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/60 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testStatus?.loading}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Server className="w-3.5 h-3.5 text-emerald-600" />
                {testStatus?.loading ? 'Menguji...' : 'Uji Koneksi Server'}
              </button>

              <button
                type="button"
                onClick={handleSyncNow}
                disabled={syncStatus?.loading}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncStatus?.loading ? 'animate-spin' : ''}`} />
                {syncStatus?.loading ? 'Menyinkronkan...' : 'Sinkronkan Data Sekarang'}
              </button>
            </div>

            {/* Result messages */}
            {testStatus && (
              <div className={`mt-2.5 p-2 rounded-xl text-xs flex items-center gap-1.5 ${
                testStatus.success 
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200' 
                  : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200'
              }`}>
                {testStatus.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{testStatus.message}</span>
              </div>
            )}

            {syncStatus && (
              <div className={`mt-2.5 p-2 rounded-xl text-xs flex items-center gap-1.5 ${
                syncStatus.success 
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200' 
                  : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200'
              }`}>
                {syncStatus.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <span>{syncStatus.message}</span>
              </div>
            )}
          </div>

          {/* Step-by-step Setup Guide */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Langkah Menghubungkan Supabase:
            </h3>

            <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-800 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">
                    Buat Proyek di Supabase
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Kunjungi <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-amber-600 underline font-semibold inline-flex items-center gap-0.5">supabase.com <ExternalLink className="w-3 h-3" /></a> dan buat project baru (gratis).
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-800 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <div className="flex-1">
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center justify-between">
                    <span>Jalankan Skrip SQL di Supabase SQL Editor</span>
                    <button
                      type="button"
                      onClick={handleCopySql}
                      className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 transition-all active:scale-95 shadow-xs"
                    >
                      {copiedSql ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedSql ? 'Tersalin!' : 'Salin Skrip SQL'}
                    </button>
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Buka tab <strong>SQL Editor</strong> di dashboard Supabase Anda, lalu tempel skrip untuk otomatis membuat tabel: <code className="text-amber-700 dark:text-amber-300">profiles</code>, <code className="text-amber-700 dark:text-amber-300">notes</code>, <code className="text-amber-700 dark:text-amber-300">bookmarks</code>, <code className="text-amber-700 dark:text-amber-300">highlights</code>, dan <code className="text-amber-700 dark:text-amber-300">testimonies</code>.
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowSqlPreview(!showSqlPreview)}
                    className="mt-2 text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                  >
                    {showSqlPreview ? 'Sembunyikan Cuplikan SQL' : 'Lihat Cuplikan SQL'}
                  </button>

                  {showSqlPreview && (
                    <pre className="mt-2 p-2.5 rounded-lg bg-neutral-900 text-emerald-400 text-[10px] font-mono overflow-x-auto max-h-40 border border-neutral-700">
                      {SUPABASE_SETUP_SQL}
                    </pre>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/70 dark:border-neutral-800 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">
                    Masukkan URL & Anon Key di Settings AI Studio
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Buka <strong>Project Settings &gt; API</strong> di Supabase, lalu masukkan nilai <strong>Project URL</strong> ke <code className="font-mono text-[11px]">VITE_SUPABASE_URL</code> dan <strong>anon/public key</strong> ke <code className="font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Koneksi dilindungi TLS &amp; RLS PostgreSQL</span>
          </div>
          <button
            id="close-supabase-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold transition-all active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
