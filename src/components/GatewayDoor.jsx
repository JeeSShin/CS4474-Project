import { useState } from "react";
import { MONO } from "../constants";
import { convertNumber } from "../numerals";

export function GatewayDoor({ value, color, idx, onClick, state, disabled, numeral, eliminated, doorCount = 3 }) {
  const isCorrect = state === "correct";
  const isWrong = state === "wrong";
  const [hov, setHov] = useState(false);

  const label = convertNumber(value, numeral);
  const fontSize = label.length <= 3 ? 52 : label.length <= 5 ? 40 : label.length <= 7 ? 30 : 22;

  // Responsive width: shrink on small screens to fit all doors
  const doorWidth = `min(130px, calc((100vw - 80px) / ${doorCount}))`;

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
        border: `2px solid ${isCorrect ? "#4CAF50" : isWrong ? "#F44336" : eliminated ? "#9E9E9E" : hov ? "#8B4513" : "#5C3A21"}`,
        borderRadius: "18px",
        background: eliminated ? "#E0DED8" : "linear-gradient(180deg, #6B4A2A 0%, #5B3F24 25%, #4C3620 44%, #5B4432 72%, #533920 100%)",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        animation: isWrong
          ? "doorShakeHard 0.55s ease-in-out, wrongPulseGlow 0.6s ease-out"
          : "none",
        transform: hov && !disabled && !isCorrect && !isWrong && !eliminated ? "translateY(-4px)" : "scale(1)",
        transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.3s",
        boxShadow: isCorrect
          ? `0 4px 24px rgba(76,175,80,0.25)`
          : isWrong
            ? `0 4px 24px rgba(244,67,54,0.25)`
            : hov
              ? `0 10px 30px rgba(0,0,0,0.18)`
              : `0 4px 16px rgba(0,0,0,0.15)`,
        opacity: eliminated ? 0.5 : disabled && !isCorrect && !isWrong ? 0.7 : 1,
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1), transparent 18%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.08), transparent 14%)",
        opacity: 0.75,
        pointerEvents: "none",
        zIndex: 1,
      }} />
      {[16, 48, 80].map((left) => (
        <div key={left} style={{
          position: "absolute",
          top: 0,
          left: `${left}%`,
          width: 3,
          height: "100%",
          background: "rgba(0,0,0,0.2)",
          boxShadow: "inset 0 0 4px rgba(0,0,0,0.4)",
          zIndex: 2,
          pointerEvents: "none",
        }} />
      ))}
      {['34%', '68%'].map((top, idxBar) => (
        <div key={top} style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          top,
          height: 10,
          borderRadius: 999,
          background: "#2B2B2B",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4), inset 0 0 8px rgba(255,255,255,0.08)",
          zIndex: 3,
          pointerEvents: "none",
        }} />
      ))}
      {[20, 44, 68].map((left, index) => (
        <div key={`stud-${index}`} style={{
          position: "absolute",
          left: `calc(8% + ${left}% )`,
          top: "34%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#B2A38C",
          border: "1px solid rgba(40,40,40,0.6)",
          boxShadow: "inset 0 0 2px rgba(255,255,255,0.4)",
          zIndex: 4,
          pointerEvents: "none",
        }} />
      ))}
      {[20, 44, 68].map((left, index) => (
        <div key={`stud2-${index}`} style={{
          position: "absolute",
          left: `calc(8% + ${left}% )`,
          top: "68%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#B2A38C",
          border: "1px solid rgba(40,40,40,0.6)",
          boxShadow: "inset 0 0 2px rgba(255,255,255,0.4)",
          zIndex: 4,
          pointerEvents: "none",
        }} />
      ))}
      <div style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 12,
        height: 28,
        transform: "translate(-50%, -50%)",
        background: "#31281E",
        borderRadius: "4px",
        boxShadow: "inset 0 0 0 2px #4C4034, 0 2px 6px rgba(0,0,0,0.25)",
        zIndex: 4,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        left: "47%",
        top: "50%",
        width: 4,
        height: 10,
        transform: "translate(-50%, -50%)",
        background: "#A58B73",
        borderRadius: "2px",
        zIndex: 5,
        pointerEvents: "none",
      }} />
      {/* Correct overlay */}
      {isCorrect && (
        <div style={{
          position: "absolute", inset: 0,
          background: `rgba(76,175,80,0.1)`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          zIndex: 5,
          pointerEvents: "none",
        }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none"
            style={{ overflow: "visible", marginBottom: 4 }}>
            <polyline
              points="10,27 22,39 42,15"
              stroke="#4CAF50"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{
            fontFamily: MONO, fontSize: 12, letterSpacing: 1,
            color: "#4CAF50",
          }}>CORRECT</span>
        </div>
      )}

      {/* Wrong overlay */}
      {isWrong && (
        <div style={{
          position: "absolute", inset: 0,
          background: `rgba(244,67,54,0.1)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 4,
          pointerEvents: "none",
        }}>
          <span style={{
            fontSize: 60, fontWeight: 900, fontFamily: MONO, lineHeight: 1,
            color: "#F44336",
          }}>✕</span>
        </div>
      )}

      {/* Eliminated overlay */}
      {eliminated && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 6, pointerEvents: "none",
        }}>
          <span style={{
            fontSize: 14, fontFamily: MONO, color: "#9E9E9E",
            letterSpacing: 1, fontWeight: 700,
          }}>LOCKED</span>
        </div>
      )}

      {/* Answer number with lock icon underneath */}
      {!isCorrect && !isWrong && !eliminated && (
        <div style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          background: "rgba(255,255,255,0.88)",
          padding: "8px 12px",
          borderRadius: "6px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        }}>
          <span style={{
            fontSize,
            fontWeight: 700,
            fontFamily: MONO,
            color: "#333",
            letterSpacing: 1,
            lineHeight: 1,
          }}>{label}</span>
          <span style={{
            fontSize: 14,
            color: "#555",
            lineHeight: 1,
          }}>🔒</span>
        </div>
      )}

      {/* Door number badge */}
      <div style={{
        position: "absolute", top: 8, right: 8,
        width: 28, minHeight: 34, borderRadius: 6,
        border: `1px solid #BDBDBD`,
        background: "#FFFFFF",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 2,
        padding: "4px 0",
        fontFamily: MONO,
        color: "#333",
        fontWeight: 700,
        zIndex: 10,
      }}>
        <span style={{ fontSize: 12 }}>{idx + 1}</span>
      </div>
    </button>
  );
}
