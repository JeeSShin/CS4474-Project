import { FONT, MONO, DISPLAY } from "../appConstants";
import { Btn } from "../components/Btn";

export function MenuScreen({ onPlay, onTutorial, onSettings, highScores = [], returning = false }) {
  const d = returning ? 0.03 : 0.15; // delay increment
  const dur = returning ? 0.35 : 0.5; // animation duration

  return (
    <div style={{ paddingTop: 40, animation: "fadeIn 0.4s ease-out" }}>
      {/* Title block centered */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
        animation: `fadeLeft ${returning ? "0.35s" : "0.6s"} ease-out`,
        marginBottom: 8,
      }}>
        <div style={{
          width: 60, height: 4, borderRadius: 2,
          background: "linear-gradient(90deg, var(--neon-green), var(--neon-green)40)",
          marginBottom: 12, flexShrink: 0,
        }} />
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: 72, fontWeight: 700, lineHeight: 0.9, margin: 0,
            background: "linear-gradient(135deg, var(--neon-green), var(--neon-purple), var(--neon-red))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontFamily: DISPLAY,
          }}>OPEN SESAME: MATH DOORS</h1>
        </div>
      </div>

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

        {/* Tutorial */}
        <div style={{
          display: "flex", gap: 10, justifyContent: "center",
          animation: `fadeUp ${dur}s ease-out ${d * 3}s both`,
          width: "100%", maxWidth: 360,
        }}>
          <Btn onClick={onTutorial} color="#FFD166" style={{
            width: "100%",
            ...(!returning ? { animation: "tutorialPulse 1.5s ease-in-out infinite", borderColor: "#FFD166" } : {}),
          }}>Tutorial</Btn>
        </div>

        {/* Settings */}
        <div style={{ animation: `fadeUp ${dur}s ease-out ${d * 4}s both` }}>
          <Btn onClick={onSettings} color="#6B7A94">Settings</Btn>
        </div>
      </div>
    </div>
  );
}
