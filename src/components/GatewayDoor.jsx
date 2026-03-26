import { useState } from "react";
import { MONO } from "../constants";
import { convertNumber } from "../numerals";
import { Burst } from "./Burst";

export function GatewayDoor({ value, color, idx, onClick, state, disabled, numeral, eliminated, doorCount = 3 }) {
  const isCorrect = state === "correct";
  const isWrong = state === "wrong";
  const [hov, setHov] = useState(false);

  const label = convertNumber(value, numeral);
  const fontSize = label.length <= 3 ? 52 : label.length <= 5 ? 40 : label.length <= 7 ? 30 : 22;

  // Responsive width: shrink on small screens to fit all doors
  const doorWidth = `min(130px, calc((100vw - 80px) / ${doorCount}))`;

  const panelGrad = `linear-gradient(180deg, ${color}18 0%, ${color}0C 40%, rgba(0,0,0,0.35) 100%)`;

  const rivet = (left, top) => (
    <div key={`${left}-${top}`} style={{
      position: "absolute", left, top,
      width: 5, height: 5, borderRadius: "50%",
      border: `1px solid ${color}35`,
      background: `${color}10`,
      pointerEvents: "none",
    }} />
  );

  return (
    <button
      onClick={() => !disabled && !eliminated && onClick(idx)}
      disabled={disabled || eliminated}
      aria-label={`Door ${idx + 1}, answer ${value}`}
      aria-disabled={disabled || eliminated}
      onMouseEnter={() => !disabled && !eliminated && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        width: doorWidth,
        maxWidth: 130,
        height: 210,
        border: `2px solid ${isCorrect ? "#00FF88" : isWrong ? "var(--neon-red)" : eliminated ? "var(--text-dim)" : hov ? `${color}70` : `${color}25`}`,
        borderRadius: "50px 50px 4px 4px",
        background: eliminated ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        animation: isWrong
          ? "doorShakeHard 0.55s ease-in-out, wrongPulseGlow 0.6s ease-out"
          : "none",
        transform: hov && !disabled && !isCorrect && !isWrong && !eliminated ? "translateY(-6px) scale(1.03)" : "scale(1)",
        transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.3s",
        boxShadow: isCorrect
          ? `0 0 50px #00FF8855, inset 0 0 30px #00FF8820`
          : isWrong
            ? undefined
            : hov
              ? `0 0 30px ${color}35, 0 8px 32px rgba(0,0,0,0.4), inset 0 0 20px ${color}10`
              : `0 0 15px ${color}10, 0 4px 20px rgba(0,0,0,0.3), inset 0 -8px 20px rgba(0,0,0,0.4)`,
        opacity: eliminated ? 0.35 : disabled && !isCorrect && !isWrong ? 0.6 : 1,
      }}
    >
      {/* Behind-door reveal layer */}
      {isCorrect && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, #00FF8840 0%, #00FF8818 45%, transparent 70%)`,
          animation: "revealGlow 0.65s ease-out forwards",
          zIndex: 5,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none"
            style={{ overflow: "visible", marginBottom: 4 }}>
            <polyline
              points="10,27 22,39 42,15"
              stroke="#00FF88"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: 40,
                animation: "checkmarkDraw 0.45s 0.2s ease-out both forwards",
              }}
            />
          </svg>
          <span style={{
            fontFamily: MONO, fontSize: 9, letterSpacing: 3,
            color: "#00FF88",
            textShadow: "0 0 12px #00FF8880",
            animation: "revealGlow 0.5s 0.3s ease-out both",
          }}>ACCESS</span>
        </div>
      )}

      {/* Left door panel */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
        background: panelGrad,
        transformOrigin: "left center",
        animation: isCorrect ? "doorPanelOpenLeft 0.6s 0.05s ease-in forwards" : "none",
        willChange: isCorrect ? "transform" : "auto",
        zIndex: 2,
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: 5, bottom: 5, left: 5, right: 0,
          borderTop: `1px solid ${color}12`,
          borderLeft: `1px solid ${color}12`,
          borderRadius: "46px 0 0 2px",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "28%", left: "24%", right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color}18)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "72%", left: "24%", right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${color}18)`,
          pointerEvents: "none",
        }} />
        {rivet(18, 68)}
        {rivet(18, 175)}
      </div>

      {/* Right door panel */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
        background: panelGrad,
        transformOrigin: "right center",
        animation: isCorrect ? "doorPanelOpenRight 0.6s 0.05s ease-in forwards" : "none",
        willChange: isCorrect ? "transform" : "auto",
        zIndex: 2,
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: 5, bottom: 5, left: 0, right: 5,
          borderTop: `1px solid ${color}12`,
          borderRight: `1px solid ${color}12`,
          borderRadius: "0 46px 2px 0",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "28%", left: 0, right: "24%",
          height: 1,
          background: `linear-gradient(90deg, ${color}18, transparent)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "72%", left: 0, right: "24%",
          height: 1,
          background: `linear-gradient(90deg, ${color}18, transparent)`,
          pointerEvents: "none",
        }} />
        {rivet(42, 68)}
        {rivet(42, 175)}
        <div style={{
          position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)",
          width: 4, height: 22, borderRadius: 2,
          background: `${color}25`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 6px ${color}15`,
          pointerEvents: "none",
        }} />
      </div>

      {/* Center split line */}
      <div style={{
        position: "absolute", top: "18%", bottom: "18%", left: "50%",
        width: 1,
        background: `linear-gradient(180deg, transparent, ${color}18, ${color}18, transparent)`,
        zIndex: 3,
        pointerEvents: "none",
      }} />

      {/* Scanline */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: `${color}10`,
        animation: "scanline 3s linear infinite",
        zIndex: 3,
        pointerEvents: "none",
      }} />

      {/* Wrong: red flash overlay */}
      {isWrong && (
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(254,95,85,0.55), rgba(254,95,85,0.15) 60%, transparent)",
          animation: "wrongFlash 0.55s ease-out forwards",
          zIndex: 4,
          pointerEvents: "none",
        }} />
      )}

      {/* Wrong: red X mark */}
      {isWrong && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          fontSize: 52, fontWeight: 900, fontFamily: MONO, lineHeight: 1,
          color: "var(--neon-red)",
          textShadow: "0 0 24px rgba(254,95,85,0.7), 0 0 48px rgba(254,95,85,0.35)",
          zIndex: 5, pointerEvents: "none",
          animation: "wrongXAppear 0.45s 0.12s ease-out both",
        }}>{"\u2715"}</div>
      )}

      {/* Eliminated overlay */}
      {eliminated && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 6, pointerEvents: "none",
        }}>
          <span style={{
            fontSize: 11, fontFamily: MONO, color: "var(--text-dim)",
            letterSpacing: 2, fontWeight: 700,
          }}>LOCKED</span>
        </div>
      )}

      {/* Burst particles */}
      {isCorrect && <Burst color="#00FF88" />}

      {/* Answer number — hidden when showing result */}
      {!isCorrect && !isWrong && !eliminated && (
        <span style={{
          position: "relative",
          zIndex: 10,
          fontSize,
          fontWeight: 700,
          fontFamily: MONO,
          color: "#fff",
          textShadow: `0 0 20px ${color}AA, 0 0 40px ${color}44, 0 2px 4px rgba(0,0,0,0.5)`,
          letterSpacing: 2,
          lineHeight: 1,
        }}>{label}</span>
      )}

      {/* Keyboard hint badge — larger and more visible */}
      <div style={{
        position: "absolute", top: 8, right: 8,
        width: 24, height: 24, borderRadius: 4,
        border: `1px solid ${color}50`,
        background: "rgba(0,0,0,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontFamily: MONO, color: `${color}`,
        fontWeight: 700,
        zIndex: 10,
      }}>{idx + 1}</div>
    </button>
  );
}
