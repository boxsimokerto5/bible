import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, BookOpen, 
  Volume2, Sparkles, Trophy, HelpCircle, Flame, Share2, 
  ChevronRight, Brain, Zap, History, Check, BookmarkCheck
} from 'lucide-react';
import { 
  QuizCategory, QuizQuestion, QuizSessionSummary, 
  UserQuizStats, QuizService, BIBLE_QUIZ_BANK 
} from '../data/bibleQuizData';

interface BibleQuizSectionProps {
  currentBookName?: string;
  currentBookId?: string;
  currentChapter?: number;
  onNavigateToVerse: (bookId: string, chapter: number, verseNum?: number) => void;
  onStartAudioForVerse: (verseText: string, title: string) => void;
  theme?: string;
}

export const BibleQuizSection: React.FC<BibleQuizSectionProps> = ({
  currentBookName = 'Yohanes',
  currentBookId = 'yoh',
  currentChapter = 1,
  onNavigateToVerse,
  onStartAudioForVerse,
  theme,
}) => {
  const isVintage = theme === 'vintage';

  // State Management
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('devotional');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; selectedId: string; isCorrect: boolean }[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [stats, setStats] = useState<UserQuizStats>(() => QuizService.getUserStats());
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [quizHistory, setQuizHistory] = useState<QuizSessionSummary[]>(() => QuizService.getQuizHistory());
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Initialize questions on category change or reset
  const startNewQuiz = (category: QuizCategory = selectedCategory) => {
    setSelectedCategory(category);
    const questions = QuizService.getQuestionsByCategory(category, currentBookId, 5);
    setQuizQuestions(questions);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  useEffect(() => {
    startNewQuiz(selectedCategory);
  }, []);

  const currentQuestion = quizQuestions[currentIndex];

  // Handle Option Click
  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  // Submit Answer for Current Question
  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !currentQuestion || isAnswerSubmitted) return;

    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    setIsAnswerSubmitted(true);

    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedId: selectedOptionId,
        isCorrect,
      }
    ]);
  };

  // Move to Next Question or Finish
  const handleNextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finish Quiz
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const total = quizQuestions.length;
    const correctCount = userAnswers.filter(a => a.isCorrect).length + (selectedOptionId === currentQuestion.correctOptionId && isAnswerSubmitted ? 0 : 0);
    // Actually userAnswers already has all submitted answers
    const finalCorrect = userAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((finalCorrect / (total || 1)) * 100);
    const badge = QuizService.getBadgeTitle(score);

    const summary: QuizSessionSummary = {
      id: 'quiz-' + Date.now(),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: Date.now(),
      category: selectedCategory,
      categoryLabel: getCategoryLabel(selectedCategory),
      totalQuestions: total,
      correctCount: finalCorrect,
      score,
      badgeTitle: badge.title,
    };

    QuizService.saveQuizResult(summary);
    setStats(QuizService.getUserStats());
    setQuizHistory(QuizService.getQuizHistory());
    setIsQuizCompleted(true);
  };

  const getCategoryLabel = (cat: QuizCategory): string => {
    switch (cat) {
      case 'devotional': return 'Ayat Renungan Harian';
      case 'recent_reading': return `Kitab ${currentBookName || 'Alkitab'}`;
      case 'verse_memory': return 'Lengkapi Hafalan Ayat';
      case 'bible_characters': return 'Tokoh & Sejarah Alkitab';
      case 'jesus_miracles': return 'Mukjizat Yesus';
      case 'quick_mix': return 'Kuis Cepat Campuran';
      default: return 'Kuis Alkitab';
    }
  };

  // Share score
  const handleShareScore = (score: number, badgeTitle: string) => {
    const text = `🎯 Saya baru saja menyelesaikan Kuis Alkitab!\n🏆 Skor: ${score}/100 (${badgeTitle})\n📖 Uji pengetahuan firman Tuhan & renungkan ayat-ayat Alkitab di Alkitab Digital TB.\n\n"Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku." (Mzm 119:105)`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Hasil Kuis Alkitab Digital',
        text,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const categories: { id: QuizCategory; label: string; icon: string; desc: string }[] = [
    { id: 'devotional', label: 'Renungan Hari Ini', icon: '✨', desc: 'Ayat emas & refleksi renungan' },
    { id: 'recent_reading', label: `Bacaan (${currentBookName})`, icon: '📖', desc: `Seputar kitab ${currentBookName}` },
    { id: 'verse_memory', label: 'Lengkapi Ayat', icon: '🧠', desc: 'Latih hafalan ayat-ayat kunci' },
    { id: 'bible_characters', label: 'Tokoh Alkitab', icon: '👑', desc: 'Daud, Musa, Petrus, Paulus' },
    { id: 'jesus_miracles', label: 'Mukjizat Yesus', icon: '✝️', desc: 'Tanda & mukjizat di Injil' },
    { id: 'quick_mix', label: 'Campuran Acak', icon: '⚡', desc: '5 Soal cepat gabungan' },
  ];

  return (
    <div className="space-y-4">
      {/* Category Selector Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <span>Kuis & Asah Pengetahuan Firman</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Interaktif
                </span>
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Uji pemahaman ayat yang baru dibaca & perdalam ingatan firman Tuhan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {stats.totalQuizzesTaken > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 ${
                  showHistory
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-amber-500/50'
                }`}
                title="Lihat Riwayat Kuis"
              >
                <History className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Riwayat ({stats.totalQuizzesTaken})</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (selectedCategory !== cat.id || isQuizCompleted) {
                    startNewQuiz(cat.id);
                  }
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs scale-[1.02]'
                    : 'bg-neutral-50 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-700 hover:border-amber-500/50 hover:bg-neutral-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick User Stats Mini Badge */}
        {stats.totalQuizzesTaken > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Streak: <b className="text-neutral-800 dark:text-neutral-200">{stats.currentStreak}x</b></span>
              </span>
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Skor Tertinggi: <b className="text-neutral-800 dark:text-neutral-200">{stats.highestScore}</b></span>
              </span>
            </div>
            <span>Akurasi: <b className="text-emerald-600 dark:text-emerald-400">{stats.totalQuestionsAnswered ? Math.round((stats.totalCorrectAnswers / stats.totalQuestionsAnswered) * 100) : 0}%</b></span>
          </div>
        )}
      </div>

      {/* History Drawer Modal View (If toggled) */}
      {showHistory && (
        <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-amber-500" />
              <span>Riwayat Hasil Kuis Alkitab</span>
            </h4>
            <button
              onClick={() => setShowHistory(false)}
              className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 font-bold"
            >
              Tutup
            </button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {quizHistory.length === 0 ? (
              <p className="text-xs text-neutral-400 py-3 text-center">Belum ada riwayat kuis tersimpan.</p>
            ) : (
              quizHistory.map((item) => (
                <div 
                  key={item.id}
                  className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-700/60 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {item.categoryLabel}
                    </div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      {item.date} • {item.badgeTitle}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                      item.score >= 80 
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                        : item.score >= 60 
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' 
                        : 'bg-neutral-500/15 text-neutral-600 dark:text-neutral-400'
                    }`}>
                      {item.score} Pts ({item.correctCount}/{item.totalQuestions})
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* QUIZ INTERFACE */}
      {!isQuizCompleted ? (
        currentQuestion ? (
          <div 
            id="quiz-active-card"
            className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-md space-y-4 transition-all"
          >
            {/* Progress Bar & Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Soal {currentIndex + 1} dari {quizQuestions.length}</span>
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                  {currentQuestion.categoryLabel}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-1.5">
              {currentQuestion.contextOrClue && (
                <div className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  {currentQuestion.contextOrClue}
                </div>
              )}
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* 4 Multiple Choice Options */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQuestion.correctOptionId;
                
                let optionStyle = 'border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-900/50 hover:bg-amber-50/50 dark:hover:bg-neutral-800 hover:border-amber-400 text-neutral-800 dark:text-neutral-200';
                
                if (isSelected && !isAnswerSubmitted) {
                  optionStyle = 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500 text-neutral-900 dark:text-neutral-100 font-bold';
                } else if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-500/15 text-rose-950 dark:text-rose-200 line-through opacity-80';
                  } else {
                    optionStyle = 'border-neutral-200 dark:border-neutral-700 opacity-40';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-3 sm:p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-2.5 active:scale-[0.99] ${optionStyle}`}
                  >
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                      isAnswerSubmitted && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isAnswerSubmitted && isSelected && !isCorrect
                        ? 'bg-rose-600 text-white'
                        : isSelected
                        ? 'bg-amber-600 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Scripture Reference (Shown after submit) */}
            {isAnswerSubmitted && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 space-y-2.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
                  <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Kunci Kebenaran Firman:</span>
                </div>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-serif-bible">
                  {currentQuestion.explanation}
                </p>

                {/* Quick actions for this verse */}
                <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between gap-2 flex-wrap">
                  <button
                    onClick={() => onNavigateToVerse(
                      currentQuestion.relatedVerse.bookId, 
                      currentQuestion.relatedVerse.chapter, 
                      currentQuestion.relatedVerse.verse
                    )}
                    className="text-xs font-bold text-amber-800 dark:text-amber-300 hover:text-amber-900 hover:underline flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka {currentQuestion.relatedVerse.bookName} {currentQuestion.relatedVerse.chapter}:{currentQuestion.relatedVerse.verse}</span>
                  </button>

                  <button
                    onClick={() => onStartAudioForVerse(
                      currentQuestion.relatedVerse.verseText,
                      `${currentQuestion.relatedVerse.bookName} ${currentQuestion.relatedVerse.chapter}:${currentQuestion.relatedVerse.verse}`
                    )}
                    className="text-xs font-bold px-2 py-1 rounded-lg bg-amber-600/15 hover:bg-amber-600/25 text-amber-900 dark:text-amber-200 flex items-center gap-1 transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengar Ayat</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Button Action */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => startNewQuiz(selectedCategory)}
                className="text-xs font-semibold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 flex items-center gap-1 p-2"
                title="Mulai Ulang Soal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi</span>
              </button>

              {!isAnswerSubmitted ? (
                <button
                  id="quiz-submit-btn"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-1.5 ${
                    selectedOptionId
                      ? 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  <span>Cek Jawaban</span>
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="quiz-next-btn"
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <span>{currentIndex < quizQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 text-center space-y-3">
            <p className="text-xs text-neutral-500">Memuat soal kuis...</p>
            <button onClick={() => startNewQuiz()} className="text-xs font-bold text-amber-600">Muat Ulang</button>
          </div>
        )
      ) : (
        /* QUIZ RESULT SCORECARD */
        <div 
          id="quiz-result-card"
          className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 shadow-md space-y-5 text-center"
        >
          {/* Badge & Confetti Header */}
          {(() => {
            const correctCount = userAnswers.filter(a => a.isCorrect).length;
            const score = Math.round((correctCount / (quizQuestions.length || 1)) * 100);
            const badge = QuizService.getBadgeTitle(score);

            return (
              <>
                <div className="space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-3xl flex items-center justify-center shadow-inner">
                    {badge.emoji}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Hasil Kuis Alkitab Selesai
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-neutral-50">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                    {badge.message}
                  </p>
                </div>

                {/* Score Big Display */}
                <div className="py-3 px-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-around max-w-sm mx-auto">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                      {score}
                    </div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase">Skor Total</div>
                  </div>
                  <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-700" />
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                      {correctCount}/{quizQuestions.length}
                    </div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase">Jawaban Benar</div>
                  </div>
                </div>

                {/* Question Review Accordion / List */}
                <div className="space-y-2 text-left pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Ringkasan Ayat yang Telah Dipelajari:
                  </h4>
                  <div className="space-y-2">
                    {quizQuestions.map((q, idx) => {
                      const ans = userAnswers[idx];
                      return (
                        <div 
                          key={q.id}
                          className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                            ans?.isCorrect 
                              ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30' 
                              : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-500/30'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-1.5">
                              {ans?.isCorrect ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                              )}
                              <span className="text-neutral-900 dark:text-neutral-100">Soal {idx + 1}: {q.question}</span>
                            </span>
                          </div>

                          <div className="text-[11px] text-neutral-600 dark:text-neutral-300 font-serif-bible pl-5">
                            "{q.relatedVerse.verseText}"
                          </div>

                          <div className="flex items-center justify-between pl-5 pt-1">
                            <button
                              onClick={() => onNavigateToVerse(q.relatedVerse.bookId, q.relatedVerse.chapter, q.relatedVerse.verse)}
                              className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                            >
                              <BookOpen className="w-3 h-3" />
                              <span>{q.relatedVerse.bookName} {q.relatedVerse.chapter}:{q.relatedVerse.verse}</span>
                            </button>

                            <button
                              onClick={() => onStartAudioForVerse(q.relatedVerse.verseText, `${q.relatedVerse.bookName} ${q.relatedVerse.chapter}:${q.relatedVerse.verse}`)}
                              className="text-[11px] text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 font-semibold flex items-center gap-1"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Dengar</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Result Action Buttons */}
                <div className="pt-3 flex items-center justify-center gap-2.5 flex-wrap">
                  <button
                    id="quiz-play-again-btn"
                    onClick={() => startNewQuiz(selectedCategory)}
                    className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Main Lagi (Soal Baru)</span>
                  </button>

                  <button
                    id="quiz-share-score-btn"
                    onClick={() => handleShareScore(score, badge.title)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    {copiedShare ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedShare ? 'Tersalin!' : 'Bagikan Hasil'}</span>
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
