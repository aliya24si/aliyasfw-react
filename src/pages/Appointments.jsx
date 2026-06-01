import React from 'react';
import { ChevronDown } from 'lucide-react';
import TopHeader from '../components/TopHeader';
import MiniCalendar from '../components/MiniCalendar';
import SearchInput from '../components/SearchInput';
import AppointmentItem from '../components/AppointmentItem';

export default function Appointments() {
  return (
    <div className="flex-1 bg-latar min-h-screen">
      <TopHeader title="Appointments" subtitle="Welcome back, Dr. Smith" />

      <div className="p-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-poppins font-bold text-teks">Appointment Management</h2>
            <p className="text-sm text-teks-samping">Schedule and manage patient appointments</p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all">
            <span className="text-xl">+</span> Schedule Appointment
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri - Calendar Card */}
          <MiniCalendar />

          {/* Kolom Kanan - Today's Appointments */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <SearchInput placeholder="Search appointments..." />
              <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-2 text-sm text-teks-samping cursor-pointer shadow-sm shrink-0">
                Status <ChevronDown size={14} />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h3 className="font-bold text-teks">Today's Appointments</h3>
                <p className="text-xs text-teks-samping">5 appointments scheduled</p>
              </div>

              <div className="divide-y divide-gray-50">
                <AppointmentItem name="Emma Wilson" time="09:00 AM (30 min)" status="confirmed" room="Room 101" doctor="Dr. Smith" note="Follow-up for hypertension" />
                <AppointmentItem name="Michael Brown" time="10:30 AM (45 min)" status="pending" room="Room 203" doctor="Dr. Johnson" note="Diabetes management review" />
                <AppointmentItem name="Sarah Davis" time="02:15 PM (2 hours)" status="confirmed" room="OR 1" doctor="Dr. Williams" note="Minor outpatient procedure" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}