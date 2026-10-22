import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StorySection from '@/components/StorySection';
import TeardownSection from '@/components/TeardownSection';
import LineupSection from '@/components/LineupSection';
import ANCSection from '@/components/ANCSection';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FlightSection from '@/components/motion/FlightSection';
import LifestyleSection from '@/components/motion/LifestyleSection';

export default function Home() {
  return (
    <>
      {/* Brand Preloader */}
      <Preloader />

      {/* Dynamic Nav with Light/Dark Section Switching */}
      <Navbar />

      <main className="relative w-full">
        {/* 1. Hero (Silver Mist #E9E9E6, nav dark) */}
        <Hero />

        {/* 1b. Flight: scroll-driven earbud flying across the screen (Graphite, nav light) */}
        <FlightSection />

        {/* 2. More than earbuds (Graphite #121314, nav light) */}
        <StorySection />

        {/* 3. TEARDOWN — Pinned Scroll Scene (Silver Mist #E9E9E6, nav dark) */}
        <TeardownSection />

        {/* 3b. Lifestyle photos with parallax + marquee (Off-White, nav dark) */}
        <LifestyleSection />

        {/* 4. Signature lineup (Off-White #F6F5F1, nav dark) */}
        <LineupSection />

        {/* 5. Adaptive ANC (Deep Accent #1B1F2A, nav light) */}
        <ANCSection />

        {/* 6. Features (Off-White #F6F5F1, nav dark) */}
        <FeaturesSection />

        {/* 7. CTA (Signal Orange #FF5A1F, nav light) */}
        <CTASection />
      </main>

      {/* 8. Footer (Graphite #121314, nav light) */}
      <Footer />
    </>
  );
}
