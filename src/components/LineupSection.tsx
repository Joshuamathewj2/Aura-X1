'use client';

import React from 'react';
import OutlineText from '@/components/OutlineText';
import MagneticButton from '@/components/MagneticButton';
import SplitReveal from '@/components/motion/SplitReveal';

interface ProductVariant {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  bgWord: string;
  image: string;
  cutout: boolean;
  specs: string[];
  featured?: boolean;
}

const PRODUCTS: ProductVariant[] = [
  {
    name: 'AURA X1 Pro',
    tagline: 'Flagship studio acoustic performance with Intelligent ANC 2.0 and 96kHz lossless DSP.',
    price: '$349',
    unit: 'pair',
    bgWord: 'PRO',
    image: '/cutouts/bud-three-quarter.webp',
    cutout: true,
    specs: ['48dB Adaptive ANC', '10h + 40h Battery', 'Titanium Stem', 'Spatial Lossless'],
    featured: true,
  },
  {
    name: 'AURA X1 Studio',
    tagline: 'The reference standard for everyday studio-grade wireless listening.',
    price: '$249',
    unit: 'pair',
    bgWord: 'STUDIO',
    image: '/cutouts/bud-side.webp',
    cutout: true,
    specs: ['42dB Hybrid ANC', '8h + 32h Battery', '11mm Graphene Driver'],
  },
  {
    name: 'AURA X1 Sport',
    tagline: 'Engineered for intense movement with IPX7 waterproofing and secure acoustic wingtips.',
    price: '$279',
    unit: 'pair',
    bgWord: 'SPORT',
    image: '/photos/midnight-red.webp',
    cutout: false,
    specs: ['IPX7 Waterproof', 'Secure Aero-Fin', 'Wind Shielding Tech'],
  },
  {
    name: 'Alloy Power Case',
    tagline: 'Precision CNC aerospace aluminium case with Qi wireless charging and 500 mAh reserve.',
    price: '$89',
    unit: 'each',
    bgWord: 'POWER',
    image: '/photos/midnight-case.webp',
    cutout: false,
    specs: ['500 mAh Reserve', 'MagSafe & Qi', '15-min Quick Fuel'],
  },
];

export default function LineupSection() {
  return (
    <section
      id="lineup"
      data-nav="dark"
      className="relative bg-[#F6F5F1] text-[#121314] py-32 px-6 md:px-12 lg:px-16 overflow-hidden"
      aria-labelledby="lineup-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <p className="font-script text-[#FF5A1F] text-2xl sm:text-3xl md:text-4xl mb-3 tracking-wide">
              Engineered for every ear.
            </p>
            <h2
              id="lineup-heading"
              className="font-display text-[clamp(3.5rem,10.5vw,11.5rem)] leading-[0.88] uppercase tracking-tight select-none"
            >
              <span className="ln">
                <span className="block"><SplitReveal text="OUR SIGNATURE" /></span>
              </span>
              <span className="ln">
                <span className="ln-in block">
                  <OutlineText className="outline-text-stroke-dark hover:outline-text-stroke-orange transition-all">
                    LINEUP.
                  </OutlineText>
                </span>
              </span>
            </h2>
          </div>

          <p className="max-w-md text-base sm:text-lg text-[#121314]/70 leading-relaxed font-normal">
            Every edition shares our signature 11 mm acoustic driver and custom neural silicon,
            tailored for specific listening environments.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Big Feature Card: AURA X1 Pro (spans 6 cols on lg) */}
          <article className="lg:col-span-6 lg:row-span-2 relative flex flex-col justify-between bg-white rounded-[2.5rem] p-8 md:p-12 border border-black/5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.08)] hover:shadow-[0_45px_80px_-25px_rgba(255,90,31,0.2)] transition-all duration-500 hover:-translate-y-2 overflow-hidden group">
            {/* Background Word Watermark */}
            <span
              aria-hidden="true"
              className="absolute -top-6 right-4 font-display text-[clamp(7rem,16vw,14rem)] text-black/[0.04] select-none pointer-events-none leading-none"
            >
              PRO
            </span>

            {/* Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="bg-[#FF5A1F] text-white text-[11px] font-bold uppercase tracking-[0.22em] px-4 py-1.5 rounded-full">
                Flagship Edition
              </span>
              <span className="font-mono text-sm font-bold text-[#FF5A1F]">
                GEN 2.0
              </span>
            </div>

            {/* Main visual: the bud levitates, and hops + spins when the card is hovered */}
            <div className="relative w-full aspect-[4/3] my-8 rounded-2xl flex items-center justify-center bg-[radial-gradient(circle_at_50%_60%,rgba(255,90,31,0.14),transparent_62%)]">
              <div className="absolute bottom-[10%] w-[42%] h-[6%] rounded-[50%] bg-black/20 blur-md animate-[badge-bob_5s_ease-in-out_infinite]" aria-hidden="true" />
              <div className="w-[62%] animate-[levitate_5s_ease-in-out_infinite]">
                <img
                  src={PRODUCTS[0].image}
                  alt="AURA X1 Pro earbud"
                  className="w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] group-hover:animate-[hop_0.9s_cubic-bezier(0.3,0.7,0.4,1)_infinite]"
                  loading="lazy"
                />
              </div>
              <img src="/cutouts/part-coil.webp" alt="" aria-hidden="true" className="absolute top-[8%] right-[10%] w-16 animate-[spin-slow_9s_linear_infinite] group-hover:scale-125 transition-transform duration-500" />
              <img src="/cutouts/part-battery.webp" alt="" aria-hidden="true" className="absolute bottom-[14%] left-[8%] w-14 animate-[levitate_4s_ease-in-out_infinite_0.6s]" />
            </div>

            {/* Body & Specs */}
            <div className="z-10">
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-[#121314]">
                AURA X1 Pro
              </h3>
              <p className="mt-3 text-base text-[#121314]/70 leading-relaxed max-w-md">
                {PRODUCTS[0].tagline}
              </p>

              {/* Spec tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {PRODUCTS[0].specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-xs font-semibold bg-[#E9E9E6] text-[#121314] px-3.5 py-1.5 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Price & CTA Row */}
              <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-black/10">
                <div>
                  <span className="font-display text-4xl text-[#121314]">
                    $349
                  </span>
                  <small className="block text-[11px] uppercase font-bold tracking-widest text-[#121314]/50">
                    per pair
                  </small>
                </div>
                <MagneticButton href="#cta" variant="orange" size="md">
                  Pre-order
                </MagneticButton>
              </div>
            </div>
          </article>

          {/* Smaller Bento Cards (3 cards, each spans 6 on lg) */}
          {PRODUCTS.slice(1).map((prod) => (
            <article
              key={prod.name}
              className="lg:col-span-6 relative flex flex-col justify-between bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_35px_60px_-20px_rgba(255,90,31,0.15)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden group"
            >
              {/* Background Word Watermark */}
              <span
                aria-hidden="true"
                className="absolute top-2 right-4 font-display text-[clamp(5rem,10vw,8rem)] text-black/[0.035] select-none pointer-events-none leading-none"
              >
                {prod.bgWord}
              </span>

              <div className="flex flex-col sm:flex-row gap-6 items-center">
                {/* Thumbnail: cut-outs hop + spin on hover, photos zoom + tilt */}
                <div
                  className={`w-full sm:w-44 aspect-square rounded-2xl shrink-0 flex items-center justify-center ${
                    prod.cutout ? 'bg-[radial-gradient(circle,rgba(255,90,31,0.12),transparent_65%)]' : 'overflow-hidden bg-black'
                  }`}
                >
                  {prod.cutout ? (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-[78%] drop-shadow-[0_20px_20px_rgba(0,0,0,0.22)] animate-[levitate_4.5s_ease-in-out_infinite] group-hover:animate-[hop_0.9s_cubic-bezier(0.3,0.7,0.4,1)_infinite]"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover scale-110 group-hover:scale-[1.28] group-hover:rotate-3 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-grow z-10">
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#121314]">
                    {prod.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#121314]/70 leading-relaxed">
                    {prod.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {prod.specs.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-medium bg-[#E9E9E6] text-[#121314]/80 px-2.5 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-black/10 z-10">
                <div>
                  <span className="font-display text-3xl text-[#121314]">
                    {prod.price}
                  </span>
                  <small className="block text-[10px] uppercase font-bold tracking-widest text-[#121314]/50">
                    {prod.unit}
                  </small>
                </div>
                <MagneticButton href="#cta" variant="primary" size="sm">
                  Order now
                </MagneticButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
