import { FONT } from "./constants";

const KEY_DEFAULT = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><g stroke='rgb(0,245,212)' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'><line x1='10' y1='4' x2='10' y2='19'/><line x1='10' y1='6' x2='16' y2='6'/><line x1='10' y1='10' x2='15' y2='10'/><circle cx='10' cy='24' r='5'/></g></svg>") 10 2, default`;

const KEY_POINTER = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><g transform='rotate(-20,10,16)'><g stroke='rgb(0,245,212)' stroke-width='5' fill='none' stroke-linecap='round' stroke-linejoin='round' opacity='0.3'><line x1='10' y1='4' x2='10' y2='19'/><line x1='10' y1='6' x2='16' y2='6'/><line x1='10' y1='10' x2='15' y2='10'/><circle cx='10' cy='24' r='5'/></g><g stroke='rgb(0,245,212)' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><line x1='10' y1='4' x2='10' y2='19'/><line x1='10' y1='6' x2='16' y2='6'/><line x1='10' y1='10' x2='15' y2='10'/><circle cx='10' cy='24' r='5'/></g></g></svg>") 5 3, pointer`;

export const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Share+Tech+Mono&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #080C18;
  --surface: rgba(255,255,255,0.04);
  --surface2: rgba(255,255,255,0.07);
  --text: #E8ECF4;
  --muted: #5A6680;
  --neon-green: #00F5D4;
  --neon-purple: #7B61FF;
  --neon-red: #FE5F55;
  --neon-yellow: #FFD166;
}

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

button { font-family: ${FONT}; }
button:focus-visible { outline: 2px solid var(--neon-green); outline-offset: 3px; }

body { cursor: ${KEY_DEFAULT}; }
a, button, [role="button"], select, label[for] { cursor: ${KEY_POINTER}; }
[disabled] { cursor: ${KEY_DEFAULT}; }
`;
