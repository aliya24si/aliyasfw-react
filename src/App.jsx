import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import RootRedirect from './components/RootRedirect';

// Lazy Loading Pages
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const Home = lazy(() => import('./pages/Home'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Forgot = lazy(() => import('./pages/auth/Forgot'));
const GuestHome = lazy(() => import('./pages/GuestHome'));
const DataUser = lazy(() => import('./pages/DataUser'));
const Patients = lazy(() => import('./pages/Patients'));
const MedicalRecords = lazy(() => import('./pages/MedicalRecords'));
const AppointmentCalendar = lazy(() => import('./pages/AppointmentCalendar'));
const Settings = lazy(() => import('./pages/Settings'));

// REGISTRASI HALAMAN MEMBER BARU (LAZY LOADED)
const MemberHome = lazy(() => import('./pages/MemberHome'));
const MemberBooking = lazy(() => import('./pages/MemberBooking'));
const MemberHistory = lazy(() => import('./pages/MemberHistory'));
const MemberPatients = lazy(() => import('./pages/MemberPatients'));

const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>

          {/* Root route — dinamis berdasarkan auth state */}
          <Route path="/" element={<RootRedirect />} />

          {/* Layout Khusus Auth (Login, Register, Forgot) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* Layout Utama Admin/Staff (Sidebar Kiri) — hanya untuk admin */}
          <Route element={<MainLayout />}>
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Home /></ProtectedRoute>} />
            <Route path="/admin/appointments" element={<ProtectedRoute allowedRoles={['admin']}><Appointments /></ProtectedRoute>} />
            <Route path="/admin/data-user" element={<ProtectedRoute allowedRoles={['admin']}><DataUser /></ProtectedRoute>} />
            <Route path="/admin/patients" element={<ProtectedRoute allowedRoles={['admin']}><Patients /></ProtectedRoute>} />
            <Route path="/admin/medical-records" element={<ProtectedRoute allowedRoles={['admin']}><MedicalRecords /></ProtectedRoute>} />
            <Route path="/admin/calendar" element={<ProtectedRoute allowedRoles={['admin']}><AppointmentCalendar /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />
          </Route>

          {/* RUTE GUEST DI LUAR LAYOUT UTAMA */}
          <Route path="/" element={<GuestHome />} />

          {/* RUTE PORTAL PREMIUM MEMBER — hanya untuk member */}
          <Route path="/member/home" element={<ProtectedRoute allowedRoles={['member']}><MemberHome /></ProtectedRoute>} />
          <Route path="/member/booking" element={<ProtectedRoute allowedRoles={['member']}><MemberBooking /></ProtectedRoute>} />
          <Route path="/member/history" element={<ProtectedRoute allowedRoles={['member']}><MemberHistory /></ProtectedRoute>} />
          <Route path="/member/patients" element={<ProtectedRoute allowedRoles={['member']}><MemberPatients /></ProtectedRoute>} />

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