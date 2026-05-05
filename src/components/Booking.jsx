import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle, Calendar as CalendarIcon, Clock, User, 
  MapPin, HeartPulse, Brain, Baby, Bone, Stethoscope, 
  Activity, Smile, Zap, ArrowRight, Video, Users 
} from 'lucide-react';

const specialties = [
  { name: 'Cardiology', icon: HeartPulse }, { name: 'Neurology', icon: Brain },
  { name: 'Pediatrics', icon: Baby }, { name: 'Orthopedics', icon: Bone },
  { name: 'Dermatology', icon: Stethoscope }, { name: 'Oncology', icon: Activity },
  { name: 'Gynecology', icon: Users }, { name: 'Radiology', icon: Activity },
  { name: 'ENT', icon: Smile }, { name: 'Psychiatry', icon: Brain },
  { name: 'Dentistry', icon: Smile }, { name: 'Emergency Care', icon: Zap }
];

const doctorsByDept = {
  'Cardiology': [{ id: 1, name: 'Dr. Sarah Jenkins', title: 'Chief of Cardiology', rating: 4.9, exp: '15 Yrs', nextSlot: 'Tomorrow, 10:00 AM' }],
  'Neurology': [{ id: 2, name: 'Dr. Michael Chen', title: 'Senior Neurologist', rating: 4.8, exp: '12 Yrs', nextSlot: 'Today, 3:00 PM' }],
  // Default fallback for others to keep it brief
};

const defaultDoctors = [
  { id: 10, name: 'Dr. Emily Carter', title: 'Specialist', rating: 5.0, exp: '10 Yrs', nextSlot: 'Tomorrow, 9:00 AM' },
  { id: 11, name: 'Dr. James Wilson', title: 'Lead Physician', rating: 4.7, exp: '8 Yrs', nextSlot: 'Mon, 2:00 PM' }
];

const timeGroups = {
  'Morning': ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
  'Afternoon': ['01:00 PM', '01:30 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
  'Evening': ['06:00 PM', '06:30 PM', '07:00 PM']
};

const Booking = ({ isOpen, onClose, initialSpecialty, user, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState('forward');
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    specialty: initialSpecialty || '',
    doctor: null,
    date: '',
    time: '',
    reason: '',
    visitType: 'In-Person',
    notes: '',
    insurance: user?.insurance || ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialSpecialty) setFormData(prev => ({ ...prev, specialty: initialSpecialty }));
    if (user) {
      setFormData(prev => ({ 
        ...prev, 
        fullName: prev.fullName || user.fullName || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [initialSpecialty, user]);

  if (!isOpen) return null;

  const handleNext = () => {
    const newErrors = {};
    if (step === 1 && !formData.specialty) return;
    if (step === 2 && !formData.doctor) return;
    if (step === 3 && (!formData.date || !formData.time)) return;
    if (step === 4) {
      if (!formData.fullName.trim()) newErrors.fullName = true;
      if (!formData.email.trim()) newErrors.email = true;
      if (!formData.reason.trim()) newErrors.reason = true;
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      if (onSuccess) onSuccess(formData);
      setShowSuccess(true);
      return;
    }
    setDirection('forward');
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setDirection('back');
    setStep(s => s - 1);
  };

  const generateDays = () => {
    return Array.from({ length: 14 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  // Helper for transitions
  const stepClass = direction === 'forward' ? 'animate-[slideInRight_350ms_ease-in-out_forwards]' : 'animate-[slideInLeft_350ms_ease-in-out_forwards]';

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-[100] bg-white overflow-y-auto flex flex-col items-center justify-center p-6 animate-fade-in-up">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Confetti simulation */}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              top: '50%',
              backgroundColor: ['#00BFA6', '#0A1628', '#E8F0FE', '#F59E0B'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 0.5}s`
            }}></div>
          ))}
        </div>
        <div className="text-center max-w-md w-full relative z-10">
          <svg className="w-32 h-32 mx-auto text-green-500 mb-6" viewBox="0 0 52 52">
            <circle className="checkmark-draw" cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="160" strokeDashoffset="160" style={{animation: 'draw 0.6s ease-out forwards'}}/>
            <path className="checkmark-draw" fill="none" stroke="currentColor" strokeWidth="4" d="M14.1 27.2l7.1 7.2 16.7-16.8" style={{animationDelay: '0.4s', animation: 'draw 0.6s ease-out forwards'}}/>
          </svg>
          <h2 className="text-4xl font-bold text-navy mb-2 font-heading">Appointment Confirmed!</h2>
          <p className="text-lg text-text-gray mb-8">Booking ID: #MV-{Math.floor(100000 + Math.random() * 900000)}</p>
          
          <div className="bg-light-gray rounded-2xl p-6 mb-8 text-left space-y-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <User size={20} className="text-teal" />
              <div><p className="text-xs text-gray-500">Doctor</p><p className="font-bold text-navy">{formData.doctor?.name}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <CalendarIcon size={20} className="text-teal" />
              <div><p className="text-xs text-gray-500">Date & Time</p><p className="font-bold text-navy">{new Date(formData.date).toLocaleDateString()} at {formData.time}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <Activity size={20} className="text-teal" />
              <div><p className="text-xs text-gray-500">Specialty</p><p className="font-bold text-navy">{formData.specialty}</p></div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-white border border-teal text-teal py-3.5 rounded-xl font-bold hover:bg-teal hover:text-white transition-colors">Add to Calendar</button>
            <button onClick={() => { setShowSuccess(false); onClose(); }} className="flex-1 bg-navy text-white py-3.5 rounded-xl font-bold hover:bg-navy/90 transition-colors">Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 overflow-y-auto flex flex-col animate-fade-in-up">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy font-heading">Book Appointment</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-navy transition-colors"><X size={20} /></button>
        </div>
        {/* Progress */}
        <div className="container mx-auto mt-6 hidden md:flex items-center justify-between max-w-4xl relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
          <div className="absolute top-1/2 left-0 h-1 bg-teal -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          {['Choose Service', 'Pick a Doctor', 'Date & Time', 'Confirm Details'].map((label, i) => {
            const num = i + 1;
            const active = step >= num;
            const current = step === num;
            return (
              <div key={label} className={`flex flex-col items-center ${active ? 'text-teal' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${current ? 'bg-teal text-white ring-4 ring-teal/20' : active ? 'bg-teal text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {active && !current ? <CheckCircle size={16} /> : num}
                </div>
                <span className={`text-xs font-bold ${current ? 'text-navy' : ''}`}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Body container with overflow hidden for sliding */}
      <div className="flex-1 overflow-hidden relative container mx-auto max-w-4xl p-6 mt-6">
        
        {step === 1 && (
          <div key="step1" className={`h-full ${stepClass}`}>
            <h3 className="text-2xl font-bold text-navy mb-6 font-heading">Select a Specialty</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {specialties.map(spec => {
                const Icon = spec.icon;
                const isSelected = formData.specialty === spec.name;
                return (
                  <button 
                    key={spec.name}
                    onClick={() => setFormData({...formData, specialty: spec.name, doctor: null})}
                    className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${isSelected ? 'bg-teal/5 border-2 border-teal shadow-md scale-105' : 'bg-white border-2 border-gray-100 hover:border-teal/50 hover:shadow-sm'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isSelected ? 'bg-teal text-white' : 'bg-gray-100 text-navy'}`}>
                      <Icon size={24} />
                    </div>
                    <span className={`font-bold ${isSelected ? 'text-teal' : 'text-navy'}`}>{spec.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div key="step2" className={`h-full ${stepClass}`}>
            <h3 className="text-2xl font-bold text-navy mb-6 font-heading">Pick a Doctor for {formData.specialty}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(doctorsByDept[formData.specialty] || defaultDoctors).map(doc => {
                const isSelected = formData.doctor?.id === doc.id;
                return (
                  <div 
                    key={doc.id}
                    onClick={() => setFormData({...formData, doctor: doc})}
                    className={`p-5 rounded-2xl border-2 flex gap-4 cursor-pointer transition-all ${isSelected ? 'border-teal bg-teal/5 shadow-md' : 'border-gray-100 bg-white hover:border-teal/30'}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-soft-blue to-teal text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-inner">
                      {doc.name.split(' ')[1][0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-navy">{doc.name}</h4>
                        {isSelected && <CheckCircle className="text-teal" size={20} />}
                      </div>
                      <p className="text-sm text-text-gray mb-2">{doc.title} • {doc.exp}</p>
                      <div className="flex items-center gap-3 text-xs font-bold">
                        <span className="flex items-center text-yellow-500"><span className="mr-1">★</span>{doc.rating}</span>
                        <span className="text-teal bg-teal/10 px-2 py-0.5 rounded-full">Next: {doc.nextSlot}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div key="step3" className={`h-full ${stepClass}`}>
            <h3 className="text-2xl font-bold text-navy mb-6 font-heading">Select Date & Time</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-navy">Current Month</h4>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-navy">&lt;</button>
                    <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-navy">&gt;</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-gray-400">
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for padding */}
                  {[...Array(new Date().getDay())].map((_, i) => <div key={`empty-${i}`}></div>)}
                  {generateDays().map((d, i) => {
                    const dateStr = d.toISOString().split('T')[0];
                    const isSelected = formData.date === dateStr;
                    return (
                      <button
                        key={i}
                        onClick={() => setFormData({...formData, date: dateStr, time: ''})}
                        className={`w-full aspect-square rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isSelected ? 'bg-teal text-white shadow-md scale-110' : 'hover:bg-gray-100 text-navy'}`}
                      >
                        {d.getDate()}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-navy mb-6 opacity-0">Time</h4>
                {!formData.date ? (
                  <div className="h-full flex items-center justify-center text-text-gray pb-12">
                    Please select a date first
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(timeGroups).map(([group, slots]) => (
                      <div key={group}>
                        <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                          {group === 'Morning' ? '🌅' : group === 'Afternoon' ? '☀️' : '🌙'} {group}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {slots.map(slot => {
                            const isSelected = formData.time === slot;
                            const isBooked = Math.random() > 0.8; // mock booked slots
                            return (
                              <button
                                key={slot}
                                disabled={isBooked}
                                onClick={() => setFormData({...formData, time: slot})}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${isBooked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : isSelected ? 'bg-teal text-white shadow-md' : 'bg-white border border-gray-200 text-navy hover:border-teal'}`}
                              >
                                {isBooked ? 'Booked' : slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div key="step4" className={`h-full ${stepClass}`}>
            <h3 className="text-2xl font-bold text-navy mb-6 font-heading">Confirm Details</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-navy mb-4 border-b border-gray-100 pb-2">Summary</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-start">
                      <div><p className="text-gray-500 text-xs">Specialty</p><p className="font-bold text-navy">{formData.specialty}</p></div>
                      <button onClick={() => setStep(1)} className="text-teal hover:underline text-xs">Edit</button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div><p className="text-gray-500 text-xs">Doctor</p><p className="font-bold text-navy">{formData.doctor?.name}</p></div>
                      <button onClick={() => setStep(2)} className="text-teal hover:underline text-xs">Edit</button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div><p className="text-gray-500 text-xs">Date & Time</p><p className="font-bold text-navy">{formData.date} at {formData.time}</p></div>
                      <button onClick={() => setStep(3)} className="text-teal hover:underline text-xs">Edit</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-navy mb-6 border-b border-gray-100 pb-2">Patient Details</h4>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.fullName} 
                        onChange={(e) => { setFormData({...formData, fullName: e.target.value}); setErrors({...errors, fullName: null}); }}
                        placeholder="" 
                        className={`w-full p-3 rounded-xl bg-gray-50 text-navy border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all`}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">Full name is required.</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy mb-1">Email</label>
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => { setFormData({...formData, email: e.target.value}); setErrors({...errors, email: null}); }}
                        placeholder="" 
                        className={`w-full p-3 rounded-xl bg-gray-50 text-navy border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-navy mb-2">Visit Type</label>
                    <div className="flex gap-4">
                      <button onClick={() => setFormData({...formData, visitType: 'In-Person'})} className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${formData.visitType === 'In-Person' ? 'border-teal bg-teal/5 text-teal' : 'border-gray-200 text-gray-500'}`}>
                        <MapPin size={18} /> In-Person
                      </button>
                      <button onClick={() => setFormData({...formData, visitType: 'Video'})} className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all ${formData.visitType === 'Video' ? 'border-teal bg-teal/5 text-teal' : 'border-gray-200 text-gray-500'}`}>
                        <Video size={18} /> Video Consult
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy mb-1">Reason for Visit *</label>
                    <textarea 
                      className={`w-full p-3 rounded-xl border ${errors.reason ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:bg-white`}
                      rows="3"
                      placeholder="Briefly describe your symptoms..."
                      value={formData.reason}
                      onChange={(e) => { setFormData({...formData, reason: e.target.value}); setErrors({...errors, reason: null}); }}
                    ></textarea>
                    {errors.reason && <p className="text-red-500 text-xs mt-1">This field is required.</p>}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 z-20">
        <div className="container mx-auto max-w-4xl flex justify-between">
          {step > 1 ? (
            <button onClick={handleBack} className="px-6 py-3 rounded-full font-bold text-navy bg-gray-100 hover:bg-gray-200 transition-colors">
              ← Back
            </button>
          ) : <div></div>}
          
          <button 
            onClick={handleNext} 
            disabled={(step===1 && !formData.specialty) || (step===2 && !formData.doctor) || (step===3 && (!formData.date || !formData.time))}
            className="px-8 py-3 rounded-full font-bold text-white bg-teal hover:bg-[#00a892] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-2"
          >
            {step === 4 ? 'Confirm Booking' : 'Next Step'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
