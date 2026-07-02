import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Loading from './Loading';

export default function ProtectedRoute({ children, allowedRoles }) {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        // 1. Ambil session dari Supabase Auth
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;
        if (cancelled) return;

        setSession(currentSession);

        if (currentSession) {
          // 2. Ambil profile user dari tabel public.users
          const { data, error: profileError } = await supabase
            .from('users')
            .select('role, full_name, points, tier')
            .eq('id', currentSession.user.id)
            .maybeSingle();

          if (profileError) throw profileError;
          if (cancelled) return;

          setUserProfile(data || null);
        }
      } catch (err) {
        console.error('ProtectedRoute auth check error:', err);
        setSession(null);
        setUserProfile(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    checkAuth();

    return () => { cancelled = true; };
  }, []);

  // Loading state
  if (loading) return <Loading />;

  // Tidak ada session -> redirect ke login
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role tidak sesuai -> redirect ke 404
  if (allowedRoles && userProfile && !allowedRoles.includes(userProfile.role)) {
    return <Navigate to="/404" replace />;
  }

  // Render children (halaman yang dilindungi)
  return children;
}
