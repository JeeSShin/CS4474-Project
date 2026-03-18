let _ctx = null;
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
export function sfxWrong(on)   { if (!on) return; beep(180, 0.35, "sawtooth"); }
export function sfxTick(on)    { if (!on) return; beep(1000, 0.03, "square", 0.04); }
export function sfxTimeout(on) { if (!on) return; beep(140, 0.5, "sawtooth", 0.12); }
