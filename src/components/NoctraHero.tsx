import React from 'react';
import { motion } from 'motion/react';
import { playSuccess, playBloop } from '../utils/audio';
import { TradeTheme } from '../types';
import CrtCarousel from './CrtCarousel';
import { LampContainer } from './ui/lamp';
import { BENTO_FEATURES } from '../data';

interface NoctraHeroProps {
  activeTrade: string;
  currentTheme: TradeTheme;
}

export default function NoctraHero({ activeTrade, currentTheme }: NoctraHeroProps) {
  return (
    <LampContainer className="min-h-0 py-16 md:py-24 relative overflow-hidden bg-[#0A0A0B] border-b border-[#1F222B] w-full" contentClassName="relative z-50 flex flex-col items-center w-full">
      {/* Editorial Floating Figure in Misty Cosmic Glow (Overlay on Right) */}
      <div className="absolute right-0 top-0 w-full lg:w-[48%] h-full opacity-[0.25] lg:opacity-[0.35] pointer-events-none z-0">
        <img 
          src="/src/assets/images/hero_web_design_workspace_1783644281630.jpg" 
          alt="Professional Web Design Studio Workspace" 
          className="w-full h-full object-cover object-center grayscale brightness-90 contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0A0A0B] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0A0B] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Monospace Inquiry block */}
            <div className="mb-8 border-l border-[#C5B395]/40 pl-4">
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] leading-relaxed text-[#9E9C96] uppercase">
                AN INQUIRY INTO HIGH-TRUST WEB DESIGN IN THE TRADES, AND WHAT IT MEANS WHEN YOUR DIGITAL PRESENTATION OUTCLASSES ALL COMPETITORS.
              </p>
            </div>

            {/* Main Giant Display Header */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-normal leading-[1.05] text-[#ECEAE5] uppercase italic mb-8">
              CONSTELLATIONS <br />
              <span className="text-[#C5B395] font-normal font-sans not-italic tracking-[0.05em] block sm:inline">AND</span> ABSENCE
            </h1>

            {/* Slogan and details of active trade preset */}
            <div className="max-w-xl mb-10">
              <p className="font-sans text-sm md:text-base text-[#9E9C96] leading-relaxed mb-4">
                WebNarrr builds highly customized, high-trust digital storefronts for elite plumbers, electricians, and heating technicians. Architectural, highly refined designs that establish your absolute mastery, with every homeowner enquiry dispatched in seconds.
              </p>
              
              <div className="inline-flex items-center gap-2 bg-[#121213] border border-[#1F222B] px-3.5 py-1.5 rounded-none mt-2">
                <span className="w-1.5 h-1.5 bg-[#C5B395] rounded-full animate-ping" />
                <span className="font-mono text-[9px] text-[#C5B395] tracking-[0.15em] uppercase font-bold">
                  ACTIVE SKIN: {currentTheme.name} ({activeTrade})
                </span>
              </div>
            </div>

            {/* Aesthetic Pairings Meta box and Action button */}
            <div className="flex flex-wrap items-center gap-6 w-full sm:w-auto">
              <motion.a 
                href="#estimator-section"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => playSuccess()}
                className="bg-[#ECEAE5] hover:bg-[#C5B395] text-[#0A0A0B] font-mono text-[10px] tracking-[0.2em] font-bold py-4 px-8 rounded-none transition-all duration-300 uppercase shadow-xl select-none cursor-pointer border border-[#ECEAE5]"
              >
                BUY TICKET SPRINT ⚡
              </motion.a>
              
              <div className="text-left font-mono text-[9px] tracking-[0.15em] text-[#9E9C96] uppercase">
                <p className="text-[#ECEAE5] font-bold">12.06–17.08 2026</p>
                <p className="mt-0.5">EST. TIME LIMIT OVERRIDE // 48 MIN</p>
              </div>
            </div>

          </div>

          {/* Right Column - Terminal CRT Bezel enclosing portfolio */}
          <div className="lg:col-span-5 w-full flex flex-col gap-5">
            <div className="border border-[#1F222B] bg-[#0A0A0B] p-2.5 rounded-none shadow-2xl relative">
              {/* Outer decorative scientific borders */}
              <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t border-l border-[#C5B395]/40" />
              <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t border-r border-[#C5B395]/40" />
              <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b border-l border-[#C5B395]/40" />
              <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b border-r border-[#C5B395]/40" />
              
              <CrtCarousel activeTradeFilter={activeTrade} />
            </div>

            {/* Stacked 1st Three Info Cards under the monitor */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#C5B395]/70 uppercase font-semibold flex items-center gap-2 px-1">
                <span>✦ CORE SPECIFICATIONS</span>
                <div className="h-px flex-1 bg-gradient-to-r from-[#C5B395]/20 to-transparent" />
              </div>

              {BENTO_FEATURES.slice(0, 3).map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.12 }}
                  whileHover={{ 
                    x: 6, 
                    borderColor: '#C5B395',
                    boxShadow: '0 10px 30px -10px rgba(197, 179, 149, 0.15)'
                  }}
                  onMouseEnter={() => playBloop(400 + idx * 80, 0.05)}
                  className="bg-gradient-to-r from-[#0E121E] to-[#070912] border border-[#1F222B] p-5 relative overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg rounded-none group cursor-pointer"
                >
                  {/* Subtle glowing radial hover background */}
                  <div className="absolute -inset-px bg-radial from-[#C5B395]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#C5B395] font-mono text-[8px] uppercase px-2 py-0.5 border border-[#C5B395]/30 tracking-[0.2em] font-semibold bg-[#C5B395]/5">
                        {feature.badge}
                      </span>
                      <span className="text-sm opacity-90 transition-transform duration-300 group-hover:scale-110">
                        {feature.accentEmoji}
                      </span>
                    </div>
                    <h4 className="font-display text-xs font-bold text-[#ECEAE5] uppercase tracking-wider mb-2 select-none group-hover:text-[#C5B395] transition-colors duration-200">
                      {feature.title}
                    </h4>
                    <p className="font-sans text-[11px] text-[#9E9C96] leading-relaxed select-none">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </LampContainer>
  );
}
