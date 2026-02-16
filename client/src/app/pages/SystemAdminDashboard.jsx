import { Outlet, NavLink, useNavigate } from 'react-router-dom';

export default function SystemAdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">UniformHub - Admin</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-72px)] p-6">
          <nav className="space-y-2">
            <NavLink
              to="/admin-dashboard"
              end
              className={({ isActive }) =>
                `block px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/admin-dashboard/user-management"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              User Management
            </NavLink>
            <NavLink
              to="/admin-dashboard/schools"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-md transition-all ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Schools
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
