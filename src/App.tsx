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
  LayoutDashboard
} from 'lucide-react';
import { cn } from './lib/utils';
import { Pomodoro } from './components/Pomodoro';
import { Roadmap } from './components/Roadmap';
import { Tasks } from './components/Tasks';
import { Chat } from './components/Chat';

type Page = 'home' | 'contribute' | 'team' | 'pricing' | 'contact' | 'app';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
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
              <section className="px-6 md:px-12 py-20 md:py-32 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-10 relative z-10 text-center lg:text-left">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-mint border-2 border-brand-dark rounded-full text-brand-dark text-xs font-black uppercase tracking-widest brutal-shadow-sm"
                    >
                      <Zap size={14} fill="currentColor" />
                      <span>The #1 AI Study Platform</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-brand-dark">
                      STUDY <span className="text-brand-secondary italic">SMARTER</span>, <br/>
                      NOT <span className="bg-white px-3 border-4 border-brand-dark inline-block rotate-[-2deg]">HARDER.</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Hyper-charge your learning with AI-generated roadmaps, focused pomodoro sprints, and a study buddy that never sleeps.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <button 
                        onClick={() => handleNav('app')}
                        className="px-8 py-5 bg-brand-dark text-brand-primary rounded-2xl font-black text-xl border-4 border-brand-dark brutal-shadow hover:translate-y-[-4px] active:translate-y-0 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
                      >
                        Start Learning Free <ChevronRight strokeWidth={4} />
                      </button>
                      <button className="px-8 py-5 bg-white text-brand-dark rounded-2xl font-black text-xl border-4 border-brand-dark brutal-shadow-sm hover:translate-y-[-4px] active:translate-y-0 transition-all uppercase tracking-tighter">
                        Watch Demo
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-full aspect-square bg-brand-primary rounded-[64px] border-8 border-brand-dark shadow-[16px_16px_0px_#2D3436] rotate-3 overflow-hidden">
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
                    {/* Floating Icons */}
                    <motion.div 
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-10 -right-10 w-24 h-24 bg-brand-accent border-4 border-brand-dark rounded-3xl brutal-shadow flex items-center justify-center text-4xl rotate-12"
                    >
                      🚀
                    </motion.div>
                  </div>
                </div>
              </section>

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
                <div className="max-w-7xl mx-auto space-y-24">
                  <div className="text-center max-w-3xl mx-auto space-y-6">
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Everything you need to <br/> <span className="text-brand-primary">OWN</span> your studies</h2>
                    <p className="text-xl font-bold text-slate-500">We stripped away the clutter and focused on what actually works: Focus, Structure, and Support.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="brutal-card p-10 bg-brand-bg border-brand-primary border-4 space-y-6">
                      <div className="w-16 h-16 bg-brand-primary rounded-2xl border-4 border-brand-dark flex items-center justify-center">
                        <MapIcon size={32} strokeWidth={3} className="text-brand-dark" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">AI Roadmaps</h3>
                      <p className="font-bold text-slate-600 leading-relaxed">Instantly architect a 5-step master plan for any subject from Quantum Physics to Baking.</p>
                    </div>

                    <div className="brutal-card p-10 bg-brand-bg border-brand-secondary border-4 space-y-6">
                      <div className="w-16 h-16 bg-brand-secondary rounded-2xl border-4 border-brand-dark flex items-center justify-center text-white">
                        <Timer size={32} strokeWidth={3} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">Brutal Focus</h3>
                      <p className="font-bold text-slate-600 leading-relaxed">A hyper-visual Pomodoro engine designed to keep you in the flow state longer.</p>
                    </div>

                    <div className="brutal-card p-10 bg-brand-bg border-brand-accent border-4 space-y-6">
                      <div className="w-16 h-16 bg-brand-accent rounded-2xl border-4 border-brand-dark flex items-center justify-center text-white">
                        <MessageCircle size={32} strokeWidth={3} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter">Study Buddy</h3>
                      <p className="font-bold text-slate-600 leading-relaxed">Your personal AI tutor ready to quiz you or explain complex theories 24/7.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Marquee Section */}
              <section className="py-12 bg-white border-y-4 border-brand-dark overflow-hidden whitespace-nowrap">
                <motion.div 
                  animate={{ x: [0, -1000] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="flex gap-20 items-center"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-8">
                       <span className="text-4xl font-black uppercase tracking-[0.2em]">Learn Faster</span>
                       <div className="w-4 h-4 bg-brand-primary rounded-full border-2 border-brand-dark" />
                       <span className="text-4xl font-black uppercase tracking-[0.2em] text-brand-secondary">Focus Better</span>
                       <div className="w-4 h-4 bg-brand-secondary rounded-full border-2 border-brand-dark" />
                       <span className="text-4xl font-black uppercase tracking-[0.2em] text-brand-mint">Build More</span>
                       <div className="w-4 h-4 bg-brand-mint rounded-full border-2 border-brand-dark" />
                    </div>
                  ))}
                </motion.div>
              </section>
            </motion.div>
          )}

          {currentPage === 'contribute' && (
            <motion.div
              key="contribute"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-32 space-y-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">BUILD THE <br/> <span className="bg-brand-mint px-4 border-4 border-brand-dark text-brand-dark inline-block not-italic">FUTURE</span></h2>
                  <p className="text-2xl font-bold text-slate-600 leading-relaxed">
                    StudyYa is an open-source movement. We're building the infrastructure for the next generation of genius. Join us.
                  </p>
                  <div className="flex flex-wrap gap-6 pt-4">
                    <button className="brutal-btn bg-brand-dark flex items-center gap-3">
                      <Github size={24} /> STAR ON GITHUB
                    </button>
                    <button className="brutal-btn bg-white text-brand-dark flex items-center gap-3">
                      <Globe size={24} /> JOIN DISCORD
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="brutal-card p-8 bg-brand-primary space-y-4">
                    <Code className="text-brand-dark" size={32} strokeWidth={3} />
                    <h3 className="text-xl font-black uppercase">DEVELOPERS</h3>
                    <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Build core modules and AI integrations</p>
                  </div>
                  <div className="brutal-card p-8 bg-brand-secondary space-y-4">
                    <Users className="text-white" size={32} strokeWidth={3} />
                    <h3 className="text-xl font-black uppercase text-white">MODERATORS</h3>
                    <p className="text-xs font-bold text-white/80 uppercase tracking-widest">Help our student community grow</p>
                  </div>
                  <div className="brutal-card p-8 bg-brand-accent space-y-4">
                    <Heart className="text-white" size={32} strokeWidth={3} />
                    <h3 className="text-xl font-black uppercase text-white">SUPPORTERS</h3>
                    <p className="text-xs font-bold text-white/80 uppercase tracking-widest">Spread the word and beta-test features</p>
                  </div>
                  <div className="brutal-card p-8 bg-white border-brand-dark space-y-4">
                    <Zap className="text-brand-primary" size={32} strokeWidth={3} />
                    <h3 className="text-xl font-black uppercase">EXPERTS</h3>
                    <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Contribute validated study frameworks</p>
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
              <div className="text-center space-y-6">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">THE <span className="bg-brand-primary px-3 border-4 border-brand-dark inline-block rotate-[-2deg]">BRAINS</span> BEHIND IT</h2>
                <p className="text-xl font-bold text-slate-500 max-w-2xl mx-auto">We're a collective of dropouts, dreamers, and data scientists obsessed with human performance.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[
                  { name: 'AXEL V.', role: 'Vision Founder', bio: 'Former cognitive research assistant. Loves brutalist architecture and heavy coffee.', color: 'bg-brand-mint' },
                  { name: 'MIA K.', role: 'AI Architect', bio: 'Neural network wizard. Believes machines can teach humans how to feel again.', color: 'bg-brand-secondary' },
                  { name: 'SORA L.', role: 'Lead Design', bio: 'Converting complex workflows into visual playgrounds since 2018.', color: 'bg-brand-blue' }
                ].map(member => (
                  <div key={member.name} className="group cursor-pointer">
                    <div className={cn("aspect-[4/5] rounded-[48px] border-8 border-brand-dark shadow-[12px_12px_0px_var(--color-brand-dark)] mb-8 transition-all group-hover:-translate-y-4 overflow-hidden relative", member.color)}>
                       <div className="absolute inset-0 flex items-center justify-center text-8xl grayscale opacity-20 filter contrast-125">
                         👤
                       </div>
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-1">{member.name}</h3>
                    <p className="text-sm font-black text-brand-secondary uppercase tracking-[0.2em] mb-4">{member.role}</p>
                    <p className="font-bold text-slate-500 leading-relaxed">{member.bio}</p>
                  </div>
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Free Tier */}
                <div className="brutal-card p-10 bg-white space-y-10 group hover:border-brand-primary transition-all">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase">STUDENT</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">For the lone wolf</p>
                  </div>
                  <div className="text-6xl font-black tracking-tighter">$0 <span className="text-xl text-slate-300 font-bold">/lifetime</span></div>
                  <ul className="space-y-4">
                    {['Unlimited Tasks', '3 AI Roadmaps/Month', 'Standard Buddy Access', 'Pomodoro Timer'].map(f => (
                      <li key={f} className="flex items-center gap-3 font-bold text-slate-600">
                        <Star size={18} fill="currentColor" className="text-brand-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-brand-bg border-4 border-brand-dark rounded-xl font-black uppercase tracking-widest brutal-shadow-sm hover:bg-brand-primary transition-all">Join Free</button>
                </div>

                {/* Pro Tier */}
                <div className="brutal-card p-10 bg-brand-primary scale-110 relative z-10 border-brand-dark shadow-[16px_16px_0px_#2D3436] space-y-10">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-dark text-brand-primary px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs border-2 border-brand-dark">Most Popular</div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase">LEGEND</h3>
                    <p className="text-brand-dark/60 font-bold uppercase tracking-widest text-xs">Full neural unlock</p>
                  </div>
                  <div className="text-6xl font-black tracking-tighter">$12 <span className="text-xl text-brand-dark/40 font-bold">/month</span></div>
                  <ul className="space-y-4">
                    {['Everything in Student', 'Unlimited AI Roadmaps', 'Advanced Buddy Logic', 'Custom AI Personas', 'Dark Mode & Custom Themes', 'Global XP Leaderboards'].map(f => (
                      <li key={f} className="flex items-center gap-3 font-black text-brand-dark">
                        <Zap size={18} fill="currentColor" className="text-brand-secondary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-brand-dark text-brand-primary rounded-xl font-black uppercase tracking-widest border-4 border-brand-dark shadow-[4px_4px_0px_white] hover:translate-y-[-2px] transition-all">Go Legend</button>
                </div>

                {/* Enterprise Tier */}
                <div className="brutal-card p-10 bg-white space-y-10 group hover:border-brand-secondary transition-all">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase">SYNDICATE</h3>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">For teams & classes</p>
                  </div>
                  <div className="text-6xl font-black tracking-tighter">$49 <span className="text-xl text-slate-300 font-bold">/month</span></div>
                  <ul className="space-y-4">
                    {['Up to 10 Legend Accounts', 'Shared Roadmap Library', 'Group Study Channels', 'Admin Dashboard', 'API Access Beta'].map(f => (
                      <li key={f} className="flex items-center gap-3 font-bold text-slate-600">
                        <Users size={18} className="text-brand-secondary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-4 bg-brand-bg border-4 border-brand-dark rounded-xl font-black uppercase tracking-widest brutal-shadow-sm hover:bg-brand-secondary transition-all">Start Syndicate</button>
                </div>
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
                        <p className="text-xl font-black">support@studyya.io</p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white border-4 border-brand-dark rounded-2xl flex items-center justify-center text-brand-dark brutal-shadow-sm">
                        <Globe size={32} />
                      </div>
                      <div>
                        <p className="font-black uppercase tracking-widest text-xs text-slate-400">HQ Location</p>
                        <p className="text-xl font-black">Metaverse, Node 42</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="brutal-card p-12 bg-white space-y-8">
                  <div className="space-y-4">
                    <label className="text-sm font-black uppercase tracking-widest opacity-60">Full Name</label>
                    <input type="text" className="brutal-input w-full p-4 font-bold" placeholder="Axel Rose" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-black uppercase tracking-widest opacity-60">Email Address</label>
                    <input type="email" className="brutal-input w-full p-4 font-bold" placeholder="axel@rock.com" />
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
      <footer className="bg-brand-bg border-t-8 border-brand-dark py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-brand-secondary rounded-xl border-2 border-brand-dark brutal-shadow-sm">
                 <GraduationCap size={24} className="text-white" />
               </div>
               <span className="text-2xl font-black tracking-tighter">STUDYYA</span>
             </div>
             <p className="font-bold text-slate-500 leading-relaxed">The AI-powered command center for ambitious students who refuse to settle for average grades.</p>
             <div className="flex gap-4">
               {[Github, Twitter, Linkedin].map((Icon, i) => (
                 <button key={i} className="p-3 bg-white border-2 border-brand-dark rounded-xl brutal-shadow-sm hover:translate-y-[-2px] active:translate-y-0 transition-all">
                   <Icon size={20} />
                 </button>
               ))}
             </div>
          </div>

          {[
            { title: 'Platform', links: ['Features', 'AI Roadmaps', 'Focus Engine', 'Study Buddy'] },
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
        <div className="max-w-7xl mx-auto pt-24 mt-24 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
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
  const [activeTab, setActiveTab] = useState<any>('dashboard');

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Hub' },
    { id: 'roadmap', icon: MapIcon, label: 'Roadmaps' },
    { id: 'timer', icon: Timer, label: 'Focus' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'chat', icon: MessageCircle, label: 'Buddy' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[800px]">
       <aside className="w-full md:w-64 space-y-4 sticky top-32 h-fit">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all group border-2",
                activeTab === item.id 
                  ? "bg-brand-primary text-brand-dark border-brand-dark brutal-shadow-sm translate-x-2" 
                  : "text-slate-400 border-transparent hover:bg-white hover:text-brand-dark"
              )}
            >
              <item.icon size={24} className={cn(activeTab === item.id ? "text-brand-dark" : "group-hover:text-brand-dark")} />
              <span className="uppercase tracking-tighter text-lg">{item.label}</span>
            </button>
          ))}
       </aside>

       <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <DashboardView onNav={setActiveTab} />}
            {activeTab === 'timer' && <motion.div key="t" initial={{opacity:0}} animate={{opacity:1}} className="flex justify-center py-12"><Pomodoro /></motion.div>}
            {activeTab === 'roadmap' && <motion.div key="r" initial={{opacity:0}} animate={{opacity:1}}><Roadmap /></motion.div>}
            {activeTab === 'tasks' && <motion.div key="ts" initial={{opacity:0}} animate={{opacity:1}}><Tasks /></motion.div>}
            {activeTab === 'chat' && <motion.div key="c" initial={{opacity:0}} animate={{opacity:1}}><Chat /></motion.div>}
          </AnimatePresence>
       </div>
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
                onClick={() => onNav('roadmap')}
                className="brutal-btn flex items-center gap-3 bg-brand-dark"
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
          { label: 'BIOLOGY', icon: '🔬', color: 'bg-brand-mint', count: '12 Modules' },
          { label: 'CALCULUS', icon: '📐', color: 'bg-brand-secondary', count: '8 Modules' },
          { label: 'HISTORY', icon: '🌍', color: 'bg-brand-accent', count: '24 Modules' },
          { label: 'CODING', icon: '💻', color: 'bg-brand-blue', count: '15 Modules' }
        ].map(cat => (
          <div key={cat.label} className={cn("p-8 brutal-card brutal-card-hover cursor-pointer", cat.color)}>
            <div className="text-5xl mb-6">{cat.icon}</div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-1">{cat.label}</h3>
            <p className="text-xs font-black opacity-60 uppercase tracking-widest">{cat.count}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
