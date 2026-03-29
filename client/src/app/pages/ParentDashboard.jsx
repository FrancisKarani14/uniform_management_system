import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlineHome, AiOutlineSearch, AiOutlineTeam, AiOutlineFileText, AiOutlineBank, AiOutlineUser, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';
import API from '../Api/Api';

export default function ParentDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await API.get('/users/users/me/');
        if (!response.data.parent_profile) {
          navigate('/complete-profile');
        } else {
          setUser(response.data);
          setLoading(false);
        }
      } catch (error) {
        navigate('/login');
      }
    };
    checkProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <FaGraduationCap className="text-3xl text-blue-700" />
            <h1 className="text-2xl font-bold text-blue-700">UniformHub</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-bold">{user?.first_name} {user?.last_name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex relative">
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Sidebar */}
        <aside className={`fixed md:static z-30 top-0 left-0 h-full w-64 bg-white shadow-md min-h-screen p-6 overflow-y-auto transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
          <div className="mb-6 mt-16 md:mt-0">
            <h2 className="text-lg font-bold text-gray-900">Parent Dashboard</h2>
          </div>
          <nav className="space-y-2">
            <NavLink
              to="/parent-dashboard"
              end
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineHome className="text-xl" />
              <span>Overview</span>
            </NavLink>
            <NavLink
              to="/parent-dashboard/browse-schools"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineSearch className="text-xl" />
              <span>Browse Schools</span>
            </NavLink>
            <NavLink
              to="/parent-dashboard/my-students"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineTeam className="text-xl" />
              <span>My Students</span>
            </NavLink>
            <NavLink
              to="/parent-dashboard/uniform-applications"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineFileText className="text-xl" />
              <span>Uniform Applications</span>
            </NavLink>
            <NavLink
              to="/parent-dashboard/my-schools"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineBank className="text-xl" />
              <span>My Schools</span>
            </NavLink>
            <NavLink
              to="/parent-dashboard/profile"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineUser className="text-xl" />
              <span>Profile</span>
            </NavLink>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
