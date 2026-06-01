import React from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({ placeholder = "Search...", value, onChange }) {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-3 w-full shadow-sm">
      <Search size={18} className="text-teks-samping" />
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className="flex-1 outline-none text-sm bg-transparent text-teks" 
      />
    </div>
  );
}