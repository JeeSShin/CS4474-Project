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
      {/* Layer 1: Radial vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 40%, var(--bg) 0%, var(--bg-deep) 100%)`,
      }} />

      {/* Layer 2: Ceiling grid */}
      <div style={{
        position: "absolute", top: 0, left: "-10%", right: "-10%", height: "25%",
        background: `repeating-linear-gradient(90deg, ${accentColor}10 0px, transparent 1px, transparent 60px),
                     repeating-linear-gradient(0deg, ${accentColor}10 0px, transparent 1px, transparent 60px)`,
        transform: "perspective(400px) rotateX(-55deg)",
        transformOrigin: "top center",
        opacity: pulseOpacity,
        animation: running ? `corridorPulse ${isCorridor ? "2s" : isVault ? "1.5s" : "2.5s"} ease-in-out infinite` : "none",
      }} />

      {/* Layer 3: Floor grid */}
      <div style={{
        position: "absolute", bottom: 0, left: "-10%", right: "-10%", height: "45%",
        background: `repeating-linear-gradient(90deg, ${accentColor}18 0px, transparent 2px, transparent ${isVault ? 40 : isCorridor ? 50 : 60}px),
                     repeating-linear-gradient(0deg, ${accentColor}18 0px, transparent 2px, transparent ${isVault ? 40 : isCorridor ? 50 : 60}px)`,
        transform: "perspective(400px) rotateX(55deg)",
        transformOrigin: "bottom center",
        animation: running ? `corridorPulse ${isCorridor ? "2s" : isVault ? "1.5s" : "2.5s"} ease-in-out infinite` : "none",
      }} />

      {/* Layer 4: Horizontal accent line */}
      <div style={{
        position: "absolute", top: "8%", left: "20%", right: "20%", height: 1,
        background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
      }} />

      {/* Layer 5: Side wall lines */}
      {[14, 16, 84, 86].map(x => (
        <div key={x} style={{
          position: "absolute", top: "10%", bottom: "55%", left: `${x}%`, width: 1,
          background: `linear-gradient(180deg, ${accentColor}30, transparent)`,
        }} />
      ))}

      {/* Layer 6: Primary scanline — slower during gameplay */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 3,
        background: `${accentColor}12`,
        animation: `scanline ${scanSpeed1} linear infinite`,
      }} />

      {/* Layer 7: Counter scanline — slower during gameplay */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: `${accentColor}08`,
        animation: `scanline ${scanSpeed2} linear infinite reverse`,
      }} />

      {/* Layer 8: Drifting dust particles (reduced count during gameplay) */}
      {running && dustParticles.map((p, i) => (
        <div key={`dust-${i}`} style={{
          position: "absolute", bottom: 0, left: p.left,
          width: p.size, height: p.size, borderRadius: "50%",
          background: accentColor,
          animation: `driftUp ${p.duration}s ${p.delay}s linear infinite`,
        }} />
      ))}

      {/* Layer 9: Stage-specific atmosphere — removed Vault hatching */}
      {isCorridor && (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, ${accentColor}08, transparent 40%)`,
        }} />
      )}
      {isVault && (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, ${accentColor}08, transparent 30%), linear-gradient(to bottom, ${accentColor}05, transparent 20%)`,
        }} />
      )}
    </div>
  );
}
