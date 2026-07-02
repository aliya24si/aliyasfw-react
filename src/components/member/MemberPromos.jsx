import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Star, Shield, ArrowRight, Tag, CheckCircle, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const promos = [
  {
    icon: Star,
    title: "Gold Member Benefits",
    description: "Nikmati diskon 20% untuk semua layanan grooming dan vaksinasi.",
    color: "from-yellow-400 to-amber-500",
    badge: "Gold",
    code: "GOLD20",
    tier: "Gold",
    discount: "20%",
  },
  {
    icon: Gift,
    title: "Promo Spesial Bulan Ini",
    description: "Gratis konsultasi dokter untuk member baru yang booking di bulan ini.",
    color: "from-pink-500 to-rose-500",
    badge: "Limited",
    code: "GRATISKONSUL",
    tier: "All",
    discount: "Free",
  },
  {
    icon: Tag,
    title: "Bronze Promo - Diskon 10%",
    description: "Kupon diskon khusus member Bronze. Aktifkan sekarang dan nikmati potongan harga!",
    color: "from-amber-600 to-amber-800",
    badge: "Bronze",
    code: "BRONZE10",
    tier: "Bronze",
    discount: "10%",
  },
  {
    icon: Shield,
    title: "Asuransi Kesehatan",
    description: "Perlindungan ekstra untuk hewan kesayangan Anda dengan asuransi khusus.",
    color: "from-emerald-500 to-teal-500",
    badge: "Premium",
    code: "PETCARE",
    tier: "All",
    discount: "15%",
  },
  {
    icon: Sparkles,
    title: "Referral Program",
    description: "Ajak teman dan dapatkan kode promo eksklusif + 100 poin untuk setiap referral.",
    color: "from-purple-500 to-violet-500",
    badge: "Bonus",
    code: "REFERRAL50",
    tier: "All",
    discount: "50K",
  },
];

function PromoCode({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between bg-[#102A5E]/5 rounded-xl px-4 py-2.5 mt-3 border border-[#102A5E]/10">
      <div className="flex items-center gap-2">
        <Tag className="w-3.5 h-3.5 text-[#1D4ED8]" />
        <code className="text-xs font-mono font-bold text-[#102A5E] tracking-wider">{code}</code>
      </div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 text-[10px] font-bold text-[#1D4ED8] hover:text-[#102A5E] transition-colors"
      >
        {copied ? (
          <><CheckCircle className="w-3 h-3" /> Tersalin!</>
        ) : (
          <><Copy className="w-3 h-3" /> Klaim</>
        )}
      </button>
    </div>
  );
}

export default function MemberPromos() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#1D4ED8]" />
          <h2 className="text-xl font-bold text-[#102A5E] tracking-tight">
            Promo & Benefit
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/member/booking")}
          className="gap-1 text-[#1D4ED8] hover:text-[#102A5E] hover:bg-[#1D4ED8]/5 text-sm"
        >
          Booking Sekarang
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
        {promos.map((promo, index) => (
          <div
            key={index}
            className="min-w-[300px] sm:min-w-[340px] snap-start animate-in fade-in slide-in-from-right-4"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
          >
            <Card className="border-[#102A5E]/10 bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#102A5E]/10 hover:-translate-y-0.5 h-full">
              <div className={`h-2 bg-gradient-to-r ${promo.color}`} />
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${promo.color} flex items-center justify-center shrink-0 shadow-lg`}>
                    <promo.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-[#102A5E] text-base">{promo.title}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${promo.color} text-white whitespace-nowrap`}>
                        {promo.badge}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-1">{promo.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#102A5E]">Diskon {promo.discount}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400">Min. {promo.tier}</span>
                    </div>
                    {/* Promo Code dengan tombol Klaim */}
                    <PromoCode code={promo.code} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
