import type { Metadata } from 'next';
import { Anton, DM_Sans, Yellowtail } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CursorGlow from '@/components/CursorGlow';
import { cn } from '@/lib/utils';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const yellowtail = Yellowtail({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yellowtail',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AURA X1 | Pure Sound. Engineered to Disappear.',
  description:
    'Experience AURA X1 — the reference standard for precision acoustic engineering, adaptive silence, and exploded architectural mastery.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        anton.variable,
        dmSans.variable,
        yellowtail.variable,
        'scroll-smooth antialiased'
      )}
    >
      <body className="bg-[#E9E9E6] text-[#121314] font-body min-h-screen selection:bg-[#FF5A1F] selection:text-white overflow-x-hidden">
        <CursorGlow />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
