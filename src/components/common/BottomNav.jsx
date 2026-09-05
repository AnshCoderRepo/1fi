import React from "react";
import { Home, ShoppingBag, Wallet, User } from "lucide-react";
import { T } from "../../theme/tokens.js";

const ITEMS = [
  { icon: Home, label: "Home" },
  { icon: ShoppingBag, label: "Shop", active: true },
  { icon: Wallet, label: "Pledge" },
  { icon: User, label: "Profile" },
];

export default function BottomNav() {
  return (
    <div className="sticky bottom-0 flex justify-around items-center py-2.5 px-2" style={{ background: T.card, borderTop: `1px solid ${T.line}` }}>
      {ITEMS.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl"
            style={{ background: it.active ? `${T.purple600}14` : "transparent" }}
          >
            <Icon size={19} color={it.active ? T.purple700 : T.sub} strokeWidth={2} />
            <span className="text-[10px] font-medium" style={{ color: it.active ? T.purple700 : T.sub }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}
