import { useState } from "react";
import { MONO } from "../constants";
import { Burst } from "./Burst";

export function GatewayDoor({ value, color, idx, onClick, state, disabled }) {
  const isCorrect = state === "correct";
  const isWrong = state === "wrong";
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={() => !disabled && onClick(idx)}
      disabled={disabled}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        width: 120, minHeight: 170, border: `2px solid ${color}55`,
        borderRadius: 14, cursor: disabled ? "default" : "pointer",
        background: isCorrect
          ? `linear-gradient(170deg, ${color}55, ${color}22)`
          : `linear-gradient(170deg, ${color}18, ${color}08)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
        animation: isWrong ? "shake 0.4s ease-in-out" : isCorrect ? "glow 0.5s ease-out" : "none",
        transform: hov && !disabled ? "translateY(-6px) scale(1.04)" : "scale(1)",
        transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
        boxShadow: isCorrect ? `0 0 40px ${color}55, inset 0 0 30px ${color}15`
          : hov ? `0 0 24px ${color}30` : `0 4px 20px rgba(0,0,0,0.3)`,
        borderColor: isCorrect ? color : isWrong ? "var(--neon-red)" : hov ? `${color}99` : `${color}33`,
      }}
    >
      {isCorrect && <Burst color={color} />}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: 2,
        background: color, borderRadius: "0 0 2px 2px", opacity: 0.6,
      }} />
      <span style={{
        fontSize: 11, fontFamily: MONO, letterSpacing: 3, color: `${color}99`, textTransform: "uppercase",
      }}>Gate {idx + 1}</span>
      <span style={{
        fontSize: 34, fontWeight: 700, fontFamily: MONO, color: "#fff",
        textShadow: `0 0 16px ${color}88`,
      }}>{value}</span>
      <div style={{
        position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
        width: 24, height: 3, borderRadius: 2, background: `${color}30`,
      }} />
    </button>
  );
}
