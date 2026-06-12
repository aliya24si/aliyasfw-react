import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Award, 
  Sparkles, 
  LogOut, 
  QrCode, 
  CheckCircle, 
  Flame, 
  Ticket, 
  ShieldCheck, 
  Heart, 
  Copy, 
  Check,
  Zap,
  CalendarPlus,
  History,
  UserCheck,
  Stethoscope
} from "lucide-react";

export default function MemberHome() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  const memberProfile = {
    name: "Surya Kencana",
    tier: "Gold Active Member",
    points: 2450,
    memberId: "PT-GOLD-99812",
    petName: "Chiko (Persian Cat)"
  };

  const vouchers = [
    { id: "VCH-01", title: "Potongan Perawatan Gigi", desc: "Diskon 25% scaling gigi kucing/anjing", code: "DENTALCARE25" },
    { id: "VCH-02", title: "Free Premium Grooming", desc: "Gratis 1x mandi terapi kutu & jamur", code: "FREEGROOMING" },
    { id: "VCH-03", title: "Diskon Vaksinasi Rabies", desc: "Potongan Rp 50.000 untuk re-vaksinasi", code: "RABIESFREE" }
  ];

  const tiers = [
    { name: "Silver Member", range: "0 - 1.000 Poin", benefits: ["Diskon obat 5%", "Antrean reguler otomatis", "Konsultasi chat dokter"], current: false, color: "border-slate-300 bg-slate-50" },
    { name: "Gold Tier", range: "1.001 - 5.000 Poin", benefits: ["Diskon obat & tindakan 15%", "Prioritas booking frontdesk", "Free grooming 2 bulan sekali", "Diskon jemput satwa sakit"], current: true, color: "border-amber-400 bg-amber-50/30 ring-2 ring-amber-400" },
    { name: "Platinum VIP", range: "5.001+ Poin", benefits: ["Diskon semua layanan 25%", "Bebas biaya kamar rawat inap UGD", "Dokter panggilan 24/7 ke rumah", "Snack & Vitamin box bulanan"], current: false, color: "border-purple-400 bg-purple-50/20" }
  ];

  // Data Dokter Aktif yang dipindahkan dari Guest Home
  const activeDoctors = [
    { name: "drh. Citra Kirana Sp.An", spec: "Spesialis Anestesi & Satwa Kecil", status: "On-Duty", time: "08:00 - 15:00" },
    { name: "drh. Rian Jombang", spec: "Spesialis Bedah & Satwa Eksotis", status: "On-Duty", time: "13:00 - 20:00" },
    { name: "drh. Farhan Malik", spec: "Dokter Gigi Hewan & Umum", status: "On-Duty", time: "10:00 - 17:00" }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col font-sans">
      
      {/* ================= NAVBAR MEMBER ================= */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/member/home" className="flex items-center gap-3 group">
              <div className="bg-amber-400 text-slate-900 w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-md group-hover:scale-105 transition">
                <Award className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-base tracking-tight">PetTract</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 border-l border-slate-700 pl-6 space-x-2">
              <Link to="/member/home" className="text-sm font-bold text-amber-400 bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Beranda VIP
              </Link>
              <Link to="/member/booking" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
                <CalendarPlus className="w-4 h-4" /> Buat Appointment
              </Link>
              <Link to="/member/history" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl flex items-center gap-2 transition">
                <History className="w-4 h-4" /> Riwayat Medis
              </Link>
            </div>
          </div>

          <button 
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out Account
          </button>
        </div>
      </nav>

      {/* ================= 1. DASHBOARD RINGKASAN MEMBER ================= */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white py-14 px-8 border-b border-slate-700">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="space-y-3 lg:col-span-2">
            <div className="bg-amber-400/10 border border-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-amber-400" /> Selamat Datang Kembali, Member Eksklusif
            </div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight">{memberProfile.name}</h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Terima kasih telah mempercayakan kesehatan medis <strong className="text-white">{memberProfile.petName}</strong> pada ekosistem digital PetTract.
            </p>
            <div className="pt-2">
              <button onClick={() => navigate("/member/booking")} className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-5 py-3 rounded-xl transition shadow-md flex items-center gap-2">
                <CalendarPlus className="w-4 h-4" /> Booking Slot Sekarang
              </button>
            </div>
          </div>

          {/* Card Kartu Member Digital */}
          <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-6 text-slate-900 shadow-xl relative overflow-hidden transform hover:-translate-y-1 transition duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Tier Keanggotaan</span>
                <h3 className="text-xl font-black leading-tight tracking-tight">{memberProfile.tier}</h3>
              </div>
              <QrCode className="w-10 h-10 text-slate-900 opacity-90" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-900/10">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-700 block">Total Poin</span>
                <span className="text-2xl font-black tracking-tight">{memberProfile.points} <span className="text-xs font-medium">Pts</span></span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-slate-700 block">ID Anggota</span>
                <span className="text-sm font-mono font-bold tracking-wider">{memberProfile.memberId}</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl w-full mx-auto px-8 py-12 space-y-16 flex-1">
        
        {/* ================= BARU: SEKSI DOKTER AKTIF HARI INI ================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" /> Live Tracking
            </div>
            <h2 className="text-2xl font-black text-slate-900">Dokter Spesialis Siaga Hari Ini</h2>
            <p className="text-slate-500 text-sm">Berikut jadwal realtime dokter hewan VIP yang stand-by di pusat klinik untuk menangani pasien member.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeDoctors.map((doc, index) => (
              <div key={index} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex justify-between items-center hover:shadow-md transition">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                  <p className="text-xs text-slate-500">{doc.spec}</p>
                  <p className="text-[11px] text-slate-400 font-medium pt-1">Shift Jam: {doc.time}</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-extrabold flex items-center gap-1 shrink-0">
                  <UserCheck className="w-3 h-3" /> {doc.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SEKSI VOUCHER PROMO ================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Ticket className="w-4 h-4" /> Benefit Klaim Instan
            </div>
            <h2 className="text-2xl font-black text-slate-900">Katalog Voucher & Promo Khusus Anda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vouchers.map((v) => (
              <div key={v.id} className="bg-white border-2 border-dashed border-slate-200 p-6 rounded-3xl flex flex-col justify-between gap-4 relative hover:border-blue-300 transition-colors bg-gradient-to-b from-white to-slate-50/50">
                <div className="space-y-2">
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md font-bold uppercase">{v.id}</span>
                  <h4 className="font-extrabold text-base text-slate-900">{v.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => handleCopy(v.code)}
                    className="w-full flex items-center justify-between text-xs font-mono font-bold bg-slate-100 text-slate-700 px-4 py-3 rounded-xl border border-slate-200/60 transition cursor-pointer"
                  >
                    <span>{v.code}</span>
                    {copiedCode === v.code ? (
                      <span className="text-emerald-600 flex items-center gap-1 font-sans text-[11px] font-bold"><Check className="w-3.5 h-3.5" /> Tersalin</span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SEKSI TIER MEMBERSHIP ================= */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Leveling System
            </div>
            <h2 className="text-2xl font-black text-slate-900">Sistem Tingkatan Kualifikasi Member</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border-2 flex flex-col justify-between gap-6 relative ${t.color}`}>
                {t.current && (
                  <span className="absolute -top-3 left-6 text-[10px] bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-black uppercase shadow-sm tracking-wider">
                    Level Anda Saat Ini
                  </span>
                )}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-black text-lg text-slate-900">{t.name}</h4>
                    <span className="text-xs font-semibold text-slate-400 block mt-0.5">{t.range}</span>
                  </div>
                  <ul className="space-y-2.5 pt-2">
                    {t.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-600 flex items-start gap-2 leading-tight">
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${t.current ? "text-amber-500" : "text-slate-400"}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INFORMASI ADVANATAGE ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-lg min-h-[300px]">
            <img src="/img/dokter1.jpg" alt="Premium Doctor Service" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] bg-amber-400 text-slate-900 px-2 py-0.5 rounded-md uppercase font-black tracking-wider">VIP Concierge</span>
              <p className="text-sm text-slate-200 font-medium mt-1.5">Akses cepat dokter spesialis siaga khusus pemilik kartu prioritas Gold dan Platinum.</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Garansi Layanan Utama
              </div>
              <h3 className="font-black text-xl text-slate-900 tracking-tight">Kelebihan Menggunakan Jalur Member</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-sm text-slate-900">Rekam Medis Terkunci</h5>
                <p className="text-xs text-slate-500">Histori alergi dan resep Chiko tersimpan permanen tanpa risiko hilang.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <h5 className="font-bold text-sm text-slate-900">Bebas Antre Walk-In</h5>
                <p className="text-xs text-slate-500">Datang sesuai jam kesepakatan langsung dipanggil masuk ruang poli.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs font-semibold text-slate-500 py-8 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between px-8 max-w-7xl w-full mx-auto gap-4">
        <p>© 2026 PetTract Premium CRM Gate. Secure Session Active Node.</p>
        <div className="flex items-center gap-1.5 text-blue-600">
          <Heart className="w-4 h-4 fill-blue-600" /> <span>Dedicated for your animal health journey</span>
        </div>
      </footer>

    </div>
  );
}