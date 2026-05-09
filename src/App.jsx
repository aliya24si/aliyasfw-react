import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';

// Lazy Loading Pages
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const Home = lazy(() => import('./pages/Home'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Pharmacy = lazy(() => import('./pages/Pharmacy')); // Tambahkan ini
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      {/* Suspense membungkus semua rute agar Loading muncul saat pindah halaman */}
      <Suspense fallback={<Loading />}>
        <Routes>
          
          {/* Layout Khusus Auth (Login, Register, Forgot) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* Layout Utama (Navbar/Sidebar + Konten) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/pharmacy" element={<Pharmacy />} /> {/* Tambahkan ini */}
          </Route>

          {/* Halaman 404 */}
          <Route path="/404" element={<NotFound />} />
          
          {/* Redirect jika mengetik alamat asal-asalan */}
          <Route path="*" element={<Navigate to="/404" replace />} />
          
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;