'use client';

import { Canvas } from '@react-three/fiber';
import {
  PresentationControls,
  Float,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import { Suspense } from 'react';

function EarbudModel() {
  return (
    <group>
      {/* Body Shell */}
      <mesh scale={[1, 1.2, 0.8]} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          roughness={0.05}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Stem */}
      <mesh position={[0, -1.3, 0]} castShadow>
        <capsuleGeometry args={[0.28, 1.6, 32, 32]} />
        <meshPhysicalMaterial
          color="#111111"
          roughness={0.05}
          metalness={0.9}
          clearcoat={1}
        />
      </mesh>

      {/* Blue Accent Ring */}
      <mesh position={[0.65, 0.2, 0.5]} rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[0.22, 0.045, 32, 64]} />
        <meshStandardMaterial
          color="#0071e3"
          emissive="#0071e3"
          emissiveIntensity={3}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Microphone dot */}
      <mesh position={[0, -1.85, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
    </group>
  );
}

const COLORS: Record<string, string> = {
  Obsidian: '#111111',
  Snow: '#e8e8e8',
  Aurora: '#0a2a4a',
  Titanium: '#8a8a8a',
};

export default function ThreeDViewer() {
  return (
    <section className="relative h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <div className="absolute top-20 text-center z-10 pointer-events-none px-6">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-3">
          Interactive 360° Explorer
        </h2>
        <p className="text-white/40 text-sm tracking-widest uppercase">
          Drag to rotate · Scroll to zoom
        </p>
      </div>

      {/* Canvas */}
      <div className="w-full h-full">
        <Canvas
          dpr={[1, 2]}
          shadows
          camera={{ position: [0, 0, 6], fov: 40 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              castShadow
              intensity={2}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0071e3" />

            <PresentationControls
              global
              snap
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
            >
              <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
                <EarbudModel />
              </Float>
            </PresentationControls>

            <ContactShadows
              position={[0, -2.5, 0]}
              opacity={0.5}
              scale={12}
              blur={3}
              far={5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Color Selector */}
      <div className="absolute bottom-14 z-10 flex flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          Choose Finish
        </span>
        <div className="flex space-x-3">
          {Object.entries(COLORS).map(([name, hex]) => (
            <button
              key={name}
              title={name}
              className="w-10 h-10 rounded-full border-2 border-white/10 hover:border-brand-primary transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
