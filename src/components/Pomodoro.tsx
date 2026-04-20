import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Coffee, BookOpen, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

export function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => {}); // Handle blocked autoplay
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = mode === 'work' 
    ? (timeLeft / (25 * 60)) * 100 
    : (timeLeft / (5 * 60)) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-12 h-full">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative flex items-center justify-center brutal-card p-12 bg-white"
      >
        <svg className="w-64 h-64 transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={753.98}
            initial={{ strokeDashoffset: 753.98 }}
            animate={{ strokeDashoffset: (progress / 100) * 753.98 }}
            transition={{ duration: 1, ease: "linear" }}
            className={cn(
              "transition-colors duration-500",
              mode === 'work' ? "text-brand-secondary" : "text-brand-mint"
            )}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <motion.span 
            key={timeLeft}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-black tracking-tighter text-brand-dark"
          >
            {formatTime(timeLeft)}
          </motion.span>
          <span className="text-sm font-black uppercase tracking-widest text-slate-400">
            {mode === 'work' ? 'CRUSH TIME' : 'CHILL ZONE'}
          </span>
        </div>
      </motion.div>

      <div className="flex items-center space-x-6">
        <button
          onClick={resetTimer}
          className="w-16 h-16 rounded-2xl bg-white border-2 border-brand-dark brutal-shadow-sm text-brand-dark hover:translate-y-[-2px] transition-transform flex items-center justify-center"
        >
          <RotateCcw size={28} />
        </button>
        <button
          onClick={toggleTimer}
          className={cn(
            "w-24 h-24 rounded-2xl text-white border-4 border-brand-dark flex items-center justify-center transition-all transform hover:translate-y-[-4px] brutal-shadow active:translate-y-[2px]",
            isActive ? "bg-brand-secondary" : "bg-brand-mint"
          )}
        >
          {isActive ? <Pause size={48} fill="currentColor" /> : <Play size={48} className="ml-2" fill="currentColor" />}
        </button>
        <button
          onClick={() => {
            const nextMode = mode === 'work' ? 'break' : 'work';
            setMode(nextMode);
            setTimeLeft(nextMode === 'work' ? 25 * 60 : 5 * 60);
            setIsActive(false);
          }}
          className="w-16 h-16 rounded-2xl bg-white border-2 border-brand-dark brutal-shadow-sm text-brand-dark hover:translate-y-[-2px] transition-transform flex items-center justify-center"
        >
          {mode === 'work' ? <Coffee size={28} /> : <BookOpen size={28} />}
        </button>
      </div>

      <div className="flex space-x-3">
        {[1, 2, 3, 4].map((session) => (
          <div 
            key={session}
            className={cn(
              "w-4 h-4 rounded-full border-2 border-brand-dark",
              session <= 1 ? "bg-brand-primary" : "bg-white"
            )}
          />
        ))}
      </div>
    </div>
  );
}
