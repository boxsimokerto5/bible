import { Book, Language } from '../types';

export const BIBLE_BOOKS: Book[] = [
  // PERJANJIAN LAMA (39 Kitab) / OLD TESTAMENT (39 Books)
  { id: 'kej', name: 'Kejadian', nameEn: 'Genesis', shortName: 'Kej', shortNameEn: 'Gen', testament: 'PL', order: 1, chaptersCount: 50, category: 'Taurat', categoryEn: 'Pentateuch / Law' },
  { id: 'kel', name: 'Keluaran', nameEn: 'Exodus', shortName: 'Kel', shortNameEn: 'Exo', testament: 'PL', order: 2, chaptersCount: 40, category: 'Taurat', categoryEn: 'Pentateuch / Law' },
  { id: 'ima', name: 'Imamat', nameEn: 'Leviticus', shortName: 'Ima', shortNameEn: 'Lev', testament: 'PL', order: 3, chaptersCount: 27, category: 'Taurat', categoryEn: 'Pentateuch / Law' },
  { id: 'bil', name: 'Bilangan', nameEn: 'Numbers', shortName: 'Bil', shortNameEn: 'Num', testament: 'PL', order: 4, chaptersCount: 36, category: 'Taurat', categoryEn: 'Pentateuch / Law' },
  { id: 'ula', name: 'Ulangan', nameEn: 'Deuteronomy', shortName: 'Ula', shortNameEn: 'Deu', testament: 'PL', order: 5, chaptersCount: 34, category: 'Taurat', categoryEn: 'Pentateuch / Law' },
  
  { id: 'yos', name: 'Yosua', nameEn: 'Joshua', shortName: 'Yos', shortNameEn: 'Josh', testament: 'PL', order: 6, chaptersCount: 24, category: 'Sejarah', categoryEn: 'History' },
  { id: 'hak', name: 'Hakim-hakim', nameEn: 'Judges', shortName: 'Hak', shortNameEn: 'Judg', testament: 'PL', order: 7, chaptersCount: 21, category: 'Sejarah', categoryEn: 'History' },
  { id: 'rut', name: 'Rut', nameEn: 'Ruth', shortName: 'Rut', shortNameEn: 'Ruth', testament: 'PL', order: 8, chaptersCount: 4, category: 'Sejarah', categoryEn: 'History' },
  { id: '1sam', name: '1 Samuel', nameEn: '1 Samuel', shortName: '1Sam', shortNameEn: '1Sam', testament: 'PL', order: 9, chaptersCount: 31, category: 'Sejarah', categoryEn: 'History' },
  { id: '2sam', name: '2 Samuel', nameEn: '2 Samuel', shortName: '2Sam', shortNameEn: '2Sam', testament: 'PL', order: 10, chaptersCount: 24, category: 'Sejarah', categoryEn: 'History' },
  { id: '1raj', name: '1 Raja-raja', nameEn: '1 Kings', shortName: '1Raj', shortNameEn: '1Kgs', testament: 'PL', order: 11, chaptersCount: 22, category: 'Sejarah', categoryEn: 'History' },
  { id: '2raj', name: '2 Raja-raja', nameEn: '2 Kings', shortName: '2Raj', shortNameEn: '2Kgs', testament: 'PL', order: 12, chaptersCount: 25, category: 'Sejarah', categoryEn: 'History' },
  { id: '1taw', name: '1 Tawarikh', nameEn: '1 Chronicles', shortName: '1Taw', shortNameEn: '1Chr', testament: 'PL', order: 13, chaptersCount: 29, category: 'Sejarah', categoryEn: 'History' },
  { id: '2taw', name: '2 Tawarikh', nameEn: '2 Chronicles', shortName: '2Taw', shortNameEn: '2Chr', testament: 'PL', order: 14, chaptersCount: 36, category: 'Sejarah', categoryEn: 'History' },
  { id: 'ezr', name: 'Ezra', nameEn: 'Ezra', shortName: 'Ezr', shortNameEn: 'Ezr', testament: 'PL', order: 15, chaptersCount: 10, category: 'Sejarah', categoryEn: 'History' },
  { id: 'neh', name: 'Nehemia', nameEn: 'Nehemiah', shortName: 'Neh', shortNameEn: 'Neh', testament: 'PL', order: 16, chaptersCount: 13, category: 'Sejarah', categoryEn: 'History' },
  { id: 'est', name: 'Ester', nameEn: 'Esther', shortName: 'Est', shortNameEn: 'Esth', testament: 'PL', order: 17, chaptersCount: 10, category: 'Sejarah', categoryEn: 'History' },
  
  { id: 'ayb', name: 'Ayub', nameEn: 'Job', shortName: 'Ayb', shortNameEn: 'Job', testament: 'PL', order: 18, chaptersCount: 42, category: 'Puisi & Hikmat', categoryEn: 'Poetry & Wisdom' },
  { id: 'mzm', name: 'Mazmur', nameEn: 'Psalms', shortName: 'Mzm', shortNameEn: 'Ps', testament: 'PL', order: 19, chaptersCount: 150, category: 'Puisi & Hikmat', categoryEn: 'Poetry & Wisdom' },
  { id: 'ams', name: 'Amsal', nameEn: 'Proverbs', shortName: 'Ams', shortNameEn: 'Prov', testament: 'PL', order: 20, chaptersCount: 31, category: 'Puisi & Hikmat', categoryEn: 'Poetry & Wisdom' },
  { id: 'pkh', name: 'Pengkhotbah', nameEn: 'Ecclesiastes', shortName: 'Pkh', shortNameEn: 'Eccl', testament: 'PL', order: 21, chaptersCount: 12, category: 'Puisi & Hikmat', categoryEn: 'Poetry & Wisdom' },
  { id: 'kid', name: 'Kidung Agung', nameEn: 'Song of Solomon', shortName: 'Kid', shortNameEn: 'Song', testament: 'PL', order: 22, chaptersCount: 8, category: 'Puisi & Hikmat', categoryEn: 'Poetry & Wisdom' },
  
  { id: 'yes', name: 'Yesaya', nameEn: 'Isaiah', shortName: 'Yes', shortNameEn: 'Isa', testament: 'PL', order: 23, chaptersCount: 66, category: 'Nabi-nabi Besar', categoryEn: 'Major Prophets' },
  { id: 'yer', name: 'Yeremia', nameEn: 'Jeremiah', shortName: 'Yer', shortNameEn: 'Jer', testament: 'PL', order: 24, chaptersCount: 52, category: 'Nabi-nabi Besar', categoryEn: 'Major Prophets' },
  { id: 'rat', name: 'Ratapan', nameEn: 'Lamentations', shortName: 'Rat', shortNameEn: 'Lam', testament: 'PL', order: 25, chaptersCount: 5, category: 'Nabi-nabi Besar', categoryEn: 'Major Prophets' },
  { id: 'yeh', name: 'Yehezkiel', nameEn: 'Ezekiel', shortName: 'Yeh', shortNameEn: 'Ezek', testament: 'PL', order: 26, chaptersCount: 48, category: 'Nabi-nabi Besar', categoryEn: 'Major Prophets' },
  { id: 'dan', name: 'Daniel', nameEn: 'Daniel', shortName: 'Dan', shortNameEn: 'Dan', testament: 'PL', order: 27, chaptersCount: 12, category: 'Nabi-nabi Besar', categoryEn: 'Major Prophets' },
  
  { id: 'hos', name: 'Hosea', nameEn: 'Hosea', shortName: 'Hos', shortNameEn: 'Hos', testament: 'PL', order: 28, chaptersCount: 14, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'yol', name: 'Yoel', nameEn: 'Joel', shortName: 'Yol', shortNameEn: 'Joel', testament: 'PL', order: 29, chaptersCount: 3, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'amo', name: 'Amos', nameEn: 'Amos', shortName: 'Amo', shortNameEn: 'Amos', testament: 'PL', order: 30, chaptersCount: 9, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'oba', name: 'Obaja', nameEn: 'Obadiah', shortName: 'Oba', shortNameEn: 'Obad', testament: 'PL', order: 31, chaptersCount: 1, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'yun', name: 'Yunus', nameEn: 'Jonah', shortName: 'Yun', shortNameEn: 'Jonah', testament: 'PL', order: 32, chaptersCount: 4, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'mik', name: 'Mikha', nameEn: 'Micah', shortName: 'Mik', shortNameEn: 'Mic', testament: 'PL', order: 33, chaptersCount: 7, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'nah', name: 'Nahum', nameEn: 'Nahum', shortName: 'Nah', shortNameEn: 'Nah', testament: 'PL', order: 34, chaptersCount: 3, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'hab', name: 'Habakuk', nameEn: 'Habakkuk', shortName: 'Hab', shortNameEn: 'Hab', testament: 'PL', order: 35, chaptersCount: 3, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'zef', name: 'Zefanya', nameEn: 'Zephaniah', shortName: 'Zef', shortNameEn: 'Zeph', testament: 'PL', order: 36, chaptersCount: 3, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'hag', name: 'Hagai', nameEn: 'Haggai', shortName: 'Hag', shortNameEn: 'Hag', testament: 'PL', order: 37, chaptersCount: 2, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'zak', name: 'Zakharia', nameEn: 'Zechariah', shortName: 'Zak', shortNameEn: 'Zech', testament: 'PL', order: 38, chaptersCount: 14, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },
  { id: 'mal', name: 'Maleakhi', nameEn: 'Malachi', shortName: 'Mal', shortNameEn: 'Mal', testament: 'PL', order: 39, chaptersCount: 4, category: 'Nabi-nabi Kecil', categoryEn: 'Minor Prophets' },

  // PERJANJIAN BARU (27 Kitab) / NEW TESTAMENT (27 Books)
  { id: 'mat', name: 'Matius', nameEn: 'Matthew', shortName: 'Mat', shortNameEn: 'Matt', testament: 'PB', order: 40, chaptersCount: 28, category: 'Injil', categoryEn: 'Gospels' },
  { id: 'mrk', name: 'Markus', nameEn: 'Mark', shortName: 'Mrk', shortNameEn: 'Mark', testament: 'PB', order: 41, chaptersCount: 16, category: 'Injil', categoryEn: 'Gospels' },
  { id: 'luk', name: 'Lukas', nameEn: 'Luke', shortName: 'Luk', shortNameEn: 'Luke', testament: 'PB', order: 42, chaptersCount: 24, category: 'Injil', categoryEn: 'Gospels' },
  { id: 'yoh', name: 'Yohanes', nameEn: 'John', shortName: 'Yoh', shortNameEn: 'John', testament: 'PB', order: 43, chaptersCount: 21, category: 'Injil', categoryEn: 'Gospels' },
  { id: 'kis', name: 'Kisah Para Rasul', nameEn: 'Acts', shortName: 'Kis', shortNameEn: 'Acts', testament: 'PB', order: 44, chaptersCount: 28, category: 'Sejarah', categoryEn: 'History' },
  
  { id: 'rom', name: 'Roma', nameEn: 'Romans', shortName: 'Rom', shortNameEn: 'Rom', testament: 'PB', order: 45, chaptersCount: 16, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: '1kor', name: '1 Korintus', nameEn: '1 Corinthians', shortName: '1Kor', shortNameEn: '1Cor', testament: 'PB', order: 46, chaptersCount: 16, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: '2kor', name: '2 Korintus', nameEn: '2 Corinthians', shortName: '2Kor', shortNameEn: '2Cor', testament: 'PB', order: 47, chaptersCount: 13, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: 'gal', name: 'Galatia', nameEn: 'Galatians', shortName: 'Gal', shortNameEn: 'Gal', testament: 'PB', order: 48, chaptersCount: 6, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: 'efs', name: 'Efesus', nameEn: 'Ephesians', shortName: 'Efs', shortNameEn: 'Eph', testament: 'PB', order: 49, chaptersCount: 6, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: 'flp', name: 'Filipi', nameEn: 'Philippians', shortName: 'Flp', shortNameEn: 'Phil', testament: 'PB', order: 50, chaptersCount: 4, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: 'kol', name: 'Kolose', nameEn: 'Colossians', shortName: 'Kol', shortNameEn: 'Col', testament: 'PB', order: 51, chaptersCount: 4, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: '1tes', name: '1 Tesalonika', nameEn: '1 Thessalonians', shortName: '1Tes', shortNameEn: '1Thess', testament: 'PB', order: 52, chaptersCount: 5, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: '2tes', name: '2 Tesalonika', nameEn: '2 Thessalonians', shortName: '2Tes', shortNameEn: '2Thess', testament: 'PB', order: 53, chaptersCount: 3, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: '1tim', name: '1 Timotius', nameEn: '1 Timothy', shortName: '1Tim', shortNameEn: '1Tim', testament: 'PB', order: 54, chaptersCount: 6, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: '2tim', name: '2 Timotius', nameEn: '2 Timothy', shortName: '2Tim', shortNameEn: '2Tim', testament: 'PB', order: 55, chaptersCount: 4, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: 'tit', name: 'Titus', nameEn: 'Titus', shortName: 'Tit', shortNameEn: 'Tit', testament: 'PB', order: 56, chaptersCount: 3, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  { id: 'flm', name: 'Filemon', nameEn: 'Philemon', shortName: 'Flm', shortNameEn: 'Phlm', testament: 'PB', order: 57, chaptersCount: 1, category: 'Surat Paulus', categoryEn: "Paul's Epistles" },
  
  { id: 'ibr', name: 'Ibrani', nameEn: 'Hebrews', shortName: 'Ibr', shortNameEn: 'Heb', testament: 'PB', order: 58, chaptersCount: 13, category: 'Surat Umum', categoryEn: 'General Epistles' },
  { id: 'yak', name: 'Yakobus', nameEn: 'James', shortName: 'Yak', shortNameEn: 'Jas', testament: 'PB', order: 59, chaptersCount: 5, category: 'Surat Umum', categoryEn: 'General Epistles' },
  { id: '1ptr', name: '1 Petrus', nameEn: '1 Peter', shortName: '1Ptr', shortNameEn: '1Pet', testament: 'PB', order: 60, chaptersCount: 5, category: 'Surat Umum', categoryEn: 'General Epistles' },
  { id: '2ptr', name: '2 Petrus', nameEn: '2 Peter', shortName: '2Ptr', shortNameEn: '2Pet', testament: 'PB', order: 61, chaptersCount: 3, category: 'Surat Umum', categoryEn: 'General Epistles' },
  { id: '1yoh', name: '1 Yohanes', nameEn: '1 John', shortName: '1Yoh', shortNameEn: '1John', testament: 'PB', order: 62, chaptersCount: 5, category: 'Surat Umum', categoryEn: 'General Epistles' },
  { id: '2yoh', name: '2 Yohanes', nameEn: '2 John', shortName: '2Yoh', shortNameEn: '2John', testament: 'PB', order: 63, chaptersCount: 1, category: 'Surat Umum', categoryEn: 'General Epistles' },
  { id: '3yoh', name: '3 Yohanes', nameEn: '3 John', shortName: '3Yoh', shortNameEn: '3John', testament: 'PB', order: 64, chaptersCount: 1, category: 'Surat Umum', categoryEn: 'General Epistles' },
  { id: 'yud', name: 'Yudas', nameEn: 'Jude', shortName: 'Yud', shortNameEn: 'Jude', testament: 'PB', order: 65, chaptersCount: 1, category: 'Surat Umum', categoryEn: 'General Epistles' },
  
  { id: 'why', name: 'Wahyu', nameEn: 'Revelation', shortName: 'Why', shortNameEn: 'Rev', testament: 'PB', order: 66, chaptersCount: 22, category: 'Nubuat', categoryEn: 'Prophecy' },
];

export const TESTAMENT_NAMES = {
  PL: 'Perjanjian Lama',
  PB: 'Perjanjian Baru',
};

export function getBookName(book: Book | undefined | null, lang: Language = 'id'): string {
  if (!book) return '';
  return lang === 'en' && book.nameEn ? book.nameEn : book.name;
}

export function getBookNameById(bookId: string, lang: Language = 'id'): string {
  const book = BIBLE_BOOKS.find(b => b.id === bookId);
  return getBookName(book, lang);
}

export function getBookShortName(book: Book | undefined | null, lang: Language = 'id'): string {
  if (!book) return '';
  return lang === 'en' && book.shortNameEn ? book.shortNameEn : book.shortName;
}

export function getBookCategory(book: Book | undefined | null, lang: Language = 'id'): string {
  if (!book) return '';
  return lang === 'en' && book.categoryEn ? book.categoryEn : book.category;
}

export function getTestamentName(testament: 'PL' | 'PB', lang: Language = 'id'): string {
  if (lang === 'en') {
    return testament === 'PB' ? 'New Testament' : 'Old Testament';
  }
  return testament === 'PB' ? 'Perjanjian Baru' : 'Perjanjian Lama';
}

export function getTestamentShortName(testament: 'PL' | 'PB', lang: Language = 'id'): string {
  if (lang === 'en') {
    return testament === 'PB' ? 'NT' : 'OT';
  }
  return testament === 'PB' ? 'PB' : 'PL';
}
