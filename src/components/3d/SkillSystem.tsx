'use client';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

import { SKILLS } from '@/lib/skills-data';

interface SkillNodeProps {
  skill: typeof SKILLS[0];
  position: [number, number, number];
  index: number;
  scaleMultiplier: number;
}

function SkillNode({ skill, position, index, scaleMultiplier }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const targetScale = useRef(1);

  useFrame((state, delta) => {
    if (meshRef.current) {
      targetScale.current = (hovered ? 1.6 : 1) * scaleMultiplier;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current), 0.1);
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'none'; }}
    >
      <icosahedronGeometry args={[0.45, 1]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={hovered ? 0.8 : 0.2}
        transparent
        opacity={hovered ? 1 : 0.75}
        wireframe={!hovered}
      />
      {hovered && (
        <Html distanceFactor={8} center>
          <div className="pointer-events-none bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-48 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-t-cyan-400">
            <p className="text-white font-black text-sm text-center tracking-wider">{skill.name}</p>
            <p className="text-cyan-400 text-[10px] text-center mb-3 font-bold tracking-widest">{skill.category}</p>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <motion.div
                 initial={{ width: 0 }}
                 animate={{ width: `${skill.proficiency}%` }}
                 transition={{ duration: 1, ease: 'easeOut' }}
                 className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              />
            </div>
            <p className="text-white text-[10px] font-bold text-center mt-2 tracking-widest uppercase">{skill.proficiency}% PROFICIENCY</p>
          </div>
        </Html>
      )}
    </mesh>
  );
}

export default function SkillSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 10;
  
  // Responsive settings
  const radius = isMobile ? 3.5 : 4.8;
  const nodeScale = isMobile ? 0.7 : 1;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade />
      <Sparkles count={150} scale={12} size={1.5} speed={0.2} color="#00f3ff" opacity={0.4} />
      <OrbitControls enableZoom={!isMobile} enablePan={false} minDistance={4} maxDistance={15} />

      <group ref={groupRef}>
        {SKILLS.map((skill, i) => {
          const phi = Math.acos(-1 + (2 * i) / SKILLS.length);
          const theta = Math.sqrt(SKILLS.length * Math.PI) * phi;
          
          return (
            <SkillNode
              key={i}
              index={i}
              skill={skill}
              scaleMultiplier={nodeScale}
              position={[
                radius * Math.cos(theta) * Math.sin(phi),
                radius * Math.cos(phi),
                radius * Math.sin(theta) * Math.sin(phi),
              ]}
            />
          );
        })}
      </group>
    </>
  );
}
