import React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { T } from "../../theme/tokens.js";

export default function Toast({ toast }) {
  if (!toast) return null;

  const Icon = toast.type === "error" ? AlertCircle : toast.type === "info" ? Info : CheckCircle2;
  const iconColor = toast.type === "error" ? T.danger : toast.type === "info" ? T.purple600 : "#16A34A";

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <div
        className="max-w-sm w-full py-2.5 px-4 rounded-xl shadow-lg border flex items-center gap-2.5 animate-bounce-short pointer-events-auto"
        style={{
          background: "#FFFFFF",
          borderColor: T.line,
          boxShadow: "0 10px 25px -5px rgba(46,11,92,0.15)",
        }}
      >
        <Icon size={18} color={iconColor} className="shrink-0" />
        <p className="text-xs font-medium" style={{ color: T.ink }}>
          {toast.message}
        </p>
      </div>
    </div>
  );
}
