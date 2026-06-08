import React from 'react';

export default function ActivityItem({ icon, color, title, user, time }) {
  const colors = {
    blue: "text-blue-500 bg-blue-50",
    // Diubah menggunakan emerald agar hijaunya tajam dan keluar warnanya
    green: "text-emerald-600 bg-emerald-50 border border-emerald-100",
    orange: "text-warning bg-amber-50",
    purple: "text-purple-500 bg-purple-50"
  };

  return (
    <div className="flex gap-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-teks">{title}</p>
        {/* Diubah dari text-teks-samping ke text-gray-500 font-medium agar tidak terlalu samar */}
        <p className="text-[11px] text-gray-500 font-medium">{user} • {time}</p>
      </div>
    </div>
  );
}