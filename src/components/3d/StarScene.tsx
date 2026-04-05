'use client';
import { Stars, Sparkles } from '@react-three/drei';

export default function StarScene() {
  return (
    <>
      <Stars radius={120} depth={60} count={6000} factor={5} saturation={0} fade speed={0.8} />
      <Sparkles count={150} scale={20} size={1.5} speed={0.3} opacity={0.4} color="#00f3ff" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={1} />
    </>
  );
}
