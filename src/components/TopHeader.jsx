import React from 'react';
import { Moon, Sun } from 'lucide-react';
import StatusIndicator from './StatusIndicator';
import Avatar from './Avatar';

export default function TopHeader({ title, subtitle }) {
  return (
    <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-100">
      <div>
        <h1 className="text-xl font-poppins font-bold text-teks">{title}</h1>
        <p className="text-xs text-teks-samping">{subtitle}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <StatusIndicator />
        <button className="p-2 text-teks-samping hover:bg-gray-50 rounded-lg transition-colors">
          <Moon size={18}/>
        </button>
        <Avatar name="Dr. Smith" />
      </div>
    </header>
  );
}