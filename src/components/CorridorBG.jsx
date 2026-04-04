import { useMemo } from "react";
import { STAGES } from "../constants";

export function CorridorBG({ accentColor = "#00F5D4", running }) {
  const isVault = accentColor === STAGES[2].color;
  const isCorridor = accentColor === STAGES[1].color;

  // Reduce particles during gameplay (7 -> 3)
  const particleCount = running ? 3 : 7;
  const dustParticles = useMemo(() =>
    Array.from({ length: particleCount }, (_, i) => ({
      left: `${10 + (i * 13) % 80}%`,
      duration: 8 + (i * 3) % 7,
      delay: i * 1.2,
      size: 2 + (i % 3),
    })), [particleCount]);

  // Slower scanlines during gameplay
  const scanSpeed1 = running ? "8s" : "4s";
  const scanSpeed2 = running ? "12s" : "6s";

  // Reduced pulse opacity during gameplay
  const pulseOpacity = running ? 0.4 : 0.6;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Modern room background: light walls, subtle floor */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 50%, #d3d3d3 100%)`, // Light gray walls
      }} />

      {/* Floor */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
        background: `linear-gradient(180deg, #8b4513 0%, #654321 100%)`, // Wooden floor gradient
      }} />

      {/* Subtle ceiling light effect */}
      <div style={{
        position: "absolute", top: 0, left: "40%", right: "40%", height: "10%",
        background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 70%)`,
      }} />

      {/* Soft shadows on walls */}
      <div style={{
        position: "absolute", top: 0, bottom: "40%", left: 0, width: "20%",
        background: `linear-gradient(90deg, rgba(0,0,0,0.1) 0%, transparent 100%)`,
      }} />
      <div style={{
        position: "absolute", top: 0, bottom: "40%", right: 0, width: "20%",
        background: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 100%)`,
      }} />
    </div>
  );
}
