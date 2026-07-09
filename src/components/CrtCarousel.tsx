import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CarouselSlide } from '../types';
import { CAROUSEL_SLIDES } from '../data';
import { playBloop, playWobble } from '../utils/audio';

interface CrtCarouselProps {
  activeTradeFilter: string;
}

export default function CrtCarousel({ activeTradeFilter }: CrtCarouselProps) {
  const filteredSlides = CAROUSEL_SLIDES.filter(
    (slide) => activeTradeFilter === 'general' || slide.trade === activeTradeFilter
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [isDegaussing, setIsDegaussing] = useState(false);

  useEffect(() => {
    if (!isPowerOn || isDegaussing) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPowerOn, isDegaussing, filteredSlides.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTradeFilter]);

  const currentSlide = filteredSlides[currentIndex] || CAROUSEL_SLIDES[0];

  const handleNext = () => {
    if (filteredSlides.length <= 1) return;
    playBloop(280, 0.08);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredSlides.length);
  };

  const handlePrev = () => {
    if (filteredSlides.length <= 1) return;
    playBloop(240, 0.08);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length);
  };

  const handlePowerToggle = () => {
    playBloop(isPowerOn ? 120 : 600, 0.15);
    setIsPowerOn(!isPowerOn);
  };

  const handleDegauss = () => {
    if (!isPowerOn) return;
    playWobble();
    setIsDegaussing(true);
    setTimeout(() => {
      setIsDegaussing(false);
    }, 800);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 22 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 22 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div id="crt-monitor-section" className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Outer Titanium/Gold Hardware Bezel */}
      <div className="w-full bg-[#121622] border border-[var(--color-gold-90s)]/30 rounded-sm p-5 md:p-6 relative flex flex-col transition-colors duration-300 shadow-2xl">
        
        {/* Architectural Rivets */}
        <div className="absolute top-2 left-2 w-1 h-1 bg-[var(--color-gold-90s)]/30 rounded-full" />
        <div className="absolute top-2 right-2 w-1 h-1 bg-[var(--color-gold-90s)]/30 rounded-full" />
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-[var(--color-gold-90s)]/30 rounded-full" />
        <div className="absolute bottom-2 right-2 w-1 h-1 bg-[var(--color-gold-90s)]/30 rounded-full" />

        {/* Technical Badge Label */}
        <div className="absolute -top-3 left-6 bg-[#0A0F1E] text-[var(--color-gold-90s)] border border-[var(--color-gold-90s)]/30 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest uppercase select-none">
          SYSTEM INTERFACE // TERMINAL.01
        </div>

        {/* Screen Bezel Mask */}
        <div className="scanlines w-full aspect-[4/3] bg-[#0A0D15] rounded-sm overflow-hidden border border-[#232C42] relative flex flex-col">
          
          {/* Static Glass Gloss */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />

          {/* Degaussing Shake Animation */}
          <motion.div 
            className="w-full h-full relative"
            animate={isDegaussing ? {
              x: [0, -10, 10, -6, 6, -3, 3, 0],
              y: [0, 6, -6, 4, -4, 2, -2, 0],
              skewX: [0, 3, -3, 1, -1, 0],
            } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Screen Content */}
            <AnimatePresence initial={false} custom={direction}>
              {!isPowerOn ? (
                <motion.div 
                  key="screen-off"
                  initial={{ scaleY: 1, scaleX: 1, opacity: 1 }}
                  animate={{ 
                    scaleY: [1, 0.01, 0],
                    scaleX: [1, 1, 0],
                    opacity: [1, 1, 0] 
                  }}
                  transition={{ duration: 0.4, times: [0, 0.75, 1], ease: 'easeOut' }}
                  className="absolute inset-0 bg-black flex items-center justify-center z-30"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)]" />
                </motion.div>
              ) : (
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex flex-col p-6 crt-glow text-white overflow-hidden"
                >
                  {/* Embedded Website Header Mockup */}
                  <div className="w-full flex items-center justify-between border-b border-[#232C42] pb-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-gold-90s)]" />
                      <div className="w-2 h-2 rounded-full bg-[#7A8399]" />
                      <div className="w-2 h-2 rounded-full bg-[#232C42]" />
                      <span className="text-xs font-mono text-gray-400 ml-1.5 truncate max-w-[120px] md:max-w-[200px]">
                        www.{currentSlide.businessName.toLowerCase().replace(/\s+/g, '')}.com
                      </span>
                    </div>
                    <div className="bg-[#232C42]/50 border border-[var(--color-gold-90s)]/20 px-2.5 py-1 rounded-none text-[10px] font-mono text-[var(--color-gold-90s)] tracking-wider uppercase">
                      SECURE SOURCE
                    </div>
                  </div>

                  {/* Embedded Website Hero Banner */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Badge / License */}
                      <span className="inline-block text-[10px] font-mono tracking-widest text-[var(--color-gold-90s)] mb-2 font-bold uppercase">
                        {currentSlide.tags[0]} | {currentSlide.tags[1]}
                      </span>
                      
                      {/* Business Title */}
                      <h3 className="font-display text-lg font-bold leading-none text-[#E8E4D8] tracking-wide mb-2 uppercase">
                        {currentSlide.businessName} {currentSlide.accentEmoji}
                      </h3>
                      
                      {/* Slogan */}
                      <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                        &quot;{currentSlide.slogan}&quot;
                      </p>

                      {/* Headline copy */}
                      <p className="text-sm font-sans leading-relaxed text-[#E8E4D8]/90 max-w-[320px] border-l-2 border-[var(--color-gold-90s)] pl-3 mb-4">
                        {currentSlide.heroHeadline}
                      </p>
                    </div>

                    {/* Interactive Highlights Inside Web */}
                    <div className="space-y-2 bg-[#101828]/80 p-3.5 rounded-sm border border-[#232C42] mb-3">
                      <p className="text-[10px] font-mono text-[var(--color-gold-90s)] font-bold uppercase tracking-widest">
                        ★ Live Premium Feature Modules:
                      </p>
                      <ul className="text-xs space-y-1 font-mono text-gray-300">
                        {currentSlide.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-[var(--color-gold-90s)] font-bold">✔</span>
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Simulated Conversion Button */}
                    <div className="flex items-center justify-between border-t border-[#232C42] pt-3 text-xs font-mono">
                      <span className="text-gray-400">STATUS: <span className="text-[var(--color-gold-90s)] animate-pulse">● LIVE</span></span>
                      <div className="bg-[var(--color-gold-90s)] text-[#0A0D14] font-bold px-4 py-1.5 text-[10px] tracking-widest uppercase hover:bg-white active:scale-95 transition-all cursor-pointer">
                        BOOK JOB ⚡
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Terminal hardware controls and grills */}
        <div className="w-full mt-4 border-t border-[#232C42] pt-4 flex items-center justify-between">
          
          {/* Card Reader mockup slot */}
          <div className="flex items-center gap-2">
            <div className="w-14 h-1.5 bg-black rounded-none border border-[#232C42] relative">
              <div className="absolute top-0 bottom-0 left-1 w-1.5 bg-[#C9A24B]" />
            </div>
            <span className="text-[8px] font-mono text-steel-gray font-bold tracking-widest uppercase select-none">
              SYS_READER
            </span>
          </div>

          {/* Dials & Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Degauss Button */}
            <button 
              onClick={handleDegauss}
              disabled={!isPowerOn}
              title="Degauss Screen"
              className="px-2 py-1.5 rounded-none border border-[#232C42] bg-[#0A0D15] font-mono text-[8px] tracking-widest font-bold text-[#C9A24B] hover:bg-[#232C42]/20 active:scale-95 transition-transform disabled:opacity-30 cursor-pointer"
            >
              DEG
            </button>

            {/* Next/Prev buttons */}
            <div className="flex gap-1 bg-[#0A0D15] p-1 border border-[#232C42]">
              <button 
                onClick={handlePrev}
                disabled={filteredSlides.length <= 1}
                className="px-2 py-1 bg-[#101828] border border-[#232C42] text-[10px] text-white hover:bg-[#232C42] hover:text-[#C9A24B] disabled:opacity-30 cursor-pointer"
              >
                ◀
              </button>
              <button 
                onClick={handleNext}
                disabled={filteredSlides.length <= 1}
                className="px-2 py-1 bg-[#101828] border border-[#232C42] text-[10px] text-white hover:bg-[#232C42] hover:text-[#C9A24B] disabled:opacity-30 cursor-pointer"
              >
                ▶
              </button>
            </div>

            {/* Power Button */}
            <button 
              onClick={handlePowerToggle}
              className={`px-2.5 py-1.5 border font-mono text-[8px] tracking-widest font-bold cursor-pointer transition-colors duration-150 active:scale-95 ${
                isPowerOn 
                  ? 'bg-red-950/40 text-red-400 border-red-900/60 hover:bg-red-900/40' 
                  : 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60 hover:bg-emerald-900/40'
              }`}
              title={isPowerOn ? 'Turn Terminal Off' : 'Turn Terminal On'}
            >
              {isPowerOn ? 'SHUTDOWN' : 'BOOT'}
            </button>
          </div>
        </div>
      </div>

      {/* Slide counter under terminal */}
      {isPowerOn && (
        <div className="mt-3 bg-[#101828]/60 border border-[#232C42] px-3.5 py-1 text-[9px] font-mono text-steel-gray uppercase tracking-widest">
          SCREEN <span className="text-[var(--color-gold-90s)] font-bold">{currentIndex + 1}</span> OF{' '}
          <span className="text-white font-bold">{filteredSlides.length}</span> // SKIN:{' '}
          <span className="text-[var(--color-gold-90s)] font-bold">{activeTradeFilter}</span>
        </div>
      )}
    </div>
  );
}
