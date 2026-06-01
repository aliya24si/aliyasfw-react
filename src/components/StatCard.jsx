import React from 'react';

export default function StatCard({ title, value, trend, icon, color }) {
  const colors = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-accent bg-green-50",
    orange: "text-warning bg-amber-50",
    red: "text-danger bg-red-50"
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
      <div className="flex justify-between items-start">
        <p className="text-xs font-bold text-teks-samping uppercase tracking-wider">{title}</p>
        <div className={`p-2 rounded-lg ${colors[color]}`}>{icon}</div>
      </div>
      <div className="mt-4">
        <h4 className="text-2xl font-poppins font-bold text-teks">{value}</h4>
        <p className={`text-xs mt-1 font-bold ${trend.startsWith('+') ? 'text-accent' : 'text-danger'}`}>
          {trend} <span className="text-teks-samping font-normal">from last month</span>
        </p>
      </div>
    </div>
  );
}