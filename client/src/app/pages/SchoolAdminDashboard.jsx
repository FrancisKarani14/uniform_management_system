import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineUser, AiOutlineScissor, AiOutlineShopping, AiOutlineFileText, AiOutlineTeam, AiOutlineBank } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';

export default function SchoolAdminDashboard() {
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
          <h1 className="text-2xl font-bold text-blue-700">UniformHub - School Admin</h1>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-bold">Jane School Admin</span>
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
            <h2 className="text-lg font-bold text-gray-900">School Admin Dashboard</h2>
          </div>
          <nav className="space-y-2">
            <NavLink
              to="/school-admin-dashboard"
              end
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
