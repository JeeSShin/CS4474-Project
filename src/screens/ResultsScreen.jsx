import { FONT, MONO } from "../constants";
import { Btn } from "../components/Btn";

export function ResultsScreen({ data, onMenu, onRetry }) {
  const win = data.result === "win";
  return (
    <div style={{ textAlign: "center", paddingTop: 40, animation: "fadeUp 0.6s ease-out" }}>
      <div style={{ fontSize: 56, marginBottom: 8 }}>{win ? "🏆" : "💀"}</div>
      <h2 style={{
        fontSize: 30, fontWeight: 700, fontFamily: FONT, margin: "0 0 6px",
        color: win ? "var(--neon-green)" : "var(--neon-red)",
      }}>{win ? "ALL STAGES CLEARED" : "GAME OVER"}</h2>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 4 }}>
        {win ? "Every gateway conquered." : `Reached Stage ${data.stage}`}
      </p>
      <div style={{
        fontSize: 52, fontWeight: 700, fontFamily: MONO, color: "var(--neon-yellow)",
        margin: "20px 0 28px", textShadow: "0 0 30px rgba(255,209,102,0.4)",
      }}>{data.score.toLocaleString()}</div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Btn onClick={onRetry} color="#00F5D4">Play Again</Btn>
        <Btn onClick={onMenu} color="#7B61FF">Main Menu</Btn>
      </div>
    </div>
  );
}
