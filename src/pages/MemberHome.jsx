import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/Skeleton";
import { supabase } from "../lib/supabase";
import {
  CalendarPlus,
  History,
  PawPrint,
  LogOut,
  Sparkles,
  Heart,
  Activity,
  ArrowRight,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

const quickActions = [
  {
    label: "Buat Janji Temu",
    description: "Reservasi slot dokter hewan",
    icon: CalendarPlus,
    route: "/member/booking",
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Riwayat Medis",
    description: "Lihat histori kunjungan",
    icon: History,
    route: "/member/history",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Data Pasien",
    description: "Kelola data hewan",
    icon: PawPrint,
    route: "/member/patients",
    color: "text-amber-600 bg-amber-50",
  },
];

export default function MemberHome() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/login");
          return;
        }

        const { data, error: profileError } = await supabase
          .from("users")
          .select("full_name, role, points, tier")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        if (!cancelled) setProfile(data);
      } catch (err) {
        console.error("Gagal memuat profil member:", err);
        if (!cancelled) setError("Gagal memuat data profil. Silakan refresh halaman.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();
    return () => { cancelled = true; };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col">
        <div className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="max-w-7xl mx-auto px-6 w-full py-12 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-72" />
            <Skeleton className="h-5 w-96" />
            <Skeleton className="h-5 w-64" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center space-y-4 p-8">
          <ShieldCheck className="w-16 h-16 text-red-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Gagal Memuat Dashboard</h2>
          <p className="text-sm text-slate-500">{error}</p>
          <Button onClick={() => window.location.reload()} variant="default">
            Refresh Halaman
          </Button>
        </div>
      </div>
    );
  }

  const fullName = profile?.full_name || "Member";
  const tier = profile?.tier || "Bronze";
  const points = profile?.points || 0;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased flex flex-col">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900">
              PetTract
            </span>
            <Badge variant="success" className="hidden sm:inline-flex ml-2">
              Member Area
            </Badge>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="gap-2 text-slate-600"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      </header>

      {/* ================= WELCOME BANNER ================= */}
      <section className="bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                  Halo, {fullName}
                </h1>
                <Badge variant="success" className="text-xs">
                  Active Member
                </Badge>
              </div>
              <p className="text-slate-500 text-base max-w-xl">
                Selamat datang di portal member PetTract. Kelola janji temu,
                pantau riwayat medis, dan data hewan kesayangan Anda dalam satu
                tempat.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="font-medium text-slate-700">{points.toLocaleString()} Poin</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Badge variant={tier === "Gold" ? "default" : "secondary"} className="text-[11px]">
                    {tier}
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => navigate("/member/booking")}
              className="gap-2 font-semibold shrink-0"
            >
              <CalendarPlus className="w-4 h-4" />
              Buat Janji Temu
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1 space-y-10">
        {/* Quick Actions */}
        <section>
          <div className="space-y-1 mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Aksi Cepat</h2>
            <p className="text-sm text-slate-500">Akses fitur utama dengan cepat.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.route)}
                className="group text-left bg-white rounded-xl border border-slate-200/80 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${action.color} group-hover:scale-110 transition-transform duration-200`}
                  >
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-base">{action.label}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{action.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Overview Section */}
        <section>
          <div className="space-y-1 mb-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Ringkasan</h2>
            <p className="text-sm text-slate-500">Informasi singkat akun Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-200/80">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Profil Member
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Nama</span>
                  <span className="text-sm font-medium text-slate-900">{fullName}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Tier</span>
                  <Badge variant={tier === "Gold" ? "default" : "secondary"}>{tier}</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-500">Total Poin</span>
                  <span className="text-sm font-bold text-slate-900">{points.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-500">Status</span>
                  <Badge variant="success">Aktif</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  Layanan Tersedia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl">
                  <CalendarPlus className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Reservasi Online</p>
                    <p className="text-xs text-slate-500">Buat janji temu kapan saja</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-xl">
                  <History className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Riwayat Medis Digital</p>
                    <p className="text-xs text-slate-500">Pantau histori kunjungan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl">
                  <PawPrint className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Data Pasien Terpadu</p>
                    <p className="text-xs text-slate-500">Kelola data hewan peliharaan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Info Banner */}
        <section>
          <div className="bg-gradient-to-br from-primary to-slate-800 rounded-2xl p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight">Butuh Bantuan?</h3>
                <p className="text-sm text-slate-300 max-w-lg">
                  Hubungi tim dukungan kami jika Anda memiliki pertanyaan atau
                  membutuhkan bantuan terkait layanan PetTract.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button variant="outline" size="sm" onClick={() => navigate("/member/history")}
                  className="border-white/20 text-white hover:bg-white/10">
                  Riwayat Saya
                </Button>
                <Button size="sm" onClick={() => navigate("/member/booking")}
                  className="bg-white text-primary hover:bg-slate-100">
                  Booking Sekarang
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">&copy; 2026 PetTract. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Dedicated for your animal health journey</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
