import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus, Sparkles, ArrowRight, User } from "lucide-react";


export default function MemberWelcome({ fullName, tier, points, onBooking }) {
  return (
    <section className="bg-white border-b border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
                Halo, {fullName}
              </h1>
              <Badge variant="outline" className="border-zinc-300 text-zinc-600 text-xs font-medium">
                <User className="w-3 h-3 mr-1" />
                Active Member
              </Badge>
            </div>
            <p className="text-zinc-500 text-base max-w-xl leading-relaxed">
              Selamat datang di portal member PetTract. Kelola janji temu,
              pantau riwayat medis, dan data hewan kesayangan Anda dalam satu
              tempat.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 pt-1">
              <div className="flex items-center gap-2.5 text-sm">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-zinc-600" />
                </div>
                <div>
                  <span className="font-semibold text-zinc-950">{points.toLocaleString()}</span>
                  <span className="text-zinc-400 ml-1">Poin</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-zinc-600">
                    {tier === "Gold" ? "G" : tier === "Silver" ? "S" : "B"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-zinc-950">{tier}</span>
                  <span className="text-zinc-400 ml-1">Tier</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={onBooking}
            className="gap-2 font-semibold shrink-0 bg-zinc-950 text-white hover:bg-zinc-800"
          >
            <CalendarPlus className="w-4 h-4" />
            Buat Janji Temu
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
