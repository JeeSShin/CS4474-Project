import { MONO } from "../constants";

export function Timer({ timeLeft, maxTime }) {
  const pct = Math.max(0, timeLeft / maxTime * 100);
  const danger = pct < 25;
  const warn = pct < 50 && !danger;
  const hue = danger ? 0 : warn ? 38 : 165;
  const col = `hsl(${hue},90%,55%)`;
  return (
    <div style={{ width: "100%", maxWidth: 480, margin: "0 auto" }}
      role="timer" aria-label={`${timeLeft.toFixed(1)} seconds remaining`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: "var(--text-dim)", fontFamily: MONO, letterSpacing: 2, display: "flex", alignItems: "center", gap: 6 }}>
          {"\u23F1"}
          {warn && <span style={{ fontSize: 11, color: "hsl(38,90%,55%)", fontWeight: 700, letterSpacing: 1 }}>{"⚠"}</span>}
          {danger && <span style={{
            fontSize: 11, color: "hsl(0,90%,55%)", fontWeight: 700, letterSpacing: 1,
            animation: "pulse 0.5s infinite",
          }}>HURRY</span>}
        </span>
        <span style={{
          fontSize: 13, fontFamily: MONO, fontWeight: 700, color: col,
          animation: danger ? "pulse 0.5s infinite" : "none",
        }}>{timeLeft.toFixed(1)}s</span>
      </div>
      <div style={{
        height: 10, borderRadius: 2, background: "var(--surface2)", overflow: "hidden",
        border: danger ? `2px solid ${col}60` : warn ? `1px solid hsl(38,90%,55%)40` : "1px solid var(--border)",
        boxShadow: danger ? `0 0 12px ${col}30, inset 0 2px 4px rgba(0,0,0,0.3)` : "inset 0 2px 4px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s, box-shadow 0.3s, border-width 0.3s",
      }}>
        <div style={{
          height: "100%", borderRadius: 2, width: `${pct}%`,
          background: `${col}`,
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.15) 6px, rgba(0,0,0,0.15) 8px)`,
          boxShadow: `0 0 12px ${col}80`,
          transition: "width 0.1s linear",
          animation: danger ? "pulse 0.5s infinite" : "none",
        }} />
      </div>
    </div>
  );
}
