'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function HomeButton() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className="fixed top-24 left-6 md:left-12 z-[60] pointer-events-auto"
    >
      <Link href="/" className="group flex items-center gap-3 px-5 py-2.5 glassmorphism rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all shadow-2xl backdrop-blur-2xl">
        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
          <ArrowLeft size={16} className="text-white group-hover:text-black transition-colors" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-cyan-400 pb-0.5 transition-colors">Navigation</span>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Back to Home</span>
        </div>
      </Link>
    </motion.div>
  );
}
