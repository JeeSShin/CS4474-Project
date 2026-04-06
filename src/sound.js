// Web Audio API context for synthesized sounds
let _ctx = null;
// Cache for preloaded audio file elements
let _audioCache = {};

// Plays an audio file with caching for repeated playback
function playAudioFile(filename) {
  try {
    if (!_audioCache[filename]) {
      const audio = new Audio(`/${filename}`);
      audio.preload = "auto";
      _audioCache[filename] = audio;
    }
    
    const audio = _audioCache[filename];
    audio.currentTime = 0; // Reset to start
    audio.volume = 0.7;
    audio.play().catch(e => console.warn(`Audio playback failed: ${e.message}`));
  } catch (e) {
    console.warn(`Failed to play audio ${filename}:`, e);
  }
}

// Generates a synthesized tone using Web Audio API oscillator
function beep(freq, dur, type = "sine", vol = 0.09) {
  try {
    if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = _ctx.createOscillator(), g = _ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, _ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, _ctx.currentTime + dur);
    o.connect(g); g.connect(_ctx.destination); o.start(); o.stop(_ctx.currentTime + dur);
  } catch {}
}

// Sound effect functions - each takes an 'on' flag to enable/disable audio
export function sfxCorrect(on) { if (!on) return; beep(520, 0.1); setTimeout(() => beep(660, 0.1), 80); setTimeout(() => beep(880, 0.15), 160); }
export function sfxDoorUnlock(on) { 
  if (!on) return;
  playAudioFile("door-unlock.m4a");
}
export function sfxFootstep(on) {
  if (!on) return;
  playAudioFile("footstep.m4a");
}
export function sfxWrong(on)   { if (!on) return; beep(180, 0.35, "sawtooth"); }
export function sfxClick(on)   { if (!on) return; beep(800, 0.04, "sine", 0.05); }
export function sfxNav(on)     { if (!on) return; beep(600, 0.06, "sine", 0.04); setTimeout(() => beep(900, 0.06, "sine", 0.04), 40); }
