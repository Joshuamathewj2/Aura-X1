'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Splits text into letters that rise, rotate and settle with a stagger when they scroll into
 * view (or immediately with `instant`). Screen readers get the plain text via aria-label.
 */
export default function SplitReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
  instant = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  instant?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (instant) {
      const t = setTimeout(() => setShown(true), 60);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [instant]);

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text} role="text">
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden align-bottom pb-[0.04em]">
          <span
            className="inline-block will-change-transform"
            style={{
              transform: shown ? 'translate3d(0,0,0) rotate(0deg)' : 'translate3d(0,110%,0) rotate(12deg)',
              transition: `transform 0.9s cubic-bezier(0.2,0.9,0.1,1) ${(delay + i * stagger).toFixed(3)}s`,
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
