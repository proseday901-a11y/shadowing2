/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  Trash2, 
  Pause, 
  Play, 
  CheckCircle2, 
  UtensilsCrossed, 
  X,
  Star,
  Beef,
  CircleDot,
  Fish,
  Leaf,
  Sprout,
  Box,
  Wheat,
  History,
  Clock
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, Ingredient, TimerState, ActiveTimer, HistoryItem } from "./types";
import { INGREDIENTS } from "./constants";

// --- Utility Functions ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}秒`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs === 0 ? `${mins}分` : `${mins}分${secs}秒`;
}

function formatTimeDigital(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// --- Components ---

interface TimerCardProps {
  timer: ActiveTimer;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onRemove: (id: string) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ timer, onPause, onResume, onRemove }) => {
  const isCompleted = timer.state === TimerState.COMPLETED;
  const isPaused = timer.state === TimerState.PAUSED;
  const progress = Math.min((timer.elapsed / timer.totalTime) * 100, 100);

  const ingredient = INGREDIENTS.find(i => i.id === timer.ingredientId);
  const stages = ingredient?.stages || [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "relative overflow-hidden rounded-[24px] border px-6 py-5 transition-all duration-300",
        isCompleted 
          ? "bg-[#E6F9F3] border-[#B2EBD9]" 
          : "bg-white border-slate-100 shadow-sm"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-[20px] font-bold text-slate-800">
            {timer.name}
          </h3>
          {isCompleted && (
            <span className="bg-[#00B07B] text-white text-[11px] font-bold px-2 py-0.5 rounded-[6px]">可食</span>
          )}
        </div>
        <button
          onClick={() => onRemove(timer.id)}
          className="text-slate-300 hover:text-slate-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-baseline gap-1">
          <span className={cn(
            "text-[24px] font-black tabular-nums tracking-tight",
            "text-slate-800"
          )}>
            {formatTimeDigital(timer.elapsed)}
          </span>
          <span className="text-slate-300 font-medium mx-1 text-[16px]">/</span>
          <span className="text-slate-400 font-medium text-[16px]">
            {formatTimeDigital(timer.totalTime)}
          </span>
        </div>

        {isCompleted ? (
          <div className="flex items-center gap-1.5 text-[#00B07B] font-bold text-[15px]">
            <CheckCircle2 size={18} />
            快夹起来吃！
          </div>
        ) : (
          <button
            onClick={() => isPaused ? onResume(timer.id) : onPause(timer.id)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-all shadow-sm",
              isPaused 
                ? "bg-orange-500 text-white" 
                : "bg-orange-50 text-orange-500"
            )}
          >
            {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
          </button>
        )}
      </div>

      {/* Stages Milestones */}
      {stages.length > 0 && !isCompleted && (
        <div className="flex gap-2 mb-3">
          {stages.map((stage, idx) => {
            const reached = timer.elapsed >= stage.time;
            return (
              <div 
                key={idx} 
                className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold transition-all",
                  reached ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"
                )}
              >
                {stage.name}
              </div>
            );
          })}
        </div>
      )}

      {/* Progress Bar at Bottom */}
      <div className="absolute bottom-0 left-0 h-[6px] w-full bg-slate-50">
        <motion.div 
          className={cn(
            "h-full",
            isCompleted ? "bg-[#00B07B]" : "bg-orange-500"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
        {/* Stage Markers on Progress Bar */}
        {stages.map((stage, idx) => {
          const stageProgress = (stage.time / timer.totalTime) * 100;
          return (
            <div 
              key={idx}
              className="absolute top-0 w-[3px] h-full bg-white z-10 shadow-[0_0_2px_rgba(0,0,0,0.1)]"
              style={{ left: `${stageProgress}%`, transform: 'translateX(-50%)' }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [activeTimers, setActiveTimers] = useState<ActiveTimer[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedTimers = localStorage.getItem("hotpot_timers");
    const savedFavorites = localStorage.getItem("hotpot_favorites");
    const savedHistory = localStorage.getItem("hotpot_history");

    if (savedTimers) {
      try { setActiveTimers(JSON.parse(savedTimers)); } catch (e) { console.error(e); }
    }
    if (savedFavorites) {
      try { setFavoriteIds(JSON.parse(savedFavorites)); } catch (e) { console.error(e); }
    }
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hotpot_timers", JSON.stringify(activeTimers));
  }, [activeTimers]);

  useEffect(() => {
    localStorage.setItem("hotpot_favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem("hotpot_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (activeTimers.some(t => t.state === TimerState.RUNNING)) {
      intervalRef.current = setInterval(() => {
        setActiveTimers(prev => {
          let changed = false;
          const next = prev.map(timer => {
            if (timer.state === TimerState.RUNNING) {
              const newElapsed = timer.elapsed + 1;
              if (newElapsed >= timer.totalTime) {
                changed = true;
                setHistory(h => [{
                  id: `${timer.id}-hist`,
                  name: timer.name,
                  totalTime: timer.totalTime,
                  completedAt: Date.now()
                }, ...h].slice(0, 50));

                return { ...timer, elapsed: timer.totalTime, state: TimerState.COMPLETED };
              }
              changed = true;
              return { ...timer, elapsed: newElapsed };
            }
            return timer;
          });
          return changed ? next : prev;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeTimers]);

  const startTimer = (ingredient: Ingredient) => {
    const newTimer: ActiveTimer = {
      id: `${ingredient.id}-${Date.now()}`,
      ingredientId: ingredient.id,
      name: ingredient.name,
      startTime: Date.now(),
      totalTime: ingredient.cookTime,
      elapsed: 0,
      state: TimerState.RUNNING,
    };
    setActiveTimers(prev => [newTimer, ...prev]);
  };

  const pauseTimer = (id: string) => {
    setActiveTimers(prev => prev.map(t => t.id === id ? { ...t, state: TimerState.PAUSED } : t));
  };

  const resumeTimer = (id: string) => {
    setActiveTimers(prev => prev.map(t => t.id === id ? { ...t, state: TimerState.RUNNING } : t));
  };

  const removeTimer = (id: string) => {
    setActiveTimers(prev => prev.filter(t => t.id !== id));
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavoriteIds(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const clearAll = () => {
    if (window.confirm("确定要清空所有正在煮的食材吗？")) {
      setActiveTimers([]);
    }
  };

  const filteredIngredients = INGREDIENTS.filter(i => 
    activeCategory === Category.ALL || i.category === activeCategory
  );

  const favoriteIngredients = INGREDIENTS.filter(i => favoriteIds.includes(i.id));

  const categoryIcons: Record<string, React.ReactNode> = {
    [Category.ALL]: <UtensilsCrossed size={20} />,
    [Category.MEAT]: <Beef size={20} />,
    [Category.BALLS]: <CircleDot size={20} />,
    [Category.SEAFOOD]: <Fish size={20} />,
    [Category.VEGETABLE]: <Leaf size={20} />,
    [Category.MUSHROOM]: <Sprout size={20} />,
    [Category.BEAN]: <Box size={20} />,
    [Category.STAPLE]: <Wheat size={20} />,
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900 pb-10 flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col">
        {/* Red Header Section */}
        <div className="bg-[#D81E3F] text-white px-6 pt-10 pb-12 relative z-10 w-full rounded-t-[32px]">
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-[#FBC02D] p-2 rounded-[12px] shadow-sm">
                <Flame size={24} className="text-white" fill="currentColor" />
              </div>
              <h1 className="text-[24px] font-bold tracking-tight whitespace-nowrap">煮火锅神器</h1>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                <History size={20} />
              </button>
              <button 
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-1.5 bg-white/10 px-3 py-2 rounded-full text-[13px] font-medium hover:bg-white/20 transition-colors whitespace-nowrap"
              >
                <Trash2 size={16} />
                清空全部
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-medium opacity-80">正在煮</span>
            <span className="text-[32px] font-bold">{activeTimers.length}</span>
            <span className="text-[15px] font-medium opacity-80">种食材</span>
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-6">
          {/* Favorite Ingredients Section */}
          {favoriteIngredients.length > 0 && (
            <section className="px-6">
              <div className="flex items-center gap-2 mb-4">
                <Star size={18} className="text-[#FBC02D]" fill="currentColor" />
                <h2 className="text-[16px] font-bold text-slate-700">常用食材</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {favoriteIngredients.map(ingredient => (
                  <motion.button
                    key={ingredient.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startTimer(ingredient)}
                    className="flex-shrink-0 w-[100px] bg-white p-4 rounded-[20px] shadow-sm border border-slate-100 relative flex flex-col items-center justify-center"
                  >
                    <div className="absolute top-1.5 right-1.5 bg-[#FBC02D] p-1 rounded-full text-white shadow-sm">
                      <Star size={8} fill="currentColor" />
                    </div>
                    <div className="text-[14px] font-bold text-slate-700 mb-0.5">{ingredient.name}</div>
                    <div className="text-[11px] text-slate-400 font-medium">{formatTime(ingredient.cookTime)}</div>
                  </motion.button>
                ))}
              </div>
            </section>
          )}

          {/* Active Timers Section */}
          <section className="px-6 space-y-4">
            <AnimatePresence mode="popLayout">
              {activeTimers.map(timer => (
                <TimerCard 
                  key={timer.id}
                  timer={timer}
                  onPause={pauseTimer}
                  onResume={resumeTimer}
                  onRemove={removeTimer}
                />
              ))}
            </AnimatePresence>
          </section>

          {/* Add Ingredients Section */}
          <section className="bg-white rounded-t-[40px] px-6 pt-10 pb-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-slate-50 mt-4">
            <div className="flex justify-center mb-6">
              <div className="h-1.5 w-12 bg-slate-100 rounded-full" />
            </div>
            
            <div className="mb-8">
              <h2 className="text-[18px] font-bold text-slate-800">添加食材</h2>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-4 gap-y-6 mb-10">
              {Object.values(Category).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={cn(
                    "h-12 w-12 rounded-[16px] flex items-center justify-center transition-all",
                    activeCategory === cat 
                      ? "bg-[#D81E3F] text-white shadow-lg shadow-red-100" 
                      : "bg-slate-50 text-slate-400"
                  )}>
                    {categoryIcons[cat]}
                  </div>
                  <span className={cn(
                    "text-[12px] font-medium",
                    activeCategory === cat ? "text-[#D81E3F]" : "text-slate-400"
                  )}>
                    {cat}
                  </span>
                </button>
              ))}
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-3 gap-3">
              {filteredIngredients.map(ingredient => (
                <motion.button
                  key={ingredient.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startTimer(ingredient)}
                  className="flex flex-col items-center justify-center bg-[#F8F9FA] p-4 rounded-[16px] relative overflow-hidden"
                >
                  <div className="text-[14px] font-bold text-slate-700 mb-0.5">{ingredient.name}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{formatTime(ingredient.cookTime)}</div>
                  
                  <button 
                    onClick={(e) => toggleFavorite(e, ingredient.id)}
                    className={cn(
                      "absolute top-1 right-1 p-1 transition-colors",
                      favoriteIds.includes(ingredient.id) ? "text-[#FBC02D]" : "text-slate-200 hover:text-[#FBC02D]"
                    )}
                  >
                    <Star size={14} fill={favoriteIds.includes(ingredient.id) ? "currentColor" : "none"} />
                  </button>
                </motion.button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* History Overlay */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm px-4 pb-10" onClick={() => setShowHistory(false)}>
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] p-6 shadow-2xl border border-slate-100 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">历史记录</h2>
                  <p className="text-xs text-slate-400 mt-1">累计烹饪 {history.length} 种食材</p>
                </div>
                <button onClick={() => setShowHistory(false)} className="text-slate-400 p-2 hover:bg-slate-50 rounded-full transition-colors"><X size={24} /></button>
              </div>
              
              <div className="max-h-80 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-300">
                    <Clock size={48} strokeWidth={1} className="mb-2" />
                    <p className="text-sm">暂无记录，快去煮点什么吧</p>
                  </div>
                ) : (
                  history.map((item, idx) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-orange-500 font-bold text-xs shadow-sm">
                          {history.length - idx}
                        </div>
                        <div>
                          <div className="font-bold text-slate-700">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-medium">用时 {formatTime(item.totalTime)}</div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400 font-medium bg-white px-3 py-1 rounded-full shadow-sm">
                        {new Date(item.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clear All Confirmation Overlay */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-6" onClick={() => setShowClearConfirm(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[32px] p-8 shadow-2xl w-full max-w-xs text-center"
            >
              <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">确认清空？</h3>
              <p className="text-sm text-slate-500 mb-8">所有正在煮的计时器将被移除，此操作不可撤销。</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    setActiveTimers([]);
                    setShowClearConfirm(false);
                  }}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 shadow-lg shadow-red-200 transition-colors"
                >
                  确认
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
