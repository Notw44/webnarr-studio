import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadSim } from '../types';
import { playDialup, playSuccess, playBloop } from '../utils/audio';

export default function LeadSimulator() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Panel upgrade — Van Nuys');
  const [location, setLocation] = useState('Van Nuys');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<'idle' | 'dialing' | 'handshake' | 'printing' | 'done'>('idle');
  const [tickerLead, setTickerLead] = useState<LeadSim>({
    id: 'lead-init',
    name: 'Maria G.',
    phone: '(818) 555-0142',
    service: 'Panel upgrade',
    location: 'Van Nuys',
    timestamp: 'just now',
    status: 'delivered',
  });

  const [leadHistory, setLeadHistory] = useState<LeadSim[]>([
    {
      id: 'lead-init',
      name: 'Maria G.',
      phone: '(818) 555-0142',
      service: 'Panel upgrade',
      location: 'Van Nuys',
      timestamp: '2 mins ago',
      status: 'delivered',
    },
    {
      id: 'lead-prev-1',
      name: 'Bob J.',
      phone: '(213) 555-9871',
      service: 'Sewer Line Scan',
      location: 'Silverlake',
      timestamp: '1 hour ago',
      status: 'delivered',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      return;
    }

    setIsSimulating(true);
    setSimulationStep('dialing');

    playDialup(() => {
      setSimulationStep('printing');
      
      const newLead: LeadSim = {
        id: 'lead-' + Date.now(),
        name,
        phone,
        service,
        location,
        timestamp: 'just now',
        status: 'delivered',
      };

      setTimeout(() => {
        setTickerLead(newLead);
        setLeadHistory((prev) => [newLead, ...prev]);
        setSimulationStep('done');
        setIsSimulating(false);
        playSuccess();
        setName('');
        setPhone('');
      }, 1000);
    });

    setTimeout(() => {
      setSimulationStep('handshake');
    }, 900);
  };

  const loadPreset = (presetName: string, presetService: string, presetLoc: string) => {
    playBloop(400, 0.08);
    setName(presetName);
    setPhone('(818) 555-' + Math.floor(1000 + Math.random() * 9000));
    setService(presetService);
    setLocation(presetLoc);
  };

  return (
    <div id="lead-capture-simulator" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Left Column: Sleek Precision Console Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-7 bg-[#0E0E0F] text-[#ECEAE5] border border-[#1F222B] p-6 md:p-8 relative overflow-hidden select-none shadow-xl"
      >
        {/* Subtle grid lines accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5B395]/20 to-transparent" />
        
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#1F222B]">
          <span className="font-mono text-[9px] text-[#C5B395] font-bold tracking-[0.2em] uppercase">
            [ SIMULATOR CONTROLS // DESK_PIPELINE ]
          </span>
          <div className="bg-[#C5B395]/10 text-[#C5B395] text-[9px] font-mono tracking-[0.2em] px-3 py-1 border border-[#C5B395]/20 rounded-none uppercase">
            SIMULATOR READY
          </div>
        </div>

        <h3 className="font-display text-sm font-semibold text-[#ECEAE5] tracking-wider mb-2.5 uppercase italic">
          Test the Speed Pipeline 📟
        </h3>
        <p className="font-sans text-xs text-[#9E9C96] mb-8 leading-relaxed">
          See how custom forms forward inquiries to your cell in under 3 seconds! Type your details below or select a preset to begin the forwarding simulator.
        </p>

        {/* Quick Presets */}
        <div className="mb-8">
          <p className="text-[9px] font-mono font-bold text-[#9E9C96] mb-3 uppercase tracking-[0.2em]">
            ★ SELECT SIMULATION PRESET:
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => loadPreset('Maria G.', 'Panel upgrade', 'Van Nuys')}
              className="text-[9px] font-mono bg-[#121213] hover:bg-[#C5B395]/10 border border-[#1F222B] hover:border-[#C5B395] text-[#9E9C96] hover:text-[#ECEAE5] px-4 py-2.5 transition-all cursor-pointer rounded-none uppercase tracking-wider"
            >
              Maria G. (Panel Upgrade)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('James T.', 'A/C Blowing Warm', 'Pasadena')}
              className="text-[9px] font-mono bg-[#121213] hover:bg-[#C5B395]/10 border border-[#1F222B] hover:border-[#C5B395] text-[#9E9C96] hover:text-[#ECEAE5] px-4 py-2.5 transition-all cursor-pointer rounded-none uppercase tracking-wider"
            >
              James T. (HVAC Fix)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('Sewer Squad', 'Rooter Drain Flush', 'Silverlake')}
              className="text-[9px] font-mono bg-[#121213] hover:bg-[#C5B395]/10 border border-[#1F222B] hover:border-[#C5B395] text-[#9E9C96] hover:text-[#ECEAE5] px-4 py-2.5 transition-all cursor-pointer rounded-none uppercase tracking-wider"
            >
              Plumbing Flush
            </button>
          </div>
        </div>

        {/* Actual Form */}
        <form onSubmit={handleSubmit} className="space-y-5 font-mono text-[11px] uppercase tracking-wider">
          <div>
            <label className="block text-[9px] font-bold uppercase text-[#9E9C96] mb-2 tracking-[0.2em]">
              Name of customer:
            </label>
            <input
              type="text"
              placeholder="e.g. Maria G."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#070708] text-[#ECEAE5] border border-[#1F222B] focus:border-[#C5B395] p-3 rounded-none focus:outline-none placeholder:text-[#9E9C96]/40 text-xs transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[9px] font-bold uppercase text-[#9E9C96] mb-2 tracking-[0.2em]">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="e.g. (818) 555-0142"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#070708] text-[#ECEAE5] border border-[#1F222B] focus:border-[#C5B395] p-3 rounded-none focus:outline-none placeholder:text-[#9E9C96]/40 text-xs transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase text-[#9E9C96] mb-2 tracking-[0.2em]">
                Service Area / Zip:
              </label>
              <input
                type="text"
                placeholder="e.g. Van Nuys"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#070708] text-[#ECEAE5] border border-[#1F222B] focus:border-[#C5B395] p-3 rounded-none focus:outline-none placeholder:text-[#9E9C96]/40 text-xs transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase text-[#9E9C96] mb-2 tracking-[0.2em]">
              Requested Service:
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-[#070708] text-[#ECEAE5] border border-[#1F222B] focus:border-[#C5B395] p-3 rounded-none focus:outline-none text-xs cursor-pointer transition-colors"
            >
              <option value="Panel upgrade">⚡ Panel Upgrade — Volt Spark</option>
              <option value="EV Charger Install">🔋 EV Charger Station</option>
              <option value="Emergency Drain Snaking">🪠 Hydro-Jetting Tunnel Flush</option>
              <option value="Slab Leak Fix">💧 Burst Pipe Reconstruction</option>
              <option value="Emergency A/C Swap">❄️ Compressor Ice Blast</option>
              <option value="Seasonal Furnace Tuneup">🔥 Flame Burner Audit</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSimulating}
            className={`w-full font-mono text-[10px] font-bold uppercase py-4 tracking-[0.25em] transition-all rounded-none cursor-pointer ${
              isSimulating
                ? 'bg-[#1F222B] text-[#9E9C96] cursor-not-allowed border border-transparent'
                : 'bg-[#ECEAE5] text-[#0A0A0B] hover:bg-[#C5B395] hover:text-[#0A0A0B]'
            }`}
          >
            {isSimulating ? '📠 CYBER-TRANSMITTING...' : '⚡ FIRE SIMULATOR DISPATCH!'}
          </button>
        </form>

        <div className="mt-8 flex justify-between items-center text-[8px] text-[#9E9C96] font-mono uppercase tracking-[0.2em] border-t border-[#1F222B] pt-4">
          <span>✎ MODULE // LEAD_FORWARD_SECURE</span>
          <span>★ 100% EXCLUSIVE CODE EXPORT</span>
        </div>
      </motion.div>

      {/* Right Column: Printed Ticket Visualizer in JetBrains Mono */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-5 flex flex-col justify-between font-mono"
      >
        
        {/* Ticket Container */}
        <div className="bg-[#0E0E0F] border border-[#1F222B] rounded-none p-6 md:p-8 text-[#ECEAE5] h-full flex flex-col justify-between relative overflow-hidden shadow-xl">
          
          <div>
            {/* Lead Header */}
            <div className="flex items-center justify-between border-b border-[#1F222B] pb-4 mb-5">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5B395] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.18em] text-[#C5B395] uppercase">
                  INCOMING FAX TICKET
                </span>
              </span>
              <span className="text-[10px] text-[#9E9C96] font-bold tracking-[0.15em]">
                PORT 3000 // SMS_LOG
              </span>
            </div>

            {/* Simulating Screens */}
            <AnimatePresence mode="wait">
              {isSimulating ? (
                <motion.div
                  key="sim-loader"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-5 py-10 text-center text-xs tracking-wider"
                >
                  <div className="text-3xl animate-bounce">📠</div>
                  <p className="text-[#C5B395] font-bold uppercase tracking-[0.2em] animate-pulse text-xs">
                    {simulationStep === 'dialing' ? 'Dialing WebNar Core Node...' : 'Parsing Customer Request...'}
                  </p>
                  
                  {/* Premium Tech Loading Bar */}
                  <div className="w-56 h-2 bg-[#070708] border border-[#1F222B] rounded-none mx-auto overflow-hidden relative">
                    <motion.div
                      className="h-full bg-[#C5B395] rounded-none"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                  </div>
                  
                  <div className="text-[#9E9C96] space-y-1.5 text-[9px] tracking-[0.2em] uppercase">
                    <p>&gt; CONNECT 14400 // DISPATCH</p>
                    <p>&gt; ENCRYPTING SMS PAYLOAD</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ticket-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 text-xs"
                >
                  {/* Badge */}
                  <div className="flex justify-between items-center bg-[#070708] p-3 border border-[#1F222B] rounded-none">
                    <span className="text-[#C5B395] font-bold text-[9px] tracking-[0.2em] uppercase">★ LEAD INBOX FEED</span>
                    <span className="text-[9px] text-[#C5B395] animate-pulse font-bold tracking-[0.2em] uppercase">
                      ● READY
                    </span>
                  </div>

                  {/* Fields Grid */}
                  <div className="space-y-3.5 bg-[#070708]/60 p-5 border border-[#1F222B] relative rounded-none">
                    
                    {/* Laser stamp */}
                    <div className="absolute top-3 right-3 border border-[#C5B395] text-[#C5B395] text-[9px] font-bold px-2.5 py-1 rounded-none rotate-6 uppercase select-none tracking-widest">
                      {tickerLead.status === 'delivered' ? 'DELIVERED ✔' : 'PENDING'}
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#1F222B]/60 pb-2">
                      <span className="text-[#9E9C96] font-bold uppercase text-[9px] tracking-wider">CLIENT</span>
                      <span className="col-span-3 text-[#ECEAE5] font-bold text-xs">{tickerLead.name}</span>
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#1F222B]/60 pb-2">
                      <span className="text-[#9E9C96] font-bold uppercase text-[9px] tracking-wider">PHONE</span>
                      <span className="col-span-3 text-[#C5B395] font-bold text-xs">{tickerLead.phone}</span>
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#1F222B]/60 pb-2">
                      <span className="text-[#9E9C96] font-bold uppercase text-[9px] tracking-wider">SERVICE</span>
                      <span className="col-span-3 text-[#ECEAE5] font-bold text-xs">{tickerLead.service}</span>
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#1F222B]/60 pb-2">
                      <span className="text-[#9E9C96] font-bold uppercase text-[9px] tracking-wider">AREA</span>
                      <span className="col-span-3 text-[#C5B395] font-bold text-xs">{tickerLead.location}</span>
                    </div>

                    <div className="grid grid-cols-4">
                      <span className="text-[#9E9C96] font-bold uppercase text-[9px] tracking-wider">ROUTING</span>
                      <span className="col-span-3 text-[#C5B395] font-bold text-[9px] uppercase tracking-[0.15em]">
                        DISPATCH_SMS_OK (2.4s)
                      </span>
                    </div>
                  </div>

                  <p className="text-[8px] text-center text-[#9E9C96] uppercase tracking-[0.2em] leading-normal">
                    BAKED DIRECTLY INTO CORE DESIGN FRAMEWORK.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lead History Ticker */}
          <div className="mt-5 border-t border-[#1F222B] pt-5">
            <span className="text-[9px] text-[#9E9C96] font-bold uppercase block mb-3 tracking-[0.2em]">
              📋 LIVE SIMULATION RECIPIENTS:
            </span>
            <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
              {leadHistory.map((lead) => (
                <div key={lead.id} className="bg-[#070708] p-2.5 flex items-center justify-between text-[11px] border border-[#1F222B]/40 rounded-none">
                  <div className="truncate pr-2 uppercase tracking-wider text-[10px]">
                    <span className="text-[#C5B395]">✔</span>{' '}
                    <span className="text-[#ECEAE5] font-bold">{lead.name}</span>{' '}
                    <span className="text-[#9E9C96]">({lead.service})</span>
                  </div>
                  <span className="text-[#9E9C96] text-[9px]">{lead.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
