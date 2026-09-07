import { DailyDevotional } from '../types';

export const DAILY_DEVOTIONALS: DailyDevotional[] = [
  {
    date: '2026-08-20',
    verse: {
      id: 'yer-29-11',
      bookId: 'yer',
      bookName: 'Yeremia',
      chapter: 29,
      verse: 11,
      text: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.'
    },
    themeTitle: 'Masa Depan Penuh Harapan',
    reflection: 'Terkadang kita merasa cemas akan hari esok. Namun firman Tuhan mengingatkan kita bahwa Allah telah merancangkan hal yang terbaik, penuh damai sejahtera dan masa depan yang cerah.',
    prayer: 'Tuhan, kuatkanlah imanku hari ini. Bimbing setiap langkahku agar selalu berjalan dalam rancangan damai sejahtera-Mu. Amin.'
  },
  {
    date: '2026-08-21',
    verse: {
      id: 'mzm-23-1',
      bookId: 'mzm',
      bookName: 'Mazmur',
      chapter: 23,
      verse: 1,
      text: 'TUHAN adalah gembalaku, takkan kekurangan aku.'
    },
    themeTitle: 'Sang Gembala Yang Baik',
    reflection: 'Ketika kita menyerahkan hidup kita di bawah pemeliharaan Tuhan, kita tidak akan pernah kekurangan kasih karunia, perlindungan, dan kekuatan-Nya.',
    prayer: 'Ya Gembala yang Baik, tuntunlah hidupku ke air yang tenang dan pulihkan jiwaku di saat aku lelah. Amin.'
  },
  {
    date: '2026-08-22',
    verse: {
      id: 'flp-4-6',
      bookId: 'flp',
      bookName: 'Filipi',
      chapter: 4,
      verse: 6,
      text: 'Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.'
    },
    themeTitle: 'Mengubah Kekuatiran Menjadi Doa',
    reflection: 'Kekuatiran tidak dapat mengubah apa pun, namun doa dengan ucapan syukur sanggup mendatangkan damai sejahtera Allah yang melampaui segala akal.',
    prayer: 'Bapa di Surga, kuserahkan segala bebanku kepada-Mu. Penuhilah hatiku dengan ucapan syukur dan damai sejahtera. Amin.'
  },
  {
    date: '2026-08-23',
    verse: {
      id: 'ams-3-5',
      bookId: 'ams',
      bookName: 'Amsal',
      chapter: 3,
      verse: 5,
      text: 'Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.'
    },
    themeTitle: 'Berserah Penuh Kepada Tuhan',
    reflection: 'Akal budi manusia terbatas, tetapi hikmat Tuhan tak terbatas. Belajarlah untuk mempercayai tuntunan Tuhan dalam setiap keputusan hidup.',
    prayer: 'Tuhan, ajarilah aku untuk selalu rendah hati dan mempercayakan segala rencana hidupku ke dalam tangan kasih-Mu. Amin.'
  },
  {
    date: '2026-08-24',
    verse: {
      id: 'yoh-3-16',
      bookId: 'yoh',
      bookName: 'Yohanes',
      chapter: 3,
      verse: 16,
      text: 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.'
    },
    themeTitle: 'Kasih Yang Sempurna',
    reflection: 'Kasih Allah tidak bersyarat. Ia memberikan yang terbaik bagi kita agar kita beroleh hidup yang kekal dan penuh sukacita.',
    prayer: 'Terima kasih atas kasih-Mu yang begitu agung bagiku. Ajarilah aku untuk membagikan kasih ini kepada sesama di sekitarku. Amin.'
  },
  {
    date: '2026-08-25',
    verse: {
      id: 'yes-40-31',
      bookId: 'yes',
      bookName: 'Yesaya',
      chapter: 40,
      verse: 31,
      text: 'Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.'
    },
    themeTitle: 'Kekuatan Baru Bagi Yang Berharap',
    reflection: 'Di saat kita merasa lelah dan hampir menyerah, datanglah kepada Tuhan. Mereka yang menanti-nantikan Tuhan akan senantiasa diperbaharui kekuatannya.',
    prayer: 'Ya Tuhan, curahkanlah kekuatan dan semangat baru dalam hidupku. Biarlah sayap imanku terbang tinggi mengatasi segala badai. Amin.'
  }
];

export function getTodayDevotional(): DailyDevotional {
  const today = new Date().toISOString().slice(0, 10);
  const found = DAILY_DEVOTIONALS.find(d => d.date === today);
  if (found) return found;
  
  // Fallback cyclic selection
  const dayIndex = new Date().getDate() % DAILY_DEVOTIONALS.length;
  return DAILY_DEVOTIONALS[dayIndex];
}
