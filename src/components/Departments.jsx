import React from 'react';
import { 
  HeartPulse, Brain, Baby, Bone, Stethoscope, 
  Activity, Smile, Zap, Users
} from 'lucide-react';

const departments = [
  { name: 'Cardiology', desc: 'Heart and cardiovascular care', icon: HeartPulse },
  { name: 'Neurology', desc: 'Brain and nervous system', icon: Brain },
  { name: 'Pediatrics', desc: 'Comprehensive care for children', icon: Baby },
  { name: 'Orthopedics', desc: 'Bone, joint, and muscle care', icon: Bone },
  { name: 'Dermatology', desc: 'Skin, hair, and nail health', icon: Stethoscope },
  { name: 'Oncology', desc: 'Cancer screening and treatment', icon: Activity },
  { name: 'Gynecology', desc: 'Women’s reproductive health', icon: Users },
  { name: 'Radiology', desc: 'Advanced medical imaging', icon: Activity },
  { name: 'ENT', desc: 'Ear, nose, and throat care', icon: Smile },
  { name: 'Psychiatry', desc: 'Mental health and wellness', icon: Brain },
  { name: 'Dentistry', desc: 'Oral health and surgery', icon: Smile },
  { name: 'Emergency Care', desc: '24/7 critical trauma care', icon: Zap },
];

const Departments = ({ onBookClick }) => {
  return (
    <section id="departments" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-navy">Our Medical Specialties</h2>
          <p className="text-lg text-text-gray max-w-2xl mx-auto">
            Comprehensive healthcare services tailored to your needs, delivered by industry-leading specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                
                <div className="w-14 h-14 bg-soft-blue rounded-xl flex items-center justify-center mb-5 group-hover:bg-teal group-hover:text-white text-teal transition-colors">
                  <Icon size={28} strokeWidth={2} />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-navy">{dept.name}</h3>
                <p className="text-text-gray text-sm mb-5 leading-relaxed">{dept.desc}</p>
                
                <button 
                  onClick={() => onBookClick(dept.name)}
                  className="inline-flex items-center text-teal font-medium text-sm hover:underline"
                >
                  Book this Specialty <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Departments;
