import React, { useState, useEffect } from 'react';
import { Activity, Menu, X } from 'lucide-react';

const Navbar = ({ user, onAuthClick, onLogout, onBookClick, view, setView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Departments', 'Doctors', 'Testimonials', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || view === 'portal' ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setView('landing'); window.scrollTo(0,0); }}>
          <div className="bg-teal p-2 rounded-lg text-white">
            <Activity size={24} strokeWidth={2.5} />
          </div>
          <span className={`font-heading text-2xl font-bold transition-colors ${isScrolled || view === 'portal' ? 'text-navy' : 'text-white'}`}>
            MediVerse
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={view === 'landing' ? `#${link.toLowerCase().replace(' ', '-')}` : '#'} 
              onClick={(e) => {
                if (view !== 'landing') {
                  e.preventDefault();
                  setView('landing');
                  // small delay to let state update and section render
                  setTimeout(() => {
                    const el = document.getElementById(link.toLowerCase().replace(' ', '-'));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className={`font-medium transition-colors text-sm uppercase tracking-wide ${isScrolled || view === 'portal' ? 'text-navy hover:text-teal' : 'text-white hover:text-teal'}`}
            >
              {link}
            </a>
          ))}
          
          <div className="flex items-center gap-4 border-l border-gray-200 pl-8 ml-2">
            {!user ? (
              <button 
                onClick={onAuthClick}
                className="bg-teal text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#00a892] transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Register / Login
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setView(view === 'portal' ? 'landing' : 'portal')}
                  className={`${view === 'portal' ? 'text-teal' : 'text-navy'} font-bold text-sm uppercase hover:text-teal transition-colors`}
                >
                  {view === 'portal' ? 'Back to Site' : 'Dashboard'}
                </button>
                <button 
                  onClick={onLogout}
                  className="bg-navy text-white px-6 py-2.5 rounded-full font-medium hover:bg-navy/90 transition-colors shadow-md"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled || view === 'portal' ? 'text-navy' : 'text-white'}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-6 flex flex-col space-y-4 transition-all duration-300 origin-top ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        {navLinks.map((link) => (
          <a 
            key={link} 
            href={`#${link.toLowerCase().replace(' ', '-')}`} 
            className="text-navy font-medium text-lg border-b border-gray-50 pb-2" 
            onClick={() => { setMobileMenuOpen(false); setView('landing'); }}
          >
            {link}
          </a>
        ))}
        {!user ? (
          <button 
            onClick={() => { setMobileMenuOpen(false); onAuthClick(); }}
            className="bg-teal text-white px-6 py-3 rounded-full font-medium text-center shadow-md mt-4"
          >
            Register / Login
          </button>
        ) : (
          <>
            <button 
              onClick={() => { setMobileMenuOpen(false); setView('portal'); }}
              className="bg-teal text-white px-6 py-3 rounded-full font-medium text-center shadow-md mt-4"
            >
              Dashboard
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onLogout(); }}
              className="bg-navy text-white px-6 py-3 rounded-full font-medium text-center shadow-md"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
