'use client';

import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'hidden'>('loading');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 200 : 1200;

    // Preload frame 1
    const img = new Image();
    img.src = '/frames/ezgif-frame-001.jpg';

    const timer1 = setTimeout(() => {
      setPhase('revealing');
      if (onComplete) onComplete();
    }, duration);

    const timer2 = setTimeout(() => {
      setPhase('hidden');
    }, duration + 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (phase === 'hidden') return null;

  return (
    <div
      role="status"
      aria-label="Loading AURA X1"
      className={`fixed inset-0 z-[100] bg-[#E9E9E6] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.2,1)] ${
        phase === 'revealing' ? 'pointer-events-none -translate-y-full' : ''
      }`}
      style={{
        clipPath: phase === 'revealing' ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
        // CSS failsafe: if JavaScript is slow to hydrate (old phones), still get out of the way.
        animation: 'preloader-failsafe 0.6s ease 3.2s forwards',
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <p className="font-display text-[clamp(3.5rem,11vw,7.5rem)] tracking-tight text-[#121314] leading-none select-none">
          AURA X1<span className="text-[#FF5A1F]">.</span>
        </p>

        {/* Drawing progress line underneath */}
        <div className="w-[min(48vw,260px)] h-[3px] bg-[#121314]/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#FF5A1F] w-full origin-left animate-[loader-line_1.1s_cubic-bezier(0.7,0,0.2,1)_forwards]" />
        </div>

        <p className="font-script text-[#FF5A1F] text-xl md:text-2xl mt-1 tracking-wide opacity-90">
          Pure sound is loading.
        </p>
      </div>
    </div>
  );
}
