import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, subtitle }) {
  const navigate = useNavigate();
  return (
    <div className="bg-primary p-6 rounded-b-[40px] text-white shadow-lg relative">
      <button onClick={() => navigate(-1)} className="absolute left-6 top-7 text-white">
        <ChevronLeft size={28} />
      </button>
      <h1 className="text-center text-2xl font-poppins font-bold mt-2">{title}</h1>
      <p className="text-center text-sm opacity-90 mt-4 mb-6">{subtitle}</p>
      
      <div className="relative max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-3 px-12 rounded-full text-teks outline-none shadow-md"
        />
        <Search className="absolute left-4 top-2.5 text-primary" size={20} />
      </div>
    </div>
  );
}