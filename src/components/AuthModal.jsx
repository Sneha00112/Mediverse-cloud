import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [tab, setTab] = useState('new'); // 'new' | 'returning'
  const [formData, setFormData] = useState({
    fullName: '', dob: '', gender: '', email: '', phone: '',
    password: '', confirmPassword: '', insurance: '',
    emergencyName: '', emergencyPhone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordStrength = (pass) => {
    if (pass.length === 0) return 0;
    if (pass.length < 6) return 1; // weak
    if (pass.length < 8) return 2; // medium
    return 3; // strong
  };

  const handleNewSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = true;
    if (!formData.dob) newErrors.dob = true;
    if (!formData.gender) newErrors.gender = true;
    if (!formData.email || !validateEmail(formData.email)) newErrors.email = true;
    if (!formData.phone || formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = true;
    if (formData.password.length < 8) newErrors.password = true;
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = true;
    if (!formData.emergencyName) newErrors.emergencyName = true;
    if (!formData.emergencyPhone) newErrors.emergencyPhone = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess(formData);
      }, 1500);
    }
  };

  const handleReturningSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = true;
    if (!formData.password) newErrors.password = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.email.includes('@') && formData.password.length >= 6) {
      setErrors({});
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess(formData);
      }, 1500);
    } else {
      setErrors({ auth: 'Invalid credentials. Please try again.' });
    }
  };

  const passStrength = getPasswordStrength(formData.password);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-navy mb-2">
              {tab === 'new' ? 'Account Created!' : 'Welcome Back!'}
            </h3>
            <p className="text-text-gray">Taking you to booking...</p>
          </div>
        ) : (
          <>
            <div className="flex border-b border-gray-100 shrink-0 relative">
              <button 
                className={`flex-1 py-5 font-medium text-center transition-all ${tab === 'new' ? 'text-teal border-b-2 border-teal' : 'text-text-gray hover:bg-gray-50'}`}
                onClick={() => setTab('new')}
              >
                New Patient
              </button>
              <button 
                className={`flex-1 py-5 font-medium text-center transition-all ${tab === 'returning' ? 'text-teal border-b-2 border-teal' : 'text-text-gray hover:bg-gray-50'}`}
                onClick={() => setTab('returning')}
              >
                Returning Patient
              </button>
              <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy p-2">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              
              {tab === 'new' && (
                <form onSubmit={handleNewSubmit} className="space-y-4 animate-fade-in-up">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className={`w-full p-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Email Address</label>
                      <input 
                        type="email" 
                        className={`w-full p-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Date of Birth</label>
                      <input 
                        type="date" 
                        className={`w-full p-3 rounded-xl border ${errors.dob ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Gender</label>
                      <select 
                        className={`w-full p-3 rounded-xl border ${errors.gender ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="">Select</option>
                        <option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      className={`w-full p-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="10-digit number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Password</label>
                      <input 
                        type="password" 
                        className={`w-full p-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                      <div className="flex gap-1 mt-2">
                        <div className={`h-1 flex-1 rounded-full ${passStrength >= 1 ? 'bg-red-400' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${passStrength >= 2 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${passStrength >= 3 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1 flex justify-between">
                        Confirm Password
                        {formData.confirmPassword && (
                          <span className={formData.password === formData.confirmPassword ? 'text-green-500' : 'text-red-500'}>
                            {formData.password === formData.confirmPassword ? '✓' : '✗'}
                          </span>
                        )}
                      </label>
                      <input 
                        type="password" 
                        className={`w-full p-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Emergency Contact</label>
                      <input 
                        type="text" 
                        className={`w-full p-3 rounded-xl border ${errors.emergencyName ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                        value={formData.emergencyName}
                        onChange={(e) => setFormData({...formData, emergencyName: e.target.value})}
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Emergency Phone</label>
                      <input 
                        type="tel" 
                        className={`w-full p-3 rounded-xl border ${errors.emergencyPhone ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Insurance Provider (Optional)</label>
                    <select 
                      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50"
                      value={formData.insurance}
                      onChange={(e) => setFormData({...formData, insurance: e.target.value})}
                    >
                      <option value="">None / Self-pay</option>
                      <option>Blue Cross Blue Shield</option>
                      <option>Aetna</option>
                      <option>Cigna</option>
                      <option>UnitedHealthcare</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-teal text-white py-4 rounded-xl font-medium hover:bg-[#00a892] shadow-md mt-6">
                    Create Account & Continue
                  </button>
                  <p className="text-center text-sm text-text-gray mt-4">
                    Already registered? <button type="button" onClick={() => setTab('returning')} className="text-teal font-medium hover:underline">Switch to Login →</button>
                  </p>
                </form>
              )}

              {tab === 'returning' && (
                <form onSubmit={handleReturningSubmit} className="space-y-5 animate-fade-in-up">
                  {errors.auth && <div className="p-3 bg-red-50 text-red-500 border border-red-200 rounded-xl text-sm text-center">{errors.auth}</div>}
                  
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className={`w-full p-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="block text-sm font-medium text-navy">Password</label>
                      <button type="button" className="text-sm text-teal hover:underline" onClick={() => alert('Check your email for reset link!')}>Forgot Password?</button>
                    </div>
                    <input 
                      type="password" 
                      className={`w-full p-4 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} bg-gray-50`}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>

                  <button type="submit" className="w-full bg-teal text-white py-4 rounded-xl font-medium hover:bg-[#00a892] shadow-md mt-6">
                    Sign In & Continue
                  </button>
                  <p className="text-center text-sm text-text-gray mt-4">
                    New patient? <button type="button" onClick={() => setTab('new')} className="text-teal font-medium hover:underline">Register here →</button>
                  </p>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
