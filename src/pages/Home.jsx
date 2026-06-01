import React from 'react';
import { Users, Calendar, Activity, AlertCircle, UserPlus, Clock, FlaskConical, Zap } from 'lucide-react';
import TopHeader from '../components/TopHeader';
import StatCard from '../components/StatCard';
import AppointmentRow from '../components/AppointmentRow';
import ActivityItem from '../components/ActivityItem';
import QuickActionSection from '../components/QuickActionSection';

export default function Home() {
  return (
    <div className="flex-1 bg-latar min-h-screen">
      <TopHeader title="Dashboard" subtitle="Welcome back, Dr. Smith" />

      <main className="p-8 space-y-6">
        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Patients" value="2,847" trend="+12%" icon={<Users size={20}/>} color="blue" />
          <StatCard title="Today's Appointments" value="24" trend="+3" icon={<Calendar size={20}/>} color="green" />
          <StatCard title="Active Cases" value="156" trend="+8" icon={<Activity size={20}/>} color="orange" />
          <StatCard title="Critical Alerts" value="7" trend="-2" icon={<AlertCircle size={20}/>} color="red" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TODAY'S APPOINTMENTS LIST */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="font-poppins font-bold text-teks">Today's Appointments</h3>
              <p className="text-xs text-teks-samping">You have 24 appointments scheduled for today</p>
            </div>
            
            <div className="divide-y divide-gray-50">
              <AppointmentRow name="Emma Wilson" type="Consultation" time="09:00 AM" status="confirmed" />
              <AppointmentRow name="Michael Brown" type="Follow-up" time="10:30 AM" status="pending" />
              <AppointmentRow name="Sarah Davis" type="Surgery" time="02:15 PM" status="confirmed" />
              <AppointmentRow name="James Johnson" type="Consultation" time="04:00 PM" status="confirmed" />
            </div>

            <button className="w-full py-4 text-sm font-bold text-teks-samping hover:bg-gray-50 flex items-center justify-center gap-2 border-t border-gray-50 transition-colors">
              <Calendar size={16}/> View All Appointments
            </button>
          </div>

          {/* RECENT ACTIVITIES */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-poppins font-bold text-teks mb-6">Recent Activities</h3>
            <div className="space-y-6">
              <ActivityItem icon={<UserPlus size={16}/>} color="blue" title="New patient registered" user="Alice Cooper" time="5 min ago" />
              <ActivityItem icon={<Clock size={16}/>} color="green" title="Appointment completed" user="Bob Wilson" time="15 min ago" />
              <ActivityItem icon={<FlaskConical size={16}/>} color="orange" title="Lab results uploaded" user="Carol Smith" time="32 min ago" />
              <ActivityItem icon={<Zap size={16}/>} color="purple" title="Prescription updated" user="David Lee" time="1 hour ago" />
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <QuickActionSection />
      </main>
    </div>
  );
}