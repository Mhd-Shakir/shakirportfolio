'use client';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, Server } from 'lucide-react';
import dynamic from 'next/dynamic';

const CanvasWrapper = dynamic(() => import('@/components/3d/CanvasWrapper'), { ssr: false });
const StarScene = dynamic(() => import('@/components/3d/StarScene'), { ssr: false });

const TIMELINE = [
  { year: '2024–Present', role: 'Full-Stack Engineer', company: 'Freelance', desc: 'Building scalable MERN apps, Next.js platforms and React Native mobile apps for global clients.' },
  { year: '2023–2024', role: 'MERN Stack Developer', company: 'Tech Startup', desc: 'Led frontend architecture, REST API design and MongoDB schema optimization for a SaaS platform.' },
  { year: '2022–2023', role: 'Junior Web Developer', company: 'Digital Agency', desc: 'Developed responsive web applications and e-commerce stores using React, Node.js and Express.' },
];

const HIGHLIGHTS = [
  { icon: Globe, label: 'Next.js Apps Built', value: '20+', color: '#00ffff' },
  { icon: Server, label: 'APIs Developed', value: '50+', color: '#ff00ff' },
  { icon: Smartphone, label: 'Mobile Apps', value: '8+', color: '#7c3aed' },
  { icon: Code2, label: 'Years Experience', value: '3+', color: '#f59e0b' },
];

export default function AboutPage() {
  return (
    <div className="w-full h-full relative overflow-auto bg-[#020617] overflow-x-hidden">
      {/* 3D Global Star Background */}
      <CanvasWrapper>
        <StarScene />
      </CanvasWrapper>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-28 md:py-36">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16 md:mb-24"
        >
          <p className="text-[10px] tracking-[0.4em] text-fuchsia-400 font-extrabold mb-4 uppercase min-w-full opacity-80">✦ ABOUT ME</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-indigo-500 mb-8 uppercase px-2 leading-tight">
            MUHAMMED SHAKIR
          </h1>
          <p className="text-slate-300 text-sm sm:text-xl max-w-3xl mx-auto leading-relaxed font-medium opacity-90 px-2 lg:px-0">
            Senior MERN Stack & Next.js Developer from Kerala, India. I build fast, scalable, and visually stunning web and mobile applications that solve real-world problems.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20"
        >
          {HIGHLIGHTS.map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 text-center hover:border-white/20 transition-all hover:bg-white/[0.05] shadow-xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4" style={{ color }}>
                <Icon size={20} />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">{value}</p>
              <p className="text-[9px] text-slate-500 mt-2 font-black tracking-[0.2em] uppercase leading-relaxed">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
          >
            <h2 className="text-white font-black text-lg sm:text-xl mb-6 flex items-center gap-3 uppercase tracking-tighter">
              <span className="text-cyan-400 tracking-tighter">{'//'}</span> My Story
            </h2>
            <div className="flex flex-col gap-5 text-slate-400 text-xs sm:text-base leading-relaxed font-medium">
              <p>
                I'm a passionate full-stack developer specializing in the MERN ecosystem and Next.js. With 3+ years of experience, I've helped startups and businesses transform their ideas into robust digital products.
              </p>
              <p>
                My expertise spans from building lightning-fast React frontends and RESTful/GraphQL APIs to designing MongoDB schemas and deploying on AWS.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
          >
            <h2 className="text-white font-black text-lg sm:text-xl mb-6 flex items-center gap-3 uppercase tracking-tighter">
              <span className="text-fuchsia-400 font-black">◈</span> Experience
            </h2>
            <div className="flex flex-col gap-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                  className="relative pl-7 border-l border-white/10"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                  <p className="text-cyan-400 text-[9px] tracking-[0.2em] font-black uppercase mb-1">{item.year}</p>
                  <p className="text-white font-bold text-sm sm:text-base leading-tight">{item.role}</p>
                  <p className="text-fuchsia-400 text-[10px] font-bold mt-1 tracking-wider uppercase">{item.company}</p>
                  <p className="text-slate-500 text-[11px] mt-3 leading-relaxed font-medium line-clamp-3">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
