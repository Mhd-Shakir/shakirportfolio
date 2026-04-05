'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment } from '@react-three/drei';

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-cyan-400 border-r-fuchsia-500 animate-spin" />
        <p className="text-slate-400 text-sm tracking-widest animate-pulse">LOADING 3D EXPERIENCE</p>
      </div>
    </div>
  );
}

export default function CanvasWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-0 bg-[#020617]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00ffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
          <pointLight position={[0, 0, 5]} intensity={0.5} color="#7c3aed" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
