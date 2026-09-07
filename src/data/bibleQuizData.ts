import { Verse } from '../types';

export type QuizCategory = 'devotional' | 'recent_reading' | 'verse_memory' | 'bible_characters' | 'jesus_miracles' | 'quick_mix';

export interface QuizOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  categoryLabel: string;
  question: string;
  contextOrClue?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  relatedVerse: {
    bookId: string;
    bookName: string;
    chapter: number;
    verse: number;
    verseText: string;
  };
  difficulty?: 'mudah' | 'sedang' | 'menantang';
}

export interface QuizSessionSummary {
  id: string;
  date: string;
  timestamp: number;
  category: QuizCategory;
  categoryLabel: string;
  totalQuestions: number;
  correctCount: number;
  score: number; // 0 - 100
  badgeTitle: string;
}

export interface UserQuizStats {
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  highestScore: number;
  lastQuizDate?: string;
  currentStreak: number;
}

// Koleksi Soal Kuis Alkitab Terstruktur Berbahasa Indonesia (TB)
export const BIBLE_QUIZ_BANK: QuizQuestion[] = [
  // 1. Kuis Renungan / Ayat Harian
  {
    id: 'dev-yer-29-11',
    category: 'devotional',
    categoryLabel: 'Ayat Renungan',
    question: 'Menurut Yeremia 29:11, apakah jenis rancangan yang disediakan TUHAN bagi umat-Nya?',
    contextOrClue: 'Yeremia 29:11 — Ayat tentang masa depan dan harapan',
    options: [
      { id: 'A', text: 'Rancangan kejayaan materi dan kekayaan tak terbatas' },
      { id: 'B', text: 'Rancangan damai sejahtera dan bukan rancangan kecelakaan' },
      { id: 'C', text: 'Rancangan pembalasan atas musuh-musuh Israel' },
      { id: 'D', text: 'Rancangan kemudahan tanpa adanya ujian iman' },
    ],
    correctOptionId: 'B',
    explanation: 'Dalam Yeremia 29:11 tertulis: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan."',
    relatedVerse: {
      bookId: 'yer',
      bookName: 'Yeremia',
      chapter: 29,
      verse: 11,
      verseText: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'dev-mzm-23-1',
    category: 'devotional',
    categoryLabel: 'Ayat Renungan',
    question: 'Dalam Mazmur 23:1-2 gubahan Daud, ke manakah TUHAN Sang Gembala membimbing jiwa kita?',
    contextOrClue: 'Mazmur 23:2 — Nyanyian Daud tentang Gembala yang Baik',
    options: [
      { id: 'A', text: 'Ke padang gurun yang luas dan tandus' },
      { id: 'B', text: 'Ke istana megah dengan emas perak' },
      { id: 'C', text: 'Ke padang yang berumput hijau dan ke air yang tenang' },
      { id: 'D', text: 'Ke puncak gunung tertinggi tanpa air' },
    ],
    correctOptionId: 'C',
    explanation: 'Mazmur 23:2 menyatakan: "Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang; Ia menyegarkan jiwaku."',
    relatedVerse: {
      bookId: 'mzm',
      bookName: 'Mazmur',
      chapter: 23,
      verse: 2,
      verseText: 'Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang;',
    },
    difficulty: 'mudah',
  },
  {
    id: 'dev-flp-4-6',
    category: 'devotional',
    categoryLabel: 'Ayat Renungan',
    question: 'Bagaimanakah nasihat Rasul Paulus dalam Filipi 4:6 ketika kita menghadapi kekuatiran hidup?',
    contextOrClue: 'Filipi 4:6 — Nasihat sukacita dan doa',
    options: [
      { id: 'A', text: 'Menyimpan kekuatiran sendiri sampai menemukan jalan keluar' },
      { id: 'B', text: 'Menyatakan segala keinginan kepada Allah dalam doa dan permohonan dengan ucapan syukur' },
      { id: 'C', text: 'Menghindari semua aktivitas dan mengasingkan diri' },
      { id: 'D', text: 'Mengandalkan kekayaan dan koneksi duniawi' },
    ],
    correctOptionId: 'B',
    explanation: 'Filipi 4:6 berbunyi: "Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur."',
    relatedVerse: {
      bookId: 'flp',
      bookName: 'Filipi',
      chapter: 4,
      verse: 6,
      verseText: 'Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'dev-ams-3-5',
    category: 'devotional',
    categoryLabel: 'Ayat Renungan',
    question: 'Menurut Amsal 3:5-6, apa yang harus kita lakukan dan apa yang TIDAK boleh kita sandari?',
    contextOrClue: 'Amsal 3:5 — Hikmat Raja Salomo',
    options: [
      { id: 'A', text: 'Percaya pada firasat dan jangan bersandar pada nasihat orang tua' },
      { id: 'B', text: 'Percaya kepada TUHAN dengan segenap hati dan jangan bersandar pada pengertian sendiri' },
      { id: 'C', text: 'Bersandar pada logika manusia dan meragukan firman' },
      { id: 'D', text: 'Mengikuti keinginan hati sendiri di setiap keputusan' },
    ],
    correctOptionId: 'B',
    explanation: 'Amsal 3:5-6 menuliskan: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu."',
    relatedVerse: {
      bookId: 'ams',
      bookName: 'Amsal',
      chapter: 3,
      verse: 5,
      verseText: 'Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'dev-yoh-3-16',
    category: 'devotional',
    categoryLabel: 'Ayat Renungan',
    question: 'Berdasarkan Yohanes 3:16, apakah wujud bukti terbesar kasih Allah kepada dunia?',
    contextOrClue: 'Injil Yohanes 3:16 — Kasih karunia keselamatan',
    options: [
      { id: 'A', text: 'Mengutus bala tentara malaikat untuk menghukum orang berdosa' },
      { id: 'B', text: 'Mengaruniakan Anak-Nya yang tunggal supaya yang percaya beroleh hidup kekal' },
      { id: 'C', text: 'Mendirikan bait suci yang paling megah di bumi' },
      { id: 'D', text: 'Memberikan hukum Taurat yang lebih keras' },
    ],
    correctOptionId: 'B',
    explanation: 'Yohanes 3:16 menegaskan: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal."',
    relatedVerse: {
      bookId: 'yoh',
      bookName: 'Yohanes',
      chapter: 3,
      verse: 16,
      verseText: 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'dev-yes-40-31',
    category: 'devotional',
    categoryLabel: 'Ayat Renungan',
    question: 'Dalam Yesaya 40:31, orang yang menanti-nantikan TUHAN diumpamakan seperti apakah?',
    contextOrClue: 'Yesaya 40:31 — Kekuatan baru bagi yang lelah',
    options: [
      { id: 'A', text: 'Singa yang mengaum di hutan rimba' },
      { id: 'B', text: 'Pohon korma yang bertunas di tepi sungai' },
      { id: 'C', text: 'Rajawali yang naik terbang dengan kekuatan sayapnya' },
      { id: 'D', text: 'Kuda perang yang tangkas di medan tempur' },
    ],
    correctOptionId: 'C',
    explanation: 'Yesaya 40:31 menyatakan: "tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah."',
    relatedVerse: {
      bookId: 'yes',
      bookName: 'Yesaya',
      chapter: 40,
      verse: 31,
      verseText: 'tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.',
    },
    difficulty: 'mudah',
  },

  // 2. Kuis Berdasarkan Bacaan Kitab (Yohanes, Matius, Kejadian, Mazmur, Roma, dll.)
  {
    id: 'read-yoh-1-1',
    category: 'recent_reading',
    categoryLabel: 'Kitab Yohanes',
    question: 'Bagaimanakah Yohanes 1:1 memperkenalkan "Firman" pada mulanya?',
    contextOrClue: 'Yohanes pasal 1 — Prolog Injil Yohanes',
    options: [
      { id: 'A', text: '"Pada mulanya adalah manusia pertama yang diciptakan Allah"' },
      { id: 'B', text: '"Pada mulanya Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah"' },
      { id: 'C', text: '"Pada mulanya Allah menciptakan langit dan bumi"' },
      { id: 'D', text: '"Pada mulanya bumi belum berbentuk dan gelap gulita"' },
    ],
    correctOptionId: 'B',
    explanation: 'Yohanes 1:1 berbunyi: "Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah."',
    relatedVerse: {
      bookId: 'yoh',
      bookName: 'Yohanes',
      chapter: 1,
      verse: 1,
      verseText: 'Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah.',
    },
    difficulty: 'sedang',
  },
  {
    id: 'read-yoh-3-3',
    category: 'recent_reading',
    categoryLabel: 'Kitab Yohanes',
    question: 'Kepada siapakah Yesus berkata: "Sesungguhnya jika seorang tidak dilahirkan kembali, ia tidak dapat melihat Kerajaan Allah"?',
    contextOrClue: 'Yohanes 3 — Percakapan malam tentang kelahiran baru',
    options: [
      { id: 'A', text: 'Zakeus si pemungut cukai' },
      { id: 'B', text: 'Nikodemus, seorang pemimpin agama Yahudi' },
      { id: 'C', text: 'Yairus, kepala rumah ibadat' },
      { id: 'D', text: 'Petrus di perahu nelayan' },
    ],
    correctOptionId: 'B',
    explanation: 'Dalam Yohanes 3:1-3, Nikodemus datang kepada Yesus pada waktu malam, dan Yesus mengajarkan pentingnya dilahirkan kembali dari air dan Roh untuk melihat Kerajaan Allah.',
    relatedVerse: {
      bookId: 'yoh',
      bookName: 'Yohanes',
      chapter: 3,
      verse: 3,
      verseText: 'Yesus menjawab, kata-Nya: "Aku berkata kepadamu, sesungguhnya jikalau seorang tidak dilahirkan kembali, ia tidak dapat melihat Kerajaan Allah."',
    },
    difficulty: 'sedang',
  },
  {
    id: 'read-yoh-14-6',
    category: 'recent_reading',
    categoryLabel: 'Kitab Yohanes',
    question: 'Lengkapi perkataan Yesus dalam Yohanes 14:6: "Akulah jalan dan kebenaran dan hidup. Tidak ada seorang pun yang datang kepada Bapa, kalau..."',
    contextOrClue: 'Yohanes 14:6 — Yesus adalah jalan keselamatan satu-satunya',
    options: [
      { id: 'A', text: '...tidak melalui perbuatan baiknya sendiri' },
      { id: 'B', text: '...tidak tidak melalui Aku' },
      { id: 'C', text: '...tidak membawa korban persembahan di bait suci' },
      { id: 'D', text: '...tidak menghafal seluruh hukum Taurat' },
    ],
    correctOptionId: 'B',
    explanation: 'Yesus menegaskan dalam Yohanes 14:6: "Kata Yesus kepadanya: "Akulah jalan dan kebenaran dan hidup. Tidak ada seorang pun yang datang kepada Bapa, kalau tidak melalui Aku."',
    relatedVerse: {
      bookId: 'yoh',
      bookName: 'Yohanes',
      chapter: 14,
      verse: 6,
      verseText: 'Kata Yesus kepadanya: "Akulah jalan dan kebenaran dan hidup. Tidak ada seorang pun yang datang kepada Bapa, kalau tidak melalui Aku."',
    },
    difficulty: 'mudah',
  },
  {
    id: 'read-mat-5-3',
    category: 'recent_reading',
    categoryLabel: 'Injil Matius',
    question: 'Dalam Khotbah di Bukit (Matius 5:3), siapakah yang empunya Kerajaan Sorga?',
    contextOrClue: 'Matius 5:3 — Ucapan Bahagia',
    options: [
      { id: 'A', text: 'Orang yang paling berkuasa di bumi' },
      { id: 'B', text: 'Orang yang miskin di hadapan Allah' },
      { id: 'C', text: 'Orang yang tidak pernah berbuat salah' },
      { id: 'D', text: 'Para imam dan orang Farisi' },
    ],
    correctOptionId: 'B',
    explanation: 'Matius 5:3 berbunyi: "Berbahagialah orang yang miskin di hadapan Allah, karena merekalah yang empunya Kerajaan Sorga."',
    relatedVerse: {
      bookId: 'mat',
      bookName: 'Matius',
      chapter: 5,
      verse: 3,
      verseText: 'Berbahagialah orang yang miskin di hadapan Allah, karena merekalah yang empunya Kerajaan Sorga.',
    },
    difficulty: 'sedang',
  },
  {
    id: 'read-mat-6-33',
    category: 'recent_reading',
    categoryLabel: 'Injil Matius',
    question: 'Menurut Matius 6:33, apakah yang harus kita cari terlebih dahulu agar semuanya ditambahkan kepadamu?',
    contextOrClue: 'Matius 6:33 — Prioritas kehidupan orang percaya',
    options: [
      { id: 'A', text: 'Kekayaan dan kenyamanan duniawi' },
      { id: 'B', text: 'Kerajaan Allah dan kebenaran-Nya' },
      { id: 'C', text: 'Pujian dan kehormatan dari manusia' },
      { id: 'D', text: 'Harta warisan leluhur' },
    ],
    correctOptionId: 'B',
    explanation: 'Matius 6:33 bersabda: "Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu."',
    relatedVerse: {
      bookId: 'mat',
      bookName: 'Matius',
      chapter: 6,
      verse: 33,
      verseText: 'Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'read-kej-1-1',
    category: 'recent_reading',
    categoryLabel: 'Kitab Kejadian',
    question: 'Apakah peristiwa yang dicatat pada hari keempat penciptaan dalam Kejadian pasal 1?',
    contextOrClue: 'Kejadian 1:14-19 — Hari-hari Penciptaan',
    options: [
      { id: 'A', text: 'Penciptaan manusia pertama Adam dan Hawa' },
      { id: 'B', text: 'Penciptaan benda-benda penerang: matahari, bulan, dan bintang-bintang' },
      { id: 'C', text: 'Pemisahan air di atas dan air di bawah' },
      { id: 'D', text: 'Penciptaan tumbuh-tumbuhan berbiji' },
    ],
    correctOptionId: 'B',
    explanation: 'Pada hari keempat, Allah berfirman menjadikan benda-benda penerang pada cakrawala untuk memisahkan siang dari malam serta menjadi tanda masa, hari, dan tahun (Kejadian 1:14-19).',
    relatedVerse: {
      bookId: 'kej',
      bookName: 'Kejadian',
      chapter: 1,
      verse: 16,
      verseText: 'Maka Allah menjadikan kedua benda penerang yang besar itu, yakni yang lebih besar untuk menguasai siang dan yang lebih kecil untuk menguasai malam, dan menjadikan juga bintang-bintang.',
    },
    difficulty: 'menantang',
  },
  {
    id: 'read-rom-8-28',
    category: 'recent_reading',
    categoryLabel: 'Surat Roma',
    question: 'Roma 8:28 menegaskan bahwa Allah turut bekerja dalam segala sesuatu untuk...',
    contextOrClue: 'Roma 8:28 — Kepastian pemeliharaan Allah',
    options: [
      { id: 'A', text: '...mendatangkan kebaikan bagi mereka yang mengasihi Dia' },
      { id: 'B', text: '...menghukum orang-orang yang tidak percaya' },
      { id: 'C', text: '...menyingkirkan semua penderitaan seketika itu juga' },
      { id: 'D', text: '...membuat semua orang menjadi kaya raya' },
    ],
    correctOptionId: 'A',
    explanation: 'Roma 8:28 berbunyi: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah."',
    relatedVerse: {
      bookId: 'rom',
      bookName: 'Roma',
      chapter: 8,
      verse: 28,
      verseText: 'Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.',
    },
    difficulty: 'mudah',
  },

  // 3. Kuis Tebak Lanjutan Firman (Lengkapi Hafalan Ayat)
  {
    id: 'mem-mzm-119-105',
    category: 'verse_memory',
    categoryLabel: 'Hafalan Ayat',
    question: 'Lengkapi ayat terkenal dari Mazmur 119:105:\n"Firman-Mu itu pelita bagi kakiku dan..."',
    contextOrClue: 'Mazmur 119:105 — Terang bagi perjalanan hidup',
    options: [
      { id: 'A', text: '...perisai bagi dadaku' },
      { id: 'B', text: '...terang bagi jalanku' },
      { id: 'C', text: '...tongkat penuntun langkahku' },
      { id: 'D', text: '...embun di pagi hariku' },
    ],
    correctOptionId: 'B',
    explanation: 'Mazmur 119:105 berbunyi: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."',
    relatedVerse: {
      bookId: 'mzm',
      bookName: 'Mazmur',
      chapter: 119,
      verse: 105,
      verseText: 'Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'mem-flp-4-13',
    category: 'verse_memory',
    categoryLabel: 'Hafalan Ayat',
    question: 'Lengkapi deklarasi iman dalam Filipi 4:13:\n"Segala perkara dapat kutanggung di dalam Dia yang..."',
    contextOrClue: 'Filipi 4:13 — Kekuatan di dalam Kristus',
    options: [
      { id: 'A', text: '...memberi kekuatan kepadaku' },
      { id: 'B', text: '...menciptakan langit dan bumi' },
      { id: 'C', text: '...mengetahui masa depanku' },
      { id: 'D', text: '...mengasihi aku sejak semula' },
    ],
    correctOptionId: 'A',
    explanation: 'Filipi 4:13 menyatakan dengan penuh keyakinan iman: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku."',
    relatedVerse: {
      bookId: 'flp',
      bookName: 'Filipi',
      chapter: 4,
      verse: 13,
      verseText: 'Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'mem-gal-5-22',
    category: 'verse_memory',
    categoryLabel: 'Hafalan Ayat',
    question: 'Manakah di bawah ini yang merupakan 3 urutan pertama dari Buah Roh dalam Galatia 5:22-23?',
    contextOrClue: 'Galatia 5:22 — Buah Roh Kudus',
    options: [
      { id: 'A', text: 'Keberanian, kekayaan, dan kehormatan' },
      { id: 'B', text: 'Kasih, sukacita, dan damai sejahtera' },
      { id: 'C', text: 'Kesabaran, kemurahan, dan kecerdasan' },
      { id: 'D', text: 'Iman, pengetahuan, dan kekuatan' },
    ],
    correctOptionId: 'B',
    explanation: 'Galatia 5:22-23 mencatat 9 Buah Roh: "Tetapi buah Roh ialah: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan, kelemahlembutan, penguasaan diri."',
    relatedVerse: {
      bookId: 'gal',
      bookName: 'Galatia',
      chapter: 5,
      verse: 22,
      verseText: 'Tetapi buah Roh ialah: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan, kelemahlembutan, penguasaan diri.',
    },
    difficulty: 'sedang',
  },
  {
    id: 'mem-1kor-13-13',
    category: 'verse_memory',
    categoryLabel: 'Hafalan Ayat',
    question: '1 Korintus 13:13 menyebutkan 3 hal yang tinggal: iman, pengharapan, dan kasih. Yang paling besar di antaranya adalah...',
    contextOrClue: '1 Korintus 13 — Pasal Kasih',
    options: [
      { id: 'A', text: 'Iman' },
      { id: 'B', text: 'Pengharapan' },
      { id: 'C', text: 'Kasih' },
      { id: 'D', text: 'Pengetahuan' },
    ],
    correctOptionId: 'C',
    explanation: '1 Korintus 13:13: "Demikianlah tinggal ketiga hal ini, yaitu iman, pengharapan dan kasih, dan yang paling besar di antaranya ialah kasih."',
    relatedVerse: {
      bookId: '1kor',
      bookName: '1 Korintus',
      chapter: 13,
      verse: 13,
      verseText: 'Demikianlah tinggal ketiga hal ini, yaitu iman, pengharapan dan kasih, dan yang paling besar di antaranya ialah kasih.',
    },
    difficulty: 'mudah',
  },

  // 4. Kuis Tokoh & Sejarah Alkitab
  {
    id: 'char-daud-goliat',
    category: 'bible_characters',
    categoryLabel: 'Tokoh Alkitab',
    question: 'Apakah senjata sederhana yang dipakai Daud saat mengalahkan raksasa Goliat?',
    contextOrClue: '1 Samuel 17 — Iman Daud melawan Goliat',
    options: [
      { id: 'A', text: 'Baju zirah tembaga dan pedang Raja Saul' },
      { id: 'B', text: 'Busur dan anak panah beracun' },
      { id: 'C', text: 'Ali-ali (umban) dan lima batu licin dari sungai' },
      { id: 'D', text: 'Tombak besi yang sangat berat' },
    ],
    correctOptionId: 'C',
    explanation: 'Daud mengambil tongkatnya, memilih lima batu licin dari dasar sungai, dan dengan ali-ali di tangannya ia maju menghampiri Goliat dalam nama TUHAN semesta alam (1 Samuel 17:40, 45).',
    relatedVerse: {
      bookId: '1sam',
      bookName: '1 Samuel',
      chapter: 17,
      verse: 45,
      verseText: 'Tetapi Daud berkata kepada orang Filistin itu: "Engkau mendatangi aku dengan pedang dan tombak dan lembing, tetapi aku mendatangi engkau dengan nama TUHAN semesta alam, Allah segala bala tentara Israel yang kautantang itu."',
    },
    difficulty: 'mudah',
  },
  {
    id: 'char-musa-laut-teberau',
    category: 'bible_characters',
    categoryLabel: 'Tokoh Alkitab',
    question: 'Atas perintah TUHAN, benda apakah yang diulurkan Musa ke atas laut sehingga Laut Teberau terbelah?',
    contextOrClue: 'Keluaran 14 — Perjalanan keluar dari Mesir',
    options: [
      { id: 'A', text: 'Pedang perunggu' },
      { id: 'B', text: 'Tongkatnya' },
      { id: 'C', text: 'Tabut Perjanjian' },
      { id: 'D', text: 'Jubah kebesarannya' },
    ],
    correctOptionId: 'B',
    explanation: 'Keluaran 14:16, 21: "Dan engkau, angkatlah tongkatmu dan ulurkanlah tanganmu ke atas laut dan belahlah airnya... Lalu Musa mengulurkan tangannya ke atas laut, dan semalam-malaman itu TUHAN menguakkan air laut dengan angin timur yang keras."',
    relatedVerse: {
      bookId: 'kel',
      bookName: 'Keluaran',
      chapter: 14,
      verse: 21,
      verseText: 'Lalu Musa mengulurkan tangannya ke atas laut, dan semalam-malaman itu TUHAN menguakkan air laut dengan perantaraan angin timur yang keras, membuat laut itu menjadi tanah kering; maka terbelahlah air itu.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'char-petrus-berjalan-air',
    category: 'bible_characters',
    categoryLabel: 'Tokoh Alkitab',
    question: 'Mengapa Petrus mulai tenggelam ketika ia berjalan di atas air mendekati Yesus?',
    contextOrClue: 'Matius 14:28-31 — Petrus berjalan di atas air',
    options: [
      { id: 'A', text: 'Karena perahu murid-murid terbalik' },
      { id: 'B', text: 'Karena ketika merasakan tiupan angin, ia menjadi takut dan kurang percaya' },
      { id: 'C', text: 'Karena Yesus menyuruhnya untuk kembali ke perahu' },
      { id: 'D', text: 'Karena kakinya kram terkena dinginnya air danau' },
    ],
    correctOptionId: 'B',
    explanation: 'Matius 14:30-31 mencatat bahwa saat Petrus memandang tiupan angin, ia menjadi takut dan mulai tenggelam. Yesus segera mengulurkan tangan-Nya dan berkata: "Hai orang yang kurang percaya, mengapa engkau bimbang?"',
    relatedVerse: {
      bookId: 'mat',
      bookName: 'Matius',
      chapter: 14,
      verse: 30,
      verseText: 'Tetapi ketika dirasanya tiupan angin, takutlah ia dan mulai tenggelam lalu berteriak: "Tuhan, tolonglah aku!"',
    },
    difficulty: 'sedang',
  },

  // 5. Kuis Mukjizat Yesus
  {
    id: 'mir-kana-air-anggur',
    category: 'jesus_miracles',
    categoryLabel: 'Mukjizat Yesus',
    question: 'Di kota manakah Yesus melakukan mukjizat pertama-Nya dengan mengubah air menjadi anggur pada suatu pesta perkawinan?',
    contextOrClue: 'Yohanes 2:1-11 — Mukjizat permulaan Yesus',
    options: [
      { id: 'A', text: 'Betlehem di tanah Yudea' },
      { id: 'B', text: 'Kana di Galilea' },
      { id: 'C', text: 'Yerusalem di dekat kolam Betesda' },
      { id: 'D', text: 'Kapernaum di pinggir danau' },
    ],
    correctOptionId: 'B',
    explanation: 'Yohanes 2:11 menyatakan: "Hal itu dibuat Yesus di Kana yang di Galilea, sebagai yang pertama dari tanda-tanda-Nya dan dengan itu Ia telah menyatakan kemuliaan-Nya, dan murid-murid-Nya percaya kepada-Nya."',
    relatedVerse: {
      bookId: 'yoh',
      bookName: 'Yohanes',
      chapter: 2,
      verse: 11,
      verseText: 'Hal itu dibuat Yesus di Kana yang di Galilea, sebagai yang pertama dari tanda-tanda-Nya dan dengan itu Ia telah menyatakan kemuliaan-Nya, dan murid-murid-Nya percaya kepada-Nya.',
    },
    difficulty: 'mudah',
  },
  {
    id: 'mir-5-roti-2-ikan',
    category: 'jesus_miracles',
    categoryLabel: 'Mukjizat Yesus',
    question: 'Saat Yesus memberi makan 5.000 orang laki-laki, berapa bakul potongan roti dan ikan yang tersisa setelah semua orang kenyang?',
    contextOrClue: 'Yohanes 6:1-13 — Mukjizat memberi makan orang banyak',
    options: [
      { id: 'A', text: '7 bakul' },
      { id: 'B', text: '12 bakul' },
      { id: 'C', text: '3 bakul' },
      { id: 'D', text: 'Tidak ada sisa sama sekali' },
    ],
    correctOptionId: 'B',
    explanation: 'Yohanes 6:13: "Maka mereka pun mengumpulkannya, dan mengisi dua belas bakul penuh dengan potongan-potongan dari kelima roti jelai yang lebih setelah orang makan."',
    relatedVerse: {
      bookId: 'yoh',
      bookName: 'Yohanes',
      chapter: 6,
      verse: 13,
      verseText: 'Maka mereka pun mengumpulkannya, dan mengisi dua belas bakul penuh dengan potongan-potongan dari kelima roti jelai yang lebih setelah orang makan.',
    },
    difficulty: 'sedang',
  },
  {
    id: 'mir-kebangkitan-lasarus',
    category: 'jesus_miracles',
    categoryLabel: 'Mukjizat Yesus',
    question: 'Berapa harikah Lasarus sudah terbaring di dalam kubur sebelum dibangkitkan oleh Yesus di Betania?',
    contextOrClue: 'Yohanes 11:1-44 — Kebangkitan Lasarus saudara Marta dan Maria',
    options: [
      { id: 'A', text: '1 hari' },
      { id: 'B', text: '2 hari' },
      { id: 'C', text: '4 hari' },
      { id: 'D', text: '7 hari' },
    ],
    correctOptionId: 'C',
    explanation: 'Yohanes 11:17 mencatat: "Maka ketika Yesus tiba, didapati-Nya Lasarus telah empat hari berbaring di dalam kubur." Yesus kemudian memanggilnya keluar dan membangkitkannya.',
    relatedVerse: {
      bookId: 'yoh',
      bookName: 'Yohanes',
      chapter: 11,
      verse: 17,
      verseText: 'Maka ketika Yesus tiba, didapati-Nya Lasarus telah empat hari berbaring di dalam kubur.',
    },
    difficulty: 'sedang',
  }
];

// Helper Functions
export const QuizService = {
  // Ambil pertanyaan berdasarkan kategori atau filter bacaan
  getQuestionsByCategory(category: QuizCategory, currentBookId?: string, count: number = 5): QuizQuestion[] {
    let pool: QuizQuestion[] = [];

    if (category === 'recent_reading' && currentBookId) {
      // Prioritaskan soal yang cocok dengan kitab saat ini
      const matching = BIBLE_QUIZ_BANK.filter(q => q.relatedVerse.bookId === currentBookId);
      if (matching.length > 0) {
        pool = [...matching];
      }
      // Tambahkan sisa soal bacaan lain jika kurang
      const others = BIBLE_QUIZ_BANK.filter(q => q.category === 'recent_reading' && q.relatedVerse.bookId !== currentBookId);
      pool = [...pool, ...others];
    } else if (category === 'quick_mix') {
      pool = [...BIBLE_QUIZ_BANK];
    } else {
      pool = BIBLE_QUIZ_BANK.filter(q => q.category === category);
    }

    if (pool.length === 0) {
      pool = [...BIBLE_QUIZ_BANK];
    }

    // Acak urutan pertanyaan
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },

  // Hitung Badge Title berdasarkan skor
  getBadgeTitle(score: number): { title: string; emoji: string; message: string } {
    if (score === 100) {
      return {
        title: 'Ahli Firman & Scribe Teladan',
        emoji: '🏆',
        message: 'Luar biasa sempurna! Pengetahuan Alkitab Anda sangat mendalam dan kokoh di dalam kebenaran firman.',
      };
    } else if (score >= 80) {
      return {
        title: 'Prajurit Iman yang Tangguh',
        emoji: '🌟',
        message: 'Hebat sekali! Anda mengingat dan memahami sebagian besar firman Tuhan dengan sangat baik.',
      };
    } else if (score >= 60) {
      return {
        title: 'Murid yang Tekun Belajar',
        emoji: '📖',
        message: 'Bagus! Teruslah membaca dan merenungkan firman-Nya setiap hari agar semakin bertumbuh dalam hikmat.',
      };
    } else {
      return {
        title: 'Pencari Kebenaran Firman',
        emoji: '🕊️',
        message: 'Awal yang baik! Jadikan setiap ayat firman sebagai pelita bagi langkah hidup Anda. Coba lagi untuk mengasah ingatan!',
      };
    }
  },

  // Simpan Hasil Kuis ke Local Storage
  saveQuizResult(result: QuizSessionSummary): void {
    try {
      const existingStr = localStorage.getItem('alkitab_quiz_history_v1');
      const history: QuizSessionSummary[] = existingStr ? JSON.parse(existingStr) : [];
      history.unshift(result);
      // Simpan maksimal 30 riwayat kuis
      localStorage.setItem('alkitab_quiz_history_v1', JSON.stringify(history.slice(0, 30)));

      // Update akumulasi stats
      const stats = QuizService.getUserStats();
      stats.totalQuizzesTaken += 1;
      stats.totalQuestionsAnswered += result.totalQuestions;
      stats.totalCorrectAnswers += result.correctCount;
      if (result.score > stats.highestScore) {
        stats.highestScore = result.score;
      }
      stats.lastQuizDate = result.date;
      stats.currentStreak += 1;

      localStorage.setItem('alkitab_quiz_stats_v1', JSON.stringify(stats));
    } catch (e) {
      console.warn('Gagal menyimpan hasil kuis:', e);
    }
  },

  // Ambil Statistik Kuis Pengguna
  getUserStats(): UserQuizStats {
    try {
      const statsStr = localStorage.getItem('alkitab_quiz_stats_v1');
      if (statsStr) {
        return JSON.parse(statsStr);
      }
    } catch {}

    return {
      totalQuizzesTaken: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      highestScore: 0,
      currentStreak: 0,
    };
  },

  // Ambil Riwayat Kuis Terakhir
  getQuizHistory(): QuizSessionSummary[] {
    try {
      const historyStr = localStorage.getItem('alkitab_quiz_history_v1');
      if (historyStr) {
        return JSON.parse(historyStr);
      }
    } catch {}
    return [];
  }
};
