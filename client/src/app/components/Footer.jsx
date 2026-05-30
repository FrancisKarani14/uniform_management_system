import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaGraduationCap className="text-2xl text-blue-400" />
            <span className="text-white text-xl font-bold">UniformHub</span>
          </div>
          <p className="text-sm leading-relaxed">
            Connecting parents, schools, and tailors in one seamless platform for school uniform management.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
            </li>
            <li>
              <button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Sign In</button>
            </li>
            <li>
              <button onClick={() => navigate('/signup')} className="hover:text-white transition-colors">Create Account</button>
            </li>
          </ul>
        </div>

        {/* Roles */}
        <div>
          <h4 className="text-white font-semibold mb-4">Platform Roles</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition-colors">Parents</li>
            <li className="hover:text-white transition-colors">School Administrators</li>
            <li className="hover:text-white transition-colors">Tailors</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>&copy; {new Date().getFullYear()} UniformHub. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-colors"><FaTwitter /></a>
          <a href="#" className="hover:text-white transition-colors"><FaLinkedin /></a>
          <a href="#" className="hover:text-white transition-colors"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
}
