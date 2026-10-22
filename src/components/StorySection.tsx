'use client';

import React from 'react';
import OutlineText from '@/components/OutlineText';

interface ComponentCard {
  title: string;
  tag: string;
  description: string;
  frameNumber: string;
  spec: string;
}

const COMPONENTS: ComponentCard[] = [
  {
    title: 'Acoustic Driver',
    tag: '01 / TRANSDUCER',
    description: '11 mm graphene-coated diaphragm with a high-flux neodymium ring and ultra-pure copper voice coil.',
    frameNumber: '165',
    spec: '< 0.03% THD @ 1kHz',
  },
  {
    title: 'Audio SoC',
    tag: '02 / SILICON',
    description: 'Custom neural audio engine executing sub-millisecond adaptive noise filtering and lossless spatial DSP.',
    frameNumber: '090',
    spec: '48 kHz Real-time DSP',
  },
  {
    title: 'Micro-Cell Battery',
    tag: '03 / ENERGY',
    description: 'High energy-density lithium cell engineered to deliver 10 hours continuous playback with fast Qi recharging.',
    frameNumber: '125',
    spec: '10h Earbud · 40h Case',
  },
  {
    title: 'Titanium Enclosure',
    tag: '04 / ARCHITECTURE',
    description: 'Anodized titanium stem fused seamlessly to an acoustically inert composite resonance chamber.',
    frameNumber: '040',
    spec: 'IPX5 Sealed Chassis',
  },
];

export default function StorySection() {
  return (
    <section
      id="story"
      data-nav="light"
      className="relative bg-[#121314] text-[#F6F5F1] py-32 px-6 md:px-12 lg:px-16 overflow-hidden"
      aria-labelledby="story-heading"
    >
      {/* Background radial gradient highlights */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-1/4 w-[60vw] h-[40vw] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 90, 31, 0.07) 0%, transparent 65%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 w-[50vw] h-[35vw] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-20">
          <p className="font-script text-[#FF5A1F] text-2xl sm:text-3xl md:text-4xl mb-4 tracking-wide">
            Precision engineered, inside and out.
          </p>

          <h2
            id="story-heading"
            className="font-display text-[clamp(3.8rem,11.5vw,13rem)] leading-[0.88] uppercase tracking-tight select-none"
          >
            <span className="ln">
              <span className="ln-in block">MORE THAN</span>
            </span>
            <span className="ln pl-[clamp(24px,10vw,160px)]">
              <span className="ln-in block">
                <OutlineText className="outline-text-stroke-light hover:outline-text-stroke-orange transition-all">
                  JUST
                </OutlineText>
              </span>
            </span>
            <span className="ln">
              <span className="ln-in block">EARBUDS.</span>
            </span>
          </h2>

          <p className="mt-10 max-w-2xl text-lg sm:text-xl text-[#F6F5F1]/70 leading-relaxed font-normal ml-0 md:ml-[clamp(24px,10vw,160px)]">
            Every layer represents an exacting decision: an 11 mm graphene diaphragm tuned for acoustic
            neutrality, custom silicon performing 48,000 acoustic corrections per second, high-density cells,
            and an aerospace-grade titanium stem.
          </p>
        </div>

        {/* 4 Interactive Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPONENTS.map((item, idx) => (
            <article
              key={item.title}
              className="group relative flex flex-col justify-between bg-[#1B1F2A]/60 border border-white/10 hover:border-[#FF5A1F]/60 rounded-3xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)]"
            >
              {/* Top Meta info */}
              <div className="flex items-center justify-between mb-4 z-10">
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#FF5A1F] uppercase">
                  {item.tag}
                </span>
                <span className="text-xs font-mono font-medium text-white/40">
                  {item.spec}
                </span>
              </div>

              {/* Component Visual Crop */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 my-4 border border-white/5">
                <img
                  src={`/frames/ezgif-frame-${item.frameNumber}.jpg`}
                  alt={item.title}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover scale-[1.14] origin-top-left transition-transform duration-700 ease-out group-hover:scale-[1.22]"
                  loading="lazy"
                />
                {/* Subtle highlight gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121314] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Bottom Body */}
              <div className="z-10 mt-auto pt-2">
                <h3 className="font-display text-2xl text-[#F6F5F1] group-hover:text-[#FF5A1F] transition-colors uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#F6F5F1]/65 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Subtle hover background highlight */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-[#FF5A1F]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
