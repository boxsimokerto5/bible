export type Testament = 'PL' | 'PB'; // Perjanjian Lama / Perjanjian Baru
export type Language = 'id' | 'en'; // Indonesia / English

export type HighlightColor = 'amber' | 'emerald' | 'sky' | 'rose' | 'purple';

export interface Book {
  id: string; // e.g. "kej", "mat", "yoh"
  name: string; // e.g. "Kejadian", "Matius", "Yohanes"
  nameEn?: string; // e.g. "Genesis", "Matthew", "John"
  shortName: string; // e.g. "Kej", "Mat", "Yoh"
  shortNameEn?: string; // e.g. "Gen", "Matt", "John"
  testament: Testament;
  order: number; // 1 to 66
  chaptersCount: number;
  category: string; // e.g. "Taurat", "Sejarah", "Puisi", "Para Nabi", "Injil", "Surat", "Nubuat"
  categoryEn?: string; // e.g. "Law", "History", "Poetry & Wisdom", "Gospels", "Epistles"
}

export interface Verse {
  id: string; // format: "bookId-chapter-verse" e.g. "yoh-3-16"
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  textEn?: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  createdAt: number;
}

export interface Highlight {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  color: HighlightColor;
  createdAt: number;
}

export interface Note {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  verseText: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: number;
  updatedAt: number;
}

export type ThemeMode = 'light' | 'sepia' | 'vintage' | 'dark' | 'oled';
export type FontFamilyType = 'serif' | 'sans' | 'garamond';
export type LineHeightType = 'normal' | 'relaxed' | 'loose';

export interface ReadingSettings {
  fontSize: number; // in px, e.g. 16 to 30
  theme: ThemeMode;
  fontFamily: FontFamilyType;
  lineHeight: LineHeightType;
  showVerseNumbers: boolean;
  autoScroll: boolean;
  audioSpeed: number;
  language?: Language; // 'id' | 'en'
}

export interface DailyDevotional {
  date: string;
  verse: Verse;
  themeTitle: string;
  reflection: string;
  prayer: string;
}

export type StoryCategory = 'hikmah' | 'kesaksian' | 'mukjizat' | 'keluarga' | 'pengampunan' | 'iman';

export interface SpiritualStory {
  id: string;
  category: StoryCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  readingTime: string;
  authorOrSource: string;
  coverEmoji: string;
  scriptureReference: string;
  scriptureText: string;
  storyContent: string[];
  moralLesson: string;
  prayer: string;
}

export interface UserProfile {
  id: string;
  name: string;
  emailOrUsername: string;
  avatarEmoji: string;
  favoriteVerse?: string;
  churchOrCity?: string;
  createdAt: number;
  isGuest?: boolean;
}

export interface UserPersonalTestimony {
  id: string;
  title: string;
  category: string;
  story: string;
  bibleVerse?: string;
  date: string;
  authorId?: string;
  authorName: string;
  authorAvatar?: string;
  isPublic?: boolean;
  amenCount?: number;
  createdAt: number;
}

export type TabType = 'read' | 'search' | 'bookmarks' | 'notes' | 'devotional' | 'stories';

export interface ReadingHistoryItem {
  id: string; // e.g. "yoh-3"
  bookId: string;
  bookName: string;
  shortName?: string;
  chapter: number;
  testament: Testament;
  category?: string;
  visitedAt: number;
}

