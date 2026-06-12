import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Award, LogOut, Sparkles, CalendarPlus, History, Heart, Clock, CheckCircle2, FileText } from "lucide-react";

export default function MemberHistory() {
  const navigate = useNavigate();

  // Dummy data riwayat appointment dan rekam medis
  const appointmentHistory = [
    {
      id: "APT-2026-004",
      service: "Konsultasi Dokter Umum & Cek Alergi",
      doctor: "drh. Citra Kirana Sp.An",
      date: "15 Juni 2026",
      time: "10:00 WIB",
      status: "Menunggu Kedatangan",
      statusColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      id: "APT-2026-001",
      service: "Vaksinasi Rabies Tahunan",
      doctor: "drh. Rian Jombang",
      date: "10 Mei 2026",
      time: "14:00 WIB",
      status: "Selesai Tindakan",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
      id: "APT-2026-002",
      service: "Scaling Gigi Kucing",
      doctor: "drh. Citra Kirana Sp.An",
      date: "22 April 2026",
      time: "16:00 WIB",
      status: "Selesai Tindakan",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col font-sans">
      {/* NAVBAR */}
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
          <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-xl">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </nav>

      {/* ISI KONTEN */}
      <main className="max-w-5xl w-full mx-auto px-6 py-12 flex-1 space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Log Histori Kunjungan Medis</h1>
          <p className="text-sm text-slate-500">Pantau jadwal aktif peliharaan Anda beserta arsip ringkasan diagnosis resep dokter terdahulu.</p>
        </div>

        {/* List Riwayat */}
        <div className="space-y-4">
          {appointmentHistory.map((apt) => (
            <div key={apt.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs hover:border-slate-300 transition">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-400">{apt.id}</span>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${apt.statusColor}`}>
                    {apt.status}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-900">{apt.service}</h3>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {apt.date} • {apt.time}</span>
                  <span className="hidden sm:inline text-slate-300">|</span>
                  <span className="font-medium text-slate-700">Dokter: {apt.doctor}</span>
                </div>
              </div>

              <div className="w-full md:w-auto pt-2 md:pt-0">
                {apt.status.includes("Selesai") ? (
                  <button className="w-full md:w-auto text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition">
                    <FileText className="w-3.5 h-3.5" /> Lihat E-Resep & Hasil
                  </button>
                ) : (
                  <div className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
                    Gunakan Barcode Member Saat Tiba
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs font-semibold text-slate-500 py-6 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between px-8 max-w-7xl w-full mx-auto gap-4">
        <p>© 2026 PetTract CRM System.</p>
        <div className="flex items-center gap-1.5 text-blue-600">
          <Heart className="w-4 h-4 fill-blue-600" /> <span>Dedicated for your animal health journey</span>
        </div>
      </footer>
    </div>
  );
}