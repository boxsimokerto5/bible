import { Bookmark, Highlight, Note, ReadingSettings, Verse, Book, UserPersonalTestimony, ReadingHistoryItem } from '../types';
import { BIBLE_BOOKS } from './books';
import { AUTHENTIC_PASSAGES, getVersesForChapter } from './bibleVerses';
import { SupabaseService, isSupabaseConnected } from '../lib/supabase';
import { AuthService } from './authService';

const STORAGE_KEYS = {
  SETTINGS: 'alkitab_settings_v1',
  BOOKMARKS: 'alkitab_bookmarks_v1',
  HIGHLIGHTS: 'alkitab_highlights_v1',
  NOTES: 'alkitab_notes_v1',
  LAST_READ: 'alkitab_last_read_v1',
  SEARCH_HISTORY: 'alkitab_search_hist_v1',
  TESTIMONIES: 'alkitab_user_testimonies_v1',
  READING_HISTORY: 'alkitab_reading_history_v1',
};

export const DEFAULT_SETTINGS: ReadingSettings = {
  fontSize: 20, // comfortable default size for all ages
  theme: 'vintage', // Elegant vintage parchment default
  fontFamily: 'serif',
  lineHeight: 'relaxed',
  showVerseNumbers: true,
  autoScroll: false,
  audioSpeed: 1.0,
};

// Initial sample bookmarks and notes so user immediately sees rich, clean UI
const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: 'mzm-23-1',
    bookId: 'mzm',
    bookName: 'Mazmur',
    chapter: 23,
    verse: 1,
    text: 'TUHAN adalah gembalaku, takkan kekurangan aku.',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'yoh-3-16',
    bookId: 'yoh',
    bookName: 'Yohanes',
    chapter: 3,
    verse: 16,
    text: 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.',
    createdAt: Date.now() - 86400000,
  }
];

const INITIAL_HIGHLIGHTS: Highlight[] = [
  {
    id: 'yoh-3-16',
    bookId: 'yoh',
    bookName: 'Yohanes',
    chapter: 3,
    verse: 16,
    text: 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.',
    color: 'amber',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'flp-4-13',
    bookId: 'flp',
    bookName: 'Filipi',
    chapter: 4,
    verse: 13,
    text: 'Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.',
    color: 'emerald',
    createdAt: Date.now() - 43200000,
  }
];

const INITIAL_NOTES: Note[] = [
  {
    id: 'note-1',
    bookId: 'yer',
    bookName: 'Yeremia',
    chapter: 29,
    verse: 11,
    verseText: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.',
    title: 'Pengharapan di Saat Khawatir',
    content: 'Saat menghadapi ketidakpastian pekerjaan dan masa depan keluarga, ingat selalu bahwa rencana Tuhan bukanlah mencelakakan, melainkan memberikan damai sejahtera dan hari esok yang penuh harapan.',
    tags: ['Pengharapan', 'Damai Sejahtera'],
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'note-2',
    bookId: '1kor',
    bookName: '1 Korintus',
    chapter: 13,
    verse: 4,
    verseText: 'Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.',
    title: 'Definisi Kasih Sejati',
    content: 'Kasih bukan hanya sekadar perasaan, tapi tindakan nyata: sabar dan murah hati setiap hari kepada pasangan dan anak-anak.',
    tags: ['Kasih', 'Keluarga'],
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  }
];

export const BibleService = {
  // --- SETTINGS ---
  getSettings(): ReadingSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (data) return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      // Fallback default
    }
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: ReadingSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  },

  // --- LAST READ POSITION & READING HISTORY ---
  getLastRead(): { bookId: string; chapter: number; verse?: number } {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAST_READ);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return { bookId: 'yoh', chapter: 3, verse: 16 };
  },

  saveLastRead(bookId: string, chapter: number, verse?: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_READ, JSON.stringify({ bookId, chapter, verse }));
      this.recordReadingHistory(bookId, chapter);
    } catch (e) {
      console.error(e);
    }
  },

  getReadingHistory(): ReadingHistoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.READING_HISTORY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed.slice(0, 10);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'yoh-3',
        bookId: 'yoh',
        bookName: 'Yohanes',
        shortName: 'Yoh',
        chapter: 3,
        testament: 'PB',
        category: 'Injil',
        visitedAt: Date.now() - 1000 * 60 * 3,
      },
      {
        id: 'mzm-23',
        bookId: 'mzm',
        bookName: 'Mazmur',
        shortName: 'Mzm',
        chapter: 23,
        testament: 'PL',
        category: 'Puisi & Hikmat',
        visitedAt: Date.now() - 1000 * 60 * 60 * 2,
      },
      {
        id: 'kej-1',
        bookId: 'kej',
        bookName: 'Kejadian',
        shortName: 'Kej',
        chapter: 1,
        testament: 'PL',
        category: 'Taurat',
        visitedAt: Date.now() - 1000 * 60 * 60 * 20,
      }
    ];
  },

  recordReadingHistory(bookId: string, chapter: number): ReadingHistoryItem[] {
    try {
      const book = BIBLE_BOOKS.find(b => b.id === bookId);
      if (!book) return this.getReadingHistory();

      const list = this.getReadingHistory().filter(
        item => !(item.bookId === bookId && item.chapter === chapter)
      );

      const newItem: ReadingHistoryItem = {
        id: `${bookId}-${chapter}`,
        bookId,
        bookName: book.name,
        shortName: book.shortName,
        chapter,
        testament: book.testament,
        category: book.category,
        visitedAt: Date.now(),
      };

      const updated = [newItem, ...list].slice(0, 10);
      localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error(e);
      return this.getReadingHistory();
    }
  },

  deleteReadingHistoryItem(id: string): ReadingHistoryItem[] {
    try {
      const list = this.getReadingHistory().filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(list));
      return list;
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  clearReadingHistory(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
  },

  // --- BOOKMARKS ---
  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return INITIAL_BOOKMARKS;
  },

  toggleBookmark(verse: Verse): boolean {
    const list = this.getBookmarks();
    const existingIndex = list.findIndex(b => b.bookId === verse.bookId && b.chapter === verse.chapter && b.verse === verse.verse);
    const user = AuthService.getCurrentUser();
    const userId = user?.id || 'guest_user';
    
    if (existingIndex >= 0) {
      const removed = list.splice(existingIndex, 1)[0];
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
      if (isSupabaseConnected()) {
        SupabaseService.deleteBookmark(removed.id, userId).catch(console.error);
      }
      return false; // Removed
    } else {
      const newBm: Bookmark = {
        id: verse.id,
        bookId: verse.bookId,
        bookName: verse.bookName,
        chapter: verse.chapter,
        verse: verse.verse,
        text: verse.text,
        createdAt: Date.now(),
      };
      list.unshift(newBm);
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
      if (isSupabaseConnected()) {
        SupabaseService.saveBookmark(newBm, userId).catch(console.error);
      }
      return true; // Added
    }
  },

  isBookmarked(bookId: string, chapter: number, verse: number): boolean {
    const list = this.getBookmarks();
    return list.some(b => b.bookId === bookId && b.chapter === chapter && b.verse === verse);
  },

  deleteBookmark(id: string): void {
    const list = this.getBookmarks().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    if (isSupabaseConnected()) {
      const user = AuthService.getCurrentUser();
      const userId = user?.id || 'guest_user';
      SupabaseService.deleteBookmark(id, userId).catch(console.error);
    }
  },

  // --- HIGHLIGHTS ---
  getHighlights(): Highlight[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return INITIAL_HIGHLIGHTS;
  },

  setHighlight(verse: Verse, color: Highlight['color'] | null): void {
    let list = this.getHighlights();
    list = list.filter(h => !(h.bookId === verse.bookId && h.chapter === verse.chapter && h.verse === verse.verse));
    const user = AuthService.getCurrentUser();
    const userId = user?.id || 'guest_user';

    if (color) {
      const newHl: Highlight = {
        id: verse.id,
        bookId: verse.bookId,
        bookName: verse.bookName,
        chapter: verse.chapter,
        verse: verse.verse,
        text: verse.text,
        color,
        createdAt: Date.now(),
      };
      list.unshift(newHl);
      if (isSupabaseConnected()) {
        SupabaseService.saveHighlight(newHl, userId).catch(console.error);
      }
    } else {
      if (isSupabaseConnected()) {
        SupabaseService.deleteHighlight(verse.id, userId).catch(console.error);
      }
    }
    localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(list));
  },

  getVerseHighlight(bookId: string, chapter: number, verse: number): Highlight | undefined {
    const list = this.getHighlights();
    return list.find(h => h.bookId === bookId && h.chapter === chapter && h.verse === verse);
  },

  // --- NOTES ---
  getNotes(): Note[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return INITIAL_NOTES;
  },

  saveNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Note {
    const list = this.getNotes();
    const now = Date.now();
    let savedNote: Note;

    if (note.id) {
      const index = list.findIndex(n => n.id === note.id);
      if (index >= 0) {
        savedNote = {
          ...list[index],
          ...note,
          updatedAt: now,
        };
        list[index] = savedNote;
      } else {
        savedNote = {
          id: `note-${now}`,
          ...note,
          createdAt: now,
          updatedAt: now,
        };
        list.unshift(savedNote);
      }
    } else {
      savedNote = {
        id: `note-${now}`,
        ...note,
        createdAt: now,
        updatedAt: now,
      };
      list.unshift(savedNote);
    }

    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(list));

    if (isSupabaseConnected()) {
      const user = AuthService.getCurrentUser();
      const userId = user?.id || 'guest_user';
      SupabaseService.saveNote(savedNote, userId).catch(console.error);
    }

    return savedNote;
  },

  deleteNote(id: string): void {
    const list = this.getNotes().filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(list));
    if (isSupabaseConnected()) {
      const user = AuthService.getCurrentUser();
      const userId = user?.id || 'guest_user';
      SupabaseService.deleteNote(id, userId).catch(console.error);
    }
  },

  getNotesForVerse(bookId: string, chapter: number, verse: number): Note[] {
    return this.getNotes().filter(n => n.bookId === bookId && n.chapter === chapter && n.verse === verse);
  },

  // --- PERSONAL TESTIMONIES ---
  getTestimonies(): UserPersonalTestimony[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIES);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return [
      {
        id: 'sample-testimony-1',
        title: 'Kesembuhan yang Ajaib dari Tuhan',
        category: 'Mukjizat Kesembuhan',
        story: 'Tahun lalu ketika dokter mendiagnosis sakit berat, seluruh keluarga dan rekan persekutuan berdoa dengan sungguh-sungguh. Melalui tangan dokter dan kuasa doa, Tuhan memulihkan tubuh saya hingga sembuh total. Terpujilah Tuhan!',
        bibleVerse: 'Yeremia 17:14',
        date: '12 Jan 2026',
        createdAt: Date.now() - 86400000 * 5,
        authorName: 'Hamba Tuhan',
        authorAvatar: '🕊️',
        isPublic: false,
        amenCount: 0,
      }
    ];
  },

  saveTestimony(testimony: UserPersonalTestimony): void {
    const list = this.getTestimonies();
    const index = list.findIndex(t => t.id === testimony.id);
    if (index >= 0) {
      list[index] = testimony;
    } else {
      list.unshift(testimony);
    }
    localStorage.setItem(STORAGE_KEYS.TESTIMONIES, JSON.stringify(list));

    if (isSupabaseConnected()) {
      SupabaseService.saveTestimony(testimony).catch(console.error);
    }
  },

  deleteTestimony(id: string): void {
    const list = this.getTestimonies().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIES, JSON.stringify(list));
  },

  // Sync helper between LocalStorage and Supabase
  async syncAllWithSupabase(userId: string): Promise<{ success: boolean; message: string }> {
    if (!isSupabaseConnected()) {
      return { success: false, message: 'Supabase belum dikonfigurasi.' };
    }

    try {
      const [remoteNotes, remoteBookmarks, remoteHighlights, remoteTestimonies] = await Promise.all([
        SupabaseService.fetchNotes(userId),
        SupabaseService.fetchBookmarks(userId),
        SupabaseService.fetchHighlights(userId),
        SupabaseService.fetchTestimonies(),
      ]);

      let syncCount = 0;

      // Merge notes
      if (remoteNotes && remoteNotes.length > 0) {
        const local = this.getNotes();
        const merged = [...local];
        for (const rn of remoteNotes) {
          const idx = merged.findIndex(n => n.id === rn.id);
          if (idx >= 0) {
            if (rn.updatedAt > merged[idx].updatedAt) {
              merged[idx] = rn;
            }
          } else {
            merged.push(rn);
          }
        }
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(merged));
        syncCount += remoteNotes.length;
      }

      // Merge bookmarks
      if (remoteBookmarks && remoteBookmarks.length > 0) {
        const local = this.getBookmarks();
        const merged = [...local];
        for (const rbm of remoteBookmarks) {
          if (!merged.some(b => b.id === rbm.id)) {
            merged.push(rbm);
          }
        }
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(merged));
        syncCount += remoteBookmarks.length;
      }

      // Merge highlights
      if (remoteHighlights && remoteHighlights.length > 0) {
        const local = this.getHighlights();
        const merged = [...local];
        for (const rhl of remoteHighlights) {
          if (!merged.some(h => h.id === rhl.id)) {
            merged.push(rhl);
          }
        }
        localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(merged));
        syncCount += remoteHighlights.length;
      }

      // Also push local items up to Supabase to guarantee 2-way sync
      const currentNotes = this.getNotes();
      for (const n of currentNotes) {
        await SupabaseService.saveNote(n, userId);
      }
      const currentBms = this.getBookmarks();
      for (const b of currentBms) {
        await SupabaseService.saveBookmark(b, userId);
      }
      const currentHls = this.getHighlights();
      for (const h of currentHls) {
        await SupabaseService.saveHighlight(h, userId);
      }

      return { success: true, message: `Sinkronisasi berhasil! Data terhubung dengan aman di Supabase.` };
    } catch (e: any) {
      return { success: false, message: e.message || 'Gagal sinkronisasi data ke Supabase.' };
    }
  },

  // --- SEARCH ENGINE ---
  search(query: string, testamentFilter: 'ALL' | 'PL' | 'PB' = 'ALL'): Verse[] {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    // Check if query is a direct reference like "yoh 3:16", "kejadian 1:1", "mzm 23"
    const refMatch = trimmed.match(/^([0-9a-zA-Z\s]+?)\s*([0-9]+)(?:\s*[:,\.]\s*([0-9]+))?$/i);
    if (refMatch) {
      const inputBook = refMatch[1].trim().toLowerCase();
      const inputChapter = parseInt(refMatch[2], 10);
      const inputVerse = refMatch[3] ? parseInt(refMatch[3], 10) : null;

      const targetBook = BIBLE_BOOKS.find(b => 
        b.name.toLowerCase() === inputBook ||
        b.shortName.toLowerCase() === inputBook ||
        b.id.toLowerCase() === inputBook ||
        b.name.toLowerCase().startsWith(inputBook)
      );

      if (targetBook && inputChapter > 0 && inputChapter <= targetBook.chaptersCount) {
        const chapterVerses = getVersesForChapter(targetBook.id, inputChapter);
        if (inputVerse) {
          const specific = chapterVerses.filter(v => v.verse === inputVerse);
          if (specific.length > 0) return specific;
        } else {
          return chapterVerses;
        }
      }
    }

    // Keyword search across authentic passages and sample book chapters
    const results: Verse[] = [];
    const keywords = trimmed.split(/\s+/).filter(k => k.length > 1);

    // 1. Search in authentic passages database
    for (const key of Object.keys(AUTHENTIC_PASSAGES)) {
      const [bookId, chapStr] = key.split('-');
      const chap = parseInt(chapStr, 10);
      const book = BIBLE_BOOKS.find(b => b.id === bookId);
      if (!book) continue;

      if (testamentFilter !== 'ALL' && book.testament !== testamentFilter) continue;

      const verses = getVersesForChapter(bookId, chap);
      for (const v of verses) {
        const textLower = v.text.toLowerCase();
        const matches = keywords.every(kw => textLower.includes(kw));
        if (matches) {
          results.push(v);
        }
      }
    }

    // 2. Search across general books if authentic results are low
    if (results.length < 15) {
      const candidateBooks = BIBLE_BOOKS.filter(b => 
        testamentFilter === 'ALL' || b.testament === testamentFilter
      );

      for (const book of candidateBooks.slice(0, 15)) {
        for (let ch = 1; ch <= Math.min(3, book.chaptersCount); ch++) {
          const key = `${book.id}-${ch}`;
          if (AUTHENTIC_PASSAGES[key]) continue; // already checked

          const verses = getVersesForChapter(book.id, ch);
          for (const v of verses) {
            const textLower = v.text.toLowerCase();
            const matches = keywords.every(kw => textLower.includes(kw));
            if (matches && !results.some(r => r.id === v.id)) {
              results.push(v);
              if (results.length >= 35) break;
            }
          }
          if (results.length >= 35) break;
        }
        if (results.length >= 35) break;
      }
    }

    return results;
  },

  // --- SEARCH HISTORY ---
  getSearchHistory(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      if (data) return JSON.parse(data);
    } catch {
      // ignore
    }
    return ['Kasih', 'Damai sejahtera', 'Mazmur 23', 'Yohanes 3:16', 'Doa'];
  },

  addSearchHistory(term: string): void {
    if (!term.trim()) return;
    const history = this.getSearchHistory().filter(h => h.toLowerCase() !== term.toLowerCase());
    history.unshift(term.trim());
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history.slice(0, 10)));
  },

  clearSearchHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
  },

  // --- EXPORT / BACKUP ---
  exportBackupData(): string {
    const data = {
      bookmarks: this.getBookmarks(),
      highlights: this.getHighlights(),
      notes: this.getNotes(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  },

  importBackupData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.bookmarks) localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(parsed.bookmarks));
      if (parsed.highlights) localStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(parsed.highlights));
      if (parsed.notes) localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(parsed.notes));
      if (parsed.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed.settings));
      return true;
    } catch {
      return false;
    }
  }
};
