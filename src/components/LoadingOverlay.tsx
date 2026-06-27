import React from 'react';
import { motion } from 'motion/react';

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

        {/* Text Logo Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 flex flex-col items-center"
        >
          <h2 className="text-2xl font-black tracking-[0.3em] metallic-gold-text uppercase">
            SIMNANI
          </h2>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mt-2" />
        </motion.div>
      </div>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-[-1] overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      </div>
    </motion.div>
  );
}
