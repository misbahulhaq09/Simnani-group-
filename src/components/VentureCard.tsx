import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Globe, 
  ChevronDown, 
  Home, 
  Building2, 
  MapPin, 
  Factory, 
  Wheat, 
  Leaf, 
  Apple, 
  Trees, 
  Fish, 
  Warehouse, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Settings,
  Flame,
  Sparkles
} from 'lucide-react';
import { Venture } from '../types';

interface CategorySubItem {
  name: string;
  desc: string;
}

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  subcategories?: CategorySubItem[];
}

// Let's create custom inline elements/SVG fallbacks or use Lucide icons
// We'll define specific icons for each category
const ESTATE_CATEGORIES: CategoryItem[] = [
  {
    id: 'residential',
    title: 'Residential Projects',
    description: 'Luxurious apartments, modern villas, and state-of-the-art gated residential townships.',
    icon: Home,
  },
  {
    id: 'commercial',
    title: 'Commercial Projects',
    description: 'Premium corporate spaces, high-density retail showrooms, and multi-use business plazas.',
    icon: Building2,
  },
  {
    id: 'plots',
    title: 'Plotted Developments',
    description: 'Fully-developed residential layouts with complete infrastructural roads, power, and water setup.',
    icon: MapPin,
  },
  {
    id: 'industrial',
    title: 'Industrial Land',
    description: 'Prime industrial zones zoned specifically for robust manufacturing, warehouses, and logistic hubs.',
    icon: Factory,
    subcategories: [
      { name: 'Light Industrial Land', desc: 'Assembly, packaging, light assembly units' },
      { name: 'Medium Industrial Land', desc: 'Metal fabrication, general manufacture, regional logistics' },
      { name: 'Heavy Industrial Land', desc: 'Heavy fabrication, smelting, intensive scale operations' },
      { name: 'Special Industrial Land', desc: 'SEZs, hazardous material processing, specialized chemical parks' }
    ]
  }
];

const BIGLAND_CATEGORIES: CategoryItem[] = [
  {
    id: 'agri',
    title: 'Agricultural Land',
    description: 'Highly fertile expansive crop lands boasting excellent natural irrigation and rich soil quality.',
    icon: Wheat,
  },
  {
    id: 'organic',
    title: 'Organic Farming',
    description: 'Pesticide-free organic agriculture focusing on sustainable soil health and nutrient-rich produce.',
    icon: Leaf,
  },
  {
    id: 'horti',
    title: 'Horticulture',
    description: 'High-yield commercial orchards, exotic flower cultivation, and custom greenhouse plantations.',
    icon: Apple,
  },
  {
    id: 'plantation',
    title: 'Plantation Farming',
    description: 'Commercial plantations for high-value timber, palm, and luxury forestry cash crops.',
    icon: Trees,
  },
  {
    id: 'dairy',
    title: 'Dairy Farming',
    // We can render a fallback if Milk is not resolved, but Milk is very standard. 
    // To be absolutely safe, let's use a custom path or a custom icon. Let's design a custom icon component or use a solid Lucide icon like Sprout/Sparkles
    description: 'Mechanized modern dairy farms producing premium-grade organic milk and pasteurized products.',
    icon: Sparkles, 
  },
  {
    id: 'aquaculture',
    title: 'Fish Farming',
    description: 'High-tech bio-floc aquaculture ponds optimized for sustainable freshwater fish species.',
    icon: Fish,
  },
  {
    id: 'poultry',
    title: 'Poultry Farming',
    description: 'State-of-the-art biosecure avian farming for top-tier poultry meat and egg distribution.',
    icon: Zap,
  },
  {
    id: 'greenhouse',
    title: 'Greenhouse / Polyhouse Farming',
    description: 'Automated climate-controlled setups maximizing productivity for exotic off-season crops.',
    icon: Warehouse,
  }
];

interface VentureCardProps {
  venture: Venture;
  index: number;
}

export default function VentureCard({ venture, index }: VentureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEstates = venture.name.toLowerCase().includes('estates');
  const categories = isEstates ? ESTATE_CATEGORIES : BIGLAND_CATEGORIES;

  // Generate customized WhatsApp text for "Learn More"
  const getWhatsAppLearnMoreLink = (categoryTitle: string) => {
    const rawPhone = venture.phone.replace(/[^0-9]/g, '');
    const message = `Hi! I am visiting your website and I would like to learn more about "${categoryTitle}" under "${venture.name}". Please provide details.`;
    return `https://wa.me/${rawPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="h-full">
      <div className="liquid-glass p-6 xs:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] h-full flex flex-col group hover:border-[#D4AF37]/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
        
        {/* Background Layer with Image support */}
        {venture.backgroundImage && (
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#0A1120] opacity-90"></div>
            <img 
              src={venture.backgroundImage} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover opacity-[0.12] grayscale mix-blend-overlay transition-opacity duration-700 group-hover:opacity-[0.18]"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Background Image if exists (Original property) */}
        {venture.image && (
          <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity">
            <img src={venture.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/50 to-transparent" />
          </div>
        )}

        {/* Watermark Logo */}
        {venture.watermarkImage && (
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <img 
              src={venture.watermarkImage} 
              alt="" 
              className="w-[70%] h-auto object-contain opacity-[0.10] grayscale contrast-125 mix-blend-luminosity" 
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Card Header */}
        <div className="relative z-10 mb-6">
          <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-start text-[#D4AF37]/60 mb-6 group-hover:text-[#D4AF37] transition-all duration-500">
            {isEstates ? (
              <Home size={32} strokeWidth={1} />
            ) : (
              <Leaf size={32} strokeWidth={1} />
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-[#D4AF37] mb-4 tracking-tight text-shadow-premium uppercase">{venture.name}</h3>
          <p className="text-white/70 leading-relaxed text-sm md:text-base font-light text-shadow-premium mb-6">
            {venture.description}
          </p>

          {/* Interactive Categories Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-4 px-6 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-xs md:text-sm tracking-[0.2em] uppercase font-black text-[#D4AF37] hover:bg-[#D4AF37]/10 active:bg-[#D4AF37]/15 transition-all duration-300 flex items-center justify-between group cursor-pointer mb-2"
          >
            <span>Explore Categories</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <ChevronDown size={18} className="text-[#D4AF37]" />
            </motion.div>
          </button>
        </div>

        {/* Expandable Categories Panel */}
        <div className="relative z-10 w-full">
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="categories-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: "auto", 
                  opacity: 1,
                  transition: { 
                    height: { duration: 0.4, ease: "easeOut" },
                    opacity: { duration: 0.2, delay: 0.1 }
                  } 
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: { 
                    height: { duration: 0.3, ease: "easeIn" },
                    opacity: { duration: 0.15 }
                  }
                }}
                className="overflow-hidden mb-8"
              >
                <div className="space-y-4 pt-2 border-t border-white/5">
                  {categories.map((cat, catIdx) => {
                    const CatIcon = cat.icon;
                    return (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIdx * 0.05, duration: 0.4 }}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/20 hover:bg-white/[0.04] transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30 text-[#D4AF37] shrink-0 mt-0.5">
                            <CatIcon size={18} strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                              <h4 className="text-sm font-bold text-white tracking-wide uppercase">{cat.title}</h4>
                              <a
                                href={getWhatsAppLearnMoreLink(cat.title)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] tracking-wider text-[#D4AF37] hover:text-white uppercase font-black flex items-center gap-1 group/btn transition-colors w-max"
                              >
                                Learn More 
                                <ArrowRight size={10} className="transform group-hover/btn:translate-x-1 transition-transform" />
                              </a>
                            </div>
                            <p className="text-xs text-gray-400 font-light leading-relaxed">
                              {cat.description}
                            </p>

                            {/* Optional Nested Subcategories for Industrial Land */}
                            {cat.subcategories && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 mt-3 border-t border-white/5">
                                {cat.subcategories.map((sub, sIdx) => (
                                  <div 
                                    key={sIdx} 
                                    className="p-2.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#D4AF37]/10 hover:bg-white/[0.02] transition-colors"
                                  >
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
                                      <span className="text-[10px] font-bold text-white tracking-wide uppercase">{sub.name}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 font-light pl-3">{sub.desc}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Contact and Core Buttons - Stick to bottom */}
        <div className="relative z-10 mt-auto space-y-6 md:space-y-8">
          <div className="flex flex-col gap-1 pt-4 border-t border-white/5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/40 font-bold">Contact</span>
            <span className="text-sm md:text-base font-medium text-white/70 text-shadow-premium tracking-wide">{venture.phone}</span>
            {venture.additionalContacts?.map((contact, idx) => (
              <span key={idx} className="text-sm md:text-base font-medium text-white/70 text-shadow-premium tracking-wide mt-1">{contact.phone}</span>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <a 
              href={venture.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button flex items-center justify-center gap-3 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm tracking-wide"
            >
              <MessageSquare size={18} strokeWidth={1.5} />
              WHATSAPP
            </a>
            {venture.additionalContacts?.map((contact, idx) => (
              <a 
                key={idx}
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button flex items-center justify-center gap-3 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm tracking-wide"
              >
                <MessageSquare size={18} strokeWidth={1.5} />
                WHATSAPP ({contact.phone.replace('+91 ', '')})
              </a>
            ))}
            
            <a 
              href={venture.website}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button flex items-center justify-center gap-3 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm tracking-wide"
            >
              <Globe size={18} strokeWidth={1.5} />
              EXPLORE PROJECTS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
