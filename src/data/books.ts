import { Book } from '../types';

export const BIBLE_BOOKS: Book[] = [
  // PERJANJIAN LAMA (39 Kitab)
  { id: 'kej', name: 'Kejadian', shortName: 'Kej', testament: 'PL', order: 1, chaptersCount: 50, category: 'Taurat' },
  { id: 'kel', name: 'Keluaran', shortName: 'Kel', testament: 'PL', order: 2, chaptersCount: 40, category: 'Taurat' },
  { id: 'ima', name: 'Imamat', shortName: 'Ima', testament: 'PL', order: 3, chaptersCount: 27, category: 'Taurat' },
  { id: 'bil', name: 'Bilangan', shortName: 'Bil', testament: 'PL', order: 4, chaptersCount: 36, category: 'Taurat' },
  { id: 'ula', name: 'Ulangan', shortName: 'Ula', testament: 'PL', order: 5, chaptersCount: 34, category: 'Taurat' },
  
  { id: 'yos', name: 'Yosua', shortName: 'Yos', testament: 'PL', order: 6, chaptersCount: 24, category: 'Sejarah' },
  { id: 'hak', name: 'Hakim-hakim', shortName: 'Hak', testament: 'PL', order: 7, chaptersCount: 21, category: 'Sejarah' },
  { id: 'rut', name: 'Rut', shortName: 'Rut', testament: 'PL', order: 8, chaptersCount: 4, category: 'Sejarah' },
  { id: '1sam', name: '1 Samuel', shortName: '1Sam', testament: 'PL', order: 9, chaptersCount: 31, category: 'Sejarah' },
  { id: '2sam', name: '2 Samuel', shortName: '2Sam', testament: 'PL', order: 10, chaptersCount: 24, category: 'Sejarah' },
  { id: '1raj', name: '1 Raja-raja', shortName: '1Raj', testament: 'PL', order: 11, chaptersCount: 22, category: 'Sejarah' },
  { id: '2raj', name: '2 Raja-raja', shortName: '2Raj', testament: 'PL', order: 12, chaptersCount: 25, category: 'Sejarah' },
  { id: '1taw', name: '1 Tawarikh', shortName: '1Taw', testament: 'PL', order: 13, chaptersCount: 29, category: 'Sejarah' },
  { id: '2taw', name: '2 Tawarikh', shortName: '2Taw', testament: 'PL', order: 14, chaptersCount: 36, category: 'Sejarah' },
  { id: 'ezr', name: 'Ezra', shortName: 'Ezr', testament: 'PL', order: 15, chaptersCount: 10, category: 'Sejarah' },
  { id: 'neh', name: 'Nehemia', shortName: 'Neh', testament: 'PL', order: 16, chaptersCount: 13, category: 'Sejarah' },
  { id: 'est', name: 'Ester', shortName: 'Est', testament: 'PL', order: 17, chaptersCount: 10, category: 'Sejarah' },
  
  { id: 'ayb', name: 'Ayub', shortName: 'Ayb', testament: 'PL', order: 18, chaptersCount: 42, category: 'Puisi & Hikmat' },
  { id: 'mzm', name: 'Mazmur', shortName: 'Mzm', testament: 'PL', order: 19, chaptersCount: 150, category: 'Puisi & Hikmat' },
  { id: 'ams', name: 'Amsal', shortName: 'Ams', testament: 'PL', order: 20, chaptersCount: 31, category: 'Puisi & Hikmat' },
  { id: 'pkh', name: 'Pengkhotbah', shortName: 'Pkh', testament: 'PL', order: 21, chaptersCount: 12, category: 'Puisi & Hikmat' },
  { id: 'kid', name: 'Kidung Agung', shortName: 'Kid', testament: 'PL', order: 22, chaptersCount: 8, category: 'Puisi & Hikmat' },
  
  { id: 'yes', name: 'Yesaya', shortName: 'Yes', testament: 'PL', order: 23, chaptersCount: 66, category: 'Nabi-nabi Besar' },
  { id: 'yer', name: 'Yeremia', shortName: 'Yer', testament: 'PL', order: 24, chaptersCount: 52, category: 'Nabi-nabi Besar' },
  { id: 'rat', name: 'Ratapan', shortName: 'Rat', testament: 'PL', order: 25, chaptersCount: 5, category: 'Nabi-nabi Besar' },
  { id: 'yeh', name: 'Yehezkiel', shortName: 'Yeh', testament: 'PL', order: 26, chaptersCount: 48, category: 'Nabi-nabi Besar' },
  { id: 'dan', name: 'Daniel', shortName: 'Dan', testament: 'PL', order: 27, chaptersCount: 12, category: 'Nabi-nabi Besar' },
  
  { id: 'hos', name: 'Hosea', shortName: 'Hos', testament: 'PL', order: 28, chaptersCount: 14, category: 'Nabi-nabi Kecil' },
  { id: 'yol', name: 'Yoel', shortName: 'Yol', testament: 'PL', order: 29, chaptersCount: 3, category: 'Nabi-nabi Kecil' },
  { id: 'amo', name: 'Amos', shortName: 'Amo', testament: 'PL', order: 30, chaptersCount: 9, category: 'Nabi-nabi Kecil' },
  { id: 'oba', name: 'Obaja', shortName: 'Oba', testament: 'PL', order: 31, chaptersCount: 1, category: 'Nabi-nabi Kecil' },
  { id: 'yun', name: 'Yunus', shortName: 'Yun', testament: 'PL', order: 32, chaptersCount: 4, category: 'Nabi-nabi Kecil' },
  { id: 'mik', name: 'Mikha', shortName: 'Mik', testament: 'PL', order: 33, chaptersCount: 7, category: 'Nabi-nabi Kecil' },
  { id: 'nah', name: 'Nahum', shortName: 'Nah', testament: 'PL', order: 34, chaptersCount: 3, category: 'Nabi-nabi Kecil' },
  { id: 'hab', name: 'Habakuk', shortName: 'Hab', testament: 'PL', order: 35, chaptersCount: 3, category: 'Nabi-nabi Kecil' },
  { id: 'zef', name: 'Zefanya', shortName: 'Zef', testament: 'PL', order: 36, chaptersCount: 3, category: 'Nabi-nabi Kecil' },
  { id: 'hag', name: 'Hagai', shortName: 'Hag', testament: 'PL', order: 37, chaptersCount: 2, category: 'Nabi-nabi Kecil' },
  { id: 'zak', name: 'Zakharia', shortName: 'Zak', testament: 'PL', order: 38, chaptersCount: 14, category: 'Nabi-nabi Kecil' },
  { id: 'mal', name: 'Maleakhi', shortName: 'Mal', testament: 'PL', order: 39, chaptersCount: 4, category: 'Nabi-nabi Kecil' },

  // PERJANJIAN BARU (27 Kitab)
  { id: 'mat', name: 'Matius', shortName: 'Mat', testament: 'PB', order: 40, chaptersCount: 28, category: 'Injil' },
  { id: 'mrk', name: 'Markus', shortName: 'Mrk', testament: 'PB', order: 41, chaptersCount: 16, category: 'Injil' },
  { id: 'luk', name: 'Lukas', shortName: 'Luk', testament: 'PB', order: 42, chaptersCount: 24, category: 'Injil' },
  { id: 'yoh', name: 'Yohanes', shortName: 'Yoh', testament: 'PB', order: 43, chaptersCount: 21, category: 'Injil' },
  { id: 'kis', name: 'Kisah Para Rasul', shortName: 'Kis', testament: 'PB', order: 44, chaptersCount: 28, category: 'Sejarah' },
  
  { id: 'rom', name: 'Roma', shortName: 'Rom', testament: 'PB', order: 45, chaptersCount: 16, category: 'Surat Paulus' },
  { id: '1kor', name: '1 Korintus', shortName: '1Kor', testament: 'PB', order: 46, chaptersCount: 16, category: 'Surat Paulus' },
  { id: '2kor', name: '2 Korintus', shortName: '2Kor', testament: 'PB', order: 47, chaptersCount: 13, category: 'Surat Paulus' },
  { id: 'gal', name: 'Galatia', shortName: 'Gal', testament: 'PB', order: 48, chaptersCount: 6, category: 'Surat Paulus' },
  { id: 'efs', name: 'Efesus', shortName: 'Efs', testament: 'PB', order: 49, chaptersCount: 6, category: 'Surat Paulus' },
  { id: 'flp', name: 'Filipi', shortName: 'Flp', testament: 'PB', order: 50, chaptersCount: 4, category: 'Surat Paulus' },
  { id: 'kol', name: 'Kolose', shortName: 'Kol', testament: 'PB', order: 51, chaptersCount: 4, category: 'Surat Paulus' },
  { id: '1tes', name: '1 Tesalonika', shortName: '1Tes', testament: 'PB', order: 52, chaptersCount: 5, category: 'Surat Paulus' },
  { id: '2tes', name: '2 Tesalonika', shortName: '2Tes', testament: 'PB', order: 53, chaptersCount: 3, category: 'Surat Paulus' },
  { id: '1tim', name: '1 Timotius', shortName: '1Tim', testament: 'PB', order: 54, chaptersCount: 6, category: 'Surat Paulus' },
  { id: '2tim', name: '2 Timotius', shortName: '2Tim', testament: 'PB', order: 55, chaptersCount: 4, category: 'Surat Paulus' },
  { id: 'tit', name: 'Titus', shortName: 'Tit', testament: 'PB', order: 56, chaptersCount: 3, category: 'Surat Paulus' },
  { id: 'flm', name: 'Filemon', shortName: 'Flm', testament: 'PB', order: 57, chaptersCount: 1, category: 'Surat Paulus' },
  
  { id: 'ibr', name: 'Ibrani', shortName: 'Ibr', testament: 'PB', order: 58, chaptersCount: 13, category: 'Surat Umum' },
  { id: 'yak', name: 'Yakobus', shortName: 'Yak', testament: 'PB', order: 59, chaptersCount: 5, category: 'Surat Umum' },
  { id: '1ptr', name: '1 Petrus', shortName: '1Ptr', testament: 'PB', order: 60, chaptersCount: 5, category: 'Surat Umum' },
  { id: '2ptr', name: '2 Petrus', shortName: '2Ptr', testament: 'PB', order: 61, chaptersCount: 3, category: 'Surat Umum' },
  { id: '1yoh', name: '1 Yohanes', shortName: '1Yoh', testament: 'PB', order: 62, chaptersCount: 5, category: 'Surat Umum' },
  { id: '2yoh', name: '2 Yohanes', shortName: '2Yoh', testament: 'PB', order: 63, chaptersCount: 1, category: 'Surat Umum' },
  { id: '3yoh', name: '3 Yohanes', shortName: '3Yoh', testament: 'PB', order: 64, chaptersCount: 1, category: 'Surat Umum' },
  { id: 'yud', name: 'Yudas', shortName: 'Yud', testament: 'PB', order: 65, chaptersCount: 1, category: 'Surat Umum' },
  
  { id: 'why', name: 'Wahyu', shortName: 'Why', testament: 'PB', order: 66, chaptersCount: 22, category: 'Nubuat' },
];

export const TESTAMENT_NAMES = {
  PL: 'Perjanjian Lama',
  PB: 'Perjanjian Baru',
};
