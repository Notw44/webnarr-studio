import React from 'react';
import { motion } from 'motion/react';

export default function NoctraStructure() {
  return (
    <section id="structure-section" className="border-b border-[#1F222B] py-20 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid matching the exact layout of Noctra 'Structure' */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: SECTION TITLE AND SUBTITLE */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8"
          >
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-wide text-[#C5B395] uppercase italic mb-5">
              STRUCTURE
            </h2>
            <p className="font-sans text-[11px] leading-relaxed text-[#9E9C96] uppercase tracking-wider">
              This custom web architecture framework considers how local homeowners search, how digital trust is formed, and how visual layout systems guide local residents to book premium service contracts.
            </p>
          </motion.div>

          {/* Middle Column: CARD 01 - PATTERN AND IMPOSITION */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-between border-t border-[#1F222B] pt-6 h-full"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#C5B395] tracking-[0.2em] block mb-6">
                01
              </span>
              <h3 className="font-display text-sm font-semibold tracking-wider text-[#ECEAE5] uppercase mb-4">
                GRID PATTERN &amp; WIREFRAMING
              </h3>
              <p className="font-sans text-xs text-[#9E9C96] leading-relaxed mb-6">
                To form a high-converting digital presence is to establish immediate visual authority. Standard layout grids, intuitive navigation headers, and responsive content columns link points into high-trust interactive interfaces.
              </p>
              <p className="font-sans text-xs text-[#9E9C96]/70 leading-relaxed">
                Different service models require specialized structures, yet all rely on the same impulse: to convert local website visitors into exclusive, qualified phone calls.
              </p>
            </div>
          </motion.div>

          {/* Right Column: CARD 02 - ABSENCE AND DISRUPTION */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#1F222B] pt-6"
          >
            
            {/* Left side text block */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#C5B395] tracking-[0.2em] block mb-6">
                  02
                </span>
                <h3 className="font-display text-sm font-semibold tracking-wider text-[#ECEAE5] uppercase mb-4">
                  LEAD CHANNEL &amp; DISPATCH
                </h3>
                <p className="font-sans text-[11px] text-[#9E9C96] leading-relaxed mb-4">
                  Instant SMS notifications fire the moment a customer submits a request, keeping response times under three seconds. This direct pipeline captures high-intent local inquiries, restoring functional business order.
                </p>
              </div>
            </div>

            {/* Right side portrait image of Web Design Blueprint with bottom border info */}
            <div className="border border-[#1F222B] p-1.5 bg-[#0A0A0B] flex flex-col justify-between relative group/img">
              <div className="relative overflow-hidden">
                {/* Subtle Tech Overlay Metadata */}
                <div className="absolute top-2 left-2 bg-[#0A0A0B]/90 border border-[#1F222B]/80 p-2 text-[8px] font-mono tracking-wider text-[#9E9C96] rounded z-10 flex flex-col gap-0.5 opacity-80 group-hover/img:opacity-100 transition-opacity">
                  <span className="text-[#C5B395] font-bold">SPEC_INFO //</span>
                  <span>• 768x1024px</span>
                  <span>• JPG BRANDING</span>
                  <span>• 24-bit RGB</span>
                  <span>• BRAND_ASSET</span>
                </div>
                <img 
                  src="/src/assets/images/web_3d_portrait_abstract_1783705728665.jpg" 
                  alt="Webnarrr Abstract Wireframe and Grid Architecture" 
                  className="w-full aspect-[3/4] object-cover grayscale brightness-90 group-hover/img:scale-105 group-hover/img:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="border-t border-[#1F222B] pt-3 mt-2 flex items-center justify-between text-[8px] font-mono tracking-widest text-[#9E9C96]">
                <span>WEBNARRR // FIG_9</span>
                <span className="text-[#C5B395] font-bold">STUDIO</span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
