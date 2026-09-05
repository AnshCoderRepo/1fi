import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { T } from "../../theme/tokens.js";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-6">
      <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "#FEE2E2" }}>
        <AlertTriangle size={26} color={T.danger} />
      </div>
      <p className="font-semibold mb-1" style={{ color: T.ink }}>Something went wrong</p>
      <p className="text-sm mb-5" style={{ color: T.sub }}>{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold"
        style={{ background: T.purple700 }}
      >
        <RefreshCw size={15} /> Try again
      </button>
    </div>
  );
}
