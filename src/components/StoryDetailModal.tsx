import React, { useState } from 'react';
import { X, Volume2, Share2, Check, BookOpen, Heart, Sparkles, Clock, Bookmark, ArrowLeft } from 'lucide-react';
import { SpiritualStory } from '../types';

interface StoryDetailModalProps {
  story: SpiritualStory | null;
  isOpen: boolean;
  onClose: () => void;
  onStartAudio: (text: string, title: string) => void;
  onNavigateToScripture?: (ref: string) => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  isOpen,
  onClose,
  onStartAudio,
  onNavigateToScripture,
}) => {
  const [copied, setCopied] = useState(false);
  const [isAmened, setIsAmened] = useState(false);
  const [amenCount, setAmenCount] = useState(128);

  if (!isOpen || !story) return null;

  const handleShare = async () => {
    const textToShare = `📖 *${story.title}*\n${story.subtitle}\n\n"${story.scriptureText}" (${story.scriptureReference})\n\n💡 *Hikmah Rohani:* ${story.moralLesson}\n\n✝️ *Doa:* ${story.prayer}\n\n— Dibagikan melalui Alkitab Digital`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: textToShare,
        });
      } catch {
        // fallback
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleToggleAmen = () => {
    if (!isAmened) {
      setAmenCount(prev => prev + 1);
      setIsAmened(true);
    } else {
      setAmenCount(prev => prev - 1);
      setIsAmened(false);
    }
  };

  const handlePlayFullAudio = () => {
    const fullNarrationText = `${story.title}. ${story.subtitle}. Ayat Alkitab: ${story.scriptureText} dari ${story.scriptureReference}. Kisah: ${story.storyContent.join(' ')}. Hikmah Rohani: ${story.moralLesson}. Doa: ${story.prayer}`;
    onStartAudio(fullNarrationText, story.title);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-2xl bg-white dark:bg-neutral-900 sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-full sm:h-auto sm:max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-md shrink-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-2.5 py-1 rounded-xl hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePlayFullAudio}
              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 transition-all flex items-center gap-1.5 text-xs font-bold"
              title="Dengarkan pembacaan kisah ini"
            >
              <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden xs:inline">Dengarkan</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-all flex items-center gap-1 text-xs font-bold"
              title="Bagikan kisah ini"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden xs:inline">{copied ? 'Tersalin' : 'Bagikan'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5 select-text">
          {/* Category Badge & Reading Time */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wider uppercase border border-amber-500/20">
              <span>{story.coverEmoji}</span>
              <span>{story.categoryLabel}</span>
            </span>

            <div className="flex items-center gap-1 text-xs text-neutral-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{story.readingTime}</span>
              <span>•</span>
              <span className="italic">{story.authorOrSource}</span>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-snug font-serif-bible">
              {story.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic border-l-2 border-amber-500 pl-3">
              {story.subtitle}
            </p>
          </div>

          {/* Anchor Scripture Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 text-neutral-800 dark:text-neutral-200 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Nats Alkitab: {story.scriptureReference}</span>
              </div>
            </div>
            <p className="font-serif-bible text-sm sm:text-base italic leading-relaxed text-neutral-900 dark:text-neutral-100">
              "{story.scriptureText}"
            </p>
          </div>

          {/* Story Narrative Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans-ui pt-1">
            {story.storyContent.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Moral Lesson / Spiritual Wisdom Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-2 text-emerald-900 dark:text-emerald-200">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Pelajaran & Hikmah Rohani:</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {story.moralLesson}
            </p>
          </div>

          {/* Prayer Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 space-y-2 text-amber-950 dark:text-amber-200">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Doa Refleksi Pribadi:</span>
            </div>
            <p className="font-serif-bible text-xs sm:text-sm italic leading-relaxed">
              "{story.prayer}"
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 px-5 sm:px-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between shrink-0">
          <button
            onClick={handleToggleAmen}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
              isAmened
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isAmened ? 'fill-white' : ''}`} />
            <span>{isAmened ? 'Terberkati! (Amin)' : 'Katakan Amin'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/15 text-[10px]">
              {amenCount}
            </span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
