import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Skeleton } from "../components/Skeleton";
import { useNavigate, Link } from "react-router-dom";
import { Award, LogOut, Sparkles, CalendarPlus, History, ShieldCheck, Heart, AlertCircle, PawPrint } from "lucide-react";

export default function MemberBooking() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    patient_id: "",
    date: "",
    timeSlot: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }
      setUserId(user.id);

      const { data, error: fetchError } = await supabase
        .from("patients")
        .select("id, name")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setPatients(data || []);
    } catch (err) {
      console.error("Gagal memuat data hewan:", err);
      setError("Gagal memuat daftar hewan.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patient_id || !formData.date || !formData.timeSlot) return;
    setSaving(true);
    setError(null);
    try {
      const timeMap = {
        "Pagi (09:00 - 11:00)": "09:00",
        "Siang (13:00 - 15:00)": "13:00",
        "Sore (16:00 - 18:00)": "16:00",
        "Malam VIP (19:00 - 21:00)": "19:00",
      };
      const { error: insertError } = await supabase.from("appointments").insert({
        user_id: userId,
        patient_id: formData.patient_id,
        appointment_date: formData.date,
        appointment_time: timeMap[formData.timeSlot],
        status: "scheduled"
      });
      if (insertError) throw insertError;
      setIsSubmitted(true);
      setTimeout(() => navigate("/member/history"), 2500);
    } catch (err) {
      console.error("Gagal membuat appointment:", err);
      setError("Gagal membuat appointment. Coba lagi.");
    } finally {
      setSaving(false);
    }
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
        <main className="max-w-3xl mx-auto px-6 py-12">
          <Skeleton className="h-10 w-72 mb-4" />
          <Skeleton className="h-96 w-full rounded-3xl" />
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
              <Link to="/member/booking" className="text-sm font-bold text-amber-400 bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2">
                <CalendarPlus className="w-4 h-4" /> Buat Appointment
              </Link>
              <Link to="/member/history" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
                <History className="w-4 h-4" /> Riwayat Medis
              </Link>
            </div>
          </div>
          <button onClick={async () => { await supabase.auth.signOut(); navigate("/login"); }} className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-xl cursor-pointer">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-3xl w-full mx-auto px-6 py-12 flex-1">
        <div className="space-y-2 mb-8 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reservasi Slot Medis</h1>
          <p className="text-sm text-slate-500">Pilih hewan peliharaan dan jadwal yang diinginkan.</p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center space-y-3 shadow-sm">
            <ShieldCheck className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-black text-slate-900">Appointment Berhasil Dibuat!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">Dialihkan ke riwayat pemesanan...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-md space-y-6">
            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pilih Hewan</label>
              {patients.length === 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 flex items-center gap-2">
                  <PawPrint className="w-4 h-4 shrink-0" />
                  Belum ada data hewan. <Link to="/member/patients" className="font-bold underline">Tambah di sini</Link>
                </div>
              ) : (
                <select required value={formData.patient_id} onChange={(e) => setFormData({...formData, patient_id: e.target.value})}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none">
                  <option value="">-- Pilih Hewan --</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tanggal Kedatangan</label>
                <input required type="date" value={formData.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Sesi Jam</label>
                <select required value={formData.timeSlot} onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none">
                  <option value="">-- Pilih Jam --</option>
                  <option value="Pagi (09:00 - 11:00)">Pagi (09:00 - 11:00)</option>
                  <option value="Siang (13:00 - 15:00)">Siang (13:00 - 15:00)</option>
                  <option value="Sore (16:00 - 18:00)">Sore (16:00 - 18:00)</option>
                  <option value="Malam VIP (19:00 - 21:00)">Malam VIP (19:00 - 21:00)</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={saving || patients.length === 0}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm py-4 rounded-xl transition cursor-pointer shadow-md disabled:opacity-40">
              {saving ? "Memproses..." : "Konfirmasi & Kunci Slot"}
            </button>
          </form>
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