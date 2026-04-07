// Supported numeral systems with display metadata
export const NUMERAL_SYSTEMS = {
  arabic: { label: "Arabic", emoji: "123", desc: "1, 2, 3" },
  roman: { label: "Roman", emoji: "XIV", desc: "I, V, X" },
  binary: { label: "Binary", emoji: "101", desc: "1, 10, 11" },
};

// Value-to-symbol mapping for Roman numeral conversion (descending order)
const ROMAN_MAP = [
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"],[1, "I"],
];

// Converts integer to Roman numerals. Returns "N" for zero
function toRoman(n) {
  if (n === 0) return "N";
  let prefix = "";
  if (n < 0) {
    prefix = "-";
    n = -n;
  }
  let result = "";
  for (const [val, sym] of ROMAN_MAP) {
    while (n >= val) {
      result += sym;
      n -= val;
    }
  }
  return prefix + result;
}

// Converts integer to binary string representation
function toBinary(n) {
  if (n === 0) return "0";
  if (n < 0) 
    return "-" + Math.abs(n).toString(2);
  return n.toString(2);
}

// Converts a single number to the specified numeral system
export function convertNumber(n, system) {
  switch (system) {
    case "roman":
      return toRoman(n);
    case "binary":
      return toBinary(n);
    default:
      return String(n);
  }
}

// Converts all numbers in a display string to the specified numeral system
export function convertDisplay(str, system) {
  if (!system || system === "arabic") return str;
  return str.replace(/-?\d+/g, (m) => convertNumber(Number(m), system));
}
