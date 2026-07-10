import React from 'react';
import { Moon, LogOut } from 'lucide-react'; // Mengimpor icon LogOut
import StatusIndicator from './StatusIndicator';
import Avatar from './Avatar';

export default function TopHeader({ title, subtitle }) {
  
  // Fungsi penanganan log out
  const handleLogout = () => {
    // 1. Hapus token atau session (sesuaikan dengan sistem auth kamu)
    localStorage.removeItem('token'); 
    sessionStorage.clear();

    // 2. Redirect ke halaman login
    window.location.href = '/login'; 
  };

  return (
    <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-100">
      <div>
        <h1 className="text-xl font-poppins font-bold text-teks">{title}</h1>
        <p className="text-xs text-teks-samping">{subtitle}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <StatusIndicator />
        
        {/* Tombol Dark Mode */}
        <button className="p-2 text-teks-samping hover:bg-gray-50 rounded-lg transition-colors">
          <Moon size={18}/>
        </button>

        {/* Tombol Log Out Baru */}
        <button 
          onClick={handleLogout}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Log Out"
        >
          <LogOut size={18}/>
        </button>

        <Avatar name="Dr. Smith" />
      </div>
    </header>
  );
}