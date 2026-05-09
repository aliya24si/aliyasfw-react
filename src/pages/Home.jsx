// src/pages/Home.jsx
import { Search, Bell, Settings } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      
      {/* Top Header - Dibuat full width */}
      <div className="flex justify-between items-center w-full bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex gap-4">
           <button className="p-3 bg-latar rounded-full hover:bg-primary-light transition-colors"><Bell size={20}/></button>
           <button className="p-3 bg-latar rounded-full hover:bg-primary-light transition-colors"><Settings size={20}/></button>
           <button className="p-3 bg-latar rounded-full hover:bg-primary-light transition-colors"><Search size={20}/></button>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-primary font-bold">Hi, WelcomeBack</p>
            <p className="font-poppins text-lg">liya's sfw</p>
          </div>
          <img src="/img/aliya safwa.jpg" className="w-12 h-12 rounded-full border-2 border-primary" />
        </div>
      </div>

      {/* Hero Search Section - Full Width */}
      <div className="bg-primary p-12 rounded-[40px] text-white shadow-xl flex flex-col items-center">
        <h2 className="text-3xl font-poppins mb-8">Find Your Doctors</h2>
        <div className="relative w-full max-w-3xl"> 
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full py-5 px-16 rounded-full text-teks text-lg outline-none shadow-2xl"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={28} />
        </div>
      </div>

      {/* Grid Menu & Schedule - Dibuat menyamping jika di Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Section Kiri (Categories & Specialties) */}
        <div className="lg:col-span-2 space-y-8">
           <h3 className="text-xl font-bold font-poppins">Specialties</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Cardiology', 'Dermatology', 'Oncology', 'Gynecology', 'Odontology', 'General'].map(item => (
                <div key={item} className="bg-white p-8 rounded-[30px] border border-garis flex flex-col items-center hover:bg-primary-light transition-all cursor-pointer shadow-sm">
                   <div className="text-4xl mb-4">🩺</div>
                   <span className="font-bold text-primary">{item}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Section Kanan (Upcoming Schedule) - SUDAH TERISI */}
        <div className="bg-primary rounded-[40px] p-6 text-white h-fit shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold font-poppins">Upcoming Schedule</h3>
            <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Month</span>
          </div>

          {/* Horizontal Calendar */}
          <div className="flex justify-between items-center gap-2 mb-8">
            <button className="text-white/50 hover:text-white">{"<"}</button>
            {[
              { day: "9", name: "MON" },
              { day: "10", name: "TUE" },
              { day: "11", name: "WED", active: true },
              { day: "12", name: "THU" },
              { day: "13", name: "FRI" },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center justify-center w-12 py-3 rounded-2xl transition-all ${
                  item.active ? "bg-white text-primary shadow-lg scale-110" : "bg-white/20 text-white"
                }`}
              >
                <span className="text-sm font-bold">{item.day}</span>
                <span className="text-[8px] font-medium">{item.name}</span>
              </div>
            ))}
            <button className="text-white/50 hover:text-white">{">"}</button>
          </div>

          {/* Appointment List */}
          <div className="space-y-4">
            <div className="relative pl-6 pb-4 border-l border-white/30">
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              <p className="text-[10px] opacity-80 mb-1">11 Month - Wednesday - Today</p>
              <h4 className="text-sm font-bold">10:00 am Dr. Olivia Turner</h4>
            </div>

            <div className="relative pl-6 pb-4 border-l border-white/30">
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-white/40 rounded-full"></div>
              <p className="text-[10px] opacity-80 mb-1">16 Month - Monday</p>
              <h4 className="text-sm font-bold">08:00 am Dr. Alexander Bennett</h4>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-white/40 rounded-full"></div>
              <p className="text-[10px] opacity-80 mb-1">20 Month - Friday</p>
              <h4 className="text-sm font-bold">02:30 pm Dr. Ava Williams</h4>
            </div>
          </div>

          <button className="w-full mt-6 py-2 text-xs font-bold bg-white/20 hover:bg-white/30 rounded-xl transition-all">
            See all
          </button>
        </div>

      </div>
    </div>
  );
};
export default Home;