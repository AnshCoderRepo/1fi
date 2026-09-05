import React from "react";
import { T } from "../../theme/tokens.js";

export default function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? T.purple700 : "#FFFFFF",
        color: active ? "#FFFFFF" : T.ink,
        border: `1px solid ${active ? T.purple700 : T.line}`,
      }}
      className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
    >
      {children}
    </button>
  );
}
