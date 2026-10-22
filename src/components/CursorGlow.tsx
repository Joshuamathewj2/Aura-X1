'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !isFinePointer) return;

    let mouseX = -100;
    let mouseY = -100;
    let glowX = -100;
    let glowY = -100;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (glowRef.current) glowRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (glowRef.current) glowRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const loop = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX - 250}px, ${glowY - 250}px, 0)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Soft orange radial ambient glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[500px] h-[500px] pointer-events-none z-[60] opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(255, 90, 31, 0.12) 0%, rgba(255, 90, 31, 0.03) 45%, transparent 70%)',
        }}
      />
      {/* Precision cursor dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF5A1F] pointer-events-none z-[61] opacity-0 transition-opacity duration-300 will-change-transform shadow-[0_0_8px_rgba(255,90,31,0.8)]"
      />
    </>
  );
}
