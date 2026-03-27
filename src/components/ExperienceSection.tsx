import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { EXPERIENCE } from '../data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding max-w-7xl mx-auto">
      <SectionLabel number="04" text="Experience" />
      <h2 className="section-heading mb-12">
        Work <span className="text-accent">History</span>
      </h2>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline Dot */}
              <div className="absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-ink" />

              <div className="technical-border rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display text-base font-bold">{exp.role}</h3>
                    <p className="text-accent text-sm font-medium">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-4 text-muted">
                    <span className="flex items-center gap-1.5 text-xs font-mono">
                      <Calendar size={12} /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-muted text-sm leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-accent/50 mt-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
