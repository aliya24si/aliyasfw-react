import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    // h-screen memastikan layout setinggi layar monitor
    <div className="flex h-screen bg-latar overflow-hidden">
      
      {/* Sidebar tetap di kiri dengan lebar statis */}
      <Sidebar />

      {/* Area Konten: flex-1 membuatnya mengambil sisa ruang desktop */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Konten akan mengisi seluruh area kanan */}
        <div className="p-8 w-full">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
};
export default MainLayout;