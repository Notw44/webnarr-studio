import React, { useState } from 'react';
import { motion } from 'motion/react';
import { setMute, getMute, playBloop } from '../utils/audio';

export default function SoundToggle() {
  const [muted, setMuted] = useState(getMute());

  const handleToggle = () => {
    const nextMute = !muted;
    setMute(nextMute);
    setMuted(nextMute);
    if (!nextMute) {
      setTimeout(() => {
        playBloop(580, 0.12);
      }, 50);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-sm border font-mono text-[10px] font-bold tracking-widest flex items-center gap-2 select-none cursor-pointer backdrop-blur-md transition-all ${
        muted
          ? 'bg-[#101828]/90 text-steel-gray border-red-900/40 hover:border-red-800'
          : 'bg-[#101828]/90 text-[#C9A24B] border-[#C9A24B]/40 hover:border-[#C9A24B] shadow-[0_4px_15px_rgba(0,0,0,0.4)]'
      }`}
      title={muted ? 'Enable Audio Feedback' : 'Mute Audio Feedback'}
    >
      <span>{muted ? '🔇' : '🔊'}</span>
      <span className="hidden sm:inline-block">
        {muted ? 'AUDIO: MUTED' : 'AUDIO: ENGAGED'}
      </span>
    </motion.button>
  );
}
