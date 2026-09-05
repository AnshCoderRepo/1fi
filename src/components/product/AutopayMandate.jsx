import React, { useState } from "react";
import { Smartphone, CreditCard, Building2, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import TopBar from "../common/TopBar.jsx";
import { T } from "../../theme/tokens.js";
import { rupee } from "../../utils/format.js";

const MANDATE_OPTIONS = [
  { id: "upi", name: "UPI AutoPay", sub: "GPay, PhonePe, Paytm, BHIM", icon: Smartphone, badge: "Recommended" },
  { id: "netbanking", name: "NetBanking e-Mandate", sub: "HDFC, ICICI, SBI, Axis & more", icon: Building2 },
  { id: "debit", name: "Debit Card e-Mandate", sub: "All major bank Visa/Mastercard", icon: CreditCard },
];

export default function AutopayMandate({ order, onBack, onConfirmMandate }) {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("user@okaxis");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmMandate({
        ...order,
        mandateMethod: method,
        mandateRef: `1FI-MANDATE-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    }, 750);
  };

  return (
    <div className="pb-24">
      <TopBar title="Setup 0% EMI Auto-debit" onBack={onBack} />

      <div className="px-4 pt-4">
        <div className="p-3.5 rounded-2xl border" style={{ background: T.card, borderColor: T.line }}>
          <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: T.line }}>
            <div>
              <p className="text-xs font-semibold" style={{ color: T.sub }}>Monthly instalment</p>
              <p className="text-lg font-bold" style={{ color: T.ink }}>{rupee(order.plan.monthly)}/mo</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#EEF8D3", color: T.limeDark }}>
                0% Interest
              </span>
              <p className="text-[11px] mt-0.5 font-medium" style={{ color: T.sub }}>{order.plan.months} instalments</p>
            </div>
          </div>
          <div className="pt-2 flex justify-between text-xs" style={{ color: T.sub }}>
            <span>First EMI deduction:</span>
            <span className="font-semibold" style={{ color: T.ink }}>1st of next month</span>
          </div>
        </div>

        <p className="text-xs font-semibold mt-5 mb-2.5" style={{ color: T.sub }}>
          SELECT AUTOPAY METHOD
        </p>

        <div className="space-y-2.5">
          {MANDATE_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const active = method === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setMethod(opt.id)}
                className="w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all"
                style={{
                  borderColor: active ? T.purple600 : T.line,
                  background: active ? `${T.purple600}0A` : T.card,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: active ? `${T.purple600}18` : T.bg }}
                  >
                    <Icon size={18} color={active ? T.purple700 : T.sub} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold" style={{ color: T.ink }}>{opt.name}</p>
                      {opt.badge && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px]" style={{ color: T.sub }}>{opt.sub}</p>
                  </div>
                </div>

                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0"
                  style={{ borderColor: active ? T.purple600 : T.line, background: active ? T.purple600 : "transparent" }}
                >
                  {active && <CheckCircle2 size={12} color="#FFF" />}
                </div>
              </button>
            );
          })}
        </div>

        {method === "upi" && (
          <div className="mt-4 p-3.5 rounded-xl border bg-white" style={{ borderColor: T.line }}>
            <label className="block text-[11px] font-semibold mb-1" style={{ color: T.sub }}>
              Verify UPI ID for AutoPay
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium rounded-lg border outline-none focus:border-purple-600"
              style={{ borderColor: T.line }}
            />
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-purple-50/60 border border-purple-100">
          <ShieldCheck size={16} color={T.purple700} className="shrink-0 mt-0.5" />
          <p className="text-[11px] text-purple-900 leading-relaxed">
            Secured by NPCI & RBI approved DigiLocker e-mandate. You can pause or cancel auto-pay anytime from your 1Fi profile.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="w-full max-w-md pointer-events-auto p-4 bg-white/90 backdrop-blur-md border-t" style={{ borderColor: T.line }}>
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99] disabled:opacity-60"
            style={{ background: T.purple700 }}
          >
            {isProcessing ? (
              <span>Authorizing e-Mandate...</span>
            ) : (
              <>
                <span>Authorize & Activate EMI</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
