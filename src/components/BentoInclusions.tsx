import React from 'react';
import { motion } from 'motion/react';
import { BENTO_FEATURES } from '../data';
import { playBloop } from '../utils/audio';

export default function BentoInclusions() {
  return (
    <div id="what-is-included" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BENTO_FEATURES.map((feature, idx) => {
          return (
            <motion.div
              key={idx}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              onHoverStart={() => playBloop(320 + idx * 40, 0.05)}
              className="bg-[#101828] text-white border border-[#232C42] hover:border-[#C9A24B]/50 rounded-sm p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg"
            >
              {/* Blueprint subtle line accent */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />

              <div>
                {/* Header Badge Row */}
                <div className="flex items-center justify-between mb-4 z-10 relative">
                  <span className="text-[#C9A24B] font-mono text-[9px] uppercase px-2.5 py-0.5 border border-[#C9A24B]/30 tracking-widest font-bold bg-[#C9A24B]/5">
                    {feature.badge}
                  </span>
                  <span className="text-lg opacity-70">
                    {feature.accentEmoji}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-3 select-none">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-steel-gray leading-relaxed mb-4">
                  {feature.desc}
                </p>
              </div>

              {/* Status Code Accent */}
              <div className="flex items-center justify-between border-t border-[#232C42] pt-3 text-[9px] font-mono text-steel-gray uppercase tracking-widest">
                <span>MODULE // SYSTEM_0{idx + 1}</span>
                <span className="text-[#C9A24B] font-bold">SECURED ✔</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
