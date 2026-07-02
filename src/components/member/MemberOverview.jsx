import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus, History, PawPrint, User, Stethoscope } from "lucide-react";

export default function MemberOverview({ fullName, tier, points }) {
  const services = [
    {
      icon: CalendarPlus,
      title: "Reservasi Online",
      desc: "Buat janji temu kapan saja",
    },
    {
      icon: History,
      title: "Riwayat Medis Digital",
      desc: "Pantau histori kunjungan",
    },
    {
      icon: PawPrint,
      title: "Data Pasien Terpadu",
      desc: "Kelola data hewan peliharaan",
    },
  ];

  const tierColor =
    tier === "Gold"
      ? "bg-zinc-900 text-white"
      : tier === "Silver"
      ? "bg-zinc-200 text-zinc-800"
      : "bg-zinc-100 text-zinc-600";

  return (
    <section>
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
          Ringkasan
        </h2>
        <p className="text-sm text-zinc-500">
          Informasi singkat akun Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <Card className="border-zinc-200/80">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 font-bold text-zinc-950">
              <User className="w-4 h-4 text-zinc-500" />
              Profil Member
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
              <span className="text-sm text-zinc-500">Nama</span>
              <span className="text-sm font-medium text-zinc-950">{fullName}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
              <span className="text-sm text-zinc-500">Tier</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${tierColor}`}>
                {tier}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-100">
              <span className="text-sm text-zinc-500">Total Poin</span>
              <span className="text-sm font-bold text-zinc-950">{points.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-zinc-500">Status</span>
              <Badge variant="outline" className="border-zinc-300 text-zinc-600 text-xs">
                Aktif
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Services Card */}
        <Card className="border-zinc-200/80">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 font-bold text-zinc-950">
              <Stethoscope className="w-4 h-4 text-zinc-500" />
              Layanan Tersedia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.map((svc, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-200/70 flex items-center justify-center shrink-0">
                  <svc.icon className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-950">{svc.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{svc.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
