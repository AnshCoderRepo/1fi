import React from "react";
import { ChevronLeft } from "lucide-react";
import { T } from "../../theme/tokens.js";

export default function TopBar({ title, onBack, rightAction }) {
  return (
    <div
      className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
      style={{ background: T.card, borderBottom: `1px solid ${T.line}` }}
    >
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100" style={{ background: T.bg }}>
          <ChevronLeft size={18} color={T.ink} />
        </button>
        <p className="font-semibold text-sm line-clamp-1" style={{ color: T.ink }}>{title}</p>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
}
