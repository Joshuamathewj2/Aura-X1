'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import OutlineText from '@/components/OutlineText';
import DriftingWords from '@/components/DriftingWords';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 180;

interface CalloutItem {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  minProgress: number;
  maxProgress: number;
  positionClass: string;
}

const CALLOUTS: CalloutItem[] = [
  {
    id: 'stem',
    title: 'Titanium-Finish Stem',
    subtitle: 'AEROSPACE ALLOY',
    detail: 'Anodized titanium housing providing electromagnetic shielding and precision touch control.',
    minProgress: 0.12,
    maxProgress: 0.32,
    positionClass: 'bottom-16 left-6 md:bottom-24 md:left-16',
  },
  {
    id: 'soc',
    title: 'Custom Audio SoC',
    subtitle: 'NEURAL DSP SILICON',
    detail: 'Sub-millisecond latency audio processor driving hybrid ANC filters and 96kHz lossless transmission.',
    minProgress: 0.35,
    maxProgress: 0.58,
    positionClass: 'top-52 right-6 md:top-32 md:right-16',
  },
  {
    id: 'case',
    title: '500 mAh-Class Energy Core',
    subtitle: 'RAPID CHARGE SYSTEM',
    detail: 'High density lithium-polymer cell with Qi wireless charging and 15-minute emergency boost.',
    minProgress: 0.60,
    maxProgress: 0.80,
    positionClass: 'bottom-20 right-6 md:bottom-28 md:right-16',
  },
  {
    id: 'driver',
    title: '11 mm Graphene Driver',
    subtitle: 'CUSTOM TRANSDUCER',
    detail: 'Ultra-stiff graphene diaphragm with pure copper voice coil and neodymium motor assembly.',
    minProgress: 0.82,
    maxProgress: 0.98,
    // Same corner as the stem callout, but they are never visible at the same time.
    positionClass: 'bottom-16 left-6 md:bottom-24 md:left-16',
  },
];

export default function TeardownSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [manualFrame, setManualFrame] = useState(90);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);

  // Check reduced motion preference
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(rm);
  }, []);

  // Preload frames progressively
  useEffect(() => {
    let active = true;

    // Load key milestone frames first for instant visual feedback
    const priorityIndices = [1, 45, 90, 135, 180];
    priorityIndices.forEach((num) => {
      const idx = num - 1;
      const img = new Image();
      const pad = num.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${pad}.jpg`;
      img.onload = () => {
        if (!active) return;
        imagesRef.current[idx] = img;
        setLoadedCount((prev) => prev + 1);
        if (idx === 0 && canvasRef.current) {
          drawFrame(0);
        }
      };
    });

    // Then load the rest
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (priorityIndices.includes(i)) continue;
      const idx = i - 1;
      const img = new Image();
      const pad = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${pad}.jpg`;
      img.onload = () => {
        if (!active) return;
        imagesRef.current[idx] = img;
        setLoadedCount((prev) => prev + 1);
      };
    }

    return () => {
      active = false;
    };
  }, []);

  // Draw frame to canvas with cover fit and crop out bottom-right 5% watermark
  const drawFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find closest loaded frame if requested frame is still loading
    let img = imagesRef.current[frameIdx];
    if (!img) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]) {
          img = imagesRef.current[frameIdx - offset];
          break;
        }
        if (frameIdx + offset < TOTAL_FRAMES && imagesRef.current[frameIdx + offset]) {
          img = imagesRef.current[frameIdx + offset];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    // Scale 1.08x larger and anchor top-left so bottom-right 5% watermark is cropped out
    const baseScale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const scale = baseScale * 1.08;
    const x = (cw - img.naturalWidth * scale) * 0.38;
    const y = (ch - img.naturalHeight * scale) * 0.38;

    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  };

  // GSAP ScrollTrigger scrub
  useEffect(() => {
    if (isReducedMotion) return;
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(Math.floor(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const frameObj = { frame: 0 };

    const pinDistance = window.innerWidth < 768 ? '+=180%' : '+=250%';

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: pinDistance,
      pin: true,
      scrub: 0.4,
      onUpdate: (self) => {
        const prog = self.progress;
        setScrollProgress(prog);
        const targetFrame = Math.min(Math.floor(prog * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
        currentFrameRef.current = targetFrame;
        frameObj.frame = targetFrame;
        requestAnimationFrame(() => drawFrame(targetFrame));
      },
    });

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion]);

  // Handle manual frame selection in reduced motion mode
  useEffect(() => {
    if (isReducedMotion) {
      drawFrame(manualFrame);
    }
  }, [isReducedMotion, manualFrame]);

  return (
    <div
      ref={containerRef}
      id="teardown"
      data-nav="dark"
      className="relative w-full bg-[#E9E9E6] text-[#121314] overflow-hidden select-none"
    >
      <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background drifting words */}
        <DriftingWords
          words={['EXPLODED ARCHITECTURE', '11MM GRAPHENE', 'PURE SILICON']}
          opacity={0.07}
          speed={0.16}
        />

        {/* Floating section title banner */}
        {/* top offset clears the fixed nav (~64px), otherwise the script line is hidden under it */}
        <div className="absolute top-24 left-6 md:top-28 md:left-16 z-20 pointer-events-none">
          <p className="font-script text-[#FF5A1F] text-xl md:text-2xl">
            Internal architecture
          </p>
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-[#121314]">
            TEARDOWN<span className="text-[#FF5A1F]">.</span>
          </h2>
          <p className="text-xs uppercase font-bold tracking-[0.2em] text-[#121314]/50 mt-1">
            Scrub to explode components
          </p>
        </div>

        {/* Canvas for rendering 180 sequence frames */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block will-change-transform"
        />

        {/* Scrub Progress Meter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-white/85 backdrop-blur-md px-5 py-2 rounded-full border border-black/5 shadow-sm">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#121314]/60">
            FRAME {Math.min(Math.floor(scrollProgress * 180) + 1, 180)} / 180
          </span>
          <div className="w-24 h-1 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF5A1F] transition-all duration-75"
              style={{ width: `${(scrollProgress * 100).toFixed(0)}%` }}
            />
          </div>
        </div>

        {/* Dynamic Callout Overlays */}
        {CALLOUTS.map((callout) => {
          const isActive =
            scrollProgress >= callout.minProgress && scrollProgress <= callout.maxProgress;

          return (
            <div
              key={callout.id}
              className={`absolute z-20 max-w-xs md:max-w-sm p-5 md:p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 pointer-events-none ${
                callout.positionClass
              } ${
                isActive
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF5A1F]">
                  {callout.subtitle}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl text-[#121314] uppercase tracking-tight">
                {callout.title}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-[#121314]/70 leading-relaxed">
                {callout.detail}
              </p>
            </div>
          );
        })}

        {/* Fallback for prefers-reduced-motion */}
        {isReducedMotion && (
          <div className="absolute bottom-16 z-30 flex flex-col items-center gap-3 bg-white/95 p-4 rounded-2xl border border-black/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#121314]">
              Manual Exploded View Selector
            </span>
            <div className="flex gap-2">
              {[
                { label: 'Intact', frame: 1 },
                { label: 'Internal Shell', frame: 50 },
                { label: 'Exploded Core', frame: 95 },
                { label: 'Full Teardown', frame: 170 },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setManualFrame(item.frame)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                    manualFrame === item.frame
                      ? 'bg-[#FF5A1F] text-white'
                      : 'bg-black/5 text-[#121314] hover:bg-black/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
