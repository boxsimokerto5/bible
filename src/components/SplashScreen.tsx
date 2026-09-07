import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BookOpen, Heart, ArrowRight } from 'lucide-react';
import { CrossLogo } from './CrossLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

interface StoryScene {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  verseQuote: string;
  reference: string;
  icon: string;
  accentBg: string;
  borderAccent: string;
  badgeColor: string;
}

const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    badge: 'Kelahiran Sang Juru Selamat',
    title: 'Terang Telah Datang',
    subtitle: 'Lahir di Betlehem membawa damai, pengharapan, dan kasih kekal bagi seluruh umat manusia.',
    verseQuote: 'Hari ini telah lahir bagimu Juruselamat, yaitu Kristus, Tuhan, di kota Daud.',
    reference: 'Lukas 2:11',
    icon: '⭐',
    accentBg: 'bg-amber-100/70',
    borderAccent: 'border-amber-400/40',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 2,
    badge: 'Pelayanan & Kasih Kristus',
    title: 'Mukjizat, Kasih & Kebenaran',
    subtitle: 'Menyembuhkan yang terluka, memberi makan yang lapar, dan mengajarkan kasih tanpa syarat.',
    verseQuote: 'Akulah jalan dan kebenaran dan hidup. Tidak ada seorangpun yang datang kepada Bapa, kalau tidak melalui Aku.',
    reference: 'Yohanes 14:6',
    icon: '🕊️',
    accentBg: 'bg-sky-100/70',
    borderAccent: 'border-sky-400/40',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
  },
  {
    id: 3,
    badge: 'Pengorbanan & Penebusan',
    title: 'Kasih Terbesar di Kayu Salib',
    subtitle: 'Menyerahkan nyawa-Nya untuk menebus dosa kita, membuktikan kasih Allah yang tak terbatas.',
    verseQuote: 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal.',
    reference: 'Yohanes 3:16',
    icon: '✝️',
    accentBg: 'bg-rose-100/70',
    borderAccent: 'border-rose-400/40',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
  },
  {
    id: 4,
    badge: 'Kebangkitan & Kemenangan',
    title: 'Ia Hidup! Kemenangan Kekal',
    subtitle: 'Kubur kosong membuktikan kuasa-Nya atas maut. Kristus menyertai kita sampai akhir zaman.',
    verseQuote: 'Ia tidak ada di sini, sebab Ia telah bangkit, sama seperti yang telah dikatakan-Nya.',
    reference: 'Matius 28:6',
    icon: '👑',
    accentBg: 'bg-amber-100/80',
    borderAccent: 'border-amber-400/50',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-400',
  },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto advance scenes
    const sceneInterval = setInterval(() => {
      setCurrentSceneIndex((prev) => {
        if (prev < STORY_SCENES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(sceneInterval);
          return prev;
        }
      });
    }, 2800);

    // Complete splash sequence automatically after full story animation
    const completeTimer = setTimeout(() => {
      handleComplete();
    }, 11500);

    return () => {
      clearInterval(sceneInterval);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onFinish();
    }, 600);
  };

  const scene = STORY_SCENES[currentSceneIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#f7f2e4] text-[#2c180e] overflow-hidden select-none font-sans-ui"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.7) 0%, rgba(247, 242, 228, 0.5) 60%, rgba(230, 218, 195, 0.8) 100%),
          radial-gradient(circle at 15% 15%, rgba(180, 83, 9, 0.05) 0%, transparent 40%),
          radial-gradient(circle at 85% 85%, rgba(120, 53, 15, 0.05) 0%, transparent 40%)
        `,
      }}
    >
      {/* Subtle Starry / Light Warm Particle Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      {/* Top Bar with App Logo and Skip Button */}
      <div className="relative z-10 px-6 pt-8 sm:pt-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-0.5 rounded-2xl bg-amber-800/5 border border-amber-800/15 shadow-xs">
            <CrossLogo className="w-10 h-10" variant="badge" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wider uppercase text-[#78350f] font-cinzel">
              Alkitab Digital
            </h1>
            <p className="text-[10px] text-[#8c6b4a] tracking-widest uppercase font-semibold">
              Kisah Kasih Kristus
            </p>
          </div>
        </div>

        <button
          id="skip-splash-btn"
          onClick={handleComplete}
          className="px-4 py-2 rounded-full bg-[#eee4d0] hover:bg-[#e4d4bc] active:scale-95 text-xs font-bold text-[#5c3818] hover:text-[#2c180e] border border-[#dac8b0] shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Masuk Alkitab</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-800" />
        </button>
      </div>

      {/* Main Animated Story Scene Area */}
      <div className="relative z-10 px-6 max-w-lg mx-auto w-full my-auto py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center space-y-4"
          >
            {/* Animated Icon Glow with Vintage Medallion Frame */}
            <div className="relative inline-flex items-center justify-center mb-1">
              <motion.div 
                animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="w-20 h-20 rounded-3xl bg-[#fcfaf5] border-2 border-[#d9c7af] flex items-center justify-center text-4xl shadow-xl shadow-amber-950/10"
              >
                {scene.icon}
              </motion.div>
              <div className="absolute -inset-2 rounded-3xl bg-amber-500/15 blur-xl -z-10 animate-pulse" />
            </div>

            {/* Badge */}
            <div>
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-widest uppercase shadow-xs ${scene.badgeColor}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{scene.badge}</span>
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2c180e] font-cinzel">
                {scene.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#614227] leading-relaxed max-w-md mx-auto">
                {scene.subtitle}
              </p>
            </div>

            {/* Holy Verse Card in Vintage Parchment Style */}
            <div className="mt-4 p-4 rounded-2xl bg-[#fdfbf7] border border-[#dccbb4] shadow-lg shadow-amber-950/5 text-left relative overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 absolute top-0 left-0" />
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 mb-1 pt-0.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{scene.reference} (TB)</span>
              </div>
              <p className="font-serif-bible text-xs sm:text-sm text-[#382113] italic leading-relaxed">
                "{scene.verseQuote}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Timeline Steps & Navigation Button */}
      <div className="relative z-10 px-6 pb-8 sm:pb-10 max-w-lg mx-auto w-full space-y-4">
        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center gap-2">
          {STORY_SCENES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSceneIndex(idx)}
              className="group py-2 focus:outline-none cursor-pointer"
              title={s.badge}
            >
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentSceneIndex
                    ? 'w-9 bg-amber-700 shadow-md shadow-amber-800/30'
                    : idx < currentSceneIndex
                    ? 'w-3.5 bg-amber-600/50'
                    : 'w-2 bg-[#d6c4a8] hover:bg-[#c4b092]'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Primary Action Button */}
        <div className="flex justify-center">
          <button
            id="start-reading-splash-btn"
            onClick={handleComplete}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 active:scale-95 text-amber-50 font-extrabold text-sm shadow-xl shadow-amber-950/20 border border-amber-600/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-amber-200 text-amber-200" />
            <span>Mulai Membaca Firman Tuhan</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
