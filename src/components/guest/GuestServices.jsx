import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Syringe,
  Scissors,
  Stethoscope,
  Bed,
  Microscope,
  Heart,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Syringe,
    title: "Vaksinasi",
    description:
      "Vaksinasi lengkap untuk mencegah penyakit berbahaya pada hewan kesayangan Anda.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Scissors,
    title: "Grooming",
    description:
      "Perawatan bulu dan kuku profesional untuk menjaga kebersihan dan kesehatan hewan.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Stethoscope,
    title: "Konsultasi",
    description:
      "Konsultasi dengan dokter hewan berpengalaman untuk pemeriksaan rutin dan diagnosa.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Bed,
    title: "Rawat Inap",
    description:
      "Fasilitas rawat inap yang nyaman dengan pengawasan medis 24 jam oleh tim dokter.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Microscope,
    title: "Laboratorium",
    description:
      "Layanan tes laboratorium lengkap untuk diagnosa yang akurat dan cepat.",
    color: "from-rose-500 to-red-500",
  },
  {
    icon: Heart,
    title: "Emergensi",
    description:
      "Layanan darurat 24 jam untuk kondisi kritis yang memerlukan penanganan segera.",
    color: "from-[#102A5E] to-[#1D4ED8]",
  },
];

export default function GuestServices() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 bg-[#102A5E]/10 border border-[#1D4ED8]/20 text-[#102A5E] text-xs font-semibold px-4 py-2 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
            Layanan Utama
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#102A5E]">
            Layanan Klinik Terpadu
          </h2>
          <p className="text-slate-500 leading-relaxed">
            Berbagai layanan medis lengkap untuk memenuhi kebutuhan kesehatan
            hewan kesayangan Anda.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group border-[#102A5E]/10 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-[#102A5E]/10 hover:-translate-y-1 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#102A5E] text-lg mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="gap-2 font-semibold border-[#1D4ED8]/30 text-[#1D4ED8] hover:bg-[#1D4ED8]/5 hover:border-[#1D4ED8]/50 h-11 px-6"
          >
            Lihat Semua Layanan
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
