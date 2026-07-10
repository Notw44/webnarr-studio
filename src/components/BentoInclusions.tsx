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
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: 4,
                scale: 1.005,
                borderColor: '#C5B395',
                boxShadow: '0 20px 40px -15px rgba(197, 179, 149, 0.1)'
              }}
              className="bg-gradient-to-b from-[#0E0E0F] to-[#070708] text-[#ECEAE5] border border-[#1F222B] rounded-none p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl group cursor-pointer"
            >
              {/* Premium golden radial background accent that lights up on hover */}
              <div className="absolute -inset-px bg-radial from-[#C5B395]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Shimmer light sweep beam */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none" />

              <div className="relative z-10">
                {/* Header Badge Row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[#C5B395] font-mono text-[9px] uppercase px-3 py-1 border border-[#C5B395]/30 tracking-[0.2em] font-bold bg-[#C5B395]/5 rounded-none">
                    {feature.badge}
                  </span>
                  <span className="text-xl opacity-90 scale-100 group-hover:scale-110 transition-transform duration-300">
                    {feature.accentEmoji}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-sm md:text-base font-semibold text-[#ECEAE5] uppercase tracking-wider mb-4 select-none group-hover:text-[#C5B395] transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs text-[#9E9C96] leading-relaxed mb-6">
                  {feature.desc}
                </p>
              </div>

              {/* Status Code Accent */}
              <div className="relative z-10 flex items-center justify-between border-t border-[#1F222B] pt-4 mt-2 text-[9px] font-mono text-[#9E9C96] uppercase tracking-widest">
                <span>MODULE // SYSTEM_0{idx + 1}</span>
                <span className="text-[#C5B395] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5B395] animate-ping" />
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
