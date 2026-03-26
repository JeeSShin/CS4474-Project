export const DIFF = {
  beginner:  { label: "Beginner",  emoji: "🟢", ops: ["+","-"],           lo: 1,  hi: 20,  time: 16, timeShrink: 1,    doors: 3, desc: "Addition & Subtraction" },
  advanced:  { label: "Advanced",  emoji: "🟡", ops: ["+","-","×","÷"],   lo: 2,  hi: 50,  time: 13, timeShrink: 1,    doors: 3, desc: "All four operations" },
  expert:    { label: "Expert",    emoji: "🟠", ops: ["+","-","×","÷"],   lo: 2,  hi: 99,  time: 11, timeShrink: 0.82, doors: 4, desc: "Mixed ops & PEMDAS" },
  extreme:   { label: "Extreme",   emoji: "🔴", ops: ["×","÷","+","-"],   lo: 3,  hi: 120, time: 7,  timeShrink: 0.6,  doors: 4, desc: "Speed kills" },
};

export const STAGES = [
  { id: 1, name: "ENTRANCE",  rounds: 5,  color: "#00F5D4", tagline: "Warm up your neurons" },
  { id: 2, name: "CORRIDOR",  rounds: 7,  color: "#7B61FF", tagline: "Numbers grow, time holds" },
  { id: 3, name: "VAULT",     rounds: 10, color: "#FE5F55", tagline: "Think fast or fall" },
];

export const NEON = ["#00F5D4","#7B61FF","#FE5F55","#FFD166"];

export const FONT = "'Rajdhani', sans-serif";
export const MONO = "'JetBrains Mono', monospace";
export const DISPLAY = "'Teko', sans-serif";
