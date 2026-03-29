import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineUser, AiOutlineScissor, AiOutlineShopping, AiOutlineFileText, AiOutlineTeam, AiOutlineBank, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';
import API from '../Api/Api';

export default function SchoolAdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get('/users/users/me/').then(res => setUser(res.data)).catch(() => navigate('/login'));
  }, [navigate]);

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
            <h1 className="text-2xl font-bold text-blue-700">UniformHub - School Admin</h1>
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
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside className={`fixed md:static z-30 top-0 left-0 h-full w-64 bg-white shadow-md min-h-screen p-6 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
          <div className="mb-6 mt-16 md:mt-0">
            <h2 className="text-lg font-bold text-gray-900">{user?.first_name} {user?.last_name}</h2>
          </div>
          <nav className="space-y-2">
            <NavLink
              to="/school-admin-dashboard"
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
              to="/school-admin-dashboard/school"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineBank className="text-xl" />
              <span>School</span>
            </NavLink>
            <NavLink
              to="/school-admin-dashboard/parent-applications"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineUser className="text-xl" />
              <span>Parent Applications</span>
            </NavLink>
            <NavLink
              to="/school-admin-dashboard/tailor-applications"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineScissor className="text-xl" />
              <span>Tailor Applications</span>
            </NavLink>
            <NavLink
              to="/school-admin-dashboard/uniform-applications"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineShopping className="text-xl" />
              <span>Uniform Applications</span>
            </NavLink>
            <NavLink
              to="/school-admin-dashboard/uniform-assignments"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineFileText className="text-xl" />
              <span>Uniform Assignments</span>
            </NavLink>
            <NavLink
              to="/school-admin-dashboard/students"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineTeam className="text-xl" />
              <span>Students</span>
            </NavLink>
            <NavLink
              to="/school-admin-dashboard/profile"
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
