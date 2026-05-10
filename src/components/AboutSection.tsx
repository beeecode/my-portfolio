'use client';

import { motion } from 'motion/react';
import { SectionLabel } from './SectionLabel';

export default function AboutSection() {
  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <SectionLabel text="About Me" />

      <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Text / Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <div>
            <h2 className="font-display text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-6">
              Logic <br />
              <span className="italic text-accent font-serif tracking-normal font-light">Emotion</span>
            </h2>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent/80 font-bold">
              Code Your Reality
            </p>
          </div>

          <div className="space-y-6 text-muted leading-relaxed text-[15px] sm:text-base border-l border-white/10 pl-6 md:pl-8">
            <p>
              I am Abdulhameed Sherif, a full stack developer based in Nigeria. To me, building software isn't just about what the user sees — it's about the entire system that powers it. Over the last two years, I've worked across the React and Next.js ecosystems on the frontend, and Node.js, Express, and PostgreSQL on the backend, shipping complete, production-ready applications.
            </p>
            <p>
              My approach bridges raw technical architecture with human-centered design. Whether I'm designing REST APIs, modelling database schemas, or crafting fluid 60FPS interfaces, my philosophy stays constant: <strong className="text-paper font-medium">every layer of the stack should serve the user invisibly.</strong>
            </p>
          </div>
        </motion.div>

        {/* Image / Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div
            className="absolute -right-8 top-0 w-[120%] h-full dot-grid-bg opacity-40 pointer-events-none"
            style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }}
          />

          <div className="relative z-10 w-full max-w-sm ml-auto">
            <div className="aspect-[3/4] overflow-hidden technical-border relative grayscale contrast-125 hover:grayscale-0 hover:contrast-100 transition-all duration-700">
              <img src="/Beecode-Dp.jpg" alt="Abdulhameed Sherif" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
