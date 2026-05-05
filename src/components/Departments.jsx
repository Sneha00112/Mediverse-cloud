import React, { useState } from 'react';
import { 
  HeartPulse, Brain, Baby, Bone, Stethoscope, 
  Activity, Smile, Zap, Users, X, ArrowRight
} from 'lucide-react';

const departments = [
  { 
    name: 'Cardiology', 
    desc: 'Heart and cardiovascular care', 
    icon: HeartPulse,
    about: 'Our Cardiology department specializes in diagnosing and treating diseases of the cardiovascular system. We use state-of-the-art technology for heart disease prevention and treatment.'
  },
  { 
    name: 'Neurology', 
    desc: 'Brain and nervous system', 
    icon: Brain,
    about: 'Focused on disorders of the nervous system, including the brain, spinal cord, and peripheral nerves. Our neurologists are experts in stroke, epilepsy, and migraine management.'
  },
  { 
    name: 'Pediatrics', 
    desc: 'Comprehensive care for children', 
    icon: Baby,
    about: 'Dedicated to the physical, emotional, and social health of infants, children, adolescents, and young adults. We provide specialized care from birth through early adulthood.'
  },
  { 
    name: 'Orthopedics', 
    desc: 'Bone, joint, and muscle care', 
    icon: Bone,
    about: 'Expert care for conditions affecting the musculoskeletal system. We specialize in joint replacements, sports medicine, and spinal disorders.'
  },
  { 
    name: 'Dermatology', 
    desc: 'Skin, hair, and nail health', 
    icon: Stethoscope,
    about: 'Treatment for all conditions affecting the skin, hair, and nails. From routine check-ups to advanced skin cancer treatments.'
  },
  { 
    name: 'Oncology', 
    desc: 'Cancer screening and treatment', 
    icon: Activity,
    about: 'Comprehensive cancer care using the latest therapies and multi-disciplinary approaches to ensure the best patient outcomes.'
  },
  { 
    name: 'Gynecology', 
    desc: 'Women’s reproductive health', 
    icon: Users,
    about: 'Specialized healthcare for women, focusing on reproductive health, prenatal care, and postnatal support.'
  },
  { 
    name: 'Radiology', 
    desc: 'Advanced medical imaging', 
    icon: Activity,
    about: 'Utilizing cutting-edge imaging technology like MRI, CT, and Ultrasound to provide accurate diagnoses for all medical conditions.'
  },
  { 
    name: 'ENT', 
    desc: 'Ear, nose, and throat care', 
    icon: Smile,
    about: 'Specialized treatment for disorders of the ear, nose, throat, and related structures of the head and neck.'
  },
  { 
    name: 'Psychiatry', 
    desc: 'Mental health and wellness', 
    icon: Brain,
    about: 'Compassionate mental health services focusing on diagnosis, treatment, and prevention of mental, emotional, and behavioral disorders.'
  },
  { 
    name: 'Dentistry', 
    desc: 'Oral health and surgery', 
    icon: Smile,
    about: 'From preventative care to complex oral surgeries, our dental team ensures optimal oral health and beautiful smiles.'
  },
  { 
    name: 'Emergency Care', 
    desc: '24/7 critical trauma care', 
    icon: Zap,
    about: 'Our emergency department is open 24/7 to provide immediate, life-saving care for acute illnesses and traumatic injuries.'
  },
];

const Departments = ({ onBookClick }) => {
  const [selectedDept, setSelectedDept] = useState(null);

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
                onClick={() => setSelectedDept(dept)}
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                
                <div className="w-14 h-14 bg-soft-blue rounded-xl flex items-center justify-center mb-5 group-hover:bg-teal group-hover:text-white text-teal transition-colors">
                  <Icon size={28} strokeWidth={2} />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-navy">{dept.name}</h3>
                <p className="text-text-gray text-sm mb-5 leading-relaxed">{dept.desc}</p>
                
                <div className="inline-flex items-center text-teal font-medium text-sm">
                  Learn More <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dept Detail Modal */}
      {selectedDept && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-navy/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-in">
            <div className="relative h-48 bg-gradient-to-br from-teal to-blue-600 flex items-center justify-center">
              <button 
                onClick={() => setSelectedDept(null)}
                className="absolute right-6 top-6 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center text-white backdrop-blur-sm">
                <selectedDept.icon size={48} />
              </div>
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-bold text-navy mb-4 font-heading">{selectedDept.name}</h3>
              <p className="text-text-gray leading-relaxed mb-8">
                {selectedDept.about}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    onBookClick(selectedDept.name);
                    setSelectedDept(null);
                  }}
                  className="flex-1 bg-teal text-white py-4 rounded-2xl font-bold hover:bg-[#00a892] transition-all flex items-center justify-center gap-2"
                >
                  Book this Specialty <ArrowRight size={20} />
                </button>
                <button 
                  onClick={() => setSelectedDept(null)}
                  className="flex-1 border-2 border-gray-100 py-4 rounded-2xl font-bold text-navy hover:bg-gray-50 transition-all"
                >
                  Back to Departments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Departments;
