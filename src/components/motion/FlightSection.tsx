'use client';

import React, { useEffect, useRef } from 'react';
import { clamp, easeInOut, lerp, PARTS, prefersReducedMotion } from '@/lib/motion';

const POOL = 26;

type Particle = { el: HTMLImageElement | null; x: number; y: number; vx: number; vy: number; r: number; vr: number; life: number; max: number };

/**
 * Scroll-driven flight scene (AURA's version of Red Velvet's rolling cupcake).
 * A sticky stage; scroll progress drives the earbud along a wave across the screen while it
 * spins, stretches along its velocity, leaves ghost trails and sheds tumbling components.
 */
export default function FlightSection() {
  const section = useRef<HTMLElement>(null);
  const bud = useRef<HTMLDivElement>(null);
  const ghosts = useRef<(HTMLDivElement | null)[]>([]);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);
  const grams = useRef<HTMLSpanElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const particleEls = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const pool: Particle[] = particleEls.current.map((el) => ({ el, x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0, life: 0, max: 1 }));
    let raf = 0;
    let last = performance.now();
    let prevX = 0;
    let prevY = 0;
    let emitAcc = 0;

    // position of the bud for a given progress (0..1), in px relative to the stage
    const pose = (p: number, w: number, h: number) => {
      const s = easeInOut(clamp((p - 0.05) / 0.9));
      const x = lerp(-0.22 * w, 1.22 * w, s);
      // wave through the lower part of the stage so it passes under the copy block
      const y = h * 0.64 + Math.sin(s * Math.PI * 2.5) * h * 0.15 - Math.sin(s * Math.PI) * h * 0.06;
      const rot = s * 720 + Math.sin(s * Math.PI * 5) * 12;
      return { x, y, rot };
    };

    const emit = (x: number, y: number, vx: number, vy: number) => {
      const p = pool.find((q) => q.life <= 0);
      if (!p) return;
      p.x = x;
      p.y = y;
      p.vx = -vx * 0.25 + (Math.random() - 0.5) * 260;
      p.vy = -vy * 0.15 - 120 - Math.random() * 220;
      p.r = Math.random() * 360;
      p.vr = (Math.random() - 0.5) * 720;
      p.max = p.life = 1.1 + Math.random() * 0.8;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const el = section.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const w = window.innerWidth;
      const progress = clamp(-rect.top / Math.max(1, rect.height - vh));
      const visible = rect.top < vh && rect.bottom > 0;

      if (visible) {
        const p = reduced ? 0.5 : progress;
        const a = pose(p, w, vh);
        const vx = (a.x - prevX) / Math.max(dt, 0.001);
        const vy = (a.y - prevY) / Math.max(dt, 0.001);
        prevX = a.x;
        prevY = a.y;
        // stretch along the direction of travel, proportional to speed
        const speed = Math.min(1, Math.hypot(vx, vy) / 2400);
        const angle = Math.atan2(vy, vx) * (180 / Math.PI);

        if (bud.current) {
          bud.current.style.transform =
            `translate3d(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px, 0) translate(-50%, -50%) ` +
            `rotate(${angle.toFixed(1)}deg) scale(${(1 + speed * 0.22).toFixed(3)}, ${(1 - speed * 0.16).toFixed(3)}) rotate(${(-angle).toFixed(1)}deg) ` +
            `rotate(${a.rot.toFixed(1)}deg)`;
        }
        ghosts.current.forEach((g, i) => {
          if (!g) return;
          const q = pose(p - (i + 1) * 0.018, w, vh);
          g.style.transform = `translate3d(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${q.rot.toFixed(1)}deg)`;
          g.style.opacity = reduced ? '0' : ((0.28 - i * 0.12) * Math.min(1, speed * 3)).toFixed(3);
        });

        // shed components while moving fast
        if (!reduced) {
          emitAcc += speed * dt * 22;
          while (emitAcc > 1) {
            emitAcc -= 1;
            emit(a.x, a.y, vx, vy);
          }
        }

        if (rowA.current) rowA.current.style.transform = `translate3d(${(-progress * 40).toFixed(2)}%, 0, 0)`;
        if (rowB.current) rowB.current.style.transform = `translate3d(${(-40 + progress * 40).toFixed(2)}%, 0, 0)`;
        if (grams.current) grams.current.textContent = (clamp(progress / 0.85) * 4.8).toFixed(1);
        if (copy.current) {
          const c = clamp((progress - 0.08) / 0.2);
          copy.current.style.opacity = c.toFixed(3);
          copy.current.style.transform = `translate3d(0, ${((1 - c) * 40).toFixed(1)}px, 0)`;
        }
      }

      // particle physics (gravity + spin + fade)
      for (const q of pool) {
        if (!q.el) continue;
        if (q.life <= 0) {
          q.el.style.opacity = '0';
          continue;
        }
        q.life -= dt;
        q.vy += 900 * dt;
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.r += q.vr * dt;
        q.el.style.transform = `translate3d(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${q.r.toFixed(0)}deg)`;
        q.el.style.opacity = clamp((q.life / q.max) * 2).toFixed(3);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={section} id="flight" data-nav="light" aria-labelledby="flight-heading" className="relative h-[320vh] bg-[#121314] text-[#F6F5F1]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* giant outlined words drifting in opposite directions */}
        <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-center gap-[2vh] pointer-events-none select-none">
          <div ref={rowA} className="whitespace-nowrap font-display uppercase text-[22vh] leading-none outline-text-orange opacity-30 will-change-transform">
            FEATHER LIGHT · FEATHER LIGHT · FEATHER LIGHT ·
          </div>
          <div ref={rowB} className="whitespace-nowrap font-display uppercase text-[22vh] leading-none outline-text-light opacity-15 will-change-transform">
            ZERO FATIGUE · ZERO FATIGUE · ZERO FATIGUE ·
          </div>
        </div>

        {/* copy */}
        <div ref={copy} className="absolute left-6 md:left-16 top-24 md:top-28 z-20 max-w-md opacity-0">
          <p className="font-script text-[#FF5A1F] text-2xl md:text-3xl">Light enough to forget.</p>
          <h2 id="flight-heading" className="font-display uppercase text-5xl md:text-7xl leading-[0.9] mt-2">
            <span ref={grams}>0.0</span> grams.
            <span className="block outline-text-light">All day.</span>
          </h2>
          <p className="mt-4 text-[#F6F5F1]/70 text-base md:text-lg leading-relaxed">
            Each bud weighs 4.8 g. A titanium-finish stem and hollow-core shell keep the weight where you can&apos;t feel it.
          </p>
        </div>

        {/* shed components */}
        {Array.from({ length: POOL }).map((_, i) => (
          <img
            key={i}
            ref={(el) => {
              particleEls.current[i] = el;
            }}
            src={PARTS[i % PARTS.length]}
            alt=""
            aria-hidden="true"
            className="absolute left-0 top-0 pointer-events-none opacity-0 will-change-transform"
            style={{ width: i % PARTS.length >= 4 ? 18 : 40 }}
          />
        ))}

        {/* ghost trails + the bud */}
        {[0, 1].map((i) => (
          <div
            key={i}
            ref={(el) => {
              ghosts.current[i] = el;
            }}
            aria-hidden="true"
            className="absolute left-0 top-0 w-[min(34vw,300px)] pointer-events-none will-change-transform"
          >
            <img src="/cutouts/bud-side.webp" alt="" className="w-full" />
          </div>
        ))}
        <div ref={bud} className="absolute left-0 top-0 w-[min(34vw,300px)] z-10 will-change-transform">
          <img src="/cutouts/bud-side.webp" alt="AURA X1 earbud in flight" className="w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.6)]" />
        </div>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[#F6F5F1]/40">Keep scrolling</p>
      </div>
    </section>
  );
}
