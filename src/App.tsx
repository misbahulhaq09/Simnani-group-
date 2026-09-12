/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { MessageSquare, Mail, MapPin, Home, Leaf, Globe, Menu, X, Settings, Instagram, Building2, Camera, Upload, User } from 'lucide-react';
import AnimatedHeading from './components/AnimatedHeading';
import FadeIn from './components/FadeIn';
import AdminPanel from './components/AdminPanel';
import LoadingOverlay from './components/LoadingOverlay';
import VentureCard from './components/VentureCard';
import { AppData } from './types';
import logoImg from '../Images/IMG_20260627_132324.jpg';
import officeImg from '../Images/87a643714e3f10db3fb44a5c4793d5b2.jpg';
import estatesWatermark from '../Images/IMG_20260627_143308.jpg';

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
      website: "https://www.simnaniestates.com/",
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
  },
  leadership: {
    imranAliPhoto: '',
    shaikhMahfoozPhoto: ''
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
            if (v.name === "Simnani Estates") {
              if (v.website !== "https://www.simnaniestates.com/") {
                v.website = "https://www.simnaniestates.com/";
                hasChanges = true;
              }
              if (v.watermarkImage || v.backgroundImage) {
                delete v.watermarkImage;
                delete v.backgroundImage;
                hasChanges = true;
              }
            }
            return v;
          });
        }
        // Migration: Update empty or non-existent logoUrl to the newly uploaded logo
        if (!parsed.logoUrl || parsed.logoUrl === '') {
          parsed.logoUrl = logoImg;
          hasChanges = true;
        }
        // Ensure imranAliPhoto is cleared
        if (parsed.leadership?.imranAliPhoto) {
          parsed.leadership.imranAliPhoto = '';
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

      <main>
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
              alt="Simnani Groups Premium Real Estate and Agriculture Developments in Raipur" 
              width={1920}
              height={1080}
              loading="eager"
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
            <nav className="liquid-glass rounded-2xl px-5 xs:px-8 py-5 md:py-6 w-full flex justify-between items-center max-w-7xl border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.05)]">
              <div className="flex items-center transition-transform hover:scale-105 duration-300">
                <img 
                  src={appData.logoUrl || logoImg} 
                  alt="Simnani Groups Logo - Premium Real Estate & Agriculture Investments in Chhattisgarh" 
                  width={200}
                  height={144}
                  fetchPriority="high"
                  className="h-20 xs:h-24 md:h-36 w-auto object-contain logo-sharpness filter drop-shadow-[0_4px_25px_rgba(212,175,55,0.25)]" 
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="hidden md:flex items-center justify-center gap-10">
                {["Ventures", "Services", "About", "Contact"].map((link) => (
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
                {/* Instagram Link */}
                <a 
                  href="https://www.instagram.com/simnani.groups/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-[#D4AF37]"
                  title="Instagram: @simnani.groups"
                >
                  <Instagram size={20} />
                </a>

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
              className={`md:hidden absolute top-full mt-3 left-5 right-5 z-40 liquid-glass rounded-2xl p-6 transition-all duration-300 ease-out border border-white/10 ${
                isMobileMenuOpen 
                  ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                  : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col gap-4 text-center">
                {["Ventures", "Services", "About", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-white/90 hover:text-[#D4AF37] transition-all duration-300 tracking-wide py-2.5 border-b border-white/5 last:border-0"
                  >
                    {link}
                  </a>
                ))}
                
                {/* Mobile Social Links */}
                <div className="flex justify-center gap-6 pt-4 border-t border-white/5 mt-2">
                  <a href={appData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#D4AF37] transition-colors" title="WhatsApp">
                    <MessageSquare size={20} />
                  </a>
                  <a href="https://www.instagram.com/simnani.groups/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#D4AF37] transition-colors" title="Instagram">
                    <Instagram size={20} />
                  </a>
                  <a href={`mailto:${appData.socialLinks.email}`} className="text-white/60 hover:text-[#D4AF37] transition-colors" title="Email">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col justify-center md:justify-end px-5 xs:px-6 md:px-12 lg:px-16 pb-4 md:pb-32 pt-28 md:pt-0">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 md:gap-12 lg:gap-16 items-end w-full max-w-7xl mx-auto">
              <div className="left-col space-y-6 md:space-y-8">
                <FadeIn delay={100} duration={800}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5">
                    <div className="inline-flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-xs sm:text-sm tracking-wide font-semibold text-[#D4AF37] select-none text-shadow-premium">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#D4AF37]/60 bg-[#0A1120] flex items-center justify-center shrink-0 shadow-sm">
                        {appData.leadership?.imranAliPhoto ? (
                          <img src={appData.leadership.imranAliPhoto} alt="Imran Ali" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[11px] font-bold text-[#D4AF37]">IA</span>
                        )}
                      </div>
                      <span className="text-sm sm:text-base font-medium">Founder: Imran Ali</span>
                    </div>

                    <div className="inline-flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-xs sm:text-sm tracking-wide font-semibold text-[#D4AF37] select-none text-shadow-premium">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#D4AF37]/60 bg-[#0A1120] flex items-center justify-center shrink-0 shadow-sm">
                        {appData.leadership?.shaikhMahfoozPhoto ? (
                          <img src={appData.leadership.shaikhMahfoozPhoto} alt="Shaikh Mahfooz" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[11px] font-bold text-[#D4AF37]">SM</span>
                        )}
                      </div>
                      <span className="text-sm sm:text-base font-medium">Co-Founder: Shaikh Mahfooz</span>
                    </div>
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

      {/* Services Section */}
      <section id="services" className="py-12 md:py-24 px-5 xs:px-6 md:px-12 lg:px-16 bg-[#070D1B] border-t border-[#D4AF37]/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-shadow-premium text-white">Services</h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto rounded-full mb-8"></div>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-4xl mx-auto font-light">
              We provide verified Industrial, Commercial, Residential and Agricultural Land solutions across Chhattisgarh and Madhya Pradesh. Through Simnani Estates, we offer Industrial Land, Factory Land, Warehouse Land, Commercial &amp; Residential Properties. Through Simnani Big Land, we provide Agricultural Land, Farm Investment, Polyhouse &amp; Greenhouse Design, Construction &amp; Installation, Smart Farming Solutions and Plantation Projects.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mt-8 md:mt-12">
            <FadeIn delay={200} className="h-full">
              <div className="bg-[#0A1120] border border-[#D4AF37]/20 rounded-3xl p-6 md:p-8 h-full shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-all pointer-events-none"></div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-3 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">Simnani Estates</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    "Industrial Land",
                    "Commercial Property",
                    "Residential Property",
                    "Factory Land",
                    "Warehouse Land",
                    "Property Consultation"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={300} className="h-full">
              <div className="bg-[#0A1120] border border-[#D4AF37]/20 rounded-3xl p-6 md:p-8 h-full shadow-xl hover:border-[#D4AF37]/40 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-all pointer-events-none"></div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-3 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                    <Leaf size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">Simnani Big Land</h3>
                </div>
                <ul className="space-y-3.5">
                  {[
                    "Agricultural Land",
                    "Farm Investment",
                    "Polyhouse Design",
                    "Polyhouse Construction",
                    "Greenhouse Installation",
                    "Smart Farming Solutions"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map & About Section */}
      <section id="about" className="py-4 md:py-24 px-5 xs:px-6 md:px-12 lg:px-16 bg-[#0A1120]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">About & Location</h2>
            
            <div className="mb-8 max-w-xl space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block">
                Leadership
              </span>
              
              <div className="flex flex-col gap-4">
                {/* Imran Ali Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/25 hover:border-[#D4AF37]/40 transition-all flex items-center gap-5 shadow-lg">
                  <div 
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#D4AF37]/50 p-1 bg-[#0A1120] shrink-0 overflow-hidden shadow-xl shadow-[#D4AF37]/10 flex items-center justify-center select-none"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#D4AF37]/25 via-[#0A1120] to-[#D4AF37]/10 flex flex-col items-center justify-center text-[#D4AF37]">
                      <span className="text-xl sm:text-2xl font-bold tracking-wider">IA</span>
                      <span className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-medium mt-0.5">
                        Founder
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">Imran Ali</h3>
                    <p className="text-sm sm:text-base text-[#D4AF37] mt-1 font-medium leading-snug">
                      Founder — Real Estate &amp; Business Development
                    </p>
                  </div>
                </div>

                {/* Shaikh Mahfooz Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/25 hover:border-[#D4AF37]/40 transition-all flex items-center gap-5 shadow-lg">
                  <div 
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#D4AF37]/50 p-1 bg-[#0A1120] shrink-0 overflow-hidden shadow-xl shadow-[#D4AF37]/10 flex items-center justify-center select-none"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#D4AF37]/25 via-[#0A1120] to-[#D4AF37]/10 flex flex-col items-center justify-center text-[#D4AF37]">
                      <span className="text-xl sm:text-2xl font-bold tracking-wider">SM</span>
                      <span className="text-[9px] uppercase tracking-widest text-[#D4AF37]/80 font-medium mt-0.5">
                        Co-Founder
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">Shaikh Mahfooz</h3>
                    <p className="text-sm sm:text-base text-[#D4AF37] mt-1 font-medium leading-snug">
                      Co-Founder — Land &amp; Farmland Ventures
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-400 mb-8 max-w-lg leading-relaxed text-sm md:text-base">
              SIMNANI GROUPS, under the visionary leadership of Imran Ali and Shaikh Mahfooz, operates from its central executive office in Currency Tower, Raipur. We are strategically aligned to spearhead growth and premium innovations across diverse real estate, farmland ventures, and high-impact industries.
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
              <div className="flex items-center gap-4">
                <Instagram className="text-[#D4AF37] shrink-0" size={20} />
                <a href="https://www.instagram.com/simnani.groups/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline text-sm md:text-base">
                  @simnani.groups
                </a>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6 w-full">
            <FadeIn delay={300} className="w-full h-[250px] sm:h-[300px] rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl relative group">
              <img 
                src={officeImg} 
                alt="Simnani Groups Executive Office at Currency Tower, Raipur, Chhattisgarh" 
                width={600}
                height={300}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">Executive Office</span>
                <h3 className="text-white text-lg font-bold mt-1">Currency Tower, Raipur</h3>
              </div>
            </FadeIn>

            <FadeIn delay={400} className="w-full h-[250px] sm:h-[300px] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
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
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="py-6 md:py-12 px-5 xs:px-6 md:px-12 lg:px-16 border-t border-[#D4AF37]/10 bg-[#060B16]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <div className="text-center md:text-left">
            <div className="mb-6">
              <img 
                src={appData.logoUrl || logoImg} 
                alt="Simnani Groups Logo - Premium Real Estate Developments" 
                width={150}
                height={128}
                loading="lazy"
                className="h-24 md:h-32 w-auto object-contain mx-auto md:mx-0 logo-sharpness filter drop-shadow-[0_4px_20px_rgba(212,175,55,0.2)]" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-gray-500 text-sm max-w-xs">Building opportunities across premium real estate and sustainable industries since 2026.</p>
          </div>
          <div className="flex gap-6">
            <a href={appData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors" title="WhatsApp"><MessageSquare size={20} /></a>
            <a href="https://www.instagram.com/simnani.groups/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors" title="Instagram"><Instagram size={20} /></a>
            <a href={`mailto:${appData.socialLinks.email}`} className="text-gray-400 hover:text-[#D4AF37] transition-colors" title="Email"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
