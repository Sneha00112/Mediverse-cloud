import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, FileText, Pill, CreditCard, Activity, Droplet, Heart, User, LogOut, Mail, ArrowRight } from 'lucide-react';

const PatientPortal = () => {
  return (
    <section id="patient-portal" className="section-padding bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-card p-10 md:p-16 text-center border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="w-20 h-20 bg-teal/10 text-teal rounded-2xl flex items-center justify-center mx-auto mb-8">
            <LayoutDashboard size={40} />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4 font-heading">Patient Portal</h2>
          <div className="inline-block px-4 py-1.5 bg-teal text-white text-sm font-bold rounded-full mb-6">
            Coming Soon
          </div>
          
          <p className="text-lg text-text-gray mb-10 max-w-xl mx-auto">
            We're building a state-of-the-art dashboard to help you manage your health records, view test results, and communicate securely with your doctors. 
          </p>
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 max-w-md mx-auto">
            <h4 className="font-bold text-navy mb-2">Get notified when we launch</h4>
            <p className="text-sm text-text-gray mb-4">Be the first to know and get early access.</p>
            <form className="relative" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="Your email address" 
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 text-navy focus:outline-none focus:border-teal/50 focus:ring-2 focus:ring-teal/20"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 w-9 h-9 bg-teal rounded-lg flex items-center justify-center text-white hover:bg-[#00a892] transition-colors"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientPortal;
