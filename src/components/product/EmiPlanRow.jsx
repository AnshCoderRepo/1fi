import React from "react";
import { Check } from "lucide-react";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function EmiPlanRow({ plan, selected, onSelect }) {
  const active = selected?.months === plan.months;
  return (
    <button
      onClick={() => onSelect(plan)}
      className="w-full flex items-center justify-between p-3.5 rounded-xl border mb-2"
      style={{ borderColor: active ? T.purple600 : T.line, background: active ? `${T.purple600}0D` : T.card }}
    >
      <div className="text-left">
        <p className="text-sm font-semibold" style={{ color: T.ink }}>{plan.months} months</p>
        <p className="text-[11px]" style={{ color: T.sub }}>
          {plan.convenienceFee > 0 ? `Convenience fee ${rupee(plan.convenienceFee)}` : "No convenience fee"}
        </p>
      </div>
      <div className="text-right flex items-center gap-2">
        <div>
          <p className="text-sm font-bold" style={{ color: T.ink }}>{rupee(plan.monthly)}/mo</p>
          <p className="text-[11px]" style={{ color: T.limeDark }}>0% interest</p>
        </div>
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center border-2"
          style={{ borderColor: active ? T.purple600 : T.line, background: active ? T.purple600 : "transparent" }}
        >
          {active && <Check size={12} color="#fff" strokeWidth={3} />}
        </div>
      </div>
    </button>
  );
}
