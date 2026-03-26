import { useMemo } from "react";
import { ri } from "../mathEngine";

export function Burst({ color }) {
  const particles = useMemo(() => {
    const outer = Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * 360;
      const dist = ri(50, 130);
      const isRect = i % 3 === 0;
      return {
        dx: `${Math.cos(angle * Math.PI / 180) * dist}px`,
        dy: `${Math.sin(angle * Math.PI / 180) * dist}px`,
        w: isRect ? ri(2, 4) : ri(4, 9),
        h: isRect ? ri(6, 10) : ri(4, 9),
        radius: isRect ? 1 : "50%",
        rotate: isRect ? ri(0, 180) : 0,
        delay: ri(0, 80),
        duration: 550,
        layer: "outer",
      };
    });
    const inner = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * 360 + 22;
      const dist = ri(30, 50);
      return {
        dx: `${Math.cos(angle * Math.PI / 180) * dist}px`,
        dy: `${Math.sin(angle * Math.PI / 180) * dist}px`,
        w: ri(8, 12),
        h: ri(8, 12),
        radius: "50%",
        rotate: 0,
        delay: ri(0, 40),
        duration: 300,
        layer: "inner",
      };
    });
    return [...outer, ...inner];
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      {/* Central flash */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 20, height: 20, borderRadius: "50%",
        background: color,
        animation: "burstFlash 0.25s ease-out forwards",
      }} />
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: p.w, height: p.h,
          borderRadius: p.radius, background: color,
          transform: `rotate(${p.rotate}deg)`,
          "--dx": p.dx, "--dy": p.dy,
          animation: `particleFly ${p.duration}ms ${p.delay}ms ease-out forwards`,
        }} />
      ))}
    </div>
  );
}
