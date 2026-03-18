import { useState, useEffect, useCallback, useRef } from "react";
import { DIFF, STAGES, NEON, FONT, MONO } from "../constants";
import { makeEquation, timeForRound } from "../mathEngine";
import { sfxCorrect, sfxWrong, sfxTick, sfxTimeout } from "../sound";
import { Timer } from "../components/Timer";
import { GatewayDoor } from "../components/GatewayDoor";
import { Btn } from "../components/Btn";

export function GameScreen({ diff, startStage, sound, onFinish }) {
  const [stage, setStage] = useState(startStage);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [eq, setEq] = useState(null);
  const [doorSt, setDoorSt] = useState([]);
  const [tLeft, setTLeft] = useState(0);
  const [tMax, setTMax] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [intro, setIntro] = useState(true);
  const [feedback, setFeedback] = useState("");
  const timer = useRef(null);

  const stg = STAGES[stage - 1] || STAGES[0];

  const next = useCallback(() => {
    const e = makeEquation(diff, stage);
    const t = timeForRound(diff, stage);
    setEq(e); setDoorSt(e.options.map(() => "idle"));
    setTLeft(t); setTMax(t); setFrozen(false); setFeedback("");
  }, [diff, stage]);

  useEffect(() => {
    if (frozen || intro || !eq) return;
    timer.current = setInterval(() => {
      setTLeft(p => {
        if (p <= 3.1 && p > 2.9) sfxTick(sound);
        if (p <= 2.1 && p > 1.9) sfxTick(sound);
        if (p <= 1.1 && p > 0.9) sfxTick(sound);
        if (p <= 0.15) {
          clearInterval(timer.current);
          setFrozen(true);
          setLives(l => l - 1);
          setStreak(0);
          setFeedback("⏱ TIME'S UP");
          sfxTimeout(sound);
          setTimeout(() => setRound(r => r + 1), 1200);
          return 0;
        }
        return p - 0.1;
      });
    }, 100);
    return () => clearInterval(timer.current);
  }, [frozen, intro, eq, sound]);

  useEffect(() => {
    if (intro) return;
    if (lives <= 0) { onFinish({ score, stage, result: "gameover" }); return; }
    if (round >= stg.rounds) {
      if (stage >= 3) { onFinish({ score, stage, result: "win" }); return; }
      setStage(s => s + 1); setRound(0); setIntro(true); return;
    }
    next();
  }, [round, intro, lives]);

  const pick = (idx) => {
    if (frozen) return;
    clearInterval(timer.current);
    setFrozen(true);
    if (idx === eq.correctIdx) {
      const ns = streak + 1;
      const bonus = ns >= 3 ? ns * 12 : 0;
      const tb = Math.round(tLeft * 6);
      const pts = 100 + bonus + tb;
      setScore(s => s + pts); setStreak(ns);
      setDoorSt(prev => prev.map((_, i) => i === idx ? "correct" : "idle"));
      setFeedback(ns >= 3 ? `🔥 ${ns}× STREAK  +${pts}` : `+${pts}`);
      sfxCorrect(sound);
      setTimeout(() => setRound(r => r + 1), 750);
    } else {
      setStreak(0);
      setDoorSt(prev => prev.map((_, i) => i === idx ? "wrong" : i === eq.correctIdx ? "correct" : "idle"));
      setFeedback(`✗ WRONG — answer was ${eq.answer}`);
      sfxWrong(sound);
      setTimeout(() => setRound(r => r + 1), 1300);
    }
  };

  if (intro) {
    return (
      <div style={{ textAlign: "center", paddingTop: 48, animation: "fadeUp 0.5s ease-out" }}>
        <div style={{ fontSize: 11, fontFamily: MONO, letterSpacing: 4, color: "var(--muted)" }}>
          {DIFF[diff].label.toUpperCase()} MODE
        </div>
        <div style={{
          fontSize: 64, fontWeight: 700, fontFamily: MONO, color: stg.color, margin: "8px 0 2px",
          textShadow: `0 0 40px ${stg.color}60`,
        }}>0{stage}</div>
        <h2 style={{ fontSize: 30, fontWeight: 700, color: "var(--text)", margin: "0 0 4px", fontFamily: FONT }}>
          {stg.name}
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 4 }}>{stg.tagline}</p>
        <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 28, fontFamily: MONO }}>{stg.rounds} rounds</p>
        <Btn onClick={() => setIntro(false)} color={stg.color} big>ENTER</Btn>
      </div>
    );
  }

  if (!eq) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, paddingTop: 4, animation: "fadeIn 0.3s", position: "relative", zIndex: 1 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 480,
        fontSize: 12, fontFamily: MONO, color: "var(--muted)",
      }}>
        <span>STG {stage} · RND {round + 1}/{stg.rounds}</span>
        <span>{"❤️".repeat(lives)}{"🩶".repeat(Math.max(0, 3 - lives))}</span>
        <span style={{ color: "var(--neon-yellow)" }}>{score.toLocaleString()} PTS</span>
      </div>

      <Timer timeLeft={tLeft} maxTime={tMax} />

      <div style={{
        fontSize: 40, fontWeight: 700, fontFamily: MONO, color: "var(--text)",
        padding: "16px 32px", background: "var(--surface)", borderRadius: 14,
        border: `1px solid ${stg.color}22`, letterSpacing: 3,
        textShadow: `0 0 20px ${stg.color}30`, textAlign: "center", minWidth: 180,
      }}>
        {eq.display} = <span style={{ color: stg.color }}>?</span>
      </div>

      <div style={{
        height: 24, fontSize: 14, fontWeight: 700, fontFamily: MONO, letterSpacing: 1,
        color: feedback.startsWith("✗") || feedback.startsWith("⏱") ? "var(--neon-red)" : "var(--neon-yellow)",
      }}>{feedback}</div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
        {eq.options.map((v, i) => (
          <GatewayDoor key={`${round}-${i}`} value={v} color={NEON[i % NEON.length]}
            idx={i} onClick={pick} state={doorSt[i]} disabled={frozen} />
        ))}
      </div>

      {streak >= 2 && (
        <div style={{ fontSize: 11, fontFamily: MONO, letterSpacing: 3, color: "var(--neon-green)" }}>
          🔥 STREAK {streak}
        </div>
      )}
    </div>
  );
}
