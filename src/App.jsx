import { useState } from "react";
import { STAGES, FONT } from "./constants";
import { globalCSS } from "./styles";
import { CorridorBG } from "./components/CorridorBG";
import { MenuScreen } from "./screens/MenuScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { StageSelectScreen } from "./screens/StageSelectScreen";
import { TutorialScreen } from "./screens/TutorialScreen";
import { GameScreen } from "./screens/GameScreen";
import { ResultsScreen } from "./screens/ResultsScreen";

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [diff, setDiff] = useState("beginner");
  const [sound, setSound] = useState(true);
  const [numeral, setNumeral] = useState("arabic");
  const [startStage, setStartStage] = useState(1);
  const [result, setResult] = useState(null);
  const [gameKey, setGameKey] = useState(0);

  const startGame = (st = 1) => { setStartStage(st); setGameKey(k => k + 1); setScreen("game"); };

  const accentColor = screen === "game" ? (STAGES[(startStage || 1) - 1]?.color || "#00F5D4") : "#00F5D4";

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg)", fontFamily: FONT,
      color: "var(--text)", padding: "16px", display: "flex", flexDirection: "column", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <style>{globalCSS}</style>
      <CorridorBG accentColor={accentColor} running={screen === "game"} />

      <div style={{ width: "100%", maxWidth: 560, position: "relative", zIndex: 1 }}>
        {screen === "menu" && (
          <MenuScreen onPlay={() => startGame(1)} onTutorial={() => setScreen("tutorial")}
            onStages={() => setScreen("stages")} onSettings={() => setScreen("settings")} />
        )}
        {screen === "settings" && (
          <SettingsScreen diff={diff} setDiff={setDiff} sound={sound} setSound={setSound}
            numeral={numeral} setNumeral={setNumeral} onBack={() => setScreen("menu")} />
        )}
        {screen === "stages" && (
          <StageSelectScreen onSelect={(s) => startGame(s)} onBack={() => setScreen("menu")} />
        )}
        {screen === "tutorial" && <TutorialScreen numeral={numeral} onBack={() => setScreen("menu")} />}
        {screen === "game" && (
          <GameScreen key={gameKey} diff={diff} startStage={startStage} sound={sound}
            numeral={numeral} onFinish={(r) => { setResult(r); setScreen("results"); }} />
        )}
        {screen === "results" && result && (
          <ResultsScreen data={result} onMenu={() => setScreen("menu")}
            onRetry={() => startGame(1)} />
        )}
      </div>
    </div>
  );
}
