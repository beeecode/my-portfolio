'use client';

import { motion } from 'motion/react';
import { SectionLabel } from './SectionLabel';
import { Code2, Globe, Layers, Server } from 'lucide-react';
import type { PortfolioContent } from '@/lib/portfolio';

const icons = { code: Code2, layers: Layers, server: Server, globe: Globe };

export default function SkillsSection({ groups }: { groups: PortfolioContent['skillGroups'] }) {
  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto">
      <SectionLabel text="Skills & Tools" />
      <h2 className="section-heading mb-12">
        My <span className="text-accent">Toolkit</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((group, i) => {
          const IconComponent = icons[group.icon as keyof typeof icons] || Code2;
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="technical-border rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <IconComponent size={18} className="text-accent" />
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4">{group.name}</h3>
              <div className="space-y-3">
                {group.skills.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <i
                      className={`${item.iconClass} text-lg leading-none`}
                      style={{ fontSize: '1.1rem' }}
                    />
                    <span className="text-muted text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
