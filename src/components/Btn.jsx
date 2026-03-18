import { useState } from "react";

export function Btn({ children, onClick, color = "#00F5D4", style: extra = {}, big }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: big ? "16px 52px" : "12px 28px",
        border: `2px solid ${color}55`,
        borderRadius: 10,
        background: hov ? `${color}22` : `${color}0A`,
        color, fontWeight: 700, fontSize: big ? 18 : 14,
        cursor: "pointer", letterSpacing: 1, textTransform: "uppercase",
        transition: "all 0.2s",
        boxShadow: hov ? `0 0 20px ${color}33` : "none",
        ...extra,
      }}
    >{children}</button>
  );
}
