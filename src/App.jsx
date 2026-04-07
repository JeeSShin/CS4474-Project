import { useState, useEffect, useRef, useCallback, createContext } from "react";
import { DIFF, STAGES, FONT } from "./appConstants";
import { globalCSS } from "./styles";
import { sfxNav } from "./sound";
import { CaveBG } from "./components/CaveBG";
import { MenuScreen } from "./screens/MenuScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { TutorialScreen } from "./screens/TutorialScreen";
import { GameScreen } from "./screens/GameScreen";
import { ResultsScreen } from "./screens/ResultsScreen";

// Context to share sound setting with child components
export const SoundContext = createContext(true);
const SETTINGS_KEY = "open-sesame-settings";
const VISITED_KEY = "open-sesame-visited";

// LocalStorage helpers with error handling
function loadStorage(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
}
function saveStorage(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

// Main app component - manages screens, settings, and game state
export default function App() {
  const [screen, setScreen] = useState("menu");
  const [diff, setDiff] = useState(() => {
    const savedDiff = loadStorage(SETTINGS_KEY, null)?.diff;
    return DIFF[savedDiff] ? savedDiff : "beginner";
  });
  const [sound, setSound] = useState(() => loadStorage(SETTINGS_KEY, null)?.sound ?? true);
  const [numeral, setNumeral] = useState(() => loadStorage(SETTINGS_KEY, null)?.numeral || "arabic");
  const [startStage, setStartStage] = useState(1);
  const [result, setResult] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(() => loadStorage(SETTINGS_KEY, null)?.reduceMotion ?? false);
  const mainRef = useRef(null);
  const [returning] = useState(() => {
    try { return localStorage.getItem(VISITED_KEY) === "1"; } catch { return false; }
  });

  useEffect(() => {
    try {
      localStorage.setItem(VISITED_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    saveStorage(SETTINGS_KEY, { diff, sound, numeral, reduceMotion });
  }, [diff, sound, numeral, reduceMotion]);

  useEffect(() => {
    document.title = "Open Sesame: Math Caves";
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [screen]);

  // Starts a new game from specified stage, increments key to force remount
  const startGame = (st = 1) => { setStartStage(st); setGameKey(k => k + 1); setScreen("game"); };

  // Stores the finished game result and navigates to the results screen
  const handleFinish = useCallback((r) => {
    setResult(r);
    setScreen("results");
  }, []);

  // Navigates between screens with sound effect
  const navigate = useCallback((s) => { sfxNav(sound); setScreen(s); }, [sound]);

  // Escape key returns to menu from secondary screens
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (!["settings", "tutorial", "results"].includes(screen)) return;
      e.preventDefault();
      navigate("menu");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [screen, navigate]);

  const accentColor = screen === "game" ? (STAGES[(startStage || 1) - 1]?.color || "#FFD700") : "#FFD700";
// The main app component manages the overall state of the game, including current screen, settings, and game results.
//  It also handles navigation and persists settings  
  return (
    <SoundContext.Provider value={sound}>
    <div className={reduceMotion ? "reduce-motion" : ""} style={{
      minHeight: "100vh", background: "var(--bg)", fontFamily: FONT,
      color: "var(--text)", padding: "16px 20px", display: "flex", flexDirection: "column", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <style>{globalCSS}</style>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <CaveBG accentColor={accentColor} running={screen === "game"} />

      <main id="main-content" ref={mainRef} tabIndex={-1}
        style={{ width: "100%", maxWidth: 600, position: "relative", zIndex: 1, outline: "none" }}>
        {screen === "menu" && (
          <MenuScreen onPlay={() => startGame(1)} onTutorial={() => navigate("tutorial")}
            onSettings={() => navigate("settings")}
            returning={returning} />
        )}
        {screen === "settings" && (
          <SettingsScreen diff={diff} setDiff={setDiff}
            numeral={numeral} setNumeral={setNumeral}
            onBack={() => navigate("menu")} />
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
            onRetryFromStage={(st) => startGame(st)} />
        )}
      </main>
    </div>
    </SoundContext.Provider>
  );
}

