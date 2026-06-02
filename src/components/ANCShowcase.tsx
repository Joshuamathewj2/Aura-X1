'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function ANCShowcase() {
  const [isANCActive, setIsANCActive] = useState(true);

  return (
    <section 
      id="anc"
      className="relative min-h-screen w-full bg-[#111] overflow-hidden py-32"
    >
      {/* Background Gradients */}
      <div className={
        `absolute inset-0 transition-opacity duration-1000 ${isANCActive ? 'opacity-20' : 'opacity-60'}`
      }>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/30 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/30 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-12"
          >
            Pure Silence. <br />
            <span className="text-brand-secondary">Adaptive ANC 2.0</span>
          </motion.h2>

          {/* Interactive Toggle Card */}
          <div className="relative w-full max-w-4xl p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] overflow-hidden group">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl -z-10" />
            
            <div className="p-8 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl md:text-2xl text-left text-white/70 mb-8 leading-relaxed">
                  AURA X1 continuously monitors environmental noise and eliminates it with 
                  up to <span className="text-white font-bold">48dB</span> of cancellation power.
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <VolumeX className="text-brand-primary w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">Silent Mode</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                      <Volume2 className="text-white/40 w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-white/40">Transparency Mode</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <button 
                  onClick={() => setIsANCActive(!isANCActive)}
                  className="relative w-64 h-64 flex items-center justify-center group"
                >
                  {/* Outer Rings */}
                  <motion.div 
                    animate={{ 
                      scale: isANCActive ? [1, 1.2, 1] : 1,
                      opacity: isANCActive ? [0.5, 0.1, 0.5] : 0.2
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-brand-primary rounded-full"
                  />
                  <motion.div 
                    animate={{ 
                      scale: isANCActive ? [1, 1.4, 1] : 1,
                      opacity: isANCActive ? [0.3, 0, 0.3] : 0.1
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="absolute inset-0 border border-brand-primary/50 rounded-full"
                  />

                  {/* Main Button */}
                  <div className="relative z-10 w-40 h-40 rounded-full bg-white/5 flex flex-col items-center justify-center border border-white/10 hover:border-brand-primary/50 transition-colors">
                    <span className="text-xs uppercase tracking-widest text-white/40 mb-2">
                       {isANCActive ? 'Active' : 'Disabled'}
                    </span>
                    <span className="text-2xl font-bold">
                      {isANCActive ? '48dB' : '0dB'}
                    </span>
                  </div>
                </button>
                <p className="mt-8 text-sm text-white/40 italic">Click to toggle noise suppression</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
