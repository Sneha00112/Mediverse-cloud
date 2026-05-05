import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Departments from './components/Departments';
import FindDoctor from './components/FindDoctor';
import Booking from './components/Booking';
import AuthModal from './components/AuthModal';
import PatientPortal from './components/PatientPortal';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSpecialty, setBookingSpecialty] = useState(null);
  const [user, setUser] = useState(null);

  const handleBookClick = (specialty = null) => {
    setBookingSpecialty(specialty);
    if (!user) {
      setIsAuthOpen(true);
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen font-sans text-text-gray bg-white selection:bg-teal selection:text-white">
      <Navbar onBookClick={() => handleBookClick()} />
      
      <main>
        <Hero onBookClick={() => handleBookClick()} />
        <Departments onBookClick={handleBookClick} />
        <FindDoctor onBookClick={() => handleBookClick()} />
        <WhyChooseUs />
        <PatientPortal />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onSuccess={handleAuthSuccess} 
      />
      
      <Booking 
        isOpen={isBookingOpen} 
        onClose={() => { setIsBookingOpen(false); setBookingSpecialty(null); }} 
        initialSpecialty={bookingSpecialty}
        user={user}
      />
    </div>
  );
}

export default App;
