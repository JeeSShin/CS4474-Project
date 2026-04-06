// Full-screen cave background with image, overlays, and accent color glow
export function CaveBG({ accentColor = "#FFD700", running }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/cave.webp")',
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transform: running ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: running
            ? "linear-gradient(180deg, rgba(9,12,16,0.36) 0%, rgba(9,12,16,0.28) 38%, rgba(9,12,16,0.52) 100%)"
            : "linear-gradient(180deg, rgba(9,12,16,0.24) 0%, rgba(9,12,16,0.18) 38%, rgba(9,12,16,0.42) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 30%, transparent 0%, transparent 38%, ${accentColor}10 70%, rgba(9,12,16,0.18) 100%)`,
          mixBlendMode: "screen",
          opacity: running ? 0.75 : 0.5,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(9,12,16,0.16) 0%, transparent 18%, transparent 82%, rgba(9,12,16,0.16) 100%)",
        }}
      />
    </div>
  );
}
