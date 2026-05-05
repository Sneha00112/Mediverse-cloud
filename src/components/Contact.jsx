import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = true;
    if (!formData.lastName) newErrors.lastName = true;
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.phone) newErrors.phone = true;
    if (!formData.message) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      }, 3000);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-navy">Get in Touch</h2>
          <p className="text-lg text-text-gray max-w-2xl mx-auto">
            Have a question or need assistance? We are here to help. Reach out to our support team.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-card border border-gray-100 relative">
              {isSuccess ? (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl animate-fade-in-up">
                  <CheckCircle size={60} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-navy mb-2 font-heading">Message Sent!</h3>
                  <p className="text-text-gray">We'll get back to you shortly.</p>
                </div>
              ) : null}

              <h3 className="text-2xl font-bold text-navy mb-6 font-heading">Send a Message</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">First Name</label>
                    <input type="text" className={`w-full p-3.5 rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} bg-gray-50`} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Last Name</label>
                    <input type="text" className={`w-full p-3.5 rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} bg-gray-50`} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Email</label>
                    <input type="email" className={`w-full p-3.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50`} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Phone</label>
                    <input type="tel" className={`w-full p-3.5 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} bg-gray-50`} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Subject</label>
                  <select className="w-full p-3.5 rounded-xl border border-gray-200 bg-gray-50" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                    <option>General Inquiry</option><option>Appointments</option><option>Billing Support</option><option>Medical Records</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Message</label>
                  <textarea rows="4" className={`w-full p-3.5 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} bg-gray-50`} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                
                <button type="submit" className="w-full bg-teal text-white py-4 rounded-xl font-medium shadow-md flex items-center justify-center gap-2">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Info & Map */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="w-full h-64 bg-light-gray rounded-3xl border border-gray-200 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0A1628_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="text-center relative z-10 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm inline-block">
                <MapPin size={32} className="text-teal mx-auto mb-2" />
                <p className="font-bold text-navy">View on Google Maps</p>
                <p className="text-sm text-text-gray">123 Health Ave, Medical District</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-light-gray p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal shrink-0"><Phone size={24} /></div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Phone</h4>
                  <p className="text-sm text-text-gray mb-1">Emergency: 911</p>
                  <p className="text-sm font-medium text-navy">+1 (800) 123-4567</p>
                </div>
              </div>

              <div className="bg-light-gray p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-teal shrink-0"><Mail size={24} /></div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Email</h4>
                  <p className="text-sm text-text-gray mb-1">Support & Inquiries</p>
                  <p className="text-sm font-medium text-navy">contact@mediverse.app</p>
                </div>
              </div>
            </div>

            <div className="bg-navy text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/20 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Clock className="text-teal" size={28} />
                <h3 className="text-2xl font-bold font-heading">Working Hours</h3>
              </div>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center border-b border-white/10 pb-3"><span className="text-white/80">Monday – Friday</span><span className="font-medium">8:00 AM – 8:00 PM</span></div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3"><span className="text-white/80">Saturday</span><span className="font-medium">9:00 AM – 5:00 PM</span></div>
                <div className="flex justify-between items-center"><span className="text-white/80">Sunday</span><span className="text-red-400 font-medium">Emergency Only</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
