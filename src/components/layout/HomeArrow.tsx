'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function HomeArrow() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <AnimatePresence>
      {!isHome && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-8 left-8 z-50"
        >
          <Link 
            href="/"
            className="flex items-center gap-3 px-5 py-3 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full text-white/50 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all group pointer-events-auto"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase">Home</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
