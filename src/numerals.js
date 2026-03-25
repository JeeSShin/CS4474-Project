export const NUMERAL_SYSTEMS = {
  arabic: { label: "Arabic", emoji: "🔢", desc: "1, 2, 3 …" },
  roman:  { label: "Roman",  emoji: "🏛️", desc: "I, V, X …" },
  binary: { label: "Binary", emoji: "💻", desc: "1, 10, 11 …" },
};

const ROMAN_MAP = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"],  [90, "XC"],  [50, "L"],  [40, "XL"],
  [10, "X"],   [9, "IX"],   [5, "V"],   [4, "IV"],
  [1, "I"],
];

function toRoman(n) {
  if (n === 0) return "N";
  let prefix = "";
  if (n < 0) { prefix = "-"; n = -n; }
  if (n > 3999) return prefix + String(n);
  let result = "";
  for (const [val, sym] of ROMAN_MAP) {
    while (n >= val) { result += sym; n -= val; }
  }
  return prefix + result;
}

function toBinary(n) {
  if (n === 0) return "0";
  if (n < 0) return "-" + Math.abs(n).toString(2);
  return n.toString(2);
}

export function convertNumber(n, system) {
  switch (system) {
    case "roman":  return toRoman(n);
    case "binary": return toBinary(n);
    default:       return String(n);
  }
}

export function convertDisplay(displayStr, system) {
  if (!system || system === "arabic") return displayStr;
  return displayStr.replace(/-?\d+/g, m => convertNumber(Number(m), system));
}
