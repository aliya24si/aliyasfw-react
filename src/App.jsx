import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';

// Lazy Loading Pages
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const Home = lazy(() => import('./pages/Home'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));
const GuestHome = lazy(() => import('./pages/GuestHome'));

// REGISTRASI HALAMAN MEMBER BARU (LAZY LOADED)
const MemberHome = lazy(() => import('./pages/MemberHome'));
const MemberBooking = lazy(() => import('./pages/MemberBooking')); // TAMBAHAN BARU
const MemberHistory = lazy(() => import('./pages/MemberHistory')); // TAMBAHAN BARU

const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          
          {/* Layout Khusus Auth (Login, Register, Forgot) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* Layout Utama Dokter/Staff Internal (Ada Sidebar Kiri) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Appointments" element={<Appointments />} />
          </Route>

          {/* RUTE GUEST DI LUAR LAYOUT UTAMA */}
          <Route path="/guest/home" element={<GuestHome />} />

          {/* RUTE PORTAL PREMIUM MEMBER (STAND-ALONE LONG PAGE) */}
          <Route path="/member/home" element={<MemberHome />} />
          <Route path="/member/booking" element={<MemberBooking />} />   {/* TAMBAHAN BARU */}
          <Route path="/member/history" element={<MemberHistory />} />   {/* TAMBAHAN BARU */}

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