import React from "react";
import { Zap, TrendingDown } from "lucide-react";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function InterestSavingsBanner({ plan }) {
  if (!plan || !plan.estimatedSavings || plan.estimatedSavings <= 0) return null;

  return (
    <div className="mx-4 mt-3 p-3 rounded-xl border bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-500 text-white shrink-0">
          <TrendingDown size={13} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-950">
            Save {rupee(plan.estimatedSavings)} in interest!
          </p>
          <p className="text-[11px] text-emerald-700">
            1Fi 0% EMI vs 16% standard bank credit card interest
          </p>
        </div>
      </div>
    </div>
  );
}
