import React from 'react';

export default function StatCard({ title, value, trend, icon, color }) {
  const colors = {
    blue: "text-blue-500 bg-blue-50",
    // Di sini diubah ke emerald pekat dan background yang lebih hidup
    green: "text-emerald-600 bg-emerald-50 border border-emerald-100",
    orange: "text-warning bg-amber-50",
    red: "text-danger bg-red-50"
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
      <div className="flex justify-between items-start">
        {/* Diubah dari text-teks-samping ke text-gray-500 agar abu-abunya pas dan tidak pudar */}
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
        <div className={`p-2 rounded-lg ${colors[color]}`}>{icon}</div>
      </div>
      <div className="mt-4">
        <h4 className="text-2xl font-poppins font-bold text-teks">{value}</h4>
        {/* Diubah ke text-emerald-600 untuk tren positif (+) agar hijau menyala tebal */}
        <p className={`text-xs mt-1 font-bold ${trend.startsWith('+') ? 'text-emerald-600' : 'text-danger'}`}>
          {trend} <span className="text-gray-400 font-medium">from last month</span>
        </p>
      </div>
    </div>
  );
}