import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Timer, 
  Map as MapIcon, 
  CheckSquare, 
  MessageCircle, 
  Sparkles,
  Github,
  Zap,
  ChevronRight,
  ArrowRight,
  Users,
  CreditCard,
  Mail,
  Heart,
  Code,
  Globe,
  Menu,
  X,
  Star,
  ExternalLink,
  Twitter,
  Linkedin,
  Monitor,
  Send,
  LayoutDashboard,
  Share2,
  Volume2,
  CheckCircle2
} from 'lucide-react';
import { cn } from './lib/utils';
import { Pomodoro } from './components/Pomodoro';
import { InfiniteMarquee } from './components/InfiniteMarquee';

// Import local assets for robust deployment
import TeamImg from './team.jpg';
import SelImg from './sel.jpg';
import ChaoImg from './chao.jpg';
import AlexImg from './alex.jpg';

const FloatingSticker = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className={cn("absolute pointer-events-none z-0 opacity-10 md:opacity-20", className)}
  >
    {children}
  </motion.div>
);
import { Roadmap } from './components/Roadmap';
import { Tasks } from './components/Tasks';
import { Chat } from './components/Chat';

type Page = 'home' | 'contribute' | 'team' | 'pricing' | 'contact' | 'app';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeContributionTab, setActiveContributionTab] = useState('Developers');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'contribute', label: 'Contribute' },
    { id: 'team', label: 'Team' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNav = (id: Page) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-dark selection:bg-brand-primary selection:text-brand-dark">
      {/* Navigation Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 md:px-12",
        scrolled ? "py-4 bg-white/90 backdrop-blur-md border-b-4 border-brand-dark" : "py-8 bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
            <div className="p-2 bg-brand-secondary rounded-xl border-2 border-brand-dark brutal-shadow-sm group-hover:rotate-12 transition-transform">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">STUDYYA</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id as Page)}
                className={cn(
                  "text-sm font-black uppercase tracking-widest hover:text-brand-secondary transition-colors relative",
                  currentPage === link.id && "text-brand-secondary"
                )}
              >
                {link.label}
                {currentPage === link.id && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-2 left-0 right-0 h-1 bg-brand-secondary" />
                )}
              </button>
            ))}
            <button 
              onClick={() => handleNav('app')}
              className="px-6 py-2 bg-brand-dark text-brand-primary rounded-xl font-black text-sm border-2 border-brand-dark brutal-shadow-sm hover:translate-y-[-2px] active:translate-y-0 transition-all uppercase tracking-widest"
            >
              Open App
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 bg-white border-2 border-brand-dark brutal-shadow-sm" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[90] bg-brand-primary p-12 flex flex-col pt-32 gap-8 md:hidden"
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id as Page)}
                className="text-4xl font-black uppercase tracking-tighter text-brand-dark text-left"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => handleNav('app')}
              className="mt-8 px-8 py-4 bg-brand-dark text-brand-primary rounded-2xl font-black text-2xl border-4 border-brand-dark brutal-shadow"
            >
              LAUNCH APP
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden"
            >
              {/* Hero Section */}
              <section className="px-6 md:px-12 py-16 md:py-24 relative">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8 relative z-10 text-center lg:text-left">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-mint border-2 border-brand-dark rounded-full text-brand-dark text-[10px] font-black uppercase tracking-widest brutal-shadow-sm"
                    >
                      <Zap size={12} fill="currentColor" />
                      <span>The #1 Study Platform</span>
                    </motion.div>
                    <motion.h1 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter text-brand-dark"
                    >
                      STUDY <span className="text-brand-secondary italic">SMARTER</span>, <br/>
                      NOT <motion.span 
                        animate={{ rotate: [-2, 2, -2] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-white px-3 border-4 border-brand-dark inline-block"
                      >
                        HARDER.
                      </motion.span>
                    </motion.h1>
                    <p className="text-lg md:text-xl font-bold text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Hyper-charge your learning with interactive roadmaps, focused pomodoro sprints, and a study buddy that never sleeps.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button 
                        onClick={() => handleNav('app')}
                        className="px-6 py-4 bg-brand-dark text-brand-primary rounded-2xl font-black text-lg border-4 border-brand-dark brutal-shadow hover:translate-y-[-4px] active:translate-y-0 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
                      >
                        Start Learning Free <ChevronRight strokeWidth={4} />
                      </button>
                      <button className="px-6 py-4 bg-white text-brand-dark rounded-2xl font-black text-lg border-4 border-brand-dark brutal-shadow-sm hover:translate-y-[-4px] active:translate-y-0 transition-all uppercase tracking-tighter">
                        Watch Demo
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    {/* Floating Decorative Elements */}
                    <FloatingSticker className="top-0 right-0 -translate-y-full" delay={0}>
                      <Sparkles size={60} className="text-brand-primary" strokeWidth={3} />
                    </FloatingSticker>
                    <FloatingSticker className="-bottom-16 -left-16" delay={1.5}>
                      <GraduationCap size={100} className="text-brand-secondary" strokeWidth={3} />
                    </FloatingSticker>

                    <div className="w-full aspect-square bg-brand-primary rounded-[48px] border-4 border-brand-dark shadow-[8px_8px_0px_#2D3436] rotate-3 overflow-hidden relative z-10">
                       <div className="p-8 space-y-6">
                         <div className="brutal-card bg-white p-6 rotate-[-2deg]">
                           <div className="flex gap-4 items-center">
                             <div className="w-12 h-12 bg-brand-secondary rounded-full border-2 border-brand-dark shadow-[4px_4px_0px_#2D3436]" />
                             <div>
                               <div className="h-4 w-32 bg-brand-dark rounded-full mb-2" />
                               <div className="h-3 w-20 bg-slate-200 rounded-full" />
                             </div>
                           </div>
                         </div>
                         <div className="brutal-card bg-brand-mint p-6 rotate-[1deg] translate-x-4">
                           <div className="space-y-3">
                             <div className="h-4 w-full bg-brand-dark/20 rounded-full" />
                             <div className="h-4 w-2/3 bg-brand-dark/20 rounded-full" />
                           </div>
                         </div>
                         <div className="brutal-card bg-brand-blue p-6 rotate-[-1deg] -translate-x-4">
                            <Sparkles className="text-white mb-4" size={32} />
                            <div className="h-4 w-full bg-white/30 rounded-full" />
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Decorative Marquee */}
              <div className="-rotate-1 mt-10 mb-10 w-[120%] -ml-[10%]">
                <InfiniteMarquee text="STUDY • PLAN • REPEAT" speed={20} />
              </div>

              {/* Stats Section */}
              <section className="bg-brand-dark py-20 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="grid grid-cols-12 h-full">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="border-r border-white/20 h-full" />
                    ))}
                  </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-12 md:gap-24 relative z-10">
                  <div className="text-center">
                    <p className="text-6xl md:text-8xl font-black text-brand-primary tracking-tighter">50K+</p>
                    <p className="text-brand-bg uppercase font-black tracking-widest text-sm mt-2">Active Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-6xl md:text-8xl font-black text-brand-secondary tracking-tighter">12M+</p>
                    <p className="text-brand-bg uppercase font-black tracking-widest text-sm mt-2">XP Earned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-6xl md:text-8xl font-black text-brand-mint tracking-tighter">200+</p>
                    <p className="text-brand-bg uppercase font-black tracking-widest text-sm mt-2">Roadmaps Built</p>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="px-6 md:px-12 py-32 bg-white">
                <div className="max-w-7xl mx-auto space-y-24 relative">
                  <FloatingSticker className="top-1/4 right-0" delay={2}>
                    <Code size={100} className="text-brand-mint" strokeWidth={3} />
                  </FloatingSticker>
                  <FloatingSticker className="bottom-1/4 left-0" delay={0.5}>
                    <Heart size={80} className="text-brand-accent" strokeWidth={3} />
                  </FloatingSticker>

                  <div className="text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Everything you need to <br/> <span className="text-brand-primary">OWN</span> your studies</h2>
                    <p className="text-xl font-bold text-slate-500">We stripped away the clutter and focused on what actually works: Focus, Structure, and Support.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="brutal-card p-10 bg-brand-bg border-brand-primary border-4 space-y-6">
                      <div className="w-16 h-16 bg-brand-primary rounded-2xl border-4 border-brand-dark flex items-center justify-center">
                        <MapIcon size={32} strokeWidth={3} className="text-brand-dark" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">Roadmaps</h3>
                      <p className="font-bold text-slate-600 leading-relaxed">Instantly architect a 5-step master plan for any subject you want to master.</p>
                    </div>

                    <div className="brutal-card p-10 bg-brand-bg border-brand-mint border-4 space-y-6">
                      <div className="w-16 h-16 bg-brand-mint rounded-2xl border-4 border-brand-dark flex items-center justify-center text-brand-dark">
                        <Monitor size={32} strokeWidth={3} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">Study Guide</h3>
                      <p className="font-bold text-slate-600 leading-relaxed">Structured guides that break down complex topics into digestible learning bites.</p>
                    </div>

                    <div className="brutal-card p-10 bg-brand-bg border-brand-secondary border-4 space-y-6">
                      <div className="w-16 h-16 bg-brand-secondary rounded-2xl border-4 border-brand-dark flex items-center justify-center text-white">
                        <Sparkles size={32} strokeWidth={3} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">AI Assistant Tutor</h3>
                      <p className="font-bold text-slate-600 leading-relaxed">Your personal tutor ready to quiz you or explain complex theories 24/7.</p>
                    </div>

                    <div className="brutal-card p-10 bg-brand-bg border-brand-accent border-4 space-y-6">
                      <div className="w-16 h-16 bg-brand-accent rounded-2xl border-4 border-brand-dark flex items-center justify-center text-white">
                        <LayoutDashboard size={32} strokeWidth={3} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">Smart Scheduler</h3>
                      <p className="font-bold text-slate-600 leading-relaxed">Automatically organize your study sessions around your life's peak performance hours.</p>
                    </div>
                  </div>

                  <div className="brutal-card p-12 bg-white border-brand-dark border-4 mt-12 overflow-hidden shadow-[8px_8px_0px_#2D3436] hover:translate-y-[-4px] transition-all">
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-3xl font-black uppercase tracking-tighter mb-12 text-center"
                    >
                      WE OFFER MORE FEATURES
                    </motion.h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                      {[
                        { label: 'Protected Time', icon: <Timer size={20} />, desc: "Set periods where focus is un-interrupted.", color: "#55EFC4" },
                        { label: 'Schedule Upload', icon: <Monitor size={20} />, desc: "Auto-sync your classes and deadlines.", color: "#81ECEC" },
                        { label: 'Module Upload', icon: <Sparkles size={20} />, desc: "Turn PDF notes into study materials.", color: "#A29BFE" },
                        { label: 'Study Packs', icon: <Heart size={20} />, desc: "Collaborate on shared resource sets.", color: "#FAB1A0" },
                        { label: 'Custom Themes', icon: <Zap size={20} />, desc: "Make your dashboard truly yours.", color: "#74B9FF" },
                        { label: 'Challenges', icon: <Star size={20} />, desc: "Compete with friends to stay focused.", color: "#FFEE58" }
                      ].map((feat, idx) => (
                        <motion.div 
                          key={feat.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2, backgroundColor: feat.color }}
                          whileTap={{ scale: 0.95, borderColor: '#2D3436' }}
                          viewport={{ once: true }}
                          className="flex flex-col items-center gap-3 p-4 bg-brand-bg border-4 border-brand-dark rounded-2xl brutal-shadow-sm transition-colors cursor-pointer group"
                        >
                          <div className="p-2 bg-white border-2 border-brand-dark rounded-xl group-hover:rotate-12 transition-transform">
                            {feat.icon}
                          </div>
                          <div className="text-center space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-tighter block">{feat.label}</span>
                            <p className="text-[8px] font-bold text-slate-500 leading-tight opacity-0 group-hover:opacity-100 transition-opacity">{feat.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="rotate-2 mb-20 w-[120%] -ml-[10%]">
                    <InfiniteMarquee text="FOCUS • LEARN • SUCCEED" speed={25} reverse />
                  </div>

                  <div className="mt-20 max-w-7xl mx-auto mb-20 text-center relative px-6 py-20 bg-brand-secondary/5 border-4 border-dashed border-brand-dark/10 rounded-[64px]">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #2D3436 2px, transparent 0)', backgroundSize: '24px 24px' }} />
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.01 }}
                      viewport={{ once: true }}
                      className="p-12 md:p-16 brutal-card bg-brand-mint border-4 border-brand-dark inline-block max-w-4xl shadow-[16px_16px_0px_#2D3436] relative z-10"
                    >
                      <p className="text-4xl md:text-5xl font-black italic mb-8 leading-[1.1] text-brand-dark tracking-tighter">
                        “Be productive enough to move forward, but gentle enough to keep going— because a burnt-out mind builds nothing that lasts.”
                      </p>
                      <div className="flex items-center justify-center gap-6">
                        <div className="h-1 w-16 bg-brand-dark" />
                        <p className="text-lg font-black uppercase tracking-[0.2em]">— StudyYa Philosophy</p>
                        <div className="h-1 w-16 bg-brand-dark" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* Marquee Section */}
              <section className="py-12 bg-white">
                <InfiniteMarquee text="LEARN FASTER • FOCUS BETTER • BUILD MORE" speed={15} reverse className="bg-brand-mint/20" />
              </section>

              {/* FAQ Section */}
              <section className="px-6 md:px-12 py-32 bg-brand-bg">
                <div className="max-w-4xl mx-auto space-y-16">
                  <div className="text-center space-y-4">
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Frequently Asked <span className="text-brand-secondary">Questions</span></h2>
                    <p className="text-xl font-bold text-slate-500">Everything you need to know about StudyYa</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { 
                        q: "Is StudyYa free?", 
                        a: "Yes, StudyYa is completely free. However, StudyYa also offers a monthly subscription for those who want a huge variety of features and to maximize the true power of StudyYa." 
                      },
                      { 
                        q: "What is protected time and why should I care?", 
                        a: "StudyYa's smart scheduling develops schedules based on subtasks within a goal or project. Protected time ensures certain timeframes are never touched by the system, allowing uninterrupted focus." 
                      },
                      { 
                        q: "Can I really upload my class modules?", 
                        a: "Yes! With the premium plan, you can upload your class modules and StudyYa will generate an interface with resources and study materials based on them." 
                      },
                      { 
                        q: "Is my data safe?", 
                        a: "Absolutely. StudyYa follows strict ethical standards and ensures your data is never misused. It is only used to improve the application and enhance your experience." 
                      }
                    ].map((faq, idx) => (
                      <FAQItem key={idx} question={faq.q} answer={faq.a} />
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentPage === 'contribute' && (
            <motion.div
              key="contribute"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto px-6 md:px-12 py-20 space-y-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">BUILD THE <br/> <span className="bg-brand-mint px-4 border-4 border-brand-dark text-brand-dark inline-block not-italic">FUTURE</span></h2>
                  <p className="text-lg font-bold text-slate-600 leading-relaxed">
                    StudyYa is an open-source movement. We're building the infrastructure for the next generation of genius. Join us.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button className="brutal-btn bg-brand-dark text-white flex items-center gap-3 !px-6 !py-3 !text-lg">
                      <Github size={20} /> STAR ON GITHUB
                    </button>
                    <button className="brutal-btn bg-white text-brand-dark flex items-center gap-3 !px-6 !py-3 !text-lg">
                      <Globe size={20} /> JOIN DISCORD
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { id: 'Developers', icon: <Code size={28} />, color: '#FFD23F', label: 'DEVELOPERS', desc: 'Build core modules' },
                    { id: 'Designers', icon: <Users size={28} />, color: '#FF7EB3', label: 'DESIGNERS', desc: 'Shape the vision' },
                    { id: 'Supporters', icon: <Heart size={28} />, color: '#A29BFE', label: 'SUPPORTERS', desc: 'Spread the word' },
                    { id: 'Experts', icon: <Zap size={28} />, color: '#7AF1A7', label: 'EXPERTS', desc: 'Share wisdom' }
                  ].map((role) => (
                    <motion.div 
                      key={role.id}
                      whileHover={{ scale: 1.05, rotate: role.id === 'Developers' || role.id === 'Experts' ? -2 : 2, backgroundColor: role.color }}
                      onClick={() => setActiveContributionTab(role.id as any)}
                      className={cn(
                        "brutal-card p-6 space-y-3 cursor-pointer transition-all bg-white shadow-[4px_4px_0px_var(--color-brand-dark)]",
                        activeContributionTab === role.id && "ring-4 ring-brand-dark/10"
                      )}
                      animate={{ backgroundColor: activeContributionTab === role.id ? role.color : '#FFFFFF' }}
                    >
                      <div className="text-brand-dark">{role.icon}</div>
                      <h3 className="text-lg font-black uppercase text-brand-dark">
                        {role.label}
                      </h3>
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest leading-tight">{role.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contribution Guides */}
              <div className="space-y-8">
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 border-b-2 border-brand-dark/10 pb-6">
                  {[
                    { id: 'Developers', color: 'bg-brand-primary' },
                    { id: 'Designers', color: 'bg-brand-secondary' },
                    { id: 'Supporters', color: 'bg-brand-accent' },
                    { id: 'Experts', color: 'bg-brand-mint' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveContributionTab(tab.id as any)}
                      className={cn(
                        "px-8 py-3 rounded-full font-black text-xl transition-all duration-300",
                        activeContributionTab === tab.id 
                          ? `${tab.color} text-brand-dark shadow-[4px_4px_0px_rgba(0,0,0,1)]` 
                          : "text-slate-400 hover:text-brand-dark"
                      )}
                    >
                      {tab.id}
                    </button>
                  ))}
                </div>

                <motion.div
                  key={activeContributionTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-3xl mx-auto brutal-card bg-white p-8 space-y-8 shadow-[8px_8px_0px_var(--color-brand-dark)]"
                >
                  <div className="space-y-6">
                    {(activeContributionTab === 'Developers' ? [
                      "Clone the repository from GitHub",
                      "Install dependencies and run accurately",
                      "Explore the codebase & architecture",
                      "Pick an issue or feature to work on",
                      "Submit a pull request for review"
                    ] : activeContributionTab === 'Designers' ? [
                      "Review current UI/UX layout",
                      "Identify areas for improvement",
                      "Create wireframes or prototypes",
                      "Collaborate for implementation"
                    ] : activeContributionTab === 'Supporters' ? [
                      "Follow us on social media",
                      "Share StudyYa with classmates",
                      "Create content (blog/video)",
                      "Join Discord & stay active",
                      "Participate in challenges"
                    ] : [
                      "Review study frameworks",
                      "Submit proven methods",
                      "Peer-review contributions",
                      "Host a focus masterclass",
                      "Shape the future roadmap"
                    ]).map((step, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className={cn(
                          "w-10 h-10 border-2 border-brand-dark rounded-full flex items-center justify-center font-black text-lg shrink-0 group-hover:rotate-12 transition-transform shadow-[2px_2px_0px_#000]",
                          activeContributionTab === 'Developers' ? 'bg-brand-primary' :
                          activeContributionTab === 'Designers' ? 'bg-brand-secondary' :
                          activeContributionTab === 'Supporters' ? 'bg-brand-accent' : 'bg-brand-mint'
                        )}>
                          {i + 1}
                        </div>
                        <p className="text-base md:text-lg font-bold text-slate-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Current Opportunities */}
              <div className="pt-10 space-y-8">
                <div className="bg-slate-50/50 rounded-[48px] p-8 md:p-12 border-2 border-brand-dark/5 max-w-6xl mx-auto shadow-inner">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-3xl font-black text-brand-dark tracking-tighter uppercase italic">Current Opportunities</h3>
                      <div className="space-y-3">
                        {[
                          "Improve onboarding experience",
                          "Enhance AI tutor responses",
                          "Design better scheduling UI",
                          "Contribute educational content",
                          "Help test and report bugs"
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="flex items-center gap-3 p-3 bg-white border-2 border-brand-dark rounded-xl shadow-[3px_3px_0px_var(--color-brand-dark)] transition-all cursor-default group"
                          >
                            <div className="w-8 h-8 rounded-full border-2 border-brand-dark flex items-center justify-center bg-white shrink-0 group-hover:bg-brand-primary transition-colors">
                              <CheckCircle2 size={16} className="text-brand-dark" strokeWidth={3} />
                            </div>
                            <span className="text-lg font-bold text-brand-dark tracking-tight">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-[480px] aspect-square rounded-[32px] overflow-hidden border-4 border-brand-dark shadow-[12px_12px_0px_var(--color-brand-dark)]"
                      >
                        <img src={TeamImg} alt="Team" className="w-full h-full object-cover" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-32 space-y-24"
            >
              <div className="text-center space-y-8 max-w-3xl mx-auto">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">THE <span className="bg-brand-primary px-3 border-4 border-brand-dark inline-block rotate-[-2deg]">BRAINS</span> BEHIND IT</h2>
                <div className="space-y-6">
                  <h3 className="text-3xl font-black uppercase tracking-tight">Built by a Team That Understands Students</h3>
                  <p className="text-xl font-bold text-slate-500 leading-relaxed">
                    StudyYa is crafted by a passionate team dedicated to improving how students learn, organize, and succeed. We combine technology with real academic struggles to create a system that truly works in real life—not just in theory.
                  </p>
                  <p className="text-xl font-bold text-slate-500 leading-relaxed">
                    From smart scheduling to AI-assisted learning, every feature is designed with one goal in mind: helping you stay productive without burning out.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[
                  { name: 'Romeo Selwyn Villar', role: 'CEO & Founder', bio: 'Visionary leader driving the mission to revolutionize student productivity.', color: 'bg-brand-mint', image: SelImg },
                  { name: 'Charlene Calamba', role: 'Chief Operating Officer', bio: 'The engine behind StudyYa, ensuring every gear turns perfectly for our users.', color: 'bg-brand-secondary', image: ChaoImg },
                  { name: 'Alex Aparece', role: 'Chief Technology Officer', bio: 'The architect of our technology, building tools that make complex tasks feel simple.', color: 'bg-brand-blue', image: AlexImg }
                ].map((member, idx) => (
                  <motion.div 
                    key={member.name} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className={cn("aspect-[4/5] rounded-[48px] border-8 border-brand-dark shadow-[12px_12px_0px_var(--color-brand-dark)] mb-8 transition-all group-hover:-translate-y-4 overflow-hidden relative", member.color)}>
                       <img 
                        src={member.image} 
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover filter contrast-110 grayscale group-hover:grayscale-0 transition-all duration-500"
                       />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-1 leading-none">{member.name}</h2>
                    <p className="text-sm font-black text-brand-secondary uppercase tracking-[0.2em] mb-4">{member.role}</p>
                    <p className="font-bold text-slate-500 leading-relaxed">{member.bio}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-32 space-y-24"
            >
               <div className="text-center space-y-6">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">CHOOSE YOUR <br/> <span className="text-brand-secondary not-italic">POWER LEVEL</span></h2>
                <p className="text-xl font-bold text-slate-500">Free forever for students. Pro for legends.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                {/* Free Tier */}
                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="brutal-card p-10 bg-white space-y-10 group hover:border-brand-primary transition-all flex flex-col cursor-pointer"
                >
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Free Tier</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs tracking-tighter">FOR THE LONE STARTER</p>
                  </div>
                  <div className="text-6xl font-black tracking-tighter">₱0 <span className="text-xl text-slate-300 font-bold">/month</span></div>
                  <ul className="space-y-4 border-t-2 border-slate-100 pt-8 flex-1">
                    {['Curated Interest-Based Resources', 'Smart Scheduler', '2 Limits of Protected Time'].map(f => (
                      <li key={f} className="flex items-center gap-3 font-bold text-slate-600">
                        <CheckSquare size={18} className="text-brand-mint" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-brand-bg border-4 border-brand-dark rounded-xl font-black uppercase tracking-widest brutal-shadow-sm hover:bg-brand-primary transition-all mt-auto">Choose plan</button>
                </motion.div>

                {/* Premium Tier */}
                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="brutal-card p-10 bg-white border-brand-dark border-4 shadow-[16px_16px_0px_#2D3436] space-y-10 relative flex flex-col cursor-pointer z-10"
                >
                  <div className="absolute -top-6 right-6 bg-brand-blue text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs border-2 border-brand-dark">Most Popular</div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Premium Tier</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs tracking-tighter">FULL POWER UNLOCKED</p>
                  </div>
                  <div className="text-6xl font-black tracking-tighter">₱249 <span className="text-xl text-slate-300 font-bold">/month</span></div>
                  <ul className="space-y-4 border-t-2 border-slate-100 pt-8 flex-1">
                    {['AI Assistant Tutor', 'Class Schedule Upload', 'Exclusive Class Module Upload', 'Access Exclusive Study Packs', 'Unlimited Protected Time'].map(f => (
                      <li key={f} className="flex items-center gap-3 font-bold text-brand-dark">
                        <CheckSquare size={18} className="text-brand-secondary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-brand-dark text-white rounded-xl font-black uppercase tracking-widest border-4 border-brand-dark shadow-[4px_4px_0px_white] hover:translate-y-[-2px] transition-all mt-auto">Choose plan</button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-32"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-12">
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">SAY <span className="text-brand-secondary italic">HELLO</span></h2>
                  <p className="text-2xl font-bold text-slate-600 leading-relaxed">
                    Have a feature request? Found a bug? Just want to tell us your favorite color? We're listening.
                  </p>
                  <div className="space-y-8 pt-8">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white border-4 border-brand-dark rounded-2xl flex items-center justify-center text-brand-dark brutal-shadow-sm">
                        <Mail size={32} />
                      </div>
                      <div>
                        <p className="font-black uppercase tracking-widest text-xs text-slate-400">Email Us</p>
                        <p className="text-xl font-black">studyya@email.com</p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white border-4 border-brand-dark rounded-2xl flex items-center justify-center text-brand-dark brutal-shadow-sm">
                        <MapIcon size={32} />
                      </div>
                      <div>
                        <p className="font-black uppercase tracking-widest text-xs text-slate-400">Location</p>
                        <p className="text-xl font-black">Panabo City</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="brutal-card p-12 bg-white space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-black uppercase tracking-widest opacity-60">Full Name</label>
                    <input type="text" className="brutal-input w-full p-4 font-bold" placeholder="Name" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-black uppercase tracking-widest opacity-60">Email Address</label>
                    <input type="email" className="brutal-input w-full p-4 font-bold" placeholder="Email Address" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-black uppercase tracking-widest opacity-60">Your Message</label>
                    <textarea className="brutal-input w-full p-4 font-bold min-h-[150px]" placeholder="Tell us everything..." />
                  </div>
                  <button className="w-full py-5 bg-brand-primary text-brand-dark rounded-2xl border-4 border-brand-dark brutal-shadow font-black uppercase tracking-widest hover:translate-y-[-4px] active:translate-y-0 transition-all flex items-center justify-center gap-3">
                     SEND TRANSMISSION <Send className="rotate-45" size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'app' && (
            <motion.div
              key="app"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-12"
            >
              <div className="flex justify-between items-center mb-12">
                 <h2 className="text-4xl font-black text-brand-dark tracking-tighter italic uppercase flex items-center gap-3">
                   <Monitor size={32} strokeWidth={3} className="text-brand-secondary" />
                   PLATFORM TERMINAL
                 </h2>
                 <button 
                  onClick={() => handleNav('home')}
                  className="px-4 py-2 border-2 border-brand-dark rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Return to Site
                </button>
              </div>
              <AppContent />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistence Footer */}
      <footer className="bg-brand-bg border-t-8 border-brand-dark pt-8 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-8">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-brand-secondary rounded-xl border-2 border-brand-dark brutal-shadow-sm">
                 <GraduationCap size={24} className="text-white" />
               </div>
               <span className="text-2xl font-black tracking-tighter">STUDYYA</span>
             </div>
             <p className="font-bold text-slate-500 leading-relaxed">The high-performance command center for ambitious students who refuse to settle for average grades.</p>
             <div className="flex gap-4">
               {[Github, Twitter, Linkedin].map((Icon, i) => (
                 <button key={i} className="p-3 bg-white border-2 border-brand-dark rounded-xl brutal-shadow-sm hover:translate-y-[-2px] active:translate-y-0 transition-all">
                   <Icon size={20} />
                 </button>
               ))}
             </div>
          </div>

          {[
            { title: 'Explore', links: ['Features', 'Roadmaps', 'Focus Engine', 'Study Buddy'] },
            { title: 'Company', links: ['Home', 'Team', 'Contribute', 'Careers'] },
            { title: 'Support', links: ['Documentation', 'Contact Us', 'Discord', 'Status'] }
          ].map(col => (
            <div key={col.title} className="space-y-8">
              <h4 className="text-xl font-black uppercase tracking-tighter italic">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(l => (
                  <li key={l}><button className="font-bold text-slate-500 hover:text-brand-secondary transition-colors italic">{l}</button></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-xs font-black uppercase tracking-widest text-slate-400 italic">© 2026 STUDY YA UNIVERSE. DEPLOYED FROM THE FUTURE.</p>
           <div className="flex gap-12 text-xs font-black uppercase tracking-widest text-slate-400">
             <button className="hover:text-brand-dark transition-colors">Privacy</button>
             <button className="hover:text-brand-dark transition-colors">Terms</button>
             <button className="hover:text-brand-dark transition-colors">Cookies</button>
           </div>
        </div>
      </footer>
    </div>
  );
}

// Extracted the tool content to a separate helper component for the "App" view
function AppContent() {
  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <DashboardView onNav={() => {}} />
    </div>
  );
}

function DashboardView({ onNav }: { onNav: (id: string) => void }) {
  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-16"
    >
      {/* Hero */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 bg-brand-primary p-12 rounded-[48px] border-4 border-brand-dark shadow-[12px_12px_0px_var(--color-brand-dark)] relative overflow-hidden flex flex-col justify-center min-h-[400px]">
          <div className="relative z-10 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-brand-dark rounded-full text-brand-dark text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <Sparkles size={14} className="text-brand-secondary" />
              <span>Level 14 Overlord</span>
            </motion.div>
            <h2 className="text-6xl md:text-7xl font-black leading-none text-brand-dark tracking-tighter">
              READY TO <br/>
              <span className="bg-white px-2 border-4 border-brand-dark mt-2 inline-block">CRUSH IT?</span>
            </h2>
            <p className="text-xl font-bold text-brand-dark/80 max-w-lg leading-relaxed">
              You're just 400 XP away from reaching Level 15. Keep that 12-day streak alive and unlock the Dark Mode theme!
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                className="brutal-btn flex items-center gap-3 bg-brand-dark cursor-default opacity-80"
              >
                BUILD ROADMAP <ArrowRight size={24} />
              </button>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full" />
          <div className="absolute top-10 right-20 w-16 h-16 bg-brand-mint border-4 border-brand-dark rounded-2xl rotate-12 shadow-[4px_4px_0px_#2D3436]" />
        </div>

        <div className="bg-white p-10 rounded-[48px] border-4 border-brand-dark shadow-[12px_12px_0px_var(--color-brand-dark)] flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-brand-accent rounded-full flex items-center justify-center mb-6 border-4 border-brand-dark relative shadow-[4px_4px_0px_#2D3436]">
            <span className="text-5xl">⭐</span>
            <div className="absolute -top-3 -right-3 bg-brand-secondary text-white text-xs font-black px-3 py-1.5 rounded-full border-2 border-brand-dark uppercase tracking-widest">LVL 14</div>
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">LEADERBOARD</h2>
          <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">Top 3 this week</p>
          
          <div className="w-full space-y-4">
            {[
              { name: 'Sarah M.', xp: '4,200', color: 'bg-slate-50' },
              { name: 'You', xp: '3,800', color: 'bg-brand-mint/20 border-brand-mint border-2' },
              { name: 'Kevin K.', xp: '3,550', color: 'bg-slate-50' }
            ].map((user, i) => (
              <div key={user.name} className={cn("flex items-center justify-between p-4 rounded-2xl border border-slate-200 transition-all", user.color)}>
                <span className="font-black text-brand-dark">{i + 1}. {user.name}</span>
                <span className="font-black text-brand-secondary">{user.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'BIOLOGY', icon: '🔬', color: 'bg-brand-mint', count: 'Comprehensive guide to living organisms', pressColor: '#FFD93D' },
          { label: 'CALCULUS', icon: '📐', color: 'bg-brand-secondary', count: 'Mastering derivatives and integrals', pressColor: '#6C5CE7' },
          { label: 'HISTORY', icon: '🌍', color: 'bg-brand-accent', count: 'Timeline of major civilization events', pressColor: '#FF6B6B' },
          { label: 'CODING', icon: '💻', color: 'bg-brand-blue', count: 'Logic building and syntax mastery', pressColor: '#55EFC4' }
        ].map(cat => (
          <motion.div 
            key={cat.label} 
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95, backgroundColor: cat.pressColor }}
            className={cn("p-8 brutal-card brutal-card-hover cursor-pointer transition-colors duration-200", cat.color)}
          >
            <div className="text-5xl mb-6">{cat.icon}</div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{cat.label}</h3>
            <p className="text-xs font-black opacity-60 uppercase leading-snug">{cat.count}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string, key?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="brutal-card bg-white border-2 border-brand-dark p-0 overflow-hidden shadow-[4px_4px_0px_#2D3436]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center transition-colors hover:bg-brand-secondary/5"
      >
        <span className="text-xl font-black uppercase tracking-tighter text-left">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-brand-secondary"
        >
          <ChevronRight size={24} strokeWidth={4} className="rotate-90" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 border-t-2 border-slate-100 font-bold text-slate-500 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
