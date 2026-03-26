import { DIFF, FONT, MONO, DISPLAY } from "../constants";
import { NUMERAL_SYSTEMS } from "../numerals";
import { Btn } from "../components/Btn";
import { sfxToggle } from "../sound";

function SettingPanel({ title, accentColor = "var(--neon-green)", children }) {
  return (
    <div style={{
      background: "var(--surface-raised)", borderRadius: 4, padding: "16px 20px",
      position: "relative", overflow: "hidden",
      border: "1px solid var(--border)", marginBottom: 16,
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
        background: accentColor, borderRadius: "4px 0 0 4px",
      }} />
      <div style={{
        fontSize: 12, letterSpacing: 4, color: "var(--text-dim)", fontFamily: MONO,
        marginBottom: 12, paddingLeft: 8,
      }}>{title}</div>
      <div style={{ paddingLeft: 8 }}>{children}</div>
    </div>
  );
}

function OptionCard({ selected, onClick, color = "var(--neon-green)", children }) {
  return (
    <button onClick={onClick}
      role="radio" aria-checked={selected}
      style={{
        padding: "12px 16px", borderRadius: 4,
        border: selected ? `2px solid ${color}` : "2px solid var(--border)",
        background: selected ? `${color}10` : "var(--surface)",
        color: selected ? color : "var(--text-dim)", fontWeight: 700,
        fontFamily: FONT, fontSize: 13, transition: "all 0.2s",
        textAlign: "left", flex: 1, minWidth: 120,
        position: "relative",
      }}>
      {/* Checkmark for selected */}
      {selected && (
        <span style={{
          position: "absolute", top: 6, right: 8,
          fontSize: 14, color, lineHeight: 1,
        }} aria-hidden="true">{"\u2713"}</span>
      )}
      {children}
    </button>
  );
}

function ToggleSwitch({ checked, onToggle, label }) {
  return (
    <button onClick={onToggle} role="switch" aria-checked={checked} aria-label={label} style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "none", border: "none", padding: 0,
    }}>
      <div style={{
        width: 48, height: 24, borderRadius: 12, position: "relative",
        background: checked ? "var(--neon-green)" : "var(--surface2)",
        border: `1px solid ${checked ? "var(--neon-green)" : "var(--border)"}`,
        transition: "all 0.2s",
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: "50%",
          background: "#fff", position: "absolute", top: 2,
          left: checked ? 26 : 2,
          transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }} />
      </div>
      <span style={{
        fontFamily: MONO, fontSize: 13, fontWeight: 700,
        color: checked ? "var(--neon-green)" : "var(--text-dim)",
      }}>{checked ? "ON" : "OFF"}</span>
    </button>
  );
}

export function SettingsScreen({ diff, setDiff, sound, setSound, numeral, setNumeral, reduceMotion, setReduceMotion, onBack }) {
  return (
    <div style={{ animation: "fadeUp 0.5s ease-out", paddingTop: 30 }}>
      {/* Back button */}
      <div style={{ marginBottom: 16 }}>
        <Btn onClick={onBack} color="#6B7A94">{"\u2190"} Back</Btn>
      </div>

      <h2 style={{
        fontSize: 36, fontWeight: 700, color: "var(--text)", marginBottom: 24,
        fontFamily: DISPLAY, letterSpacing: 2,
      }}>SETTINGS</h2>

      <SettingPanel title="DIFFICULTY" accentColor="var(--neon-purple)">
        <div role="radiogroup" aria-label="Difficulty level" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(DIFF).map(([k, v]) => (
            <OptionCard key={k} selected={diff === k} onClick={() => setDiff(k)} color="var(--neon-green)">
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span>{v.emoji}</span>
                <span>{v.label}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 400, marginTop: 4 }}>{v.desc}</div>
            </OptionCard>
          ))}
        </div>
      </SettingPanel>

      <SettingPanel title="SOUND" accentColor="var(--neon-yellow)">
        <ToggleSwitch checked={sound} onToggle={() => { sfxToggle(true, !sound); setSound(!sound); }} label="Sound effects" />
      </SettingPanel>

      <SettingPanel title="REDUCE MOTION" accentColor="var(--neon-green)">
        <ToggleSwitch checked={reduceMotion} onToggle={() => { sfxToggle(sound, !reduceMotion); setReduceMotion(!reduceMotion); }} label="Reduce motion" />
        <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 400, marginTop: 8 }}>
          Disables animations for motion sensitivity
        </div>
      </SettingPanel>

      <SettingPanel title="NUMBER STYLE" accentColor="var(--neon-red)">
        <div role="radiogroup" aria-label="Number style" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(NUMERAL_SYSTEMS).map(([k, v]) => (
            <OptionCard key={k} selected={numeral === k} onClick={() => setNumeral(k)} color="var(--neon-green)">
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span>{v.emoji}</span>
                <span>{v.label}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 400, marginTop: 4 }}>{v.desc}</div>
            </OptionCard>
          ))}
        </div>
      </SettingPanel>
    </div>
  );
}
