'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SoundShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const waveScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="sound"
      ref={containerRef}
      className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden py-32"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brand-primary)_0%,_transparent_70%)] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div style={{ opacity }}>
            <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary mb-6 font-bold">
              Hybrid Acoustic Engine
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Every detail, <br />
              <span className="text-brand-secondary">perfectly heard.</span>
            </h3>
            <p className="text-xl text-white/60 leading-relaxed max-w-md">
              AURA X1 features a custom-built 11mm ultra-low distortion driver and 
              a high-capacity amplifier for deep, rich bass and clean, crisp highs.
            </p>
            
            <div className="mt-12 space-y-6">
              {[
                { label: 'Dynamic Range', value: '118dB' },
                { label: 'Frequency Response', value: '10Hz - 48kHz' },
                { label: 'Total Harmonic Distortion', value: '<0.03%' },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/40">{spec.label}</span>
                  <span className="text-xl font-mono font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visualizer Animation */}
          <div className="relative aspect-square flex items-center justify-center">
            <motion.div 
              style={{ scale: waveScale }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [20, 100 + Math.random() * 200, 20],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-1 md:w-2 mx-[2px] md:mx-1 bg-gradient-to-t from-brand-primary to-blue-400 rounded-full"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
