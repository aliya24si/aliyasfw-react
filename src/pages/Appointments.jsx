// src/pages/Home.jsx
import { Search, Bell, Settings, Calendar, User, FileText, Users, BarChart3, ChevronDown, MoreVertical } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-barlow text-[#111827]">
      
      {/* --- KONTEN UTAMA --- */}
      <div className="flex-1 flex flex-col">
        
        {/* Top Header - Sesuai Gambar */}
        <div className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-poppins font-bold">Appointments</h1>
            <p className="text-xs text-gray-400">Welcome back, Dr. Smith</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-bold text-green-600">Online</span>
            </div>
            <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"><Settings size={20}/></button>
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-600">
              DS
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 space-y-6">
          
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-poppins font-bold">Appointment Management</h2>
              <p className="text-sm text-gray-500">Schedule and manage patient appointments</p>
            </div>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all">
              <span className="text-xl">+</span> Schedule Appointment
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kolom Kiri - Calendar Card */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={18} className="text-gray-400" />
                <h3 className="font-bold">Calendar</h3>
              </div>
              
              {/* Simple Calendar Placeholder */}
              <div className="text-center space-y-4">
                <div className="flex justify-between items-center font-bold text-sm px-2">
                  <span>February 2026</span>
                  <div className="flex gap-4 text-gray-400"><span>{"<"}</span><span>{">"}</span></div>
                </div>
                <div className="grid grid-cols-7 text-[10px] text-gray-400 font-bold">
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-y-4 text-sm">
                   {/* Simulasi tanggal sesuai gambar */}
                   {[...Array(28)].map((_, i) => (
                     <div key={i} className={`py-1 ${i+1 === 10 ? 'bg-black text-white rounded-lg font-bold' : ''}`}>
                       {i + 1}
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Kolom Kanan - Today's Appointments (List) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                <Search size={18} className="text-gray-400" />
                <input type="text" placeholder="Search appointments..." className="flex-1 outline-none text-sm" />
                <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
                <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                   Status <ChevronDown size={14} />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                   <h3 className="font-bold">Today's Appointments</h3>
                   <p className="text-xs text-gray-400">5 appointments scheduled</p>
                </div>

                <div className="divide-y divide-gray-50">
                  {/* Appointment Item 1 */}
                  <AppointmentItem 
                    name="Emma Wilson" 
                    time="09:00 AM (30 min)" 
                    status="confirmed" 
                    room="Room 101"
                    doctor="Dr. Smith"
                    note="Follow-up for hypertension"
                  />
                  {/* Appointment Item 2 */}
                  <AppointmentItem 
                    name="Michael Brown" 
                    time="10:30 AM (45 min)" 
                    status="pending" 
                    room="Room 203"
                    doctor="Dr. Johnson"
                    note="Diabetes management review"
                  />
                   {/* Appointment Item 3 */}
                   <AppointmentItem 
                    name="Sarah Davis" 
                    time="02:15 PM (2 hours)" 
                    status="confirmed" 
                    room="OR 1"
                    doctor="Dr. Williams"
                    note="Minor outpatient procedure"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-komponen untuk List Appointment agar rapi
const AppointmentItem = ({ name, time, status, room, doctor, note }) => {
  const statusColors = {
    confirmed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    cancelled: "bg-red-100 text-red-600"
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-lg">👤</div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm">{name}</h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${statusColors[status]}`}>
                {status}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-1">
              <span className="flex items-center gap-1">🩺 {doctor}</span>
              <span className="flex items-center gap-1">⏰ {time}</span>
              <span className="flex items-center gap-1">📍 {room}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-xs font-bold hover:bg-white">Edit</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-xs font-bold hover:bg-white text-green-600">Complete</button>
        </div>
      </div>
      <p className="text-xs text-gray-400 ml-13 italic">"{note}"</p>
    </div>
  );
};

export default Home;