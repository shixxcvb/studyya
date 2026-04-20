import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { Plus, Trash2, CheckCircle2, Circle, GripVertical, PieChart as ChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '../lib/utils';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Review Calculus Chapter 4', completed: false },
    { id: '2', text: 'Draft Sociology Essay', completed: true },
    { id: '3', text: 'Prepare Biology Lab Report', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now().toString(), text: newTask, completed: false }, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const data = [
    { name: 'Completed', value: completedCount },
    { name: 'Remaining', value: totalCount - completedCount },
  ];
  const COLORS = ['#FF7EB3', '#F1F5F9'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
      <div className="lg:col-span-2 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter uppercase italic">Task Deck</h2>
          <span className="bg-brand-primary border-2 border-brand-dark px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest brutal-shadow-sm self-end sm:self-auto">
            {completedCount}/{totalCount} CRUSHED
          </span>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Add a new goal..."
            className="flex-1 brutal-input px-5 py-3 sm:px-6 sm:py-4 font-bold text-base sm:text-lg"
          />
          <button
            type="button"
            className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-secondary text-white rounded-2xl border-4 border-brand-dark brutal-shadow cursor-default flex items-center justify-center pt-1 shrink-0"
          >
            <Plus className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={3} />
          </button>
        </form>

        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "p-5 sm:p-6 rounded-[24px] border-4 border-brand-dark flex items-center gap-4 group transition-all brutal-shadow cursor-default",
                  task.completed ? "bg-slate-100 opacity-60" : "bg-white"
                )}
              >
                <div 
                  className={cn(
                    "transition-colors shrink-0",
                    task.completed ? "text-brand-mint" : "text-slate-300"
                  )}
                >
                  {task.completed ? <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} /> : <Circle className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />}
                </div>

                <span className={cn(
                  "flex-1 text-base sm:text-xl font-bold text-brand-dark transition-all leading-tight",
                  task.completed && "line-through text-slate-400"
                )}>
                  {task.text}
                </span>

                <div className="p-1 sm:p-2 text-slate-300">
                  <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-8">
        <div className="brutal-card p-8 bg-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-brand-accent rounded-xl border-2 border-brand-dark">
              <ChartIcon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-black text-brand-dark tracking-tighter">Productivity</h3>
          </div>
          
          <div className="h-48 relative mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke={tasks.length > 0 ? "#2D3436" : "none"}
                  strokeWidth={2}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-brand-dark">
                {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
              </span>
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Rate</span>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t-2 border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Peak Focus</span>
              <span className="font-black text-brand-dark bg-brand-bg px-2 py-1 rounded-lg border border-brand-dark text-xs">10:00 AM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Streak</span>
              <span className="font-black text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded-lg border border-brand-secondary text-xs">5 Days 🔥</span>
            </div>
          </div>
        </div>

        <div className="bg-brand-primary p-8 rounded-[32px] border-4 border-brand-dark shadow-[6px_6px_0px_#2D3436]">
          <h4 className="font-black text-brand-dark text-xl mb-4 uppercase tracking-tighter italic">Pro Tip</h4>
          <p className="text-brand-dark font-bold leading-relaxed">Break your giant goals into tiny 25-minute sprints. Your brain will thank you!</p>
        </div>
      </div>
    </div>
  );
}
