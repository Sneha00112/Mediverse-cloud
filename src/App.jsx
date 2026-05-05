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
  const [view, setView] = useState('landing'); // 'landing' or 'portal'
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Sarah Jenkins', specialty: 'Cardiology', date: '2024-05-15', time: '10:00 AM', status: 'Upcoming' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Neurology', date: '2024-04-10', time: '02:30 PM', status: 'Completed' },
    { id: 3, doctor: 'Dr. Emily Carter', specialty: 'Dermatology', date: '2024-05-20', time: '11:15 AM', status: 'Upcoming' }
  ]);

  const handleBookClick = (specialty = null) => {
    setBookingSpecialty(specialty);
    if (!user) {
      setIsAuthOpen(true);
    } else {
      setIsBookingOpen(true);
    }
  };

  const handleBookingSuccess = (newApp) => {
    const appointment = {
      id: Date.now(),
      doctor: newApp.doctor?.name || 'Dr. Specialist',
      specialty: newApp.specialty,
      date: newApp.date,
      time: newApp.time,
      status: 'Upcoming'
    };
    setAppointments(prev => [appointment, ...prev]);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    setView('portal');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen font-sans text-text-gray bg-white selection:bg-teal selection:text-white">
      <Navbar 
        user={user} 
        onAuthClick={() => user ? setView('portal') : setIsAuthOpen(true)}
        onLogout={handleLogout}
        onBookClick={() => handleBookClick()}
        view={view}
        setView={setView}
      />
      
      <main>
        {view === 'landing' ? (
          <>
            <Hero onBookClick={() => handleBookClick()} />
            <Departments onBookClick={handleBookClick} />
            <FindDoctor onBookClick={() => handleBookClick()} />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
          </>
        ) : (
          <PatientPortal 
            user={user} 
            appointments={appointments}
            onBookClick={() => handleBookClick()} 
          />
        )}
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
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}

export default App;
