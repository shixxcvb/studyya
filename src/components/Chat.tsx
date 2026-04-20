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
    <div className="flex flex-col h-[600px] max-w-3xl mx-auto brutal-card overflow-hidden">
      <div className="p-6 bg-brand-accent text-white flex items-center gap-4 border-b-4 border-brand-dark">
        <div className="p-3 bg-brand-dark rounded-2xl border-2 border-white shadow-[2px_2px_0px_white]">
          <Bot size={28} />
        </div>
        <div>
          <h3 className="text-xl font-black uppercase tracking-tighter">Study Buddy</h3>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-80">AI Support Active</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-brand-bg scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "flex items-start gap-3 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "p-3 rounded-2xl border-2 border-brand-dark brutal-shadow-sm",
                m.role === 'user' ? "bg-brand-secondary text-white" : "bg-white text-brand-dark"
              )}>
                {m.role === 'user' ? <User size={20} /> : <Sparkles size={20} />}
              </div>
              <div className={cn(
                "p-5 rounded-[24px] text-sm font-bold leading-relaxed border-4 border-brand-dark brutal-shadow-sm",
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

      <div className="p-6 bg-white border-t-4 border-brand-dark">
        <div className="flex gap-3">
          <input
            type="text"
            readOnly
            placeholder="Type a message (Demo Mode)..."
            className="flex-1 brutal-input px-6 py-3 font-bold cursor-default"
          />
          <button
            className="w-14 h-14 bg-brand-secondary/50 text-white rounded-2xl border-4 border-brand-dark brutal-shadow cursor-default flex items-center justify-center"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
