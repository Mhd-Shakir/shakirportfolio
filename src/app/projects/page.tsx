'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, Terminal, Cpu, Shield, Rocket, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('@/components/3d/CanvasWrapper'), { ssr: false });
const StarScene = dynamic(() => import('@/components/3d/StarScene'), { ssr: false });

const ICON_MAP: Record<string, any> = { Terminal, Cpu, Shield, Rocket };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProjects(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#020617] overflow-x-hidden pb-24 pt-32 px-4 sm:px-12 md:px-24">
      <CanvasWrapper>
        <StarScene />
      </CanvasWrapper>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-16 text-center md:text-left relative z-10"
      >
        <p className="text-[10px] tracking-[0.4em] text-cyan-400 font-black mb-4 uppercase opacity-80">✦ Selected Works</p>
        <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-6 uppercase">
          Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-indigo-500">Creations</span>
        </h1>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={40} className="text-cyan-400 animate-spin" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {projects.map((project, i) => {
            const Icon = ICON_MAP[project.iconType] || Terminal;
            return (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="relative z-10 h-full p-8 sm:p-12 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform" style={{ color: project.color }}>
                      <Icon size={28} />
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase px-4 py-2 bg-white/5 rounded-full">0{i+1}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors tracking-tighter">{project.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-10 font-medium line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.techStack.map((t: string) => (
                      <span key={t} className="text-[9px] font-black px-4 py-2 rounded-xl bg-white/5 text-slate-300 border border-white/5 uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-auto">
                    <a href={project.liveUrl} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95">
                      <ExternalLink size={14} /> Preview
                    </a>
                    <a href={project.githubUrl} target="_blank" className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all active:scale-95">
                      <GitBranch size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
