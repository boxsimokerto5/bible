import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Note, Bookmark, Highlight, UserPersonalTestimony, UserProfile } from '../types';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseConfig = () => {
  const env = (import.meta as any).env || {};
  let url = (env.VITE_SUPABASE_URL || '')?.trim();
  const anonKey = (env.VITE_SUPABASE_ANON_KEY || '')?.trim();

  // Otomatis bersihkan jika URL mengandung /rest/v1 atau slash di akhir
  if (url) {
    url = url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  }

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && url.startsWith('http') && anonKey.length > 20),
  };
};

export const getSupabase = (): SupabaseClient | null => {
  const config = getSupabaseConfig();
  if (!config.isConfigured || !config.url || !config.anonKey) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
};

export const isSupabaseConnected = (): boolean => {
  return getSupabaseConfig().isConfigured;
};

// SQL Schema script for user to run in Supabase SQL Editor
export const SUPABASE_SETUP_SQL = `-- Skrip Pembuatan Tabel Database Alkitab Digital di Supabase
-- Jalankan skrip ini di: Supabase Dashboard > SQL Editor > New query > Run

-- 1. Tabel Profil Pengguna (Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email_or_username TEXT NOT NULL,
  avatar_emoji TEXT DEFAULT '🕊️',
  church_or_city TEXT,
  favorite_verse TEXT,
  created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000
);

-- 2. Tabel Catatan Renungan Firman (Notes)
CREATE TABLE IF NOT EXISTS public.notes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  book_name TEXT NOT NULL,
  chapter INT NOT NULL,
  verse INT NOT NULL,
  verse_text TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

-- 3. Tabel Penanda Ayat (Bookmarks)
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  book_name TEXT NOT NULL,
  chapter INT NOT NULL,
  verse INT NOT NULL,
  text TEXT NOT NULL,
  created_at BIGINT NOT NULL
);

-- 4. Tabel Stabilo Ayat (Highlights)
CREATE TABLE IF NOT EXISTS public.highlights (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  book_name TEXT NOT NULL,
  chapter INT NOT NULL,
  verse INT NOT NULL,
  text TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at BIGINT NOT NULL
);

-- 5. Tabel Kesaksian Iman & Cerita Rohani (Testimonies)
CREATE TABLE IF NOT EXISTS public.testimonies (
  id TEXT PRIMARY KEY,
  author_id TEXT,
  author_name TEXT NOT NULL,
  author_avatar TEXT DEFAULT '🕊️',
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  story TEXT NOT NULL,
  bible_verse TEXT,
  date TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  amen_count INT DEFAULT 0,
  created_at BIGINT NOT NULL
);

-- Aktifkan Row Level Security (RLS) dengan kebijakan akses publik / anon
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonies ENABLE ROW LEVEL SECURITY;

-- Kebijakan akses (Policies) untuk client-side anon key
DROP POLICY IF EXISTS "Akses publik profil" ON public.profiles;
CREATE POLICY "Akses publik profil" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Akses publik catatan" ON public.notes;
CREATE POLICY "Akses publik catatan" ON public.notes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Akses publik penanda" ON public.bookmarks;
CREATE POLICY "Akses publik penanda" ON public.bookmarks FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Akses publik stabilo" ON public.highlights;
CREATE POLICY "Akses publik stabilo" ON public.highlights FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Akses publik kesaksian" ON public.testimonies;
CREATE POLICY "Akses publik kesaksian" ON public.testimonies FOR ALL USING (true) WITH CHECK (true);
`;

// --- SYNC API IMPLEMENTATIONS ---

export const SupabaseService = {
  // Test connection
  async testConnection(): Promise<{ success: boolean; message: string }> {
    const client = getSupabase();
    if (!client) {
      return {
        success: false,
        message: 'Variabel VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum dikonfigurasi.',
      };
    }

    try {
      const { error } = await client.from('notes').select('id').limit(1);
      if (error) {
        if (error.code === '42P01' || error.code === 'PGRST205' || error.message?.includes('schema cache')) {
          return {
            success: false,
            message: 'Server Supabase terhubung, namun tabel belum dibuat. Harap jalankan "Salin Skrip SQL" di SQL Editor Supabase Anda.',
          };
        }
        return { success: false, message: `Error Supabase: ${error.message}` };
      }
      return { success: true, message: 'Berhasil terhubung ke database Supabase!' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal menghubungi server Supabase.' };
    }
  },

  // Save / Sync Profile
  async syncProfile(user: UserProfile): Promise<boolean> {
    const client = getSupabase();
    if (!client || !user.id || user.isGuest) return false;

    try {
      await client.from('profiles').upsert({
        id: user.id,
        name: user.name,
        email_or_username: user.emailOrUsername,
        avatar_emoji: user.avatarEmoji,
        church_or_city: user.churchOrCity,
        favorite_verse: user.favoriteVerse,
        created_at: user.createdAt,
      });
      return true;
    } catch {
      return false;
    }
  },

  // Notes
  async fetchNotes(userId: string): Promise<Note[] | null> {
    const client = getSupabase();
    if (!client || !userId) return null;

    try {
      const { data, error } = await client
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error || !data) return null;

      return data.map((row: any) => ({
        id: row.id,
        bookId: row.book_id,
        bookName: row.book_name,
        chapter: row.chapter,
        verse: row.verse,
        verseText: row.verse_text,
        title: row.title,
        content: row.content,
        tags: row.tags || [],
        createdAt: Number(row.created_at),
        updatedAt: Number(row.updated_at),
      }));
    } catch {
      return null;
    }
  },

  async saveNote(note: Note, userId: string): Promise<boolean> {
    const client = getSupabase();
    if (!client || !userId) return false;

    try {
      const { error } = await client.from('notes').upsert({
        id: note.id,
        user_id: userId,
        book_id: note.bookId,
        book_name: note.bookName,
        chapter: note.chapter,
        verse: note.verse,
        verse_text: note.verseText,
        title: note.title,
        content: note.content,
        tags: note.tags || [],
        created_at: note.createdAt,
        updated_at: note.updatedAt,
      });
      return !error;
    } catch {
      return false;
    }
  },

  async deleteNote(noteId: string, userId: string): Promise<boolean> {
    const client = getSupabase();
    if (!client || !userId) return false;

    try {
      const { error } = await client
        .from('notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', userId);
      return !error;
    } catch {
      return false;
    }
  },

  // Bookmarks
  async fetchBookmarks(userId: string): Promise<Bookmark[] | null> {
    const client = getSupabase();
    if (!client || !userId) return null;

    try {
      const { data, error } = await client
        .from('bookmarks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((row: any) => ({
        id: row.id,
        bookId: row.book_id,
        bookName: row.book_name,
        chapter: row.chapter,
        verse: row.verse,
        text: row.text,
        createdAt: Number(row.created_at),
      }));
    } catch {
      return null;
    }
  },

  async saveBookmark(bm: Bookmark, userId: string): Promise<boolean> {
    const client = getSupabase();
    if (!client || !userId) return false;

    try {
      const { error } = await client.from('bookmarks').upsert({
        id: bm.id,
        user_id: userId,
        book_id: bm.bookId,
        book_name: bm.bookName,
        chapter: bm.chapter,
        verse: bm.verse,
        text: bm.text,
        created_at: bm.createdAt,
      });
      return !error;
    } catch {
      return false;
    }
  },

  async deleteBookmark(bmId: string, userId: string): Promise<boolean> {
    const client = getSupabase();
    if (!client || !userId) return false;

    try {
      const { error } = await client
        .from('bookmarks')
        .delete()
        .eq('id', bmId)
        .eq('user_id', userId);
      return !error;
    } catch {
      return false;
    }
  },

  // Highlights
  async fetchHighlights(userId: string): Promise<Highlight[] | null> {
    const client = getSupabase();
    if (!client || !userId) return null;

    try {
      const { data, error } = await client
        .from('highlights')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((row: any) => ({
        id: row.id,
        bookId: row.book_id,
        bookName: row.book_name,
        chapter: row.chapter,
        verse: row.verse,
        text: row.text,
        color: row.color,
        createdAt: Number(row.created_at),
      }));
    } catch {
      return null;
    }
  },

  async saveHighlight(hl: Highlight, userId: string): Promise<boolean> {
    const client = getSupabase();
    if (!client || !userId) return false;

    try {
      const { error } = await client.from('highlights').upsert({
        id: hl.id,
        user_id: userId,
        book_id: hl.bookId,
        book_name: hl.bookName,
        chapter: hl.chapter,
        verse: hl.verse,
        text: hl.text,
        color: hl.color,
        created_at: hl.createdAt,
      });
      return !error;
    } catch {
      return false;
    }
  },

  async deleteHighlight(hlId: string, userId: string): Promise<boolean> {
    const client = getSupabase();
    if (!client || !userId) return false;

    try {
      const { error } = await client
        .from('highlights')
        .delete()
        .eq('id', hlId)
        .eq('user_id', userId);
      return !error;
    } catch {
      return false;
    }
  },

  // Community Testimonies
  async fetchTestimonies(): Promise<UserPersonalTestimony[] | null> {
    const client = getSupabase();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('testimonies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((row: any) => ({
        id: row.id,
        authorId: row.author_id,
        authorName: row.author_name,
        authorAvatar: row.author_avatar,
        title: row.title,
        category: row.category,
        story: row.story,
        bibleVerse: row.bible_verse,
        date: row.date,
        isPublic: row.is_public,
        amenCount: row.amen_count || 0,
        createdAt: Number(row.created_at),
      }));
    } catch {
      return null;
    }
  },

  async saveTestimony(testimony: UserPersonalTestimony): Promise<boolean> {
    const client = getSupabase();
    if (!client) return false;

    try {
      const { error } = await client.from('testimonies').upsert({
        id: testimony.id,
        author_id: testimony.authorId,
        author_name: testimony.authorName,
        author_avatar: testimony.authorAvatar || '🕊️',
        title: testimony.title,
        category: testimony.category,
        story: testimony.story,
        bible_verse: testimony.bibleVerse,
        date: testimony.date,
        is_public: testimony.isPublic !== false,
        amen_count: testimony.amenCount || 0,
        created_at: testimony.createdAt,
      });
      return !error;
    } catch {
      return false;
    }
  },

  async incrementAmen(testimonyId: string, currentCount: number): Promise<boolean> {
    const client = getSupabase();
    if (!client) return false;

    try {
      const { error } = await client
        .from('testimonies')
        .update({ amen_count: currentCount + 1 })
        .eq('id', testimonyId);
      return !error;
    } catch {
      return false;
    }
  },
};
