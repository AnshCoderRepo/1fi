import React from "react";
import { T } from "../../theme/tokens.js";

export default function PromoBanner() {
  return (
    <div className="mx-4 mt-4 rounded-2xl p-4 relative overflow-hidden" style={{ background: T.purpleGrad }}>
      <span
        className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold mb-3"
        style={{ background: T.lime, color: T.purple900 }}
      >
        0% INTEREST
      </span>
      <p className="text-white text-lg font-bold leading-snug">
        Shop now, pay in easy
        <br /> monthly instalments
      </p>
      <p className="text-white/70 text-xs mt-1">No cost EMI on 8+ brand partners</p>
    </div>
  );
}
