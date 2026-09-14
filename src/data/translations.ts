import { Language } from '../types';

export const TRANSLATIONS = {
  id: {
    // App & Nav
    appName: 'Alkitab Digital',
    tagline: 'Immanuel • Allah Beserta Kita',
    storiesTagline: 'Kasih Kristus & Teladan Iman',
    tabRead: 'Alkitab',
    tabDevotional: 'Renungan',
    tabStories: 'Kisah',
    tabNotes: 'Catatan',
    tabBookmarks: 'Bookmark',
    tabSearch: 'Cari',

    // Nav Aliases
    bible: 'Alkitab',
    devotional: 'Renungan',
    stories: 'Kisah',
    notes: 'Catatan',
    bookmark: 'Bookmark',
    search: 'Cari',
    
    // Header
    selectBookChapter: 'Pilih Kitab dan Pasal',
    christmas: 'Natal',
    listenAudio: 'Dengarkan Suara Pembacaan Firman',
    textSize: 'Ukuran Teks',
    searchTooltip: 'Cari Ayat atau Kata',
    signIn: 'Masuk',
    account: 'Akun',
    salibTitle: 'Salib Kristus • Damai Sejahtera Allah',
    
    // Reader View
    prevChapter: 'Pasal Sebelumnya',
    nextChapter: 'Pasal Selanjutnya',
    oldTestament: 'Perjanjian Lama',
    newTestament: 'Perjanjian Baru',
    otShort: 'PL',
    ntShort: 'PB',
    verseNumber: 'Ayat',
    decreaseFont: 'Kecilkan Huruf',
    increaseFont: 'Besarkan Huruf',
    fontDecrease: 'Kecilkan Huruf',
    fontIncrease: 'Besarkan Huruf',
    
    // Book Picker Modal
    pickBookChapterTitle: 'Pilih Kitab & Pasal',
    searchBookPlaceholder: 'Cari nama kitab...',
    chaptersWord: 'Pasal',
    all: 'Semua',

    // Language Toggle
    langId: 'ID',
    langEn: 'EN',
    langLabel: 'Bahasa',
    switchToEnglish: 'Beralih ke Bahasa Inggris (English)',
    switchToIndonesian: 'Beralih ke Bahasa Indonesia',
    
    // Settings
    displaySettings: 'Pengaturan Tampilan',
    settingsSubtitle: 'Atur ukuran huruf, tema, dan bahasa',
    languageSettingTitle: 'Bahasa Alkitab & Antarmuka',
    languageSettingDesc: 'Pilih versi teks Alkitab dan bahasa tampilan (Indonesia / English)',
    langIdOption: 'Bahasa Indonesia (Terjemahan Baru / TB)',
    langEnOption: 'English (King James Version / WEB)',
    themeTitle: 'Tema Tampilan',
    fontSizeTitle: 'Ukuran Huruf',
    fontFamilyTitle: 'Jenis Huruf',
    lineHeightTitle: 'Jarak Antar Baris',
    audioSpeedTitle: 'Kecepatan Suara Firman',
    normal: 'Normal',
    relaxed: 'Nyaman',
    loose: 'Lebar',

    // Action Drawer / Verse Actions
    copyVerse: 'Salin Ayat',
    shareVerse: 'Bagikan',
    bookmarkVerse: 'Tandai Ayat',
    highlightVerse: 'Stabilo Warna',
    addNote: 'Catat Khotbah',
    listenVerse: 'Dengarkan Audio',
    copiedSuccess: 'Ayat berhasil disalin!',

    // Reading History
    readingHistory: 'Riwayat Bacaan',
    readingHistorySubtitle: '10 pasal terakhir yang Anda kunjungi untuk akses cepat',
    clearHistory: 'Bersihkan',
    noHistory: 'Belum ada riwayat bacaan',
    noHistoryDesc: 'Pasal yang Anda buka saat membaca Alkitab akan tersimpan di sini secara otomatis.',
    justNow: 'Baru saja',
    minsAgo: 'mnt lalu',
    hoursAgo: 'jam lalu',
    yesterday: 'Kemarin',
    daysAgo: 'hari lalu',
  },
  en: {
    // App & Nav
    appName: 'Holy Bible',
    tagline: 'Immanuel • God With Us',
    storiesTagline: 'Christ Love & Faithful Examples',
    tabRead: 'Bible',
    tabDevotional: 'Devotional',
    tabStories: 'Stories',
    tabNotes: 'Notes',
    tabBookmarks: 'Bookmarks',
    tabSearch: 'Search',

    // Nav Aliases
    bible: 'Bible',
    devotional: 'Devotional',
    stories: 'Stories',
    notes: 'Notes',
    bookmark: 'Bookmarks',
    search: 'Search',
    
    // Header
    selectBookChapter: 'Select Book and Chapter',
    christmas: 'Christmas',
    listenAudio: 'Listen to Audio Reading',
    textSize: 'Text Size',
    searchTooltip: 'Search Verses or Keywords',
    signIn: 'Sign In',
    account: 'Account',
    salibTitle: 'Cross of Christ • Peace of God',
    
    // Reader View
    prevChapter: 'Previous Chapter',
    nextChapter: 'Next Chapter',
    oldTestament: 'Old Testament',
    newTestament: 'New Testament',
    otShort: 'OT',
    ntShort: 'NT',
    verseNumber: 'Verse',
    decreaseFont: 'Decrease Font',
    increaseFont: 'Increase Font',
    fontDecrease: 'Decrease Font',
    fontIncrease: 'Increase Font',
    
    // Book Picker Modal
    pickBookChapterTitle: 'Select Book & Chapter',
    searchBookPlaceholder: 'Search book name...',
    chaptersWord: 'Chapters',
    all: 'All',

    // Language Toggle
    langId: 'ID',
    langEn: 'EN',
    langLabel: 'Language',
    switchToEnglish: 'Switch to English',
    switchToIndonesian: 'Switch to Indonesian',
    
    // Settings
    displaySettings: 'Display Settings',
    settingsSubtitle: 'Customize text size, theme, and language',
    languageSettingTitle: 'Bible & Interface Language',
    languageSettingDesc: 'Choose Bible translation and display language (Indonesia / English)',
    langIdOption: 'Bahasa Indonesia (Terjemahan Baru / TB)',
    langEnOption: 'English (King James Version / WEB)',
    themeTitle: 'Display Theme',
    fontSizeTitle: 'Font Size',
    fontFamilyTitle: 'Font Family',
    lineHeightTitle: 'Line Height',
    audioSpeedTitle: 'Voice Audio Speed',
    normal: 'Normal',
    relaxed: 'Relaxed',
    loose: 'Loose',

    // Action Drawer / Verse Actions
    copyVerse: 'Copy Verse',
    shareVerse: 'Share',
    bookmarkVerse: 'Bookmark Verse',
    highlightVerse: 'Highlight Color',
    addNote: 'Sermon Note',
    listenVerse: 'Listen Audio',
    copiedSuccess: 'Verse copied to clipboard!',

    // Reading History
    readingHistory: 'Reading History',
    readingHistorySubtitle: 'Last 10 visited chapters for quick access',
    clearHistory: 'Clear',
    noHistory: 'No reading history yet',
    noHistoryDesc: 'Chapters you open while reading the Bible will automatically appear here.',
    justNow: 'Just now',
    minsAgo: 'm ago',
    hoursAgo: 'h ago',
    yesterday: 'Yesterday',
    daysAgo: 'd ago',
  },
};

export function getTranslation(lang: Language = 'id') {
  return TRANSLATIONS[lang] || TRANSLATIONS.id;
}
