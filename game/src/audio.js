// Sounds, synthesised with WebAudio: no audio files, nothing to download.
// Every call is guarded, so a browser without audio (or a headless one)
// simply stays silent instead of throwing.

let audioCtx = null;

export function unlockAudio() {
  try {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended') void audioCtx.resume();
  } catch (_e) {
    audioCtx = null;
  }
}

function tone(freq, startIn, duration, type, volume) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t = audioCtx.currentTime + startIn;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  } catch (_e) {
    /* silent */
  }
}

// A satisfying two-note chime on every find.
export function playFound() {
  tone(659.25, 0, 0.16, 'sine', 0.22);
  tone(880, 0.09, 0.28, 'sine', 0.22);
}

// A low buzz for a wrong click.
export function playWrong() {
  tone(140, 0, 0.22, 'square', 0.1);
}

// A soft blip when a hint is spent.
export function playHint() {
  tone(1046.5, 0, 0.12, 'triangle', 0.16);
}

// A little arpeggio when a scene is cleared.
export function playWin() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.11, 0.3, 'sine', 0.2));
}
