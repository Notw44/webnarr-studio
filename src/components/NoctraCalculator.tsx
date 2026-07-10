import React from 'react';
import { motion } from 'motion/react';
import { playBloop, playSuccess } from '../utils/audio';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  BarChart3, 
  ShieldCheck, 
  Check, 
  X, 
  TrendingUp, 
  CheckCircle, 
  Zap, 
  HelpCircle, 
  Sparkles, 
  Maximize2,
  ArrowRightLeft
} from 'lucide-react';

interface NoctraCalculatorProps {
  selectedPackage: 'essential' | 'professional' | 'signature';
  setSelectedPackage: (val: 'essential' | 'professional' | 'signature') => void;
  hasBranding: boolean;
  toggleCalculatorOption: (option: string) => void;
  hasLeadCapture: boolean;
  hasSeo: boolean;
  hasWidget: boolean;
  speedTier: 'standard' | 'turbo';
  handleSpeedTier: (tier: 'standard' | 'turbo') => void;
  totalPrice: number;
  basePrice: number;
  isBrandingIncluded: boolean;
  isLeadIncluded: boolean;
  isSeoIncluded: boolean;
  isWidgetIncluded: boolean;
  brandingPrice: number;
  leadPrice: number;
  seoPrice: number;
  widgetPrice: number;
  speedMarkup: number;
}

export default function NoctraCalculator({
  selectedPackage,
  setSelectedPackage,
  hasBranding,
  toggleCalculatorOption,
  hasLeadCapture,
  hasSeo,
  hasWidget,
  speedTier,
  handleSpeedTier,
  totalPrice,
  basePrice,
  isBrandingIncluded,
  isLeadIncluded,
  isSeoIncluded,
  isWidgetIncluded,
  brandingPrice,
  leadPrice,
  seoPrice,
  widgetPrice,
  speedMarkup
}: NoctraCalculatorProps) {
  const [chartTab, setChartTab] = React.useState<'metrics' | 'matrix'>('metrics');

  return (
    <section id="estimator-section" className="border-b border-[#1F222B] py-20 select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section title */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4 border-b border-[#1F222B] pb-5">
          <div className="flex items-center gap-3">
            <span className="text-xl text-[#C5B395]">✦</span>
            <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-[#ECEAE5] uppercase italic">
              PRICING ESTIMATOR
            </h2>
          </div>
          <span className="font-mono text-[9px] text-[#9E9C96] font-bold tracking-[0.2em] uppercase">
            TRANSPARENT SPRINT DESIGN
          </span>
        </div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Checklists and Configuration */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#0E0E0F] border border-[#1F222B] p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-xs font-semibold text-[#ECEAE5] tracking-wider mb-2.5 uppercase">
                Customize your web payload
              </h3>
              <p className="text-xs font-sans text-[#9E9C96] mb-8 leading-relaxed">
                Select your base starting package and configure active upgrades. Our estimator automatically tags modules that are already included for free in your chosen tier.
              </p>

              {/* Segmented Base Package Selector */}
              <div className="mb-8 bg-[#070708] p-4 border border-[#1F222B]">
                <label className="block text-[9px] font-mono font-bold uppercase text-[#9E9C96] mb-3 tracking-[0.2em]">
                  [ 1 ] CHOOSE STARTING SPRINT TIER:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { setSelectedPackage('essential'); playBloop(380, 0.08); }}
                    className={`py-3.5 px-2 text-center font-mono text-[10px] uppercase font-bold border transition-all cursor-pointer rounded-none ${
                      selectedPackage === 'essential'
                        ? 'bg-[#C5B395]/15 border-[#C5B395] text-[#C5B395] font-black'
                        : 'bg-[#0A0A0B]/60 text-[#9E9C96] border-[#1F222B] hover:border-[#9E9C96]/40'
                    }`}
                  >
                    Essential
                    <span className="block text-[8px] font-normal text-[#9E9C96] mt-1">$1,500</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedPackage('professional'); playBloop(420, 0.08); }}
                    className={`py-3.5 px-2 text-center font-mono text-[10px] uppercase font-bold border transition-all cursor-pointer rounded-none ${
                      selectedPackage === 'professional'
                        ? 'bg-[#C5B395]/15 border-[#C5B395] text-[#C5B395] font-black'
                        : 'bg-[#0A0A0B]/60 text-[#9E9C96] border-[#1F222B] hover:border-[#9E9C96]/40'
                    }`}
                  >
                    Professional
                    <span className="block text-[8px] font-normal text-[#C5B395] mt-1 font-bold">$3,500</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedPackage('signature'); playBloop(480, 0.08); }}
                    className={`py-3.5 px-2 text-center font-mono text-[10px] uppercase font-bold border transition-all cursor-pointer rounded-none ${
                      selectedPackage === 'signature'
                        ? 'bg-[#C5B395]/15 border-[#C5B395] text-[#C5B395] font-black'
                        : 'bg-[#0A0A0B]/60 text-[#9E9C96] border-[#1F222B] hover:border-[#9E9C96]/40'
                    }`}
                  >
                    Signature
                    <span className="block text-[8px] font-normal text-[#9E9C96] mt-1">$6,000</span>
                  </button>
                </div>
              </div>

              <label className="block text-[9px] font-mono font-bold uppercase text-[#9E9C96] mb-4 tracking-[0.2em]">
                [ 2 ] CONFIGURE OPTIONAL UPGRADES & CUSTOM MODULES:
              </label>

              {/* Upgrades Checklist */}
              <div className="space-y-4">
                
                {/* Custom Branding upgrade */}
                <div 
                  onClick={() => toggleCalculatorOption('branding')}
                  className={`flex items-start gap-4 p-4 border transition-all rounded-none ${
                    isBrandingIncluded 
                      ? 'bg-[#070708]/40 border-[#1F222B]/50 opacity-80 cursor-default'
                      : 'bg-[#070708]/80 hover:bg-[#070708] border-[#1F222B] hover:border-[#C5B395]/40 cursor-pointer select-none'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={isBrandingIncluded || hasBranding}
                    disabled={isBrandingIncluded}
                    onChange={() => {}}
                    className="w-4 h-4 border border-[#1F222B] accent-[#C5B395] mt-0.5 cursor-pointer shrink-0 disabled:opacity-80"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-mono text-xs text-[#ECEAE5] uppercase tracking-wider font-bold">
                        Custom Trade Branding & Vector Badges
                      </h4>
                      {isBrandingIncluded && (
                        <span className="text-[8px] bg-[#C5B395]/10 text-[#C5B395] px-1.5 py-0.5 font-mono border border-[#C5B395]/20">
                          INCLUDED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#9E9C96] mt-1 leading-relaxed font-sans">
                      Unique vector badges, custom mascot stickers, and customized trademark stamps for your license numbers.
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-[#C5B395] font-bold shrink-0">
                    {isBrandingIncluded ? 'Included' : '+$400'}
                  </span>
                </div>

                {/* Lead capture upgrade */}
                <div 
                  onClick={() => toggleCalculatorOption('lead')}
                  className={`flex items-start gap-4 p-4 border transition-all rounded-none ${
                    isLeadIncluded 
                      ? 'bg-[#070708]/40 border-[#1F222B]/50 opacity-80 cursor-default'
                      : 'bg-[#070708]/80 hover:bg-[#070708] border-[#1F222B] hover:border-[#C5B395]/40 cursor-pointer select-none'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={isLeadIncluded || hasLeadCapture}
                    disabled={isLeadIncluded}
                    onChange={() => {}}
                    className="w-4 h-4 border border-[#1F222B] accent-[#C5B395] mt-0.5 cursor-pointer shrink-0 disabled:opacity-80"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-mono text-xs text-[#ECEAE5] uppercase tracking-wider font-bold">
                        3-Second Instant Lead Capture Dispatch
                      </h4>
                      {isLeadIncluded && (
                        <span className="text-[8px] bg-[#C5B395]/10 text-[#C5B395] px-1.5 py-0.5 font-mono border border-[#C5B395]/20">
                          INCLUDED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#9E9C96] mt-1 leading-relaxed font-sans">
                      Enables the custom ticket-style capture form linked directly to your SMS or Email forwarding dispatcher.
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-[#C5B395] font-bold shrink-0">
                    {isLeadIncluded ? 'Included' : '+$300'}
                  </span>
                </div>

                {/* Neighborhood SEO upgrade */}
                <div 
                  onClick={() => toggleCalculatorOption('seo')}
                  className={`flex items-start gap-4 p-4 border transition-all rounded-none ${
                    isSeoIncluded 
                      ? 'bg-[#070708]/40 border-[#1F222B]/50 opacity-80 cursor-default'
                      : 'bg-[#070708]/80 hover:bg-[#070708] border-[#1F222B] hover:border-[#C5B395]/40 cursor-pointer select-none'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={isSeoIncluded || hasSeo}
                    disabled={isSeoIncluded}
                    onChange={() => {}}
                    className="w-4 h-4 border border-[#1F222B] accent-[#C5B395] mt-0.5 cursor-pointer shrink-0 disabled:opacity-80"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-mono text-xs text-[#ECEAE5] uppercase tracking-wider font-bold">
                        Hyperlocal Neighborhood SEO Sub-grids
                      </h4>
                      {isSeoIncluded && (
                        <span className="text-[8px] bg-[#C5B395]/10 text-[#C5B395] px-1.5 py-0.5 font-mono border border-[#C5B395]/20">
                          INCLUDED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#9E9C96] mt-1 leading-relaxed font-sans">
                      Custom secondary landing layouts optimized to rank for specific service regions (e.g. Burbank, Pasadena, Silverlake).
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-[#C5B395] font-bold shrink-0">
                    {isSeoIncluded ? 'Included' : '+$500'}
                  </span>
                </div>

                {/* Interactive estimator widget */}
                <div 
                  onClick={() => toggleCalculatorOption('widget')}
                  className={`flex items-start gap-4 p-4 border transition-all rounded-none ${
                    isWidgetIncluded 
                      ? 'bg-[#070708]/40 border-[#1F222B]/50 opacity-80 cursor-default'
                      : 'bg-[#070708]/80 hover:bg-[#070708] border-[#1F222B] hover:border-[#C5B395]/40 cursor-pointer select-none'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={isWidgetIncluded || hasWidget}
                    disabled={isWidgetIncluded}
                    onChange={() => {}}
                    className="w-4 h-4 border border-[#1F222B] accent-[#C5B395] mt-0.5 cursor-pointer shrink-0 disabled:opacity-80"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-mono text-xs text-[#ECEAE5] uppercase tracking-wider font-bold">
                        Interactive Calculation Widget Upgrade
                      </h4>
                      {isWidgetIncluded && (
                        <span className="text-[8px] bg-[#C5B395]/10 text-[#C5B395] px-1.5 py-0.5 font-mono border border-[#C5B395]/20">
                          INCLUDED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#9E9C96] mt-1 leading-relaxed font-sans">
                      Custom built-in estimator tools (such as electrical panel sizing or AC unit calculator) loaded inside the code.
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-[#C5B395] font-bold shrink-0">
                    {isWidgetIncluded ? 'Included' : '+$350'}
                  </span>
                </div>

              </div>
            </div>

            {/* Launch speed tiers */}
            <div className="mt-8 border-t border-[#1F222B] pt-6">
              <h4 className="font-mono text-[9px] font-bold text-[#9E9C96] tracking-[0.18em] uppercase mb-3">
                ★ SELECT LAUNCH SPEED TIER:
              </h4>
              <div className="grid grid-cols-2 gap-4">
                
                <button
                  onClick={() => handleSpeedTier('standard')}
                  className={`py-3.5 px-4 border font-mono text-[10px] font-bold uppercase transition-all cursor-pointer rounded-none ${
                    speedTier === 'standard'
                      ? 'bg-[#C5B395]/15 border-[#C5B395] text-[#C5B395]'
                      : 'bg-[#0A0A0B] text-[#9E9C96] border-[#1F222B] hover:border-[#C5B395]/30'
                  }`}
                >
                  <span>🐢 STANDARD BUILD</span>
                  <span className="text-[8px] text-[#9E9C96] mt-0.5 font-normal block">Live in 5 Days (Included)</span>
                </button>

                <button
                  onClick={() => handleSpeedTier('turbo')}
                  className={`py-3.5 px-4 border font-mono text-[10px] font-bold uppercase transition-all cursor-pointer rounded-none ${
                    speedTier === 'turbo'
                      ? 'bg-[#C5B395]/15 border-[#C5B395] text-[#C5B395]'
                      : 'bg-[#0A0A0B] text-[#9E9C96] border-[#1F222B] hover:border-[#C5B395]/30'
                  }`}
                >
                  <span>🚀 TURBO-BLAST SPRINT</span>
                  <span className="text-[8px] text-[#C5B395] mt-0.5 font-bold block">Live in 3 Days (+$450)</span>
                </button>

              </div>
            </div>

          </motion.div>

          {/* Right Column: Premium Docket Invoice Sheet */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="bg-[#ECEAE5] text-[#121622] border border-[#C5B395] p-6 md:p-8 relative select-none shadow-2xl h-full flex flex-col justify-between rounded-none">
              
              {/* Outer delicate guidelines */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#C5B395]/30 pointer-events-none rounded-none" />

              <div className="font-mono text-xs relative z-10">
                
                <div className="text-center border-b border-[#121622]/20 pb-4 mb-5">
                  <h4 className="font-display text-sm font-bold text-[#121622] uppercase tracking-wider">
                    ✦ WEBNAR SPRINT ESTIMATE
                  </h4>
                  <p className="text-[9px] text-[#555D70] tracking-[0.18em] mt-1.5">
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

                  {/* Customizable add-ons if selected separately */}
                  {!isBrandingIncluded && hasBranding && (
                    <div className="flex justify-between text-[#555D70]">
                      <span className="uppercase">Vector Logos & Stamps</span>
                      <span className="font-bold text-[#121622]">+$400.00</span>
                    </div>
                  )}
                  {!isLeadIncluded && hasLeadCapture && (
                    <div className="flex justify-between text-[#555D70]">
                      <span className="uppercase">3s SMS Lead Dispatch</span>
                      <span className="font-bold text-[#121622]">+$300.00</span>
                    </div>
                  )}
                  {!isSeoIncluded && hasSeo && (
                    <div className="flex justify-between text-[#555D70]">
                      <span className="uppercase">Neighborhood SEO Hub</span>
                      <span className="font-bold text-[#121622]">+$500.00</span>
                    </div>
                  )}
                  {!isWidgetIncluded && hasWidget && (
                    <div className="flex justify-between text-[#555D70]">
                      <span className="uppercase">Interactive Estimator Widget</span>
                      <span className="font-bold text-[#121622]">+$350.00</span>
                    </div>
                  )}

                  {/* Speed delivery upgrades */}
                  {speedTier === 'turbo' && (
                    <div className="flex justify-between text-[#0A0A0B] font-bold bg-[#C5B395]/20 p-2 border border-[#C5B395]/40">
                      <span className="uppercase font-mono">🚀 Turbo 3-Day Sprint</span>
                      <span>+$450.00</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-[#555D70]">Raw Build Subtotal:</span>
                    <span className="font-bold">${totalPrice.toLocaleString()}.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-[#121622]/20 border-dashed pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-[#121622]">GRAND TOTAL:</span>
                    <span className="font-display text-2xl font-black text-[#121622]">
                      ${totalPrice.toLocaleString()}.00
                    </span>
                  </div>
                  <p className="text-[8px] text-[#555D70] tracking-[0.1em] uppercase mt-3 text-center leading-normal">
                    *One-time fixed contract fee. No ongoing platform cuts. Includes 100% intellectual property delivery.*
                  </p>
                </div>

                <a
                  href="#lead-simulator-section"
                  onClick={() => playSuccess()}
                  className="block w-full text-center bg-[#121622] hover:bg-[#121622]/90 text-[#ECEAE5] hover:text-[#C5B395] font-mono text-[10px] font-bold tracking-[0.2em] uppercase py-4 transition-all duration-300 cursor-pointer rounded-none shadow-md"
                >
                  LOCK ESTIMATE & START SPRINT ⚡
                </a>

              </div>
            </div>
          </motion.div>

        </div>

        {/* INTERACTIVE PRICING ANALYTICS & COMPARISON MATRIX */}
        <div className="mt-16 border border-[#1F222B] bg-[#0E0E0F]/60 p-6 md:p-8 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#C5B395]/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#1F222B] pb-6 mb-8">
            <div>
              <span className="font-mono text-[8px] text-[#C5B395] font-bold uppercase tracking-[0.2em] block mb-2">
                [ ANALYSIS TAB ] CLIENT DECISION PLATFORM
              </span>
              <h3 className="font-display text-lg font-light text-[#ECEAE5] uppercase tracking-wide italic">
                PRICING MODEL & CONVERSION VALUE CHART
              </h3>
            </div>
            
            {/* Tab Switches */}
            <div className="flex items-center gap-1.5 bg-[#070708] border border-[#1F222B] p-1">
              <button
                type="button"
                onClick={() => { setChartTab('metrics'); playBloop(350, 0.08); }}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                  chartTab === 'metrics'
                    ? 'bg-[#C5B395]/15 border border-[#C5B395] text-[#C5B395] font-bold'
                    : 'text-[#9E9C96] border border-transparent hover:text-[#ECEAE5]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Performance Metrics
              </button>
              <button
                type="button"
                onClick={() => { setChartTab('matrix'); playBloop(400, 0.08); }}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                  chartTab === 'matrix'
                    ? 'bg-[#C5B395]/15 border border-[#C5B395] text-[#C5B395] font-bold'
                    : 'text-[#9E9C96] border border-transparent hover:text-[#ECEAE5]'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                Feature Comparison Matrix
              </button>
            </div>
          </div>

          {chartTab === 'metrics' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Analytical Chart Column */}
              <div className="lg:col-span-8 bg-[#070708] border border-[#1F222B] p-4 h-[320px] relative">
                <div className="absolute top-2 right-4 font-mono text-[8px] text-[#C5B395] opacity-60">
                  LIVE MODELER // ESTIMATED PERFORMANCE
                </div>
                
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={[
                      { name: 'ESSENTIAL', Cost: 1500, 'ROI Index': 3.5 },
                      { name: 'PROFESSIONAL', Cost: 3500, 'ROI Index': 8.0 },
                      { name: 'SIGNATURE', Cost: 6000, 'ROI Index': 14.5 }
                    ]}
                    margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid stroke="#1F222B" strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#4F525E" 
                      fontSize={9} 
                      fontFamily="JetBrains Mono, ui-monospace"
                    />
                    {/* Primary Y Axis for Cost */}
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      stroke="#4F525E" 
                      fontSize={9} 
                      fontFamily="JetBrains Mono, ui-monospace"
                      tickFormatter={(v) => `$${v}`}
                    />
                    {/* Secondary Y Axis for ROI Score */}
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="#C5B395" 
                      fontSize={9} 
                      fontFamily="JetBrains Mono, ui-monospace"
                      tickFormatter={(v) => `${v}x`}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#0A0A0B] border border-[#C5B395] p-3 font-mono text-[9px] text-[#ECEAE5] shadow-2xl">
                              <p className="font-bold border-b border-[#1F222B] pb-1 mb-2 text-[#C5B395]">
                                {payload[0].payload.name} TIER
                              </p>
                              <p className="flex justify-between gap-4">
                                <span>Sprint Cost:</span>
                                <span className="text-[#ECEAE5] font-bold">${payload[0].value}</span>
                              </p>
                              <p className="flex justify-between gap-4 mt-1 text-[#C5B395]">
                                <span>Est. Value Yield:</span>
                                <span className="font-bold">{payload[1]?.value}x ROI</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      iconSize={10}
                      wrapperStyle={{ fontFamily: 'JetBrains Mono, ui-monospace', fontSize: '9px', textTransform: 'uppercase' }}
                    />
                    
                    <Bar 
                      yAxisId="left"
                      dataKey="Cost" 
                      name="Fixed Sprint Cost" 
                      fill="#1F222B" 
                      stroke="#4F525E" 
                      strokeWidth={1}
                      maxBarSize={60}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="ROI Index" 
                      name="Estimated Local ROI Factor" 
                      stroke="#C5B395" 
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#0A0A0B', stroke: '#C5B395', strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Insights / Details Column */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full min-h-[280px]">
                <div className="space-y-4">
                  <h4 className="font-mono text-[10px] font-bold uppercase text-[#C5B395] tracking-[0.1em] flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    How to read these metrics:
                  </h4>
                  
                  <div className="border border-[#1F222B] p-3 bg-[#070708]/50">
                    <span className="font-mono text-[9px] text-[#C5B395] block mb-1">✦ SPRINT INVESTMENT</span>
                    <p className="font-sans text-[11px] text-[#9E9C96] leading-relaxed">
                      We design your site completely from scratch without bloated ongoing platform retainers. You pay once and own 100% of the assets forever.
                    </p>
                  </div>

                  <div className="border border-[#1F222B] p-3 bg-[#070708]/50">
                    <span className="font-mono text-[9px] text-[#ECEAE5] block mb-1">✦ THE ESTIMATED ROI INDEX</span>
                    <p className="font-sans text-[11px] text-[#9E9C96] leading-relaxed">
                      This represents the relative increase in local incoming calls, trust indicators, and average contract values. A higher score translates directly to higher-tier commercial job acquisitions.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1F222B] flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C5B395] animate-ping" />
                  <span className="font-mono text-[8px] text-[#9E9C96] tracking-wider uppercase">
                    ACTIVE SELECTION: <span className="text-[#C5B395] font-bold">{selectedPackage.toUpperCase()} PLAN</span>
                  </span>
                </div>
              </div>

            </div>
          ) : (
            /* Matrix Feature Table Layout */
            <div className="overflow-x-auto border border-[#1F222B]">
              <table className="w-full text-left border-collapse font-mono text-[10px]">
                <thead>
                  <tr className="bg-[#070708] border-b border-[#1F222B]">
                    <th className="p-4 uppercase tracking-wider text-[#9E9C96] text-[9px]">Sovereign Feature Checklist</th>
                    <th className={`p-4 text-center uppercase tracking-wider transition-all ${selectedPackage === 'essential' ? 'bg-[#C5B395]/15 text-[#C5B395] font-bold' : 'text-[#9E9C96]'}`}>
                      Essential
                    </th>
                    <th className={`p-4 text-center uppercase tracking-wider transition-all ${selectedPackage === 'professional' ? 'bg-[#C5B395]/15 text-[#C5B395] font-bold' : 'text-[#9E9C96]'}`}>
                      Professional
                    </th>
                    <th className={`p-4 text-center uppercase tracking-wider transition-all ${selectedPackage === 'signature' ? 'bg-[#C5B395]/15 text-[#C5B395] font-bold' : 'text-[#9E9C96]'}`}>
                      Signature
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F222B]/40">
                  
                  <tr>
                    <td className="p-4 font-bold text-[#ECEAE5] uppercase tracking-wider">Starting Sprint Price</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'essential' ? 'text-[#C5B395] font-extrabold bg-[#C5B395]/5' : 'text-[#9E9C96]'}`}>$1,500</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'professional' ? 'text-[#C5B395] font-extrabold bg-[#C5B395]/5' : 'text-[#9E9C96]'}`}>$3,500</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'signature' ? 'text-[#C5B395] font-extrabold bg-[#C5B395]/5' : 'text-[#9E9C96]'}`}>$6,000</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-[#9E9C96]">Speed Index Delivery</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'essential' ? 'bg-[#C5B395]/5' : ''} text-[#ECEAE5]`}>Ultra Fast (&lt; 3.0s)</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'professional' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}>Sub 2.0s Speed</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'signature' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}>Extreme (&lt; 1.2s)</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-[#9E9C96]">Interactive Sizing Widgets</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'essential' ? 'bg-[#C5B395]/5' : ''} text-red-500/80`}><X className="w-3.5 h-3.5 mx-auto" /></td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'professional' ? 'bg-[#C5B395]/5' : ''} text-[#ECEAE5]`}>1 Included</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'signature' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}>Multiple custom</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-[#9E9C96]">Neighborhood SEO Grids</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'essential' ? 'bg-[#C5B395]/5' : ''} text-red-500/80`}><X className="w-3.5 h-3.5 mx-auto" /></td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'professional' ? 'bg-[#C5B395]/5' : ''} text-[#ECEAE5]`}>Up to 3 areas</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'signature' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}>Unlimited pages</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-[#9E9C96]">SMS Forwarding Dispatcher</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'essential' ? 'bg-[#C5B395]/5' : ''} text-[#ECEAE5]`}>Email only</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'professional' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}>SMS Included</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'signature' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}>SMS + Client Panel</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-[#9E9C96]">Revision Work Rounds</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'essential' ? 'bg-[#C5B395]/5' : ''} text-[#ECEAE5]`}>1 Round</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'professional' ? 'bg-[#C5B395]/5' : ''} text-[#ECEAE5]`}>3 Rounds</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'signature' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}>Unlimited Rounds</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-[#9E9C96]">Customer Support Tier</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'essential' ? 'bg-[#C5B395]/5' : ''} text-[#ECEAE5]`}>Standard</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'professional' ? 'bg-[#C5B395]/5' : ''} text-[#ECEAE5]`}>Priority (Slack)</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'signature' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}>VIP Direct SMS</td>
                  </tr>

                  <tr>
                    <td className="p-4 text-[#9E9C96]">Domain Setup & Hosting Pipe</td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'essential' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}><Check className="w-3.5 h-3.5 mx-auto text-[#C5B395]" /></td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'professional' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}><Check className="w-3.5 h-3.5 mx-auto text-[#C5B395]" /></td>
                    <td className={`p-4 text-center transition-all ${selectedPackage === 'signature' ? 'bg-[#C5B395]/5' : ''} text-[#C5B395] font-bold`}><Check className="w-3.5 h-3.5 mx-auto text-[#C5B395]" /></td>
                  </tr>

                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
