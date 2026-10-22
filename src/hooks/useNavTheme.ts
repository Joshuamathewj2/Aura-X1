'use client';

import { useState, useEffect } from 'react';

export type NavTheme = 'light' | 'dark';

export function useNavTheme() {
  const [theme, setTheme] = useState<NavTheme>('dark');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Check which section is currently under the header (at y = 48)
      const sections = document.querySelectorAll<HTMLElement>('[data-nav]');
      const checkY = 48;

      for (const section of Array.from(sections)) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= checkY && rect.bottom > checkY) {
          const navAttr = section.getAttribute('data-nav');
          if (navAttr === 'light' || navAttr === 'dark') {
            setTheme(navAttr);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { theme, isScrolled };
}
