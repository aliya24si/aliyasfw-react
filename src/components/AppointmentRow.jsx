import React from 'react';
import Avatar from './Avatar';
import Badge from './Badge';

export default function AppointmentRow({ name, type, time, status }) {
  return (
    <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <Avatar name={name} />
        <div>
          <h4 className="text-sm font-bold text-teks">{name}</h4>
          <p className="text-[11px] text-teks-samping">{type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-teks">{time}</p>
        <Badge status={status} />
      </div>
    </div>
  );
}