import React from "react";
import { Award, Shield, CheckCircle2, Star } from "lucide-react";

export default function MemberTierInfo({ currentPoints, currentTier }) {
  const tiers = [
    {
      name: "Bronze",
      range: "0 - 999 Poin",
      desc: "Tier awal untuk member baru.",
      icon: Shield,
      color: "text-amber-700 bg-amber-50 border-amber-200",
      iconColor: "text-amber-700",
      req: "Otomatis didapatkan saat mendaftar"
    },
    {
      name: "Silver",
      range: "1.000 - 4.999 Poin",
      desc: "Butuh 1.000 poin untuk naik dari Bronze.",
      icon: Shield,
      color: "text-slate-500 bg-slate-50 border-slate-200",
      iconColor: "text-slate-400",
      req: "Kumpulkan minimal 1.000 total poin"
    },
    {
      name: "Gold",
      range: "5.000+ Poin",
      desc: "Butuh 5.000 poin untuk naik dari Silver.",
      icon: Award,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      iconColor: "text-amber-500",
      req: "Kumpulkan minimal 5.000 total poin"
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#102A5E]/5 flex items-center justify-center">
          <Star className="w-5 h-5 text-[#1D4ED8]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#102A5E]">Informasi Tingkat Member</h2>
          <p className="text-xs text-slate-400">Kumpulkan poin dari setiap layanan untuk menaikkan tingkat akun Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((t) => {
          const TierIcon = t.icon;
          const isUserTier = currentTier?.toLowerCase() === t.name.toLowerCase();

          return (
            <div
              key={t.name}
              className={`relative rounded-2xl p-5 border transition-all duration-300 ${
                isUserTier
                  ? "border-[#1D4ED8] bg-[#1D4ED8]/5 shadow-md ring-1 ring-[#1D4ED8]/30"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              {isUserTier && (
                <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-[#1D4ED8] bg-[#1D4ED8]/10 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tier Kamu
                </span>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${t.color}`}>
                  <TierIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#102A5E] text-base">{t.name}</h3>
                  <p className={`text-xs font-semibold ${isUserTier ? "text-[#1D4ED8]" : "text-slate-500"}`}>
                    {t.range}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-500 leading-relaxed">{t.desc}</p>
                <div className="pt-2 border-t border-slate-100/80">
                  <span className="text-slate-400 block mb-0.5 text-[10px] uppercase font-medium tracking-wider">Syarat:</span>
                  <p className="text-[#102A5E] font-medium">{t.req}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}