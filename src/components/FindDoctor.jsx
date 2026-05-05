import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const allDoctors = [
  { id: 1, name: 'Dr. Sarah Jenkins', title: 'Chief of Cardiology', specialty: 'Cardiologist', rating: 4.9, reviews: 342, status: 'Available', imgBg: 'bg-blue-100', color: 'text-blue-600' },
  { id: 2, name: 'Dr. Michael Chen', title: 'Senior Neurologist', specialty: 'Neurologist', rating: 4.8, reviews: 189, status: 'Busy', imgBg: 'bg-purple-100', color: 'text-purple-600' },
  { id: 3, name: 'Dr. Emily Carter', title: 'Lead Pediatrician', specialty: 'Pediatrician', rating: 5.0, reviews: 421, status: 'Available', imgBg: 'bg-pink-100', color: 'text-pink-600' },
  { id: 4, name: 'Dr. James Wilson', title: 'Orthopedic Surgeon', specialty: 'Surgeon', rating: 4.7, reviews: 256, status: 'Available', imgBg: 'bg-green-100', color: 'text-green-600' },
  { id: 5, name: 'Dr. Olivia Martinez', title: 'Cardiovascular Specialist', specialty: 'Cardiologist', rating: 4.9, reviews: 205, status: 'Busy', imgBg: 'bg-indigo-100', color: 'text-indigo-600' },
  { id: 6, name: 'Dr. Robert Taylor', title: 'General Surgeon', specialty: 'Surgeon', rating: 4.6, reviews: 145, status: 'Available', imgBg: 'bg-yellow-100', color: 'text-yellow-600' }
];

const tabs = ['All', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Surgeon'];

const FindDoctor = ({ onBookClick }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState(allDoctors);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (activeTab === 'All') setDoctors(allDoctors);
      else setDoctors(allDoctors.filter(d => d.specialty === activeTab));
      setLoading(false);
    }, 400); 
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section id="doctors" className="section-padding bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-navy">Meet Our Expert Doctors</h2>
            <p className="text-lg text-text-gray max-w-xl">
              Our team of board-certified specialists are dedicated to providing you with the highest quality of care.
            </p>
          </div>
          <button onClick={() => onBookClick()} className="hidden md:inline-flex items-center text-teal font-medium hover:underline mt-4 md:mt-0">
            View All Doctors <span className="ml-1">→</span>
          </button>
        </div>

        <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                activeTab === tab ? 'bg-navy text-white shadow-md' : 'bg-white text-text-gray hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
              </div>
            ))
          ) : (
            doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in-up">
                <div className="flex items-start gap-5 mb-6">
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-full ${doctor.imgBg} flex items-center justify-center text-2xl font-bold ${doctor.color}`}>
                      {doctor.name.split(' ')[1][0]}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      doctor.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-navy leading-tight">{doctor.name}</h3>
                    </div>
                    <p className="text-teal font-medium text-sm mb-1">{doctor.specialty}</p>
                    <p className="text-text-gray text-xs mb-3">{doctor.title}</p>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-navy text-sm">{doctor.rating}</span>
                      <span className="text-text-gray text-xs">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => onBookClick()} className="flex-1 bg-white border border-teal text-teal hover:bg-teal hover:text-white py-2.5 rounded-xl font-medium text-center transition-colors text-sm">
                    Book Now
                  </button>
                  <button className="flex-1 bg-light-gray text-navy hover:bg-gray-200 py-2.5 rounded-xl font-medium transition-colors text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FindDoctor;
