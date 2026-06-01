import React from 'react';

export default function ActionButton({ icon, label, primary }) {
  return (
    <button className={`flex items-center justify-center gap-3 p-4 rounded-xl font-bold text-sm transition-all border w-full ${
      primary 
      ? "bg-primary text-white border-primary hover:opacity-90" 
      : "bg-white text-teks border-gray-100 hover:border-gray-300 shadow-sm"
    }`}>
      {icon}
      {label}
    </button>
  );
}