import React from 'react';
import { motion } from 'motion/react';
import logoImg from '../../Images/IMG_20260627_132324.jpg';

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-[#050B18] flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Rings */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-24 h-24 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] relative"
        >
          <div className="absolute inset-2 rounded-full border border-[#D4AF37]/10 border-b-[#D4AF37]/40 animate-pulse" />
        </motion.div>

        {/* Logo Image Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 flex flex-col items-center select-none"
        >
          <img 
            src={logoImg} 
            alt="Simnani Groups Logo" 
            className="h-40 md:h-52 w-auto object-contain logo-sharpness mb-6 filter drop-shadow-[0_6px_35px_rgba(212,175,55,0.35)] animate-pulse" 
            referrerPolicy="no-referrer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="h-[1px] w-8 bg-[#D4AF37]/30 mb-3" />
            <span className="text-[#D4AF37]/60 text-[10px] tracking-[0.3em] uppercase font-light">Founder</span>
            <span className="text-[#D4AF37] text-sm md:text-base tracking-[0.1em] font-bold mt-1 uppercase">Imran Ali</span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-[-1] overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      </div>
    </motion.div>
  );
}
