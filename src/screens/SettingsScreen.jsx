import { useState } from "react";
import { DIFF, FONT, MONO } from "../constants";
import { NUMERAL_SYSTEMS } from "../numerals";
import { Btn } from "../components/Btn";

export function SettingsScreen({ diff, setDiff, sound, setSound, numeral, setNumeral, onBack }) {
  return (
    <div style={{ textAlign: "center", animation: "fadeUp 0.5s ease-out", paddingTop: 30 }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", marginBottom: 28, fontFamily: FONT }}>SETTINGS</h2>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "var(--muted)", fontFamily: MONO, marginBottom: 10 }}>DIFFICULTY</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {Object.entries(DIFF).map(([k, v]) => (
            <button key={k} onClick={() => setDiff(k)} style={{
              padding: "10px 16px", border: diff === k ? "2px solid var(--neon-green)" : "2px solid transparent",
              borderRadius: 8, background: diff === k ? "rgba(0,245,212,0.1)" : "var(--surface)",
              color: diff === k ? "var(--neon-green)" : "var(--muted)", fontWeight: 700,
              fontFamily: FONT, fontSize: 13, transition: "all 0.2s",
            }}>
              {v.emoji} {v.label}
              <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 400, marginTop: 2 }}>{v.desc}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "var(--muted)", fontFamily: MONO, marginBottom: 10 }}>SOUND</div>
        <Btn onClick={() => setSound(!sound)} color={sound ? "#00F5D4" : "#5A6680"}>
          {sound ? "🔊 On" : "🔇 Off"}
        </Btn>
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "var(--muted)", fontFamily: MONO, marginBottom: 10 }}>NUMBER STYLE</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {Object.entries(NUMERAL_SYSTEMS).map(([k, v]) => (
            <button key={k} onClick={() => setNumeral(k)} style={{
              padding: "10px 16px", border: numeral === k ? "2px solid var(--neon-green)" : "2px solid transparent",
              borderRadius: 8, background: numeral === k ? "rgba(0,245,212,0.1)" : "var(--surface)",
              color: numeral === k ? "var(--neon-green)" : "var(--muted)", fontWeight: 700,
              fontFamily: FONT, fontSize: 13, transition: "all 0.2s",
            }}>
              {v.emoji} {v.label}
              <div style={{ fontSize: 10, color: "var(--muted)", fontWeight: 400, marginTop: 2 }}>{v.desc}</div>
            </button>
          ))}
        </div>
      </div>
      <Btn onClick={onBack} color="#5A6680">← Back</Btn>
    </div>
  );
}
