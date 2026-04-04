import { useMemo } from "react";

export function CorridorBG({ accentColor = "#FFD700", running }) {
  const dustParticles = useMemo(
    () =>
      Array.from({ length: running ? 5 : 10 }, (_, i) => ({
        left: `${8 + ((i * 11) % 84)}%`,
        top: `${16 + ((i * 9) % 50)}%`,
        size: 2 + (i % 3),
        duration: `${6 + (i % 5)}s`,
        delay: `${i * 0.45}s`,
      })),
    [running]
  );

  const pebbles = [
    { left: "12%", bottom: "14%", width: 38, height: 24, rotate: -8 },
    { left: "18%", bottom: "12%", width: 22, height: 18, rotate: 10 },
    { right: "14%", bottom: "15%", width: 34, height: 22, rotate: 12 },
    { right: "10%", bottom: "12%", width: 20, height: 16, rotate: -10 },
    { right: "19%", bottom: "11%", width: 18, height: 14, rotate: 4 },
  ];

  const grassTufts = [
    { left: "18%", top: "28%", rotate: -10 },
    { left: "23%", top: "21%", rotate: 8 },
    { right: "20%", top: "30%", rotate: 12 },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #f7f4f0 0%, #f1ebe4 58%, #dfd1c3 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 12%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 28%, transparent 58%)",
          opacity: running ? 0.55 : 0.85,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: "min(72vw, 620px)",
          height: "min(54vw, 420px)",
          transform: "translateX(-50%)",
          borderRadius: "40% 40% 28% 28% / 24% 24% 34% 34%",
          background: `
            radial-gradient(circle at 34% 24%, rgba(255,255,255,0.28) 0 8%, transparent 9%),
            radial-gradient(circle at 74% 30%, rgba(126,96,80,0.16) 0 10%, transparent 11%),
            linear-gradient(150deg, #bba79a 0%, #ab9588 28%, #967f72 58%, #836d61 100%)
          `,
          boxShadow: "inset 18px 14px 26px rgba(255,255,255,0.12), inset -18px -20px 30px rgba(73,53,40,0.24)",
          filter: "drop-shadow(0 18px 18px rgba(0,0,0,0.12))",
          opacity: 0.92,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "24%",
            right: "24%",
            bottom: "12%",
            height: "38%",
            borderRadius: "44% 44% 22% 22% / 42% 42% 14% 14%",
            background: "radial-gradient(circle at 50% 18%, rgba(68,48,39,0.18) 0%, #241916 42%, #17100e 100%)",
            boxShadow: `0 0 0 8px ${accentColor}10`,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "8%",
            bottom: "12%",
            width: "20%",
            height: "24%",
            borderRadius: "50% 46% 48% 52%",
            background: "linear-gradient(160deg, #ac988b 0%, #8d786c 100%)",
            transform: "rotate(-20deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "9%",
            bottom: "10%",
            width: "18%",
            height: "22%",
            borderRadius: "44% 56% 46% 54%",
            background: "linear-gradient(200deg, #af9b8e 0%, #887266 100%)",
            transform: "rotate(16deg)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "14%",
            top: "8%",
            width: "14%",
            height: "8%",
            borderRadius: "50%",
            background: "linear-gradient(180deg, #37a64b 0%, #20612c 100%)",
            clipPath: "polygon(0 100%, 12% 38%, 28% 100%, 44% 18%, 58% 100%, 74% 36%, 86% 100%, 100% 52%, 100% 100%)",
            transform: "rotate(-10deg)",
          }}
        />
      </div>

      {grassTufts.slice(0, 2).map((tuft, i) => (
        <div
          key={`grass-${i}`}
          style={{
            position: "absolute",
            width: 44,
            height: 24,
            ...tuft,
            transform: `rotate(${tuft.rotate}deg)`,
          }}
        >
          {[0, 1, 2, 3, 4].map((blade) => (
            <span
              key={blade}
              style={{
                position: "absolute",
                bottom: 0,
                left: `${blade * 9}px`,
                width: 4,
                height: `${12 + ((blade + i) % 3) * 4}px`,
                borderRadius: "50% 50% 0 0",
                background: `linear-gradient(180deg, #49a147 0%, #246629 100%)`,
                transform: `rotate(${blade % 2 === 0 ? -18 : 12}deg)`,
                transformOrigin: "bottom center",
              }}
            />
          ))}
        </div>
      ))}

      {pebbles.map((rock, i) => (
        <div
          key={`pebble-${i}`}
          style={{
            position: "absolute",
            ...rock,
            borderRadius: "48% 52% 45% 55%",
            background: "linear-gradient(180deg, #ada093 0%, #938275 65%, #7a6a5e 100%)",
            boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.16), 0 4px 8px rgba(0,0,0,0.1)",
            transform: `rotate(${rock.rotate}deg)`,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "22%",
          background: "linear-gradient(180deg, rgba(214,194,177,0) 0%, rgba(198,175,157,0.45) 28%, #ccb49f 100%)",
        }}
      />

      {dustParticles.slice(0, running ? 3 : 5).map((particle, i) => (
        <div
          key={`dust-${i}`}
          style={{
            position: "absolute",
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: "rgba(176,154,136,0.28)",
            filter: "blur(0.6px)",
            animation: `driftUp ${particle.duration} linear ${particle.delay} infinite`,
            opacity: running ? 0.18 : 0.28,
          }}
        />
      ))}
    </div>
  );
}
