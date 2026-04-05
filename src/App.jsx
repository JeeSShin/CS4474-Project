import { useState, useEffect, useRef, useCallback, createContext } from "react";
import { DIFF, STAGES, FONT } from "./appConstants";
import { globalCSS } from "./styles";
import { sfxNav } from "./sound";
import { RealisticCaveBG } from "./components/RealisticCaveBG";
import { MenuScreen } from "./screens/MenuScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { StageSelectScreen } from "./screens/StageSelectScreen";
import { TutorialScreen } from "./screens/TutorialScreen";
import { GameScreen } from "./screens/GameScreen";
import { ResultsScreen } from "./screens/ResultsScreen";

export const SoundContext = createContext(true);

function loadStorage(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function saveStorage(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

const SCREEN_TITLES = {
  menu: "Open Sesame",
  settings: "Settings — Open Sesame",
  stages: "Stage Select — Open Sesame",
  tutorial: "Tutorial — Open Sesame",
  game: "Playing — Open Sesame",
  results: "Results — Open Sesame",
};

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [diff, setDiff] = useState(() => {
    const savedDiff = loadStorage("eq-gateway-settings", null)?.diff;
    return DIFF[savedDiff] ? savedDiff : "beginner";
  });
  const [sound, setSound] = useState(() => loadStorage("eq-gateway-settings", null)?.sound ?? true);
  const [numeral, setNumeral] = useState(() => loadStorage("eq-gateway-settings", null)?.numeral || "arabic");
  const [startStage, setStartStage] = useState(1);
  const [result, setResult] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(() => loadStorage("eq-gateway-settings", null)?.reduceMotion ?? false);
  const [highScores, setHighScores] = useState(() => loadStorage("eq-gateway-highscores", []));
  const [stageBests, setStageBests] = useState(() => loadStorage("eq-gateway-stagebests", {}));
  const mainRef = useRef(null);
  const [returning] = useState(() => {
    try { return localStorage.getItem("eq-gateway-visited") === "1"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("eq-gateway-visited", "1"); } catch {}
  }, []);

  useEffect(() => {
    saveStorage("eq-gateway-settings", { diff, sound, numeral, reduceMotion });
  }, [diff, sound, numeral, reduceMotion]);

  useEffect(() => {
    document.title = "Open Sesame: Math Rocks";
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [screen]);

  const startGame = (st = 1) => { setStartStage(st); setGameKey(k => k + 1); setScreen("game"); };

  const handleFinish = useCallback((r) => {
    const entry = { score: r.score, diff, date: new Date().toISOString(), stages: r.stage, result: r.result };
    setHighScores(prev => {
      const updated = [...prev, entry].sort((a, b) => b.score - a.score).slice(0, 5);
      saveStorage("eq-gateway-highscores", updated);
      return updated;
    });

    if (r.stageScores) {
      setStageBests(prev => {
        const newBests = { ...prev };
        for (const [stId, sc] of Object.entries(r.stageScores)) {
          const key = `${diff}-${stId}`;
          if (!newBests[key] || sc > newBests[key]) newBests[key] = sc;
        }
        saveStorage("eq-gateway-stagebests", newBests);
        return newBests;
      });
    }

    setResult(r);
    setScreen("results");
  }, [diff]);

  const navigate = useCallback((s) => { sfxNav(sound); setScreen(s); }, [sound]);

  const accentColor = screen === "game" ? (STAGES[(startStage || 1) - 1]?.color || "#FFD700") : "#FFD700";

  return (
    <SoundContext.Provider value={sound}>
    <div className={reduceMotion ? "reduce-motion" : ""} style={{
      minHeight: "100vh", background: "var(--bg)", fontFamily: FONT,
      color: "var(--text)", padding: "16px 20px", display: "flex", flexDirection: "column", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <style>{globalCSS}</style>

      {/* Skip navigation link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <RealisticCaveBG accentColor={accentColor} running={screen === "game"} />

      <main id="main-content" ref={mainRef} tabIndex={-1}
        style={{ width: "100%", maxWidth: 600, position: "relative", zIndex: 1, outline: "none" }}>
        {screen === "menu" && (
          <MenuScreen onPlay={() => startGame(1)} onTutorial={() => navigate("tutorial")}
            onSettings={() => navigate("settings")}
            highScores={highScores} returning={returning} />
        )}
        {screen === "settings" && (
          <SettingsScreen diff={diff} setDiff={setDiff} sound={sound} setSound={setSound}
            numeral={numeral} setNumeral={setNumeral}
            onBack={() => navigate("menu")} />
        )}
        {screen === "stages" && (
          <StageSelectScreen onSelect={(s) => startGame(s)} onBack={() => navigate("menu")}
            stageBests={stageBests} diff={diff} />
        )}
        {screen === "tutorial" && <TutorialScreen numeral={numeral} sound={sound} onBack={() => navigate("menu")} />}
        {screen === "game" && (
          <GameScreen key={gameKey} diff={diff} startStage={startStage} sound={sound}
            numeral={numeral} onFinish={handleFinish}
            onQuit={() => setScreen("menu")} />
        )}
        {screen === "results" && result && (
          <ResultsScreen data={result} onMenu={() => setScreen("menu")}
            onRetry={() => startGame(1)}
            onRetryFromStage={(st) => startGame(st)}
            highScores={highScores} />
        )}
      </main>
    </div>
    </SoundContext.Provider>
  );
}
