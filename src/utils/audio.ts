let audioCtx: AudioContext | null = null;
let isMutedSetting = true;

export function setMute(muted: boolean) {
  isMutedSetting = muted;
}

export function getMute() {
  return true;
}

// Play a short retro click/bloop sound
export function playBloop(freq = 150, duration = 0.08) {
  // Silent no-op
}

// Play a bouncy retro cartoon jump/wobble sound
export function playWobble() {
  // Silent no-op
}

// Play a dial-up / printer synthesis for lead submission (silent transition only)
export function playDialup(onComplete?: () => void) {
  if (onComplete) {
    // Invoke completion callback after a short delay so the visual loading state still plays out nicely
    setTimeout(onComplete, 1200);
  }
}

// Success level complete arcade sound
export function playSuccess() {
  // Silent no-op
}

