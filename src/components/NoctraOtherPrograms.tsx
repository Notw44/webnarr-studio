import React from 'react';
import { motion } from 'motion/react';
import { playBloop } from '../utils/audio';

interface NoctraOtherProgramsProps {
  activeTrade: string;
  onTradeSelect: (trade: 'general' | 'electrician' | 'plumber' | 'hvac') => void;
}

export default function NoctraOtherPrograms({ activeTrade, onTradeSelect }: NoctraOtherProgramsProps) {
  
  const programs = [
    {
      id: 'general',
      title: 'WIRE_MODEL // GRID STRUCTURE',
      subtitle: 'Classic Slate Blueprint',
      description: 'Standard architectural wireframe models. Clean, high-contrast structural grid alignments designed to direct traffic seamlessly and elevate local digital presence.',
      image: '/src/assets/images/card_wireframe_sketch_1783644321162.jpg',
      pitch: 'Slate Blueprint',
      info: {
        resolution: '1200x900px',
        format: 'JPG WIRE_BLUEPRINT',
        bitDepth: '8-bit Mono',
        source: 'CORE_SCHEMATIC'
      }
    },
    {
      id: 'electrician',
      title: 'CODE_ENGINE // REACT DEV',
      subtitle: 'Volt Chromium Tech Preset',
      description: 'Precision-engineered React code optimized for raw rendering speed and security. Features real-time API integrations and lightweight client states.',
      image: '/src/assets/images/card_code_editor_1783644330450.jpg',
      pitch: 'Sleek React Code',
      info: {
        resolution: '1024x1024px',
        format: 'JPG REACT_EDITOR',
        bitDepth: '8-bit RGB',
        source: 'LIVE_COMPILER'
      }
    },
    {
      id: 'hvac',
      title: 'DESIGN_SYSTEM // STYLE LIB',
      subtitle: 'Aero Steel Style Guidelines',
      description: 'Meticulously crafted component library defining uniform spacing, custom interactive inputs, responsive color palettes, and legible display typography.',
      image: '/src/assets/images/card_design_system_1783644338842.jpg',
      pitch: 'Aero Components',
      info: {
        resolution: '1080x1350px',
        format: 'JPG DESIGN_PALETTE',
        bitDepth: '16-bit Vector',
        source: 'STYLE_CATALOG'
      }
    },
    {
      id: 'plumber',
      title: 'SEO_ENGINE // SPEED AUDIT',
      subtitle: 'Iron Flow SEO Analytics Preset',
      description: 'Hyper-targeted SEO optimization systems and speed audits. Built with minimal bundle sizes to secure 100% Lighthouse performance ratings and organic ranks.',
      image: '/src/assets/images/card_seo_analytics_1783644348660.jpg',
      pitch: 'Performance Audit',
      info: {
        resolution: '1440x900px',
        format: 'JPG SEO_DIAGNOSTICS',
        bitDepth: '8-bit Mono',
        source: 'SPEED_AUDITOR'
      }
    }
  ];

  const handleCardClick = (id: 'general' | 'electrician' | 'plumber' | 'hvac') => {
    const tones = { general: 350, electrician: 420, plumber: 300, hvac: 480 };
    playBloop(tones[id], 0.12);
    onTradeSelect(id);
  };

  return (
    <section className="py-20 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section title with direct link button */}
        <div className="flex items-center justify-between mb-12 border-b border-[#1F222B] pb-5">
          <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-[#ECEAE5] uppercase italic">
            OTHER PROGRAMS
          </h2>
          <div className="text-[#C5B395] hover:text-white transition-colors cursor-pointer text-sm font-mono">
            [ ↗ ]
          </div>
        </div>

        {/* 4 Column Program Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((prog, idx) => {
            const isActive = activeTrade === prog.id;
            return (
              <motion.div
                key={prog.id}
                onClick={() => handleCardClick(prog.id as any)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  y: { type: 'spring', stiffness: 100, damping: 20, delay: idx * 0.08 },
                  opacity: { duration: 0.6, delay: idx * 0.08 },
                  default: { duration: 0.3 }
                }}
                whileHover={{ y: -6 }}
                className={`border cursor-pointer flex flex-col justify-between group p-2 bg-[#0A0A0B] relative transition-colors ${
                  isActive 
                    ? 'border-[#C5B395]' 
                    : 'border-[#1F222B] hover:border-[#9E9C96]/60'
                }`}
              >
                {/* Active Glowing Dot Accent */}
                {isActive && (
                  <div className="absolute top-4 right-4 bg-[#C5B395] text-[#0A0A0B] text-[8px] font-mono font-bold tracking-widest px-2 py-0.5 z-10">
                    ● ACTIVE
                  </div>
                )}

                {/* Card Illustration with elegant bottom border info */}
                <div className="overflow-hidden bg-[#0F0F10] mb-5 border border-[#1F222B]/50 relative group/img">
                  {/* Subtle Tech Overlay Metadata */}
                  <div className="absolute top-2 left-2 bg-[#0A0A0B]/90 border border-[#1F222B]/80 p-2 text-[8px] font-mono tracking-wider text-[#9E9C96] rounded z-10 flex flex-col gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <span className="text-[#C5B395] font-bold">SPEC_INFO //</span>
                    <span>• {prog.info.resolution}</span>
                    <span>• {prog.info.format}</span>
                    <span>• {prog.info.bitDepth}</span>
                    <span>• {prog.info.source}</span>
                  </div>

                  <img 
                    src={prog.image} 
                    alt={prog.title} 
                    className="w-full aspect-square object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Bottom Border with theme/preset details */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0B]/95 border-t border-[#1F222B] px-2.5 py-1.5 flex items-center justify-between text-[8px] font-mono tracking-widest text-[#9E9C96]">
                    <span>SYSTEM PRESET // {prog.id.toUpperCase()}</span>
                    <span className="text-[#C5B395] font-bold">{prog.pitch.toUpperCase()}</span>
                  </div>
                </div>

                {/* Titles and Sub-labels */}
                <div className="px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xs font-semibold tracking-wider text-[#ECEAE5] mb-1.5 uppercase leading-snug">
                      {prog.title}
                    </h3>
                    <p className="font-mono text-[8px] text-[#C5B395] tracking-[0.18em] uppercase mb-4">
                      {prog.subtitle}
                    </p>
                    <p className="font-sans text-[11px] text-[#9E9C96] leading-relaxed mb-6">
                      {prog.description}
                    </p>
                  </div>

                  {/* Dynamic Action status */}
                  <div className="border-t border-[#1F222B] pt-4 mt-auto">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-[#9E9C96] group-hover:text-[#ECEAE5] transition-colors uppercase">
                      {isActive ? '✦ CORE RUNNING' : '✦ BOOT PRESET'}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
