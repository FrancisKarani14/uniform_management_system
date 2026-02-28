import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Api/supabase';
import API from '../Api/Api';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          navigate('/login');
          return;
        }

        // Get role from localStorage (set during signup) or user_metadata
        const pendingRole = localStorage.getItem('pending_role');
        const role = pendingRole || session.user.user_metadata?.role || 'parent';
        
        // Clear pending role
        localStorage.removeItem('pending_role');

        // Send user data to Django backend
        const response = await API.post('/users/auth/supabase/', {
          email: session.user.email,
          user_metadata: session.user.user_metadata,
          role: role
        });

        // Store Django token
        localStorage.setItem('access_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        navigate('/complete-profile');
      } catch (error) {
        console.error('Auth callback error:', error);
        setError('Authentication failed. Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl text-gray-600 mb-2">Loading...</div>
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
}
