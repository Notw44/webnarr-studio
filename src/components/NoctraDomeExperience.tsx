import React from 'react';
import { motion } from 'motion/react';
import { playSuccess } from '../utils/audio';

export default function NoctraDomeExperience() {
  return (
    <section id="dome-section" className="border-b border-[#1F222B] py-20 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section title with floating navigation arrows */}
        <div className="flex items-center justify-between mb-10 border-b border-[#1F222B] pb-5">
          <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-[#ECEAE5] uppercase italic">
            DOME EXPERIENCE
          </h2>
          <div className="flex items-center gap-4 text-[#C5B395] font-mono text-xs">
            <span className="cursor-pointer hover:text-white transition-colors">←</span>
            <span className="cursor-pointer hover:text-white transition-colors">→</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Description and ticket booking */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
            <p className="font-display text-sm md:text-base text-[#ECEAE5] uppercase tracking-wider mb-6 font-semibold leading-relaxed">
              INSIDE THE STUDIO, INTERACTIVE FRONTEND PROTOTYPES GRADUALLY TAKE SHAPE AND RESPOND, CONVERGING BETWEEN VISUAL CLARITY AND HIGH-SPEED CODE.
            </p>
            
            <p className="font-sans text-xs text-[#9E9C96] leading-relaxed mb-8">
              Visual layouts transition smoothly from rough Figma wireframes to high-trust interactive service estimators, integrated with instant SMS dispatch pipelines. Our premium sprints deploy rapidly, letting you witness the exact moment your customized high-converting storefront goes live.
            </p>
            
            <motion.a 
              href="#estimator-section"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => playSuccess()}
              className="bg-[#ECEAE5] hover:bg-[#C5B395] text-[#0A0A0B] font-mono text-[9px] tracking-[0.25em] font-bold py-3.5 px-7 rounded-none transition-colors duration-300 uppercase shadow-lg inline-block select-none cursor-pointer border border-[#ECEAE5]"
            >
              CALCULATE ESTIMATE ⚡
            </motion.a>
          </div>

          {/* Right Column: Interactive 3D Web Canvas Layout with bottom border info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 w-full border border-[#1F222B] p-2 bg-[#0A0A0B] flex flex-col justify-between relative group/img"
          >
            <div className="overflow-hidden relative">
              {/* Subtle Tech Overlay Metadata */}
              <div className="absolute top-2 left-2 bg-[#0A0A0B]/90 border border-[#1F222B]/80 p-2 text-[8px] font-mono tracking-wider text-[#9E9C96] rounded z-10 flex flex-col gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-[#C5B395] font-bold">SPEC_INFO //</span>
                <span>• 1920x1080px</span>
                <span>• JPG HD_CANVAS</span>
                <span>• 24-bit RGB</span>
                <span>• MODEL: VIRTUAL_3D</span>
              </div>
              <img 
                src="/src/assets/images/web_3d_canvas_abstract_1783705594997.jpg" 
                alt="Interactive 3D Web Canvas and Modern User Interface" 
                className="w-full aspect-[16/9] object-cover grayscale brightness-95 group-hover/img:scale-105 group-hover/img:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="border-t border-[#1F222B] pt-3.5 mt-2 flex items-center justify-between text-[9px] font-mono tracking-[0.2em] text-[#9E9C96]">
              <span>INTERFACE MODEL // VIRTUAL_CANVAS_3D</span>
              <span className="text-[#C5B395] font-bold">100% EXCLUSIVE ✔</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
