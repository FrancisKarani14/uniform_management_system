import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Api/supabase';
import API from '../Api/Api';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          const pendingRole = localStorage.getItem('pending_role');
          const role = pendingRole || 'Parent';
          localStorage.removeItem('pending_role');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');

          const response = await API.post('/users/auth/supabase/', {
            email: session.user.email,
            user_metadata: session.user.user_metadata,
            role: role
          });

          localStorage.setItem('access_token', response.data.token);
          localStorage.setItem('refresh_token', response.data.refresh);

          const userData = response.data.user;
          const userRole = userData.role;

          const hasProfile =
            (userRole === 'Parent' && userData.parent_profile) ||
            (userRole === 'Tailor' && userData.tailor_profile) ||
            (userRole === 'Admin' && userData.admin_profile) ||
            (userRole === 'School_Admin' && userData.school_admin_profile);

          const dashboardMap = {
            Admin: '/admin-dashboard',
            Tailor: '/tailor-dashboard',
            Parent: '/parent-dashboard',
            School_Admin: '/school-admin-dashboard',
          };

          navigate(hasProfile ? (dashboardMap[userRole] || '/complete-profile') : '/complete-profile');
        } catch (err) {
          console.error('Auth callback error:', err);
          setError('Authentication failed. Redirecting...');
          setTimeout(() => navigate('/login'), 2000);
        }
      } else if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl text-gray-600 mb-2">Signing you in...</div>
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
}
