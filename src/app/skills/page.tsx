'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const CanvasWrapper = dynamic(() => import('@/components/3d/CanvasWrapper'), { ssr: false });
const SkillSystem = dynamic(() => import('@/components/3d/SkillSystem'), { ssr: false });

export default function SkillsPage() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#020617] overflow-x-hidden">
      {/* Header Info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-x-0 top-24 md:top-28 z-10 text-center pointer-events-none px-6"
      >
        <p className="text-[10px] tracking-[0.4em] sm:tracking-[0.6em] text-cyan-400 font-black mb-3 uppercase opacity-80 leading-tight">
          ✦ Interactive Skills Globe
        </p>
        <h1 className="text-4xl sm:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-500 tracking-tighter sm:tracking-tight uppercase break-words px-2 leading-[0.9]">
          TECH ARSENAL
        </h1>
        <p className="text-slate-500 text-[10px] sm:text-xs mt-4 tracking-[0.2em] sm:tracking-[0.4em] font-black opacity-60 uppercase">
          DRAG TO ORBIT • SCROLL TO ZOOM
        </p>
      </motion.div>

      {/* Right Vertical Instruction Text */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
        style={{ writingMode: 'vertical-rl' }}
      >
        <div className="flex items-center gap-6">
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30" />
          <p className="text-fuchsia-400 text-[10px] font-black tracking-[0.7em] uppercase whitespace-nowrap drop-shadow-[0_0_15px_rgba(255,0,255,0.4)] md:text-[11px]">
            touch the balls then see magic
          </p>
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent opacity-30" />
        </div>
      </motion.div>

      <CanvasWrapper>
        <SkillSystem />
      </CanvasWrapper>
    </div>
  );
}
