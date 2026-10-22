'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  type = 'button',
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !isFinePointer) return;

    const el = btnRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.36;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const sizeClasses = {
    sm: 'py-2 px-5 text-xs',
    md: 'py-3.5 px-7 text-xs md:text-sm',
    lg: 'py-4 px-9 text-sm md:text-base',
  };

  const variantClasses = {
    primary:
      'bg-[#121314] text-[#F6F5F1] hover:text-white before:bg-[#FF5A1F]',
    orange:
      'bg-[#FF5A1F] text-white hover:text-white before:bg-[#121314]',
    dark:
      'bg-[#F6F5F1] text-[#121314] hover:text-white before:bg-[#FF5A1F]',
    secondary:
      'bg-white/10 text-white backdrop-blur-md hover:text-white before:bg-[#FF5A1F]',
    outline:
      'bg-transparent text-current border border-current hover:text-white hover:border-[#FF5A1F] before:bg-[#FF5A1F]',
  };

  const sharedStyles = cn(
    'relative inline-flex items-center justify-center gap-3 rounded-full font-bold uppercase tracking-[0.2em] overflow-hidden isolation-isolate select-none cursor-pointer group transition-all duration-300',
    'before:content-[""] before:absolute before:inset-0 before:z-[-1] before:rounded-full before:translate-y-[102%] before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.7,0,0.2,1)] hover:before:translate-y-0',
    'hover:scale-[1.045] hover:shadow-[0_16px_36px_-12px_rgba(255,90,31,0.5)] active:scale-98',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const style = {
    transform: position.x || position.y ? `translate3d(${position.x.toFixed(1)}px, ${position.y.toFixed(1)}px, 0)` : undefined,
    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.9, 0.1, 1)',
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <span
          className="relative z-10 text-base leading-none transition-transform duration-300 ease-[cubic-bezier(0.2,0.9,0.1,1)] group-hover:translate-x-1.5"
          aria-hidden="true"
        >
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedStyles}
        style={style}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={sharedStyles}
      style={style}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
