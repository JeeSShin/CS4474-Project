import { useState } from "react";
import { STAGES, FONT, MONO, DISPLAY } from "../constants";
import { Btn } from "../components/Btn";

function StageCard({ stage: s, onSelect, bestScore }) {
  const [hov, setHov] = useState(false);
  const completed = bestScore !== undefined && bestScore > 0;
  return (
    <button onClick={() => onSelect(s.id)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", maxWidth: 480, padding: 0, border: `1px solid ${s.color}22`,
        borderRadius: 4, background: hov ? `${s.color}08` : "var(--surface)",
        color: "var(--text)", textAlign: "left", fontFamily: FONT,
        transition: "all 0.25s", display: "flex", alignItems: "stretch",
        transform: hov ? "translateX(4px)" : "none",
        boxShadow: hov ? `0 4px 24px ${s.color}20` : "none",
        overflow: "hidden", position: "relative",
      }}>
      {/* Thick left color bar + status light */}
      <div style={{
        width: 6, background: s.color, opacity: hov ? 1 : 0.6,
        transition: "opacity 0.25s", position: "relative", flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
          width: 8, height: 8, borderRadius: "50%", background: s.color,
          boxShadow: `0 0 8px ${s.color}80`,
        }} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          fontSize: 40, fontWeight: 700, fontFamily: DISPLAY, color: s.color,
          lineHeight: 1, minWidth: 48,
        }}>0{s.id}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18, fontFamily: FONT, display: "flex", alignItems: "center", gap: 8 }}>
            {s.name}
            {/* Completion checkmark */}
            {completed && (
              <span style={{ color: "var(--neon-green)", fontSize: 16 }} aria-label="Completed">{"\u2713"}</span>
            )}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2, fontFamily: MONO }}>
            {s.rounds} rounds {"\u00B7"} {s.tagline}
          </div>
          {/* Best score for this stage */}
          {bestScore !== undefined && bestScore > 0 && (
            <div style={{ fontSize: 11, color: "var(--neon-yellow)", marginTop: 4, fontFamily: MONO }}>
              Best: {bestScore.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* Stage icon placeholder */}
      <div
        data-placeholder="stage-icon"
        style={{
          width: 64, height: 64, margin: "auto 12px",
          border: `1px dashed ${s.color}20`, borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div style={{
          width: 24, height: 32, border: `1.5px solid ${s.color}25`, borderRadius: 2,
          position: "relative",
        }}>
          <div style={{
            position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)",
            width: 3, height: 3, borderRadius: "50%", border: `1px solid ${s.color}30`,
          }} />
        </div>
      </div>

      {/* Chevron */}
      <div style={{
        display: "flex", alignItems: "center", paddingRight: 16,
        color: s.color, fontSize: 20, fontWeight: 700,
        transform: hov ? "translateX(4px)" : "none",
        transition: "transform 0.25s", opacity: hov ? 1 : 0.4,
      }}>{"\u276F"}</div>
    </button>
  );
}

export function StageSelectScreen({ onSelect, onBack, stageBests = {}, diff = "beginner" }) {
  return (
    <div style={{ animation: "fadeUp 0.5s ease-out", paddingTop: 30 }}>
      {/* Back button */}
      <div style={{ marginBottom: 16 }}>
        <Btn onClick={onBack} color="#6B7A94">{"\u2190"} Back</Btn>
      </div>

      <h2 style={{
        fontSize: 36, fontWeight: 700, color: "var(--text)", marginBottom: 24,
        fontFamily: DISPLAY, letterSpacing: 2,
      }}>STAGE SELECT</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        {STAGES.map((s, i) => {
          const key = `${diff}-${s.id}`;
          const bestScore = stageBests[key];
          return (
            <div key={s.id} style={{ animation: `fadeUp 0.4s ease-out ${i * 0.1}s both`, width: "100%" }}>
              <StageCard stage={s} onSelect={onSelect} bestScore={bestScore} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
