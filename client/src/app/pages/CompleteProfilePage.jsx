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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const renderProfileForm = () => {
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
