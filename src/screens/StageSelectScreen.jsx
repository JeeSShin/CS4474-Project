import { useState } from "react";
import { STAGES, FONT, MONO } from "../constants";
import { Btn } from "../components/Btn";

function StageCard({ stage: s, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={() => onSelect(s.id)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 300, padding: "16px 20px", border: `1px solid ${s.color}33`,
        borderRadius: 12, background: hov ? `${s.color}15` : "var(--surface)",
        color: "var(--text)", textAlign: "left", fontFamily: FONT,
        transition: "all 0.2s", transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 8px 24px ${s.color}20` : "none",
      }}>
      <div style={{ fontWeight: 700, fontSize: 16 }}>
        <span style={{ color: s.color, fontFamily: MONO }}>0{s.id}</span>  {s.name}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
        {s.rounds} rounds · {s.tagline}
      </div>
    </button>
  );
}

export function StageSelectScreen({ onSelect, onBack }) {
  return (
    <div style={{ textAlign: "center", animation: "fadeUp 0.5s ease-out", paddingTop: 30 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", marginBottom: 28, fontFamily: FONT }}>STAGE SELECT</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        {STAGES.map(s => (
          <StageCard key={s.id} stage={s} onSelect={onSelect} />
        ))}
      </div>
      <div style={{ marginTop: 24 }}><Btn onClick={onBack} color="#5A6680">← Back</Btn></div>
    </div>
  );
}
