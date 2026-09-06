import React from "react";
import { ShieldCheck, CreditCard, Bell, FileText, ChevronRight, CheckCircle2, Heart } from "lucide-react";
import { T } from "../../theme/tokens.js";

export default function ProfileTab({ wishlistedCount = 0 }) {
  const settings = [
    { icon: Heart, title: "Saved & Wishlist Items", status: `${wishlistedCount} item${wishlistedCount === 1 ? "" : "s"}` },
    { icon: ShieldCheck, title: "KYC & Identity", status: "Verified" },
    { icon: CreditCard, title: "Active AutoPay e-Mandates", status: "1 Active" },
    { icon: Bell, title: "Payment & EMI Reminders", status: "Enabled" },
    { icon: FileText, title: "Statements & Repayment Receipts", status: "View" },
  ];

  return (
    <div className="pb-10">
      <div className="px-4 py-3.5 sticky top-0 z-10" style={{ background: T.card, borderBottom: `1px solid ${T.line}` }}>
        <p className="font-bold text-sm" style={{ color: T.ink }}>Account & Profile</p>
      </div>

      {/* User Card */}
      <div className="mx-4 mt-4 p-4 rounded-2xl border bg-white flex items-center gap-3.5" style={{ borderColor: T.line }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shrink-0" style={{ background: T.purple700 }}>
          A
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold" style={{ color: T.ink }}>Ansh Kumar</p>
            <CheckCircle2 size={14} color="#16A34A" />
          </div>
          <p className="text-xs text-gray-500">+91 98765 43210</p>
          <span className="inline-block text-[10px] font-bold text-purple-700 mt-1 bg-purple-50 px-2 py-0.5 rounded-md">
            1Fi Premium Member
          </span>
        </div>
      </div>

      {/* Settings Options */}
      <div className="px-4 pt-5">
        <p className="text-xs font-semibold mb-2.5" style={{ color: T.sub }}>ACCOUNT SETTINGS</p>
        <div className="rounded-2xl border bg-white overflow-hidden divide-y" style={{ borderColor: T.line }}>
          {settings.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
                    <Icon size={16} color={T.purple700} />
                  </div>
                  <p className="text-xs font-medium" style={{ color: T.ink }}>{s.title}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-gray-500">{s.status}</span>
                  <ChevronRight size={14} color={T.sub} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* App Version Info */}
      <div className="text-center pt-8 text-[11px] text-gray-400">
        1Fi Marketplace App v1.2.0 · RBI Regulated Lending Partner
      </div>
    </div>
  );
}
