import React from "react";
import { Sparkles, ArrowUpRight, TrendingUp, ShieldCheck, ShoppingBag, Wallet, CreditCard, ChevronRight } from "lucide-react";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function HomeTab({ onNavigateToShop, onNavigateToPledge }) {
  return (
    <div className="pb-10">
      {/* 1Fi Header Bar */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between" style={{ background: T.card, borderBottom: `1px solid ${T.line}` }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm" style={{ background: T.purple700 }}>
            1Fi
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: T.ink }}>Hello, Ansh</p>
            <p className="text-[10px] text-green-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Credit Line Active
            </p>
          </div>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
          CIBIL: 785
        </span>
      </div>

      {/* Hero Portfolio & Credit Limit Card */}
      <div className="mx-4 mt-4 p-4 rounded-2xl relative overflow-hidden shadow-md text-white" style={{ background: T.purpleGrad }}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs text-white/75 font-medium">Available Credit Limit</p>
            <p className="text-2xl font-extrabold mt-0.5">{rupee(150000)}</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: T.lime, color: T.purple900 }}>
            0% Interest
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} color={T.lime} />
            <span>Pledged Mutual Funds</span>
          </div>
          <span className="font-bold">{rupee(340000)}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={onNavigateToShop}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-transform active:scale-95"
            style={{ background: T.lime, color: T.purple900 }}
          >
            <ShoppingBag size={14} /> Shop on EMI
          </button>
          <button
            onClick={onNavigateToPledge}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-white/15 border border-white/20 text-white flex items-center justify-center gap-1 transition-transform active:scale-95"
          >
            <Wallet size={14} /> Increase Limit
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-4 pt-5">
        <p className="text-xs font-semibold mb-2.5" style={{ color: T.sub }}>QUICK SERVICES</p>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onNavigateToShop}
            className="p-3.5 rounded-2xl bg-white border text-left flex flex-col justify-between transition-all hover:border-purple-300"
            style={{ borderColor: T.line }}
          >
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center mb-2">
              <ShoppingBag size={16} color={T.purple700} />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: T.ink }}>1Fi Marketplace</p>
              <p className="text-[10px] text-gray-500">Shop phones, iPads at 0% EMI</p>
            </div>
          </button>

          <button
            onClick={onNavigateToPledge}
            className="p-3.5 rounded-2xl bg-white border text-left flex flex-col justify-between transition-all hover:border-purple-300"
            style={{ borderColor: T.line }}
          >
            <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center mb-2">
              <Wallet size={16} color="#16A34A" />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: T.ink }}>Pledge Portfolio</p>
              <p className="text-[10px] text-gray-500">Unlock instant credit against MFs</p>
            </div>
          </button>
        </div>
      </div>

      {/* Active 1Fi Features Callout */}
      <div className="mx-4 mt-4 p-3.5 rounded-2xl border bg-white" style={{ borderColor: T.line }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <Sparkles size={18} color="#D97706" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{ color: T.ink }}>Zero Prepayment Penalty</p>
            <p className="text-[11px] text-gray-500">Close or repay your EMI instalments anytime at 0 extra fees.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
