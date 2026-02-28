import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParentProfileForm from '../components/ParentProfileForm.jsx';
import TailorProfileForm from '../components/TailorProfileForm.jsx';
import SchoolAdminProfileForm from '../components/SchoolAdminProfileForm.jsx';
import AdminProfileForm from '../components/AdminProfileForm.jsx';
import API from '../Api/Api';

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get('/users/users/me/');
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleRoleSelection = async (role) => {
    try {
      await API.patch(`/users/users/${user.id}/`, { role });
      setUser({ ...user, role });
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const renderProfileForm = () => {
    if (!user?.role) {
      return (
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Select Your Role</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleRoleSelection('Parent')}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-700 hover:bg-blue-50 transition-all"
            >
              <div className="text-4xl mb-2">👨👩</div>
              <div className="font-semibold">Parent</div>
            </button>
            <button
              onClick={() => handleRoleSelection('Tailor')}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-700 hover:bg-blue-50 transition-all"
            >
              <div className="text-4xl mb-2">✂️</div>
              <div className="font-semibold">Tailor</div>
            </button>
          </div>
        </div>
      );
    }

    switch (user?.role) {
      case 'Parent':
        return <ParentProfileForm user={user} />;
      case 'Tailor':
        return <TailorProfileForm user={user} />;
      case 'School_Admin':
        return <SchoolAdminProfileForm user={user} />;
      case 'Admin':
        return <AdminProfileForm user={user} />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        {renderProfileForm()}
      </div>
      <Footer />
    </div>
  );
}
