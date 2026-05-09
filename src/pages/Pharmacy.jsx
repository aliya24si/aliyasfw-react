import PageHeader from '../components/PageHeader';
import { Heart } from 'lucide-react';
import db from '../data/db.json';

export default function Pharmacy() {
  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader title="Pharmacy" subtitle="Find Your Pharmacy" />
      
      <div className="p-6 space-y-6">
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">A → Z</button>
          <button className="border border-primary text-primary px-4 py-1 rounded-full text-xs font-bold">Info</button>
          <button className="border border-primary text-primary px-4 py-1 rounded-full text-xs font-bold">Favorites</button>
        </div>

        <div className="space-y-4">
          {db.pharmacies.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-[30px] border border-garis flex items-center gap-4 relative group">
              <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center border border-primary/20">
                <span className="text-3xl">💊</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary text-sm">{item.name}</h3>
                <p className="text-[10px] text-teks-samping leading-tight mt-1">Address: {item.address}</p>
                <p className="text-[10px] text-teks-samping">Schedule: {item.time}</p>
                <p className="text-[10px] text-primary font-bold mt-2">Recommended ⭐⭐⭐⭐⭐</p>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <Heart size={24} className="text-primary cursor-pointer hover:fill-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}