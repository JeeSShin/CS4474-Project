export function CorridorBG({ accentColor = "#00F5D4", running }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", bottom: 0, left: "-10%", right: "-10%", height: "45%",
        background: `repeating-linear-gradient(90deg, ${accentColor}18 0px, transparent 1px, transparent 60px),
                     repeating-linear-gradient(0deg, ${accentColor}18 0px, transparent 1px, transparent 60px)`,
        transform: "perspective(400px) rotateX(55deg)",
        transformOrigin: "bottom center",
        animation: running ? "corridorPulse 2s ease-in-out infinite" : "none",
      }} />
      <div style={{
        position: "absolute", top: "8%", left: "20%", right: "20%", height: 1,
        background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
      }} />
      {[15, 85].map(x => (
        <div key={x} style={{
          position: "absolute", top: "10%", bottom: "55%", left: `${x}%`, width: 1,
          background: `linear-gradient(180deg, ${accentColor}30, transparent)`,
        }} />
      ))}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 3,
        background: `${accentColor}12`,
        animation: "scanline 4s linear infinite",
      }} />
    </div>
  );
}
