import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TRADE_THEMES } from './data';
import { TradeType } from './types';
import LeadSimulator from './components/LeadSimulator';
import BentoInclusions from './components/BentoInclusions';
import ReviewConsole from './components/ReviewConsole';
import SoundToggle from './components/SoundToggle';
import MetallicBackground from './components/MetallicBackground';
import NoctraHeader from './components/NoctraHeader';
import NoctraHero from './components/NoctraHero';
import NoctraStructure from './components/NoctraStructure';
import NoctraDomeExperience from './components/NoctraDomeExperience';
import NoctraOtherPrograms from './components/NoctraOtherPrograms';
import NoctraCalculator from './components/NoctraCalculator';
import { playBloop, playSuccess, playWobble } from './utils/audio';

export default function App() {
  const [activeTrade, setActiveTrade] = useState<TradeType>('general');
  const currentTheme = TRADE_THEMES[activeTrade];

  // Pricing calculator states
  const [selectedPackage, setSelectedPackage] = useState<'essential' | 'professional' | 'signature'>('professional');
  const [hasBranding, setHasBranding] = useState(true);
  const [hasLeadCapture, setHasLeadCapture] = useState(true);
  const [hasSeo, setHasSeo] = useState(false);
  const [hasWidget, setHasWidget] = useState(false);
  const [speedTier, setSpeedTier] = useState<'standard' | 'turbo'>('standard');

  const basePrice = selectedPackage === 'essential' ? 1500 : selectedPackage === 'professional' ? 3500 : 6000;

  const isBrandingIncluded = selectedPackage === 'professional' || selectedPackage === 'signature';
  const isLeadIncluded = selectedPackage === 'professional' || selectedPackage === 'signature';
  const isSeoIncluded = selectedPackage === 'signature';
  const isWidgetIncluded = selectedPackage === 'signature';

  const brandingPrice = (!isBrandingIncluded && hasBranding) ? 400 : 0;
  const leadPrice = (!isLeadIncluded && hasLeadCapture) ? 300 : 0;
  const seoPrice = (!isSeoIncluded && hasSeo) ? 500 : 0;
  const widgetPrice = (!isWidgetIncluded && hasWidget) ? 350 : 0;
  const speedMarkup = speedTier === 'turbo' ? 450 : 0;
  
  const totalPrice = basePrice + brandingPrice + leadPrice + seoPrice + widgetPrice + speedMarkup;

  const handleTradeSelect = (trade: TradeType) => {
    setActiveTrade(trade);
  };

  const toggleCalculatorOption = (option: string) => {
    playBloop(340, 0.05);
    if (option === 'branding') {
      if (isBrandingIncluded) return;
      setHasBranding(!hasBranding);
    }
    if (option === 'lead') {
      if (isLeadIncluded) return;
      setHasLeadCapture(!hasLeadCapture);
    }
    if (option === 'seo') {
      if (isSeoIncluded) return;
      setHasSeo(!hasSeo);
    }
    if (option === 'widget') {
      if (isWidgetIncluded) return;
      setHasWidget(!hasWidget);
    }
  };

  const handleSpeedTier = (tier: 'standard' | 'turbo') => {
    playWobble();
    setSpeedTier(tier);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#ECEAE5] relative overflow-x-hidden selection:bg-[#C5B395] selection:text-[#0A0A0B] pb-16">
      <MetallicBackground />
      
      {/* Sound active status bar */}
      <SoundToggle />

      {/* 1. HEADER SECTION (Noctra Wordmark & Nav) */}
      <NoctraHeader />

      {/* 2. HERO SECTION (Giant Display headers & Glowing mist figure & Terminal CRT carousel) */}
      <NoctraHero activeTrade={activeTrade} currentTheme={currentTheme} />

      {/* 3. TRANSITIONAL MONOSPACE STATEMENT BLOCK */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center border-t border-b border-[#1F222B] my-12 select-none">
        <p className="font-mono text-xs md:text-sm tracking-[0.18em] leading-relaxed uppercase text-[#ECEAE5] max-w-4xl mx-auto">
          WEBSITES ARE NOT INHERENT TO THE INTERNET — THEY ARE CONSTRUCTED, DRAWN BETWEEN DISTANT CUSTOMER NEEDS TO CREATE TRUST WHERE NONE EXISTS. ACROSS TRADES, THESE DIGITAL PATTERNS SERVE AS PRECISION INSTRUMENTS FOR CONVERSION, STORYTELLING, AND DIRECT LEAD DESPATCH.
        </p>
      </div>

      {/* 4. GORGEOUS WEB DESIGN TECH LAYOUT GRID DIVIDER */}
      <div className="w-full h-[180px] md:h-[240px] overflow-hidden relative my-16 border-y border-[#1F222B] select-none">
        <img 
          src="/src/assets/images/web_design_divider_1783644290448.jpg" 
          alt="Web Design Grid Columns and Connection Nodes Divider" 
          className="w-full h-full object-cover opacity-80 select-none pointer-events-none grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
      </div>

      {/* 5. STRUCTURE SECTION (Side-by-side columns & moon eclipse thumbnail) */}
      <NoctraStructure />

      {/* 6. DOME EXPERIENCE SECTION (Wide stardust whirlpool vortex layout) */}
      <NoctraDomeExperience />

      {/* 7. OTHER PROGRAMS Presets Selector (Vintage engraving 4-card grid switching skins!) */}
      <NoctraOtherPrograms activeTrade={activeTrade} onTradeSelect={handleTradeSelect} />

      {/* 8. MAIN FEATURES/INCLUSIONS SECTION (Modular Bento layout) */}
      <section className="py-20 select-none">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4 border-b border-[#1F222B] pb-5">
            <div className="flex items-center gap-3">
              <span className="text-xl text-[#C5B395]">✦</span>
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-[#ECEAE5] uppercase italic">
                FRAMEWORK INCLUSIONS
              </h2>
            </div>
            <span className="font-mono text-[9px] text-[#9E9C96] font-bold tracking-[0.2em] uppercase">
              PORTFOLIO SPRINT METHOD
            </span>
          </div>

          <BentoInclusions />
        </div>
      </section>

      {/* 9. LEAD DISPATCH PIPELINE PLAYGROUND (School docket ticketing dispatch) */}
      <section id="lead-simulator-section" className="py-20 border-t border-[#1F222B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4 border-b border-[#1F222B] pb-5">
            <div className="flex items-center gap-3">
              <span className="text-xl text-[#C5B395]">✦</span>
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-[#ECEAE5] uppercase italic">
                LEAD CAPTURE DISPATCH
              </h2>
            </div>
            <span className="font-mono text-[9px] text-[#9E9C96] font-bold tracking-[0.2em] uppercase">
              3-SECOND FORWARDING ENGINE
            </span>
          </div>

          <LeadSimulator />
        </div>
      </section>

      {/* 10. BESPOKE PRICE ESTIMATOR (Packages checklist and high-end invoice docket) */}
      <NoctraCalculator 
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        hasBranding={hasBranding}
        toggleCalculatorOption={toggleCalculatorOption}
        hasLeadCapture={hasLeadCapture}
        hasSeo={hasSeo}
        hasWidget={hasWidget}
        speedTier={speedTier}
        handleSpeedTier={handleSpeedTier}
        totalPrice={totalPrice}
        basePrice={basePrice}
        isBrandingIncluded={isBrandingIncluded}
        isLeadIncluded={isLeadIncluded}
        isSeoIncluded={isSeoIncluded}
        isWidgetIncluded={isWidgetIncluded}
        brandingPrice={brandingPrice}
        leadPrice={leadPrice}
        seoPrice={seoPrice}
        widgetPrice={widgetPrice}
        speedMarkup={speedMarkup}
      />

      {/* 11. CLIENT REVIEW CONSOLE LEDGER */}
      <section id="reviews-section" className="py-20 border-t border-[#1F222B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4 border-b border-[#1F222B] pb-5">
            <div className="flex items-center gap-3">
              <span className="text-xl text-[#C5B395]">✦</span>
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-[#ECEAE5] uppercase italic">
                CLIENT LEDGER
              </h2>
            </div>
            <span className="font-mono text-[9px] text-[#9E9C96] font-bold tracking-[0.2em] uppercase">
              LOS ANGELES VERIFIED FEEDBACK
            </span>
          </div>

          <ReviewConsole />
        </div>
      </section>

      {/* 12. BOTTOM CALL TO ACTION PANEL (Framed grid with warm background) */}
      <section className="py-20 select-none border-t border-[#1F222B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-[#C5B395]/40 bg-[#0E0E0F] p-8 md:p-16 relative overflow-hidden text-center max-w-4xl mx-auto">
            
            {/* Ambient gold dots inside panel */}
            <div className="absolute inset-0 retro-halftone-white opacity-20 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-2xl text-[#C5B395] mb-5">✦</span>
              <span className="font-mono text-[9px] text-[#C5B395] font-bold uppercase tracking-[0.2em] block mb-3">
                5-DAY DEPLOYMENT OR IT&apos;S FREE
              </span>
              
              <h2 className="font-display text-xl md:text-3xl font-light text-[#ECEAE5] tracking-wide leading-snug mb-5 uppercase italic">
                Ready to win local contracts before the phone rings?
              </h2>
              
              <p className="font-sans text-xs md:text-sm text-[#9E9C96] mb-10 max-w-xl leading-relaxed">
                Connect with our Los Angeles development studio. Let us design a highly responsive, high-trust storefront that places your trades business far above regional competitors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
                <a
                  href="#estimator-section"
                  onClick={() => playSuccess()}
                  className="bg-[#ECEAE5] hover:bg-[#C5B395] text-[#0A0A0B] font-mono text-[9px] tracking-[0.2em] font-bold py-4 px-8 rounded-none transition-colors duration-300 uppercase shadow-md text-center block cursor-pointer border border-[#ECEAE5]"
                >
                  START SIMULATOR SPRINT ⚡
                </a>
                <a
                  href="mailto:webnarrr@gmail.com"
                  onClick={() => playBloop(350, 0.1)}
                  className="border border-[#C5B395]/40 hover:border-[#C5B395] text-[9px] font-mono tracking-[0.2em] text-[#C5B395] hover:bg-[#C5B395]/5 py-4 px-8 rounded-none transition-colors duration-300 uppercase text-center block cursor-pointer"
                >
                  Email: webnarrr@gmail.com
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-6 text-[8px] font-mono text-[#9E9C96] uppercase tracking-[0.2em]">
                <span>LICENSE NUMBERS DISPATCH</span>
                <span>•</span>
                <span>SECURE CODE EXPORTS</span>
                <span>•</span>
                <span>NO RECURRING MONTHLY FEES</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="border-t border-[#1F222B] bg-[#0A0A0B] text-[#9E9C96] font-mono text-[9px] pt-16 pb-12 select-none">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#1F222B]">
            
            {/* Left branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[#C5B395] text-xs">✦</span>
                <span className="font-sans font-light text-[11px] tracking-[0.25em] text-[#ECEAE5] uppercase">
                  WEB<span className="text-[#C5B395]">NARRR</span>
                </span>
              </div>
              <p className="text-[11px] text-[#9E9C96] font-sans leading-relaxed">
                Los Angeles bespoke web production studio. Building custom high-trust digital assets for master tradesmen, plumbers, electricians, and mechanical contractors.
              </p>
            </div>

            {/* Hub active codes */}
            <div className="space-y-3">
              <span className="text-[#C5B59C] font-bold block tracking-[0.18em] uppercase">LOCAL CODES ACTIVE:</span>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px] text-[#9E9C96]/80">
                <span>• Van Nuys // 91401</span>
                <span>• Burbank // 91501</span>
                <span>• Silverlake // 90026</span>
                <span>• Pasadena // 91101</span>
                <span>• Glendale // 91201</span>
                <span>• Culver City // 90230</span>
              </div>
            </div>

            {/* Contacts details */}
            <div className="space-y-3">
              <span className="text-[#C5B59C] font-bold block tracking-[0.18em] uppercase">CLIENT HOOK LOGS:</span>
              <p className="text-[11px] text-[#9E9C96] font-sans leading-relaxed">
                Email: <a href="mailto:webnarrr@gmail.com" className="text-[#C5B395] underline font-mono tracking-wide">webnarrr@gmail.com</a>
              </p>
              <p className="text-[11px] text-[#9E9C96] font-sans leading-relaxed">
                Development sprints active Mon-Fri 8:00 AM - 6:00 PM PST.
              </p>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[8px] text-[#9E9C96]/60 tracking-[0.25em] uppercase">
            <span>© 2026 WebNarrr Los Angeles. Pure TypeScript & React. All rights reserved.</span>
            <div>
              <a href="#top" className="hover:text-white transition-colors">Back to Top ▲</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
