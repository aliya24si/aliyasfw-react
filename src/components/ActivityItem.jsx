import React from 'react';

export default function ActivityItem({ icon, color, title, user, time }) {
  const colors = {
    blue: "text-blue-500 bg-blue-50",
    green: "text-accent bg-green-50",
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
        <p className="text-[11px] text-teks-samping">{user} • {time}</p>
      </div>
    </div>
  );
}