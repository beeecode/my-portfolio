'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionLabel } from './SectionLabel';
import type { PortfolioContent } from '@/lib/portfolio';

export default function ContactSection({ settings }: { settings: PortfolioContent['settings'] }) {
  const socials = [
    { icon: Linkedin, label: 'LinkedIn', href: settings.linkedInUrl },
    { icon: Github, label: 'GitHub', href: settings.githubUrl },
    { icon: Mail, label: 'Email', href: `mailto:${settings.email}` },
  ];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMsg, setFormMsg] = useState('');

  const [typewriterText, setTypewriterText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const typewriterRef = useRef<number | null>(null);
  const transmissionId = useRef<string>('');

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
        transmissionId.current = Math.random().toString(36).slice(2, 10).toUpperCase();
        setTypewriterText('');
        setShowDetails(false);
        setFormData({ name: '', email: '', message: '' });
        setFormStatus('success');
        setFormMsg(data.message || 'Message sent!');
      } else {
        setFormStatus('error');
        setFormMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setFormStatus('error');
      setFormMsg('Network error. Please try again.');
    }
  };

  // Typewriter when success overlay appears
  useEffect(() => {
    if (formStatus !== 'success') return;

    const fullText = 'TRANSMISSION COMPLETE';
    let i = 0;
    const delay = window.setTimeout(() => {
      typewriterRef.current = window.setInterval(() => {
        i++;
        setTypewriterText(fullText.slice(0, i));
        if (i >= fullText.length) {
          if (typewriterRef.current) clearInterval(typewriterRef.current);
          window.setTimeout(() => setShowDetails(true), 200);
        }
      }, 55);
    }, 400);

    // Auto-reset after 4.5s
    const reset = window.setTimeout(() => {
      if (typewriterRef.current) clearInterval(typewriterRef.current);
      setFormStatus('idle');
      setTypewriterText('');
      setShowDetails(false);
    }, 4500);

    return () => {
      clearTimeout(delay);
      clearTimeout(reset);
      if (typewriterRef.current) clearInterval(typewriterRef.current);
    };
  }, [formStatus]);

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <SectionLabel text="Get In Touch" />
      <div className="grid md:grid-cols-12 gap-12">
        {/* Left */}
        <div className="md:col-span-5 space-y-6">
          <h2 className="section-heading">
            {settings.contactHeading}
          </h2>
          <p className="text-muted leading-relaxed max-w-md">
            {settings.contactText}
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            {socials.map(({ icon: Icon, label, href }) => (
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

        {/* Right: Form + Success overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 relative"
        >
          {/* ── FORM ── */}
          <form
            onSubmit={handleSubmit}
            className="technical-border rounded-2xl p-6 sm:p-8 bg-white/[0.02] space-y-5"
          >
            {formStatus === 'error' && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">
                ✕ {formMsg}
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted mb-2">Name</label>
                <input
                  type="text"
                  placeholder="BEECODE"
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
                  placeholder="Beecode@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full h-11 px-4 rounded-xl bg-white/[0.05] technical-border text-sm font-sans text-paper placeholder:text-muted/50 outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>
            <div>
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
            <button
              type="submit"
              disabled={formStatus === 'loading' || formStatus === 'success'}
              className="flex items-center justify-center gap-2 w-full sm:w-auto h-11 px-8 rounded-full technical-border border-accent/50 bg-accent/10 text-accent font-display font-bold text-sm uppercase tracking-wider hover:bg-accent hover:text-ink transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formStatus === 'loading' ? 'Sending...' : 'Send Message'} <Send size={14} />
            </button>
          </form>

          {/* ── SUCCESS OVERLAY ── */}
          <AnimatePresence>
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-2xl bg-ink border border-white/10 flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Dot grid */}
                <div className="absolute inset-0 success-grid-bg opacity-60" />

                {/* Scanline */}
                <div className="success-scanline active" />

                {/* Corner brackets */}
                <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-paper/40" />
                <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-paper/40" />
                <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-paper/40" />
                <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-paper/40" />

                {/* Signal rings + core */}
                <div className="relative flex items-center justify-center mb-8">
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="signal-ring active"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    />
                  ))}
                  <div className="signal-core active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-7 h-7">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10 text-center px-6">
                  <p className="font-mono text-[9px] text-paper/40 tracking-[0.3em] uppercase mb-2">Signal Status</p>
                  <span className="font-mono text-xl sm:text-2xl font-bold tracking-[0.15em] text-paper uppercase">
                    {typewriterText}
                  </span>
                  <span className="typewriter-cursor" />

                  {/* Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 8 }}
                    transition={{ duration: 0.4 }}
                    className="mt-5"
                  >
                    <div className="inline-flex flex-col gap-1.5 border border-white/10 rounded-xl px-5 py-3 bg-white/[0.03]">
                      <div className="flex items-center justify-between gap-8">
                        <span className="font-mono text-[9px] text-paper/40 tracking-wider uppercase">REF ID</span>
                        <span className="font-mono text-[9px] text-paper tracking-wider">{transmissionId.current}</span>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <span className="font-mono text-[9px] text-paper/40 tracking-wider uppercase">STATUS</span>
                        <span className="font-mono text-[9px] text-green-400 tracking-wider">● DELIVERED</span>
                      </div>
                      <div className="flex items-center justify-between gap-8">
                        <span className="font-mono text-[9px] text-paper/40 tracking-wider uppercase">CHANNEL</span>
                        <span className="font-mono text-[9px] text-paper/60 tracking-wider">ENCRYPTED</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
