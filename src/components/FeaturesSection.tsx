'use client';

import React from 'react';
import OutlineText from '@/components/OutlineText';
import { Bluetooth, Zap, Shield, Smartphone, Mic2, Wind } from 'lucide-react';

const FEATURES = [
  {
    num: '01',
    title: 'Instant Pairing',
    category: 'CONNECTIVITY',
    description: 'Zero-friction acoustic handover. Pairs instantly with iOS, macOS, Android, and Windows devices with proximity detection.',
    icon: Bluetooth,
  },
  {
    num: '02',
    title: 'Fast Fuel Charging',
    category: 'POWER',
    description: '15 minutes of rapid charging in the aluminum case yields 4 hours of uncompromised listening at full volume.',
    icon: Zap,
  },
  {
    num: '03',
    title: 'Sweat & Weather Shield',
    category: 'DURABILITY',
    description: 'IPX5 acoustic mesh barriers and sealed chamber architecture resist torrential downpours and grueling sweat sessions.',
    icon: Shield,
  },
  {
    num: '04',
    title: 'Precision Find My',
    category: 'INTELLIGENCE',
    description: 'Locate individual buds or the case anywhere on Earth with directional ultra-wideband guidance and acoustic chirp beacons.',
    icon: Smartphone,
  },
  {
    num: '05',
    title: 'Triple-Mic Beamforming',
    category: 'VOICE',
    description: 'Advanced voice pickup sensors isolate your speech patterns from gale-force winds and roaring subway tunnels.',
    icon: Mic2,
  },
  {
    num: '06',
    title: 'Aerodynamic Wind Guard',
    category: 'ACOUSTICS',
    description: 'AI-driven physical and algorithmic air turbulence filtering ensures crystal clarity during cycling and outdoor runs.',
    icon: Wind,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      data-nav="dark"
      className="relative bg-[#F6F5F1] text-[#121314] py-32 px-6 md:px-12 lg:px-16 overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 max-w-3xl">
          <p className="font-script text-[#FF5A1F] text-2xl sm:text-3xl md:text-4xl mb-3 tracking-wide">
            Every detail considered.
          </p>
          <h2
            id="features-heading"
            className="font-display text-[clamp(3.5rem,10.5vw,11.5rem)] leading-[0.88] uppercase tracking-tight select-none"
          >
            <span className="ln">
              <span className="ln-in block">INTELLIGENT</span>
            </span>
            <span className="ln">
              <span className="ln-in block">
                <OutlineText className="outline-text-stroke-dark hover:outline-text-stroke-orange transition-all">
                  BY DESIGN.
                </OutlineText>
              </span>
            </span>
          </h2>
          <p className="mt-8 text-base sm:text-lg text-[#121314]/70 leading-relaxed font-normal">
            Behind the seamless exterior lies a sophisticated network of environmental sensors,
            energy storage cells, and acoustic waveguides tuned to elevate every second of your day.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <article
                key={feat.title}
                className="group relative bg-white border border-black/5 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(255,90,31,0.18)] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#E9E9E6] group-hover:bg-[#FF5A1F] text-[#121314] group-hover:text-white flex items-center justify-center transition-colors duration-400">
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-mono text-sm font-bold text-[#121314]/30 group-hover:text-[#FF5A1F] transition-colors">
                    {feat.num}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FF5A1F] block mb-2">
                    {feat.category}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-[#121314] group-hover:text-[#FF5A1F] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#121314]/70 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Subtle card bottom accent line */}
                <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#121314]/40">
                    Verified Spec
                  </span>
                  <span className="text-base text-[#FF5A1F] opacity-0 group-hover:opacity-100 transition-opacity">
                    ✦
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
