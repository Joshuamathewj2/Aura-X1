'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'AURA X1',
    price: '$249',
    description: 'The standard for pure sound.',
    features: ['Adaptive ANC', '6h Battery', 'Wireless Charging', 'Spatial Audio'],
    cta: 'Buy Now',
    highlight: false,
  },
  {
    name: 'AURA X1 Pro',
    price: '$349',
    description: 'For those who demand more.',
    features: ['Intelligent ANC 2.0', '10h Battery', 'MagSafe Case', 'Lossless Audio', 'Personalized EQ'],
    cta: 'Get Pro',
    highlight: true,
  },
  {
    name: 'AURA X1 Ultra',
    price: '$499',
    description: 'The pinnacle of audio engineering.',
    features: ['Studio Grade ANC', '12h Battery', 'Carbon Fiber Case', '96kHz/24-bit', 'VIP Support'],
    cta: 'Go Ultra',
    highlight: false,
  },
];

export default function PriceList() {
  return (
    <section className="py-32 bg-[#050505] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary mb-4 font-bold">Pick your gear</h2>
          <h3 className="text-5xl md:text-6xl font-display font-bold">Find your sound.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-12 rounded-[3rem] border ${
                plan.highlight 
                ? 'border-brand-primary bg-white/[0.03] shadow-[0_0_50px_-12px_rgba(0,113,227,0.3)]' 
                : 'border-white/5 bg-transparent'
              } flex flex-col`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h4 className="text-3xl font-bold mb-2">{plan.name}</h4>
              <p className="text-white/40 text-sm mb-6">{plan.description}</p>
              
              <div className="mb-8 items-baseline">
                <span className="text-5xl font-bold">{plan.price}</span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-brand-primary" />
                    </div>
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                plan.highlight
                ? 'bg-brand-primary text-white hover:bg-blue-600'
                : 'bg-white text-black hover:bg-white/90'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
