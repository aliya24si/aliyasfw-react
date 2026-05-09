import { NavLink } from 'react-router-dom';
// Impor logo Vector.png jika kamu menyimpannya di folder assets
// import logo dari '../assets/Vector.png'; 

export default function Sidebar() {
  const activeStyle = "text-primary font-bold bg-primary-light p-3 rounded-xl";
  const inactiveStyle = "text-teks-samping p-3 hover:text-primary transition-all";

  return (
    <aside className="hidden md:flex w-64 bg-white border-r border-garis flex-col p-6 sticky top-0 h-screen">
      {/* Bagian Logo dan Nama Aplikasi */}
      <div className="mb-10 flex items-center gap-3">
        {/* Menggunakan Image Logo yang diunggah */}
        <img 
          src="/img/logo.png" 
          alt="PetTrack Logo" 
          className="w-10 h-10 object-contain" 
        />
        <h1 className="text-2xl font-bold text-primary italic font-poppins tracking-tight">
          PetTrack
        </h1>
      </div>

      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          Home
        </NavLink>
        <NavLink to="/doctors" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          Doctors
        </NavLink>
        <NavLink to="/pharmacy" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          Pharmacy
        </NavLink>
      </nav>
    </aside>
  );
}