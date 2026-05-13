'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { NAV_LINKS, SOCIALS } from '../data';

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 relative overflow-hidden">
      <nav className="flex flex-row md:flex-col items-center justify-between md:justify-start w-full md:w-auto p-3 md:py-6 md:px-3 mb-6 md:mb-0 relative md:fixed md:left-6 md:top-1/2 md:-translate-y-1/2 z-50 bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-full shadow-2xl">
        <a href="#" className="font-display font-bold text-xs tracking-widest flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:mb-6 text-accent shrink-0">
          AS
        </a>
        <div className="flex flex-row md:flex-col gap-1 sm:gap-2 md:gap-3 flex-1 justify-center md:flex-none">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-muted hover:text-paper hover:bg-white/10 hover:shadow-sm transition-all group relative"
            >
              <link.icon size={18} strokeWidth={2} className="opacity-80 group-hover:opacity-100" />
              <span className="absolute left-14 px-3 py-1.5 bg-surface border border-white/10 rounded-lg text-[10px] font-mono uppercase tracking-wider opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-xl hidden sm:block">
                {link.label}
              </span>
            </a>
          ))}
        </div>
        <div className="flex flex-row md:flex-col border-l md:border-l-0 md:border-t border-white/10 pl-3 md:pl-0 md:pt-6 ml-1 md:ml-0 md:mt-6 shrink-0">
          <a href="#contact" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-accent transition-all group relative">
            <img src="/Beecode-Dp.jpg" alt="Let's Talk" className="w-full h-full object-cover" />
            <span className="absolute left-14 px-3 py-1.5 bg-surface border border-white/10 rounded-lg text-[10px] font-mono uppercase tracking-wider opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-50 shadow-xl hidden sm:block">
              Let's Talk
            </span>
          </a>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full max-w-5xl min-h-[600px] md:aspect-[4/3] bg-black/40 backdrop-blur-xl rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-12 overflow-hidden technical-border flex flex-col"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/Beecode-Dp.jpg"
            alt="Profile Background"
            className="w-full h-full object-cover object-top opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        </div>

        <div className="relative z-10 flex justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] md:text-xs tracking-tighter opacity-80">1/06</span>
            <div className="w-20 sm:w-32 h-[1px] bg-white/20 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "16.6%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-0 left-0 h-full bg-white"
              />
            </div>
          </div>
          <a href="#about" className="flex items-center gap-2 group cursor-pointer">
            <span className="font-display text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-accent transition-colors">Explore</span>
            <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="flex-1 flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 relative z-10">
          <div className="md:col-span-7 lg:col-span-8 flex flex-col">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-2xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-[0.9] tracking-tight mb-6 uppercase"
            >
              ABDULHAMEED <br />
              SHERIF// <br />
              FULL STACK
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted text-sm sm:text-base leading-relaxed max-w-md mb-8"
            >
              Full Stack Developer with 2+ years of experience building end-to-end web applications — from pixel-accurate React interfaces to scalable Node.js APIs and database architectures. Specializing in React, Next.js, TypeScript, and Express with a focus on performance and clean code.
            </motion.p>

            <div className="flex gap-3 mb-8 md:mb-0">
              {SOCIALS.slice(0, 3).map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full technical-border flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} className="opacity-80" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-center">
            <div className="technical-border bg-white/[0.02] p-6 rounded-2xl md:bg-transparent md:border-0 md:p-0">
              <h3 className="font-display text-[10px] uppercase tracking-[0.2em] font-bold mb-6 opacity-60">Technical Specs</h3>
              <div className="space-y-5">
                {[
                  { label: "Core Stack", value: "React / Next.js / TS" },
                  { label: "Backend", value: "Node.js / Express" },
                  { label: "Database", value: "PostgreSQL / Prisma" },
                  { label: "Performance", value: "Core Web Vitals" }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-baseline group cursor-default border-b border-white/5 pb-2">
                    <span className="text-muted text-xs font-medium uppercase tracking-wider">{spec.label}</span>
                    <span className="text-xs sm:text-sm font-medium tracking-tight text-right group-hover:text-accent transition-colors">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-auto flex flex-col lg:flex-row justify-between items-stretch lg:items-end gap-6 sm:gap-8 relative z-10">
          <a href="#projects">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full lg:w-80 bg-white/5 rounded-2xl p-4 technical-border flex gap-4 items-center group cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-zinc-900 overflow-hidden relative shrink-0">
                <img
                  src="/img002.png"
                  alt="Project Preview"
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-[10px] font-bold uppercase tracking-wider mb-1 truncate">VIEW MY WORK</h4>
                <p className="text-[10px] text-muted leading-tight mb-3 line-clamp-2">Explore projects built with modern tech and clean code</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase tracking-widest">
                  Projects <ArrowRight size={10} />
                </div>
              </div>
            </motion.div>
          </a>

          <div className="flex flex-wrap justify-start lg:justify-end gap-2 sm:gap-3">
            {[
              { label: "REACT", sub: "19" },
              { label: "NEXT.JS", sub: "16" },
              { label: "NODE.JS", sub: "LTS" },
              { label: "TAILWIND", sub: "V4" }
            ].map((tag, i) => (
              <div key={i} className="flex items-center">
                <div className="h-7 px-3 flex items-center gap-2 technical-border rounded-l-full bg-white/5">
                  <span className="font-mono text-[9px] font-bold tracking-widest">{tag.label}</span>
                </div>
                <div className="h-7 px-2 flex items-center technical-border border-l-0 rounded-r-full bg-white/[0.02]">
                  <span className="font-mono text-[9px] opacity-50">{tag.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-6 left-6 md:top-10 md:left-10 w-4 h-4 border-t border-l border-white/20" />
          <div className="absolute top-6 right-6 md:top-10 md:right-10 w-4 h-4 border-t border-r border-white/20" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-4 h-4 border-b border-l border-white/20" />
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-4 h-4 border-b border-r border-white/20" />
        </div>

        <div className="absolute inset-0 pointer-events-none dot-grid-bg" />
      </motion.div>
    </section>
  );
}
