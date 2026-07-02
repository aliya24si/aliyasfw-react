import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Award, LogOut, Sparkles, CalendarPlus, History, Heart, Clock, FileText, XCircle, PawPrint, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Skeleton } from "../components/Skeleton";

export default function MemberHistory() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      const { data, error } = await supabase
        .from("appointments")
        .select("*, patients(name)")
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error("Gagal memuat riwayat:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Batalkan appointment ini?")) return;
    setCancelling(id);
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", id);
      if (error) throw error;
      loadAppointments();
    } catch (err) {
      alert("Gagal membatalkan appointment.");
    } finally {
      setCancelling(null);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      scheduled: "bg-amber-100 text-amber-800 border-amber-200",
      completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    const labels = {
      scheduled: "Terjadwal",
      completed: "Selesai",
      cancelled: "Dibatalkan",
    };
    return { color: map[status] || "bg-gray-100 text-gray-500", label: labels[status] || status };
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col">
        <nav className="bg-slate-900 text-white px-8 py-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between">
            <Skeleton className="h-10 w-40 bg-slate-700" />
            <Skeleton className="h-10 w-28 bg-slate-700" />
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-6 py-12 space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col font-sans">
      <nav className="sticky top-0 z-50 bg-slate-900 text-white px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/member/home" className="flex items-center gap-3">
              <div className="bg-amber-400 text-slate-900 w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-base tracking-tight">PetTract</span>
            </Link>
            <div className="hidden md:flex items-center gap-1 border-l border-slate-700 pl-6 space-x-2">
              <Link to="/member/home" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
                <Sparkles className="w-4 h-4" /> Beranda VIP
              </Link>
              <Link to="/member/booking" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
                <CalendarPlus className="w-4 h-4" /> Buat Appointment
              </Link>
              <Link to="/member/history" className="text-sm font-bold text-amber-400 bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2">
                <History className="w-4 h-4" /> Riwayat Medis
              </Link>
            </div>
          </div>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:border-slate-600 px-4 py-2.5 rounded-xl transition cursor-pointer">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-5xl w-full mx-auto px-6 py-12 flex-1 space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Log Histori Kunjungan Medis</h1>
          <p className="text-sm text-slate-500">Pantau jadwal aktif dan riwayat appointment hewan peliharaan Anda.</p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-4">
            <PawPrint className="w-16 h-16 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-600">Belum Ada Riwayat</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Anda belum memiliki appointment. Buat janji temu sekarang untuk mulai menggunakan layanan kami.
            </p>
            <Link to="/member/booking" className="inline-block bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl transition shadow-md">
              Buat Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => {
              const badge = getStatusBadge(apt.status);
              const aptId = `APT-${apt.id.slice(0, 8).toUpperCase()}`;
              return (
                <div key={apt.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs hover:border-slate-300 transition">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-400">{aptId}</span>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {apt.patients?.name || "Hewan"} — {apt.notes || "Konsultasi"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(apt.appointment_date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} • {apt.appointment_time}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto pt-2 md:pt-0">
                    {apt.status === "completed" ? (
                      <button className="w-full md:w-auto text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition">
                        <FileText className="w-3.5 h-3.5" /> Lihat Hasil
                      </button>
                    ) : apt.status === "scheduled" ? (
                      <button
                        onClick={() => handleCancel(apt.id)}
                        disabled={cancelling === apt.id}
                        className="w-full md:w-auto text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                      >
                        {cancelling === apt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                        Batalkan
                      </button>
                    ) : (
                      <div className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
                        Dibatalkan
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <footer className="text-center text-xs font-semibold text-slate-500 py-6 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between px-8 max-w-7xl w-full mx-auto gap-4">
        <p>© 2026 PetTract CRM System.</p>
        <div className="flex items-center gap-1.5 text-blue-600">
          <Heart className="w-4 h-4 fill-blue-600" /> <span>Dedicated for your animal health journey</span>
        </div>
      </footer>
    </div>
  );
}