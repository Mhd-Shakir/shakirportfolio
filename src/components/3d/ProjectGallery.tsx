'use client';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ExternalLink, GitBranch, Terminal, Shield, Rocket, Cpu } from 'lucide-react';

const PROJECTS = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    icon: Terminal,
    description: 'Advanced MERN ecosystem with secure Stripe integration, real-time logistics analytics, and dynamic inventory sync.',
    techStack: ['Next.js 15', 'MongoDB', 'Stripe', 'Tailwind v4'],
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/murshidmm34-spec',
    color: '#00ffff',
  },
  {
    id: '2',
    title: 'AI Social Network',
    icon: Cpu,
    description: 'Next-gen social platform with AI-driven content feeds, real-time WebSocket communication, and biometric security.',
    techStack: ['React', 'Node.js', 'Socket.io', 'OpenAI'],
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/murshidmm34-spec',
    color: '#ff00ff',
  },
  {
    id: '3',
    title: 'Collaborative SaaS',
    icon: Shield,
    description: 'Professional Multi-tenant SaaS featuring Kanban boards, automated workflow triggers, and enterprise-grade encryption.',
    techStack: ['TypeScript', 'Prisma', 'PostgreSQL', 'Redux'],
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/murshidmm34-spec',
    color: '#7c3aed',
  },
  {
    id: '4',
    title: 'Fitness Ecosystem',
    icon: Rocket,
    description: 'High-performance React Native application for multi-platform health monitoring and real-time biometric syncing.',
    techStack: ['React Native', 'Expo', 'Reanimated', 'Node.js'],
    liveUrl: 'https://demo.com',
    githubUrl: 'https://github.com/murshidmm34-spec',
    color: '#f59e0b',
  },
];

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  position: [number, number, number];
  index: number;
  isMobile: boolean;
}

function ProjectCard({ project, position, index, isMobile }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const Icon = project.icon;

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetRotX = hovered ? 0.2 : 0;
    const targetRotY = hovered ? 0.3 : 0;
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.1;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'none'; }}
      >
        <boxGeometry args={[3.6, 2.6, 0.05]} />
        <meshStandardMaterial
          color={hovered ? project.color : '#0f172a'}
          emissive={project.color}
          emissiveIntensity={hovered ? 0.6 : 0.1}
          transparent
          opacity={0.9}
        />

        <Html distanceFactor={isMobile ? 14 : 10} center transform transform-scale={0.5} occlude="blending" position={[0, 0, 0.03]}>
          <div className={`group w-[340px] bg-black/90 backdrop-blur-2xl border-2 rounded-[2rem] p-8 transition-all duration-700 shadow-[0_0_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden ${hovered ? 'border-opacity-100 scale-105' : 'border-white/5 opacity-80'}`}
            style={{ 
              borderColor: hovered ? project.color : 'rgba(255,255,255,0.05)',
              boxShadow: hovered ? `0 0 50px ${project.color}30, inset 0 0 30px ${project.color}20` : 'none'
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors" style={{ color: project.color }}>
                 <Icon size={28} strokeWidth={2} />
              </div>
              <div className="text-[11px] font-black uppercase tracking-[0.4em] opacity-30 text-white">Project // {index + 1}</div>
            </div>

            <h3 className="text-white font-black text-xl tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
                style={{ backgroundImage: hovered ? `linear-gradient(to right, ${project.color}, #fff)` : 'none' }}>
              {project.title}
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium tracking-wide">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {project.techStack.map(t => (
                <span key={t} className="text-[10px] font-black px-4 py-1.5 rounded-xl bg-white/5 text-slate-300 border border-white/5 tracking-tighter hover:border-white/20 transition-all">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-5 pt-6 border-t border-white/5">
              <a href={project.liveUrl} target="_blank" rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[11px] font-black text-white hover:text-cyan-400 transition-all pointer-events-auto uppercase tracking-widest border border-white/5 shadow-xl"
              >
                <ExternalLink size={14} /> LIVE PREVIEW
              </a>
              <a href={project.githubUrl} target="_blank" rel="noreferrer"
                className="flex items-center justify-center w-14 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-fuchsia-400 hover:text-white pointer-events-auto shadow-xl"
              >
                <GitBranch size={18} />
              </a>
            </div>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

export default function ProjectGallery() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 10;
  const cols = isMobile ? 1 : 2;

  // Optimized spacing
  const spacingX = isMobile ? 0 : 8.5;
  const spacingY = isMobile ? 6.5 : 7.5;

  return (
    <>
      <Stars radius={150} depth={50} count={6000} factor={4} saturation={0} fade />
      <OrbitControls 
        enableZoom={!isMobile} 
        enablePan={true} 
        minDistance={5} 
        maxDistance={30} 
        makeDefault
      />

      <group>
        {PROJECTS.map((project, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          
          // Better centering logic
          const rows = Math.ceil(PROJECTS.length / cols);
          const x = (col - (cols - 1) / 2) * spacingX;
          const y = -(row - (rows - 1) / 2) * spacingY;
          
          return <ProjectCard key={project.id} project={project} position={[x, y, 0]} index={i} isMobile={isMobile} />;
        })}
      </group>

      <ambientLight intensity={0.5} />
      <spotLight position={[0, 15, 15]} angle={0.3} penumbra={1} intensity={2} />
      <pointLight position={[-15, -15, -15]} color="#ff00ff" intensity={1.5} />
      <pointLight position={[15, 15, 15]} color="#00ffff" intensity={1.5} />
    </>
  );
}
