'use client';

import React, { useState } from 'react';
import OutlineText from '@/components/OutlineText';
import { Volume2, VolumeX, ShieldCheck, Activity } from 'lucide-react';

export default function ANCSection() {
  const [isANCActive, setIsANCActive] = useState(true);

  return (
    <section
      id="anc"
      data-nav="light"
      className="relative bg-[#1B1F2A] text-[#F6F5F1] py-32 px-6 md:px-12 lg:px-16 overflow-hidden"
      aria-labelledby="anc-heading"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isANCActive ? 'opacity-20' : 'opacity-50'
        }`}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5A1F]/20 blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-script text-[#FF5A1F] text-2xl sm:text-3xl md:text-4xl mb-3 tracking-wide">
            Silence at the touch of a button.
          </p>
          <h2
            id="anc-heading"
            className="font-display text-[clamp(3.5rem,10.5vw,11rem)] leading-[0.88] uppercase tracking-tight select-none"
          >
            <span className="ln">
              <span className="ln-in block">PURE SILENCE.</span>
            </span>
            <span className="ln">
              <span className="ln-in block">
                <OutlineText className="outline-text-stroke-light hover:outline-text-stroke-orange transition-all">
                  ADAPTIVE ANC 2.0
                </OutlineText>
              </span>
            </span>
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#F6F5F1]/70 leading-relaxed font-normal">
            Twin outward and inward facing beamforming microphones monitor surrounding ambient noise 48,000
            times every second, computing anti-phase waves before noise ever reaches your eardrum.
          </p>
        </div>

        {/* Interactive Noise Cancellation Console Card */}
        <div className="relative bg-[#121314]/90 border border-white/10 rounded-[3rem] p-8 md:p-14 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Metrics & Mode Toggle Indicators */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#FF5A1F] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5A1F]">
                  Real-time Acoustic Cancellation
                </span>
              </div>

              <div>
                <span className="font-display text-6xl sm:text-7xl text-[#F6F5F1] leading-none">
                  {isANCActive ? '48 dB' : '0 dB'}
                </span>
                <p className="mt-2 text-sm uppercase tracking-wider text-white/50 font-bold">
                  {isANCActive ? 'Noise Extinction Power' : 'Ambient Noise Intrusion'}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${
                    isANCActive
                      ? 'bg-white/10 border border-[#FF5A1F]/50'
                      : 'bg-white/5 border border-white/5 opacity-50'
                  }`}
                  onClick={() => setIsANCActive(true)}
                >
                  <div className="w-10 h-10 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center shrink-0">
                    <VolumeX className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Active Silence Mode</h4>
                    <p className="text-xs text-white/50">Sub-0.1ms inverse frequency cancellation</p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${
                    !isANCActive
                      ? 'bg-white/10 border border-[#FF5A1F]/50'
                      : 'bg-white/5 border border-white/5 opacity-50'
                  }`}
                  onClick={() => setIsANCActive(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Transparency Pass-through</h4>
                    <p className="text-xs text-white/50">Natural ambient awareness</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Circular Switch + Soundwave Visualization */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              {/* Dynamic Waveform Visualizer */}
              <div className="w-full h-32 flex items-center justify-center gap-1.5 md:gap-2 mb-10 px-4">
                {[...Array(32)].map((_, i) => {
                  const baseHeight = isANCActive ? 8 + (i % 3) * 4 : 20 + Math.sin(i * 0.4) * 50 + ((i * 7) % 35);
                  return (
                    <div
                      key={i}
                      className={`w-1.5 md:w-2 rounded-full transition-all duration-300 ${
                        isANCActive
                          ? 'bg-[#FF5A1F]/60'
                          : 'bg-gradient-to-t from-[#FF5A1F] to-amber-400'
                      }`}
                      style={{
                        height: `${Math.max(6, baseHeight)}px`,
                        transitionDelay: `${i * 12}ms`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Central Toggle Button */}
              <button
                type="button"
                onClick={() => setIsANCActive(!isANCActive)}
                className="relative group p-1 rounded-full cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
                aria-label={`Toggle ANC, currently ${isANCActive ? 'Active' : 'Disabled'}`}
              >
                {/* Outer Glow Ring */}
                <div
                  className={`absolute -inset-3 rounded-full blur-md transition-opacity duration-500 ${
                    isANCActive ? 'bg-[#FF5A1F]/40 opacity-100' : 'bg-white/10 opacity-30'
                  }`}
                />

                {/* Main Dial */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#1B1F2A] border-2 border-white/20 flex flex-col items-center justify-center gap-2 shadow-2xl group-hover:border-[#FF5A1F] transition-colors">
                  <Activity
                    className={`w-7 h-7 transition-colors duration-300 ${
                      isANCActive ? 'text-[#FF5A1F]' : 'text-white/40'
                    }`}
                  />
                  <span className="font-display text-2xl uppercase tracking-wider text-white">
                    {isANCActive ? 'ANC ON' : 'ANC OFF'}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#FF5A1F]">
                    Tap to toggle
                  </span>
                </div>
              </button>

              <p className="mt-8 text-xs font-mono text-white/40 uppercase tracking-widest text-center">
                {isANCActive
                  ? 'Adaptive algorithm status: 48,000 corrections/sec · Active'
                  : 'Bypass active · Raw acoustic environment engaged'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
