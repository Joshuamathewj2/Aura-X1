'use client';

import React, { useEffect, useRef } from 'react';
import { clamp, easeOutCubic, hasFinePointer, lerp, pointer, prefersReducedMotion } from '@/lib/motion';

const ORBIT = [
  { src: '/cutouts/part-battery.webp', x: -0.42, y: -0.28, w: 74, depth: 1.6, spin: 22, phase: 0.0 },
  { src: '/cutouts/part-coil.webp', x: 0.4, y: -0.36, w: 84, depth: 1.2, spin: -16, phase: 1.3 },
  { src: '/cutouts/part-driver.webp', x: 0.46, y: 0.22, w: 70, depth: 1.9, spin: 28, phase: 2.1 },
  { src: '/cutouts/part-screw.webp', x: -0.36, y: 0.3, w: 30, depth: 2.4, spin: 60, phase: 0.7 },
  { src: '/cutouts/part-screw-2.webp', x: 0.14, y: -0.5, w: 26, depth: 2.8, spin: -70, phase: 2.8 },
];

/**
 * The hero earbud. Like the Red Velvet cupcake it:
 *  1. drops in from above, squashes on landing and bounces twice,
 *  2. then levitates (bob + sway) with a floor shadow that shrinks as it rises,
 *  3. tilts in 3D toward the pointer, while components orbit at different depths (parallax),
 *  4. lifts away and spins as the hero scrolls out.
 */
export default function FloatingBud({ src = '/cutouts/bud-three-quarter.webp' }: { src?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const squash = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const parts = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const fine = hasFinePointer();
    let raf = 0;
    const t0 = performance.now();
    const tilt = { x: 0, y: 0 };

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      const el = stage.current;
      if (!el || !body.current || !squash.current || !shadow.current) return;

      // --- 1. Intro: drop, squash, two decaying bounces -----------------------------------
      let y = 0;
      let sx = 1;
      let sy = 1;
      let spin = 0;
      const DROP = 0.75;
      if (!reduced && t < DROP) {
        const u = easeOutCubic(t / DROP);
        y = lerp(-520, 0, u * u); // accelerate into the floor
        spin = lerp(-38, 0, u);
      } else if (!reduced && t < DROP + 1.1) {
        const k = t - DROP;
        // decaying bounce: |sin| with exponential damping
        const hop = Math.abs(Math.sin(k * 7.2)) * Math.exp(-k * 3.4);
        y = -hop * 120;
        // squash when touching down, stretch while airborne
        const ground = 1 - clamp(hop * 6);
        sx = 1 + ground * 0.14 * Math.exp(-k * 3) - hop * 0.05;
        sy = 1 - ground * 0.16 * Math.exp(-k * 3) + hop * 0.08;
        spin = Math.sin(k * 9) * 8 * Math.exp(-k * 2.6);
      }

      // --- 2. Idle levitation ------------------------------------------------------------------
      const idleT = Math.max(0, t - (DROP + 1.1));
      const ramp = reduced ? 1 : clamp(idleT / 0.8);
      const bob = reduced ? 0 : Math.sin(idleT * 1.6) * 16 * ramp;
      const sway = reduced ? 0 : Math.sin(idleT * 1.1 + 0.6) * 5 * ramp;
      y += bob - 20 * ramp; // hovers 20px above the floor once idle

      // --- 3. Pointer tilt (smoothed) ---------------------------------------------------------
      tilt.x = lerp(tilt.x, fine && !reduced ? pointer.x : 0, 0.06);
      tilt.y = lerp(tilt.y, fine && !reduced ? pointer.y : 0, 0.06);

      // --- 4. Scroll away: rise, spin and shrink as the hero leaves ---------------------------
      const rect = el.getBoundingClientRect();
      const out = reduced ? 0 : clamp(-rect.top / (rect.height * 1.2));
      y -= out * 260;
      spin += out * 120;
      const scale = 1 - out * 0.35;

      body.current.style.transform =
        `translate3d(${(tilt.x * 18).toFixed(1)}px, ${y.toFixed(1)}px, 0) ` +
        `rotate(${(spin + sway).toFixed(2)}deg) scale(${scale.toFixed(3)}) ` +
        `perspective(900px) rotateY(${(tilt.x * 22).toFixed(2)}deg) rotateX(${(-tilt.y * 16).toFixed(2)}deg)`;
      squash.current.style.transform = `scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;

      // floor shadow: smaller and fainter the higher the bud is
      const height = clamp(-y / 260);
      shadow.current.style.transform = `translateX(${(tilt.x * 10).toFixed(1)}px) scale(${(1 - height * 0.55).toFixed(3)})`;
      shadow.current.style.opacity = (0.55 - height * 0.4 - out * 0.4).toFixed(3);

      // orbiting components: float on their own phase + parallax by depth + slow spin
      parts.current.forEach((p, i) => {
        if (!p) return;
        const o = ORBIT[i];
        const appear = reduced ? 1 : clamp((t - 1.1 - i * 0.12) / 0.6);
        const fy = Math.sin(t * 1.3 + o.phase) * 14;
        const fx = Math.cos(t * 0.9 + o.phase) * 8;
        const px = tilt.x * 26 * o.depth;
        const py = tilt.y * 20 * o.depth;
        const scatter = out * 220 * o.depth;
        p.style.transform =
          `translate3d(${(fx + px + o.x * scatter).toFixed(1)}px, ${(fy + py - scatter * 0.6).toFixed(1)}px, 0) ` +
          `rotate(${(t * o.spin).toFixed(1)}deg) scale(${(0.4 + 0.6 * easeOutCubic(appear)).toFixed(3)})`;
        p.style.opacity = (appear * (1 - out)).toFixed(3);
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={stage} className="relative w-full max-w-[520px] aspect-square select-none" aria-hidden="true">
      {/* glow disc behind the product */}
      <div
        className="absolute inset-[8%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,90,31,0.16) 0%, rgba(255,255,255,0.55) 42%, transparent 70%)' }}
      />
      {ORBIT.map((o, i) => (
        <img
          key={o.src}
          ref={(el) => {
            parts.current[i] = el;
          }}
          src={o.src}
          alt=""
          width={o.w}
          className="absolute pointer-events-none drop-shadow-[0_10px_14px_rgba(0,0,0,0.18)] will-change-transform"
          style={{ left: `${50 + o.x * 100}%`, top: `${50 + o.y * 100}%`, width: o.w, marginLeft: -o.w / 2, opacity: 0 }}
        />
      ))}
      {/* floor shadow */}
      <div
        ref={shadow}
        className="absolute left-1/2 bottom-[9%] w-[46%] h-[7%] -ml-[23%] rounded-[50%] will-change-transform"
        style={{ background: 'radial-gradient(ellipse, rgba(18,19,20,0.45) 0%, rgba(18,19,20,0) 70%)', filter: 'blur(4px)' }}
      />
      <div ref={body} className="absolute inset-[14%] flex items-center justify-center will-change-transform">
        <div ref={squash} className="w-full h-full flex items-end justify-center origin-bottom">
          <img
            src={src}
            alt=""
            className="w-full h-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.22)]"
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}
