'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function Navigation() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl py-3 px-5 sm:px-10 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <Link href="/" className="hidden md:flex items-center gap-2 group transition-all shrink-0">
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 border border-white/5 transition-all">
              <Home size={14} className="text-cyan-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-lg md:text-xl font-black tracking-[0.2em] text-white hover:text-cyan-400 transition-all drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]">
              SHAKIR<span className="text-fuchsia-500 font-black">.</span>
            </span>
          </Link>
          
          <div className="flex gap-4 md:gap-8 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 overflow-x-auto max-w-full pb-0.5 md:pb-0 px-2 justify-center hide-scrollbar">
            <Link href="/about" className="hover:text-fuchsia-400 transition-colors py-2 relative group whitespace-nowrap">
              About
            </Link>
            <Link href="/skills" className="hover:text-cyan-400 transition-colors py-2 relative group whitespace-nowrap">
              Skills
            </Link>
            <Link href="/projects" className="hover:text-fuchsia-400 transition-colors py-2 relative group whitespace-nowrap">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors py-2 relative group whitespace-nowrap">
              Contact
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
