import React from "react";
import { Home, ShoppingBag, Wallet, User } from "lucide-react";
import { T } from "../../theme/tokens.js";

const ITEMS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "shop", icon: ShoppingBag, label: "Shop" },
  { id: "pledge", icon: Wallet, label: "Pledge" },
  { id: "profile", icon: User, label: "Profile" },
];

export default function BottomNav({ activeTab = "shop", onChangeTab }) {
  return (
    <div
      className="sticky bottom-0 flex justify-around items-center py-2 px-2 border-t z-30 shadow-lg"
      style={{ background: T.card, borderColor: T.line }}
    >
      {ITEMS.map((it) => {
        const Icon = it.icon;
        const active = activeTab === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onChangeTab?.(it.id)}
            className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all active:scale-90"
            style={{
              background: active ? `${T.purple600}14` : "transparent",
            }}
            aria-label={it.label}
          >
            <Icon
              size={20}
              color={active ? T.purple700 : T.sub}
              strokeWidth={active ? 2.3 : 1.8}
            />
            <span
              className="text-[10px] font-semibold transition-colors"
              style={{ color: active ? T.purple700 : T.sub }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
