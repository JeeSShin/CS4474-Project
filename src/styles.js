import { FONT } from "./constants";

const KEY_DEFAULT = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><g stroke='rgb(0,245,212)' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'><line x1='10' y1='4' x2='10' y2='19'/><line x1='10' y1='6' x2='16' y2='6'/><line x1='10' y1='10' x2='15' y2='10'/><circle cx='10' cy='24' r='5'/></g></svg>") 10 2, default`;

const KEY_POINTER = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><g transform='rotate(-20,10,16)'><g stroke='rgb(0,245,212)' stroke-width='5' fill='none' stroke-linecap='round' stroke-linejoin='round' opacity='0.3'><line x1='10' y1='4' x2='10' y2='19'/><line x1='10' y1='6' x2='16' y2='6'/><line x1='10' y1='10' x2='15' y2='10'/><circle cx='10' cy='24' r='5'/></g><g stroke='rgb(0,245,212)' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><line x1='10' y1='4' x2='10' y2='19'/><line x1='10' y1='6' x2='16' y2='6'/><line x1='10' y1='10' x2='15' y2='10'/><circle cx='10' cy='24' r='5'/></g></g></svg>") 5 3, pointer`;

export const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;700&family=Teko:wght@600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0A0E14;
  --bg-deep: #060A10;
  --surface: rgba(255,255,255,0.03);
  --surface2: rgba(255,255,255,0.06);
  --surface-raised: rgba(255,255,255,0.09);
  --text: #D8DDE8;
  --text-dim: #6B7A94;
  --border: rgba(255,255,255,0.08);
  --neon-green: #00F5D4;
  --neon-purple: #7B61FF;
  --neon-red: #FE5F55;
  --neon-yellow: #FFD166;
}

/* === Existing animations === */
@keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes shake {
  0%,100% { transform:translateX(0); }
  15% { transform:translateX(-10px) rotate(-2deg); }
  30% { transform:translateX(10px) rotate(2deg); }
  45% { transform:translateX(-7px) rotate(-1deg); }
  60% { transform:translateX(7px) rotate(1deg); }
  75% { transform:translateX(-3px); }
}
@keyframes glow {
  0% { filter:brightness(1); }
  50% { filter:brightness(1.6); }
  100% { filter:brightness(1); }
}
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
@keyframes scanline {
  0% { top: -4px; }
  100% { top: 100%; }
}
@keyframes corridorPulse {
  0%,100% { opacity: 0.15; }
  50% { opacity: 0.35; }
}
@keyframes particleFly {
  0% { transform: translate(-50%,-50%) scale(1); opacity:1; }
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0); opacity:0; }
}

/* === New animations === */
@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(-32px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes doorPanelOpenLeft {
  0%   { transform: perspective(800px) rotateY(0deg); opacity: 1; }
  100% { transform: perspective(800px) rotateY(-80deg); opacity: 0.2; }
}
@keyframes doorPanelOpenRight {
  0%   { transform: perspective(800px) rotateY(0deg); opacity: 1; }
  100% { transform: perspective(800px) rotateY(80deg); opacity: 0.2; }
}
@keyframes revealGlow {
  0%   { opacity: 0; transform: scale(0.85); }
  40%  { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes checkmarkDraw {
  0%   { stroke-dashoffset: 40; opacity: 0; }
  30%  { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 1; }
}
@keyframes doorShakeHard {
  0%,100% { transform: translateX(0) scale(1); }
  8%  { transform: translateX(-13px) rotate(-3.5deg) scale(1.03); }
  18% { transform: translateX(13px) rotate(3.5deg) scale(1.03); }
  28% { transform: translateX(-10px) rotate(-2deg) scale(1.01); }
  38% { transform: translateX(10px) rotate(2deg) scale(1.01); }
  48% { transform: translateX(-6px) rotate(-1deg); }
  58% { transform: translateX(7px) rotate(1deg); }
  68% { transform: translateX(-4px); }
  78% { transform: translateX(4px); }
  88% { transform: translateX(-2px); }
}
@keyframes wrongFlash {
  0%   { opacity: 0; }
  12%  { opacity: 0.55; }
  100% { opacity: 0; }
}
@keyframes wrongPulseGlow {
  0%   { box-shadow: 0 0 15px rgba(254,95,85,0.25), inset 0 0 10px rgba(254,95,85,0.1); }
  40%  { box-shadow: 0 0 50px rgba(254,95,85,0.6), inset 0 0 30px rgba(254,95,85,0.25); }
  100% { box-shadow: 0 0 25px rgba(254,95,85,0.35), inset 0 0 15px rgba(254,95,85,0.12); }
}
@keyframes wrongXAppear {
  0%   { transform: translate(-50%,-50%) scale(0.3) rotate(-15deg); opacity: 0; }
  55%  { transform: translate(-50%,-50%) scale(1.15) rotate(4deg); opacity: 1; }
  100% { transform: translate(-50%,-50%) scale(1) rotate(0deg); opacity: 0.9; }
}
@keyframes doorOpenLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-110%); }
}
@keyframes doorOpenRight {
  from { transform: translateX(0); }
  to { transform: translateX(110%); }
}
@keyframes burstFlash {
  from { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
  to { transform: translate(-50%, -50%) scale(3); opacity: 0; }
}
@keyframes driftUp {
  from { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 0.2; }
  90% { opacity: 0.2; }
  to { transform: translateY(-100vh) translateX(20px); opacity: 0; }
}
@keyframes scaleIn {
  from { transform: scale(0.7); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes tutorialPulse {
  0%, 100% { box-shadow: 0 0 8px rgba(255,209,102,0.2); }
  50% { box-shadow: 0 0 24px rgba(255,209,102,0.6), 0 0 48px rgba(255,209,102,0.3); }
}

button { font-family: ${FONT}; }
button:focus-visible { outline: 2px solid var(--neon-green); outline-offset: 3px; }

/* Skip navigation link */
.skip-link {
  position: absolute; left: -9999px; top: auto;
  width: 1px; height: 1px; overflow: hidden;
  z-index: 999; padding: 8px 16px;
  background: var(--bg); color: var(--neon-green);
  font-family: ${FONT}; font-size: 14px; font-weight: 700;
  border: 2px solid var(--neon-green);
  text-decoration: none; white-space: nowrap;
}
.skip-link:focus {
  position: fixed; left: 16px; top: 16px;
  width: auto; height: auto;
}

/* Visually hidden utility */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

body { cursor: ${KEY_DEFAULT}; }
a, button, [role="button"], select, label[for] { cursor: ${KEY_POINTER}; }
[disabled] { cursor: ${KEY_DEFAULT}; }

/* Reduced-motion: disable continuous/decorative animations, keep final states */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01s !important;
  }
}

/* In-app reduced-motion class (mirrors the media query for manual toggle) */
.reduce-motion *, .reduce-motion *::before, .reduce-motion *::after {
  animation-duration: 0.01s !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01s !important;
}
`;
