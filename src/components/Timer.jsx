import { MONO } from "../constants";

export function Timer({ timeLeft, maxTime }) {
  const pct = Math.max(0, timeLeft / maxTime * 100);
  const danger = pct < 25;
  const warn = pct < 50 && !danger;
  const hue = danger ? 0 : warn ? 38 : 165;
  const col = `hsl(${hue},90%,55%)`;
  return (
    <div style={{ width: "100%", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: MONO, letterSpacing: 2 }}>TIME</span>
        <span style={{
          fontSize: 13, fontFamily: MONO, fontWeight: 700, color: col,
          animation: danger ? "pulse 0.5s infinite" : "none",
        }}>{timeLeft.toFixed(1)}s</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "var(--surface2)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 3, width: `${pct}%`,
          background: col, boxShadow: `0 0 12px ${col}80`,
          transition: "width 0.1s linear",
        }} />
      </div>
    </div>
  );
}
