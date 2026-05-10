'use client';

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { PROJECTS } from '../data';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <SectionLabel text="Featured Projects" />
      <h2 className="section-heading mb-12">
        Selected <span className="text-accent">Work</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group block"
          >
            <div className="relative rounded-2xl overflow-hidden technical-border bg-surface hover:border-white/20 transition-colors">
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <div className="absolute top-4 left-4 h-7 px-3 flex items-center gap-2 technical-border rounded-full bg-black/60 backdrop-blur-sm">
                  <span className="font-mono text-[9px] font-bold tracking-widest text-accent">{project.id}</span>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={14} />
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-full technical-border bg-white/[0.03] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
