import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { T } from "../../theme/tokens.js";
import { rupee, monthLabel } from "../../utils/format.js";

export default function MonthlySchedule({ plan }) {
  const [open, setOpen] = useState(false);
  if (!plan) return null;

  const rows = Array.from({ length: plan.months }).map((_, i) => ({
    label: monthLabel(i),
    amount: i === plan.months - 1
      ? plan.totalPayable - plan.monthly * (plan.months - 1)
      : plan.monthly,
  }));

  return (
    <div className="px-4 pt-4">
      <button onClick={() => setOpen((o) => !o)} className="flex items-center justify-between w-full">
        <p className="text-xs font-semibold" style={{ color: T.sub }}>MONTHLY TABLE</p>
        <ChevronRight size={16} color={T.sub} style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .15s" }} />
      </button>
      {open && (
        <div className="mt-2 rounded-xl border overflow-hidden" style={{ borderColor: T.line }}>
          {rows.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3.5 py-2.5 text-sm"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${T.line}` }}
            >
              <span style={{ color: T.sub }}>{r.label}</span>
              <span className="font-semibold" style={{ color: T.ink }}>{rupee(r.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
