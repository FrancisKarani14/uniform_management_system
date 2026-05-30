import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaGraduationCap, FaSchool, FaCut, FaUserFriends, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const slides = [
  { image: '/images/issue.png', label: 'Seamless Uniform Management' },
  { image: '/images/students.png', label: 'Students Ready for School' },
  { image: '/images/Tailor.png', label: 'Skilled Tailors at Work' },
];

const steps = [
  {
    icon: <FaUserFriends className="text-3xl text-blue-600" />,
    step: '01',
    title: 'Parents Register & Apply',
    desc: 'Create an account, add your children, browse schools and submit enrollment applications.',
  },
  {
    icon: <FaSchool className="text-3xl text-green-600" />,
    step: '02',
    title: 'School Admin Reviews',
    desc: 'School administrators review applications, approve enrollments and manage uniform orders.',
  },
  {
    icon: <FaCut className="text-3xl text-purple-600" />,
    step: '03',
    title: 'Tailor Gets Assigned',
    desc: 'Approved orders are assigned to vetted tailors who update progress in real time.',
  },
  {
    icon: <FaCheckCircle className="text-3xl text-orange-500" />,
    step: '04',
    title: 'Uniform Delivered',
    desc: 'Parents track progress from started to complete and receive the finished uniform.',
  },
];

const roles = [
  {
    icon: <FaUserFriends className="text-4xl text-blue-600" />,
    title: 'For Parents',
    color: 'border-blue-500',
    bg: 'bg-blue-50',
    points: [
      'Add and manage your children',
      'Apply to schools with one click',
      'Submit uniform measurements',
      'Track tailor progress live',
    ],
  },
  {
    icon: <FaSchool className="text-4xl text-green-600" />,
    title: 'For School Admins',
    color: 'border-green-500',
    bg: 'bg-green-50',
    points: [
      'Manage parent applications',
      'Approve or reject enrollments',
      'Assign tailors to orders',
      'Monitor all uniform statuses',
    ],
  },
  {
    icon: <FaCut className="text-4xl text-purple-600" />,
    title: 'For Tailors',
    color: 'border-purple-500',
    bg: 'bg-purple-50',
    points: [
      'Apply to partner with schools',
      'Receive uniform assignments',
      'View all measurements clearly',
      'Update progress in real time',
    ],
  },
];

const stats = [
  { value: '100%', label: 'Digital Process' },
  { value: '3', label: 'User Roles Supported' },
  { value: '5', label: 'Progress Stages Tracked' },
  { value: '1', label: 'Platform for All' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center px-6 md:px-20 pt-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-blue-600/20 border border-blue-400/40 text-blue-300 text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
              School Uniform Management Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Simplify School<br />
              <span className="text-blue-400">Uniform Management</span>
            </h1>
            <p className="hidden md:block text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              Connect parents, tailors, and schools in one seamless platform.
              Streamline uniform applications, approvals, and delivery with UniformHub.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
              >
                Get Started <AiOutlineArrowRight className="text-lg" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentSlide ? 'w-8 bg-blue-400' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-blue-700 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">How UniformHub Works</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              A simple four-step process that connects every stakeholder in the uniform journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className="absolute top-4 right-4 text-5xl font-black text-gray-100">{step.step}</span>
                <div className="mb-4">{step.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <FaArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Who It's For</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Built for Everyone</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Whether you're a parent, school administrator, or tailor — UniformHub has you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 border-t-4 ${role.color} ${role.bg} hover:shadow-lg transition-shadow`}
              >
                <div className="mb-5">{role.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{role.title}</h3>
                <ul className="space-y-3">
                  {role.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-600 text-sm">
                      <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-700 to-blue-900">
        <div className="max-w-3xl mx-auto text-center">
          <FaGraduationCap className="text-5xl text-blue-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Join UniformHub today and bring order to the uniform process at your school.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5"
            >
              Create Account <AiOutlineArrowRight className="text-lg" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3.5 border-2 border-white/40 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
