import React from 'react';
import { motion } from 'motion/react';
import { playSuccess, playBloop } from '../utils/audio';

export default function NoctraHeader() {
  const diamondPlateSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2394a3b8' stop-opacity='0.6' /><stop offset='40%' stop-color='%23475569' stop-opacity='0.35' /><stop offset='100%' stop-color='%230f172a' stop-opacity='0.8' /></linearGradient></defs><g transform='translate(16, 16) rotate(45)'><ellipse cx='0' cy='0' rx='9' ry='2.6' fill='url(%23g)'/><ellipse cx='0' cy='0' rx='8' ry='2' stroke='rgba(255,255,255,0.18)' stroke-width='0.5' fill='none'/></g><g transform='translate(48, 48) rotate(-45)'><ellipse cx='0' cy='0' rx='9' ry='2.6' fill='url(%23g)'/><ellipse cx='0' cy='0' rx='8' ry='2' stroke='rgba(255,255,255,0.18)' stroke-width='0.5' fill='none'/></g><g transform='translate(48, 16) rotate(-45)'><ellipse cx='0' cy='0' rx='9' ry='2.6' fill='url(%23g)'/><ellipse cx='0' cy='0' rx='8' ry='2' stroke='rgba(255,255,255,0.18)' stroke-width='0.5' fill='none'/></g><g transform='translate(16, 48) rotate(45)'><ellipse cx='0' cy='0' rx='9' ry='2.6' fill='url(%23g)'/><ellipse cx='0' cy='0' rx='8' ry='2' stroke='rgba(255,255,255,0.18)' stroke-width='0.5' fill='none'/></g></svg>`;

  return (
    <header 
      className="border-b-2 border-blue-900/45 sticky top-0 z-40 select-none backdrop-blur-md relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
      style={{
        backgroundImage: `url("${diamondPlateSvg}"), linear-gradient(to right, rgba(4, 8, 22, 0.88), rgba(12, 24, 48, 0.84), rgba(4, 8, 22, 0.88))`,
        backgroundRepeat: 'repeat, no-repeat',
      }}
    >
      {/* Dynamic steel blue specular highlight at top of navbar */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      
      {/* Subtle bottom metallic bevel accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5B395]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        
        {/* Brand Wordmark - WebNarrr Metal Gothic Logo Header - Unboxed and Sitting on Blue Glow */}
        <a 
          href="#top" 
          onClick={() => playBloop(600, 0.1)}
          className="flex items-center gap-1 group cursor-pointer"
        >
          <div className="relative h-16 w-36 sm:w-44 flex items-center justify-center overflow-visible">
            {/* Rich blue glow backing sitting directly behind the letters */}
            <div className="absolute inset-x-2 inset-y-3 bg-gradient-to-r from-blue-600/40 via-cyan-500/30 to-blue-600/40 rounded-full blur-md opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            <div className="absolute inset-x-6 inset-y-4 bg-blue-500/20 rounded-full blur-xl animate-pulse" />

            {/* Glowing metallic border underneath the floating text */}
            <div className="absolute -inset-1 border border-blue-400/25 rounded opacity-40 group-hover:opacity-75 group-hover:border-blue-400/50 transition-all duration-300" />

            <img 
              src="/src/assets/images/webnarrr_gothic_logo_1783722952556.jpg" 
              alt="WebNarrr Liquid Chrome Gothic Logo" 
              className="h-20 sm:h-24 w-auto object-contain brightness-135 contrast-[1.4] saturate-[0.95] mix-blend-screen relative z-10 transition-all duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-display text-[11px] font-black tracking-[0.25em] text-blue-100 group-hover:text-white transition-all hidden lg:inline-block uppercase italic bg-blue-950/40 px-2 py-1 rounded border border-blue-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            WEBNARRR
          </span>
        </a>

        {/* Center Editorial Links */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#structure-section" 
            className="font-mono text-[9px] font-medium text-[#9E9C96] hover:text-[#C5B395] tracking-[0.2em] transition-colors"
            onClick={() => playBloop(320, 0.05)}
          >
            STRUCTURE
          </a>
          <a 
            href="#dome-section" 
            className="font-mono text-[9px] font-medium text-[#9E9C96] hover:text-[#C5B395] tracking-[0.2em] transition-colors"
            onClick={() => playBloop(320, 0.05)}
          >
            DOME EXPERIENCE
          </a>
          <a 
            href="#estimator-section" 
            className="font-mono text-[9px] font-medium text-[#9E9C96] hover:text-[#C5B395] tracking-[0.2em] transition-colors"
            onClick={() => playBloop(320, 0.05)}
          >
            PRICING ESTIMATOR
          </a>
          <a 
            href="#lead-simulator-section" 
            className="font-mono text-[9px] font-medium text-[#9E9C96] hover:text-[#C5B395] tracking-[0.2em] transition-colors"
            onClick={() => playBloop(320, 0.05)}
          >
            LEAD PIPELINE
          </a>
          <a 
            href="#reviews-section" 
            className="font-mono text-[9px] font-medium text-[#9E9C96] hover:text-[#C5B395] tracking-[0.2em] transition-colors"
            onClick={() => playBloop(320, 0.05)}
          >
            CLIENT REVIEWS
          </a>
        </div>

        {/* Right Action Trigger */}
        <motion.a
          href="#estimator-section"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => playSuccess()}
          className="border border-[#C5B395]/40 hover:border-[#C5B395] text-[9px] font-mono tracking-[0.25em] text-[#C5B395] hover:bg-[#C5B395]/5 uppercase py-2.5 px-5 transition-all duration-300 rounded-none cursor-pointer"
        >
          START SPRINT ⚡
        </motion.a>
      </div>
    </header>
  );
}
