let _ctx = null;
let _audioCache = {};

function playAudioFile(filename) {
  try {
    // Use HTML5 Audio element for simpler, more reliable playback
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
export function sfxTick(on)    { if (!on) return; beep(1000, 0.03, "square", 0.04); }
export function sfxTimeout(on) { if (!on) return; beep(140, 0.5, "sawtooth", 0.12); }
export function sfxClick(on)   { if (!on) return; beep(800, 0.04, "sine", 0.05); }
export function sfxNav(on)     { if (!on) return; beep(600, 0.06, "sine", 0.04); setTimeout(() => beep(900, 0.06, "sine", 0.04), 40); }
export function sfxToggle(on, state) { if (!on) return; beep(state ? 700 : 500, 0.06, "sine", 0.05); }
