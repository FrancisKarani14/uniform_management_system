import { Outlet, Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch, AiOutlineBank, AiOutlineScissor } from 'react-icons/ai';
import { FaGraduationCap } from 'react-icons/fa';

export default function TailorDashboard() {
  const location = useLocation();

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
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-blue-700 text-2xl" />
              <span className="text-2xl font-bold text-blue-700">UniformHub</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-bold">Mike Tailor</span>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-4rem)]">
          <div className="p-4 mb-2">
            <h2 className="text-lg font-bold text-gray-900">Tailor Dashboard</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tailor-dashboard"
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
