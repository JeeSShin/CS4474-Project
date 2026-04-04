import { useState } from "react";
import { MONO } from "../appConstants";
import { convertNumber } from "../numberStyles";

export function GatewayCave({ value, color, idx, onClick, state, disabled, numeral, eliminated, doorCount = 3 }) {
  const isCorrect = state === "correct";
  const isWrong = state === "wrong";
  const [hov, setHov] = useState(false);

  const label = convertNumber(value, numeral);
  const fontSize = label.length <= 3 ? 62 : label.length <= 5 ? 48 : label.length <= 7 ? 36 : 28;
  const caveWidth = `min(180px, calc((100vw - 80px) / ${doorCount}))`;

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
        width: caveWidth,
        maxWidth: 180,
        height: 280,
        padding: 0,
        border: `3px solid ${isCorrect ? "#4CAF50" : isWrong ? "#F44336" : eliminated ? "#73756f" : hov ? "#888b84" : "#666962"}`,
        borderRadius: "38% 30% 34% 28% / 22% 26% 18% 20%",
        background: eliminated
          ? "linear-gradient(180deg, #9a9c95 0%, #777a73 100%)"
          : "linear-gradient(155deg, #a8aaa2 0%, #8f928a 26%, #797c74 52%, #62655e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: isCorrect
          ? "answerDoorSlideRight 0.65s ease-in forwards"
          : !isCorrect && !isWrong && !eliminated
            ? "caveGlow 4s ease-in-out infinite"
            : "none",
        transform: hov && !disabled && !isCorrect && !isWrong && !eliminated ? "translateY(-4px)" : "translateX(0)",
        transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s, opacity 0.3s",
        boxShadow: isCorrect
          ? "0 10px 24px rgba(76,175,80,0.22), inset 0 0 12px rgba(255,255,255,0.08)"
          : isWrong
            ? "0 10px 24px rgba(244,67,54,0.22), inset 0 0 12px rgba(255,255,255,0.08)"
            : hov
              ? "0 14px 24px rgba(0,0,0,0.22), inset 10px 8px 14px rgba(255,255,255,0.08), inset -12px -10px 18px rgba(49,52,45,0.28)"
              : "0 8px 16px rgba(0,0,0,0.18), inset 8px 8px 12px rgba(255,255,255,0.07), inset -10px -8px 16px rgba(49,52,45,0.24)",
        opacity: eliminated ? 0.5 : disabled && !isCorrect && !isWrong ? 0.7 : 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "10px",
          borderRadius: "36% 28% 32% 24% / 20% 24% 16% 18%",
          background: eliminated
            ? "linear-gradient(160deg, rgba(179,181,174,0.58) 0%, rgba(108,111,103,0.86) 100%)"
            : "linear-gradient(160deg, rgba(210,214,206,0.22) 0%, rgba(130,134,125,0.12) 18%, rgba(72,76,70,0.08) 100%)",
          clipPath: "polygon(8% 100%, 2% 72%, 8% 30%, 22% 10%, 46% 2%, 72% 8%, 90% 24%, 98% 54%, 92% 100%)",
          boxShadow: eliminated
            ? "inset 0 8px 12px rgba(255,255,255,0.05)"
            : `inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 4px ${color}10`,
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "18%",
          top: "18%",
          width: "18%",
          height: "18%",
          borderRadius: "52% 48% 42% 58%",
          background: "linear-gradient(160deg, rgba(183,186,178,0.4) 0%, rgba(92,96,89,0.66) 100%)",
          transform: "rotate(-20deg)",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "12%",
          bottom: "16%",
          width: "20%",
          height: "20%",
          borderRadius: "44% 56% 48% 52%",
          background: "linear-gradient(200deg, rgba(178,181,173,0.44) 0%, rgba(90,94,87,0.7) 100%)",
          transform: "rotate(16deg)",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 26% 18%, rgba(255,255,255,0.12), transparent 22%), radial-gradient(circle at 74% 64%, rgba(58,60,56,0.16), transparent 20%)",
          opacity: 0.75,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {[16, 34, 68, 82].map((pos) => (
        <div
          key={`rock-${pos}`}
          style={{
            position: "absolute",
            left: `${pos}%`,
            top: pos < 40 ? `${18 + pos * 0.7}%` : `${34 + (pos - 40) * 0.5}%`,
            width: pos % 2 === 0 ? 14 : 10,
            height: pos % 2 === 0 ? 14 : 10,
            borderRadius: "48% 52% 44% 56%",
            background: "rgba(70,74,69,0.16)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 48%, rgba(0,0,0,0) 44%, rgba(0,0,0,0.12) 100%)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      {[0].map((i) => (
        <div
          key={`dust-${i}`}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(190,194,184,0.16)",
            left: "34%",
            top: "24%",
            animation: `floatDust ${3 + i}s ease-in-out infinite`,
            filter: "blur(0.5px)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />
      ))}

      {isCorrect && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(76,175,80,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ overflow: "visible", marginBottom: 4 }}>
            <polyline
              points="10,27 22,39 42,15"
              stroke="#4CAF50"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: 1, color: "#4CAF50" }}>CORRECT</span>
        </div>
      )}

      {isWrong && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(244,67,54,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: 60, fontWeight: 900, fontFamily: MONO, lineHeight: 1, color: "#F44336" }}>X</span>
        </div>
      )}

      {eliminated && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: 14, fontFamily: MONO, color: "#9E9E9E", letterSpacing: 1, fontWeight: 700 }}>LOCKED</span>
        </div>
      )}

      {!isWrong && !eliminated && (
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "58%",
            minHeight: 144,
            padding: "0 0 6px",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(221, 224, 216, 0.92)",
              width: "100%",
              minHeight: 92,
              padding: "14px 10px",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.18), inset 0 0 6px rgba(255,255,255,0.14)",
              border: "1px solid rgba(92,96,88,0.24)",
            }}
          >
            <span
              style={{
                fontSize,
                fontWeight: 900,
                fontFamily: MONO,
                color: "#303430",
                letterSpacing: 1,
                lineHeight: 1,
                textShadow: "0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              {label}
            </span>
          </div>
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 34,
              borderRadius: "18px 18px 12px 12px",
              background: "linear-gradient(180deg, rgba(92,96,88,0.18) 0%, rgba(74,78,71,0.3) 100%)",
              border: "1px solid rgba(92,96,88,0.22)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.28)",
            }}
          >
            <span style={{ fontSize: 22, lineHeight: 1, color: "rgba(58,61,56,0.78)" }}>
              {"\uD83D\uDD12"}
            </span>
          </div>
        </div>
      )}

    </button>
  );
}
