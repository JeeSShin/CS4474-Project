import { FONT, MONO, DISPLAY } from "../constants";
import { Btn } from "../components/Btn";

export function MenuScreen({ onPlay, onTutorial, onStages, onSettings, highScores = [], returning = false }) {
  const best = highScores.length > 0 ? highScores[0] : null;
  const d = returning ? 0.03 : 0.15; // delay increment
  const dur = returning ? 0.35 : 0.5; // animation duration

  return (
    <div style={{ paddingTop: 40, animation: "fadeIn 0.4s ease-out" }}>
      {/* Title block with left accent bar */}
      <div style={{
        display: "flex", gap: 0, alignItems: "flex-start",
        animation: `fadeLeft ${returning ? "0.35s" : "0.6s"} ease-out`,
        marginBottom: 8,
      }}>
        <div style={{
          width: 4, minHeight: 50, borderRadius: 2,
          background: "linear-gradient(180deg, var(--neon-green), var(--neon-green)40)",
          marginTop: 4, flexShrink: 0,
        }} />
        <div>
          <h1 style={{
            fontSize: 72, fontWeight: 700, lineHeight: 0.9, margin: 0,
            background: "linear-gradient(135deg, var(--neon-green), var(--neon-purple), var(--neon-red))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: DISPLAY,
          }}>EQUATION GATEWAY</h1>
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: 11, letterSpacing: 6, color: "var(--text-dim)", fontFamily: MONO,
        marginBottom: 12, textAlign: "center",
        animation: `fadeUp ${returning ? "0.35s" : "0.6s"} ease-out ${d}s both`,
      }}>
        SOLVE &nbsp;// &nbsp;CHOOSE &nbsp;// &nbsp;ADVANCE
      </div>

      {/* Personal best display */}
      {best && (
        <div style={{
          textAlign: "center", marginBottom: 24,
          animation: `fadeUp ${returning ? "0.35s" : "0.6s"} ease-out ${d * 1.2}s both`,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 20,
            background: "rgba(255,209,102,0.08)", border: "1px solid rgba(255,209,102,0.2)",
            fontFamily: MONO, fontSize: 12,
          }}>
            <span style={{ color: "var(--text-dim)" }}>Best:</span>
            <span style={{ color: "var(--neon-yellow)", fontWeight: 700 }}>
              {best.score.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Button grid */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 10, alignItems: "center",
      }}>
        {/* Hero play button */}
        <div style={{ animation: `fadeUp ${dur}s ease-out ${d * 2}s both`, width: "100%", maxWidth: 360, textAlign: "center" }}>
          <Btn onClick={onPlay} color="#00F5D4" big style={{ width: "100%" }}>
            <span aria-hidden="true">{"\u25B6"}</span> &nbsp;Play
          </Btn>
        </div>

        {/* Tutorial + Stage Select side by side */}
        <div style={{
          display: "flex", gap: 10, justifyContent: "center",
          animation: `fadeUp ${dur}s ease-out ${d * 3}s both`,
          width: "100%", maxWidth: 360,
        }}>
          <Btn onClick={onTutorial} color="#FFD166" style={{
            flex: 1,
            ...(!returning ? { animation: "tutorialPulse 1.5s ease-in-out infinite", borderColor: "#FFD166" } : {}),
          }}>Tutorial</Btn>
          <Btn onClick={onStages} color="#7B61FF" style={{ flex: 1 }}>Stages</Btn>
        </div>

        {/* Settings */}
        <div style={{ animation: `fadeUp ${dur}s ease-out ${d * 4}s both` }}>
          <Btn onClick={onSettings} color="#6B7A94">Settings</Btn>
        </div>
      </div>
    </div>
  );
}
