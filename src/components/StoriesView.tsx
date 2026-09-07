import React, { useState } from 'react';
import { Sparkles, Heart, Search, Volume2, BookOpen, Clock, Plus, ArrowRight, Share2, Filter, Star, Globe, User, ThumbsUp, MessageSquare } from 'lucide-react';
import { SpiritualStory, UserPersonalTestimony, StoryCategory, UserProfile } from '../types';
import { SPIRITUAL_STORIES } from '../data/storiesData';
import { AuthService } from '../data/authService';

interface StoriesViewProps {
  userTestimonies: UserPersonalTestimony[];
  onOpenStoryDetail: (story: SpiritualStory) => void;
  onOpenWriteTestimony: () => void;
  onEditTestimony: (testimony: UserPersonalTestimony) => void;
  onStartAudioForStory: (text: string, title: string) => void;
  currentUser?: UserProfile | null;
  theme?: string;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  userTestimonies,
  onOpenStoryDetail,
  onOpenWriteTestimony,
  onEditTestimony,
  onStartAudioForStory,
  currentUser,
  theme,
}) => {
  const isVintage = theme === 'vintage';
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'community' | 'hikmah' | 'kesaksian' | 'personal'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [communityList, setCommunityList] = useState<UserPersonalTestimony[]>(() => {
    return AuthService.getCommunityTestimonies();
  });
  const [amenedIds, setAmenedIds] = useState<Record<string, boolean>>({});

  const handleAmen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (amenedIds[id]) return;
    const newCount = AuthService.toggleAmenCommunityTestimony(id);
    setCommunityList(prev =>
      prev.map(item => (item.id === id ? { ...item, amenCount: newCount } : item))
    );
    setAmenedIds(prev => ({ ...prev, [id]: true }));
  };

  const handleShareWhatsApp = (testimony: UserPersonalTestimony, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `🕊️ *Kesaksian Berkat: ${testimony.title}*\n\n"${testimony.story}"\n\n📖 Ayat: ${testimony.bibleVerse || 'Matius 6:33'}\nPenulis: ${testimony.authorName}\n\nDibagikan melalui Alkitab Digital`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'ALL', label: 'Semua Kisah', icon: '✨' },
    { id: 'kesaksian', label: 'Kesaksian Nyata', icon: '🕊️' },
    { id: 'hikmah', label: 'Hikmah & Teladan', icon: '🏺' },
    { id: 'mukjizat', label: 'Mukjizat Doa', icon: '🍞' },
    { id: 'pengampunan', label: 'Pengampunan', icon: '🌉' },
    { id: 'keluarga', label: 'Kasih Sesama', icon: '☕' },
    { id: 'iman', label: 'Keteguhan Iman', icon: '🌟' },
  ];

  // Filter curated stories
  const filteredStories = SPIRITUAL_STORIES.filter(story => {
    if (activeSubTab === 'hikmah' && story.category !== 'hikmah' && story.category !== 'pengampunan' && story.category !== 'keluarga') {
      return false;
    }
    if (activeSubTab === 'kesaksian' && story.category !== 'kesaksian' && story.category !== 'mukjizat' && story.category !== 'iman') {
      return false;
    }
    if (selectedCategory !== 'ALL' && story.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(q);
      const matchSubtitle = story.subtitle.toLowerCase().includes(q);
      const matchContent = story.storyContent.some(p => p.toLowerCase().includes(q));
      const matchVerse = story.scriptureReference.toLowerCase().includes(q) || story.scriptureText.toLowerCase().includes(q);
      return matchTitle || matchSubtitle || matchContent || matchVerse;
    }
    return true;
  });

  // Filter user personal testimonies
  const filteredPersonal = userTestimonies.filter(test => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return test.title.toLowerCase().includes(q) || test.story.toLowerCase().includes(q) || test.category.toLowerCase().includes(q);
    }
    return true;
  });

  // Filter community testimonies
  const filteredCommunity = communityList.filter(test => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return test.title.toLowerCase().includes(q) || test.story.toLowerCase().includes(q) || test.category.toLowerCase().includes(q) || test.authorName.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 space-y-3.5 pb-24 font-sans-ui">
      {/* Header Banner - Spiritual Love & Grace Vibes */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isVintage
          ? 'bg-[#ebdcc2]/60 border-[#c9b28b] shadow-2xs'
          : 'bg-gradient-to-br from-amber-500/15 via-rose-500/5 to-transparent dark:from-amber-950/20 dark:via-neutral-900 border-amber-500/20 dark:border-amber-500/10 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                🕊️
              </span>
              <h2 className={`text-base sm:text-xl font-extrabold tracking-tight truncate ${
                isVintage ? 'font-cinzel text-[#2c1a0e]' : 'text-neutral-900 dark:text-neutral-50'
              }`}>
                Kisah Hikmah & Kesaksian Iman
              </h2>
            </div>
            <p className={`text-[11px] sm:text-xs mt-1 leading-relaxed ${
              isVintage ? 'text-[#7a5b3a] font-garamond italic' : 'text-neutral-600 dark:text-neutral-400'
            }`}>
              Kumpulan cerita inspiratif, teladan kasih Kristus, mukjizat doa, dan kesaksian jemaat yang meneguhkan iman.
            </p>
          </div>

          <button
            id="write-personal-testimony-btn"
            onClick={onOpenWriteTestimony}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Kesaksian</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-between gap-1.5 border-b border-neutral-200 dark:border-neutral-800 pb-1.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
            }`}
          >
            Semua Kisah ({SPIRITUAL_STORIES.length})
          </button>

          <button
            onClick={() => setActiveSubTab('community')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeSubTab === 'community'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Komunitas Jemaat ({communityList.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('kesaksian')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'kesaksian'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
            }`}
          >
            🕊️ Tokoh Iman
          </button>

          <button
            onClick={() => setActiveSubTab('hikmah')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'hikmah'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
            }`}
          >
            🏺 Hikmah
          </button>

          <button
            onClick={() => setActiveSubTab('personal')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeSubTab === 'personal'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Kesaksian Saya ({userTestimonies.length})</span>
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Cari tema, judul, atau kata kunci kesaksian..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9.5 pr-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1.5 focus:ring-amber-500 shadow-2xs"
        />
      </div>

      {/* Category Filter Chips if on curated tabs */}
      {(activeSubTab === 'all' || activeSubTab === 'kesaksian' || activeSubTab === 'hikmah') && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-neutral-400 shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-600" />
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* CONTENT LIST */}
      {activeSubTab === 'community' ? (
        /* Community Shared Testimonies Tab */
        <div className="space-y-3 pt-1">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Kesaksian nyata yang dibagikan oleh jemaat untuk saling menguatkan.</span>
            </div>
            <button
              onClick={onOpenWriteTestimony}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shrink-0 shadow-2xs"
            >
              + Bagikan Kisahmu
            </button>
          </div>

          {filteredCommunity.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 text-neutral-500 text-xs">
              Belum ada kesaksian yang sesuai pencarian.
            </div>
          ) : (
            filteredCommunity.map((test) => (
              <div
                key={test.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs hover:border-amber-500/40 transition-all space-y-3"
              >
                {/* Author info & date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold">
                      {test.authorAvatar || '🕊️'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                        <span>{test.authorName}</span>
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px] font-semibold">
                          Jemaat
                        </span>
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {test.category} • {test.date}
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-[10px] font-semibold text-neutral-500">
                    Publik
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {test.title}
                </h3>

                {/* Scripture Reference */}
                {test.bibleVerse && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-bold font-serif-bible">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    <span>{test.bibleVerse}</span>
                  </div>
                )}

                {/* Story Content */}
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans-ui whitespace-pre-line">
                  {test.story}
                </p>

                {/* Footer Interaction Bar */}
                <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between">
                  <button
                    onClick={(e) => handleAmen(test.id, e)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      amenedIds[test.id]
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10 hover:text-amber-700'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Katakan Amin ({test.amenCount || 1})</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onStartAudioForStory(
                        `${test.title}. Kesaksian dari ${test.authorName}. ${test.story}`,
                        test.title
                      )}
                      className="p-1.5 px-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold flex items-center gap-1"
                      title="Dengar suara"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                      <span className="hidden sm:inline">Dengar</span>
                    </button>

                    <button
                      onClick={(e) => handleShareWhatsApp(test, e)}
                      className="p-1.5 px-2.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-1"
                      title="Bagikan ke WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Bagikan</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : activeSubTab === 'personal' ? (
        /* Personal Testimonies Tab */
        <div className="space-y-3 pt-1">
          {filteredPersonal.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-xl">
                ✍️
              </div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-200">
                Belum Ada Kesaksian Pribadi
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                Tuliskan berkat, pertolongan Tuhan, mukjizat kesembuhan, atau jawaban doa yang Anda alami untuk menguatkan iman Anda di masa depan.
              </p>
              <button
                onClick={onOpenWriteTestimony}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tulis Kesaksian Sekarang</span>
              </button>
            </div>
          ) : (
            filteredPersonal.map((test) => (
              <div
                key={test.id}
                onClick={() => onEditTestimony(test)}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-2xs hover:border-amber-500/50 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      {test.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      test.isPublic
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-500'
                    }`}>
                      {test.isPublic ? '🌐 Komunitas' : '🔒 Pribadi'}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    {test.date}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 transition-colors">
                  {test.title}
                </h3>

                {test.bibleVerse && (
                  <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold font-serif-bible">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{test.bibleVerse}</span>
                  </div>
                )}

                <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed font-sans-ui">
                  {test.story}
                </p>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Klik untuk membaca / menyunting</span>
                  <span className="text-amber-600 font-bold flex items-center gap-0.5">
                    Buka <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Curated Spiritual Stories List */
        <div className="space-y-3 pt-1">
          {filteredStories.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 text-neutral-500 text-xs">
              Tidak ada kisah yang cocok dengan kata kunci pencarian Anda.
            </div>
          ) : (
            filteredStories.map((story) => (
              <div
                key={story.id}
                className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 shadow-2xs hover:shadow-sm hover:border-amber-500/40 transition-all space-y-2.5 group"
              >
                {/* Top Meta */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{story.coverEmoji}</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                      {story.categoryLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{story.readingTime}</span>
                  </div>
                </div>

                {/* Title and Subtitle */}
                <div 
                  onClick={() => onOpenStoryDetail(story)}
                  className="cursor-pointer space-y-1"
                >
                  <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>

                {/* Mini Scripture Quote */}
                <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/15 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1 text-neutral-700 dark:text-neutral-300">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-bold text-amber-800 dark:text-amber-300 shrink-0">
                      {story.scriptureReference}:
                    </span>
                    <span className="italic truncate">"{story.scriptureText}"</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onStartAudioForStory(
                      `${story.title}. ${story.subtitle}. Kisah: ${story.storyContent.join(' ')}. Hikmah: ${story.moralLesson}`,
                      story.title
                    )}
                    className="p-1.5 px-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700/60 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    title="Dengarkan pembacaan suara"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Dengar</span>
                  </button>

                  <button
                    onClick={() => onOpenStoryDetail(story)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
