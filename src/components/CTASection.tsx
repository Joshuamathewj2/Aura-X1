'use client';

import React from 'react';
import MagneticButton from '@/components/MagneticButton';
import DriftingWords from '@/components/DriftingWords';

export default function CTASection() {
  return (
    <section
      id="cta"
      data-nav="light"
      className="relative bg-[#FF5A1F] text-white py-36 px-6 md:px-12 lg:px-16 text-center overflow-hidden isolation-isolate"
      aria-labelledby="cta-heading"
    >
      {/* Drifting background outlined words */}
      <DriftingWords
        words={['AURA X1', 'READY TO HEAR', 'PURE SILENCE']}
        opacity={0.12}
        speed={0.14}
        outlined={true}
      />

      {/* Ambient Radial Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(0, 0, 0, 0.25) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        {/* Script Lead-in */}
        <p className="font-script text-white text-3xl sm:text-4xl md:text-5xl mb-4 tracking-wide drop-shadow-sm">
          Silence is waiting.
        </p>

        {/* Giant Condensed Headline */}
        <h2
          id="cta-heading"
          className="font-display text-[clamp(3.8rem,11.5vw,13rem)] leading-[0.88] uppercase tracking-tight text-white select-none drop-shadow-md"
        >
          <span className="ln">
            <span className="ln-in block">READY TO HEAR</span>
          </span>
          <span className="ln">
            <span className="ln-in block">EVERYTHING?</span>
          </span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-8 max-w-xl text-lg sm:text-xl text-white/90 leading-relaxed font-normal">
          Inaugural production batch now open. Each pair is acoustically calibrated and engraved with a unique serial number.
        </p>

        {/* Pill Button with Magnetic Hover */}
        <div className="mt-12">
          <MagneticButton
            href="#lineup"
            variant="dark"
            size="lg"
            className="shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105"
          >
            Pre-order AURA X1
          </MagneticButton>
        </div>

        {/* Subtext guarantees */}
        <small className="block mt-8 text-xs font-bold uppercase tracking-[0.22em] text-white/80">
          Complimentary Worldwide Shipping · 30-Day In-Home Audition · 2-Year Warranty
        </small>
      </div>
    </section>
  );
}
