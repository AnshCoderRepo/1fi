import React from "react";
import { Wallet, ShieldCheck, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

export default function PledgeTab({ onNavigateToShop }) {
  const holdings = [
    { fund: "HDFC Top 100 Large Cap Fund", value: 180000, creditEligible: 90000, pledged: true },
    { fund: "Mirae Asset Emerging Bluechip", value: 160000, creditEligible: 60000, pledged: true },
    { fund: "Parag Parikh Flexi Cap Fund", value: 240000, creditEligible: 120000, pledged: false },
  ];

  return (
    <div className="pb-10">
      <div className="px-4 py-3.5 sticky top-0 z-10" style={{ background: T.card, borderBottom: `1px solid ${T.line}` }}>
        <p className="font-bold text-sm" style={{ color: T.ink }}>Pledge Investments</p>
      </div>

      {/* Overview Card */}
      <div className="mx-4 mt-4 p-4 rounded-2xl border bg-white" style={{ borderColor: T.line }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-500">Current Pledged Limit</p>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
            Active
          </span>
        </div>
        <p className="text-2xl font-black" style={{ color: T.ink }}>{rupee(150000)}</p>
        <p className="text-[11px] text-gray-500 mt-1">
          Backed by ₹3,40,000 mutual fund investments. Earn daily fund returns while enjoying 0% EMI!
        </p>
      </div>

      {/* Holdings List */}
      <div className="px-4 pt-5">
        <p className="text-xs font-semibold mb-2.5" style={{ color: T.sub }}>YOUR MUTUAL FUND HOLDINGS</p>
        <div className="space-y-2.5">
          {holdings.map((h, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl border bg-white flex items-center justify-between"
              style={{ borderColor: T.line }}
            >
              <div>
                <p className="text-xs font-bold" style={{ color: T.ink }}>{h.fund}</p>
                <p className="text-[11px] text-gray-500">Portfolio: {rupee(h.value)}</p>
                <p className="text-[10px] font-semibold text-purple-700 mt-0.5">
                  Eligible Credit: {rupee(h.creditEligible)}
                </p>
              </div>

              {h.pledged ? (
                <span className="flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-lg">
                  <CheckCircle2 size={13} /> Pledged
                </span>
              ) : (
                <button
                  className="text-[11px] font-bold text-white px-3 py-1.5 rounded-lg shadow-xs"
                  style={{ background: T.purple700 }}
                >
                  Pledge
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shop CTA */}
      <div className="mx-4 mt-6 p-4 rounded-2xl border bg-purple-50/60 flex items-center justify-between" style={{ borderColor: "#DDD3F8" }}>
        <div>
          <p className="text-xs font-bold text-purple-950">Ready to use your limit?</p>
          <p className="text-[11px] text-purple-800">Shop latest devices on 0% EMI.</p>
        </div>
        <button
          onClick={onNavigateToShop}
          className="px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1"
          style={{ background: T.purple700 }}
        >
          Go to Shop <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
