import { useState } from "react";
import { NEON, FONT, MONO } from "../constants";
import { Btn } from "../components/Btn";

export function TutorialScreen({ onBack }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);

  const steps = [
    {
      title: "THE EQUATION",
      desc: "Each round shows an equation at the top. Calculate the answer in your head.",
      render: () => (
        <div style={{
          fontSize: 36, fontWeight: 700, fontFamily: MONO, color: "var(--neon-green)",
          padding: "16px 28px", background: "var(--surface)", borderRadius: 12,
          textShadow: "0 0 20px rgba(0,245,212,0.4)",
        }}>8 + 14 = <span style={{ color: "var(--neon-yellow)" }}>?</span></div>
      ),
    },
    {
      title: "THE DOORS",
      desc: "Below are colored doors, each with a number. Tap the one that equals the answer!",
      render: () => (
        <div style={{ display: "flex", gap: 12 }}>
          {[20, 22, 24].map((v, i) => (
            <div key={i} style={{
              width: 80, height: 100, border: `2px solid ${NEON[i]}55`, borderRadius: 10,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              background: `${NEON[i]}0A`, gap: 4,
            }}>
              <span style={{ fontSize: 10, fontFamily: MONO, color: `${NEON[i]}88` }}>Gate {i+1}</span>
              <span style={{ fontSize: 24, fontFamily: MONO, fontWeight: 700, color: "#fff" }}>{v}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "TRY IT!",
      desc: "8 + 14 = ? Pick the right door below.",
      render: () => (
        <div style={{ display: "flex", gap: 12 }}>
          {[20, 22, 24].map((v, i) => {
            const isRight = v === 22;
            const wasPicked = picked === i;
            return (
              <button key={i} onClick={() => setPicked(i)} style={{
                width: 80, height: 100, border: `2px solid ${wasPicked ? (isRight ? "var(--neon-green)" : "var(--neon-red)") : NEON[i] + "55"}`,
                borderRadius: 10, cursor: "pointer", fontFamily: MONO,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: wasPicked ? (isRight ? "rgba(0,245,212,0.15)" : "rgba(254,95,85,0.15)") : `${NEON[i]}0A`,
                animation: wasPicked && !isRight ? "shake 0.4s" : "none", gap: 4,
              }}>
                <span style={{ fontSize: 10, color: `${NEON[i]}88` }}>Gate {i+1}</span>
                <span style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>{v}</span>
                {wasPicked && <span style={{ fontSize: 11 }}>{isRight ? "✅" : "❌"}</span>}
              </button>
            );
          })}
        </div>
      ),
    },
    {
      title: "BEAT THE CLOCK",
      desc: "A timer counts down each round. Run out and you lose a life. Clear all rounds to advance!",
      render: () => (
        <div style={{ width: 260 }}>
          <div style={{ height: 8, borderRadius: 4, background: "var(--surface2)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "65%", borderRadius: 4, background: "var(--neon-green)", boxShadow: "0 0 12px rgba(0,245,212,0.5)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12, fontFamily: MONO }}>
            <span style={{ color: "var(--muted)" }}>TIME</span>
            <span style={{ color: "var(--neon-green)" }}>9.4s</span>
          </div>
        </div>
      ),
    },
  ];

  const s = steps[step];
  return (
    <div style={{ textAlign: "center", animation: "fadeUp 0.5s ease-out", paddingTop: 24 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", marginBottom: 4, fontFamily: FONT }}>TUTORIAL</h2>
      <div style={{ fontSize: 11, fontFamily: MONO, color: "var(--muted)", letterSpacing: 3, marginBottom: 24 }}>
        STEP {step + 1} / {steps.length}
      </div>
      <div style={{
        background: "var(--surface)", borderRadius: 16, padding: "32px 24px",
        maxWidth: 380, margin: "0 auto", minHeight: 260,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18,
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--neon-yellow)", letterSpacing: 2, fontFamily: FONT }}>{s.title}</div>
        {s.render()}
        <p style={{ color: "var(--muted)", lineHeight: 1.6, fontSize: 14, maxWidth: 300 }}>{s.desc}</p>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
        {step > 0 && <Btn onClick={() => { setStep(step - 1); setPicked(null); }} color="#5A6680">← Prev</Btn>}
        {step < steps.length - 1
          ? <Btn onClick={() => { setStep(step + 1); setPicked(null); }} color="#00F5D4">Next →</Btn>
          : <Btn onClick={onBack} color="#00F5D4">Got it!</Btn>
        }
      </div>
    </div>
  );
}
