import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, CalendarPlus, Circle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const doctors = [
  {
    name: "drh. Rian Jombang",
    specialization: "Dokter Umum & Bedah",
    avatar: "RJ",
    status: "online",
    color: "from-[#102A5E] to-[#1D4ED8]",
  },
  {
    name: "drh. Maya Sari",
    specialization: "Spesialis Kulit & Alergi",
    avatar: "MS",
    status: "online",
    color: "from-[#1D4ED8] to-[#2563EB]",
  },
  {
    name: "drh. Budi Hartono",
    specialization: "Spesialis Gizi & Perilaku",
    avatar: "BH",
    status: "offline",
    color: "from-slate-400 to-slate-500",
  },
  {
    name: "drh. Dewi Lestari",
    specialization: "Spesialis Reproduksi",
    avatar: "DL",
    status: "online",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function MemberOnDuty() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[#1D4ED8]" />
          <h2 className="text-xl font-bold text-[#102A5E] tracking-tight">
            Dokter Bertugas
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/member/booking")}
          className="gap-1 text-[#1D4ED8] hover:text-[#102A5E] hover:bg-[#1D4ED8]/5 text-sm"
        >
          Booking
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {doctors.map((doctor, index) => (
          <Card
            key={index}
            className="border-[#102A5E]/10 bg-white rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-[#102A5E]/10 hover:-translate-y-0.5 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doctor.color} flex items-center justify-center shrink-0 shadow-lg`}
                >
                  <span className="text-white font-bold text-sm">
                    {doctor.avatar}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-[#102A5E] text-base truncate">
                      {doctor.name}
                    </h3>
                    <Circle
                      className={`w-2.5 h-2.5 fill-current ${
                        doctor.status === "online"
                          ? "text-emerald-500"
                          : "text-slate-300"
                      }`}
                    />
                  </div>
                  <p className="text-sm text-slate-500 truncate">
                    {doctor.specialization}
                  </p>

                  {/* Status badge */}
                  <div className="mt-2">
                    <Badge
                      variant={doctor.status === "online" ? "success" : "outline"}
                      className={`text-[10px] ${
                        doctor.status === "online"
                          ? "bg-emerald-100 text-emerald-700 border-0"
                          : "text-slate-400 border-slate-200"
                      }`}
                    >
                      {doctor.status === "online" ? "Sedang Bertugas" : "Tidak Bertugas"}
                    </Badge>
                  </div>
                </div>

                {/* Booking CTA */}
                <button
                  onClick={() => navigate("/member/booking")}
                  className="w-10 h-10 rounded-xl bg-[#1D4ED8]/10 flex items-center justify-center shrink-0 hover:bg-[#1D4ED8]/20 transition-colors group"
                >
                  <CalendarPlus className="w-5 h-5 text-[#1D4ED8] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 bg-gradient-to-br from-[#102A5E] to-[#1D4ED8] rounded-2xl p-8 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">
            Siap untuk Booking?
          </h3>
          <p className="text-sm text-white/70 max-w-md mx-auto mb-6">
            Jadwalkan pertemuan dengan dokter hewan terpercaya kami. Kesehatan
            hewan kesayangan Anda adalah prioritas utama kami.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/member/booking")}
            className="bg-white text-[#102A5E] hover:bg-zinc-100 font-semibold gap-2 h-12 px-8 shadow-lg"
          >
            <CalendarPlus className="w-4 h-4" />
            Booking Sekarang
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
