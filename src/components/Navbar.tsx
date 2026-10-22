'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useNavTheme } from '@/hooks/useNavTheme';
import MagneticButton from '@/components/MagneticButton';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Overview', href: '#top' },
  { label: 'Engineering', href: '#story' },
  { label: 'Teardown', href: '#teardown' },
  { label: 'Lineup', href: '#lineup' },
  { label: 'ANC 2.0', href: '#anc' },
  { label: 'Specs', href: '#features' },
];

export default function Navbar() {
  const { theme, isScrolled } = useNavTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // If theme is 'light', the underlying section is dark (graphite/deep accent), so nav text is light (#F6F5F1)
  // If theme is 'dark', the underlying section is light (silver mist/off-white), so nav text is dark (#121314)
  const isLightNav = theme === 'light';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ease-out',
          isLightNav ? 'text-[#F6F5F1]' : 'text-[#121314]',
          isScrolled && (isLightNav ? 'bg-[#121314]/75 backdrop-blur-md shadow-sm border-b border-white/5 py-3.5' : 'bg-[#E9E9E6]/80 backdrop-blur-md shadow-sm border-b border-black/5 py-3.5')
        )}
      >
        {/* Brand Wordmark */}
        <Link
          href="#top"
          className="font-display text-2xl md:text-3xl tracking-tight uppercase hover:opacity-85 transition-opacity"
          aria-label="AURA X1, back to top"
        >
          AURA X1<span className="text-[#FF5A1F]">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-11 text-xs font-bold uppercase tracking-[0.22em]">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative py-1 hover:text-[#FF5A1F] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#FF5A1F] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <MagneticButton
              href="#cta"
              size="sm"
              variant={isLightNav ? 'orange' : 'primary'}
            >
              Pre-order
            </MagneticButton>
          </div>

          {/* Mobile Burger Button */}
          <button
            type="button"
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={cn(
                'w-6 h-[2px] bg-current rounded-full transition-transform duration-300',
                mobileMenuOpen && 'translate-y-2 rotate-45 text-[#F6F5F1]'
              )}
            />
            <span
              className={cn(
                'w-6 h-[2px] bg-current rounded-full transition-opacity duration-300',
                mobileMenuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'w-6 h-[2px] bg-current rounded-full transition-transform duration-300',
                mobileMenuOpen && '-translate-y-2 -rotate-45 text-[#F6F5F1]'
              )}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen Circular Reveal Mobile Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileMenuOpen}
        className={cn(
          'fixed inset-0 z-40 bg-[#121314] text-[#F6F5F1] flex flex-col justify-between p-8 pt-28 md:hidden transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)]',
          mobileMenuOpen ? 'pointer-events-auto [clip-path:circle(150%_at_calc(100%-40px)_40px)]' : 'pointer-events-none [clip-path:circle(0px_at_calc(100%-40px)_40px)]'
        )}
      >
        <div className="flex flex-col gap-5">
          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-4xl sm:text-5xl uppercase tracking-tight hover:text-[#FF5A1F] transition-colors"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
          <p className="font-script text-[#FF5A1F] text-2xl">
            Hear what you've been missing.
          </p>
          <MagneticButton
            href="#cta"
            size="md"
            variant="orange"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pre-order AURA X1
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
