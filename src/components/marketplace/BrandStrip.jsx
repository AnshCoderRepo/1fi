import React from "react";
import { BRAND_PARTNERS } from "../../data/products.js";
import { T } from "../../theme/tokens.js";

export default function BrandStrip({ selectedBrand, onSelectBrand }) {
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold" style={{ color: T.sub }}>OUR BRAND PARTNERS</p>
        {selectedBrand && (
          <button
            onClick={() => onSelectBrand(null)}
            className="text-[11px] font-medium underline"
            style={{ color: T.purple600 }}
          >
            Clear brand
          </button>
        )}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {BRAND_PARTNERS.map((b) => {
          const active = selectedBrand === b;
          return (
            <button
              key={b}
              onClick={() => onSelectBrand(active ? null : b)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all active:scale-95"
              style={{
                borderColor: active ? T.purple600 : T.line,
                color: active ? "#FFF" : T.ink,
                background: active ? T.purple700 : T.card,
                boxShadow: active ? "0 2px 8px rgba(76,22,144,0.25)" : "none",
              }}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}
