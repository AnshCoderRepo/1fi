import React from "react";
import { Sparkles } from "lucide-react";
import { T } from "../../theme/tokens.js";

export default function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center text-center py-20 px-6">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: T.line }}>
        <Sparkles size={24} color={T.purple600} />
      </div>
      <p className="font-semibold mb-1" style={{ color: T.ink }}>Nothing here yet</p>
      <p className="text-sm" style={{ color: T.sub }}>{label}</p>
    </div>
  );
}
