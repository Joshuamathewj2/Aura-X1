'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 180;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameIndex = useRef(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || images.length === 0) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Set initial frame
    const render = () => {
      const img = images[Math.floor(frameIndex.current)];
      if (img && ctx) {
        // Clear and draw
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        
        // Center and scale image (cover object-fit equivalent)
        const canvas = canvasRef.current!;
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    render();

    const scrollAnim = gsap.to(frameIndex, {
      current: TOTAL_FRAMES - 1,
      snap: 'current',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // Scroll length
        scrub: 0.5,
        pin: true,
        onUpdate: render,
      },
    });

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      scrollAnim.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Canvas for Scroll Sequence */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
      />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        <div className="text-center space-y-4 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-6xl md:text-9xl font-display font-black tracking-tighter"
          >
            AURA X1
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-brand-secondary text-lg md:text-2xl font-light"
          >
            Revolutionary sound. Pure silence.
          </motion.p>
        </div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
