import { useState } from "react";
import { MONO } from "../appConstants";
import { convertNumber } from "../numberStyles";

export function Door({ value, color, idx, onClick, state, disabled, numeral, eliminated, doorCount = 3 }) {
  const isCorrect = state === "correct";
  const isWrong = state === "wrong";
  const [hov, setHov] = useState(false);

  const label = convertNumber(value, numeral);
  const fontSize = label.length <= 3 ? 52 : label.length <= 5 ? 40 : label.length <= 7 ? 30 : 22;

  // Responsive width: shrink on small screens to fit all doors
  const doorWidth = `min(180px, calc((100vw - 80px) / ${doorCount}))`;

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
        maxWidth: 180,
        height: 300,
        border: `3px solid ${isCorrect ? "#4CAF50" : isWrong ? "#F44336" : eliminated ? "#91857b" : hov ? "#8a7364" : "#726155"}`,
        borderRadius: "42% 42% 28% 28% / 20% 20% 14% 14%",
        background: eliminated
          ? "linear-gradient(180deg, #cfc3b9 0%, #b9aca0 100%)"
          : "linear-gradient(160deg, #b7a093 0%, #a88f82 18%, #8b7367 42%, #756055 68%, #5f4b42 100%)",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        animation: isWrong
          ? "doorShakeHard 0.55s ease-in-out, wrongPulseGlow 0.6s ease-out"
          : !isCorrect && !eliminated ? "caveGlow 4s ease-in-out infinite"
          : "none",
        transform: hov && !disabled && !isCorrect && !isWrong && !eliminated ? "translateY(-4px)" : "scale(1)",
        transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.3s",
        boxShadow: isCorrect
          ? "0 8px 26px rgba(76,175,80,0.25), inset 0 0 20px rgba(100,80,60,0.28)"
          : isWrong
            ? "0 8px 26px rgba(244,67,54,0.25), inset 0 0 20px rgba(100,80,60,0.28)"
            : hov
              ? "0 16px 28px rgba(0,0,0,0.24), inset 14px 10px 20px rgba(255,255,255,0.07), inset -16px -12px 26px rgba(74,52,39,0.35)"
              : "0 10px 18px rgba(0,0,0,0.18), inset 12px 10px 16px rgba(255,255,255,0.06), inset -16px -12px 22px rgba(74,52,39,0.32)",
        opacity: eliminated ? 0.5 : disabled && !isCorrect && !isWrong ? 0.7 : 1,
      }}
    >
      <div style={{
        position: "absolute",
        inset: "5% 6% auto",
        height: "18%",
        borderRadius: "50%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 100%)",
        filter: "blur(1px)",
        zIndex: 1,
      }} />

      <div style={{
        position: "absolute",
        left: "11%",
        right: "11%",
        top: "22%",
        bottom: "12%",
        borderRadius: "42% 42% 26% 26% / 34% 34% 16% 16%",
        background: eliminated
          ? "radial-gradient(circle at 50% 24%, rgba(60,50,44,0.14) 0%, rgba(93,80,71,0.4) 62%, rgba(125,112,102,0.72) 100%)"
          : "radial-gradient(circle at 50% 24%, rgba(73,52,40,0.24) 0%, rgba(35,24,20,0.84) 44%, #1a1311 72%, #110c0a 100%)",
        boxShadow: eliminated
          ? "inset 0 10px 18px rgba(255,255,255,0.06)"
          : `inset 0 18px 24px rgba(255,255,255,0.04), 0 0 0 8px ${color}14`,
        zIndex: 1,
      }} />

      <div style={{
        position: "absolute",
        left: "6%",
        bottom: "5%",
        width: "26%",
        height: "16%",
        borderRadius: "46% 54% 52% 48%",
        background: "linear-gradient(150deg, #9f8b7d 0%, #7a685d 100%)",
        transform: "rotate(-10deg)",
        zIndex: 1,
      }} />

      <div style={{
        position: "absolute",
        right: "7%",
        bottom: "6%",
        width: "20%",
        height: "13%",
        borderRadius: "52% 48% 44% 56%",
        background: "linear-gradient(160deg, #a39083 0%, #776358 100%)",
        transform: "rotate(16deg)",
        zIndex: 1,
      }} />

      <div style={{
        position: "absolute",
        left: "14%",
        top: "12%",
        width: "18%",
        height: "10%",
        borderRadius: "50%",
        background: "linear-gradient(180deg, #39a14a 0%, #245f2d 100%)",
        clipPath: "polygon(4% 100%, 14% 40%, 28% 100%, 42% 24%, 54% 100%, 68% 32%, 80% 100%, 96% 52%, 100% 100%)",
        transform: "rotate(-8deg)",
        zIndex: 2,
      }} />

      <div style={{
        position: "absolute",
        inset: "22% 11% 12%",
        background: "radial-gradient(ellipse at 50% 60%, rgba(255, 186, 92, 0.14) 0%, transparent 72%)",
        zIndex: 2,
        pointerEvents: "none",
        animation: "caveBreathing 6s ease-in-out infinite",
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.07), transparent 18%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.05), transparent 14%)",
        opacity: 0.7,
        pointerEvents: "none",
        zIndex: 2,
        animation: "caveBreathing 6s ease-in-out infinite",
      }} />
      {[20, 48, 77].map((left) => (
        <div key={`stala-${left}`} style={{
          position: "absolute",
          top: "20%",
          left: `${left}%`,
          width: 8,
          height: "22%",
          background: "linear-gradient(180deg, #40332b 0%, #5d4a3d 100%)",
          clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.8)",
          zIndex: 3,
          pointerEvents: "none",
          animation: "stalactiteSway 3s ease-in-out infinite",
          transformOrigin: `${left}% 0`,
        }} />
      ))}
      {[24, 52, 76].map((left) => (
        <div key={`stag-${left}`} style={{
          position: "absolute",
          bottom: "12%",
          left: `${left}%`,
          width: 7,
          height: "18%",
          background: "linear-gradient(0deg, #47382f 0%, #6a5648 100%)",
          clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)",
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.8)",
          zIndex: 3,
          pointerEvents: "none",
          animation: "stalagmiteSway 3s ease-in-out infinite",
          transformOrigin: `${left}% 100%`,
        }} />
      ))}
      {[30, 72].map((pos) => (
        <div key={`rock-${pos}`} style={{
          position: "absolute",
          left: `${pos}%`,
          top: "46%",
          width: 18,
          height: 24,
          borderRadius: "48% 52% 44% 56%",
          background: "#342822",
          boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)",
          zIndex: 3,
          pointerEvents: "none",
        }} />
      ))}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 50% 52%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.3) 100%)",
        zIndex: 4,
        pointerEvents: "none",
      }} />
      
      {[0, 1, 2, 3].map((i) => (
        <div key={`dust-${i}`} style={{
          position: "absolute",
          width: 2 + (i % 2),
          height: 2 + (i % 2),
          borderRadius: "50%",
          background: `rgba(255, 200, 100, ${0.3 + (i * 0.1)})`,
          left: `${20 + (i * 16)}%`,
          top: `${42 + (i * 8)}%`,
          animation: `floatDust ${3 + i}s ease-in-out infinite`,
          filter: "blur(0.5px)",
          pointerEvents: "none",
          zIndex: 4,
        }} />
      ))}
      {/* Correct overlay */}
      {isCorrect && (
        <div style={{
          position: "absolute", inset: 0,
          background: `rgba(76,175,80,0.1)`,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          zIndex: 6,
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
          zIndex: 6,
          pointerEvents: "none",
        }}>
          <span style={{
            fontSize: 60, fontWeight: 900, fontFamily: MONO, lineHeight: 1,
            color: "#F44336",
          }}>??/span>
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
          background: "rgba(210, 180, 150, 0.9)",
          padding: "8px 12px",
          borderRadius: "6px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25), inset 0 0 8px rgba(255,255,255,0.2)",
        }}>
          <span style={{
            fontSize,
            fontWeight: 700,
            fontFamily: MONO,
            color: "#3a2f28",
            letterSpacing: 1,
            lineHeight: 1,
          }}>{label}</span>
          <span style={{
            fontSize: 14,
            color: "#5a5047",
            lineHeight: 1,
          }}>?뵏</span>
        </div>
      )}

      {/* Door number badge */}
      <div style={{
        position: "absolute", top: 8, right: 8,
        width: 28, minHeight: 34, borderRadius: "50%",
        border: `2px solid #6B5A4C`,
        background: "#4a3f38",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 2,
        padding: "4px 0",
        fontFamily: MONO,
        color: "#E8D4C0",
        fontWeight: 700,
        zIndex: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
      }}>
        <span style={{ fontSize: 12 }}>{idx + 1}</span>
      </div>
    </button>
  );
}

