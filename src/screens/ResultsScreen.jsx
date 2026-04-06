import { useState, useEffect, useRef, useMemo } from "react";
import { STAGES, MONO, DISPLAY } from "../appConstants";
import { Btn } from "../components/button";

function TreasureFoundVisual({ color }) {
  return (
    <div style={{
      width: 80, height: 80, position: "relative", margin: "0 auto 8px",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 62, height: 48, position: "relative",
      }}>
        <div style={{
          position: "absolute", left: 6, right: 6, bottom: 4,
          height: 24, borderRadius: "6px 6px 10px 10px",
          border: `2px solid ${color}`,
          background: `linear-gradient(180deg, ${color}38, ${color}18)`,
          boxShadow: `0 0 18px ${color}30`,
        }}>
          <div style={{
            position: "absolute", left: "50%", top: 2, transform: "translateX(-50%)",
            width: 10, height: 18, borderLeft: `2px solid ${color}80`, borderRight: `2px solid ${color}80`,
          }} />
        </div>
        <div style={{
          position: "absolute", left: 10, right: 10, top: 4,
          height: 18, borderRadius: "14px 14px 6px 6px",
          border: `2px solid ${color}`,
          background: `linear-gradient(180deg, ${color}2E, ${color}12)`,
          transform: "perspective(120px) rotateX(-40deg)",
          transformOrigin: "bottom center",
        }} />
        <div style={{
          position: "absolute", top: 10, left: 14, width: 8, height: 8,
          background: "var(--neon-yellow)", transform: "rotate(45deg)",
          boxShadow: "0 0 14px rgba(255,209,102,0.9)",
        }} />
        <div style={{
          position: "absolute", top: 6, left: 28, width: 10, height: 10,
          background: "var(--neon-yellow)", transform: "rotate(45deg)",
          boxShadow: "0 0 16px rgba(255,209,102,0.95)",
        }} />
        <div style={{
          position: "absolute", top: 12, right: 12, width: 7, height: 7,
          background: "var(--neon-yellow)", transform: "rotate(45deg)",
          boxShadow: "0 0 12px rgba(255,209,102,0.85)",
        }} />
      </div>
    </div>
  );
}

function LockedGateVisual({ color }) {
  return (
    <div style={{
      width: 80, height: 80, position: "relative", margin: "0 auto 8px",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 48, height: 6, borderRadius: 2,
          background: `${color}60`, border: `1px solid ${color}`,
        }} />
      ))}
    </div>
  );
}

function StatBox({ label, value, color = "var(--neon-green)" }) {
  return (
    <div style={{
      flex: 1, minWidth: 80, padding: "10px 8px", textAlign: "center",
      background: "var(--surface)", borderRadius: 4, border: "1px solid var(--border)",
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, fontFamily: DISPLAY, color }}>{value}</div>
      <div style={{ fontSize: 10, fontFamily: MONO, color: "var(--text-dim)", letterSpacing: 1, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function StageBar({ stageId, correct, total }) {
  const s = STAGES[stageId - 1];
  if (!s) return null;
  const pct = total > 0 ? (correct / total * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontFamily: MONO }}>
      <span style={{ color: s.color, fontWeight: 700, minWidth: 70 }}>{s.name}</span>
      <div style={{
        flex: 1, height: 6, borderRadius: 3, background: "var(--surface2)", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 3, width: `${pct}%`,
          background: s.color, transition: "width 0.5s",
        }} />
      </div>
      <span style={{ color: "var(--text-dim)", minWidth: 30, textAlign: "right" }}>{correct}/{total}</span>
    </div>
  );
}

export function ResultsScreen({ data, onMenu, onRetry, onRetryFromStage, highScores = [] }) {
  const win = data.result === "win";
  const [displayScore, setDisplayScore] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const target = data.score;
    const duration = 1500;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(target * eased));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [data.score]);

  const { correct, wrong, accuracy, bestStreakVal, stageBreakdown } = useMemo(() => {
    const log = data.roundLog ?? [];
    const c = data.totalCorrect ?? log.filter(r => r.result === "correct").length;
    const w = data.totalWrong ?? log.filter(r => r.result === "wrong").length;
    const total = c + w;
    const acc = total > 0 ? Math.round((c / total) * 100) : 0;
    const breakdown = {};
    for (const r of log) {
      if (!breakdown[r.stage]) breakdown[r.stage] = { correct: 0, total: 0 };
      breakdown[r.stage].total++;
      if (r.result === "correct") breakdown[r.stage].correct++;
    }
    return { correct: c, wrong: w, accuracy: acc, bestStreakVal: data.bestStreak ?? 0, stageBreakdown: breakdown };
  }, [data]);

  const prevBest = highScores.length > 1 ? highScores[1]?.score : 0;
  const isNewHighScore = highScores.length > 0 && highScores[0]?.score === data.score && data.score > (prevBest ?? 0);

  return (
    <div style={{ textAlign: "center", paddingTop: 40, animation: "fadeUp 0.6s ease-out" }}>
      {win ? (
        <div>
          <TreasureFoundVisual color="var(--neon-green)" />
        </div>
      ) : (
        <div>
          <LockedGateVisual color="var(--neon-red)" />
        </div>
      )}

      <h2 style={{
        fontSize: 40, fontWeight: 700, fontFamily: DISPLAY, margin: "0 0 6px", letterSpacing: 3,
        color: win ? "var(--neon-green)" : "var(--neon-red)",
        animation: win ? "glow 2s ease-in-out infinite" : "none",
      }}>{win ? "TREASURE FOUND" : "LOCKOUT"}</h2>

      <p style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 4 }}>
        {win ? "Every Cave Conquered" : `Reached Stage ${data.stage}`}
      </p>

      {isNewHighScore && (
        <div style={{
          fontSize: 14, fontFamily: MONO, fontWeight: 700, letterSpacing: 3,
          color: "var(--neon-yellow)", margin: "8px 0",
          animation: "pulse 1s infinite",
        }}>{"\u2B50"} NEW HIGH SCORE! {"\u2B50"}</div>
      )}

      <div style={{ position: "relative" }}>
        {data.score > 0 && (
          <div style={{ fontSize: 12, fontFamily: MONO, color: "var(--text-dim)", marginBottom: 4 }}>
            Final Score: <span style={{ color: "var(--neon-yellow)", fontWeight: 600 }}>{data.score.toLocaleString()}</span>
          </div>
        )}
        <div style={{
          fontSize: 64, fontWeight: 700, fontFamily: DISPLAY, color: "var(--neon-yellow)",
          margin: "4px 0 16px", textShadow: "0 0 30px rgba(255,209,102,0.4)",
          animation: "fadeUp 0.5s ease-out 0.3s both",
        }}>{displayScore.toLocaleString()}</div>
      </div>

      <div style={{
        display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
        marginBottom: 16, animation: "fadeUp 0.5s ease-out 0.4s both",
      }}>
        <StatBox label="ACCURACY" value={`${accuracy}%`} color={accuracy >= 80 ? "var(--neon-green)" : accuracy >= 50 ? "var(--neon-yellow)" : "var(--neon-red)"} />
        <StatBox label="CORRECT" value={correct} color="var(--neon-green)" />
        <StatBox label="WRONG" value={wrong} color="var(--neon-red)" />
        <StatBox label="BEST STREAK" value={bestStreakVal} color="var(--neon-yellow)" />
      </div>

      {Object.keys(stageBreakdown).length > 0 && (
        <div style={{
          maxWidth: 340, margin: "0 auto 20px", display: "flex", flexDirection: "column", gap: 6,
          animation: "fadeUp 0.5s ease-out 0.5s both",
        }}>
          {Object.entries(stageBreakdown).map(([stId, d]) => (
            <StageBar key={stId} stageId={Number(stId)} correct={d.correct} total={d.total} />
          ))}
        </div>
      )}

      {highScores.length > 0 && (
        <div style={{
          fontSize: 11, fontFamily: MONO, color: "var(--text-dim)", marginBottom: 16,
          animation: "fadeUp 0.5s ease-out 0.55s both",
        }}>
          Personal Best: <span style={{ color: "var(--neon-yellow)", fontWeight: 700 }}>
            {highScores[0].score.toLocaleString()}
          </span>
        </div>
      )}

      <div style={{
        display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
        animation: "fadeUp 0.5s ease-out 0.6s both",
      }}>
        <Btn onClick={onRetry} color="#00F5D4">Play from Start</Btn>
        {!win && data.stage > 1 && onRetryFromStage && (
          <Btn onClick={() => onRetryFromStage(data.stage)} color="#FFD166">
            Retry Stage {data.stage}
          </Btn>
        )}
        <Btn onClick={onMenu} color="#7B61FF">Main Menu</Btn>
      </div>
    </div>
  );
}
