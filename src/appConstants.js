export const DIFF = {
  beginner: { label: "Beginner", emoji: "B", ops: ["+", "-"], lo: 1, hi: 20, time: 16, timeShrink: 1, doors: 3, desc: "Addition & Subtraction" },
  advanced: { label: "Advanced", emoji: "A", ops: ["+", "-", "×", "÷"], lo: 2, hi: 50, time: 13, timeShrink: 1, doors: 3, desc: "All four operations" },
};

export const STAGES = [
  { id: 1, name: "ENTRANCE", rounds: 5, color: "#FFD700", tagline: "Warm up your neurons" },
  { id: 2, name: "STAGE 2", rounds: 5, color: "#FF9500", tagline: "Numbers grow, time holds" },
  { id: 3, name: "STAGE 3", rounds: 5, color: "#E85D3F", tagline: "Think fast or fall" },
];

export const NEON = ["#FFD700", "#FF9500", "#E85D3F", "#E8A84B"];

export const FONT = "'Rajdhani', sans-serif";
export const MONO = "'JetBrains Mono', monospace";
export const DISPLAY = "'Teko', sans-serif";
