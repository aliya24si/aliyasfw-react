import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight, Loader2, Calendar as CalendarIcon, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';

export default function AppointmentCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Mengambil data dari tabel appointments dan join ke tabel patients untuk nama hewan
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          appointment_time,
          status,
          service_type,
          doctor_name,
          patients (
            name,
            species
          )
        `);

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error("Gagal memuat janji temu:", err);
      alert("Gagal memuat data kalender janji temu.");
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk mendapatkan info seputar bulan yang sedang dilihat
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktoba", "November", "Desember"
  ];

  // Mengubah objek Date menjadi string format YYYY-MM-DD local
  const formatDateString = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Mencari janji temu berdasarkan tanggal string (YYYY-MM-DD)
  const getAppointmentsForDate = (dateStr) => {
    return appointments.filter(app => app.appointment_date === dateStr);
  };

  // Navigasi bulan
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Ambil daftar janji temu untuk tanggal yang sedang diklik/dipilih aktif
  const selectedDateStr = formatDateString(selectedDate);
  const activeAppointments = getAppointmentsForDate(selectedDateStr);

  // Render Grid Kalender
  const renderCalendarDays = () => {
    const dayElements = [];
    
    // Padding untuk hari kosong di awal bulan (agar sejajar dengan nama hari)
    for (let i = 0; i < firstDayOfMonth; i++) {
      dayElements.push(<div key={`empty-${i}`} className="p-4 bg-gray-50/30 border border-gray-100/50"></div>);
    }

    // Mengisi tanggal-tanggal dalam bulan berjalan
    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(year, month, day);
      const dateStr = formatDateString(thisDate);
      const dayAppointments = getAppointmentsForDate(dateStr);
      
      const isSelected = selectedDateStr === dateStr;
      const isToday = formatDateString(new Date()) === dateStr;

      // Logika mengecek jika ada janji temu yang BELUM selesai pada tanggal ini
      const hasUnfinished = dayAppointments.some(app => app.status !== 'completed' && app.status !== 'cancelled');
      const hasFinishedOnly = dayAppointments.length > 0 && !hasUnfinished;

      dayElements.push(
        <button
          key={`day-${day}`}
          onClick={() => setSelectedDate(thisDate)}
          className={`p-3 h-24 border border-gray-100 flex flex-col justify-between text-left transition-all outline-none relative
            ${isSelected ? 'bg-indigo-50/70 border-indigo-200 z-10 shadow-sm' : 'bg-white hover:bg-gray-50'}
          `}
        >
          <span className={`text-sm font-semibold px-2 py-0.5 rounded-md inline-block
            ${isToday ? 'bg-indigo-600 text-white' : isSelected ? 'text-indigo-600 font-bold' : 'text-gray-700'}
          `}>
            {day}
          </span>

          {/* Indikator Status / Jumlah Appointment di tanggal tersebut */}
          {dayAppointments.length > 0 && (
            <div className="w-full space-y-1 mt-1">
              {hasUnfinished ? (
                <div className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-medium border border-amber-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>{dayAppointments.length} Jadwal</span>
                </div>
              ) : hasFinishedOnly ? (
                <div className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-medium border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Selesai</span>
                </div>
              ) : null}
            </div>
          )}
        </button>
      );
    }

    return dayElements;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-barlow">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kalender Janji Temu</h1>
        <p className="text-sm text-gray-500">Pantau dan kelola jadwal operasional klinik secara real-time harian.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 text-gray-400 gap-2">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
          <span className="text-sm">Menyinkronkan jadwal kalender...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* SISI KIRI: Komponen Utama Kalender Bulan (Mengambil space 2 kolom di layar lebar) */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Header Navigasi Kalender */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">
                {monthNames[month]} {year}
              </h2>
              <div className="flex items-center gap-1.5">
                <button onClick={prevMonth} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 bg-white">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextMonth} className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 bg-white">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Nama-Nama Hari */}
            <div className="grid grid-cols-7 text-center border-b border-gray-100 bg-gray-50 text-xs font-bold text-gray-500 tracking-wider">
              <div className="py-3">Min</div>
              <div className="py-3">Sen</div>
              <div className="py-3">Sel</div>
              <div className="py-3">Rab</div>
              <div className="py-3">Kam</div>
              <div className="py-3">Jum</div>
              <div className="py-3">Sab</div>
            </div>

            {/* Kotak Grid Hari */}
            <div className="grid grid-cols-7 bg-gray-50/50">
              {renderCalendarDays()}
            </div>
          </div>

          {/* SISI KANAN: Detail Riwayat Jadwal pada Tanggal yang Dipilih */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Agenda Janji Temu</h2>
              <p className="text-base font-bold text-gray-900 mt-0.5">
                {selectedDate.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            {activeAppointments.length === 0 ? (
              <div className="py-12 text-center text-gray-400 flex flex-col items-center gap-2">
                <CalendarIcon size={36} className="text-gray-300" />
                <p className="text-sm">Tidak ada jadwal janji temu pada tanggal ini.</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[450px] pr-1">
                {activeAppointments.map((app) => {
                  const isDone = app.status === 'completed';
                  const isCancel = app.status === 'cancelled';
                  
                  return (
                    <div 
                      key={app.id} 
                      className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all
                        ${isDone ? 'bg-emerald-50/20 border-emerald-100/70' : isCancel ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-amber-50/30 border-amber-100'}
                      `}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md tracking-wide
                            ${isDone ? 'bg-emerald-100 text-emerald-800' : isCancel ? 'bg-gray-200 text-gray-600' : 'bg-amber-100 text-amber-800'}
                          `}>
                            {app.service_type || "Umum"}
                          </span>
                          <h4 className="text-base font-bold text-gray-900 mt-1.5">
                            {app.patients?.name || "Pasien Anonim"}
                          </h4>
                          <p className="text-xs text-gray-500 capitalize">Jenis: {app.patients?.species || "-"}</p>
                        </div>

                        {/* Status Icon */}
                        {isDone ? (
                          <CheckCircle className="text-emerald-500 shrink-0" size={18} />
                        ) : isCancel ? (
                          <AlertCircle className="text-gray-400 shrink-0" size={18} />
                        ) : (
                          <span className="flex h-2 w-2 relative mt-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </span>
                        )}
                      </div>

                      {/* Detail Waktu & Dokter */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 border-t border-gray-100/50 pt-2.5 font-medium">
                        <div className="flex items-center gap-1">
                          <Clock size={13} className="text-gray-400" />
                          <span>{app.appointment_time?.substring(0, 5) || "--:--"} WIB</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={13} className="text-gray-400" />
                          <span className="truncate">Drg. {app.doctor_name || "Staff"}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}