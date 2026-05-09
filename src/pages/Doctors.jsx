import data from '../data/db.json';
import { Search, Calendar, Heart } from 'lucide-react';

export default function Doctors() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="bg-primary p-6 rounded-[35px] text-white mb-8">
        <h2 className="text-center font-poppins text-lg mb-4">Find Your Doctor</h2>
        <div className="relative">
          <input type="text" placeholder="Search..." className="w-full py-3 px-12 rounded-full text-teks outline-none" />
          <Search className="absolute left-4 top-2.5 text-primary" size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {data.doctors.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded-[25px] flex items-center gap-4 border border-garis shadow-sm hover:shadow-md transition-all group">
            <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-full object-cover border-2 border-primary-light" />
            <div className="flex-1">
              <h4 className="font-bold text-primary">{doc.name}</h4>
              <p className="text-xs text-teks-samping mb-2">{doc.specialty}</p>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full border border-primary text-primary text-[10px] font-bold">Info</button>
                <div className="flex items-center gap-3 ml-auto text-primary">
                  <Calendar size={18} className="cursor-pointer" />
                  <Heart size={18} className="cursor-pointer group-hover:fill-primary" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}