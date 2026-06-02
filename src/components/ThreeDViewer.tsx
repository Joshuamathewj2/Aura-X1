'use client';

import { Canvas } from '@react-three/fiber';
import { 
  PresentationControls, 
  Stage, 
  Float, 
  ContactShadows, 
  Environment,
  Text,
  MeshDistortMaterial,
  Sphere
} from '@react-three/drei';
import { Suspense } from 'react';

function EarbudModel() {
  return (
    <group>
      {/* Body */}
      <mesh scale={[1, 1.2, 0.8]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial 
          color="#1a1a1a"
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
        />
      </mesh>
      
      {/* Stem */}
      <mesh position={[0, -1.2, 0]} rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.3, 1.5, 32, 32]} />
        <meshPhysicalMaterial 
          color="#1a1a1a"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Accent Ring */}
      <mesh position={[0.7, 0, 0.5]} rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[0.2, 0.05, 32, 64]} />
        <meshStandardMaterial color="#0071e3" emissive="#0071e3" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

export default function ThreeDViewer() {
  return (
    <section className="h-screen w-full bg-[#050505] relative flex flex-col items-center justify-center py-20">
      <div className="absolute top-20 text-center z-10 pointer-events-none">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Interactive 360° Explorer</h2>
        <p className="text-white/40">Drag to rotate • Scroll to zoom</p>
      </div>

      <div className="w-full h-full">
        <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
            
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
            >
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Stage environment="studio" intensity={0.5} contactShadow={false}>
                   <EarbudModel />
                </Stage>
              </Float>
            </PresentationControls>

            <ContactShadows 
              position={[0, -2, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2.5} 
              far={4} 
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-20 flex space-x-4">
        {['Obsidian', 'Snow', 'Aurora', 'Titanium'].map((color) => (
          <button 
            key={color}
            className="w-12 h-12 rounded-full border border-white/20 p-1 hover:border-brand-primary transition-colors"
          >
             <div className="w-full h-full rounded-full bg-[#1a1a1a]" />
          </button>
        ))}
      </div>
    </section>
  );
}
