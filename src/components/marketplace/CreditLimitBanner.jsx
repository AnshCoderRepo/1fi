import React from "react";
import { Sparkles, ShieldCheck, ChevronRight } from "lucide-react";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function CreditLimitBanner({ limit = 150000, available = 150000 }) {
  return (
    <div className="mx-4 mt-3 rounded-2xl p-3.5 border" style={{ background: "#F4F0FD", borderColor: "#DDD3F8" }}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: T.purple600 }}>
            <Sparkles size={11} color="#FFF" />
          </div>
          <span className="text-[11px] font-bold tracking-wide uppercase" style={{ color: T.purple700 }}>
            1Fi Credit Line Active
          </span>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#E2D9F9", color: T.purple900 }}>
          0% Interest
        </span>
      </div>

      <div className="flex items-end justify-between mt-1">
        <div>
          <p className="text-[11px]" style={{ color: T.sub }}>Pre-approved Limit</p>
          <p className="text-base font-extrabold" style={{ color: T.ink }}>{rupee(available)}</p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium" style={{ color: T.purple700 }}>
          <ShieldCheck size={13} />
          <span>Instant 1-tap checkout</span>
        </div>
      </div>
    </div>
  );
}
