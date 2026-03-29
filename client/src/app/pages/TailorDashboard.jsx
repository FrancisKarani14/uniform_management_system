import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineSearch, AiOutlineBank, AiOutlineScissor, AiOutlineUser, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';
import API from '../Api/Api';

export default function TailorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/users/users/me/').then(res => setUser(res.data)).catch(() => navigate('/login'));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/tailor-dashboard' && location.pathname === '/tailor-dashboard') return true;
    if (path !== '/tailor-dashboard' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden text-gray-700 text-2xl"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
              <Link to="/" className="flex items-center gap-2">
                <FaGraduationCap className="text-blue-700 text-2xl" />
                <span className="text-2xl font-bold text-blue-700">UniformHub</span>
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
          </div>
        </div>
      </nav>

      <div className="flex relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Sidebar */}
        <aside className={`fixed md:static z-30 top-0 left-0 h-full w-64 bg-white shadow-md min-h-screen transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
          <div className="p-4 mb-2 mt-16 md:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{user?.first_name} {user?.last_name}</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tailor-dashboard"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                    isActive('/tailor-dashboard') && location.pathname === '/tailor-dashboard'
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <AiOutlineHome className="text-xl" />
                  <span>Overview</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tailor-dashboard/browse-schools"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                    isActive('/tailor-dashboard/browse-schools')
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <AiOutlineSearch className="text-xl" />
                  <span>Browse Schools</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tailor-dashboard/my-schools"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                    isActive('/tailor-dashboard/my-schools')
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <AiOutlineBank className="text-xl" />
                  <span>My Schools</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tailor-dashboard/my-assignments"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                    isActive('/tailor-dashboard/my-assignments')
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <AiOutlineScissor className="text-xl" />
                  <span>My Assignments</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tailor-dashboard/profile"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                    isActive('/tailor-dashboard/profile')
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <AiOutlineUser className="text-xl" />
                  <span>Profile</span>
                </Link>
              </li>
            </ul>
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
