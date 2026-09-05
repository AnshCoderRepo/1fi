import React from "react";
import { ArrowUpDown } from "lucide-react";
import { T } from "../../theme/tokens.js";

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="flex items-center gap-1.5 px-4 pt-3 pb-1 justify-between">
      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Catalog
      </span>
      <div className="flex items-center gap-1.5 bg-white border px-2.5 py-1.5 rounded-lg text-xs" style={{ borderColor: T.line }}>
        <ArrowUpDown size={12} color={T.sub} />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-xs font-medium outline-none cursor-pointer"
          style={{ color: T.ink }}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="emi-asc">Lowest EMI</option>
        </select>
      </div>
    </div>
  );
}
