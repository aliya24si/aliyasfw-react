import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarPlus, History, PawPrint, ArrowRight } from "lucide-react";

const actions = [
  {
    label: "Buat Janji Temu",
    description: "Reservasi slot dokter hewan",
    icon: CalendarPlus,
    route: "/member/booking",
  },
  {
    label: "Riwayat Medis",
    description: "Lihat histori kunjungan",
    icon: History,
    route: "/member/history",
  },
  {
    label: "Data Pasien",
    description: "Kelola data hewan",
    icon: PawPrint,
    route: "/member/patients",
  },
];

export default function MemberQuickActions() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-bold text-zinc-950 tracking-tight">
          Aksi Cepat
        </h2>
        <p className="text-sm text-zinc-500">
          Akses fitur utama dengan cepat.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.route)}
            className="group text-left bg-white rounded-xl border border-zinc-200/80 p-5 hover:shadow-md hover:border-zinc-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-zinc-200 transition-colors duration-200">
                <action.icon className="w-6 h-6 text-zinc-700" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-zinc-950 text-base">
                  {action.label}
                </h3>
                <p className="text-sm text-zinc-500 mt-0.5">
                  {action.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
