import { useMemo } from "react";
import { ri } from "../mathEngine";

export function Burst({ color }) {
  const particles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * 360;
      const dist = ri(50, 130);
      return {
        dx: `${Math.cos(angle * Math.PI / 180) * dist}px`,
        dy: `${Math.sin(angle * Math.PI / 180) * dist}px`,
        size: ri(4, 9), delay: ri(0, 80),
      };
    }), []);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: p.size, height: p.size, borderRadius: "50%", background: color,
          "--dx": p.dx, "--dy": p.dy,
          animation: `particleFly 0.55s ${p.delay}ms ease-out forwards`,
        }} />
      ))}
    </div>
  );
}
