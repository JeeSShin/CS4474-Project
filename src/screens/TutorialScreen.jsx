import { useState } from "react";
import { NEON, FONT, MONO, DISPLAY } from "../appConstants";
import { convertDisplay } from "../numberStyles";
import { Btn } from "../components/Btn";
import { GatewayCave } from "../components/GatewayCave";
import { sfxCorrect, sfxWrong } from "../sound";

const TRY_VALS = [20, 22, 24];
const CORRECT_VAL = 22;

function ProgressDots({ current, total }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Tutorial step ${current + 1} of ${total}`}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginBottom: 24 }}
    >
      <div style={{ fontSize: 12, fontFamily: MONO, color: "var(--text-dim)", letterSpacing: 2 }}>
        Step {current + 1} of {total}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              width: 12, height: 12, borderRadius: "50%",
              background: i <= current ? "var(--neon-green)" : "transparent",
              border: `2px solid ${i <= current ? "var(--neon-green)" : "var(--text-dim)"}`,
              boxShadow: i === current ? "0 0 10px var(--neon-green)50" : "none",
              transition: "all 0.3s",
            }} />
            {i < total - 1 && (
              <div style={{
                width: 24, height: 2,
                background: i < current ? "var(--neon-green)" : "var(--border)",
                transition: "background 0.3s",
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TutorialScreen({ numeral, sound, onBack }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState("slideLeft");
  const [tryPicked, setTryPicked] = useState(null);
  const [gotCorrect, setGotCorrect] = useState(false);

  const goTo = (newStep) => {
    setDir(newStep > step ? "slideLeft" : "slideRight");
    setStep(newStep);
    setTryPicked(null);
    setGotCorrect(false);
  };

  function handleTryDoor(i) {
    if (gotCorrect) return;
    if (TRY_VALS[i] === CORRECT_VAL) {
      setTryPicked(i);
      setGotCorrect(true);
      if (sound) sfxCorrect();
    } else {
      setTryPicked(i);
      if (sound) sfxWrong();
    }
  }

  const steps = [
    {
      title: "THE EQUATION",
      desc: "Each round shows an equation at the top. Calculate the answer in your head.",
      render: () => (
        <div style={{
          fontSize: 36, fontWeight: 700, fontFamily: MONO, color: "var(--neon-green)",
          padding: "16px 28px", background: "var(--bg-deep)", borderRadius: 4,
          border: "1px solid var(--neon-green)22",
          boxShadow: "inset 0 0 40px rgba(0,245,212,0.05)",
          textShadow: "0 0 20px rgba(0,245,212,0.4)",
        }}>{convertDisplay("8 + 14", numeral)} = <span style={{ color: "var(--neon-yellow)" }}>?</span></div>
      ),
    },
    {
      title: "THE DOORS",
      desc: "Above are numbered door choices. Tap the one that matches the answer!",
      render: () => (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {TRY_VALS.map((v, i) => (
            <GatewayCave
              key={i} value={v} color={NEON[i]} idx={i}
              state="idle" disabled={true} numeral={numeral} doorCount={3} noAnimation={true}
              onClick={() => {}}
            />
          ))}
        </div>
      ),
    },
    {
      title: "TRY IT!",
      desc: `${convertDisplay("8 + 14", numeral)} = ? Pick the right door above. You can try again!`,
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {TRY_VALS.map((v, i) => (
              <GatewayCave
                key={i} value={v} color={NEON[i]} idx={i}
                state={
                  gotCorrect && v === CORRECT_VAL ? "correct"
                  : tryPicked === i && !gotCorrect ? "wrong"
                  : "idle"
                }
                disabled={gotCorrect}
                numeral={numeral} doorCount={3} noAnimation={true}
                onClick={handleTryDoor}
              />
            ))}
          </div>
          {gotCorrect && (
            <div style={{ fontSize: 13, fontFamily: MONO, color: "var(--neon-green)", letterSpacing: 2 }}>
              CORRECT! +100 pts
            </div>
          )}
          {tryPicked !== null && !gotCorrect && (
            <div style={{ fontSize: 12, fontFamily: MONO, color: "var(--neon-red)", letterSpacing: 1 }}>
              Try again - pick another door
            </div>
          )}
        </div>
      ),
    },
    {
      title: "KEEP MOVING",
      desc: "Each round is about solving the equation and choosing the matching door.",
      render: () => (
        <div style={{
          width: 260, fontSize: 13, fontFamily: MONO, color: "var(--neon-green)", letterSpacing: 2,
          padding: "12px 18px", borderRadius: 4, background: "var(--bg-deep)",
          border: "1px solid var(--neon-green)22", textAlign: "center",
        }}>
          SOLVE THE EQUATION, THEN PICK A DOOR
        </div>
      ),
    },
    {
      title: "OPEN SESAME",
      desc: "Need help? OPEN SESAME automatically picks the correct door and moves you to the next round.",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <button
            disabled
            style={{
              fontSize: 13,
              fontFamily: MONO,
              letterSpacing: 2,
              color: "#E8D4C0",
              padding: "8px 20px",
              borderRadius: 22,
              background: "rgba(232,212,192,0.12)",
              border: "1px solid rgba(232,212,192,0.28)",
              fontWeight: 700,
              opacity: 0.95,
            }}
          >
            OPEN SESAME
          </button>
          <div style={{ fontSize: 12, fontFamily: MONO, color: "var(--text-dim)", textAlign: "center", lineHeight: 1.6 }}>
            Uses the correct answer for you
            <br />
            and continues right away
          </div>
        </div>
      ),
    },
    {
      title: "RESULTS SCREEN",
      desc: "At the end, the results screen shows your final score, accuracy, correct and wrong answers, best streak, and stage progress.",
      render: () => (
        <div style={{
          width: 280, padding: "16px 18px", borderRadius: 6,
          background: "var(--bg-deep)", border: "1px solid var(--border)",
          boxShadow: "inset 0 0 40px rgba(255,209,102,0.05)",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          <div style={{
            fontSize: 14, fontFamily: DISPLAY, letterSpacing: 2,
            color: "var(--neon-yellow)", textAlign: "center",
          }}>TREASURE FOUND</div>
          <div style={{
            fontSize: 28, fontFamily: DISPLAY, fontWeight: 700,
            color: "var(--neon-yellow)", textAlign: "center",
          }}>1,250</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              ["ACCURACY", "90%", "var(--neon-green)"],
              ["CORRECT", "9", "var(--neon-green)"],
              ["WRONG", "1", "var(--neon-red)"],
              ["STREAK", "5", "var(--neon-yellow)"],
            ].map(([label, value, color]) => (
              <div key={label} style={{
                minWidth: 58, padding: "6px 8px", textAlign: "center",
                borderRadius: 4, background: "var(--surface)", border: "1px solid var(--border)",
              }}>
                <div style={{ fontSize: 16, fontFamily: DISPLAY, fontWeight: 700, color }}>{value}</div>
                <div style={{ fontSize: 9, fontFamily: MONO, color: "var(--text-dim)", letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const s = steps[step];
  return (
    <div style={{ animation: "fadeUp 0.5s ease-out", paddingTop: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Btn onClick={onBack} color="#6B7A94">{"\u2190"} Back</Btn>
      </div>

      <h2 style={{
        fontSize: 36, fontWeight: 700, color: "var(--text)", marginBottom: 4,
        fontFamily: DISPLAY, letterSpacing: 2,
      }}>TUTORIAL</h2>

      <ProgressDots current={step} total={steps.length} />

      <div key={step} style={{
        background: "var(--surface-raised)", borderRadius: 4, padding: "32px 24px",
        maxWidth: 480, margin: "0 auto", minHeight: 320,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18,
        border: "1px solid var(--border)",
        borderTop: "2px solid var(--neon-yellow)",
        animation: `${dir} 0.35s ease-out`,
      }}>
        <div style={{
          fontSize: 18, fontWeight: 700, color: "var(--neon-yellow)", letterSpacing: 3,
          fontFamily: FONT, textTransform: "uppercase",
        }}>{s.title}</div>
        {s.render()}
        <p style={{ color: "var(--text-dim)", lineHeight: 1.6, fontSize: 14, maxWidth: 340, textAlign: "center" }}>{s.desc}</p>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
        {step > 0 && <Btn onClick={() => goTo(step - 1)} color="#6B7A94">{"\u2190"} Prev</Btn>}
        {step < steps.length - 1
          ? <Btn onClick={() => goTo(step + 1)} color="#00F5D4">Next {"\u2192"}</Btn>
          : <Btn onClick={onBack} color="#00F5D4">Got it!</Btn>
        }
      </div>
    </div>
  );
}
