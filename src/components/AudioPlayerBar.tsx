import React from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, X, Gauge } from 'lucide-react';
import { Verse, Language } from '../types';
import { getBookNameById } from '../data/books';

interface AudioPlayerBarProps {
  isPlaying: boolean;
  isPaused: boolean;
  currentVerse: Verse | null;
  chapterTitle: string;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onNext: () => void;
  onPrev: () => void;
  onChangeSpeed: (speed: number) => void;
  language?: Language;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isPlaying,
  isPaused,
  currentVerse,
  chapterTitle,
  speed,
  onPlay,
  onPause,
  onResume,
  onStop,
  onNext,
  onPrev,
  onChangeSpeed,
  language = 'id',
}) => {
  if (!isPlaying && !isPaused && !currentVerse) return null;

  const isEn = language === 'en';
  const speeds = [0.75, 1.0, 1.25, 1.5];

  const cycleSpeed = () => {
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    onChangeSpeed(speeds[nextIndex]);
  };

  const verseBookName = currentVerse ? (getBookNameById(currentVerse.bookId, language) || currentVerse.bookName) : '';
  const verseText = currentVerse ? (isEn && currentVerse.textEn ? currentVerse.textEn : currentVerse.text) : (isEn ? 'Reciting Scripture...' : 'Membaca Kitab...');

  return (
    <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 z-40 max-w-xl mx-auto px-3 sm:px-4 animate-in slide-in-from-bottom-5 duration-200">
      <div 
        id="audio-player-bar-container"
        className="bg-neutral-900/95 text-white dark:bg-neutral-800/95 backdrop-blur-md rounded-2xl shadow-2xl p-3.5 border border-white/10 flex flex-col gap-2"
      >
        {/* Top Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold shrink-0">
              <Volume2 className="w-4 h-4 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-amber-400 truncate">
                {currentVerse ? `${verseBookName} ${currentVerse.chapter}:${currentVerse.verse}` : chapterTitle}
              </div>
              <div className="text-[11px] text-neutral-300 truncate font-serif-bible">
                {verseText}
              </div>
            </div>
          </div>

          <button
            id="close-audio-player-btn"
            onClick={onStop}
            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10"
            title={isEn ? "Close Audio" : "Tutup Audio"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10">
          {/* Speed Toggle */}
          <button
            id="audio-speed-btn"
            onClick={cycleSpeed}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-amber-300 flex items-center gap-1"
            title={isEn ? "Reading Speed" : "Kecepatan Baca"}
          >
            <Gauge className="w-3 h-3" />
            <span>{speed}x</span>
          </button>

          {/* Player controls */}
          <div className="flex items-center gap-3">
            <button
              id="audio-prev-verse-btn"
              onClick={onPrev}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-300 hover:text-white active:scale-95"
              title={isEn ? "Previous Verse" : "Ayat Sebelumnya"}
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {isPlaying ? (
              <button
                id="audio-pause-btn"
                onClick={onPause}
                className="w-10 h-10 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg active:scale-95"
                title={isEn ? "Pause" : "Jeda"}
              >
                <Pause className="w-5 h-5 fill-neutral-950" />
              </button>
            ) : (
              <button
                id="audio-play-btn"
                onClick={isPaused ? onResume : onPlay}
                className="w-10 h-10 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg active:scale-95"
                title={isEn ? "Play" : "Putar"}
              >
                <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
              </button>
            )}

            <button
              id="audio-stop-btn"
              onClick={onStop}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-300 hover:text-white active:scale-95"
              title={isEn ? "Stop" : "Berhenti"}
            >
              <Square className="w-4 h-4" />
            </button>

            <button
              id="audio-next-verse-btn"
              onClick={onNext}
              className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-300 hover:text-white active:scale-95"
              title={isEn ? "Next Verse" : "Ayat Selanjutnya"}
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-neutral-400 font-medium">
            {isPlaying ? (isEn ? 'Playing...' : 'Memutar...') : (isEn ? 'Paused' : 'Dijeda')}
          </div>
        </div>
      </div>
    </div>
  );
};
