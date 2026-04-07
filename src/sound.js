// Web Audio API context for synthesized sounds
let audioAPI = null;
// Cache for preloaded audio file elements
let audioSaved = {};

// Plays an audio file with caching for repeated playback
function playAudioFile(filename) {
    if (!audioSaved[filename]) {
      const audio = new Audio(`/${filename}`);
      audio.preload = "auto";
      audioSaved[filename] = audio;
    }
    
    const audio = audioSaved[filename];
    // Reset to start
    audio.currentTime = 0; 
    audio.volume = 0.7;
    audio.play().catch(e => console.warn(`Audio playback failed: ${e.message}`));

}

// Generates a synthesized tone using Web Audio API oscillator
function beep(freq, dur, type = "sine", vol = 0.09) {
    if (!audioAPI) audioAPI = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioAPI.createOscillator(), g = audioAPI.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, audioAPI.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioAPI.currentTime + dur);
    o.connect(g); g.connect(audioAPI.destination); o.start(); o.stop(audioAPI.currentTime + dur);
}

// Sound effect functions - each takes an 'on' flag to enable/disable audio
export function sfxCorrect(on) { 
  if (!on) return; beep(520, 0.1); 
  setTimeout(() => beep(660, 0.1), 80); 
  setTimeout(() => beep(880, 0.15), 160); 
}
// Door unlock sound effect
export function sfxDoorUnlock(on) { 
  if (!on) return;
  playAudioFile("door-unlock.m4a");
}
// Footstep sound effect with caching for repeated playback
export function sfxFootstep(on) {
  if (!on) return;
  playAudioFile("footstep.m4a");
}
// Wrong answer sound effect
export function sfxWrong(on){ 
  if (!on) 
    return; 
  beep(180, 0.35, "sawtooth"); 
}
// Button click sound effect
export function sfxClick(on) { 
  if (!on)
    return; 
  beep(800, 0.04, "sine", 0.05); 
}
export function sfxNav(on) { 
  if (!on) 
    return; 
  beep(600, 0.06, "sine", 0.04); 
  setTimeout(() => beep(900, 0.06, "sine", 0.04), 40); 
}
