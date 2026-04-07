// Difficulty presets: operators, number ranges, and door count per level
export const DIFF = {
  beginner: { label: "Beginner", emoji: "B", ops: ["+", "-"], low: 1, high: 20, doors: 3, desc: "Addition & Subtraction" },
  advanced: { label: "Advanced", emoji: "A", ops: ["+", "-", "×", "÷"], low: 2, high: 50, doors: 3, desc: "All four operations" },
};

// Game stages with progression metadata
export const STAGES = [
  { id: 1, name: "ENTRANCE", rounds: 5, color: "#FFD700", tagline: "Welcome to the Cave of Numbers" },
  { id: 2, name: "ENTRANCE", rounds: 5, color: "#FF9500", tagline: "Sharpen your skills and venture deeper" },
  { id: 3, name: "ENTRANCE", rounds: 5, color: "#E85D3F", tagline: "Face tougher challenges in the heart of the cave" },
];

// Neon color palette for UI accents
export const NEON = ["#FFD700", "#FF9500", "#E85D3F", "#E8A84B"];

// Font families
export const FONT = "'Rajdhani', sans-serif";
export const MONO = "'JetBrains Mono', monospace";
export const DISPLAY = "'Teko', sans-serif";
