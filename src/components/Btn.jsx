import { useState, useContext } from "react";
import { SoundContext } from "../App";
import { sfxClick } from "../sound";

export function Btn({ children, onClick, color = "#00F5D4", style: extra = {}, big }) {
  const soundOn = useContext(SoundContext);
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button onClick={(e) => { sfxClick(soundOn); onClick?.(e); }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      style={{
        padding: big ? "16px 52px" : "12px 28px",
        border: "none",
        borderTop: big ? `2px solid ${color}40` : "2px solid transparent",
        borderRadius: 4,
        background: hov ? `${color}15` : `${color}08`,
        color, fontWeight: 700, fontSize: big ? 18 : 14,
        letterSpacing: 2, textTransform: "uppercase",
        transition: "all 0.2s",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        boxShadow: hov
          ? `inset 0 -3px 0 0 ${color}, 0 4px 16px ${color}25`
          : `inset 0 -3px 0 0 ${color}`,
        ...extra,
      }}
    >{children}</button>
  );
}
