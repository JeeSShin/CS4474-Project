import { useState, useContext } from "react";
import { SoundContext } from "../App";
import { sfxClick } from "../sound";

// Reusable button with cave-themed styling, click sound, and press animation
export function Btn({ children, onClick, style: extra = {}, big }) {
  const soundOn = useContext(SoundContext);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={(e) => {
        sfxClick(soundOn);
        onClick?.(e);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        padding: big ? "16px 52px" : "12px 28px",
        border: `2px solid #6B5A4C`,
        borderRadius: "8px",
        background: `linear-gradient(135deg, #3a3228 0%, #2a1f18 100%)`,
        color: "#E8D4C0", 
        fontWeight: 700, 
        fontSize: big ? 18 : 14,
        letterSpacing: 2, 
        textTransform: "uppercase",
        // Hover and active states
        transition: "all 0.2s",
        transform: pressed ? "scale(0.96) translateY(2px)" : "scale(1) translateY(0)",
        boxShadow: `inset 0 0 12px rgba(255,200,100,0.3), 0 4px 12px rgba(0,0,0,0.4), 0 0 20px rgba(255,200,100,0.2)`,
        textShadow: `0 2px 4px rgba(0,0,0,0.5)`,
        cursor: "pointer",
        position: "relative",
        ...extra,
      }}
    >
      {children}
    </button>
  );
}
