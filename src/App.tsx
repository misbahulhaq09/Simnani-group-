/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { MessageSquare, Mail, MapPin, Home, Leaf, Globe, Menu, X, Settings } from 'lucide-react';
import AnimatedHeading from './components/AnimatedHeading';
import FadeIn from './components/FadeIn';
import AdminPanel from './components/AdminPanel';
import LoadingOverlay from './components/LoadingOverlay';
import VentureCard from './components/VentureCard';
import { AppData } from './types';
import logoImg from '../Images/IMG_20260627_132324.jpg';

const ICON_MAP: Record<string, any> = {
  Home,
  Leaf,
  Globe
};

const DEFAULT_DATA: AppData = {
  logoUrl: logoImg,
  heroBackground: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4',
  heroBackgroundType: 'video',
  ventures: [
    {
      name: "Simnani Estates",
      description: "Premium real estate developments and plotted communities designed for modern living.",
      phone: "+91 9407715886",
      whatsapp: "https://wa.me/919407715886",
      website: "https://simnaniestates.com",
      iconName: "Home",
      additionalContacts: [
        { phone: "+91 7869829723", whatsapp: "https://wa.me/917869829723" }
      ],
    },
    {
      name: "Simnani Big Land",
      description: "Sustainable agriculture projects and modern farming initiatives for long-term growth.",
      phone: "+91 9993512100",
      whatsapp: "https://wa.me/919993512100",
      website: "https://simnanibigland.com",
      iconName: "Leaf",
      additionalContacts: [
        { phone: "+91 7869829723", whatsapp: "https://wa.me/917869829723" }
      ],
    }
  ],
  socialLinks: {
    whatsapp: "https://wa.me/919407715886",
    email: "simnanigroupsraipur@gmail.com"
  }
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [appData, setAppData] = useState<AppData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate resource initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const savedData = localStorage.getItem('simnani_app_data_v2');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Migration: Rename Greens to Big Land if found in saved data
        let hasChanges = false;
        if (parsed.ventures) {
          parsed.ventures = parsed.ventures.map((v: any) => {
            if (v.name === "Simnani Greens") {
              v.name = "Simnani Big Land";
              hasChanges = true;
            }
            return v;
          });
        }
        // Migration: Update empty or non-existent logoUrl to the newly uploaded logo
        if (!parsed.logoUrl || parsed.logoUrl === '') {
          parsed.logoUrl = logoImg;
          hasChanges = true;
        }
        if (hasChanges) {
          localStorage.setItem('simnani_app_data_v2', JSON.stringify(parsed));
        }
        setAppData(parsed);
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const handleSaveData = (newData: AppData) => {
    setAppData(newData);
    localStorage.setItem('simnani_app_data_v2', JSON.stringify(newData));
  };

  const handleReset = () => {
    setAppData(DEFAULT_DATA);
    localStorage.removeItem('simnani_app_data_v2');
  };

  return (
    <div className="bg-[#050B18] text-white font-sans scroll-smooth overflow-x-hidden relative">
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>

      <AdminPanel 
        data={appData} 
        onSave={handleSaveData} 
        onReset={handleReset}
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:h-screen overflow-hidden flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {appData.heroBackgroundType === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              key={appData.heroBackground} // Force reload on change
              className="w-full h-full object-cover opacity-60 scale-100"
              src={appData.heroBackground}
            />
          ) : (
            <img 
              src={appData.heroBackground} 
              alt="Hero Background" 
              className="w-full h-full object-cover opacity-60"
            />
          )}
          {/* Cinematic Overlay - Refined */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-[#050B18]/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col flex-1">
          {/* Navbar */}
          <header className="px-5 xs:px-6 md:px-12 lg:px-16 pt-6 md:pt-8 w-full flex justify-center relative z-50">
            <nav className="liquid-glass rounded-2xl px-5 xs:px-8 py-4 w-full flex justify-between items-center h-24 md:h-32 max-w-7xl border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
              <div className="flex items-center transition-transform hover:scale-105 duration-300">
                <img 
                  src={appData.logoUrl || logoImg} 
                  alt="Simnani Groups Logo" 
                  className="h-16 md:h-24 w-auto object-contain logo-sharpness filter drop-shadow-[0_2px_15px_rgba(212,175,55,0.15)]" 
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="hidden md:flex items-center justify-center gap-10">
                {["Ventures", "About", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-medium text-white/80 hover:text-[#D4AF37] transition-all duration-300 tracking-wide text-shadow-premium"
                  >
                    {link}
                  </a>
                ))}
              </div>

              <div className="flex justify-end items-center gap-4">
                {/* Admin Trigger (Settings Icon) */}
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-[#D4AF37]"
                  aria-label="Admin Settings"
                >
                  <Settings size={20} />
                </button>

                {/* Mobile Menu Toggle */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  className="md:hidden text-white/95 hover:text-[#D4AF37] transition-colors duration-300 focus:outline-none p-1"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Call to Action */}
                <a 
                  href="#contact"
                  className="hidden md:inline-flex text-xs tracking-widest text-[#D4AF37] border border-[#D4AF37]/30 hover:border-[#D4AF37] px-4 py-2 rounded-xl transition-all duration-300 hover:bg-[#D4AF37]/10"
                >
                  GET IN TOUCH
                </a>
              </div>
            </nav>

            {/* Premium Mobile Menu Dropdown */}
            <div 
              className={`md:hidden absolute top-[88px] left-5 right-5 z-40 liquid-glass rounded-2xl p-6 transition-all duration-300 ease-out border border-white/10 ${
                isMobileMenuOpen 
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                  : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col gap-4 text-center">
                {["Ventures", "About", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-white/90 hover:text-[#D4AF37] transition-all duration-300 tracking-wide py-2.5 border-b border-white/5 last:border-0"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </header>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center md:justify-end px-5 xs:px-6 md:px-12 lg:px-16 pb-4 md:pb-32 pt-28 md:pt-0">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 md:gap-12 lg:gap-16 items-end w-full max-w-7xl mx-auto">
              <div className="left-col space-y-6 md:space-y-8">
                <FadeIn delay={100} duration={800}>
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-xs md:text-sm tracking-widest uppercase font-semibold text-[#D4AF37] select-none text-shadow-premium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    Founder: Imran Ali
                  </div>
                </FadeIn>

                <AnimatedHeading 
                  text={"Simnani Groups –\nBuilding Opportunities\nAcross Industries"}
                  className="text-[7.5vw] xs:text-[6.5vw] sm:text-[44px] md:text-6xl lg:text-[68px] font-bold mb-4 leading-[1.1] sm:leading-[1.05] tracking-tight text-shadow-premium"
                  initialDelay={200}
                  charDelay={25}
                />
                
                <FadeIn delay={800} duration={1000}>
                  <p className="text-base sm:text-lg md:text-2xl text-white/75 max-w-[580px] leading-relaxed font-light text-shadow-premium">
                    A diversified business group focused on growth, innovation, and impact.
                  </p>
                </FadeIn>

                <FadeIn delay={1200} duration={1000}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2 md:pt-4">
                    <a 
                      href="#ventures"
                      className="glass-button text-center text-white/90 w-full sm:w-auto px-10 py-4 rounded-2xl text-base sm:text-lg font-bold"
                    >
                      Explore Ventures
                    </a>
                  </div>
                </FadeIn>
              </div>

              <div className="hidden lg:block tag-card">
                <FadeIn delay={1400} duration={1000} className="flex justify-end">
                  <div className="liquid-glass border border-[#D4AF37]/10 px-10 py-5 rounded-[2.5rem]">
                    <span className="text-lg font-light tracking-[0.3em] text-[#D4AF37]/80 uppercase text-shadow-premium">
                      Estates • Big Land
                    </span>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures Section */}
      <section id="ventures" className="py-4 md:py-32 px-5 xs:px-6 md:px-12 lg:px-16 relative z-10 bg-[#050B18]">
        <FadeIn className="text-center mb-4 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-shadow-premium">Our Ventures</h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto rounded-full"></div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          {appData.ventures.map((venture, i) => (
            <div key={venture.name} className="h-full">
              <FadeIn delay={200 + i * 100} className="h-full">
                <VentureCard venture={venture} index={i} />
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* Map & About Section */}
      <section id="about" className="py-4 md:py-24 px-5 xs:px-6 md:px-12 lg:px-16 bg-[#0A1120]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">About & Location</h2>
            
            <div className="mb-6 p-4 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 max-w-lg">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]/80 block mb-1">Visionary Leadership</span>
              <p className="text-white text-base md:text-lg font-bold">
                Founder: Imran Ali
              </p>
            </div>

            <p className="text-gray-400 mb-8 max-w-lg leading-relaxed text-sm md:text-base">
              SIMNANI GROUPS, established under the leadership of founder Imran Ali, operates from its central executive office in Currency Tower, Raipur. We are strategically aligned to spearhead growth and premium innovations across diverse real estate and high-impact industries.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#D4AF37] shrink-0 mt-1" size={20} />
                <p className="text-gray-300 text-sm md:text-base">
                  Shop No 1080, First Floor, Beside House of Sansa, Currency Tower, VIP Road Corner, Raipur, Chhattisgarh, India
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-[#D4AF37] shrink-0" size={20} />
                <a href={`mailto:${appData.socialLinks.email}`} className="text-gray-300 hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline text-sm md:text-base">
                  {appData.socialLinks.email}
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300} className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.591605634568!2d81.6749!3d21.2263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd492666d6d3%3A0xe54e66c0fc955b27!2sCurrency%20Tower!5e0!3m2!1sen!2sin!4v1713430000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-6 md:py-12 px-5 xs:px-6 md:px-12 lg:px-16 border-t border-[#D4AF37]/10 bg-[#060B16]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <div className="text-center md:text-left">
            <div className="mb-6">
              <img 
                src={appData.logoUrl || logoImg} 
                alt="Simnani Groups Logo" 
                className="h-16 md:h-20 w-auto object-contain mx-auto md:mx-0 logo-sharpness filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.1)]" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-gray-500 text-sm max-w-xs">Building opportunities across premium real estate and sustainable industries since 2026.</p>
          </div>
          <div className="flex gap-6">
            <a href={appData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors"><MessageSquare size={20} /></a>
            <a href={`mailto:${appData.socialLinks.email}`} className="text-gray-400 hover:text-[#D4AF37] transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
