import React, { useState } from "react";
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
  UserCheck
} from "lucide-react";

export default function GuestHome() {
  const navigate = useNavigate();
  
  // State untuk form appointment mandiri
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    ownerName: "",
    service: "",
    date: ""
  });

  // State untuk FAQ Accordion
  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const handleResetForm = () => {
    setFormData({ petName: "", ownerName: "", service: "", date: "" });
    setIsBooked(false);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* ================= 1. HEADER NAVBAR ATAS ================= */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200/80 px-8 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-950 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">PetTract</span>
                <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                  Public Portal
                </span>
              </div>
              <span className="text-sm text-slate-400 block leading-none mt-1">Hospital Management System</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 hover:border-slate-300 px-5 py-3 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign In System
            </button>
          </div>

        </div>
      </nav>

      {/* ================= 2. HERO BANNER WELCOME ================= */}
      <div className="bg-white border-b border-slate-200/50 py-14 px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full flex items-center gap-2.5 w-fit shadow-2xs">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Pendaftaran Online Aktif & Terintegrasi</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Sistem Manajemen Klinis Satwa Modern Terpadu
          </h1>
          <p className="text-slate-500 text-base max-w-4xl leading-relaxed">
            Selamat datang di portal publik PetTract. Di bawah ini Anda dapat mempelajari kapabilitas ekosistem digital kami, mengisi formulir reservasi kunjungan medis secara mandiri, hingga melihat informasi penanganan gawat darurat.
          </p>
        </div>
      </div>

      {/* ================= 3. SEKSI EDUKASI & FOTO HERO UTAMA ================= */}
      <main className="max-w-7xl w-full mx-auto px-8 py-12 space-y-12 flex-1">
        
        {/* Mengenal PetTract + Grid Foto Utama */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-center space-y-5">
            <div className="flex items-center gap-3 text-blue-600">
              <Sparkles className="w-6 h-6" />
              <h2 className="font-black text-xl text-slate-900 tracking-tight">Mengenal Platform PetTract</h2>
            </div>
            <p className="text-base text-slate-600 leading-relaxed">
              <strong>PetTract</strong> adalah ekosistem digital terintegrasi yang dirancang khusus untuk menyederhanakan manajemen operasional rumah sakit hewan dan klinik praktisi satwa. Kami menghubungkan pemilik hewan peliharaan, staf medis, hingga dokter spesialis dalam satu basis data terpadu guna menghadirkan pelayanan kesehatan hewan yang cepat, transparan, dan terukur secara <i>real-time</i>.
            </p>
          </div>
          
          {/* Implementasi Foto Medis Utama (dokter1.jpg) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-md min-h-[240px]">
            <img 
              src="/img/dokter1.jpg" 
              alt="PetTract Expert Veterinarian" 
              className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded-md uppercase font-bold tracking-widest">Core Care</span>
              <p className="text-xs text-slate-200 font-medium mt-1">Pelayanan medis profesional didukung sistem catatan e-Health pintar.</p>
            </div>
          </div>
        </section>

        {/* Fitur Utama */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Arsitektur Core</h3>
            <h2 className="text-xl font-black text-slate-900">Apa Saja Yang Bisa Dilakukan di Dalam Sistem?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fitur 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs flex gap-4 items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-slate-900">Identifikasi & Reservasi Instan</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Pemilik dapat mengajukan jadwal janji temu, jenis tindakan, serta memantau nomor urut antrean berjalan melalui portal publik tanpa perlu mengantre lama.</p>
              </div>
            </div>

            {/* Fitur 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs flex gap-4 items-start">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-slate-900">Rekam Medis Digital (Electronic e-Health)</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Dokter langsung mencatat anamnesis, histori keluhan, riwayat alergi satwa, tindakan vaksinasi, hingga resep obat secara terintegrasi dan aman.</p>
              </div>
            </div>

            {/* Fitur 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs flex gap-4 items-start">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-slate-900">Hospitalization & Pasien Rawat Inap</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Memudahkan pengawasan intensif paramedis terhadap grafik tanda vital satwa, dosis cairan infus, berkas rekam laboratorium, hingga pakan berkala.</p>
              </div>
            </div>

            {/* Fitur 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs flex gap-4 items-start">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl h-12 w-12 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-slate-900">Sinkronisasi Kasir & Gudang Farmasi</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Menghubungkan pintu loket kasir, stok gudang obat apotek, serta mesin laboratorium internal agar alur verifikasi transaksi berjalan kilat.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ================= 4. SEKSI PENDAFTARAN (SATU BARIS PENUH / HORIZONTAL GRID) ================= */}
      <section className="bg-slate-100 border-t border-b border-slate-200/80 py-16 px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Portal Reservasi</h3>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Formulir Pendaftaran Kunjungan Pengunjung</h2>
            <p className="text-sm text-slate-500">Silakan lengkapi data di bawah ini. Pengajuan Anda akan otomatis masuk ke sistem antrean pusat admin.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
            {!isBooked ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Input dibuat mendatar berjejer menggunakan grid 4 kolom pada layar desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Input 1 */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Nama Pemilik (Owner)</label>
                    <input 
                      type="text" 
                      name="ownerName"
                      required
                      placeholder="Masukkan nama lengkap" 
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Input 2 */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Nama & Spesies Hewan</label>
                    <input 
                      type="text" 
                      name="petName"
                      required
                      placeholder="Contoh: Milo (Kucing)" 
                      value={formData.petName}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 placeholder:text-slate-400"
                    />
                  </div>

                  {/* Input 3 */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Layanan Kunjungan Medis</label>
                    <select 
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 cursor-pointer"
                    >
                      <option value="">-- Pilih Keperluan --</option>
                      <option value="Konsultasi Rutin & Checkup">Konsultasi Rutin & Checkup</option>
                      <option value="Vaksinasi Tahunan / Rabies">Vaksinasi Tahunan / Rabies</option>
                      <option value="Sterilisasi / Operasi Bedah">Sterilisasi / Operasi Bedah</option>
                      <option value="Grooming Medis Terapi Kutu">Grooming Medis Terapi Kutu</option>
                    </select>
                  </div>

                  {/* Input 4 */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Rencana Tanggal Hadir</label>
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full text-sm px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 cursor-pointer"
                    />
                  </div>

                </div>

                {/* Tombol kirim lebar penuh berada di bawah barisan input */}
                <button 
                  type="submit"
                  className="w-full bg-slate-950 hover:bg-slate-900 text-white text-sm font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer active:scale-[0.99]"
                >
                  Ajukan Jadwal Pertemuan Kunjungan <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            ) : (
              // Tampilan sukses pendaftaran dibuat horizontal & lega
              <div className="flex flex-col md:flex-row items-center gap-6 justify-between py-2 animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100 shrink-0 shadow-2xs">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 text-base">Pengajuan Jadwal Berhasil Terkirim!</h4>
                    <p className="text-sm text-slate-500">
                      Reservasi pemilik <strong>{formData.ownerName}</strong> untuk satwa <strong>{formData.petName}</strong> ({formData.service}) pada tanggal {formData.date} sudah masuk ke sistem internal.
                    </p>
                    <div className="text-xs text-blue-600 font-medium flex items-center gap-1.5 mt-2">
                      <Clock className="w-4 h-4" />
                      <span>Petugas frontdesk akan segera menghubungi kontak seluler Anda untuk finalisasi jam praktik dokter.</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleResetForm} 
                  className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-6 py-3 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0"
                >
                  Buat Pengajuan Baru
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ================= NEW: SEKSI SHOWCASE TIM DOKTER AKTIF (dokter2.jpg & dokter3.jpg) ================= */}
      <section className="max-w-7xl w-full mx-auto px-8 py-14 space-y-8">
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">On-Duty Experts</h3>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dokter Spesialis Yang Berpraktik Hari Ini</h2>
          <p className="text-sm text-slate-500">Sistem manajemen kami mencatat kehadiran paramedis secara presisi untuk menjamin pelayanan optimal.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {/* Card Dokter 1 (dokter2.jpg) */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-center shadow-xs">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100">
              <img src="/img/dokter2.jpg" alt="Veterinarian Team" className="w-full h-full object-cover object-center" />
            </div>
            <div className="space-y-2 text-center sm:text-left w-full">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[11px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">Aktif Berpraktik</span>
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Team Medis Internal A</h4>
              <p className="text-xs text-slate-400">Spesialis Bedah Satwa & Penanganan Penyakit Dalam</p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-slate-600">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Slot Konsultasi Tersedia</span>
              </div>
            </div>
          </div>

          {/* Card Dokter 2 (dokter3.jpg) */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-center shadow-xs">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100">
              <img src="/img/dokter3.jpg" alt="Veterinarian Team" className="w-full h-full object-cover object-center" />
            </div>
            <div className="space-y-2 text-center sm:text-left w-full">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[11px] font-bold text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">Aktif Berpraktik</span>
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Team Medis Internal B</h4>
              <p className="text-xs text-slate-400">Spesialis Satwa Eksotik & Preventif Vaksinasi</p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-slate-600">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Slot Konsultasi Tersedia</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 5. ALUR PELAYANAN PASIEN ================= */}
      <section className="bg-white border-b border-slate-200/60 py-16 px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Bagaimana PetTract Bekerja?</h3>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">4 Langkah Alur Pelayanan Pasien</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
            <div className="space-y-3">
              <div className="text-3xl font-black text-blue-100">01</div>
              <h4 className="font-extrabold text-base text-slate-900">Registrasi Mandiri</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Mengisi data diri dan detail peliharaan lewat formulir publik di atas halaman ini.</p>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-black text-blue-100">02</div>
              <h4 className="font-extrabold text-base text-slate-900">Validasi Frontdesk</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Staf administrasi mencocokkan jadwal dokter hewan yang tersedia dan mengonfirmasi jam Anda.</p>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-black text-blue-100">03</div>
              <h4 className="font-extrabold text-base text-slate-900">Tindakan & Rekam Medis</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Hewan ditangani dokter. Diagnosa, obat, dan status vital langsung diinput ke dalam sistem e-Health.</p>
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-black text-blue-100">04</div>
              <h4 className="font-extrabold text-base text-slate-900">Kasir & Farmasi</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Sistem menghitung billing otomatis, pembayaran diselesaikan, dan resep dikirim ke apotek.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. FASILITAS KLINIK ================= */}
      <section className="max-w-7xl w-full mx-auto px-8 py-16 space-y-10">
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Medical Quality</h3>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Fasilitas Penanganan Medis Utama Klinik</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/70 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Poliklinik & Ruang Konsultasi</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Ruang pemeriksaan yang steril, dilengkapi alat diagnosa lengkap untuk anjing, kucing, burung, serta eksotik pet lainnya.</p>
          </div>

          <div className="bg-white border border-slate-200/70 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">ICU & Ruang Rawat Inap Isolasian</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Dukungan inkubator oksigen dan pemisahan klaster ruangan infeksius demi mencegah penularan silang virus antar hewan.</p>
          </div>

          <div className="bg-white border border-slate-200/70 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Info className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Laboratorium Klinik Internal</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Uji sampel darah, feses, urinalisis, mikroskopi jamur, serta X-Ray digital dengan akurasi tinggi tanpa perlu keluar klinik.</p>
          </div>
        </div>
      </section>

      {/* ================= 7. FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
      <section className="bg-white border-t border-slate-200/60 py-16 px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Bantuan Informasi</h3>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Apakah pendaftaran lewat web ini langsung mendapatkan nomor antrean pasti?", a: "Formulir ini berfungsi sebagai pengajuan reservasi. Setelah Anda mengirim data, tim admin frontdesk kami akan langsung memvalidasi slot dokter hewan yang kosong dan mengirimkan konfirmasi kepastian jam kedatangan Anda." },
              { q: "Bagaimana jika saya ingin mengubah atau membatalkan jadwal kunjungan?", a: "Anda bisa melakukan pembatalan atau perubahan jam dengan menghubungi WhatsApp operasional kami resmi yang tertera pada bagian terbawah situs ini, maksimal 2 jam sebelum jadwal dimulai." },
              { q: "Apakah rekam medis hewan saya aman di dalam platform PetTract?", a: "Sangat aman. Seluruh riwayat medis, diagnosis dokter, dan riwayat obat satwa Anda dilindungi enkripsi sistem internal dan hanya diakses oleh dokter serta paramedis yang bertugas menangani pasien terkait." }
            ].map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50/30">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-4.5 font-bold text-slate-900 text-sm flex justify-between items-center bg-white cursor-pointer hover:bg-slate-50/50"
                  type="button"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 text-sm text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. EMERGENCY CONTACT BANNER ================= */}
      <section className="max-w-7xl w-full mx-auto px-8 py-12">
        <div className="bg-slate-950 rounded-3xl p-8 lg:p-12 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
          <div className="space-y-2">
            <h2 className="text-xl lg:text-2xl font-black tracking-tight">Butuh Penanganan Kondisi Gawat Darurat Segera?</h2>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              Jika hewan kesayangan Anda mengalami trauma parah, kejang, perdarahan hebat, atau keracunan, mohon langsung bawa ke Unit Gawat Darurat tanpa perlu mendaftar online.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <a href="tel:+62812345678" className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-sm">
              <PhoneCall className="w-4 h-4" /> UGD Hotline (24 Jam)
            </a>
            <div className="bg-slate-900 border border-slate-800 text-slate-300 font-medium text-sm px-5 py-3.5 rounded-xl flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" /> Pekanbaru, Indonesia
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. FOOTER BAWAH ================= */}
      <footer className="text-center text-xs font-semibold text-slate-400 py-8 border-t border-slate-200/60 bg-white">
        © 2026 PetTract Core Platform. All systems operational. Secure Guest Token Node Active.
      </footer>

    </div>
  );
}