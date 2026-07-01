import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  LogOut,
  Calendar,
  CheckCircle2,
  Sparkles,
  Clock,
  ArrowRight,
  HeartHandshake,
  FileSpreadsheet,
  Smartphone,
  ShieldCheck,
  Stethoscope,
  Info,
  PhoneCall,
  MapPin,
  ChevronDown,
  UserCheck,
  Zap,
  CheckCircle,
  LogIn,
  MessageSquare,
  Star,
  Heart,
} from "lucide-react";

export default function GuestHome() {
  const navigate = useNavigate();

  // State untuk FAQ Accordion
  const [openFaq, setOpenFaq] = useState(null);

  // 1. Implementasi useRef untuk merujuk ke seksi Review/Testimoni
  const reviewSectionRef = useRef(null);

  // 2. Implementasi useEffect untuk memantau siklus hidup komponen saat pertama kali dimuat
  useEffect(() => {
    console.log("PetTract Public Portal Node: Active Connection Verified (2026).");
  }, []);

  // Fungsi pembantu untuk memicu scroll halus ke seksi review
  const scrollToReviews = () => {
    reviewSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Data Tier Membership untuk informasi edukasi Guest
  const tiers = [
    {
      name: "Silver Member",
      range: "0 - 1.000 Poin",
      benefits: [
        "Diskon obat 5%",
        "Antrean reguler otomatis",
        "Konsultasi chat dokter",
      ],
      color: "border-slate-300 bg-slate-50",
    },
    {
      name: "Gold Tier",
      range: "1.001 - 5.000 Poin",
      benefits: [
        "Diskon obat & tindakan 15%",
        "Prioritas booking frontdesk",
        "Free grooming 2 bulan sekali",
        "Diskon jemput satwa sakit",
      ],
      color: "border-amber-400 bg-amber-50/30 ring-2 ring-amber-400",
    },
    {
      name: "Platinum VIP",
      range: "5.001+ Poin",
      benefits: [
        "Diskon semua layanan 25%",
        "Bebas biaya kamar rawat inap UGD",
        "Dokter panggilan 24/7 ke rumah",
        "Snack & Vitamin box bulanan",
      ],
      color: "border-purple-400 bg-purple-50/20",
    },
  ];

  // Data Review/Testimoni Pelanggan menggunakan 6 aset gambar (Lengkap dengan review6.jpg)
  const reviews = [
    { id: 1, img: "/img/review1.jpg", name: "Anisa Rahma", pet: "Milo (Cat Owner)", text: "Dokternya ramah banget dan klinik sangat steril. Rekomendasi utama untuk anabul!" },
    { id: 2, img: "/img/review2.jpg", name: "Budi Santoso", pet: "Bleky (Dog Owner)", text: "Penanganan darurat di UGD sangat cepat, obatnya lengkap dan harganya transparan." },
    { id: 3, img: "/img/review3.jpg", name: "Rian Dinata", pet: "Kiko (Rabbit Owner)", text: "Tempat bersih bebas dari bau amis kotoran, staf frontdesk sigap menyambut." },
    { id: 4, img: "/img/review4.jpg", name: "Siti Amelia", pet: "Chacha (Persian Cat)", text: "Grooming kutunya ampuh banget sekali datang langsung bersih mengembang!" },
    { id: 5, img: "/img/review5.jpg", name: "Kevin Wijaya", pet: "Gupi (Golden Retriever)", text: "Suka sekali dengan sistem registrasi digitalnya, rekam medis peliharaan tersusun rapi." },
    { id: 6, img: "/img/review6.jpg", name: "Dina Olivia", pet: "Ciko & Cika (Sugar Glider)", text: "Dokter hewannya sangat detail menjelaskan edukasi pakan dan vitamin!" },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col font-sans">
      
      {/* ================= 1. HEADER NAVBAR ATAS ================= */}
      <nav className="sticky top-0 z-50 bg-slate-900 text-white px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 group">
              <div className="bg-amber-400 text-slate-900 w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-md">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    PetTract
                  </span>
                  <span className="text-[10px] bg-amber-400/10 border border-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    Public Portal
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1 border-l border-slate-700 pl-6 space-x-2">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Hospital Management System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-600 px-4 py-2.5 rounded-xl transition"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-400" />
              Sign In System
            </button>
          </div>
        </div>
      </nav>

      {/* ================= 2. HERO BANNER WELCOME ================= */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white py-14 px-8 border-b border-slate-700">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold w-fit uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Pendaftaran Online Aktif & Terintegrasi
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight max-w-4xl">
            Sistem Manajemen Klinis Satwa Modern Terpadu
          </h1>
          <p className="text-slate-400 text-sm max-w-4xl leading-relaxed">
            Selamat datang di portal publik PetTract. Di bawah ini Anda dapat
            mempelajari kapabilitas ekosistem digital kami, mempelajari sistem
            keuntungan keanggotaan, hingga melihat informasi penanganan gawat
            darurat.
          </p>
          <div className="pt-2">
            <button
              onClick={scrollToReviews}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Lihat Ulasan Pengunjung
            </button>
          </div>
        </div>
      </header>

      {/* ================= 3. SEKSI EDUKASI & FOTO HERO UTAMA ================= */}
      <main className="max-w-7xl w-full mx-auto px-8 py-12 space-y-16 flex-1">
        
        {/* Mengenal PetTract + Grid Foto Utama */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-center space-y-5">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Eco-System Intro
            </div>
            <h2 className="font-black text-xl text-slate-900 tracking-tight">
              Mengenal Platform PetTract
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              <strong className="text-slate-900">PetTract</strong> adalah ekosistem digital terintegrasi
              yang dirancang khusus untuk menyederhanakan manajemen operasional
              rumah sakit hewan dan klinik praktisi satwa. Kami menghubungkan
              pemilik hewan peliharaan, staf medis, hingga dokter spesialis
              dalam satu basis data terpadu guna menghadirkan pelayanan
              kesehatan hewan yang cepat, transparan, dan terukur secara{" "}
              <span className="text-blue-600 font-semibold">real-time</span>.
            </p>
          </div>

          {/* Implementasi Foto Medis Utama */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-lg min-h-[240px]">
            <img
              src="/img/dokter1.jpg"
              alt="PetTract Expert Veterinarian"
              className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] bg-amber-400 text-slate-900 px-2 py-0.5 rounded-md uppercase font-black tracking-wider">
                Core Care
              </span>
              <p className="text-sm text-slate-200 font-medium mt-1.5">
                Pelayanan medis profesional didukung sistem catatan e-Health pintar.
              </p>
            </div>
          </div>
        </section>

        {/* Fitur Utama */}
        <section className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Activity className="w-4 h-4" /> Architecture Matrix
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Apa Saja Yang Bisa Dilakukan di Dalam Sistem?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fitur 1 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex gap-4 items-start hover:shadow-md transition">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Identifikasi & Reservasi Instan
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pemilik dapat mengajukan jadwal janji temu, jenis tindakan,
                  serta memantau nomor urut antrean berjalan melalui portal
                  publik tanpa perlu mengantre lama.
                </p>
              </div>
            </div>

            {/* Fitur 2 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex gap-4 items-start hover:shadow-md transition">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Rekam Medis Digital (Electronic e-Health)
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dokter langsung mencatat anamnesis, histori keluhan, riwayat
                  alergi satwa, tindakan vaksinasi, hingga resep obat secara
                  terintegrasi dan aman.
                </p>
              </div>
            </div>

            {/* Fitur 3 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex gap-4 items-start hover:shadow-md transition">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Hospitalization & Pasien Rawat Inap
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Memudahkan pengawasan intensif paramedis terhadap grafik tanda
                  vital satwa, dosis cairan infus, berkas rekam laboratorium,
                  hingga pakan berkala.
                </p>
              </div>
            </div>

            {/* Fitur 4 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex gap-4 items-start hover:shadow-md transition">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Sinkronisasi Kasir & Gudang Farmasi
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Menghubungkan pintu loket kasir, stok gudang obat apotek,
                  serta mesin laboratorium internal agar alur verifikasi
                  transaksi berjalan kilat.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= 4. SEKSI TIER MEMBERSHIP & AMBISI POIN ================= */}
      <section className="bg-slate-900 border-t border-b border-slate-800 py-16 px-8 text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" /> Leveling System
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Sistem Tingkatan Kualifikasi Member
              </h2>
              <p className="text-sm text-slate-400">
                Dapatkan keuntungan berlipat dengan mendaftarkan akun dan
                mengumpulkan akumulasi poin pengobatan satwa Anda.
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2 shrink-0 shadow-md shadow-amber-400/10"
            >
              <LogIn className="w-3.5 h-3.5" /> Daftar Member Sekarang
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border-2 flex flex-col justify-between gap-6 relative ${
                  t.name.includes("Gold") 
                    ? "border-amber-400 bg-amber-50/10 ring-2 ring-amber-400 text-white" 
                    : "border-slate-800 bg-slate-800/40 text-white"
                }`}
              >
                {t.name.includes("Gold") && (
                  <span className="absolute -top-3 left-6 text-[10px] bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full font-black uppercase shadow-sm tracking-wider">
                    Tier Paling Populer
                  </span>
                )}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-black text-lg text-white">
                      {t.name}
                    </h4>
                    <span className="text-xs font-semibold text-slate-400 block mt-0.5">
                      {t.range}
                    </span>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {t.benefits.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-xs text-slate-300 flex items-start gap-2 leading-tight"
                      >
                        <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${t.name.includes("Gold") ? "text-amber-400" : "text-slate-400"}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. SEKSI GALERI REVIEW / TESTIMONI PENGUNJUNG ================= */}
      <section ref={reviewSectionRef} className="max-w-7xl w-full mx-auto px-8 py-16 space-y-6 scroll-mt-24">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" /> Suara Pelanggan
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Apa Kata Mereka Tentang PetTract?
          </h2>
          <p className="text-sm text-slate-500">
            Telah dipercaya oleh ribuan pemilik hewan peliharaan.
          </p>
        </div>

        {/* Layout Grid Ringkas 3 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs hover:shadow-md transition duration-300 flex gap-4 items-start bg-gradient-to-b from-white to-slate-50/50"
            >
              {/* Gambar Review Mini */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200/60">
                <img
                  src={rev.img}
                  alt={`Review dari ${rev.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 left-0 bg-slate-950/60 text-center py-0.5 text-[8px] font-bold text-amber-400 flex items-center justify-center gap-0.5">
                  <Star className="w-2 h-2 fill-amber-400 text-amber-400" /> 5.0
                </div>
              </div>

              {/* Konten Ulasan Padat */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate">
                    <h5 className="font-extrabold text-slate-900 text-sm truncate">
                      {rev.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">
                      {rev.pet}
                    </p>
                  </div>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 opacity-80 shrink-0" />
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                  "{rev.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. ALUR PELAYANAN PASIEN ================= */}
      <section className="bg-white border-t border-b border-slate-200/80 py-16 px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Bagaimana PetTract Bekerja?
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              4 Langkah Alur Pelayanan Pasien
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="text-3xl font-black text-blue-200 tracking-tight">01</div>
              <h4 className="font-bold text-slate-900 text-sm">
                Registrasi Mandiri
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mengisi data diri dan detail peliharaan lewat formulir publik di
                atas halaman ini.
              </p>
            </div>
            <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="text-3xl font-black text-blue-200 tracking-tight">02</div>
              <h4 className="font-bold text-slate-900 text-sm">
                Validasi Frontdesk
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Staf administrasi mencocokkan jadwal dokter hewan yang tersedia
                dan mengonfirmasi jam Anda.
              </p>
            </div>
            <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="text-3xl font-black text-blue-200 tracking-tight">03</div>
              <h4 className="font-bold text-slate-900 text-sm">
                Tindakan & Rekam Medis
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hewan ditangani dokter. Diagnosa, obat, dan status vital
                langsung diinput ke dalam sistem e-Health.
              </p>
            </div>
            <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="text-3xl font-black text-blue-200 tracking-tight">04</div>
              <h4 className="font-bold text-slate-900 text-sm">
                Kasir & Farmasi
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sistem menghitung billing otomatis, pembayaran diselesaikan, dan
                resep dikirim ke apotek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. FASILITAS KLINIK ================= */}
      <section className="max-w-7xl w-full mx-auto px-8 py-16 space-y-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Medical Quality
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Fasilitas Penanganan Medis Utama Klinik
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-base text-slate-900">
                Poliklinik & Ruang Konsultasi
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ruang pemeriksaan yang steril, dilengkapi alat diagnosa lengkap
                untuk anjing, kucing, burung, serta eksotik pet lainnya.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-base text-slate-900">
                ICU & Ruang Rawat Inap Isolasian
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dukungan inkubator oksigen dan pemisahan klaster ruangan infeksius
                demi mencegah penularan silang virus antar hewan.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-4 hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shadow-xs">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-base text-slate-900">
                Laboratorium Klinik Internal
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Uji sampel darah, feses, urinalisis, mikroskopi jamur, serta X-Ray
                digital dengan akurasi tinggi tanpa perlu keluar klinik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
      <section className="bg-white border-t border-slate-200/80 py-16 px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Bantuan Informasi
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Apakah pendaftaran lewat web ini langsung mendapatkan nomor antrean pasti?",
                a: "Formulir ini berfungsi sebagai pengajuan reservasi. Setelah Anda mengirim data, tim admin frontdesk kami akan langsung memvalidasi slot dokter hewan yang kosong dan mengirimkan konfirmasi kepastian jam kedatangan Anda.",
              },
              {
                q: "Bagaimana jika saya ingin mengubah atau membatalkan jadwal kunjungan?",
                a: "Anda bisa melakukan pembatalan atau perubahan jam dengan menghubungi WhatsApp operasional kami resmi yang tertera pada bagian terbawah situs ini, maksimal 2 jam sebelum jadwal dimulai.",
              },
              {
                q: "Apakah rekam medis hewan saya aman di dalam platform PetTract?",
                a: "Sangat aman. Seluruh riwayat medis, diagnosis dokter, dan riwayat obat satwa Anda dilindungi enkripsi sistem internal dan hanya diakses oleh dokter serta paramedis yang bertugas menangani pasien terkait.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/30"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-4 font-bold text-slate-900 text-sm flex justify-between items-center bg-white hover:bg-slate-50/50 transition-colors"
                  type="button"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openFaq === index ? "rotate-180 text-blue-600" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 text-xs text-slate-500 bg-white border-t border-slate-100 leading-relaxed animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9. EMERGENCY CONTACT BANNER ================= */}
      <section className="max-w-7xl w-full mx-auto px-8 py-12">
        <div className="bg-gradient-to-br from-slate-950 to-blue-950 rounded-3xl p-8 lg:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h2 className="text-xl lg:text-2xl font-black tracking-tight">
              Butuh Penanganan Kondisi Gawat Darurat Segera?
            </h2>
            <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
              Jika hewan kesayangan Anda mengalami trauma parah, kejang,
              perdarahan hebat, atau keracunan, mohon langsung bawa ke Unit
              Gawat Darurat tanpa perlu mendaftar online.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0 relative z-10">
            <a
              href="tel:+62812345678"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-red-600/20 text-center"
            >
              <PhoneCall className="w-4 h-4" /> UGD Hotline (24 Jam)
            </a>
            <div className="bg-slate-900/80 border border-slate-800 text-slate-300 font-bold text-xs px-5 py-3.5 rounded-xl flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" /> Pekanbaru, Indonesia
            </div>
          </div>
        </div>
      </section>

      {/* ================= 10. FOOTER BAWAH ================= */}
      <footer className="text-center text-xs font-semibold text-slate-500 py-8 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between px-8 max-w-7xl w-full mx-auto gap-4">
        <p>© 2026 PetTract Core Platform. All systems operational. Secure Guest Token Node Active.</p>
        <div className="flex items-center gap-1.5 text-blue-600">
          <Heart className="w-4 h-4 fill-blue-600" /> <span>Dedicated for your animal health journey</span>
        </div>
      </footer>
      
    </div>
  );
}