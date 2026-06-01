import React from 'react';
import { UserPlus, Calendar, Activity, AlertCircle } from 'lucide-react';
import ActionButton from './ActionButton';

export default function QuickActionSection() {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-poppins font-bold text-teks">Quick Actions</h3>
        <p className="text-xs text-teks-samping">Frequently used actions for faster workflow</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionButton icon={<UserPlus size={20}/>} label="Add New Patient" primary />
        <ActionButton icon={<Calendar size={20}/>} label="Schedule Appointment" />
        <ActionButton icon={<Activity size={20}/>} label="View Lab Results" />
        <ActionButton icon={<AlertCircle size={20}/>} label="Emergency Alert" />
      </div>
    </section>
  );
}