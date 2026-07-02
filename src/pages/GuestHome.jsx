import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Stethoscope,
  Clock,
  FileHeart,
  ShieldCheck,
  ArrowRight,
  CalendarCheck,
  Phone,
  MapPin,
  Mail,
  Heart,
  Activity,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Pelayanan Cepat & Tepat",
    description:
      "Tim dokter hewan profesional siap melayani diagnosa dan penanganan medis dengan sistem antrean digital yang transparan.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Clock,
    title: "Reservasi Online 24/7",
    description:
      "Buat janji temu kapan saja melalui portal online. Pilih jadwal yang sesuai tanpa perlu mengantre di loket.",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: FileHeart,
    title: "Rekam Medis Digital",
    description:
      "Riwayat kesehatan hewan kesayangan tersimpan aman dan dapat diakses kapan saja oleh Anda dan dokter yang bertugas.",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: ShieldCheck,
    title: "Terintegrasi & Transparan",
    description:
      "Seluruh proses dari pendaftaran, tindakan medis, hingga pembayaran tercatat dalam satu ekosistem digital yang terpercaya.",
    color: "text-amber-600 bg-amber-50",
  },
];

export default function GuestHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased flex flex-col">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900">
                PetTract
              </span>
              <span className="hidden sm:inline text-[10px] text-slate-400 ml-2 font-medium">
                Klinik Hewan Digital
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")}
              className="hidden sm:inline-flex font-medium"
            >
              Masuk
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate("/register")}
              className="font-medium"
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Activity className="w-3.5 h-3.5" />
                  Sistem Manajemen Klinik Terpadu
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                  Kesehatan Hewan
                  <span className="text-primary"> Terintegrasi </span>
                  dalam Satu Platform
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  Kelola janji temu, akses rekam medis digital, dan pantau
                  kesehatan hewan kesayangan Anda melalui portal online yang
                  mudah dan cepat.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="gap-2 font-semibold text-base h-12 px-8"
                >
                  Buat Janji Temu Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="font-semibold text-base h-12 px-8"
                >
                  Sudah Punya Akun? Masuk
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Data Terenkripsi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-emerald-500" />
                  <span>Reservasi Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileHeart className="w-4 h-4 text-emerald-500" />
                  <span>Rekam Medis Digital</span>
                </div>
              </div>
            </div>

            <div className="relative lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src="/img/dokter1.jpg"
                  alt="Veterinary care"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-slate-100 p-4 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">200+</p>
                    <p className="text-xs text-slate-400">Hewan Ditangani</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES / SERVICES SECTION ================= */}
      <section className="py-20 md:py-28 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <Activity className="w-3.5 h-3.5" />
              Layanan Kami
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Mengapa Memilih PetTract?
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Platform digital terpercaya yang menghubungkan pemilik hewan
              dengan layanan kesehatan veteriner modern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/80"
              >
                <CardContent className="p-6 space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-lg">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-slate-800 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Siap Memberikan yang Terbaik untuk Hewan Kesayangan?
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Daftar sekarang dan nikmati kemudahan akses layanan kesehatan
                hewan secara digital. Gratis, cepat, dan tanpa ribet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  variant="default"
                  onClick={() => navigate("/register")}
                  className="bg-white text-primary hover:bg-slate-100 font-semibold gap-2 h-12 px-8"
                >
                  Daftar Gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="border-white/20 text-white hover:bg-white/10 font-semibold h-12 px-8"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg text-slate-900">PetTract</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Platform manajemen klinik hewan digital yang memudahkan pemilik
                hewan dan tenaga medis dalam satu ekosistem terpadu.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Kontak</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Pekanbaru, Indonesia</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-500">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>+62 812 3456 7890</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-500">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>hello@pettract.id</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Jam Operasional</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span className="font-medium text-slate-700">08:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sabtu</span>
                  <span className="font-medium text-slate-700">09:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Minggu & Libur</span>
                  <span className="font-medium text-slate-700">09:00 - 15:00</span>
                </li>
                <li className="flex justify-between text-emerald-600 font-medium">
                  <span>UGD (24 Jam)</span>
                  <span>Siaga</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">&copy; 2026 PetTract. All rights reserved.</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>Dedicated for your animal health journey</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
