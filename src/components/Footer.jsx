import React, { useState } from 'react';
import { Activity, ArrowRight, Check } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy pt-20 pb-8 text-white/80 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="bg-teal p-2 rounded-lg text-white">
                <Activity size={24} strokeWidth={2.5} />
              </div>
              <span className="font-heading text-2xl font-bold text-white">MediVerse</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              World-class healthcare, closer to you. Experience personalized medical excellence with our dedicated team of specialists.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-sm font-bold">IG</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-sm font-bold">FB</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-sm font-bold">X</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-sm font-bold">IN</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal hover:text-white transition-colors text-sm font-bold">YT</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-teal transition-colors text-sm">About Us</a></li>
              <li><a href="#doctors" className="hover:text-teal transition-colors text-sm">Find a Doctor</a></li>
              <li><a href="#departments" className="hover:text-teal transition-colors text-sm">Departments</a></li>
              <li><a href="#patient-portal" className="hover:text-teal transition-colors text-sm">Patient Portal</a></li>
              <li><a href="#" className="hover:text-teal transition-colors text-sm">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Departments</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-teal transition-colors text-sm">Cardiology</a></li>
              <li><a href="#" className="hover:text-teal transition-colors text-sm">Neurology</a></li>
              <li><a href="#" className="hover:text-teal transition-colors text-sm">Orthopedics</a></li>
              <li><a href="#" className="hover:text-teal transition-colors text-sm">Pediatrics</a></li>
              <li><a href="#" className="hover:text-teal transition-colors text-sm">Emergency Care</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-heading">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest health tips and news.</p>
            <form className="relative" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-teal/50"
              />
              <button 
                type="submit" 
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-white transition-colors ${subscribed ? 'bg-green-500' : 'bg-teal hover:bg-[#00a892]'}`}
              >
                {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>
            {subscribed && <p className="text-green-400 text-xs mt-2 font-medium">Subscribed successfully!</p>}
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>&copy; 2025 MediVerse. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
