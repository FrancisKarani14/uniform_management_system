export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-16 py-4 bg-white shadow-md z-10">
      <div className="flex items-center">
        <span className="text-xl font-bold text-blue-700">uniformhub</span>
      </div>
      <div className="flex gap-3">
        <button className="px-5 py-2 bg-white text-blue-700 border-2 border-blue-700 rounded-md text-sm font-medium hover:bg-blue-50 transition-all">
          Sign In
        </button>
        <button className="px-5 py-2 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition-all">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
