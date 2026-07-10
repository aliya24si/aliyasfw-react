import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarPlus,
  ArrowRight,
  Sparkles,
  Activity,
  User,
  Award,
  Shield,
  PawPrint,
} from "lucide-react";

export default function MemberHeroCard({ fullName, tier, points, onBooking }) {
  const tierConfig = {
    Gold: { color: "from-yellow-400 to-amber-600", label: "Gold", icon: Award },
    Silver: {
      color: "from-slate-300 to-slate-500",
      label: "Silver",
      icon: Shield,
    },
    Bronze: {
      color: "from-amber-700 to-amber-900",
      label: "Bronze",
      icon: Shield,
    },
  };

  const currentTier = tierConfig[tier] || tierConfig.Bronze;
  const TierIcon = currentTier.icon;

  return (
    <section className="bg-[#F8FAFC] pt-24 pb-10 md:pt-28 md:pb-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* Greeting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#102A5E]">
                Selamat Datang, {fullName}
              </h1>
              <Badge className="bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] text-white text-xs font-medium border-0">
                <User className="w-3 h-3 mr-1" />
                Member Aktif
              </Badge>
            </div>
            <p className="text-slate-500 text-base max-w-xl leading-relaxed">
              Kelola janji temu, pantau riwayat medis, dan data hewan kesayangan
              Anda dalam satu platform terintegrasi.
            </p>
          </div>

          <Button
            size="lg"
            onClick={onBooking}
            className="gap-2 font-semibold shrink-0 bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] text-white hover:from-[#1D4ED8] hover:to-[#102A5E] shadow-lg shadow-[#102A5E]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#102A5E]/30 hover:-translate-y-0.5"
          >
            <PawPrint className="w-4 h-4" /> {/* Icon diganti di sini */}
            Buat Data Pasien
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Membership Card */}
        <div className="max-w-lg">
          <div
            className={`bg-gradient-to-br from-[#102A5E] to-[#1D4ED8] rounded-3xl p-8 shadow-2xl shadow-[#102A5E]/30 border border-white/10 text-white relative overflow-hidden`}
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl w-10 h-10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">
                    PetTract
                  </p>
                  <p className="text-[10px] text-white/50">Member Card</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                <TierIcon className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span className="text-xs font-bold text-white">
                  {currentTier.label}
                </span>
              </div>
            </div>

            {/* Card Number */}
            <div className="relative z-10 mb-8">
              <p className="text-xs text-white/50 mb-2">ID Member</p>
              <p className="text-xl md:text-2xl font-mono tracking-widest text-white/90">
                •••• •••• •••• 2024
              </p>
            </div>

            {/* Card Footer */}
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs text-white/50 mb-1">Nama</p>
                <p className="font-semibold text-white text-sm truncate max-w-[180px]">
                  {fullName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50 mb-1">Total Poin</p>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FBBF24]" />
                  <p className="font-bold text-white text-lg">
                    {points.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Stats Row */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-[#102A5E]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
              </div>
              <div>
                <span className="font-semibold text-[#102A5E]">
                  {points.toLocaleString()}
                </span>
                <span className="text-slate-400 ml-1">Poin</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-[#102A5E]/10 flex items-center justify-center">
                <span className="text-xs font-bold text-[#1D4ED8]">
                  {currentTier.label.charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#102A5E]">
                  {currentTier.label}
                </span>
                <span className="text-slate-400 ml-1">Tier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
