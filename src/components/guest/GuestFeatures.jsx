import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarCheck,
  FileText,
  ShieldCheck,
  Clock,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Jadwal Cerdas",
    description:
      "Booking janji temu dengan mudah melihat ketersediaan waktu dokter secara real-time. Dapatkan konfirmasi instan.",
  },
  {
    icon: FileText,
    title: "Rekam Medis Digital",
    description:
      "Rekam kesehatan elektronik yang lengkap dan mudah diakses. Lihat riwayat, diagnosis, dan resep kapan saja.",
  },
  {
    icon: ShieldCheck,
    title: "Platform Aman",
    description:
      "Enkripsi tingkat enterprise melindungi semua data medis. Privasi Anda dan informasi hewan tetap terjaga.",
  },
  {
    icon: Clock,
    title: "Akses 24/7",
    description:
      "Akses portal kapan pun Anda butuhkan. Booking janji, lihat rekam medis, dan hubungi tim veteriner Anda.",
  },
];

export default function GuestFeatures() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#102A5E]/10 border border-[#1D4ED8]/20 text-[#102A5E] text-xs font-semibold px-4 py-2 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
            Keunggulan Platform
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#102A5E]">
            Semua yang Anda Butuhkan
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Seperangkat alat komprehensif yang dirancang untuk menyederhanakan
            manajemen perawatan hewan bagi klinik dan pemilik hewan.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-[#102A5E]/10 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-[#102A5E]/10 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 rounded-2xl"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#102A5E]/10 to-[#1D4ED8]/10 flex items-center justify-center group-hover:from-[#102A5E]/20 group-hover:to-[#1D4ED8]/20 transition-all duration-300 mb-3">
                  <feature.icon className="w-6 h-6 text-[#1D4ED8] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="font-bold text-[#102A5E] text-lg">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
