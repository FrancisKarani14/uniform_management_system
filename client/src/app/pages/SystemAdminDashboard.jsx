import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineBank } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';

export default function SystemAdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <FaGraduationCap className="text-3xl text-blue-700" />
          <h1 className="text-2xl font-bold text-blue-700">UniformHub - Admin</h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-bold">System Admin</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-72px)] p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">System Admin Dashboard</h2>
          </div>
          <nav className="space-y-2">
            <NavLink
              to="/admin-dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineHome className="text-xl" />
              <span>Overview</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/user-management"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineUser className="text-xl" />
              <span>User Management</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/schools"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <AiOutlineBank className="text-xl" />
              <span>Schools</span>
            </NavLink>
            <NavLink
              to="/admin-dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
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
