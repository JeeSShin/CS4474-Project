import { DIFF, FONT, MONO, DISPLAY } from "../appConstants";
import { NUMERAL_SYSTEMS } from "../numberStyles";
import { Btn } from "../components/Btn";

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

export function SettingsScreen({
  diff,
  setDiff,
  numeral,
  setNumeral,
  onBack,
}) {
  return (
    <div style={{ animation: "fadeUp 0.5s ease-out", paddingTop: 30 }}>
      {/* Back button */}
      <div style={{ marginBottom: 16 }}>
        <Btn onClick={onBack} color="#6B7A94">{"\u2190"} Back</Btn>
      </div>

      <div style={{
        borderRadius: 12,
        padding: "20px 20px 8px",
        background: "rgba(6, 10, 16, 0.72)",
        border: "1px solid var(--border)",
        boxShadow: "0 8px 32px rgba(77, 45, 45, 0.5)",
      }}>
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
    </div>
  );
}
