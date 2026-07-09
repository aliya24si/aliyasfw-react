import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Activity,
  XCircle,
  UserPlus,
  Clock,
  FlaskConical,
  Zap,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import TopHeader from "../components/TopHeader";
import StatCard from "../components/StatCard";
import AppointmentRow from "../components/AppointmentRow";
import ActivityItem from "../components/ActivityItem";
import QuickActionSection from "../components/QuickActionSection";

// Import komponen Chart Shadcn UI
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useNavigate } from 'react-router-dom';

const chartConfig = {
  value: {
    label: "Total Count",
    color: "hsl(var(--primary))",
  },
};

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointmentsCount: 0,
    activeCases: 0,
    cancelledAppointments: 0,
  });
  const [todayAppointmentsList, setTodayAppointmentsList] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Membuat format tanggal hari ini (YYYY-MM-DD) lokal agar cocok dengan tipe 'date' Supabase
      const todayObj = new Date();
      const y = todayObj.getFullYear();
      const m = String(todayObj.getMonth() + 1).padStart(2, "0");
      const d = String(todayObj.getDate()).padStart(2, "0");
      const todayDateString = `${y}-${m}-${d}`;

      // 1. PERBAIKAN: HITUNG TOTAL PATIENTS (Membaca jumlah data dari tabel 'patients')
      const { count: patientsCount, error: err1 } = await supabase
        .from("patients") // <-- Diubah dari 'users' menjadi 'patients'
        .select("*", { count: "exact", head: true });
      if (err1) throw err1;

      // 2. HITUNG TODAY'S APPOINTMENTS (Total janji temu khusus tanggal hari ini)
      const { count: todayCount, error: err2 } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("appointment_date", todayDateString);
      if (err2) throw err2;

      // 3. HITUNG ACTIVE CASES (Pesanan janji temu yang masih 'scheduled')
      const { count: activeCount, error: err3 } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "scheduled");
      if (err3) throw err3;

      // 4. HITUNG CANCELLED APPOINTMENTS (Janji temu yang dibatalkan)
      const { count: cancelledCount, error: err4 } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "cancelled");
      if (err4) throw err4;

      // 5. AMBIL JADWAL HARI INI + JOIN RELASI KE TABEL PATIENTS UNTUK NAMA & SPESIES
      const { data: listData, error: err5 } = await supabase
        .from("appointments")
        .select(
          `
          id,
          appointment_time,
          status,
          service_type,
          patients (
            name
          )
        `,
        )
        .eq("appointment_date", todayDateString)
        .order("appointment_time", { ascending: true });
      if (err5) throw err5;

      // Perbarui state pencatatan angka dashboard
      setStats({
        totalPatients: patientsCount || 0,
        todayAppointmentsCount: todayCount || 0,
        activeCases: activeCount || 0,
        cancelledAppointments: cancelledCount || 0,
      });

      setTodayAppointmentsList(listData || []);
    } catch (error) {
      console.error("Gagal melakukan sinkronisasi data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Memetakan metrik ke bagan grafik analytics secara live
  const chartData = [
    { metric: "Total Patients", value: stats.totalPatients },
    { metric: "Today Appointments", value: stats.todayAppointmentsCount },
    { metric: "Active Cases", value: stats.activeCases },
    { metric: "Cancelled", value: stats.cancelledAppointments },
  ];

  if (loading) {
    return (
      <div className="flex-1 bg-latar min-h-screen flex flex-col items-center justify-center text-gray-400 gap-2">
        <Loader2 className="animate-spin text-blue-600" size={32} />
        <p className="text-sm font-medium font-poppins">
          Menyinkronkan data grafik klinik...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-latar min-h-screen">
      <TopHeader title="Dashboard" subtitle="Welcome back, Dr. Smith" />

      <main className="p-8 space-y-6">
        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients.toLocaleString("id-ID")}
            trend="Live"
            icon={<Users size={20} />}
            color="blue"
          />
          <StatCard
            title="Today's Appointments"
            value={stats.todayAppointmentsCount}
            trend="Hari ini"
            icon={<Calendar size={20} />}
            color="green"
          />
          <StatCard
            title="Active Cases"
            value={stats.activeCases}
            trend="Aktif"
            icon={<Activity size={20} />}
            color="orange"
          />
          <StatCard
            title="Cancelled"
            value={stats.cancelledAppointments}
            trend="Batal"
            icon={<XCircle size={20} />}
            color="red"
          />
        </div>

        {/* VISUALISASI BAR CHART SHADCN */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="mb-4">
            <h3 className="font-poppins font-bold text-teks text-base">
              Metrics Analytics View
            </h3>
            <p className="text-xs text-teks-samping">
              Real-time synchronized data visualization of clinical metrics
            </p>
          </div>
          <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="metric"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                className="text-xs font-medium fill-gray-500"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs fill-gray-500"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="#3b82f6" radius={8} maxBarSize={60} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TODAY'S APPOINTMENTS LIST */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="font-poppins font-bold text-teks">
                Today's Appointments
              </h3>
              <p className="text-xs text-teks-samping">
                You have {stats.todayAppointmentsCount} appointments scheduled
                for today
              </p>
            </div>

            <div className="divide-y divide-gray-50 min-h-[180px]">
              {todayAppointmentsList.length > 0 ? (
                todayAppointmentsList.map((item) => (
                  <AppointmentRow
                    key={item.id}
                    name={item.patients?.name || "Pasien Anonim"}
                    type={item.service_type || "Umum"}
                    time={item.appointment_time?.substring(0, 5) + " WIB"}
                    status={item.status}
                  />
                ))
              ) : (
                <div className="p-12 text-center text-sm text-gray-400 font-poppins">
                  Tidak ada jadwal janji temu untuk hari ini.
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/admin/appointments")}
              className="w-full py-4 text-sm font-bold text-teks-samping hover:bg-gray-50 flex items-center justify-center gap-2 border-t border-gray-50 transition-colors"
            >
              <Calendar size={16} /> View All Appointments
            </button>
          </div>

          {/* RECENT ACTIVITIES */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-poppins font-bold text-teks mb-6">
              Recent Activities
            </h3>
            <div className="space-y-6">
              <ActivityItem
                icon={<UserPlus size={16} />}
                color="blue"
                title="New patient registered"
                user="Alice Cooper"
                time="5 min ago"
              />
              <ActivityItem
                icon={<Clock size={16} />}
                color="green"
                title="Appointment completed"
                user="Bob Wilson"
                time="15 min ago"
              />
              <ActivityItem
                icon={<FlaskConical size={16} />}
                color="orange"
                title="Lab results uploaded"
                user="Carol Smith"
                time="32 min ago"
              />
              <ActivityItem
                icon={<Zap size={16} />}
                color="purple"
                title="Prescription updated"
                user="David Lee"
                time="1 hour ago"
              />
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <QuickActionSection />
      </main>
    </div>
  );
}
