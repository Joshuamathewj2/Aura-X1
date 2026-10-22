'use client';

import React, { useEffect, useState } from 'react';
import MagneticButton from '@/components/MagneticButton';
import OutlineText from '@/components/OutlineText';
import DriftingWords from '@/components/DriftingWords';

const SPEC_CHIPS = [
  { label: 'Battery Life', value: '40 h Total' },
  { label: 'Acoustic Driver', value: '11 mm Graphene' },
  { label: 'Noise Cancellation', value: '48 dB Adaptive' },
  { label: 'Water Resistance', value: 'IPX5 Certified' },
];

export default function Hero() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative" data-nav="dark" id="top">
      <section
        className="relative min-h-screen w-full bg-[#E9E9E6] text-[#121314] pt-32 pb-20 px-6 md:px-12 lg:px-16 flex flex-col justify-between overflow-hidden"
        aria-label="AURA X1 Hero Section"
      >
        {/* Background drifting words */}
        <DriftingWords
          words={['PURE SOUND', 'AURA X1', 'ACOUSTIC PURITY']}
          opacity={0.06}
          speed={0.12}
        />

        {/* Soft studio radial glow / floor shadow */}
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-[80vw] h-[60vh] max-w-[900px] pointer-events-none rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 60% 80%, rgba(255, 90, 31, 0.08) 0%, rgba(0,0,0,0.06) 40%, transparent 75%)',
          }}
        />

        {/* Decorative Floating Specks / Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[
            { top: '22%', left: '48%', size: 6, dur: '7s', delay: '0s' },
            { top: '35%', left: '88%', size: 8, dur: '9s', delay: '1.2s' },
            { top: '68%', left: '42%', size: 5, dur: '6s', delay: '0.8s' },
            { top: '78%', left: '78%', size: 7, dur: '8s', delay: '2s' },
            { top: '18%', left: '92%', size: 4, dur: '10s', delay: '0.5s' },
          ].map((speck, idx) => (
            <div
              key={idx}
              className="absolute rounded-full bg-[#FF5A1F]/30 animate-float-particle"
              style={{
                top: speck.top,
                left: speck.left,
                width: `${speck.size}px`,
                height: `${speck.size}px`,
                ['--dur' as string]: speck.dur,
                animationDelay: speck.delay,
              }}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-grow py-8">
          {/* Left Column: Headlines & Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Script Lead-in */}
            <p className="font-script text-[#FF5A1F] text-2xl sm:text-3xl md:text-4xl mb-3 tracking-wide">
              Hear what you've been missing.
            </p>

            {/* Giant Condensed Headline */}
            <h1 className="font-display text-[clamp(4.2rem,12vw,11.5rem)] leading-[0.88] uppercase tracking-tight text-[#121314] select-none my-2">
              <span className="ln">
                <span
                  className="ln-in block"
                  style={{
                    transform: isReady ? 'translate3d(0, 0, 0)' : 'translate3d(0, 115%, 0)',
                    transition: 'transform 1.1s cubic-bezier(0.2, 0.9, 0.1, 1)',
                  }}
                >
                  PURE
                </span>
              </span>
              <span className="ln">
                <span
                  className="ln-in block"
                  style={{
                    transform: isReady ? 'translate3d(0, 0, 0)' : 'translate3d(0, 115%, 0)',
                    transition: 'transform 1.1s cubic-bezier(0.2, 0.9, 0.1, 1) 0.12s',
                  }}
                >
                  <OutlineText className="outline-text-dark hover:outline-text-orange transition-all">
                    SOUND.
                  </OutlineText>
                </span>
              </span>
            </h1>

            {/* Editorial Paragraph */}
            <p className="mt-8 max-w-xl text-base sm:text-lg md:text-xl text-[#121314]/75 font-normal leading-relaxed">
              Precision-sculpted acoustic architecture. Continuous adaptive noise cancellation that
              recalibrates 48,000 times per second. Zero compromise between physical form and acoustic truth.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton href="#lineup" variant="orange" size="lg">
                Pre-order AURA X1
              </MagneticButton>
              <MagneticButton href="#teardown" variant="outline" size="lg" showArrow={false}>
                Explore Teardown ↓
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Intact Earbud Render + Spec Chips */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Ambient circular frame backdrop */}
            <div
              className="absolute w-[min(90vw,480px)] aspect-square rounded-full -z-10 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 90, 31, 0.08) 0%, rgba(255, 255, 255, 0.6) 45%, transparent 70%)',
              }}
            />

            {/* Earbud Frame 1 with Watermark Cropped */}
            <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-square flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden rounded-3xl">
                {/* Scale 1.10 and origin top-left to completely hide the bottom-right 5% watermark */}
                <img
                  src="/frames/ezgif-frame-001.jpg"
                  alt="AURA X1 Wireless Earbud in pristine intact form"
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover scale-[1.12] origin-top-left drop-shadow-[0_24px_38px_rgba(0,0,0,0.12)] transition-transform duration-700 hover:scale-[1.16]"
                  fetchPriority="high"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-2 sm:bottom-4 sm:left-0 bg-white/90 backdrop-blur-md border border-black/5 shadow-lg px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#121314]">
                  Gen 1 Acoustic Core
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spec Chips Row */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-12 border-t border-black/10 mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {SPEC_CHIPS.map((chip, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl text-[#121314] tracking-tight">
                {chip.value}
              </span>
              <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#121314]/50 mt-1">
                {chip.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
