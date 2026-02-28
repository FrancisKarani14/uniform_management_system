import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Api/supabase';
import API from '../Api/Api';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          navigate('/login');
          return;
        }

        const user = session.user;
        const role = user.user_metadata?.role;

        if (!role) {
          navigate('/complete-profile');
          return;
        }

        // Sync with Django backend - create/update user
        try {
          const supabaseToken = session.access_token;
          const response = await API.post('/users/sync-supabase/', {
            supabase_id: user.id,
            email: user.email,
            role: role,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || ''
          }, {
            headers: {
              'X-Supabase-Token': supabaseToken
            }
          });

          // Store Django JWT token
          if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
          }
        } catch (syncError) {
          console.error('Failed to sync with backend:', syncError);
        }

        // Redirect based on role
        const roleRoutes = {
          parent: '/parent-dashboard',
          tailor: '/tailor-dashboard',
          schooladmin: '/schooladmin-dashboard',
          admin: '/admin-dashboard'
        };

        navigate(roleRoutes[role.toLowerCase()] || '/complete-profile');
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}
