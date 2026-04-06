import { DIFF } from "./appConstants";

// Returns a random integer in range [a, b] inclusive
const ri = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

// Generates a math equation based on difficulty and stage, returns question with answer options
export function makeEquation(diff, stageId) {
  const c = DIFF[diff];
  let lo = c.lo, hi = c.hi;
  if (stageId >= 2) { lo += 4; hi = Math.min(hi + 35, 250); }
  if (stageId >= 3) { lo += 6; hi = Math.min(hi + 60, 400); }

  const op = c.ops[ri(0, c.ops.length - 1)];
  let a, b, ans;
  switch (op) {
    case "+":
      a = ri(lo, hi); b = ri(lo, hi); ans = a + b;
      break;
    case "-":
      a = ri(lo, hi); b = ri(lo, Math.min(a, hi)); ans = a - b;
      break;
    case "×":
      a = ri(2, Math.min(hi, 14)); b = ri(2, Math.min(hi, 14)); ans = a * b;
      break;
    case "÷":
      b = ri(2, 12); ans = ri(2, 12); a = b * ans;
      break;
    default:
      a = ri(lo, hi); b = ri(lo, hi); ans = a + b;
  }
  return buildQuestion(`${a} ${op} ${b}`, ans, c.doors, op, a, b);
}

// Builds a question object with shuffled answer options and distractor reasons
function buildQuestion(display, answer, doorCount, op, a, b) {
  const opts = new Set([answer]);
  const reasonMap = {};
  let guard = 0;

  const pedagogical = generatePedagogicalDistractors(answer, op, a, b);
  for (const pd of pedagogical) {
    if (pd.value !== answer && opts.size < doorCount) {
      opts.add(pd.value);
      reasonMap[pd.value] = pd.reason;
    }
  }

  while (opts.size < doorCount && guard++ < 100) {
    const spread = Math.max(5, Math.floor(Math.abs(answer) * 0.35));
    const fake = answer + (Math.random() > 0.5 ? ri(1, spread) : -ri(1, spread));
    if (fake !== answer && !opts.has(fake)) opts.add(fake);
  }
  const shuffled = [...opts].sort(() => Math.random() - 0.5);
  return { display, answer, options: shuffled, correctIdx: shuffled.indexOf(answer), reasonMap };
}

// Creates wrong answers based on common mistakes (off-by-one, operation confusion)
function generatePedagogicalDistractors(answer, op, a, b) {
  const distractors = [];
  if (a === undefined || b === undefined || !op) return distractors;

  switch (op) {
    case "+":
      distractors.push({ value: answer + 1, reason: "Off by one" });
      distractors.push({ value: answer - 1, reason: "Off by one" });
      if (a > b) distractors.push({ value: a - b, reason: `That's ${a} - ${b}, not ${a} + ${b}` });
      break;
    case "-":
      distractors.push({ value: answer + 1, reason: "Off by one" });
      distractors.push({ value: answer - 1, reason: "Off by one" });
      distractors.push({ value: a + b, reason: `That's ${a} + ${b}, not ${a} - ${b}` });
      break;
    case "×":
      distractors.push({ value: a + b, reason: `That's ${a} + ${b}, not ${a} × ${b}` });
      distractors.push({ value: answer + a, reason: `That's ${a} × ${b + 1}, not ${a} × ${b}` });
      distractors.push({ value: answer - a, reason: `That's ${a} × ${b - 1}, not ${a} × ${b}` });
      break;
    case "÷":
      distractors.push({ value: a * b, reason: `That's ${a} × ${b}, not ${a} ÷ ${b}` });
      distractors.push({ value: answer + 1, reason: "Off by one" });
      distractors.push({ value: answer - 1, reason: "Off by one" });
      break;
  }
  return distractors.filter(d => d.value >= 0);
}
