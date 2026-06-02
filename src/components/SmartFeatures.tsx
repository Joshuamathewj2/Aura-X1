'use client';

import { motion } from 'framer-motion';
import { Bluetooth, Zap, Shield, Smartphone, Mic2, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Instant Pairing',
    description: 'Magic setup with any device in your ecosystem.',
    icon: Bluetooth,
    className: 'md:col-span-2 md:row-span-1 bg-blue-900/10',
  },
  {
    title: 'Fast Charging',
    description: '15 mins = 4 hours of playtime.',
    icon: Zap,
    className: 'md:col-span-1 md:row-span-1 bg-yellow-900/10',
  },
  {
    title: 'Sweat Proof',
    description: 'IPX5 rated for the toughest workouts.',
    icon: Shield,
    className: 'md:col-span-1 md:row-span-2 bg-green-900/10',
  },
  {
    title: 'Find My Support',
    description: 'Never lose your earbuds again.',
    icon: Smartphone,
    className: 'md:col-span-1 md:row-span-1 bg-purple-900/10',
  },
  {
    title: 'Crystal Clear Calls',
    description: 'Triple-mic beamforming system.',
    icon: Mic2,
    className: 'md:col-span-1 md:row-span-1 bg-red-900/10',
  },
  {
    title: 'Wind Reduction',
    description: 'AI-driven background filtering.',
    icon: Wind,
    className: 'md:col-span-2 md:row-span-1 bg-cyan-900/10',
  },
];

export default function SmartFeatures() {
  return (
    <section className="py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary mb-4 font-bold">Intelligence</h2>
          <h3 className="text-5xl md:text-6xl font-display font-bold">Brilliant by design.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[300px]">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                'relative group p-8 rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col justify-end transition-all hover:border-white/20',
                feature.className
              )}
            >
              <div className="absolute top-8 left-8 p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-brand-primary group-hover:border-brand-primary/50 transition-all duration-500">
                <feature.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2">{feature.title}</h4>
                <p className="text-white/40 leading-relaxed">{feature.description}</p>
              </div>
              
              {/* Subtle Gradient Background */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.05] to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
