import React from "react";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function VariantSelector({ variants, selected, onSelect }) {
  return (
    <div className="px-4 pt-4">
      <p className="text-xs font-semibold mb-2" style={{ color: T.sub }}>SELECT VARIANT</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const active = v.id === selected.id;
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v)}
              className="px-3.5 py-2.5 rounded-xl text-left border"
              style={{ borderColor: active ? T.purple600 : T.line, background: active ? `${T.purple600}0D` : T.card }}
            >
              <p className="text-xs font-semibold" style={{ color: T.ink }}>{v.label}</p>
              <p className="text-[11px]" style={{ color: T.sub }}>{rupee(v.price)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
