'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('@/components/3d/CanvasWrapper'), { ssr: false });
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), { ssr: false });

export default function HomePage() {
  const [showScrollMsg, setShowScrollMsg] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleGesture = (e: any) => {
      // Ignore if clicking/touching buttons or links
      const isInteractive = e.target.closest('button') || e.target.closest('a') || e.target.closest('nav');
      if (isInteractive) return;

      setShowScrollMsg(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowScrollMsg(false), 2000);
    };

    window.addEventListener('wheel', handleGesture, { passive: true });
    // Only trigger message on actual vertical movement, not just tap
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (Math.abs(touchY - touchStartY) > 10) {
        handleGesture(e);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleGesture);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-end sm:justify-center bg-[#020617] px-4 pb-20 sm:pb-0">
      {/* Scroll notification - FIXED POSITION AND ANIMATION */}
      <AnimatePresence>
        {showScrollMsg && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-8 py-3.5 bg-black/90 backdrop-blur-3xl rounded-full border border-cyan-500/50 text-cyan-400 font-black tracking-[0.3em] text-[10px] sm:text-xs uppercase shadow-[0_-10px_40px_rgba(0,255,255,0.3)] pointer-events-none whitespace-nowrap"
          >
            ✦ sorry guys not scrolling here
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero content overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start text-center md:text-left pointer-events-none mb-24 md:mb-0">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="flex flex-col gap-4 md:gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3 justify-center md:justify-start"
          >
            <span className="w-8 h-[2px] bg-cyan-400 hidden sm:block" />
            <p className="text-[10px] sm:text-xs font-black tracking-[0.4em] text-cyan-400 uppercase leading-none">
               Senior Full-Stack Engineer
            </p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-[2.2rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <span className="text-white block">MUHAMMED</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500 pb-2 md:pb-6">
               SHAKIR
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-slate-400 max-w-sm sm:max-w-lg text-[11px] sm:text-lg lg:text-xl leading-relaxed md:border-l-2 border-fuchsia-500 md:pl-8 px-4 md:px-0 font-medium opacity-80"
          >
            Building immersive 3D architectures, resilient engineering solutions, and premium digital legacies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap gap-4 mt-8 sm:mt-14 justify-center md:justify-start pointer-events-auto"
          >
            <Link href="/projects"
              className="px-8 sm:px-14 py-4 sm:py-5 bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-[0_15px_50px_rgba(0,255,255,0.4)] text-[10px] sm:text-sm tracking-[0.3em] uppercase shadow-lg active:scale-95 transition-all text-center"
            >
              PROJECTS
            </Link>
            <Link href="/contact"
              className="px-8 sm:px-14 py-4 sm:py-5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/5 hover:border-white/30 transition-all text-[10px] sm:text-sm tracking-[0.3em] uppercase backdrop-blur-md active:scale-95 text-center"
            >
              CONTACT
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Localized scene */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <CanvasWrapper>
          <HeroScene />
        </CanvasWrapper>
      </div>
    </div>
  );
}
