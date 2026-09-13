import React, { useState, useEffect, useRef } from 'react';
import { BIBLE_BOOKS } from './data/books';
import { getVersesForChapter } from './data/bibleVerses';
import { BibleService } from './data/bibleService';
import { 
  Book, Verse, Bookmark, Highlight, Note, 
  ReadingSettings, TabType, HighlightColor,
  SpiritualStory, UserPersonalTestimony, UserProfile 
} from './types';

import { AuthService } from './data/authService';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ReaderView } from './components/ReaderView';
import { SearchView } from './components/SearchView';
import { BookmarksView } from './components/BookmarksView';
import { NotesView } from './components/NotesView';
import { DevotionalView } from './components/DevotionalView';
import { StoriesView } from './components/StoriesView';
import { StoryDetailModal } from './components/StoryDetailModal';
import { PersonalTestimonyModal } from './components/PersonalTestimonyModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { BookChapterModal } from './components/BookChapterModal';
import { SettingsModal } from './components/SettingsModal';
import { VerseActionDrawer } from './components/VerseActionDrawer';
import { NoteEditorModal } from './components/NoteEditorModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { SplashScreen } from './components/SplashScreen';
import { PostSplashAuthScreen } from './components/PostSplashAuthScreen';
import { SupabaseModal } from './components/SupabaseModal';
import { isSupabaseConnected } from './lib/supabase';

export default function App() {
  // Splash Screen & Post-Splash Auth Screen States
  const [showSplash, setShowSplash] = useState(true);
  const [showPostSplashAuth, setShowPostSplashAuth] = useState(false);

  // User Account & Profile States
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => AuthService.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Navigation & Content States
  const [activeTab, setActiveTab] = useState<TabType>('read');
  const [currentBookId, setCurrentBookId] = useState<string>('yoh');
  const [currentChapter, setCurrentChapter] = useState<number>(3);
  const [verses, setVerses] = useState<Verse[]>([]);

  // User Data States
  const [settings, setSettings] = useState<ReadingSettings>(() => BibleService.getSettings());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => BibleService.getBookmarks());
  const [highlights, setHighlights] = useState<Highlight[]>(() => BibleService.getHighlights());
  const [notes, setNotes] = useState<Note[]>(() => BibleService.getNotes());
  const [userTestimonies, setUserTestimonies] = useState<UserPersonalTestimony[]>(() => BibleService.getTestimonies());

  // Modal & Drawer States
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);
  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteAttachedVerse, setNoteAttachedVerse] = useState<Verse | null>(null);

  // Stories & Testimonies Modal States
  const [selectedStory, setSelectedStory] = useState<SpiritualStory | null>(null);
  const [isStoryDetailOpen, setIsStoryDetailOpen] = useState(false);
  const [isTestimonyModalOpen, setIsTestimonyModalOpen] = useState(false);
  const [editingTestimony, setEditingTestimony] = useState<UserPersonalTestimony | null>(null);

  // Audio / Speech Synthesis States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [audioVerseIndex, setAudioVerseIndex] = useState(0);
  const [speakingVerseId, setSpeakingVerseId] = useState<string | null>(null);
  const audioQueueRef = useRef<Verse[]>([]);
  const isAudioActiveRef = useRef(false);

  // Background sync with Supabase on startup
  useEffect(() => {
    if (isSupabaseConnected()) {
      const user = AuthService.getCurrentUser();
      const userId = user?.id || 'guest_user';
      BibleService.syncAllWithSupabase(userId)
        .then((res) => {
          if (res.success) {
            refreshAllData();
          }
        })
        .catch(console.error);
    }
  }, []);

  // Initialize and load last read
  useEffect(() => {
    const lastRead = BibleService.getLastRead();
    if (lastRead && lastRead.bookId) {
      setCurrentBookId(lastRead.bookId);
      setCurrentChapter(lastRead.chapter);
    }
  }, []);

  // Update theme class on root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    if (settings.theme === 'dark' || settings.theme === 'oled') {
      root.classList.add('dark');
    }
  }, [settings.theme]);

  // Load verses when book or chapter changes
  useEffect(() => {
    const loadedVerses = getVersesForChapter(currentBookId, currentChapter);
    setVerses(loadedVerses);
    BibleService.saveLastRead(currentBookId, currentChapter);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Stop current audio if playing a different chapter
    if (isAudioActiveRef.current) {
      stopAudio();
    }
  }, [currentBookId, currentChapter]);

  // Get current Book object
  const currentBook = BIBLE_BOOKS.find(b => b.id === currentBookId) || BIBLE_BOOKS[39]; // Default Yohanes

  // Book navigation helpers
  const currentBookIndex = BIBLE_BOOKS.findIndex(b => b.id === currentBookId);
  const hasPrevChapter = currentChapter > 1 || currentBookIndex > 0;
  const hasNextChapter = currentChapter < currentBook.chaptersCount || currentBookIndex < BIBLE_BOOKS.length - 1;

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(prev => prev - 1);
    } else if (currentBookIndex > 0) {
      const prevBook = BIBLE_BOOKS[currentBookIndex - 1];
      setCurrentBookId(prevBook.id);
      setCurrentChapter(prevBook.chaptersCount);
    }
  };

  const handleNextChapter = () => {
    if (currentChapter < currentBook.chaptersCount) {
      setCurrentChapter(prev => prev + 1);
    } else if (currentBookIndex < BIBLE_BOOKS.length - 1) {
      const nextBook = BIBLE_BOOKS[currentBookIndex + 1];
      setCurrentBookId(nextBook.id);
      setCurrentChapter(1);
    }
  };

  // Direct navigation from search, bookmarks, notes, or devotional
  const handleNavigateToVerse = (bookId: string, chapter: number, verseNum?: number) => {
    setCurrentBookId(bookId);
    setCurrentChapter(chapter);
    setActiveTab('read');
    setIsBookModalOpen(false);

    if (verseNum) {
      setTimeout(() => {
        const el = document.getElementById(`verse-${verseNum}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const verseObj = verses.find(v => v.verse === verseNum) || {
            id: `${bookId}-${chapter}-${verseNum}`,
            bookId,
            bookName: currentBook.name,
            chapter,
            verse: verseNum,
            text: '',
          };
          setSelectedVerse(verseObj);
          setIsActionDrawerOpen(true);
        }
      }, 300);
    }
  };

  // Settings update handler
  const handleUpdateSettings = (newPartial: Partial<ReadingSettings>) => {
    const updated = { ...settings, ...newPartial };
    setSettings(updated);
    BibleService.saveSettings(updated);
  };

  const handleUpdateFontSize = (delta: number) => {
    const newSize = Math.min(34, Math.max(14, settings.fontSize + delta));
    handleUpdateSettings({ fontSize: newSize });
  };

  // Verse Action Handlers
  const handleSelectVerse = (verse: Verse) => {
    setSelectedVerse(verse);
    setIsActionDrawerOpen(true);
  };

  const handleToggleBookmark = (verse: Verse) => {
    BibleService.toggleBookmark(verse);
    setBookmarks(BibleService.getBookmarks());
  };

  const handleSetHighlight = (verse: Verse, color: HighlightColor | null) => {
    BibleService.setHighlight(verse, color);
    setHighlights(BibleService.getHighlights());
  };

  // Note Handlers
  const handleOpenNoteEditorForVerse = (verse: Verse) => {
    setEditingNote(null);
    setNoteAttachedVerse(verse);
    setIsNoteEditorOpen(true);
  };

  const handleOpenCreateNote = () => {
    setEditingNote(null);
    setNoteAttachedVerse(verses[0] || null);
    setIsNoteEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNoteAttachedVerse(null);
    setIsNoteEditorOpen(true);
  };

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    BibleService.saveNote(noteData);
    setNotes(BibleService.getNotes());
  };

  const handleDeleteNote = (id: string) => {
    BibleService.deleteNote(id);
    setNotes(BibleService.getNotes());
  };

  // Testimony Handlers
  const handleSaveTestimony = (testimony: UserPersonalTestimony) => {
    BibleService.saveTestimony(testimony);
    if (testimony.isPublic) {
      AuthService.publishCommunityTestimony(testimony);
    } else {
      AuthService.unpublishCommunityTestimony(testimony.id);
    }
    setUserTestimonies(BibleService.getTestimonies());
  };

  const handleDeleteTestimony = (id: string) => {
    BibleService.deleteTestimony(id);
    AuthService.unpublishCommunityTestimony(id);
    setUserTestimonies(BibleService.getTestimonies());
  };

  const handleExportAllData = () => {
    const backupData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      user: currentUser,
      notes: BibleService.getNotes(),
      bookmarks: BibleService.getBookmarks(),
      highlights: BibleService.getHighlights(),
      testimonies: BibleService.getTestimonies(),
      settings: BibleService.getSettings(),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Alkitab_Cadangan_Data_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.notes) localStorage.setItem('alkitab_notes_v1', JSON.stringify(parsed.notes));
        if (parsed.bookmarks) localStorage.setItem('alkitab_bookmarks_v1', JSON.stringify(parsed.bookmarks));
        if (parsed.highlights) localStorage.setItem('alkitab_highlights_v1', JSON.stringify(parsed.highlights));
        if (parsed.testimonies) localStorage.setItem('alkitab_testimonies_v1', JSON.stringify(parsed.testimonies));
        if (parsed.settings) localStorage.setItem('alkitab_settings_v1', JSON.stringify(parsed.settings));
        refreshAllData();
      } catch {
        alert('Gagal memulihkan file cadangan. Pastikan format file benar (.json).');
      }
    };
    reader.readAsText(file);
  };

  const handleOpenStoryDetail = (story: SpiritualStory) => {
    setSelectedStory(story);
    setIsStoryDetailOpen(true);
  };

  const handleOpenWriteTestimony = () => {
    setEditingTestimony(null);
    setIsTestimonyModalOpen(true);
  };

  const handleEditTestimony = (testimony: UserPersonalTestimony) => {
    setEditingTestimony(testimony);
    setIsTestimonyModalOpen(true);
  };

  const refreshAllData = () => {
    setBookmarks(BibleService.getBookmarks());
    setHighlights(BibleService.getHighlights());
    setNotes(BibleService.getNotes());
    setUserTestimonies(BibleService.getTestimonies());
    setSettings(BibleService.getSettings());
    setCurrentUser(AuthService.getCurrentUser());
  };

  // --- AUDIO / TEXT-TO-SPEECH (TTS) SYSTEM ---
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsAudioPaused(false);
    setSpeakingVerseId(null);
    isAudioActiveRef.current = false;
  };

  const speakVerseAtIndex = (index: number, queue: Verse[]) => {
    if (index >= queue.length || !('speechSynthesis' in window)) {
      stopAudio();
      return;
    }

    window.speechSynthesis.cancel();
    const v = queue[index];
    setAudioVerseIndex(index);
    setSpeakingVerseId(v.id);

    const utteranceText = `Ayat ${v.verse}. ${v.text}`;
    const utterance = new SpeechSynthesisUtterance(utteranceText);
    utterance.lang = 'id-ID';
    utterance.rate = settings.audioSpeed || 1.0;

    // Pick Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(voice => voice.lang.includes('id') || voice.lang.includes('ID'));
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    utterance.onend = () => {
      if (isAudioActiveRef.current) {
        if (index + 1 < queue.length) {
          speakVerseAtIndex(index + 1, queue);
        } else {
          stopAudio();
        }
      }
    };

    utterance.onerror = () => {
      stopAudio();
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsAudioPaused(false);
    isAudioActiveRef.current = true;
  };

  const startChapterAudio = (startIndex: number = 0) => {
    if (!verses.length) return;
    audioQueueRef.current = verses;
    speakVerseAtIndex(startIndex, verses);
  };

  const startSingleVerseAudio = (verseText: string, title: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${title}. ${verseText}`);
    utterance.lang = 'id-ID';
    utterance.rate = settings.audioSpeed || 1.0;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const pauseAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPlayingAudio(false);
      setIsAudioPaused(true);
    }
  };

  const resumeAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPlayingAudio(true);
      setIsAudioPaused(false);
    }
  };

  const nextAudioVerse = () => {
    if (audioVerseIndex + 1 < audioQueueRef.current.length) {
      speakVerseAtIndex(audioVerseIndex + 1, audioQueueRef.current);
    }
  };

  const prevAudioVerse = () => {
    if (audioVerseIndex > 0) {
      speakVerseAtIndex(audioVerseIndex - 1, audioQueueRef.current);
    }
  };

  const changeAudioSpeed = (newSpeed: number) => {
    handleUpdateSettings({ audioSpeed: newSpeed });
    if (isPlayingAudio) {
      speakVerseAtIndex(audioVerseIndex, audioQueueRef.current);
    }
  };

  // Helper theme wrapper class
  const getThemeClass = () => {
    switch (settings.theme) {
      case 'vintage': return 'bg-parchment text-[#2c1a0e] min-h-screen';
      case 'sepia': return 'bg-[#fbf7ee] text-[#3d2f1d] min-h-screen';
      case 'dark': return 'bg-slate-900 text-slate-100 min-h-screen';
      case 'oled': return 'bg-black text-neutral-100 min-h-screen';
      default: return 'bg-white text-neutral-900 min-h-screen';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${getThemeClass()}`}>
      {/* Top Header */}
      <Header
        currentBook={currentBook}
        currentChapter={currentChapter}
        onOpenBookPicker={() => setIsBookModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenSearch={() => setActiveTab('search')}
        onStartAudio={() => {
          if (isPlayingAudio) {
            pauseAudio();
          } else if (isAudioPaused) {
            resumeAudio();
          } else {
            startChapterAudio(0);
          }
        }}
        isPlayingAudio={isPlayingAudio}
        activeTab={activeTab}
        theme={settings.theme}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto">
        {activeTab === 'read' && (
          <ReaderView
            currentBook={currentBook}
            currentChapter={currentChapter}
            verses={verses}
            settings={settings}
            bookmarks={bookmarks}
            highlights={highlights}
            notes={notes}
            selectedVerse={selectedVerse}
            speakingVerseId={speakingVerseId}
            onSelectVerse={handleSelectVerse}
            onPrevChapter={handlePrevChapter}
            onNextChapter={handleNextChapter}
            hasPrevChapter={hasPrevChapter}
            hasNextChapter={hasNextChapter}
            onUpdateFontSize={handleUpdateFontSize}
            onOpenBookPicker={() => setIsBookModalOpen(true)}
          />
        )}

        {activeTab === 'search' && (
          <SearchView onNavigateToVerse={handleNavigateToVerse} />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            highlights={highlights}
            onNavigateToVerse={handleNavigateToVerse}
            onDeleteBookmark={(id) => {
              BibleService.deleteBookmark(id);
              setBookmarks(BibleService.getBookmarks());
            }}
            onDeleteHighlight={(bId, ch, v) => {
              BibleService.setHighlight({ id: '', bookId: bId, bookName: '', chapter: ch, verse: v, text: '' }, null);
              setHighlights(BibleService.getHighlights());
            }}
          />
        )}

        {activeTab === 'notes' && (
          <NotesView
            notes={notes}
            onOpenCreateNote={handleOpenCreateNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            onNavigateToVerse={handleNavigateToVerse}
            onRefreshData={refreshAllData}
          />
        )}

        {activeTab === 'devotional' && (
          <DevotionalView
            onNavigateToVerse={handleNavigateToVerse}
            onStartAudioForVerse={startSingleVerseAudio}
            currentBookName={currentBook.name}
            currentBookId={currentBookId}
            currentChapter={currentChapter}
            theme={settings.theme}
          />
        )}

        {activeTab === 'stories' && (
          <StoriesView
            userTestimonies={userTestimonies}
            onOpenStoryDetail={handleOpenStoryDetail}
            onOpenWriteTestimony={handleOpenWriteTestimony}
            onEditTestimony={handleEditTestimony}
            onStartAudioForStory={startSingleVerseAudio}
            currentUser={currentUser}
            theme={settings.theme}
          />
        )}
      </main>

      {/* Audio Player Drawer */}
      <AudioPlayerBar
        isPlaying={isPlayingAudio}
        isPaused={isAudioPaused}
        currentVerse={audioQueueRef.current[audioVerseIndex] || null}
        chapterTitle={`${currentBook.name} ${currentChapter}`}
        speed={settings.audioSpeed || 1.0}
        onPlay={() => startChapterAudio(audioVerseIndex)}
        onPause={pauseAudio}
        onResume={resumeAudio}
        onStop={stopAudio}
        onNext={nextAudioVerse}
        onPrev={prevAudioVerse}
        onChangeSpeed={changeAudioSpeed}
      />

      {/* Bottom Android Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarksCount={bookmarks.length}
        notesCount={notes.length}
        theme={settings.theme}
      />

      {/* Modals and Drawers */}
      <StoryDetailModal
        story={selectedStory}
        isOpen={isStoryDetailOpen}
        onClose={() => {
          setIsStoryDetailOpen(false);
          setSelectedStory(null);
        }}
        onStartAudio={startSingleVerseAudio}
      />

      <PersonalTestimonyModal
        isOpen={isTestimonyModalOpen}
        onClose={() => {
          setIsTestimonyModalOpen(false);
          setEditingTestimony(null);
        }}
        onSave={handleSaveTestimony}
        onDelete={handleDeleteTestimony}
        existingTestimony={editingTestimony}
        currentUser={currentUser}
        onRequireAuth={() => setIsAuthModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          refreshAllData();
        }}
      />

      <UserProfileModal
        user={currentUser}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onUpdateUser={(updated) => {
          setCurrentUser(updated);
        }}
        onLogout={() => {
          AuthService.logout();
          setCurrentUser(null);
          refreshAllData();
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        stats={{
          notesCount: notes.length,
          bookmarksCount: bookmarks.length,
          highlightsCount: highlights.length,
          testimoniesCount: userTestimonies.length,
        }}
        onExportAllData={handleExportAllData}
        onImportData={handleImportData}
        onOpenSupabase={() => setIsSupabaseModalOpen(true)}
      />
      <BookChapterModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        currentBookId={currentBookId}
        currentChapter={currentChapter}
        onSelect={(bId, ch) => {
          setCurrentBookId(bId);
          setCurrentChapter(ch);
          setActiveTab('read');
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onShowSplashScreen={() => setShowSplash(true)}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onShowPostSplashAuth={() => setShowPostSplashAuth(true)}
        onOpenSupabase={() => setIsSupabaseModalOpen(true)}
      />

      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => {
          setIsSupabaseModalOpen(false);
          refreshAllData();
        }}
      />

      <VerseActionDrawer
        verse={selectedVerse}
        isOpen={isActionDrawerOpen}
        onClose={() => {
          setIsActionDrawerOpen(false);
          setSelectedVerse(null);
        }}
        isBookmarked={selectedVerse ? BibleService.isBookmarked(selectedVerse.bookId, selectedVerse.chapter, selectedVerse.verse) : false}
        currentHighlightColor={selectedVerse ? BibleService.getVerseHighlight(selectedVerse.bookId, selectedVerse.chapter, selectedVerse.verse)?.color : undefined}
        onToggleBookmark={() => {
          if (selectedVerse) handleToggleBookmark(selectedVerse);
        }}
        onSetHighlight={(color) => {
          if (selectedVerse) handleSetHighlight(selectedVerse, color);
        }}
        onOpenNoteEditor={() => {
          if (selectedVerse) handleOpenNoteEditorForVerse(selectedVerse);
        }}
        onPlayAudio={() => {
          if (selectedVerse) {
            const index = verses.findIndex(v => v.id === selectedVerse.id);
            startChapterAudio(index >= 0 ? index : 0);
          }
        }}
      />

      <NoteEditorModal
        isOpen={isNoteEditorOpen}
        onClose={() => {
          setIsNoteEditorOpen(false);
          setEditingNote(null);
          setNoteAttachedVerse(null);
        }}
        verse={noteAttachedVerse}
        existingNote={editingNote}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
      />

      {/* Post-Splash Account Creation & Login Screen */}
      {!showSplash && showPostSplashAuth && (
        <PostSplashAuthScreen
          onSuccess={(user) => {
            setCurrentUser(user);
            setShowPostSplashAuth(false);
            refreshAllData();
          }}
          onContinueAsGuest={() => {
            setShowPostSplashAuth(false);
          }}
        />
      )}

      {/* Splash Screen with Animated Jesus Story */}
      {showSplash && (
        <SplashScreen 
          onFinish={() => {
            setShowSplash(false);
            if (!currentUser) {
              setShowPostSplashAuth(true);
            }
          }} 
        />
      )}
    </div>
  );
}
