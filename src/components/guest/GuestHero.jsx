import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
// Foto hero dari public/img/
import dokter3 from "/img/dokter3.jpg";

export default function GuestHero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#F8FAFC]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102A5E]/5 to-[#F8FAFC]" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#1D4ED8]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-[#102A5E]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#102A5E]/10 border border-[#1D4ED8]/20 text-[#102A5E] text-xs font-semibold px-4 py-2 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
                Sistem Manajemen Klinik Modern
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#102A5E] leading-[1.08]">
                Perawatan Kesehatan
                <br />
                <span className="text-slate-500">Terbaik untuk </span>
                <span className="text-[#1D4ED8] underline decoration-[#1D4ED8]/30 underline-offset-8 decoration-3">
                  Hewan Kesayangan
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Platform digital yang menghubungkan pemilik hewan dengan dokter
                veteriner profesional. Kelola janji temu, akses rekam medis, dan
                pantau kesehatan — semua dalam satu tempat.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="gap-2 font-semibold text-base h-12 px-8 bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] text-white hover:from-[#1D4ED8] hover:to-[#102A5E] shadow-lg shadow-[#102A5E]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#102A5E]/30 hover:-translate-y-0.5"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/login")}
                className="font-semibold text-base h-12 px-8 border-[#1D4ED8]/30 text-[#1D4ED8] hover:bg-[#1D4ED8]/5 hover:border-[#1D4ED8]/50"
              >
                Masuk
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-500">
                <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                <span>Rekam Medis Digital</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-500">
                <div className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                <span>Booking Online 24/7</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-500">
                <Shield className="w-4 h-4 text-[#1D4ED8]" />
                <span>Aman & Terenkripsi</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#102A5E]/15 border border-white/20">
              <img
                src={dokter3}
                alt="PetTract Veterinary Care"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-4 -left-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg shadow-[#102A5E]/10 border border-white/20 p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#102A5E] to-[#1D4ED8] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#102A5E]">500+</p>
                  <p className="text-xs text-slate-500">Pasien Aktif</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg shadow-[#102A5E]/10 border border-white/20 p-4 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FBBF24]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#FBBF24]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#102A5E]">50+</p>
                  <p className="text-xs text-slate-500">Dokter Ahli</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
