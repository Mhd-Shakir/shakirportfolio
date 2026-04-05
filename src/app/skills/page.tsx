'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SKILLS } from '@/lib/skills-data';

const CanvasWrapper = dynamic(() => import('@/components/3d/CanvasWrapper'), { ssr: false });
const SkillSystem = dynamic(() => import('@/components/3d/SkillSystem'), { ssr: false });

export default function SkillsPage() {
  const [showSkills, setShowSkills] = useState(false);

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

      {/* Skill Button and List Overlay */}
      <div className="absolute bottom-10 right-10 z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex flex-col items-end"
        >
          {/* Skills List Overlay */}
          <motion.div
            initial={false}
            animate={{ 
              height: showSkills ? 'auto' : 0,
              opacity: showSkills ? 1 : 0,
              y: showSkills ? 0 : 20
            }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="overflow-hidden mb-4 mr-2"
          >
            <div className="bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 w-80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <h3 className="text-white font-black text-xs tracking-[0.3em] mb-6 uppercase flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                Skill Proficiency
              </h3>
              <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {SKILLS.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 group-hover:text-white transition-colors">
                      <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">{skill.name}</span>
                      <span className="text-cyan-400">{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: showSkills ? `${skill.proficiency}%` : 0 }}
                        transition={{ duration: 1, delay: showSkills ? index * 0.05 : 0, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Toggle Button */}
          <button
            onClick={() => setShowSkills(!showSkills)}
            className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all active:scale-95 overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-indigo-500/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative text-white font-black text-[10px] tracking-[0.4em] uppercase">
              {showSkills ? 'Close' : 'View Skills'}
            </span>
            <div className={`relative w-2 h-2 rounded-full transition-all duration-500 ${showSkills ? 'bg-fuchsia-500 rotate-[135deg] scale-125' : 'bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]'}`} />
          </button>
        </motion.div>
      </div>

      <CanvasWrapper>
        <SkillSystem />
      </CanvasWrapper>
    </div>
  );
}
