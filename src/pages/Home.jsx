import React from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  AlertCircle, 
  Search, 
  Settings, 
  Bell, 
  Moon, 
  ChevronRight,
  UserPlus,
  Clock,
  FlaskConical,
  Zap
} from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen font-barlow text-[#111827]">
      {/* HEADER SECTION */}
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-100">
        <div>
          <h1 className="text-xl font-poppins font-bold text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-400">Welcome back, Dr. Smith</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-bold text-green-600">Online</span>
          </div>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"><Moon size={18}/></button>
          <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-600 border border-gray-200">
            DS
          </div>
        </div>
      </header>

      {/* MAIN CONTENT Area */}
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
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <div>
                <h3 className="font-poppins font-bold text-gray-900">Today's Appointments</h3>
                <p className="text-xs text-gray-400">You have 24 appointments scheduled for today</p>
              </div>
            </div>
            
            <div className="divide-y divide-gray-50">
              <AppointmentRow name="Emma Wilson" type="Consultation" time="09:00 AM" status="confirmed" />
              <AppointmentRow name="Michael Brown" type="Follow-up" time="10:30 AM" status="pending" />
              <AppointmentRow name="Sarah Davis" type="Surgery" time="02:15 PM" status="confirmed" />
              <AppointmentRow name="James Johnson" type="Consultation" time="04:00 PM" status="confirmed" />
            </div>

            <button className="w-full py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2 border-t border-gray-50 transition-colors">
              <Calendar size={16}/> View All Appointments
            </button>
          </div>

          {/* RECENT ACTIVITIES */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-poppins font-bold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-6">
              <ActivityItem icon={<UserPlus size={16}/>} color="blue" title="New patient registered" user="Alice Cooper" time="5 min ago" />
              <ActivityItem icon={<Clock size={16}/>} color="green" title="Appointment completed" user="Bob Wilson" time="15 min ago" />
              <ActivityItem icon={<FlaskConical size={16}/>} color="orange" title="Lab results uploaded" user="Carol Smith" time="32 min ago" />
              <ActivityItem icon={<Zap size={16}/>} color="purple" title="Prescription updated" user="David Lee" time="1 hour ago" />
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS SECTION */}
        <section className="space-y-4">
          <h3 className="font-poppins font-bold text-gray-900">Quick Actions</h3>
          <p className="text-xs text-gray-400 -mt-2">Frequently used actions for faster workflow</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButton icon={<UserPlus size={20}/>} label="Add New Patient" primary />
            <ActionButton icon={<Calendar size={20}/>} label="Schedule Appointment" />
            <ActionButton icon={<Activity size={20}/>} label="View Lab Results" />
            <ActionButton icon={<AlertCircle size={20}/>} label="Emergency Alert" />
          </div>
        </section>

      </main>
    </div>
  );
};

// HELPER COMPONENTS
const StatCard = ({ title, value, trend, icon, color }) => {
  const colors = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    orange: "text-orange-500 bg-orange-50",
    red: "text-red-500 bg-red-50"
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
      <div className="flex justify-between items-start">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
        <div className={`p-2 rounded-lg ${colors[color]}`}>{icon}</div>
      </div>
      <div className="mt-4">
        <h4 className="text-2xl font-poppins font-bold">{value}</h4>
        <p className={`text-xs mt-1 font-bold ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          {trend} <span className="text-gray-400 font-normal">from last month</span>
        </p>
      </div>
    </div>
  );
};

const AppointmentRow = ({ name, type, time, status }) => (
  <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center text-lg">
        👤
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{name}</h4>
        <p className="text-[11px] text-gray-400">{type}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-bold text-gray-900">{time}</p>
      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${status === 'confirmed' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
        {status}
      </span>
    </div>
  </div>
);

const ActivityItem = ({ icon, color, title, user, time }) => {
  const colors = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-green-500 bg-green-50",
    orange: "text-orange-500 bg-orange-50",
    purple: "text-purple-500 bg-purple-50"
  };
  return (
    <div className="flex gap-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-800">{title}</p>
        <p className="text-[11px] text-gray-500">{user} • {time}</p>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, primary }) => (
  <button className={`flex items-center justify-center gap-3 p-4 rounded-xl font-bold text-sm transition-all border ${
    primary 
    ? "bg-[#0A0A0A] text-white border-[#0A0A0A] hover:bg-gray-800" 
    : "bg-white text-gray-700 border-gray-100 hover:border-gray-300 shadow-sm"
  }`}>
    {icon}
    {label}
  </button>
);

export default Home;