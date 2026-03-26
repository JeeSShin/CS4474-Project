import { useState, useEffect } from "react";
import { NEON, FONT, MONO, DISPLAY } from "../constants";
import { convertDisplay } from "../numerals";
import { Btn } from "../components/Btn";
import { GatewayDoor } from "../components/GatewayDoor";
import { Timer } from "../components/Timer";
import { sfxCorrect, sfxWrong } from "../sound";

const DEMO_MAX = 12;
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
  const [demoTime, setDemoTime] = useState(DEMO_MAX);

  // Animate timer only on the BEAT THE CLOCK step (index 3)
  useEffect(() => {
    if (step !== 3) { setDemoTime(DEMO_MAX); return; }
    const id = setInterval(() => {
      setDemoTime(t => (t - 0.1 <= 0 ? DEMO_MAX : parseFloat((t - 0.1).toFixed(1))));
    }, 100);
    return () => clearInterval(id);
  }, [step]);

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
      desc: "Below are colored doors, each with a number. Tap the one that equals the answer!",
      render: () => (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {TRY_VALS.map((v, i) => (
            <GatewayDoor
              key={i} value={v} color={NEON[i]} idx={i}
              state="idle" disabled={true} numeral={numeral} doorCount={3}
              onClick={() => {}}
            />
          ))}
        </div>
      ),
    },
    {
      title: "TRY IT!",
      desc: `${convertDisplay("8 + 14", numeral)} = ? Pick the right door below. You can try again!`,
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 12 }}>
            {TRY_VALS.map((v, i) => (
              <GatewayDoor
                key={i} value={v} color={NEON[i]} idx={i}
                state={
                  gotCorrect && v === CORRECT_VAL ? "correct"
                  : tryPicked === i && !gotCorrect ? "wrong"
                  : "idle"
                }
                disabled={gotCorrect}
                numeral={numeral} doorCount={3}
                onClick={handleTryDoor}
              />
            ))}
          </div>
          {gotCorrect && (
            <div style={{ fontSize: 13, fontFamily: MONO, color: "var(--neon-green)", letterSpacing: 2 }}>
              ✓ CORRECT! +100 pts
            </div>
          )}
          {tryPicked !== null && !gotCorrect && (
            <div style={{ fontSize: 12, fontFamily: MONO, color: "var(--neon-red)", letterSpacing: 1 }}>
              Try again — pick another door
            </div>
          )}
        </div>
      ),
    },
    {
      title: "BEAT THE CLOCK",
      desc: "A timer counts down each round. It changes color as time runs out — green, then orange with a warning, then red with 'HURRY'.",
      render: () => (
        <div style={{ width: 260 }}>
          <Timer timeLeft={demoTime} maxTime={DEMO_MAX} />
        </div>
      ),
    },
    {
      title: "LIVES & STREAKS",
      desc: "You have 3 lives. Wrong answers or timeouts lose a life. Get 5 correct in a row to earn a bonus life (max 3). Streaks of 3+ give bonus points!",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontFamily: MONO, color: "var(--text-dim)" }}>Lives:</span>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ fontSize: 22, color: i < 2 ? "var(--neon-red)" : "var(--text-dim)", opacity: i < 2 ? 1 : 0.3 }}>
                {i < 2 ? "\u25C6" : "\u25C7"}
              </span>
            ))}
          </div>
          <div style={{
            fontSize: 12, fontFamily: MONO, letterSpacing: 3,
            color: "var(--neon-yellow)", padding: "6px 16px", borderRadius: 20,
            background: "rgba(255,209,102,0.1)", border: "1px solid rgba(255,209,102,0.25)",
          }}>
            {"\uD83D\uDD25"} 5{"\u00D7"} STREAK
          </div>
          <div style={{ fontSize: 11, fontFamily: MONO, color: "var(--neon-green)" }}>
            {"\u2764\uFE0F"} +1 LIFE at 5-streak!
          </div>
        </div>
      ),
    },
    {
      title: "SCORING",
      desc: "Each correct answer earns 100 base points. Time remaining adds a bonus (time left × 6). Streaks of 3+ add n×12 bonus points.",
      render: () => (
        <div style={{
          display: "flex", flexDirection: "column", gap: 10, alignItems: "center",
          fontFamily: MONO, fontSize: 12,
        }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ textAlign: "center", padding: "8px 12px", background: "var(--surface)", borderRadius: 4 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--neon-green)" }}>+100</div>
              <div style={{ color: "var(--text-dim)", fontSize: 10 }}>BASE</div>
            </div>
            <div style={{ textAlign: "center", padding: "8px 12px", background: "var(--surface)", borderRadius: 4 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--neon-purple)" }}>+42</div>
              <div style={{ color: "var(--text-dim)", fontSize: 10 }}>TIME BONUS</div>
            </div>
            <div style={{ textAlign: "center", padding: "8px 12px", background: "var(--surface)", borderRadius: 4 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--neon-yellow)" }}>+36</div>
              <div style={{ color: "var(--text-dim)", fontSize: 10 }}>STREAK</div>
            </div>
          </div>
          <div style={{ color: "var(--text-dim)", fontSize: 11 }}>
            = <span style={{ color: "var(--neon-yellow)", fontWeight: 700 }}>178</span> total points
          </div>
        </div>
      ),
    },
    {
      title: "KEYBOARD SHORTCUTS",
      desc: "Press number keys 1-4 to quickly select doors. Press Escape to pause or resume the game.",
      render: () => (
        <div style={{
          display: "flex", flexDirection: "column", gap: 12, alignItems: "center",
          fontFamily: MONO,
        }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{
                width: 36, height: 36, borderRadius: 6,
                border: "2px solid var(--neon-green)50",
                background: "var(--surface)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 700, color: "var(--neon-green)",
              }}>{n}</div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: 1 }}>
            Select door 1-4
          </div>
          <div style={{
            display: "flex", gap: 8, alignItems: "center", marginTop: 8,
          }}>
            <div style={{
              padding: "6px 14px", borderRadius: 6,
              border: "2px solid var(--neon-purple)50",
              background: "var(--surface)",
              fontSize: 12, fontWeight: 700, color: "var(--neon-purple)",
            }}>ESC</div>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>Pause / Resume</span>
          </div>
          <div style={{
            display: "flex", gap: 8, alignItems: "center",
          }}>
            <div style={{
              padding: "6px 14px", borderRadius: 6,
              border: "2px solid var(--neon-yellow)50",
              background: "var(--surface)",
              fontSize: 12, fontWeight: 700, color: "var(--neon-yellow)",
            }}>{"\uD83D\uDCA1"}</div>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>Hint button: removes 1 wrong door</span>
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
