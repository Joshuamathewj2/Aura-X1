'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DriftingWordsProps {
  words: string[];
  direction?: 'left' | 'right' | 'alternate';
  className?: string;
  speed?: number;
  opacity?: number;
  outlined?: boolean;
}

export default function DriftingWords({
  words,
  direction = 'alternate',
  className,
  speed = 0.15,
  opacity = 0.06,
  outlined = true,
}: DriftingWordsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only animate when visible in or near viewport
      if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const offset = (progress - 0.5) * 100 * speed;

      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const dir = direction === 'alternate' ? (i % 2 === 0 ? -1 : 1) : direction === 'left' ? -1 : 1;
        const xTranslate = offset * dir * 18;
        row.style.transform = `translate3d(${xTranslate.toFixed(1)}px, 0, 0)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-around select-none z-0',
        className
      )}
      aria-hidden="true"
      style={{ opacity }}
    >
      {words.map((word, i) => (
        <div
          key={i}
          ref={(el) => {
            rowsRef.current[i] = el;
          }}
          className={cn(
            'whitespace-nowrap font-display text-[clamp(5rem,18vw,22rem)] leading-none tracking-tighter will-change-transform py-2',
            outlined ? 'outline-text-stroke text-transparent' : 'text-current'
          )}
        >
          {word}&nbsp;&nbsp;&nbsp;&nbsp;{word}&nbsp;&nbsp;&nbsp;&nbsp;{word}
        </div>
      ))}
    </div>
  );
}
