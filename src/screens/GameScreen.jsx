import { useState, useEffect, useCallback, useRef } from "react";
import { DIFF, STAGES, NEON, MONO, DISPLAY } from "../appConstants";
import { makeEquation } from "../mathEngine";
import { convertDisplay, convertNumber } from "../numberStyles";
import { sfxDoorUnlock, sfxFootstep, sfxWrong } from "../sound";
import { GatewayCave } from "../components/GatewayCave";
import { Btn } from "../components/Btn";

export function GameScreen({ diff, startStage, sound, numeral, onFinish, onQuit }) {
  const [stage, setStage] = useState(startStage);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [eq, setEq] = useState(null);
  const [doorSt, setDoorSt] = useState([]);
  const [frozen, setFrozen] = useState(false);
  const [intro, setIntro] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [scoreBreakdown, setScoreBreakdown] = useState("");
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [eliminated, setEliminated] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const roundLog = useRef([]);
  const stageScores = useRef({});
  const bestStreak = useRef(0);
  const totalCorrect = useRef(0);
  const totalWrong = useRef(0);

  const stg = STAGES[stage - 1] || STAGES[0];
  const doorCount = DIFF[diff].doors;

  const togglePause = useCallback(() => {
    if (intro) return;
    setPaused(p => !p);
  }, [intro]);

  const handleResume = () => {
    setPaused(false);
  };

  const handleRestart = () => {
    setPaused(false);
    setStage(startStage);
    setRound(0);
    setScore(0);
    setStreak(0);
    setIntro(true);
    setAnsweredCorrectly(false);
    roundLog.current = [];
    stageScores.current = {};
    bestStreak.current = 0;
    totalCorrect.current = 0;
    totalWrong.current = 0;
  };

  const next = useCallback(() => {
    const e = makeEquation(diff, stage);
    setEq(e); setDoorSt(e.options.map(() => "idle"));
    setFrozen(false); setFeedback(""); setScoreBreakdown("");
    setAnsweredCorrectly(false);
    setHintUsed(false); setEliminated([]);
  }, [diff, stage]);

  const buildResult = (result) => ({
    score, stage, result,
    roundLog: roundLog.current,
    bestStreak: bestStreak.current,
    totalCorrect: totalCorrect.current,
    totalWrong: totalWrong.current,
    stageScores: stageScores.current,
  });

  useEffect(() => {
    if (intro) return;
    if (round >= stg.rounds) {
      if (stage >= 3) { onFinish(buildResult("win")); return; }
      setStage(s => s + 1); setRound(0); setIntro(true);
      return;
    }
    next();
  }, [round, intro]); // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (idx) => {
    if (frozen || eliminated.includes(idx)) return;
    setFrozen(true);
    if (idx === eq.correctIdx) {
      setAnsweredCorrectly(true);
      const ns = streak + 1;
      if (ns > bestStreak.current) bestStreak.current = ns;
      const bonus = ns >= 3 ? ns * 12 : 0;
      const pts = 100 + bonus;
      setScore(s => s + pts); setStreak(ns);
      stageScores.current[stage] = (stageScores.current[stage] || 0) + pts;
      setDoorSt(prev => prev.map((_, i) => i === idx ? "correct" : "idle"));

      // Score breakdown
      const parts = ["+100"];
      if (bonus > 0) parts.push(`+${bonus} streak`);
      setScoreBreakdown(parts.join("  "));

      setFeedback(ns >= 3 ? `\uD83D\uDD25 ${ns}\u00D7 STREAK  +${pts}` : `+${pts}`);
      sfxDoorUnlock(sound);
      totalCorrect.current++;
      roundLog.current.push({ stage, round, result: "correct", points: pts });

      setTimeout(() => setRound(r => r + 1), 1000);
    } else {
      setAnsweredCorrectly(false);
      setStreak(0);
      setDoorSt(prev => prev.map((_, i) => i === idx ? "wrong" : "idle"));
      const reason = eq.reasonMap?.[eq.options[idx]];
      setFeedback(`\u2717 WRONG \u2014 answer was ${convertNumber(eq.answer, numeral)}${reason ? "\n" + reason : ""}`);
      sfxWrong(sound);
      totalWrong.current++;
      roundLog.current.push({ stage, round, result: "wrong" });
      setTimeout(() => setRound(r => r + 1), 1300);
    }
  };

  // Hint: eliminate one wrong rock
  const useHint = () => {
    if (hintUsed || frozen || !eq) return;
    setHintUsed(true);
    const wrongIdxs = eq.options
      .map((_, i) => i)
      .filter(i => i !== eq.correctIdx && !eliminated.includes(i));
    if (wrongIdxs.length > 0) {
      const toEliminate = wrongIdxs[Math.floor(Math.random() * wrongIdxs.length)];
      setEliminated(prev => [...prev, toEliminate]);
    }
  };

  const useOpenSesame = () => {
    if (frozen || !eq) return;
    pick(eq.correctIdx);
  };

  const handleEnter = () => {
    sfxFootstep(sound);
    setExiting(true);
    setTimeout(() => { setExiting(false); setIntro(false); }, 400);
  };

  if (intro) {
    return (
      <div style={{
        textAlign: "center", paddingTop: 48, position: "relative", overflow: "hidden",
        animation: exiting ? "none" : "fadeUp 0.5s ease-out",
      }}>
        {exiting && (
          <>
            <div style={{
              position: "absolute", top: 0, left: 0, right: "50%", bottom: 0,
              background: "var(--bg)", zIndex: 10,
              animation: "doorOpenLeft 0.4s ease-in forwards",
            }} />
            <div style={{
              position: "absolute", top: 0, left: "50%", right: 0, bottom: 0,
              background: "var(--bg)", zIndex: 10,
              animation: "doorOpenRight 0.4s ease-in forwards",
            }} />
          </>
        )}
        <div style={{ fontSize: 12, fontFamily: MONO, letterSpacing: 4, color: "var(--text-dim)" }}>
          {DIFF[diff].label.toUpperCase()} MODE
        </div>
        <div style={{
          fontSize: 120, fontWeight: 700, fontFamily: DISPLAY, color: stg.color, margin: "0", lineHeight: 1,
          textShadow: `0 0 60px ${stg.color}50`,
        }}>0{stage}</div>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: "var(--text)", margin: "0 0 4px", fontFamily: DISPLAY, letterSpacing: 3 }}>
          {stg.name}
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 4 }}>{stg.tagline}</p>
        <div style={{
          fontSize: 12, fontFamily: MONO, color: "var(--text-dim)", marginBottom: 28,
          display: "flex", justifyContent: "center", gap: 12,
        }}>
          <span>{stg.rounds} ROUNDS</span>
          <span style={{ color: "var(--border)" }}>|</span>
          <span>{DIFF[diff].label.toUpperCase()} MODE</span>
        </div>
        <Btn onClick={handleEnter} color={stg.color} big>ENTER</Btn>
      </div>
    );
  }

  if (!eq) return null;

  const isBadFeedback = feedback.startsWith("\u2717") || feedback.startsWith("\u23F1");
  const hasCorrectSelection = answeredCorrectly;

  // Equation display font — min 28px
  const eqDisplay = convertDisplay(eq.display, numeral);
  const eqFontSize = Math.max(28, eqDisplay.length > 20 ? 28 : eqDisplay.length > 14 ? 30 : 40);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
      paddingTop: 4, animation: "fadeIn 0.3s", position: "relative", zIndex: 1,
    }}>
      {/* Visually-hidden aria-live region for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Score: {score.toLocaleString()} points.
        {streak >= 3 ? ` Streak: ${streak}.` : ""}
      </div>

      {/* HUD Control Panel Bar */}
      <div style={{
        display: "flex", width: "100%", maxWidth: 480,
        background: "var(--surface-raised)", borderRadius: 4,
        border: "1px solid var(--border)", overflow: "hidden",
        fontSize: 12, fontFamily: MONO,
      }}>
        {/* Stage/Round cell */}
        <div style={{
          flex: 1, padding: "8px 12px",
          borderRight: "1px solid var(--border)",
        }}>
          <div style={{ color: stg.color, fontWeight: 700, fontSize: 13 }}>Stage {stage}</div>
          <div style={{ color: "var(--text-dim)", fontSize: 11 }}>Round {round + 1}/{stg.rounds}</div>
        </div>

        {/* Score cell */}
        <div style={{
          flex: 1, padding: "8px 12px", textAlign: "right", borderRight: "1px solid var(--border)",
        }}>
          <div style={{
            color: "var(--neon-yellow)", fontWeight: 700, fontSize: 14,
            textShadow: "0 0 12px rgba(255,209,102,0.3)",
            transition: "transform 0.15s",
          }}>{score.toLocaleString()}</div>
          <div style={{ color: "var(--text-dim)", fontSize: 11 }}>Score</div>
        </div>

        {/* Pause button */}
        <button
          onClick={togglePause}
          aria-label="Pause game"
          style={{
            padding: "8px 12px", background: "none", border: "none",
            borderLeft: "1px solid var(--border)",
            color: "var(--text-dim)", fontSize: 16, fontFamily: MONO,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--neon-green)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
        >
          {"\u23F8"}
        </button>
      </div>

      {/* Equation screen panel — hidden when paused */}
      {paused ? (
        <div style={{
          fontSize: 18, fontWeight: 700, fontFamily: MONO, color: "var(--text-dim)",
          padding: "18px 32px", background: "var(--bg-deep)", borderRadius: 4,
          border: `1px solid ${stg.color}22`, letterSpacing: 3,
          textAlign: "center", minWidth: 200,
          boxShadow: `inset 0 0 40px ${stg.color}08`,
        }}>
          PAUSED
        </div>
      ) : (
        <div style={{
          fontSize: eqFontSize,
          fontWeight: 700, fontFamily: MONO, color: "var(--text)",
          padding: "18px 32px", background: "var(--bg-deep)", borderRadius: 4,
          border: `1px solid ${stg.color}22`, letterSpacing: 3,
          textShadow: `0 0 20px ${stg.color}30`, textAlign: "center", minWidth: 200,
          boxShadow: `inset 0 0 40px ${stg.color}08`,
          wordBreak: "break-word",
        }}
          aria-label={`Solve: ${eq.display} equals what?`}>
          {eqDisplay} = <span style={{ color: stg.color, animation: "pulse 2s ease-in-out infinite" }}>?</span>
        </div>
      )}

      {/* Feedback line */}
      <div key={feedback} role="status" aria-live="assertive" style={{
        minHeight: 24, fontSize: 14, fontWeight: 700, fontFamily: MONO, letterSpacing: 1,
        color: isBadFeedback ? "var(--neon-red)" : "var(--neon-yellow)",
        animation: feedback ? "scaleIn 0.25s ease-out" : "none",
        textAlign: "center",
      }}>
        {feedback.split("\n").map((line, i) =>
          i === 0 ? <span key={i}>{line}</span>
            : <div key={i} style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 400, marginTop: 4, letterSpacing: 0 }}>{line}</div>
        )}
        {scoreBreakdown && !isBadFeedback && (
          <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 400, marginTop: 2, letterSpacing: 0 }}>
            {scoreBreakdown}
          </div>
        )}
      </div>

      {/* Door area — hidden when paused */}
      {!paused && (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {eq.options
            .map((v, i) => ({ v, i }))
            .filter(({ i }) => !hasCorrectSelection || i === eq.correctIdx)
            .map(({ v, i }) => (
              <GatewayCave
                key={`${round}-${i}`}
                value={v}
                color={NEON[i % NEON.length]}
                idx={i}
                onClick={pick}
                state={doorSt[i]}
                disabled={frozen}
                numeral={numeral}
                eliminated={eliminated.includes(i)}
                doorCount={doorCount}
              />
            ))}
        </div>
      )}

      {/* Hint button + streak badge */}
      {!paused && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", minHeight: 96 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {!frozen && !hintUsed && (
              <button onClick={useHint} style={{
                fontSize: 13, fontFamily: MONO, letterSpacing: 2,
                color: "var(--neon-purple)", padding: "8px 20px", borderRadius: 22,
                background: "rgba(123,97,255,0.1)", border: "1px solid rgba(123,97,255,0.3)",
                fontWeight: 700, transition: "all 0.2s",
              }}
                aria-label="Use hint: eliminates one wrong rock"
                onMouseEnter={e => e.currentTarget.style.background = "rgba(123,97,255,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(123,97,255,0.1)"}
              >
                {"\uD83D\uDCA1"} HINT
              </button>
            )}
            {hintUsed && !frozen && (
              <span style={{ fontSize: 10, fontFamily: MONO, color: "var(--text-dim)", letterSpacing: 1 }}>
                HINT USED
              </span>
            )}
            {!frozen && (
              <button
                onClick={useOpenSesame}
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
                  transition: "all 0.2s",
                }}
                aria-label="Open Sesame: automatically choose the correct answer and continue"
                onMouseEnter={e => e.currentTarget.style.background = "rgba(232,212,192,0.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(232,212,192,0.12)"}
              >
                OPEN SESAME
              </button>
            )}
          </div>

          {/* Streak multiplier badge */}
          {streak >= 2 && (
            <div style={{
              fontSize: 11, fontFamily: MONO, letterSpacing: 3,
              color: "var(--neon-yellow)",
              padding: "4px 14px", borderRadius: 20,
              minHeight: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: streak >= 5
                ? "linear-gradient(90deg, rgba(255,209,102,0.15), rgba(254,95,85,0.15))"
                : "rgba(255,209,102,0.1)",
              border: streak >= 5
                ? "1px solid rgba(254,95,85,0.4)"
                : "1px solid rgba(255,209,102,0.25)",
              animation: streak >= 5 ? "pulse 1s infinite" : "none",
            }}>
              {"\uD83D\uDD25"} {streak}{"\u00D7"} STREAK
            </div>
          )}
        </div>
      )}

      {/* Pause overlay modal */}
      {paused && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          padding: "24px 0", animation: "fadeIn 0.2s",
        }} role="dialog" aria-label="Game paused">
          <div style={{
            fontSize: 12, fontFamily: MONO, color: "var(--text-dim)",
            letterSpacing: 4, marginBottom: 4,
          }}>PRESS ESC TO RESUME</div>
          <Btn onClick={handleResume} color="#00F5D4">Resume</Btn>
          <Btn onClick={handleRestart} color="#FFD166">Restart</Btn>
          <Btn onClick={onQuit} color="#6B7A94">Quit to Menu</Btn>
        </div>
      )}
    </div>
  );
}
