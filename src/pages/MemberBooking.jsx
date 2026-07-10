import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, AlertCircle, PawPrint, Tag, Stethoscope, Syringe, Heart, Scissors, Microscope } from "lucide-react";
import GlobalNavbar from "@/components/layout/GlobalNavbar";
import GlobalFooter from "@/components/layout/GlobalFooter";

const serviceTypes = [
  { value: "konsultasi", label: "Konsultasi Umum", icon: Stethoscope, price: 150000 },
  { value: "vaksinasi", label: "Vaksinasi", icon: Syringe, price: 200000 },
  { value: "cek_rutin", label: "Pengecekan Rutin", icon: Heart, price: 100000 },
  { value: "grooming", label: "Grooming", icon: Scissors, price: 120000 },
  { value: "laboratorium", label: "Laboratorium", icon: Microscope, price: 250000 },
];

const doctors = [
  { name: "drh. Rian Jombang", specialization: "Dokter Umum & Bedah" },
  { name: "drh. Maya Sari", specialization: "Spesialis Kulit & Alergi" },
  { name: "drh. Budi Hartono", specialization: "Spesialis Gizi & Perilaku" },
  { name: "drh. Dewi Lestari", specialization: "Spesialis Reproduksi" },
];

const validCoupons = {
  BRONZE10: { discountPercent: 10, description: "Diskon 10% untuk member Bronze" },
  GOLD20: { discountPercent: 20, description: "Diskon 20% untuk member Gold" },
  GRATISKONSUL: { discountPercent: 100, description: "Gratis konsultasi" },
  PETCARE: { discountPercent: 15, description: "Diskon 15% asuransi kesehatan" },
};

const timeSlots = [
  "Pagi (09:00 - 11:00)",
  "Siang (13:00 - 15:00)",
  "Sore (16:00 - 18:00)",
  "Malam VIP (19:00 - 21:00)",
];

export default function MemberBooking() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    patient_id: "",
    service_type: [], // DIUBAH: Menjadi array untuk menampung beberapa layanan
    doctor_name: "",
    date: "",
    timeSlot: "",
    coupon_code: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponError, setCouponError] = useState("");

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
        .select("id, name, species")
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // DIUBAH: Menghitung akumulasi harga dari semua layanan yang dipilih
  const selectedServices = serviceTypes.filter(s => formData.service_type.includes(s.value));
  const basePrice = selectedServices.reduce((acc, curr) => acc + curr.price, 0);
  const discountPercent = couponApplied?.discountPercent || 0;
  const finalPrice = basePrice - Math.round(basePrice * discountPercent / 100);

  // LOGIKA BARU: Fungsi untuk menambah/menghapus layanan dengan batasan min 1 max 2
  const handleServiceSelect = (val) => {
    setFormData((prev) => {
      const current = prev.service_type;
      if (current.includes(val)) {
        // Jika sudah ada, hapus dari list
        return { ...prev, service_type: current.filter((item) => item !== val) };
      } else {
        // Jika belum ada, cek apakah sudah mencapai batas maksimal 2
        if (current.length >= 2) {
          alert("Maksimal hanya dapat memilih 2 layanan sekaligus.");
          return prev;
        }
        return { ...prev, service_type: [...current, val] };
      }
    });
  };

  const applyCoupon = () => {
    const code = formData.coupon_code.trim().toUpperCase();
    if (!code) { setCouponError("Masukkan kode kupon"); return; }
    const coupon = validCoupons[code];
    if (coupon) {
      setCouponApplied(coupon);
      setCouponError("");
    } else {
      setCouponApplied(null);
      setCouponError("Kode kupon tidak valid");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // DIUBAH: Validasi minimal harus memilih 1 layanan
    if (!formData.patient_id || formData.service_type.length === 0 || !formData.doctor_name || !formData.date || !formData.timeSlot) return;
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
        // DIUBAH: Menggabungkan beberapa layanan menjadi string dipisah koma (e.g., "konsultasi, vaksinasi") agar tetap kompatibel dengan database tipe text
        service_type: formData.service_type.join(", "),
        doctor_name: formData.doctor_name,
        appointment_date: formData.date,
        appointment_time: timeMap[formData.timeSlot],
        total_price: finalPrice,
        coupon_code: formData.coupon_code.trim().toUpperCase() || null,
        discount_amount: discountPercent > 0 ? basePrice - finalPrice : 0,
        status: "scheduled",
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
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <div className="bg-white/80 backdrop-blur-md border-b border-[#102A5E]/10 px-6 h-16 flex items-center justify-between">
          <div className="bg-[#102A5E]/10 h-8 w-40 rounded-lg animate-pulse" />
          <div className="bg-[#102A5E]/10 h-8 w-28 rounded-lg animate-pulse" />
        </div>
        <main className="max-w-3xl mx-auto px-6 py-12 w-full">
          <div className="bg-[#102A5E]/5 h-10 w-72 rounded-lg animate-pulse mb-4" />
          <div className="bg-[#102A5E]/5 h-96 w-full rounded-3xl animate-pulse" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#102A5E] antialiased flex flex-col">
      <GlobalNavbar isLoggedIn={true} onSignOut={handleSignOut} variant="member" />
      <main className="max-w-4xl w-full mx-auto px-6 pt-28 pb-12 flex-1">
        <div className="space-y-2 mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#102A5E] tracking-tight">Reservasi Appointment</h1>
          <p className="text-sm text-slate-500">Pilih layanan, dokter, hewan, dan jadwal yang diinginkan.</p>
        </div>

        {isSubmitted ? (
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center space-y-3 shadow-sm">
            <ShieldCheck className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-[#102A5E]">Appointment Berhasil Dibuat!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {finalPrice > 0 && (
                <span className="block mt-1 font-semibold">Total Pembayaran: Rp {finalPrice.toLocaleString("id-ID")}</span>
              )}
              Dialihkan ke riwayat pemesanan...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#102A5E]/10 rounded-3xl p-8 shadow-lg shadow-[#102A5E]/5 space-y-6">
            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}

            {/* Pilih Layanan (DIUBAH untuk Multi-select) */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Pilih Layanan</label>
                <span className="text-xs text-slate-400 font-medium">Bisa pilih 1 - 2 layanan ({formData.service_type.length}/2)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {serviceTypes.map((svc) => {
                  // Cek apakah item ini ada di dalam array service_type
                  const isSelected = formData.service_type.includes(svc.value);
                  return (
                    <button
                      key={svc.value}
                      type="button"
                      onClick={() => handleServiceSelect(svc.value)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-[#1D4ED8] bg-[#1D4ED8]/5 shadow-sm ring-1 ring-[#1D4ED8]"
                          : "border-[#102A5E]/10 hover:border-[#1D4ED8]/30 hover:bg-[#1D4ED8]/5"
                      }`}
                    >
                      <svc.icon className={`w-6 h-6 mb-2 ${isSelected ? "text-[#1D4ED8]" : "text-slate-400"}`} />
                      <p className="text-sm font-semibold text-[#102A5E]">{svc.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Rp {svc.price.toLocaleString("id-ID")}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pilih Dokter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pilih Dokter</label>
              <select
                required
                value={formData.doctor_name}
                onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                className="w-full bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none"
              >
                <option value="">-- Pilih Dokter --</option>
                {doctors.map((doc, i) => (
                  <option key={i} value={doc.name}>{doc.name} — {doc.specialization}</option>
                ))}
              </select>
            </div>

            {/* Pilih Hewan */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Pilih Hewan</label>
              {patients.length === 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 flex items-center gap-2">
                  <PawPrint className="w-4 h-4 shrink-0" />
                  Belum ada data hewan. <Link to="/member/patients" className="font-bold underline">Tambah di sini</Link>
                </div>
              ) : (
                <select
                  required
                  value={formData.patient_id}
                  onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none"
                >
                  <option value="">-- Pilih Hewan --</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}{p.species ? ` (${p.species})` : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Tanggal & Jam */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tanggal Kedatangan</label>
                <input
                  required type="date" value={formData.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Sesi Jam</label>
                <select
                  required
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none"
                >
                  <option value="">-- Pilih Jam --</option>
                  {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
            </div>

            {/* Kode Kupon / Diskon */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                <Tag className="w-3.5 h-3.5 inline mr-1" />
                Kode Kupon / Diskon (opsional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.coupon_code}
                  onChange={(e) => { setFormData({ ...formData, coupon_code: e.target.value }); setCouponApplied(null); setCouponError(""); }}
                  placeholder="Contoh: BRONZE10, GOLD20"
                  className="flex-1 bg-white px-4 py-3 rounded-xl border border-[#102A5E]/10 text-sm font-medium focus:ring-2 focus:ring-[#1D4ED8]/30 outline-none uppercase"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="px-5 bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] text-white text-xs font-bold rounded-xl hover:from-[#1D4ED8] hover:to-[#102A5E] transition-all"
                >
                  Pakai
                </button>
              </div>
              {couponApplied && (
                <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  {couponApplied.description} — Potongan {couponApplied.discountPercent}%
                </div>
              )}
              {couponError && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {couponError}
                </div>
              )}
            </div>

            {/* Ringkasan Harga (DIUBAH untuk mendukung rincian multi-layanan) */}
            {selectedServices.length > 0 && (
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#102A5E]/10 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Ringkasan Biaya</h4>
                {selectedServices.map((svc) => (
                  <div key={svc.value} className="flex justify-between text-sm">
                    <span className="text-slate-600">{svc.label}</span>
                    <span className="font-medium text-[#102A5E]">Rp {svc.price.toLocaleString("id-ID")}</span>
                  </div>
                ))}
                {discountPercent > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">Diskon ({discountPercent}%)</span>
                    <span className="font-medium text-emerald-600">-Rp {(basePrice - finalPrice).toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-[#102A5E]/10">
                  <span className="font-bold text-[#102A5E]">Total</span>
                  <span className="font-bold text-[#1D4ED8]">Rp {finalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={saving || patients.length === 0 || formData.service_type.length === 0}
              className="w-full bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#102A5E] text-white font-bold text-sm py-4 rounded-xl transition-all cursor-pointer shadow-md shadow-[#102A5E]/20 disabled:opacity-40"
            >
              {saving ? "Memproses..." : "Konfirmasi & Booking Appointment"}
            </button>
          </form>
        )}
      </main>
      <GlobalFooter variant="member" />
    </div>
  );
}