import React from 'react';
import { BookOpen, Search, Bookmark, FileText, Sparkles, Heart } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  bookmarksCount: number;
  notesCount: number;
  theme?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  bookmarksCount,
  notesCount,
  theme,
}) => {
  const isVintage = theme === 'vintage';

  const tabs = [
    { id: 'read' as TabType, label: 'Alkitab', icon: BookOpen },
    { id: 'devotional' as TabType, label: 'Renungan', icon: Sparkles },
    { id: 'stories' as TabType, label: 'Kisah', icon: Heart },
    { id: 'notes' as TabType, label: 'Catatan', icon: FileText, badge: notesCount },
    { id: 'bookmarks' as TabType, label: 'Bookmark', icon: Bookmark, badge: bookmarksCount },
    { id: 'search' as TabType, label: 'Cari', icon: Search },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-lg transition-colors ${
      isVintage
        ? 'bg-[#ebdcc2]/95 border-t border-[#c9b28b] shadow-lg'
        : 'bg-white/95 dark:bg-neutral-900/95 border-t border-neutral-200/80 dark:border-neutral-800'
    }`}>
      <div className="max-w-lg mx-auto px-1 h-15 flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                isActive
                  ? isVintage ? 'text-[#8c2514] font-bold font-cinzel' : 'text-amber-600 dark:text-amber-400 font-bold'
                  : isVintage ? 'text-[#6e5033] hover:text-[#2c1a0e] font-medium' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300 font-medium'
              }`}
            >
              {/* Active Indicator Pill */}
              {isActive && (
                <span className={`absolute -top-1 w-6 h-1 rounded-full ${
                  isVintage ? 'bg-[#8c2514]' : 'bg-amber-600 dark:bg-amber-400'
                }`} />
              )}

              <div className="relative">
                <Icon className={`w-4.5 h-4.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className={`absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center ${
                    isVintage ? 'bg-[#8c2514]' : 'bg-amber-600'
                  }`}>
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

