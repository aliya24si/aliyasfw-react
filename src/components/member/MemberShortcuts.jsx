import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarPlus, History, PawPrint, ArrowRight, Sparkles } from "lucide-react";

const actions = [
  {
    label: "Buat Janji Temu",
    description: "Reservasi slot dokter hewan",
    icon: CalendarPlus,
    route: "/member/booking",
    gradient: "from-[#102A5E] to-[#1D4ED8]",
    lightBg: "bg-[#1D4ED8]/10",
    iconColor: "text-[#1D4ED8]",
  },
  {
    label: "Riwayat Medis",
    description: "Lihat histori kunjungan",
    icon: History,
    route: "/member/history",
    gradient: "from-[#1D4ED8] to-[#2563EB]",
    lightBg: "bg-[#1D4ED8]/10",
    iconColor: "text-[#1D4ED8]",
  },
  {
    label: "Data Pasien",
    description: "Kelola data hewan peliharaan",
    icon: PawPrint,
    route: "/member/patients",
    gradient: "from-[#102A5E] to-[#1D4ED8]",
    lightBg: "bg-[#1D4ED8]/10",
    iconColor: "text-[#1D4ED8]",
  },
];

export default function MemberShortcuts() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-[#1D4ED8]" />
        <h2 className="text-xl font-bold text-[#102A5E] tracking-tight">
          Aksi Cepat
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.route)}
            className="group text-left bg-white rounded-2xl border border-[#102A5E]/10 p-6 hover:shadow-xl hover:shadow-[#102A5E]/10 hover:border-[#1D4ED8]/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex flex-col gap-4">
              <div
                className={`w-16 h-16 rounded-2xl ${action.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <action.icon className={`w-8 h-8 ${action.iconColor} group-hover:rotate-3 transition-transform duration-300`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#102A5E] text-lg mb-1">
                  {action.label}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {action.description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-[#1D4ED8] opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-1">
                <span>Mulai</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
