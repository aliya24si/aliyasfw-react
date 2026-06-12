import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Award, LogOut, Sparkles, CalendarPlus, History, ShieldCheck, Heart, AlertCircle } from "lucide-react";

export default function MemberBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petName: "Chiko (Persian Cat)",
    service: "",
    doctor: "",
    date: "",
    timeSlot: "",
    notes: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      navigate("/member/history"); // Arahkan ke riwayat jika sukses
    }, 2500);
  };

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
              <Link to="/member/booking" className="text-sm font-bold text-amber-400 bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2">
                <CalendarPlus className="w-4 h-4" /> Buat Appointment
              </Link>
              <Link to="/member/history" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
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
      <main className="max-w-3xl w-full mx-auto px-6 py-12 flex-1">
        <div className="space-y-2 mb-8 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reservasi Slot Medis Prioritas</h1>
          <p className="text-sm text-slate-500">Sebagai <span className="text-amber-600 font-bold">Gold Member</span>, antrean Anda otomatis dimasukkan ke dalam prioritas utama frontdesk.</p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center space-y-3 shadow-sm">
            <ShieldCheck className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-black text-slate-900">Appointment Berhasil Dibuat!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">Sistem cerdas kami sedang mengunci jadwal dokter. Anda akan dialihkan ke halaman riwayat pemesanan...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-md space-y-6">
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Nama Pasien Satwa</label>
              <input type="text" value={formData.petName} disabled className="w-full bg-slate-100 text-slate-700 font-bold px-4 py-3 rounded-xl border border-slate-200 text-sm cursor-not-allowed" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pilih Layanan</label>
                <select required value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none">
                  <option value="">-- Pilih Layanan Medis --</option>
                  <option value="Konsultasi Dokter Umum">Konsultasi Dokter Umum (Gold Priority)</option>
                  <option value="Vaksinasi / Imunisasi">Vaksinasi Rutin</option>
                  <option value="Scaling Gigi & Mulut">Dental Scaling</option>
                  <option value="Premium Grooming Terapi">Premium Grooming Kutu/Jamur (Free Voucher)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Dokter Spesialis Siaga</label>
                <select required value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none">
                  <option value="">-- Pilih Dokter Ahli --</option>
                  <option value="drh. Citra Kirana Sp.An">drh. Citra Kirana Sp.An (Spesialis Kucing)</option>
                  <option value="drh. Rian Jombang">drh. Rian Jombang (Spesialis Bedah/Internal)</option>
                  <option value="Dokter Siaga On-Duty">Dokter Jaga Utama Hari Ini</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tanggal Kedatangan</label>
                <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Sesi Jam Berobat</label>
                <select required value={formData.timeSlot} onChange={(e) => setFormData({...formData, timeSlot: e.target.value})} className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none">
                  <option value="">-- Pilih Jam --</option>
                  <option value="Pagi (09:00 - 11:00)">Pagi (09:00 - 11:00)</option>
                  <option value="Siang (13:00 - 15:00)">Siang (13:00 - 15:00)</option>
                  <option value="Sore (16:00 - 18:00)">Sore (16:00 - 18:00)</option>
                  <option value="Malam VIP (19:00 - 21:00)">Malam VIP (19:00 - 21:00)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Catatan Keluhan Singkat (Opsional)</label>
              <textarea rows="3" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Contoh: Chiko terlihat lemas sejak kemarin malam dan kurang nafsu makan..." className="w-full bg-white px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none" />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-900 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
              <p className="leading-relaxed"><strong>Informasi:</strong> Sebagai Gold Member, Anda dibebaskan dari biaya booking reservasi di muka. Pembayaran obat/tindakan dilakukan langsung di kasir RS dengan potongan otomatis diskon 15%.</p>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm py-4 rounded-xl transition cursor-pointer shadow-md">
              Konfirmasi & Kunci Slot Antrean
            </button>
          </form>
        )}
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