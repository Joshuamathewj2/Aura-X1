import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SoundShowcase from '@/components/SoundShowcase';
import ANCShowcase from '@/components/ANCShowcase';
import ThreeDViewer from '@/components/ThreeDViewer';
import SmartFeatures from '@/components/SmartFeatures';
import PriceList from '@/components/PriceList';

export default function Home() {
  return (
    <main className="relative bg-black w-full min-h-screen selection:bg-brand-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section with Scroll Sequence */}
      <Hero />
      
      {/* Sound Technology Showcase */}
      <SoundShowcase />
      
      {/* 360 Interactive Viewer */}
      <ThreeDViewer />
      
      {/* ANC Demonstration */}
      <ANCShowcase />
      
      {/* Smart Features Grid */}
      <SmartFeatures />
      
      {/* Pricing Plans */}
      <PriceList />
      
      {/* Footer / Final CTA */}
      <footer className="py-32 border-t border-white/5 px-6 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <span className="text-3xl font-display font-bold tracking-tighter">AURA X1</span>
              <p className="text-white/40 mt-6 text-lg max-w-sm leading-relaxed">
                Redefining the boundaries of audio engineering. Experience sound like never before.
              </p>
              <div className="flex space-x-4 mt-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer">
                    <div className="w-4 h-4 bg-white/20 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm uppercase font-bold tracking-widest text-white/40 mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Overview', 'Sound', 'ANC', 'Features', 'Specs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase font-bold tracking-widest text-white/40 mb-8">Support</h4>
              <ul className="space-y-4">
                {['Help Center', 'Warranty', 'Contact', 'Privacy', 'Terms'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">© 2026 AURA Audio. Designed in Chennai.</p>
            <div className="flex space-x-8">
              <span className="text-white/20 text-xs hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
              <span className="text-white/20 text-xs hover:text-white cursor-pointer transition-colors">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
