import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['/images/issue.png', '/images/students.png', '/images/Tailor.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute w-full h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute w-full h-full bg-cover  bg-[center_20%] transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="absolute w-full h-full bg-white/25"></div>
        <div className="absolute w-full h-full flex items-center px-16 pt-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900">
              Simplify School Uniform Management
            </h1>
            <p className="text-xl leading-relaxed mb-8 text-black font-semibold">
              Connect parents, tailors, and schools in one seamless platform.
              Streamline uniform applications, approvals, and delivery with UniformHub.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-blue-700 text-white rounded-lg text-lg font-semibold hover:bg-blue-800 hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/40"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
