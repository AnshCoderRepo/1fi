import React from "react";
import Pill from "../common/Pill.jsx";
import { T } from "../../theme/tokens.js";

const TABS = [
  { id: "brands", label: "Top Brands" },
  { id: "nearby", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
];

export default function ShopTabs({ tab, setTab }) {
  return (
    <div className="flex gap-2 px-4 pt-3 pb-2 overflow-x-auto" style={{ background: T.card }}>
      {TABS.map((t) => (
        <Pill key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
          {t.label}
        </Pill>
      ))}
    </div>
  );
}
