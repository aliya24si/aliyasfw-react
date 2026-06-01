import React from 'react';
import Avatar from './Avatar';
import Badge from './Badge';

export default function AppointmentItem({ name, time, status, room, doctor, note }) {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <Avatar name={name} />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-teks">{name}</h4>
              <Badge status={status} />
            </div>
            <div className="flex items-center gap-3 text-[11px] text-teks-samping mt-1">
              <span>🩺 {doctor}</span>
              <span>⏰ {time}</span>
              <span>📍 {room}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-xs font-bold hover:bg-white text-teks">Edit</button>
          <button className="px-3 py-1 border border-gray-200 rounded-lg text-xs font-bold hover:bg-white text-accent">Complete</button>
        </div>
      </div>
      <p className="text-xs text-teks-samping ml-13 italic">"{note}"</p>
    </div>
  );
}