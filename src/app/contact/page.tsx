'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { GitBranch, Briefcase, Camera, Mail, Send } from 'lucide-react';
import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('@/components/3d/CanvasWrapper'), { ssr: false });
const StarScene = dynamic(() => import('@/components/3d/StarScene'), { ssr: false });

const SOCIALS = [
  { icon: GitBranch, label: 'GitHub', href: 'https://github.com/murshidmm34-spec', color: '#ffffff' },
  { icon: Briefcase, label: 'LinkedIn', href: 'https://linkedin.com/in/murshid-m', color: '#0077b5' },
  { icon: Camera, label: 'Instagram', href: 'https://instagram.com/__murshid__m___', color: '#e1306c' },
  { icon: Mail, label: 'Email', href: 'mailto:murshidmm34@gmail.com', color: '#00ffff' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        alert('Transmission Failure across Satellites. Try again.');
        setStatus('idle');
      }
    } catch (err) {
      alert('Network error. Check Link.');
      setStatus('idle');
    }
  };

  return (
    <div className="w-full h-full relative overflow-auto bg-[#020617] overflow-x-hidden pt-28 sm:pt-36">
      {/* 3D Global Star Background */}
      <CanvasWrapper>
        <StarScene />
      </CanvasWrapper>

      <div className="relative z-10 min-h-full flex items-center justify-center px-4 sm:px-10 pb-28 md:pb-36">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14 md:mb-20 px-2"
          >
            <p className="text-[10px] tracking-[0.4em] text-cyan-400 font-extrabold mb-4 uppercase opacity-80">✦ GET IN TOUCH</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500 uppercase tracking-tighter leading-tight break-words">
              CONTACT ME
            </h1>
            <p className="text-slate-400 mt-6 text-xs sm:text-lg max-w-xl mx-auto px-2 font-medium leading-relaxed opacity-90">
              Have a project in mind? Let's build something extraordinary together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
            >
              <h2 className="text-white font-black text-lg sm:text-xl mb-8 flex items-center gap-3 uppercase tracking-tighter">
                <Send size={18} className="text-cyan-400" /> Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 text-[10px] sm:text-[11px] tracking-widest font-black uppercase">YOUR NAME</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-2xl px-5 py-4 text-xs sm:text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 text-[10px] sm:text-[11px] tracking-widest font-black uppercase">EMAIL ADDRESS</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="hello@shakir.dev"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-2xl px-5 py-4 text-xs sm:text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 text-[10px] sm:text-[11px] tracking-widest font-black uppercase">YOUR PHONE</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 000 000 0000"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-2xl px-5 py-4 text-xs sm:text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 text-[10px] sm:text-[11px] tracking-widest font-black uppercase">MESSAGE</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Describe your project goals..."
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-2xl px-5 py-4 text-xs sm:text-sm focus:outline-none focus:border-cyan-500/50 transition-all resize-none font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="mt-4 w-full py-4 sm:py-5 bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white font-black rounded-2xl text-[10px] sm:text-[11px] tracking-[.3em] uppercase hover:scale-[1.02] transition-all shadow-xl active:scale-95"
                >
                  {status === 'sending' ? '✦ TRANSMITTING...' : status === 'sent' ? '✓ MESSAGE RECEIVED!' : '✦ DISPATCH MESSAGE'}
                </button>
              </form>
            </motion.div>

            {/* Social / Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-6 sm:gap-8"
            >
              <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl">
                <h2 className="text-white font-black text-lg sm:text-xl mb-8 uppercase tracking-tighter">Digital Presence</h2>
                <div className="flex flex-col gap-3 sm:gap-4">
                  {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-[1.5rem] bg-white/5 hover:bg-white/10 border border-white/5 transition-all group pointer-events-auto"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                        <Icon size={isMobileSize() ? 16 : 20} style={{ color }} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-300 text-xs sm:text-sm font-bold group-hover:text-white transition-colors uppercase tracking-widest leading-none">{label}</span>
                        <span className="text-[7px] sm:text-[9px] text-slate-500 font-black tracking-tight mt-1">CONNECT ON {label.toUpperCase()}</span>
                      </div>
                      <span className="ml-auto text-slate-700 text-[10px] sm:text-sm">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <h2 className="text-white font-black text-base sm:text-lg mb-4 uppercase tracking-tighter">Located in Kerala, India</h2>
                <p className="text-slate-400 text-[11px] sm:text-base leading-relaxed font-medium">
                  Operating globally from South India. Ready for remote collaborations.
                </p>
                <div className="mt-8 flex gap-2.5 flex-wrap">
                  {['MERN Stack', 'Next.js 15', 'Native'].map(tag => (
                    <span key={tag} className="text-[8px] font-black px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-500 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function isMobileSize() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
}
