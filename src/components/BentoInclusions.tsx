import React from 'react';
import { motion } from 'motion/react';
import { BENTO_FEATURES } from '../data';

export default function BentoInclusions() {
  return (
    <div id="what-is-included" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BENTO_FEATURES.map((feature, idx) => {
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -8,
                scale: 1.015,
                borderColor: '#C9A24B',
                boxShadow: '0 25px 50px -12px rgba(201, 162, 75, 0.15)'
              }}
              className="bg-gradient-to-b from-[#131A2D] to-[#0D1220] text-white border border-[#232C42] rounded-md p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl group cursor-pointer"
            >
              {/* Premium golden radial background accent that lights up on hover */}
              <div className="absolute -inset-px bg-radial from-[#C9A24B]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Shimmer light sweep beam */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none" />

              <div className="relative z-10">
                {/* Header Badge Row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[#C9A24B] font-mono text-xs uppercase px-3 py-1 border border-[#C9A24B]/30 tracking-widest font-bold bg-[#C9A24B]/10 rounded-sm">
                    {feature.badge}
                  </span>
                  <span className="text-2xl opacity-90 scale-100 group-hover:scale-110 transition-transform duration-300">
                    {feature.accentEmoji}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider mb-4 select-none group-hover:text-[#C9A24B] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-base text-gray-300 leading-relaxed mb-6">
                  {feature.desc}
                </p>
              </div>

              {/* Status Code Accent */}
              <div className="relative z-10 flex items-center justify-between border-t border-[#232C42] pt-4 mt-2 text-xs font-mono text-gray-400 uppercase tracking-widest">
                <span>MODULE // SYSTEM_0{idx + 1}</span>
                <span className="text-[#C9A24B] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-ping" />
                  SECURED ✔
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
