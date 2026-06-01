import React from 'react';

export default function StatusIndicator() {
  return (
    <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
      <span className="text-[11px] font-bold text-accent">Online</span>
    </div>
  );
}