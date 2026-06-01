import React from 'react';

export default function MiniCalendar() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center font-bold text-sm px-2 mb-4 text-teks">
        <span>February 2026</span>
        <div className="flex gap-4 text-teks-samping cursor-pointer"><span>{"<"}</span><span>{">"}</span></div>
      </div>
      <div className="grid grid-cols-7 text-[10px] text-teks-samping font-bold text-center mb-2">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-3 text-sm text-center">
         {[...Array(28)].map((_, i) => (
           <div key={i} className={`py-1 mx-auto w-8 h-8 flex items-center justify-center cursor-pointer ${i+1 === 10 ? 'bg-primary text-white rounded-lg font-bold' : 'text-teks hover:bg-gray-50 rounded-lg'}`}>
             {i + 1}
           </div>
         ))}
      </div>
    </div>
  );
}