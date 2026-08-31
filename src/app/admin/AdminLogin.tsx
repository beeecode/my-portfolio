'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) });
    const result = await response.json();
    if (response.ok) window.location.reload(); else { setError(result.error); setLoading(false); }
  }
  return <main className="min-h-screen bg-ink text-paper dot-grid-bg grid place-items-center p-5">
    <div className="w-full max-w-md technical-border rounded-[2rem] bg-surface/90 p-7 sm:p-10 shadow-2xl">
      <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent grid place-items-center mb-8"><LockKeyhole size={20} /></div>
      <p className="font-mono text-[10px] uppercase tracking-[.25em] text-accent mb-3">Portfolio CMS</p>
      <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
      <p className="text-muted text-sm mb-8">Sign in to manage your portfolio content.</p>
      <form onSubmit={submit} className="space-y-5">
        <label className="block"><span className="admin-label">Email</span><input name="email" type="email" required autoComplete="username" className="admin-input" /></label>
        <label className="block"><span className="admin-label">Password</span><input name="password" type="password" required autoComplete="current-password" className="admin-input" /></label>
        {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}
        <button disabled={loading} className="w-full h-12 rounded-xl bg-accent text-ink font-display font-bold flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-60 transition">{loading ? 'Signing in…' : 'Sign in'} <ArrowRight size={16}/></button>
      </form>
      <a href="/" className="block text-center mt-6 text-xs text-muted hover:text-paper">Return to portfolio</a>
    </div>
  </main>;
}
