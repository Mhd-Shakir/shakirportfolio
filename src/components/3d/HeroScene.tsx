'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingParticles() {
  const count = 80;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#7c3aed" transparent opacity={0.6} />
    </points>
  );
}

export default function HeroScene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 10;
  
  // Pushing the symbol TO THE TOP on mobile
  const scenePosition: [number, number, number] = isMobile ? [0, 3.5, -4] : [viewport.width * 0.25, 0, -1];
  const sceneScale = isMobile ? 0.65 : 1;

  return (
    <group scale={sceneScale}>
      <FloatingParticles />
      <group position={scenePosition}>
        <RotatingCube />
        <OrbitingSkills />
      </group>
    </group>
  );
}

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.8}
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
