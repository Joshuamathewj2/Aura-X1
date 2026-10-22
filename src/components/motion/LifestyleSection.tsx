'use client';

import React, { useEffect, useRef, useState } from 'react';
import { clamp, prefersReducedMotion } from '@/lib/motion';
import SplitReveal from '@/components/motion/SplitReveal';

const PHOTOS = [
  {
    src: '/photos/walkway.webp',
    alt: 'Woman in sports sunglasses wearing wireless earbuds on a covered walkway',
    credit: 'Unsplash',
    speed: -0.12,
    className: 'md:col-span-7 aspect-[4/5] md:aspect-[5/6]',
  },
  {
    src: '/photos/city.webp',
    alt: 'Person in a quilted vest wearing earbuds on a city street',
    credit: 'Unsplash',
    speed: 0.1,
    className: 'md:col-span-5 md:mt-40 aspect-[4/5]',
  },
];

const STRIP = ['TRAIN HARDER', 'COMMUTE QUIETER', 'FOCUS DEEPER', 'LIVE LOUDER'];

export default function LifestyleSection() {
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(PHOTOS.map(() => false));

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = frames.current.indexOf(e.target as HTMLDivElement);
          setRevealed((r) => r.map((v, j) => v || j === i));
          io.unobserve(e.target);
        }),
      { threshold: 0.25 },
    );
    frames.current.forEach((f) => f && io.observe(f));

    let raf = 0;
    const tick = () => {
      if (!reduced) {
        frames.current.forEach((f, i) => {
          const img = f?.querySelector('img');
          if (!f || !img) return;
          const r = f.getBoundingClientRect();
          const centre = clamp((r.top + r.height / 2) / window.innerHeight, -1, 2) - 0.5;
          img.style.transform = `translate3d(0, ${(centre * PHOTOS[i].speed * 600).toFixed(1)}px, 0) scale(1.18)`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="life" data-nav="dark" aria-labelledby="life-heading" className="relative bg-[#F6F5F1] text-[#121314] pt-28 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="font-script text-[#FF5A1F] text-2xl md:text-3xl">Made for the way you move.</p>
        <h2 id="life-heading" className="font-display uppercase text-[clamp(3.2rem,9vw,8rem)] leading-[0.9] mt-2">
          <SplitReveal text="Everywhere" />
          <span className="block outline-text-dark">
            <SplitReveal text="you are." delay={0.25} />
          </span>
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mt-14">
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              ref={(el) => {
                frames.current[i] = el;
              }}
              className={`relative ${p.className}`}
            >
              {/* The clip lives on an inner layer: IntersectionObserver ignores a fully clipped target,
                  so observing the clipped element itself would never trigger the reveal. */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[28px] bg-[#121314]"
                style={{
                  clipPath: revealed[i] ? 'inset(0% 0% 0% 0% round 28px)' : 'inset(100% 0% 0% 0% round 28px)',
                  transition: `clip-path 1.3s cubic-bezier(0.7,0,0.2,1) ${i * 0.15}s`,
                }}
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover will-change-transform" />
                <span className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.2em] text-white/70">Photo: {p.credit}</span>
              </div>
            </div>
          ))}

          {/* a bud hovering over the gap between the photos */}
          <img
            src="/cutouts/bud-three-quarter.webp"
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute left-[54%] top-[38%] w-[220px] -ml-[110px] z-10 drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)] animate-[levitate_5s_ease-in-out_infinite]"
          />
        </div>
      </div>

      {/* endless marquee */}
      <div className="mt-24 bg-[#FF5A1F] text-[#121314] py-5 -rotate-2 scale-105 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-[marquee_22s_linear_infinite]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {STRIP.map((s) => (
                <span key={s + k} className="font-display uppercase text-4xl md:text-6xl px-8 flex items-center gap-8">
                  {s}
                  <img src="/cutouts/part-coil.webp" alt="" className="w-12 md:w-16 animate-[spin-slow_6s_linear_infinite]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-24" />
    </section>
  );
}
