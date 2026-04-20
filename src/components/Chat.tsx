import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

// AI logic removed for Demo Mode

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm your Study Buddy. (Demo Mode: AI is currently offline and no API key is required)." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Mock response for demo mode
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm currently in demo mode to keep things simple. In the full version, I use Gemini AI to help you study! But for now, I'm just here to show you how the interface looks." 
      }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] md:h-[600px] max-w-3xl mx-auto brutal-card overflow-hidden">
      <div className="p-4 sm:p-6 bg-brand-accent text-white flex items-center gap-3 sm:gap-4 border-b-4 border-brand-dark">
        <div className="p-2 sm:p-3 bg-brand-dark rounded-xl sm:rounded-2xl border-2 border-white shadow-[2px_2px_0px_white]">
          <Bot size={20} sm:size={28} />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-tighter leading-tight">Study Buddy</h3>
          <p className="text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.2em] opacity-80">AI Support Active</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 bg-brand-bg scroll-smooth no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "flex items-start gap-2 sm:gap-3 max-w-[95%] sm:max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-brand-dark brutal-shadow-sm shrink-0",
                m.role === 'user' ? "bg-brand-secondary text-white" : "bg-white text-brand-dark"
              )}>
                {m.role === 'user' ? <User size={16} sm:size={20} /> : <Sparkles size={16} sm:size={20} />}
              </div>
              <div className={cn(
                "p-3 sm:p-5 rounded-[20px] sm:rounded-[24px] text-xs sm:text-sm font-bold leading-relaxed border-[3px] sm:border-4 border-brand-dark brutal-shadow-sm",
                m.role === 'user' 
                  ? "bg-brand-primary text-brand-dark rounded-tr-none" 
                  : "bg-white text-brand-dark rounded-tl-none"
              )}>
                {m.content}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-brand-dark font-black text-[10px] uppercase tracking-widest pl-16 animate-pulse"
            >
              <Loader2 className="animate-spin" size={14} />
              Thinking...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 sm:p-6 bg-white border-t-4 border-brand-dark">
        <div className="flex gap-2 sm:gap-3">
          <input
            type="text"
            readOnly
            placeholder="Type a message..."
            className="flex-1 brutal-input px-4 py-2 sm:px-6 sm:py-3 font-bold cursor-default text-sm sm:text-base"
          />
          <button
            className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-secondary text-white rounded-2xl border-4 border-brand-dark brutal-shadow cursor-default flex items-center justify-center shrink-0"
          >
            <Send size={20} sm:size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
