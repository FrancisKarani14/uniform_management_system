import { useState, useEffect } from 'react';

export default function LandingPage() {
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
      {/* Navigation */}
      <nav className="flex justify-between items-center px-16 py-6 bg-white shadow-md relative z-10">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-700">uniformhub</span>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-white text-blue-700 border-2 border-blue-700 rounded-md font-medium hover:bg-blue-50 transition-all">
            Sign In
          </button>
          <button className="px-6 py-2.5 bg-blue-700 text-white rounded-md font-medium hover:bg-blue-800 transition-all">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] overflow-hidden">
        <div className="absolute w-full h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="absolute w-full h-full bg-gradient-to-r from-white/95 via-white/70 to-transparent flex items-center px-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900">
              Simplify School Uniform Management
            </h1>
            <p className="text-xl leading-relaxed mb-8 text-gray-600">
              Connect parents, tailors, and schools in one seamless platform.
              Streamline uniform applications, approvals, and delivery with UniformHub.
            </p>
            <button className="px-10 py-4 bg-blue-700 text-white rounded-lg text-lg font-semibold hover:bg-blue-800 hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/40">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
