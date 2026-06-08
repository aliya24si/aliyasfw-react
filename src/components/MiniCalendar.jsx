import React from 'react';
import { Calendar } from "@/components/ui/calendar";

export default function MiniCalendar() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
      <div className="w-full px-2 mb-2">
        <h3 className="font-poppins font-bold text-sm text-teks">Schedule Planner</h3>
        <p className="text-[11px] text-teks-samping">Select a date to inspect allocations</p>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border border-gray-50 max-w-full"
      />
    </div>
  );
}