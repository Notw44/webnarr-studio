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
      <div className="lg:col-span-7 bg-[#101828] text-white border border-[#232C42] rounded-sm p-6 md:p-8 relative overflow-hidden select-none shadow-xl">
        {/* Subtle grid lines accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B]/20 to-transparent" />
        
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#232C42]">
          <span className="font-mono text-[9px] text-[#C9A24B] font-bold tracking-widest uppercase">
            [ SIMULATOR CONTROLS // DESK_PIPELINE ]
          </span>
          <div className="bg-[#C9A24B]/10 text-[#C9A24B] text-[8px] font-mono tracking-widest px-2 py-0.5 border border-[#C9A24B]/20 uppercase">
            SIMULATOR READY
          </div>
        </div>

        <h3 className="font-display text-sm font-bold text-white tracking-wider mb-2 uppercase">
          Test the Speed Pipeline 📟
        </h3>
        <p className="font-sans text-sm text-steel-gray mb-6 leading-relaxed">
          See how custom forms forward inquiries to your cell in under 3 seconds! Type your details below or select a preset to begin the forwarding simulator.
        </p>

        {/* Quick Presets */}
        <div className="mb-6">
          <p className="text-[9px] font-mono font-bold text-steel-gray mb-2.5 uppercase tracking-widest">
            ★ SELECT SIMULATION PRESET:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadPreset('Maria G.', 'Panel upgrade', 'Van Nuys')}
              className="text-[10px] font-mono bg-[#161F30] hover:bg-[#C9A24B]/10 border border-[#232C42] hover:border-[#C9A24B] text-gray-300 hover:text-white px-3 py-1.5 transition-all cursor-pointer"
            >
              Maria G. (Panel Upgrade)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('James T.', 'A/C Blowing Warm', 'Pasadena')}
              className="text-[10px] font-mono bg-[#161F30] hover:bg-[#C9A24B]/10 border border-[#232C42] hover:border-[#C9A24B] text-gray-300 hover:text-white px-3 py-1.5 transition-all cursor-pointer"
            >
              James T. (HVAC Fix)
            </button>
            <button
              type="button"
              onClick={() => loadPreset('Sewer Squad', 'Rooter Drain Flush', 'Silverlake')}
              className="text-[10px] font-mono bg-[#161F30] hover:bg-[#C9A24B]/10 border border-[#232C42] hover:border-[#C9A24B] text-gray-300 hover:text-white px-3 py-1.5 transition-all cursor-pointer"
            >
              Plumbing Flush
            </button>
          </div>
        </div>

        {/* Actual Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[9px] font-bold uppercase text-steel-gray mb-1.5 tracking-widest">
              Name of customer:
            </label>
            <input
              type="text"
              placeholder="e.g. Maria G."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0A0D15] text-white border border-[#232C42] focus:border-[#C9A24B] p-2.5 rounded-none focus:outline-none placeholder:text-gray-600 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-bold uppercase text-steel-gray mb-1.5 tracking-widest">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="e.g. (818) 555-0142"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0A0D15] text-white border border-[#232C42] focus:border-[#C9A24B] p-2.5 rounded-none focus:outline-none placeholder:text-gray-600 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase text-steel-gray mb-1.5 tracking-widest">
                Service Area / Zip:
              </label>
              <input
                type="text"
                placeholder="e.g. Van Nuys"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#0A0D15] text-white border border-[#232C42] focus:border-[#C9A24B] p-2.5 rounded-none focus:outline-none placeholder:text-gray-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase text-steel-gray mb-1.5 tracking-widest">
              Requested Service:
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full bg-[#0A0D15] text-white border border-[#232C42] focus:border-[#C9A24B] p-2.5 rounded-none focus:outline-none cursor-pointer transition-colors"
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
            className={`w-full font-display text-xs font-bold uppercase py-3.5 tracking-widest transition-all ${
              isSimulating
                ? 'bg-[#232C42] text-steel-gray cursor-not-allowed border border-transparent'
                : 'bg-[#C9A24B] hover:bg-white text-[#0A0F1E] font-extrabold border border-[#C9A24B] cursor-pointer active:scale-[0.99]'
            }`}
          >
            {isSimulating ? '📠 CYBER-TRANSMITTING...' : '⚡ FIRE SIMULATOR DISPATCH!'}
          </button>
        </form>

        <div className="mt-6 flex justify-between items-center text-[9px] text-steel-gray font-mono uppercase tracking-widest">
          <span>✎ MODULE // LEAD_FORWARD_SECURE</span>
          <span>★ 100% EXCLUSIVE CODE EXPORT</span>
        </div>
      </div>

      {/* Right Column: Printed Ticket Visualizer in JetBrains Mono */}
      <div className="lg:col-span-5 flex flex-col justify-between font-mono">
        
        {/* Ticket Container */}
        <div className="bg-[#101828] border border-[#232C42] rounded-sm p-5 md:p-6 text-[#E8E4D8] h-full flex flex-col justify-between relative overflow-hidden shadow-xl">
          
          <div>
            {/* Lead Header */}
            <div className="flex items-center justify-between border-b border-[#232C42] pb-3 mb-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-[#C9A24B] uppercase">
                  INCOMING FAX TICKET
                </span>
              </span>
              <span className="text-[9px] text-steel-gray font-bold">
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
                  className="space-y-4 py-8 text-center text-xs"
                >
                  <div className="text-2xl animate-bounce">📠</div>
                  <p className="text-[#C9A24B] font-bold uppercase tracking-wider animate-pulse">
                    {simulationStep === 'dialing' ? 'Dialing WebNar Core Node...' : 'Parsing Customer Request...'}
                  </p>
                  
                  {/* Premium Tech Loading Bar */}
                  <div className="w-44 h-2 bg-[#0A0D15] border border-[#232C42] rounded-none mx-auto overflow-hidden relative">
                    <motion.div
                      className="h-full bg-[#C9A24B]"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.8, ease: 'easeInOut' }}
                    />
                  </div>
                  
                  <div className="text-steel-gray space-y-1 text-[9px] tracking-widest uppercase">
                    <p>&gt; CONNECT 14400 // DISPATCH</p>
                    <p>&gt; ENCRYPTING SMS PAYLOAD</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ticket-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3 text-xs"
                >
                  {/* Badge */}
                  <div className="flex justify-between items-center bg-[#0A0D15] p-2 border border-[#232C42]">
                    <span className="text-[#C9A24B] font-bold text-[9px] tracking-widest uppercase">★ LEAD INBOX FEED</span>
                    <span className="text-[9px] text-[#C9A24B] animate-pulse font-bold tracking-widest uppercase">
                      ● READY
                    </span>
                  </div>

                  {/* Fields Grid */}
                  <div className="space-y-2.5 bg-[#0A0D15]/60 p-4 border border-[#232C42] relative">
                    
                    {/* Laser stamp */}
                    <div className="absolute top-2 right-2 border border-[#C9A24B] text-[#C9A24B] text-[8px] font-bold px-2 py-0.5 rounded-none rotate-6 uppercase select-none">
                      {tickerLead.status === 'delivered' ? 'DELIVERED ✔' : 'PENDING'}
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#232C42]/60 pb-1.5">
                      <span className="text-steel-gray font-bold uppercase text-[9px] tracking-wider">CLIENT</span>
                      <span className="col-span-3 text-[#E8E4D8] font-bold text-[10px]">{tickerLead.name}</span>
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#232C42]/60 pb-1.5">
                      <span className="text-steel-gray font-bold uppercase text-[9px] tracking-wider">PHONE</span>
                      <span className="col-span-3 text-[#C9A24B] font-bold text-[10px]">{tickerLead.phone}</span>
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#232C42]/60 pb-1.5">
                      <span className="text-steel-gray font-bold uppercase text-[9px] tracking-wider">SERVICE</span>
                      <span className="col-span-3 text-[#E8E4D8] font-bold text-[10px]">{tickerLead.service}</span>
                    </div>

                    <div className="grid grid-cols-4 border-b border-[#232C42]/60 pb-1.5">
                      <span className="text-steel-gray font-bold uppercase text-[9px] tracking-wider">AREA</span>
                      <span className="col-span-3 text-[#C9A24B] font-bold text-[10px]">{tickerLead.location}</span>
                    </div>

                    <div className="grid grid-cols-4">
                      <span className="text-steel-gray font-bold uppercase text-[9px] tracking-wider">ROUTING</span>
                      <span className="col-span-3 text-[#C9A24B] font-bold text-[9px] uppercase tracking-wider">
                        DISPATCH_SMS_OK (2.4s)
                      </span>
                    </div>
                  </div>

                  <p className="text-[9px] text-center text-steel-gray uppercase tracking-widest">
                    BAKED DIRECTLY INTO CORE DESIGN FRAMEWORK.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Lead History Ticker */}
          <div className="mt-4 border-t border-[#232C42] pt-4">
            <span className="text-[9px] text-steel-gray font-bold uppercase block mb-2 tracking-widest">
              📋 LIVE SIMULATION RECIPIENTS:
            </span>
            <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
              {leadHistory.map((lead) => (
                <div key={lead.id} className="bg-[#0A0D15] p-2 flex items-center justify-between text-[9px] border border-[#232C42]/40">
                  <div className="truncate pr-2 uppercase tracking-wider text-[8px]">
                    <span className="text-[#C9A24B]">✔</span>{' '}
                    <span className="text-white font-bold">{lead.name}</span>{' '}
                    <span className="text-steel-gray">({lead.service})</span>
                  </div>
                  <span className="text-steel-gray text-[8px]">{lead.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
