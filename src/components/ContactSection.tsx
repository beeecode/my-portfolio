import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionLabel } from './SectionLabel';
import { SOCIALS } from '../data';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMsg, setFormMsg] = useState('');

  // Animation states
  const [animPhase, setAnimPhase] = useState<'idle' | 'glitch' | 'flipped' | 'plane' | 'fadeOut' | 'flipBack'>('idle');
  const [typewriterText, setTypewriterText] = useState('');
  const typewriterRef = useRef<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setFormStatus('success');
        setFormMsg(data.message || 'Message sent!');
        setFormData({ name: '', email: '', message: '' });
        // Kick off the cinematic sequence
        setAnimPhase('glitch');
      } else {
        setFormStatus('error');
        setFormMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setFormStatus('error');
      setFormMsg('Network error. Please try again.');
    }
  };

  // Orchestrate the animation sequence
  useEffect(() => {
    if (animPhase === 'glitch') {
      const t = window.setTimeout(() => setAnimPhase('flipped'), 450);
      return () => clearTimeout(t);
    }
    if (animPhase === 'flipped') {
      const fullText = 'MESSAGE RECEIVED';
      let i = 0;
      setTypewriterText('');
      typewriterRef.current = window.setInterval(() => {
        i++;
        setTypewriterText(fullText.slice(0, i));
        if (i >= fullText.length) {
          if (typewriterRef.current) clearInterval(typewriterRef.current);
          setTimeout(() => setAnimPhase('plane'), 200);
        }
      }, 50);
      return () => { if (typewriterRef.current) clearInterval(typewriterRef.current); };
    }
    if (animPhase === 'plane') {
      const t = window.setTimeout(() => setAnimPhase('fadeOut'), 1200);
      return () => clearTimeout(t);
    }
    if (animPhase === 'fadeOut') {
      const t = window.setTimeout(() => setAnimPhase('flipBack'), 350);
      return () => clearTimeout(t);
    }
    if (animPhase === 'flipBack') {
      const t = window.setTimeout(() => {
        setAnimPhase('idle');
        setFormStatus('idle');
        setFormMsg('');
        setTypewriterText('');
      }, 650);
      return () => clearTimeout(t);
    }
  }, [animPhase]);

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <SectionLabel  text="Get In Touch" />
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-6">
          <h2 className="section-heading">
            Let's Build <span className="text-accent">Together</span>
          </h2>
          <p className="text-muted leading-relaxed max-w-md">
            Got a project in mind? I'm always open to collaborating on exciting ideas or discussing new opportunities. Drop me a message and let's create something remarkable.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 h-10 px-4 rounded-full technical-border bg-white/[0.03] hover:bg-white/[0.08] transition-colors text-sm text-muted hover:text-paper"
              >
                <Icon size={14} />
                <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7"
        >
          <div className="form-flip-container">
            <div className={`form-flip-inner ${animPhase === 'flipped' || animPhase === 'plane' || animPhase === 'fadeOut' ? 'flipped' : ''}`}>
              <div className="form-front">
                <form
                  onSubmit={handleSubmit}
                  className="technical-border rounded-2xl p-6 sm:p-8 bg-white/[0.02] space-y-5"
                >
                  {formStatus === 'error' && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">
                      ✕ {formMsg}
                    </div>
                  )}
                  <div className={`grid sm:grid-cols-2 gap-5 ${animPhase === 'glitch' ? 'glitch-dissolve' : ''}`}>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        maxLength={100}
                        className="w-full h-11 px-4 rounded-xl bg-white/[0.05] technical-border text-sm font-sans text-paper placeholder:text-muted/50 outline-none focus:border-accent/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full h-11 px-4 rounded-xl bg-white/[0.05] technical-border text-sm font-sans text-paper placeholder:text-muted/50 outline-none focus:border-accent/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className={animPhase === 'glitch' ? 'glitch-dissolve' : ''} style={{ animationDelay: '0.05s' }}>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      maxLength={2000}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] technical-border text-sm font-sans text-paper placeholder:text-muted/50 outline-none focus:border-accent/50 transition-colors resize-none"
                    />
                  </div>
                  <div className={animPhase === 'glitch' ? 'glitch-dissolve' : ''} style={{ animationDelay: '0.1s' }}>
                    <button
                      type="submit"
                      disabled={formStatus === 'loading' || animPhase !== 'idle'}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto h-11 px-8 rounded-full bg-accent text-ink font-display font-bold text-sm uppercase tracking-wider hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'loading' ? 'Sending...' : 'Send Message'} <Send size={14} />
                    </button>
                  </div>
                </form>
              </div>

              <div className="form-back">
                <div className={animPhase === 'fadeOut' ? 'radar-fade-out' : ''}>
                  <div className={`radar-ring ${animPhase === 'flipped' || animPhase === 'plane' ? 'active' : ''}`} />
                  <div className={`radar-ring ${animPhase === 'flipped' || animPhase === 'plane' ? 'active' : ''}`} />
                  <div className={`radar-ring ${animPhase === 'flipped' || animPhase === 'plane' ? 'active' : ''}`} />
                  <div className={`radar-ring ${animPhase === 'flipped' || animPhase === 'plane' ? 'active' : ''}`} />
                  <div className={`radar-center ${animPhase === 'flipped' || animPhase === 'plane' ? 'active' : ''}`} />
                </div>

                <div className="relative z-10 text-center px-4">
                  <span className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.15em] text-accent uppercase">
                    {typewriterText}
                  </span>
                  {(animPhase === 'flipped' || animPhase === 'plane') && (
                    <span className="typewriter-cursor" />
                  )}
                </div>

                <svg className={`paper-plane ${animPhase === 'plane' ? 'active' : ''}`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                <svg className={`plane-trail ${animPhase === 'plane' ? 'active' : ''}`} viewBox="0 0 600 300" preserveAspectRatio="none">
                  <path d="M 0 280 C 80 200, 200 100, 350 50 S 500 -30, 600 -80" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
