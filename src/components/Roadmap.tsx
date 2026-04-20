import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BookOpen, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

// AI logic removed for Demo Mode

interface RoadmapStep {
  title: string;
  description: string;
  resources: string[];
  duration: string;
}

interface RoadmapData {
  topic: string;
  steps: RoadmapStep[];
}

export function Roadmap() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

  const generateRoadmap = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    
    // Mock generation for Demo Mode
    setTimeout(() => {
      setRoadmap({
        topic: topic,
        steps: [
          {
            title: "Foundations & core concepts",
            description: `A deep dive into the basic principles of ${topic}. Understanding the history, key terminologies, and the overarching framework.`,
            resources: ["Introductory Video", "Wikipedia Overview", "Key Terms Glossary"],
            duration: "Week 1"
          },
          {
            title: "Advanced mechanisms",
            description: "Moving beyond the basics to understand how components interact within the system. This focuses on practical applications and logic.",
            resources: ["Case Study #1", "Logic Diagrams", "Expert Webinar"],
            duration: "Week 2"
          },
          {
            title: "Mastery through practice",
            description: "Solving real-world problems and applying theoretical knowledge. This stage is dedicated to active recall and implementation.",
            resources: ["Problem Set A", "Interactive Sandbox", "GitHub Repo Template"],
            duration: "Week 3-4"
          }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tighter">Knowledge Roadmap</h2>
        <p className="text-slate-500 font-bold italic uppercase tracking-widest text-[10px]">Demo Mode: Standard Template Generation</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search topic (Demo Mode)..."
            className="flex-1 brutal-input px-6 py-4 text-base sm:text-lg font-bold"
          />
          <button
            className="px-8 py-4 bg-brand-primary text-brand-dark rounded-2xl border-4 border-brand-dark brutal-shadow font-black text-base sm:text-lg cursor-default opacity-80 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Generate</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {roadmap ? (
          <motion.div
            key={roadmap.topic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-brand-dark mb-4">
              <div className="p-3 bg-brand-secondary rounded-2xl border-2 border-brand-dark brutal-shadow-sm">
                <BookOpen className="text-white w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">{roadmap.topic} Master Plan</h3>
            </div>
            
            <div className="relative pl-6 sm:pl-12 border-l-4 border-brand-dark space-y-12 ml-4 sm:ml-6">
              {roadmap.steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[40px] sm:-left-[64px] top-4 w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border-4 border-brand-dark brutal-shadow-sm flex items-center justify-center font-black text-sm sm:text-xl">
                    {idx + 1}
                  </div>
                  
                  <div className="brutal-card p-6 sm:p-8 group hover:border-brand-secondary transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <h4 className="text-xl sm:text-2xl font-black text-brand-dark">{step.title}</h4>
                      <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-mint text-brand-dark text-[10px] sm:text-xs font-black rounded-xl border-2 border-brand-dark uppercase whitespace-nowrap">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-slate-700 font-bold leading-relaxed mb-6">{step.description}</p>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {step.resources.map((res, ridx) => (
                        <span key={ridx} className="flex items-center gap-2 px-3 py-1.5 sm:py-2 bg-brand-bg border-2 border-brand-dark rounded-xl text-slate-700 text-[10px] sm:text-sm font-bold">
                          <ChevronRight className="text-brand-secondary w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-brand-primary/30 rounded-[32px] animate-pulse" />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-primary animate-bounce" size={40} />
            </div>
            <p className="text-brand-dark font-black text-xl animate-pulse uppercase tracking-widest">Architecting your roadmap...</p>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[40px] border-4 border-brand-dark shadow-[8px_8px_0px_var(--color-brand-dark)]">
            <Sparkles className="mx-auto text-slate-200 mb-6" size={64} />
            <p className="text-slate-400 font-black text-xl uppercase tracking-widest">Your future roadmap will appear here.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
