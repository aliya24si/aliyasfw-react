import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Clock, FileText, XCircle, PawPrint, Loader2, Tag, X, Star } from "lucide-react";
import { supabase } from "../lib/supabase";
import GlobalNavbar from "@/components/layout/GlobalNavbar";
import GlobalFooter from "@/components/layout/GlobalFooter";

const speciesLabels = {
  anjing: "Anjing", kucing: "Kucing", kelinci: "Kelinci",
  hamster: "Hamster", burung: "Burung", reptil: "Reptil", ikan: "Ikan", lainnya: "Lainnya",
};

const serviceLabels = {
  konsultasi: "Konsultasi Umum", vaksinasi: "Vaksinasi",
  cek_rutin: "Pengecekan Rutin", grooming: "Grooming", laboratorium: "Laboratorium",
};

export default function MemberHistory() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const [selectedApt, setSelectedApt] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // State Baru untuk Ulasan
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      // Mengambil data sekaligus kolom rating & review_comment yang baru dibuat
      const { data, error } = await supabase
        .from("appointments")
        .select("*, patients(name, species)")
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

  const handleViewResult = async (apt) => {
    setSelectedApt(apt);
    setLoadingHistory(true);
    setModalOpen(true);
    
    // Reset form input ulasan ke default setiap kali modal dibuka
    setReviewRating(apt.rating || 5);
    setReviewText(apt.review_comment || "");

    try {
      const { data, error } = await supabase
        .from("medical_histories")
        .select("*")
        .eq("appointment_id", apt.id)
        .maybeSingle();
      if (error) throw error;
      setMedicalHistory(data);
    } catch (err) {
      console.error("Gagal memuat rekam medis:", err);
      setMedicalHistory(null);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Fungsi Baru untuk Mengirim Ulasan ke Supabase
  const handleSubmitReview = async (appointmentId) => {
    if (!reviewText.trim()) return alert("Silakan tulis komentar ulasan Anda.");
    setSubmittingReview(true);
    try {
      const { error } = await supabase
        .from("appointments")
        .update({
          rating: reviewRating,
          review_comment: reviewText,
          reviewed_at: new Date().toISOString()
        })
        .eq("id", appointmentId);

      if (error) throw error;
      
      // Update state lokal agar UI langsung berubah tanpa reload halaman
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, rating: reviewRating, review_comment: reviewText } : apt
      ));
      setSelectedApt(prev => ({ ...prev, rating: reviewRating, review_comment: reviewText }));
      alert("Terima kasih! Ulasan Anda berhasil disimpan.");
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim ulasan.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      scheduled: { color: "bg-amber-100 text-amber-800 border-amber-200", label: "Terjadwal" },
      completed: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", label: "Selesai" },
      cancelled: { color: "bg-red-100 text-red-800 border-red-200", label: "Dibatalkan" },
    };
    return map[status] || { color: "bg-gray-100 text-gray-500", label: status };
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const formatRupiah = (num) => {
    if (!num) return "-";
    return "Rp " + num.toLocaleString("id-ID");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <div className="bg-white/80 backdrop-blur-md border-b border-[#102A5E]/10 px-6 h-16 flex items-center justify-between">
          <div className="bg-[#102A5E]/10 h-8 w-40 rounded-lg animate-pulse" />
          <div className="bg-[#102A5E]/10 h-8 w-28 rounded-lg animate-pulse" />
        </div>
        <main className="max-w-5xl mx-auto px-6 py-12 w-full space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="bg-[#102A5E]/5 h-24 w-full rounded-2xl animate-pulse" />)}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#102A5E] antialiased flex flex-col">
      <GlobalNavbar isLoggedIn={true} onSignOut={handleSignOut} variant="member" />
      <main className="max-w-5xl w-full mx-auto px-6 pt-28 pb-12 flex-1 space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#102A5E] tracking-tight">Riwayat Appointment</h1>
          <p className="text-sm text-slate-500">Pantau jadwal aktif dan riwayat appointment hewan peliharaan Anda.</p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white border border-[#102A5E]/10 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <PawPrint className="w-16 h-16 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-[#102A5E]">Belum Ada Riwayat</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Anda belum memiliki appointment. Buat janji temu sekarang untuk mulai menggunakan layanan kami.
            </p>
            <Link to="/member/booking" className="inline-block bg-gradient-to-r from-[#102A5E] to-[#1D4ED8] text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-md">
              Buat Appointment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => {
              const badge = getStatusBadge(apt.status);
              const aptId = `APT-${apt.id.slice(0, 8).toUpperCase()}`;
              return (
                <div key={apt.id} className="bg-white border border-[#102A5E]/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm hover:shadow-md hover:border-[#1D4ED8]/20 transition-all">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-400">{aptId}</span>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${badge.color}`}>{badge.label}</span>
                      {apt.service_type && (
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8] font-bold">
                          {serviceLabels[apt.service_type] || apt.service_type}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-[#102A5E]">
                      {apt.patients?.name || "Hewan"}
                      {apt.patients?.species && <span className="text-slate-400 font-normal"> ({speciesLabels[apt.patients.species] || apt.patients.species})</span>}
                      {apt.doctor_name && <span className="text-slate-400 font-normal"> — {apt.doctor_name}</span>}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(apt.appointment_date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} • {apt.appointment_time}
                      </span>
                      {apt.total_price > 0 && (
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          <span className={apt.discount_amount > 0 ? "text-emerald-600" : "text-[#1D4ED8]"}>
                            {formatRupiah(apt.total_price)}
                            {apt.discount_amount > 0 && <span className="text-slate-400 ml-1 line-through">{formatRupiah(apt.total_price + apt.discount_amount)}</span>}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-auto pt-2 md:pt-0 flex gap-2">
                    {apt.status === "completed" ? (
                      <button
                        onClick={() => handleViewResult(apt)}
                        className={`w-full md:w-auto text-xs font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer border ${
                          apt.rating 
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100" 
                            : "text-[#1D4ED8] bg-[#1D4ED8]/10 border-[#1D4ED8]/20 hover:bg-[#1D4ED8]/20"
                        }`}
                      >
                        {apt.rating ? (
                          <>
                            <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Hasil & Ulasan
                          </>
                        ) : (
                          <>
                            <FileText className="w-3.5 h-3.5" /> Beri Ulasan / Hasil
                          </>
                        )}
                      </button>
                    ) : apt.status === "scheduled" ? (
                      <button
                        onClick={() => handleCancel(apt.id)}
                        disabled={cancelling === apt.id}
                        className="w-full md:w-auto text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
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

      {/* Modal Medical History & Ulasan */}
      {modalOpen && selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#102A5E]">Rekam Medis & Ulasan</h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              <div className="bg-[#F8FAFC] rounded-xl p-4 space-y-1.5 text-sm border border-[#102A5E]/10">
                <p><span className="font-bold text-[#102A5E]">Pasien:</span> {selectedApt.patients?.name}</p>
                {selectedApt.patients?.species && <p><span className="font-bold text-[#102A5E]">Jenis:</span> {speciesLabels[selectedApt.patients.species] || selectedApt.patients.species}</p>}
                {selectedApt.doctor_name && <p><span className="font-bold text-[#102A5E]">Dokter:</span> {selectedApt.doctor_name}</p>}
                <p><span className="font-bold text-[#102A5E]">Tanggal:</span> {new Date(selectedApt.appointment_date).toLocaleDateString("id-ID")} • {selectedApt.appointment_time}</p>
                {selectedApt.service_type && <p><span className="font-bold text-[#102A5E]">Layanan:</span> {serviceLabels[selectedApt.service_type] || selectedApt.service_type}</p>}
              </div>

              {loadingHistory ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-[#1D4ED8] animate-spin" />
                  <span className="ml-2 text-sm text-slate-500">Memuat rekam medis...</span>
                </div>
              ) : medicalHistory ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Diagnosis</label>
                    <div className="bg-white border border-[#102A5E]/10 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
                      {medicalHistory.diagnosis}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Tindakan / Treatment</label>
                    <div className="bg-white border border-[#102A5E]/10 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
                      {medicalHistory.treatment}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 text-center">
                    Dicatat pada {new Date(medicalHistory.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 border-b border-gray-100 pb-5">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">Rekam medis belum tersedia atau sedang diproses.</p>
                </div>
              )}

              {/* SEKSI INPUT / TAMPILAN ULASAN */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-bold text-[#102A5E] mb-2">Ulasan Pelayanan</label>
                
                {selectedApt.rating ? (
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 text-sm">
                    <div className="flex items-center gap-1 text-amber-500 font-bold mb-1">
                      {"★".repeat(selectedApt.rating)}{"☆".repeat(5 - selectedApt.rating)}
                      <span className="text-xs text-slate-500 ml-1">({selectedApt.rating}/5)</span>
                    </div>
                    <p className="text-slate-600 italic">"{selectedApt.review_comment}"</p>
                  </div>
                ) : (
                  <div className="space-y-3 bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                    <p className="text-xs text-slate-500">Bagaimana kepuasan Anda terhadap pelayanan kami? Berikan rating:</p>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star} 
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className={`text-2xl transition cursor-pointer ${star <= reviewRating ? "text-amber-500" : "text-slate-300"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Tulis ulasan masukan atau ucapan terima kasih untuk dokter/klinik..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-[#1D4ED8]"
                      rows={2}
                    />
                    <button
                      onClick={() => handleSubmitReview(selectedApt.id)}
                      disabled={submittingReview}
                      className="w-full py-2 bg-[#102A5E] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-lg transition disabled:opacity-50 cursor-pointer"
                    >
                      {submittingReview ? "Mengirim..." : "Kirim Ulasan"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <GlobalFooter variant="member" />
    </div>
  );
} 