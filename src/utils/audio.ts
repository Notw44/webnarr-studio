let audioCtx: AudioContext | null = null;
let isMutedSetting = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMute(muted: boolean) {
  isMutedSetting = muted;
}

export function getMute() {
  return isMutedSetting;
}

// Play a short retro click/bloop sound
export function playBloop(freq = 150, duration = 0.08) {
  if (isMutedSetting) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    // Bouncy pitch glide
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Audio Context not allowed or supported', e);
  }
}

// Play a bouncy retro cartoon jump/wobble sound
export function playWobble() {
  if (isMutedSetting) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    // Fail silently
  }
}

// Play a dial-up / printer synthesis for lead submission
export function playDialup(onComplete?: () => void) {
  if (isMutedSetting) {
    if (onComplete) setTimeout(onComplete, 1800);
    return;
  }
  try {
    const ctx = getAudioContext();
    let time = ctx.currentTime;

    // Phase 1: High pitch handshake beeps
    const beepFreqs = [700, 1100, 700, 1100, 1400];
    beepFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time + idx * 0.15);
      
      gain.gain.setValueAtTime(0.0, time + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.08, time + idx * 0.15 + 0.02);
      gain.gain.setValueAtTime(0.08, time + idx * 0.15 + 0.12);
      gain.gain.linearRampToValueAtTime(0.0, time + idx * 0.15 + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time + idx * 0.15);
      osc.stop(time + idx * 0.15 + 0.15);
    });

    time += 0.85;

    // Phase 2: Static fuzz / screech (Simulated with random oscillators/noise)
    const screechCount = 4;
    for (let i = 0; i < screechCount; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      
      const startFreq = 200 + Math.random() * 400;
      const endFreq = 100 + Math.random() * 100;
      osc.frequency.setValueAtTime(startFreq, time + i * 0.2);
      osc.frequency.exponentialRampToValueAtTime(endFreq, time + i * 0.2 + 0.18);

      gain.gain.setValueAtTime(0.0, time + i * 0.2);
      gain.gain.linearRampToValueAtTime(0.04, time + i * 0.2 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, time + i * 0.2 + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time + i * 0.2);
      osc.stop(time + i * 0.2 + 0.2);
    }

    time += 0.8;

    // Phase 3: Happy chime at the end
    const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chimeNotes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time + idx * 0.08);

      gain.gain.setValueAtTime(0.12, time + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time + idx * 0.08);
      osc.stop(time + idx * 0.08 + 0.3);
    });

    if (onComplete) {
      setTimeout(onComplete, 2200);
    }
  } catch (e) {
    if (onComplete) onComplete();
  }
}

// Success level complete arcade sound
export function playSuccess() {
  if (isMutedSetting) return;
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // Arpeggio upwards
    const time = ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time + idx * 0.06);

      gain.gain.setValueAtTime(0.1, time + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, time + idx * 0.06 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time + idx * 0.06);
      osc.stop(time + idx * 0.06 + 0.22);
    });
  } catch (e) {
    // Fail silently
  }
}
