import { FONT, MONO } from "../constants";
import { Btn } from "../components/Btn";

export function MenuScreen({ onPlay, onTutorial, onStages, onSettings }) {
  return (
    <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease-out", paddingTop: 32 }}>
      <div style={{ fontSize: 12, letterSpacing: 8, color: "var(--muted)", fontFamily: MONO, marginBottom: 8 }}>
        {"// WELCOME TO"}
      </div>
      <h1 style={{
        fontSize: 48, fontWeight: 700, lineHeight: 1.05, margin: "0 0 6px",
        background: "linear-gradient(135deg, var(--neon-green), var(--neon-purple), var(--neon-red))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        fontFamily: FONT,
      }}>EQUATION<br/>GATEWAY</h1>
      <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: 300, margin: "0 auto 32px", lineHeight: 1.6 }}>
        Solve the equation. Choose the right door. <br/> Don't let the clock run out.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
        <Btn onClick={onPlay} color="#00F5D4" big>▶  Play</Btn>
        <Btn onClick={onTutorial} color="#FFD166">📖  Tutorial</Btn>
        <Btn onClick={onStages} color="#7B61FF">🗺  Stage Select</Btn>
        <Btn onClick={onSettings} color="#5A6680">⚙  Settings</Btn>
      </div>
    </div>
  );
}
