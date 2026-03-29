import { motion } from 'motion/react';
import { SectionLabel } from './SectionLabel';
import { SKILLS } from '../data';

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto">
      <SectionLabel  text="Skills & Tools" />
      <h2 className="section-heading mb-12">
        My <span className="text-accent">Toolkit</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="technical-border rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
              <group.icon size={18} className="text-accent" />
            </div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4">{group.category}</h3>
            <div className="space-y-2.5">
              {group.items.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent/50" />
                  <span className="text-muted text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
