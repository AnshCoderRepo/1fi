import React from "react";
import Pill from "../common/Pill.jsx";
import { CATEGORIES } from "../../data/products.js";

export default function CategoryChips({ active, onSelect }) {
  return (
    <div className="flex gap-2 px-4 pt-4 overflow-x-auto">
      <Pill active={active === "all"} onClick={() => onSelect("all")}>All</Pill>
      {CATEGORIES.map((c) => (
        <Pill key={c.id} active={active === c.id} onClick={() => onSelect(c.id)}>
          {c.label}
        </Pill>
      ))}
    </div>
  );
}
