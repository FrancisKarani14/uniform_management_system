import { useState, useEffect } from 'react';
import '../App.css';

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
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-text">uniformhub</span>
        </div>
        <div className="nav-buttons">
          <button className="btn-signin">Sign In</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="carousel">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Simplify School Uniform Management</h1>
            <p>
              Connect parents, tailors, and schools in one seamless platform.
              Streamline uniform applications, approvals, and delivery with UniformHub.
            </p>
            <button className="btn-cta">Get Started</button>
          </div>
        </div>
      </section>
    </div>
  );
}
