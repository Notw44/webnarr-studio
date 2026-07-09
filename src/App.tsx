import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRADE_THEMES } from './data';
import { TradeType } from './types';
import CrtCarousel from './components/CrtCarousel';
import LeadSimulator from './components/LeadSimulator';
import BentoInclusions from './components/BentoInclusions';
import ReviewConsole from './components/ReviewConsole';
import SoundToggle from './components/SoundToggle';
import MetallicBackground from './components/MetallicBackground';
import { playBloop, playSuccess, playWobble } from './utils/audio';

export default function App() {
  const [activeTrade, setActiveTrade] = useState<TradeType>('general');
  const currentTheme = TRADE_THEMES[activeTrade];

  // Pricing calculator state
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
    playBloop(trade === 'electrician' ? 420 : trade === 'plumber' ? 300 : trade === 'hvac' ? 480 : 350, 0.12);
    setActiveTrade(trade);
  };

  const toggleCalculatorOption = (option: string) => {
    playBloop(340, 0.05);
    if (option === 'branding') {
      if (isBrandingIncluded) return; // Forced included
      setHasBranding(!hasBranding);
    }
    if (option === 'lead') {
      if (isLeadIncluded) return; // Forced included
      setHasLeadCapture(!hasLeadCapture);
    }
    if (option === 'seo') {
      if (isSeoIncluded) return; // Forced included
      setHasSeo(!hasSeo);
    }
    if (option === 'widget') {
      if (isWidgetIncluded) return; // Forced included
      setHasWidget(!hasWidget);
    }
  };

  const handleSpeedTier = (tier: 'standard' | 'turbo') => {
    playWobble();
    setSpeedTier(tier);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] retro-grid text-ink-cream relative overflow-x-hidden selection:bg-[var(--color-gold-90s)] selection:text-[#0A0D14] pb-16">
      <MetallicBackground />
      
      {/* Floating sound activator controller */}
      <SoundToggle />

      {/* HEADER SECTION */}
      <header className="border-b border-[#232C42] bg-[#101828]/95 sticky top-0 z-40 select-none backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo in precision high-trust wordmark (Hinged Plate Edition) */}
          <a 
            href="#top" 
            onClick={() => playBloop(600, 0.1)}
            className="flex items-center group select-none cursor-pointer"
          >
            <div className="flex items-center">
              {/* Left Plate: WEB */}
              <motion.div 
                className="text-[#0E131F] font-display font-black text-xl md:text-2xl px-3.5 py-1 rounded-l border-t border-l border-b border-[#E2E8F0] border-r-0 flex items-center relative shadow-md select-none overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 30%, #94A3B8 70%, #CBD5E1 100%)',
                  boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.8), inset -1px -1px 0px rgba(0,0,0,0.1), 0px 4px 6px -1px rgba(0,0,0,0.3)',
                }}
                whileHover={{ rotate: -2, originX: 1, originY: 0.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                {/* Machined Brushed Grain overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)',
                  }}
                />
                {/* Highlight gleam */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
                <span className="tracking-wide relative z-10 drop-shadow-[0_1px_0px_rgba(255,255,255,0.8)]">WEB</span>
                {/* Left side mechanical rivet */}
                <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#94A3B8] to-[#475569] border border-[#1E293B] shadow-inner relative z-10">
                  <span className="absolute inset-0.5 bg-white/40 rounded-full" />
                </span>
              </motion.div>

              {/* Central Hinge Bracket */}
              <div 
                className="relative w-4 h-7 border-y border-x z-10 flex items-center justify-center -mx-[4px] shadow-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(to bottom, #475569 0%, #1E293B 40%, #0F172A 70%, #334155 100%)',
                  borderColor: '#64748B',
                }}
              >
                {/* Pivot Pin Brass Bolt */}
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FEF08A] border border-[#0F172A] shadow-inner flex items-center justify-center relative">
                  <div className="w-1.5 h-[1.5px] bg-[#78350F] rotate-45" />
                </div>
              </div>

              {/* Right Plate: NARRR */}
              <motion.div 
                className="text-[#3A2502] font-display font-black text-xl md:text-2xl px-3.5 py-1 rounded-r border-t border-r border-b border-[#F5E3B5] border-l-0 flex items-center relative shadow-md select-none overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #FDE047 0%, #EAB308 30%, #CA8A04 70%, #EAB308 100%)',
                  boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.7), inset -1px -1px 0px rgba(0,0,0,0.15), 0px 4px 6px -1px rgba(0,0,0,0.3)',
                }}
                whileHover={{ rotate: 2, originX: 0, originY: 0.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                {/* Machined Brushed Grain overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 3px)',
                  }}
                />
                {/* Highlight gold gleam */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-pulse"
                  style={{ animationDuration: '4s' }}
                />
                {/* Right side brass rivet */}
                <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#FCD34D] to-[#B45309] border border-[#451A03] shadow-inner relative z-10">
                  <span className="absolute inset-0.5 bg-white/40 rounded-full" />
                </span>
                <span className="tracking-wide relative z-10 drop-shadow-[0_1px_0px_rgba(255,255,255,0.6)]">NARRR</span>
              </motion.div>
            </div>
          </a>

          {/* Nav links / controls */}
          <div className="flex items-center gap-6">
            <a 
              href="#what-is-included" 
              className="hidden md:inline-block font-mono text-[10px] font-bold text-steel-gray hover:text-[#C9A24B] tracking-widest transition-colors"
              onClick={() => playBloop(320, 0.05)}
            >
              ★ WHAT&apos;S INCLUDED
            </a>
            <a 
              href="#packages-plans" 
              className="hidden md:inline-block font-mono text-[10px] font-bold text-steel-gray hover:text-[#C9A24B] tracking-widest transition-colors"
              onClick={() => playBloop(320, 0.05)}
            >
              ★ PRICING
            </a>
            <a 
              href="#project-estimator" 
              className="hidden md:inline-block font-mono text-[10px] font-bold text-steel-gray hover:text-[#C9A24B] tracking-widest transition-colors"
              onClick={() => playBloop(320, 0.05)}
            >
              ★ CALCULATE PRICING
            </a>
            
            {/* Interactive CTA */}
            <motion.a
              href="#lead-capture-simulator"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => playSuccess()}
              className="bg-[#C9A24B] text-[#0A0F1E] font-display font-bold text-[10px] tracking-widest uppercase px-5 py-3 border border-[#C9A24B] hover:bg-white hover:border-white transition-colors cursor-pointer rounded-none"
            >
              Start Project ⚡
            </motion.a>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH BLUEPRINT GRID */}
      <div className="blueprint-grid border-b border-[#232C42] relative">
        {/* Soft Gold Ambient Glow in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A24B]/5 rounded-full blur-[120px] pointer-events-none" />

        <main id="top" className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-20 pb-16">
          
          {/* Main Hero Splat Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start relative z-10">
              
              {/* Dynamic Slogan / Mode Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] text-steel-gray uppercase tracking-widest bg-panel-dark/80 px-3.5 py-1.5 border border-[#232C42]">
                  Los Angeles Web Design Studio
                </span>
                <span className="inline-block text-[9px] font-mono font-bold border border-[#C9A24B]/30 bg-[#C9A24B]/10 text-[#C9A24B] px-2.5 py-1 uppercase tracking-wider">
                  {currentTheme.stickerLabel}
                </span>
              </div>

              {/* Main Header using Custom 1990s Font-Display */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-[#E8E4D8] mb-6 uppercase">
                Websites that win the job <span className="text-[#C9A24B] inline-block hover:text-white transition-colors cursor-pointer">before the phone rings.</span>
              </h1>

              {/* Hero Description */}
              <p className="font-sans text-sm md:text-base text-steel-gray leading-relaxed mb-8 max-w-xl">
                WebNar designs highly customized, high-trust digital storefronts for electricians, plumbers, and HVAC contractors. Premium, polished interactive designs that convince local homeowners you are the absolute premier option in Los Angeles, with every enquiry piped directly to your inbox in seconds.
              </p>

              {/* Bouncy Action CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a 
                  href="#lead-capture-simulator"
                  onClick={() => playSuccess()}
                  className="bg-[#C9A24B] text-[#0A0F1E] font-display font-bold text-[11px] tracking-widest uppercase px-6 py-4 border border-[#C9A24B] hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Book your site ⚡
                </a>
                <a 
                  href="#what-is-included"
                  onClick={() => playBloop(250, 0.1)}
                  className="bg-[#101828]/80 text-[#E8E4D8] font-display font-bold text-[11px] tracking-widest uppercase px-6 py-4 border border-[#232C42] hover:border-[#C9A24B] transition-all duration-300 cursor-pointer"
                >
                  What&apos;s Included? 🗂
                </a>
              </div>

              {/* High trust review badge */}
              <div className="bg-[#101828]/70 p-4 border border-[#232C42] flex items-center gap-3.5 shadow-xl">
                <span className="text-xl">🏆</span>
                <div className="text-[10px] font-mono tracking-wider uppercase">
                  <p className="text-white font-bold">Rated 5.0 Stars by LA Contractors</p>
                  <p className="text-steel-gray mt-0.5">100% Client satisfaction in 5-day delivery sprints.</p>
                </div>
              </div>

            </div>

            {/* CRT Monitor with Carousel Column */}
            <div className="lg:col-span-5 w-full relative z-10">
              <CrtCarousel activeTradeFilter={activeTrade} />
            </div>

          </div>

        </main>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-16">

        {/* SECTION: INTERACTIVE TRADE SKIN SELECTOR */}
        <section className="mb-24">
          <div className="bg-[#101828] border border-[#232C42] rounded-sm p-6 md:p-8 relative overflow-hidden select-none shadow-xl">
            
            {/* Soft grid background */}
            <div className="absolute inset-0 retro-halftone-white opacity-40 pointer-events-none" />

            <div className="relative z-10">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#232C42] pb-6">
                <div>
                  <span className="font-mono text-[9px] text-[#C9A24B] font-bold uppercase tracking-widest block mb-1">
                    [ INTERACTIVE DESIGN DEMO ENGINE ]
                  </span>
                  <h2 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    Skin the studio for your specific trade
                  </h2>
                </div>
                <div className="bg-[#0A0F1E] px-4 py-2 border border-[#232C42] text-[10px] font-mono text-gray-400">
                  ACTIVE PRESET: <span className="text-[#C9A24B] font-bold uppercase">{activeTrade}</span>
                </div>
              </div>

              {/* Toggle Buttons Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                
                <button
                  onClick={() => handleTradeSelect('general')}
                  className={`py-3 px-4 border font-display text-[9px] font-bold tracking-widest uppercase transition-all flex flex-col items-center gap-1.5 cursor-pointer rounded-none ${
                    activeTrade === 'general'
                      ? 'bg-[#C9A24B] text-[#0A0F1E] border-[#C9A24B] font-extrabold shadow-lg'
                      : 'bg-[#161F30] text-steel-gray border-[#232C42] hover:border-[#C9A24B]/40 hover:text-white'
                  }`}
                >
                  <span className="text-lg">🏛</span>
                  <span>Standard</span>
                </button>

                <button
                  onClick={() => handleTradeSelect('electrician')}
                  className={`py-3 px-4 border font-display text-[9px] font-bold tracking-widest uppercase transition-all flex flex-col items-center gap-1.5 cursor-pointer rounded-none ${
                    activeTrade === 'electrician'
                      ? 'bg-[#C9A24B] text-[#0A0F1E] border-[#C9A24B] font-extrabold shadow-lg'
                      : 'bg-[#161F30] text-steel-gray border-[#232C42] hover:border-[#C9A24B]/40 hover:text-white'
                  }`}
                >
                  <span className="text-lg">⚡</span>
                  <span>Electrician</span>
                </button>

                <button
                  onClick={() => handleTradeSelect('plumber')}
                  className={`py-3 px-4 border font-display text-[9px] font-bold tracking-widest uppercase transition-all flex flex-col items-center gap-1.5 cursor-pointer rounded-none ${
                    activeTrade === 'plumber'
                      ? 'bg-[#C9A24B] text-[#0A0F1E] border-[#C9A24B] font-extrabold shadow-lg'
                      : 'bg-[#161F30] text-steel-gray border-[#232C42] hover:border-[#C9A24B]/40 hover:text-white'
                  }`}
                >
                  <span className="text-lg">🪠</span>
                  <span>Plumber</span>
                </button>

                <button
                  onClick={() => handleTradeSelect('hvac')}
                  className={`py-3 px-4 border font-display text-[9px] font-bold tracking-widest uppercase transition-all flex flex-col items-center gap-1.5 cursor-pointer rounded-none ${
                    activeTrade === 'hvac'
                      ? 'bg-[#C9A24B] text-[#0A0F1E] border-[#C9A24B] font-extrabold shadow-lg'
                      : 'bg-[#161F30] text-steel-gray border-[#232C42] hover:border-[#C9A24B]/40 hover:text-white'
                  }`}
                >
                  <span className="text-lg">❄️</span>
                  <span>HVAC Air</span>
                </button>

              </div>

              {/* Dynamic Theme Skin Details Card */}
              <div className="bg-[#0A0F1E]/50 p-5 border border-[#232C42] flex flex-col md:flex-row gap-5 items-center">
                <div className="w-12 h-12 bg-[#101828] flex items-center justify-center text-2xl shrink-0 border border-[#232C42]">
                  {currentTheme.emoji}
                </div>
                <div className="text-center md:text-left flex-1">
                  <p className="font-mono text-[9px] text-[#C9A24B] font-bold uppercase tracking-widest mb-1">
                    SLOGAN // &quot;{currentTheme.slogan}&quot;
                  </p>
                  <p className="text-xs font-sans text-[#E8E4D8]/80 leading-relaxed">
                    {currentTheme.characterDescription}
                  </p>
                </div>
                <div className="shrink-0 text-center">
                  <span className="inline-block px-3 py-1 text-[9px] font-mono font-bold text-[#C9A24B] bg-[#C9A24B]/10 border border-[#C9A24B]/30 uppercase tracking-wider">
                    {currentTheme.colorName} Active
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* SECTION: INCLUSIONS BENTO GRID */}
        <section id="what-is-included" className="mb-24">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#C9A24B]">🛠</span>
              <h2 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider">
                What every custom build includes
              </h2>
            </div>
            <div className="h-[1px] flex-1 bg-[#232C42] hidden md:block" />
            <span className="font-mono text-[9px] text-steel-gray font-bold tracking-widest uppercase">
              PORTFOLIO SPRINT METHOD
            </span>
          </div>

          {/* Bento Grid */}
          <BentoInclusions />
        </section>


        {/* SECTION: PACKAGES & PLANS */}
        <section id="packages-plans" className="mb-24">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#C9A24B]">🪙</span>
              <h2 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider">
                Packages &amp; plans
              </h2>
            </div>
            <div className="h-[1px] flex-1 bg-[#232C42] hidden md:block" />
            <span className="font-mono text-[9px] text-steel-gray font-bold tracking-widest uppercase">
              TRANSPARENT FLAT PRICING
            </span>
          </div>

          {/* Part 1 — three build package cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Essential Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
                borderColor: '#C9A24B',
                boxShadow: "0 30px 60px -15px rgba(201, 162, 75, 0.15)"
              }}
              className="bg-[#101828] text-white border border-[#232C42] rounded-md p-8 relative overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Shimmer metallic light beam */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none" />

              <div className="absolute top-0 right-6 bg-[#232C42]/60 border-x border-b border-[#232C42] text-[10px] font-mono font-bold text-gray-400 px-4 py-1.5 select-none uppercase tracking-widest">
                SYS_PKG_01
              </div>

              <div className="flex-1 flex flex-col relative z-10">
                <span className="font-mono text-xs text-[#C9A24B] font-bold tracking-widest uppercase block mb-2">
                  BASE SPRINT
                </span>
                <h3 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider mb-3">
                  Essential
                </h3>
                <div className="flex items-baseline gap-2 mb-6 border-b border-[#232C42] pb-5">
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">from</span>
                  <span className="font-display text-3xl font-black text-white">$1,500</span>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest ml-auto">One-time</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>Single-page custom website</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>Mobile responsive</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>Contact form with instant lead alerts</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>Deployed with domain setup</span>
                  </li>
                </ul>
              </div>

              <a
                href="#project-estimator"
                onClick={() => {
                  setSelectedPackage('essential');
                  playSuccess();
                }}
                className="relative z-10 block w-full text-center bg-[#161F30] hover:bg-[#C9A24B] border border-[#232C42] hover:border-[#C9A24B] text-[#E8E4D8] hover:text-[#0A0F1E] font-display text-xs font-bold tracking-widest uppercase py-4 transition-all duration-300 cursor-pointer rounded-sm"
              >
                SELECT ESSENTIAL ⚡
              </a>
            </motion.div>

            {/* Professional Card (Featured / Most popular) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -10, 
                scale: 1.025, 
                borderColor: '#C9A24B',
                boxShadow: "0 30px 60px -15px rgba(201, 162, 75, 0.25)"
              }}
              className="bg-gradient-to-b from-[#101828] to-[#121B2D] text-white border-2 border-[#C9A24B] rounded-md p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 group cursor-pointer"
            >
              {/* Shimmer metallic light beam */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none" />

              <div className="absolute top-0 right-6 bg-[#C9A24B] text-[#0A0F1E] text-[10px] font-mono font-bold px-4 py-1.5 select-none uppercase tracking-widest">
                ★ MOST POPULAR
              </div>

              <div className="flex-1 flex flex-col relative z-10">
                <span className="font-mono text-xs text-[#C9A24B] font-bold tracking-widest uppercase block mb-2">
                  RECOMMENDED
                </span>
                <h3 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider mb-3">
                  Professional
                </h3>
                <div className="flex items-baseline gap-2 mb-6 border-b border-[#232C42] pb-5">
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">from</span>
                  <span className="font-display text-3xl font-black text-white">$3,500</span>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest ml-auto">One-time</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>5–7 page custom website</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>Animations &amp; custom graphics</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>Instant lead capture to your inbox</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>Local SEO fundamentals</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0 font-bold">✔</span>
                    <span>Google Business Profile linkup</span>
                  </li>
                </ul>
              </div>

              <a
                href="#project-estimator"
                onClick={() => {
                  setSelectedPackage('professional');
                  playSuccess();
                }}
                className="relative z-10 block w-full text-center bg-[#C9A24B] hover:bg-white text-[#0A0F1E] font-display text-xs font-bold tracking-widest uppercase py-4 transition-all duration-300 cursor-pointer rounded-sm shadow-md"
              >
                SELECT PROFESSIONAL ⚡
              </a>
            </motion.div>

            {/* Signature Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
                borderColor: '#C9A24B',
                boxShadow: "0 30px 60px -15px rgba(201, 162, 75, 0.15)"
              }}
              className="bg-[#101828] text-white border border-[#232C42] hover:border-[#C9A24B]/40 rounded-md p-8 relative overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Shimmer metallic light beam */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out] pointer-events-none" />

              <div className="absolute top-0 right-6 bg-[#232C42]/60 border-x border-b border-[#232C42] text-[10px] font-mono font-bold text-gray-400 px-4 py-1.5 select-none uppercase tracking-widest">
                SYS_PKG_03
              </div>

              <div className="flex-1 flex flex-col relative z-10">
                <span className="font-mono text-xs text-[#C9A24B] font-bold tracking-widest uppercase block mb-2">
                  BESPOKE tier
                </span>
                <h3 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider mb-3">
                  Signature
                </h3>
                <div className="flex items-baseline gap-2 mb-6 border-b border-[#232C42] pb-5">
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">from</span>
                  <span className="font-display text-3xl font-black text-white">$6,000</span>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest ml-auto">One-time</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans font-bold">
                    <span className="text-[#C9A24B] shrink-0">★</span>
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0">✔</span>
                    <span>Advanced visual effects</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0">✔</span>
                    <span>Custom illustration set</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0">✔</span>
                    <span>Full brand direction</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#E8E4D8]/90 font-sans">
                    <span className="text-[#C9A24B] shrink-0">✔</span>
                    <span>Lead dashboard</span>
                  </li>
                </ul>
              </div>

              <a
                href="#project-estimator"
                onClick={() => {
                  setSelectedPackage('signature');
                  playSuccess();
                }}
                className="relative z-10 block w-full text-center bg-[#161F30] hover:bg-[#C9A24B] border border-[#232C42] hover:border-[#C9A24B] text-[#E8E4D8] hover:text-[#0A0F1E] font-display text-xs font-bold tracking-widest uppercase py-4 transition-all duration-300 cursor-pointer rounded-sm"
              >
                SELECT SIGNATURE ⚡
              </a>
            </motion.div>
          </div>

          {/* Part 2 — smaller row of three monthly maintenance plans */}
          <div className="mt-16 border-t border-[#232C42] pt-12">
            <div className="text-center md:text-left mb-8">
              <span className="font-mono text-[9px] text-[#C9A24B] font-bold tracking-widest uppercase block mb-1">
                [ SERVICE &amp; UPTIME ASSURANCE ]
              </span>
              <h3 className="font-display text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                Monthly Maintenance Plans
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Care */}
              <div className="bg-[#101828]/60 border border-[#232C42] p-5 rounded-none relative">
                <span className="font-mono text-[8px] text-steel-gray uppercase tracking-widest absolute top-2 right-4">MNT_01</span>
                <div className="flex justify-between items-baseline mb-3 pb-2 border-b border-[#232C42]/60">
                  <h4 className="font-display text-xs font-bold text-[#E8E4D8] uppercase tracking-wider">Care</h4>
                  <span className="font-mono text-xs font-bold text-[#C9A24B]">$75/mo</span>
                </div>
                <p className="font-sans text-[11px] text-steel-gray leading-relaxed">
                  hosting &amp; domain management, uptime monitoring, instant lead alerts, 1 edit/month
                </p>
              </div>

              {/* Growth */}
              <div className="bg-[#101828]/60 border border-[#232C42] p-5 rounded-none relative">
                <span className="font-mono text-[8px] text-steel-gray uppercase tracking-widest absolute top-2 right-4">MNT_02</span>
                <div className="flex justify-between items-baseline mb-3 pb-2 border-b border-[#232C42]/60">
                  <h4 className="font-display text-xs font-bold text-[#E8E4D8] uppercase tracking-wider">Growth</h4>
                  <span className="font-mono text-xs font-bold text-[#C9A24B]">$150/mo</span>
                </div>
                <p className="font-sans text-[11px] text-steel-gray leading-relaxed">
                  everything in Care, 4 edits/month, monthly lead report, SEO tune-ups, 48-hour turnaround
                </p>
              </div>

              {/* Partner */}
              <div className="bg-[#101828]/60 border border-[#232C42] p-5 rounded-none relative">
                <span className="font-mono text-[8px] text-steel-gray uppercase tracking-widest absolute top-2 right-4">MNT_03</span>
                <div className="flex justify-between items-baseline mb-3 pb-2 border-b border-[#232C42]/60">
                  <h4 className="font-display text-xs font-bold text-[#E8E4D8] uppercase tracking-wider">Partner</h4>
                  <span className="font-mono text-xs font-bold text-[#C9A24B]">$300/mo</span>
                </div>
                <p className="font-sans text-[11px] text-steel-gray leading-relaxed">
                  everything in Growth, unlimited small edits, lead dashboard, priority support
                </p>
              </div>
            </div>
          </div>

          {/* Under everything line */}
          <div className="mt-12 text-center border-t border-[#232C42]/40 pt-8">
            <p className="font-mono text-[9px] text-steel-gray uppercase tracking-widest">
              50% deposit to start · balance due at launch · live in 5 business days.
            </p>
          </div>
        </section>


        {/* SECTION: LEAD DISPATCH PLAYGROUND */}
        <section id="lead-simulator-section" className="mb-24">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#C9A24B]">📠</span>
              <h2 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider">
                Built-in lead capture pipeline
              </h2>
            </div>
            <div className="h-[1px] flex-1 bg-[#232C42] hidden md:block" />
            <span className="font-mono text-[9px] text-steel-gray font-bold tracking-widest uppercase">
              3-SECOND FORWARDING ENGINE
            </span>
          </div>

          <LeadSimulator />
        </section>


        {/* SECTION: PROJECT ESTIMATOR */}
        <section id="project-estimator" className="mb-24">
          
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-[#C9A24B]">🪙</span>
              <h2 className="font-display text-base md:text-lg font-bold text-white uppercase tracking-wider">
                Bespoke Project Estimate Calculator
              </h2>
            </div>
            <div className="h-[1px] flex-1 bg-[#232C42] hidden md:block" />
            <span className="font-mono text-[9px] text-steel-gray font-bold tracking-widest uppercase">
              TRANSPARENT SPRINT PRICING
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Interactive Checkbox List */}
            <div className="lg:col-span-7 bg-[#101828] border border-[#232C42] rounded-sm p-6 md:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xs md:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                  Customize your web payload
                </h3>
                <p className="text-xs font-sans text-steel-gray mb-6 leading-relaxed">
                  Select your base package and configure active upgrades. Our estimator dynamically flags modules that are already included for free in your chosen tier.
                </p>

                {/* Segmented Base Package Selector */}
                <div className="mb-6 bg-[#0A0D15] p-3.5 border border-[#232C42]">
                  <label className="block text-[10px] font-mono font-bold uppercase text-gray-400 mb-2.5 tracking-widest">
                    [ 1 ] Choose starting sprint tier:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => { setSelectedPackage('essential'); playBloop(380, 0.08); }}
                      className={`py-3 px-2 text-center font-mono text-[10px] md:text-xs uppercase font-bold border transition-all cursor-pointer ${
                        selectedPackage === 'essential'
                          ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-[#C9A24B] shadow-inner'
                          : 'bg-[#101828]/60 text-gray-400 border-[#232C42] hover:border-gray-600'
                      }`}
                    >
                      Essential
                      <span className="block text-[9px] font-normal text-gray-400 mt-1">$1,500</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedPackage('professional'); playBloop(420, 0.08); }}
                      className={`py-3 px-2 text-center font-mono text-[10px] md:text-xs uppercase font-bold border transition-all cursor-pointer ${
                        selectedPackage === 'professional'
                          ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-[#C9A24B] shadow-inner'
                          : 'bg-[#101828]/60 text-gray-400 border-[#232C42] hover:border-gray-600'
                      }`}
                    >
                      Professional
                      <span className="block text-[9px] font-normal text-[#C9A24B] mt-1 font-bold">$3,500</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedPackage('signature'); playBloop(480, 0.08); }}
                      className={`py-3 px-2 text-center font-mono text-[10px] md:text-xs uppercase font-bold border transition-all cursor-pointer ${
                        selectedPackage === 'signature'
                          ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-[#C9A24B] shadow-inner'
                          : 'bg-[#101828]/60 text-gray-400 border-[#232C42] hover:border-gray-600'
                      }`}
                    >
                      Signature
                      <span className="block text-[9px] font-normal text-gray-400 mt-1">$6,000</span>
                    </button>
                  </div>
                </div>

                <label className="block text-[10px] font-mono font-bold uppercase text-gray-400 mb-3 tracking-widest">
                  [ 2 ] Configure optional upgrades &amp; custom modules:
                </label>

                {/* Checklist items */}
                <div className="space-y-4">
                  
                  {/* Custom Branding upgrade */}
                  <div 
                    onClick={() => toggleCalculatorOption('branding')}
                    className={`flex items-start gap-4 p-4 border transition-all ${
                      isBrandingIncluded 
                        ? 'bg-[#0A0D15]/20 border-[#232C42]/50 opacity-80 cursor-default'
                        : 'bg-[#0A0D15]/40 hover:bg-[#0A0D15]/80 border-[#232C42] hover:border-[#C9A24B]/40 cursor-pointer select-none'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isBrandingIncluded || hasBranding}
                      disabled={isBrandingIncluded}
                      onChange={() => {}}
                      className="w-4 h-4 border border-[#232C42] accent-[#C9A24B] mt-0.5 cursor-pointer shrink-0 disabled:opacity-80"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-mono text-xs text-[#E8E4D8] uppercase tracking-wider font-bold">
                          Custom Trade Branding &amp; Vector Badges
                        </h4>
                        {isBrandingIncluded && (
                          <span className="text-[9px] bg-[#C9A24B]/10 text-[#C9A24B] px-1.5 py-0.5 font-mono border border-[#C9A24B]/20">
                            INCLUDED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-steel-gray mt-1 leading-relaxed font-sans">
                        Unique vector badges, custom mascot stickers, and customized trademark-looking stamps for your license numbers.
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-xs text-[#C9A24B] font-bold shrink-0">
                      {isBrandingIncluded ? 'Included' : '+$400'}
                    </span>
                  </div>

                  {/* Lead capture upgrade */}
                  <div 
                    onClick={() => toggleCalculatorOption('lead')}
                    className={`flex items-start gap-4 p-4 border transition-all ${
                      isLeadIncluded 
                        ? 'bg-[#0A0D15]/20 border-[#232C42]/50 opacity-80 cursor-default'
                        : 'bg-[#0A0D15]/40 hover:bg-[#0A0D15]/80 border-[#232C42] hover:border-[#C9A24B]/40 cursor-pointer select-none'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isLeadIncluded || hasLeadCapture}
                      disabled={isLeadIncluded}
                      onChange={() => {}}
                      className="w-4 h-4 border border-[#232C42] accent-[#C9A24B] mt-0.5 cursor-pointer shrink-0 disabled:opacity-80"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-mono text-xs text-[#E8E4D8] uppercase tracking-wider font-bold">
                          3-Second Instant Lead Capture Dispatch
                        </h4>
                        {isLeadIncluded && (
                          <span className="text-[9px] bg-[#C9A24B]/10 text-[#C9A24B] px-1.5 py-0.5 font-mono border border-[#C9A24B]/20">
                            INCLUDED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-steel-gray mt-1 leading-relaxed font-sans">
                        Enables the custom school-notebook style capture form linked directly to your SMS or Email forwarding dispatcher.
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-xs text-[#C9A24B] font-bold shrink-0">
                      {isLeadIncluded ? 'Included' : '+$300'}
                    </span>
                  </div>

                  {/* Neighborhood SEO upgrade */}
                  <div 
                    onClick={() => toggleCalculatorOption('seo')}
                    className={`flex items-start gap-4 p-4 border transition-all ${
                      isSeoIncluded 
                        ? 'bg-[#0A0D15]/20 border-[#232C42]/50 opacity-80 cursor-default'
                        : 'bg-[#0A0D15]/40 hover:bg-[#0A0D15]/80 border-[#232C42] hover:border-[#C9A24B]/40 cursor-pointer select-none'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isSeoIncluded || hasSeo}
                      disabled={isSeoIncluded}
                      onChange={() => {}}
                      className="w-4 h-4 border border-[#232C42] accent-[#C9A24B] mt-0.5 cursor-pointer shrink-0 disabled:opacity-80"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-mono text-xs text-[#E8E4D8] uppercase tracking-wider font-bold">
                          Hyperlocal Neighborhood SEO Sub-grids
                        </h4>
                        {isSeoIncluded && (
                          <span className="text-[9px] bg-[#C9A24B]/10 text-[#C9A24B] px-1.5 py-0.5 font-mono border border-[#C9A24B]/20">
                            INCLUDED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-steel-gray mt-1 leading-relaxed font-sans">
                        Custom secondary landing layouts optimized to rank for specific service cities (e.g. Burbank, Pasadena, Silverlake).
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-xs text-[#C9A24B] font-bold shrink-0">
                      {isSeoIncluded ? 'Included' : '+$500'}
                    </span>
                  </div>

                  {/* Interactive estimator widget */}
                  <div 
                    onClick={() => toggleCalculatorOption('widget')}
                    className={`flex items-start gap-4 p-4 border transition-all ${
                      isWidgetIncluded 
                        ? 'bg-[#0A0D15]/20 border-[#232C42]/50 opacity-80 cursor-default'
                        : 'bg-[#0A0D15]/40 hover:bg-[#0A0D15]/80 border-[#232C42] hover:border-[#C9A24B]/40 cursor-pointer select-none'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isWidgetIncluded || hasWidget}
                      disabled={isWidgetIncluded}
                      onChange={() => {}}
                      className="w-4 h-4 border border-[#232C42] accent-[#C9A24B] mt-0.5 cursor-pointer shrink-0 disabled:opacity-80"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-mono text-xs text-[#E8E4D8] uppercase tracking-wider font-bold">
                          Interactive Calculation Widget Upgrade
                        </h4>
                        {isWidgetIncluded && (
                          <span className="text-[9px] bg-[#C9A24B]/10 text-[#C9A24B] px-1.5 py-0.5 font-mono border border-[#C9A24B]/20">
                            INCLUDED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-steel-gray mt-1 leading-relaxed font-sans">
                        Custom built-in estimator tools (such as panel upgrade calculator or AC unit sizer) mapped directly into your frontend.
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-xs text-[#C9A24B] font-bold shrink-0">
                      {isWidgetIncluded ? 'Included' : '+$350'}
                    </span>
                  </div>

                </div>
              </div>

              {/* Speed Delivery Tiers */}
              <div className="mt-8 border-t border-[#232C42] pt-6">
                <h4 className="font-mono text-[9px] font-bold text-gray-400 tracking-widest uppercase mb-3">
                  ★ SELECT LAUNCH SPEED TIER:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  
                  <button
                    onClick={() => handleSpeedTier('standard')}
                    className={`py-3.5 px-4 border font-mono text-[10px] font-bold uppercase transition-all cursor-pointer flex flex-col items-center gap-1 rounded-none ${
                      speedTier === 'standard'
                        ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-[#C9A24B]'
                        : 'bg-[#161F30] text-steel-gray border-[#232C42] hover:border-[#C9A24B]/30'
                    }`}
                  >
                    <span>🐢 STANDARD BUILD</span>
                    <span className="text-[9px] text-steel-gray mt-0.5 font-normal">Live in 5 Days (Included)</span>
                  </button>

                  <button
                    onClick={() => handleSpeedTier('turbo')}
                    className={`py-3.5 px-4 border font-mono text-[10px] font-bold uppercase transition-all cursor-pointer flex flex-col items-center gap-1 rounded-none ${
                      speedTier === 'turbo'
                        ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-[#C9A24B]'
                        : 'bg-[#161F30] text-steel-gray border-[#232C42] hover:border-[#C9A24B]/30'
                    }`}
                  >
                    <span>🚀 TURBO-BLAST SPRINT</span>
                    <span className="text-[9px] text-[#C9A24B] mt-0.5 font-normal font-bold">Live in 3 Days (+$450)</span>
                  </button>

                </div>
              </div>

            </div>

            {/* Right Column: Premium Document Style Invoice Sheet */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-[#F5F2EB] text-[#121622] border border-[#C9A24B] rounded-none p-6 md:p-8 relative select-none shadow-2xl h-full flex flex-col justify-between">
                
                {/* Gold header outline */}
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#C9A24B]/20 pointer-events-none" />

                <div className="font-mono text-xs relative z-10">
                  
                  <div className="text-center border-b border-[#121622]/20 pb-4 mb-5">
                    <h4 className="font-display text-sm font-bold text-[#121622] uppercase tracking-wider">
                      WEBNAR SPRINT ESTIMATE
                    </h4>
                    <p className="text-[9px] text-[#7A8399] tracking-widest mt-1">
                      LOS ANGELES TRADES DIVISION // JULY 2026
                    </p>
                  </div>

                  <div className="space-y-3.5 border-b border-[#121622]/15 pb-5 mb-5 text-[11px]">
                    <div className="flex justify-between font-bold">
                      <span className="uppercase">
                        {selectedPackage === 'essential' && 'Essential Core Base'}
                        {selectedPackage === 'professional' && 'Professional Suite Base'}
                        {selectedPackage === 'signature' && 'Signature Custom Base'}
                      </span>
                      <span>${basePrice.toLocaleString()}.00</span>
                    </div>

                    {/* Show customizable add-ons if added separately */}
                    {!isBrandingIncluded && hasBranding && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 uppercase">Vector Logos &amp; Stamps</span>
                        <span className="font-bold">+$400.00</span>
                      </div>
                    )}
                    {!isLeadIncluded && hasLeadCapture && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 uppercase">3s SMS Lead Dispatch</span>
                        <span className="font-bold">+$300.00</span>
                      </div>
                    )}
                    {!isSeoIncluded && hasSeo && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 uppercase">Neighborhood SEO Hub</span>
                        <span className="font-bold">+$500.00</span>
                      </div>
                    )}
                    {!isWidgetIncluded && hasWidget && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 uppercase">Interactive Estimator Widget</span>
                        <span className="font-bold">+$350.00</span>
                      </div>
                    )}

                    {/* Show speed delivery upgrades */}
                    {speedTier === 'turbo' && (
                      <div className="flex justify-between text-[#C9A24B] font-bold bg-[#121622] p-2">
                        <span className="uppercase text-[#C9A24B] font-mono">🚀 Turbo 3-Day Sprint</span>
                        <span>+$450.00</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs pt-1">
                      <span className="text-gray-600">Raw Build Subtotal:</span>
                      <span className="font-bold">${totalPrice.toLocaleString()}.00</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-[#121622]/20 border-dashed pt-4 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="font-display text-xs font-bold uppercase tracking-wider">GRAND TOTAL:</span>
                      <span className="font-display text-2xl font-black text-[#121622]">
                        ${totalPrice.toLocaleString()}.00
                      </span>
                    </div>
                    <p className="text-[9px] text-[#7A8399] tracking-wider uppercase mt-3 text-center leading-normal">
                      *One-time fixed contract fee. No ongoing platform cuts. Includes 100% intellectual property delivery.*
                    </p>
                  </div>

                  <a
                    href="#lead-capture-simulator"
                    onClick={() => playSuccess()}
                    className="block w-full text-center bg-[#121622] hover:bg-[#C9A24B] text-[#C9A24B] hover:text-[#121622] border border-[#121622] font-display text-[10px] font-bold tracking-widest uppercase py-4 transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    LOCK ESTIMATE &amp; START SPRINT ⚡
                  </a>

                </div>
              </div>
            </div>

          </div>

          {/* EXPLANATION HUB: WHAT IS A SPRINT ESTIMATE EXACTLY? */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-12 bg-[#101828] border border-[#232C42] rounded-sm p-6 md:p-8 shadow-md font-mono text-xs">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#232C42]">
                <span className="text-[#C9A24B] text-lg">💡</span>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  What is a WebNar Sprint Estimate exactly?
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#E8E4D8]/80 leading-relaxed font-sans text-xs md:text-sm">
                <div>
                  <h5 className="font-mono text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-2">
                    1. HYPER-ACCELERATED DELIVERY
                  </h5>
                  <p>
                    Standard agency builds take 6 to 12 weeks of endless meetings. We operate in hyper-focused <strong className="text-white">3 to 5 day Sprints</strong>. Our team limits client intake to build and ship your custom digital storefront instantly, with zero downtime.
                  </p>
                </div>
                <div>
                  <h5 className="font-mono text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-2">
                    2. FIXED-PRICE TRANSPARENCY
                  </h5>
                  <p>
                    There are no hidden fees or monthly hosting markups. Your <strong className="text-white">Sprint Estimate</strong> is a fully-inclusive, one-time contract. You see exactly what you pay based on your customized upgrades, with a standard 50% deposit.
                  </p>
                </div>
                <div>
                  <h5 className="font-mono text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-2">
                    3. COMPLETE CODE OWNERSHIP
                  </h5>
                  <p>
                    Unlike subscription builders (Wix, Squarespace) that lock you in forever, WebNar delivers your custom React/Tailwind codebase directly to you. You own <strong className="text-white">100% of the raw assets and IP</strong> with no ongoing subscription requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>


        {/* SECTION: CLIENT REVIEW CONSOLE HUB */}
        <ReviewConsole />


        {/* BOTTOM CALL TO ACTION PANEL */}
        <section className="mb-16 select-none">
          <div className="bg-[#101828] border border-[#C9A24B]/40 rounded-none p-8 md:p-12 relative overflow-hidden shadow-2xl">
            
            {/* Blueprint grid accent inside the panel */}
            <div className="absolute inset-0 retro-halftone-white opacity-25 pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
              
              <div className="text-3xl mb-4 text-[#C9A24B]">
                📟
              </div>

              <span className="font-mono text-[9px] text-[#C9A24B] font-bold uppercase tracking-widest block mb-2">
                5-DAY DEPLOYMENT OR IT&apos;S FREE
              </span>

              <h2 className="font-display text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide leading-snug mb-4">
                Ready to win local contracts before the phone rings?
              </h2>

              <p className="font-sans text-sm text-steel-gray mb-8 max-w-lg leading-relaxed">
                Connect with our Los Angeles development studio. Let us design a highly responsive, high-trust storefront that places you far above competitors.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <a
                  href="#lead-capture-simulator"
                  onClick={() => playSuccess()}
                  className="bg-[#C9A24B] text-[#0A0F1E] font-display font-bold text-[10px] tracking-widest uppercase px-8 py-4 border border-[#C9A24B] hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer text-center"
                >
                  START SIMULATOR PROJECT ⚡
                </a>
                <a
                  href="mailto:webnarrr@gmail.com"
                  onClick={() => playBloop(350, 0.1)}
                  className="bg-black/40 text-[#E8E4D8] font-mono text-[10px] tracking-widest uppercase px-6 py-4 border border-[#232C42] hover:bg-[#161F30] hover:border-[#C9A24B] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>✉ Email Studio:</span>
                  <span className="text-[#C9A24B] underline font-bold">webnarrr@gmail.com</span>
                </a>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-6 text-[9px] font-mono text-steel-gray uppercase tracking-widest">
                <span>LICENSE NUMBERS DISPATCH</span>
                <span>•</span>
                <span>SECURE CODE EXPORTS</span>
                <span>•</span>
                <span>NO RECURRING MONTHLY FEES</span>
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#232C42] bg-[#101828] text-steel-gray font-mono text-[10px] pt-12 pb-10 select-none">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#232C42]">
            
            {/* Branding column */}
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-lg tracking-wider text-[#E8E4D8] uppercase">
                  WEB<span className="text-[#C9A24B]">NAR</span>
                </span>
              </div>
              <p className="text-[11px] text-steel-gray font-sans leading-relaxed">
                Los Angeles bespoke web production studio. Building custom high-trust digital assets for tradesmen, plumbers, electricians, and local mechanical contractors.
              </p>
            </div>

            {/* Hub Cities column */}
            <div className="space-y-3">
              <span className="text-[#C9A24B] font-bold block tracking-widest uppercase">LOCAL CODES ACTIVE:</span>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10px] text-gray-400">
                <span>• Van Nuys</span>
                <span>• Burbank</span>
                <span>• Silverlake</span>
                <span>• Pasadena</span>
                <span>• Glendale</span>
                <span>• Culver City</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <span className="text-[#C9A24B] font-bold block tracking-widest uppercase">CLIENT CONTACT HOOK:</span>
              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                Email: <a href="mailto:webnarrr@gmail.com" className="text-[#C9A24B] underline font-mono">webnarrr@gmail.com</a>
              </p>
              <p className="text-[11px] text-steel-gray font-sans leading-relaxed">
                Sprints run Mon-Fri 8:00 AM - 6:00 PM PST.
              </p>
            </div>

          </div>

          {/* Copyright row */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] text-steel-gray tracking-widest uppercase">
            <span>© 2026 WebNar Los Angeles. Built in pure TypeScript &amp; React. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#top" className="hover:text-white transition-colors">Back to Top ▲</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
