import { DIFF } from "./constants";

export const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

export function makeEquation(diff, stageId) {
  const c = DIFF[diff];
  let lo = c.lo, hi = c.hi;
  if (stageId >= 2) { lo += 4; hi = Math.min(hi + 35, 250); }
  if (stageId >= 3) { lo += 6; hi = Math.min(hi + 60, 400); }

  if ((diff === "expert" || diff === "extreme") && Math.random() > 0.55) {
    return makePemdas(c, lo, hi);
  }

  const op = c.ops[ri(0, c.ops.length - 1)];
  let a, b, ans;
  switch (op) {
    case "+": a = ri(lo, hi); b = ri(lo, hi); ans = a + b; break;
    case "-": a = ri(lo, hi); b = ri(lo, Math.min(a, hi)); ans = a - b; break;
    case "×": a = ri(2, Math.min(hi, 14)); b = ri(2, Math.min(hi, 14)); ans = a * b; break;
    case "÷": b = ri(2, 12); ans = ri(2, 12); a = b * ans; break;
    default:  a = ri(lo, hi); b = ri(lo, hi); ans = a + b;
  }
  return buildQuestion(`${a} ${op} ${b}`, ans, c.doors);
}

function makePemdas(c, lo, hi) {
  const a = ri(2, Math.min(12, hi));
  const b = ri(2, Math.min(12, hi));
  const cc = ri(1, Math.min(20, hi));
  const patterns = [
    { display: `${a} + ${b} × ${cc}`, ans: a + b * cc },
    { display: `${a} × ${b} - ${cc}`, ans: a * b - cc },
    { display: `${cc} + ${a} × ${b}`, ans: cc + a * b },
  ];
  const p = patterns[ri(0, patterns.length - 1)];
  return buildQuestion(p.display, p.ans, c.doors);
}

function buildQuestion(display, answer, doorCount) {
  const opts = new Set([answer]);
  let guard = 0;
  while (opts.size < doorCount && guard++ < 100) {
    const spread = Math.max(5, Math.floor(Math.abs(answer) * 0.35));
    const fake = answer + (Math.random() > 0.5 ? ri(1, spread) : -ri(1, spread));
    if (fake !== answer) opts.add(fake);
  }
  const shuffled = [...opts].sort(() => Math.random() - 0.5);
  return { display, answer, options: shuffled, correctIdx: shuffled.indexOf(answer) };
}

export function timeForRound(diff, stageId) {
  const c = DIFF[diff];
  let t = c.time;
  if (stageId >= 3) t *= c.timeShrink;
  return Math.round(Math.max(3, t) * 10) / 10;
}
