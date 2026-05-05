import React from 'react';
import { Activity } from 'lucide-react';

const Hero = ({ onBookClick }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden bg-gradient-to-br from-navy to-[#112a4f]">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal/40 via-navy to-navy"></div>
      
      {/* Subtle pulsing heartbeat line decoration */}
      <div className="absolute bottom-1/4 left-0 w-full opacity-10 flex items-center justify-center pointer-events-none">
        <Activity size={400} className="text-teal animate-pulse-slow stroke-[0.5]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-teal/20 text-teal font-medium text-sm mb-6 border border-teal/30">
            Premium HealthTech SaaS
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-heading">
            Redefining Healthcare Access
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl font-light" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Expert doctors. Advanced diagnostics. Compassionate care — all in one place. Experience a new standard of personalized medical excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBookClick}
              className="bg-teal text-white px-8 py-4 rounded-full font-medium text-lg text-center hover:bg-[#00a892] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Book Appointment
            </button>
            <a 
              href="#departments" 
              className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-medium text-lg text-center hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
