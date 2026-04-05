'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingParticles() {
  const count = 120;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ec4899" transparent opacity={0.4} />
    </points>
  );
}

export default function HeroScene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 10;
  
  // Adjusted positioning to prevent clipping on wider resolutions
  const scenePosition: [number, number, number] = isMobile ? [0, 3.5, -4] : [viewport.width * 0.2, 0, -1];
  const sceneScale = isMobile ? 0.65 : 0.85;

  return (
    <group scale={sceneScale}>
      <FloatingParticles />
      <group position={scenePosition}>
        <RotatingSymbol />
        <OrbitingSkills />
      </group>
    </group>
  );
}

function RotatingSymbol() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function OrbitingSkills() {
  const groupRef = useRef<THREE.Group>(null);
  const skills = ['MERN', 'Next.js', 'React', 'Node', 'MongoDB', 'TypeScript'];
  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
  });
  return (
    <group ref={groupRef}>
      {skills.map((_, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const r = 2.5;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * 0.5, Math.sin(angle) * r]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00ffff' : '#ff00ff'}
              emissive={i % 2 === 0 ? '#00ffff' : '#ff00ff'}
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}
