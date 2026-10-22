'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      id="footer"
      data-nav="light"
      className="bg-[#121314] text-[#F6F5F1] pt-24 pb-12 px-6 md:px-12 lg:px-16 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Giant Logo & Link Columns */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 pb-20 border-b border-white/10">
          <div>
            <Link
              href="#top"
              className="font-display text-[clamp(4rem,13vw,11.5rem)] leading-none uppercase tracking-tight hover:opacity-90 transition-opacity select-none block"
            >
              AURA X1<span className="text-[#FF5A1F]">.</span>
            </Link>
            <p className="mt-4 text-base text-white/50 max-w-sm leading-relaxed">
              Precision acoustic engineering and neural noise cancellation, forged in titanium and composite acoustics.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-14">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-[#FF5A1F] mb-5">
                EXPLORE
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <Link href="#top" className="hover:text-white transition-colors">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="#story" className="hover:text-white transition-colors">
                    Engineering
                  </Link>
                </li>
                <li>
                  <Link href="#teardown" className="hover:text-white transition-colors">
                    Teardown
                  </Link>
                </li>
                <li>
                  <Link href="#lineup" className="hover:text-white transition-colors">
                    Signature Lineup
                  </Link>
                </li>
                <li>
                  <Link href="#anc" className="hover:text-white transition-colors">
                    Adaptive ANC 2.0
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-[#FF5A1F] mb-5">
                SUPPORT
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a href="#cta" className="hover:text-white transition-colors">
                    Pre-order FAQ
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Tech Specifications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Warranty & Care
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-[#FF5A1F] mb-5">
                CONNECT
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Audio Engineering Journal
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Concept Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 AURA Audio Systems. All rights reserved.</p>
          <p className="font-mono text-[#FF5A1F]/80">
            AURA X1 is a concept product.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Audition
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
