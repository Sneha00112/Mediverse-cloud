import React from 'react';
import { ShieldCheck, Users, Clock, CreditCard } from 'lucide-react';

const reasons = [
  {
    title: 'Advanced Technology',
    desc: 'State-of-the-art AI diagnostics and fully integrated digital health records ensure precise care.',
    icon: ShieldCheck,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    stat: '99.9%',
    statLabel: 'Diagnostic Accuracy'
  },
  {
    title: 'Expert Doctors',
    desc: 'Our team comprises distinguished specialists selected for their expertise and dedication.',
    icon: Users,
    color: 'text-teal',
    bg: 'bg-teal/20',
    stat: '500+',
    statLabel: 'Board-Certified'
  },
  {
    title: '24/7 Emergency',
    desc: 'Emergencies don’t wait. Our world-class trauma center is fully staffed at any moment.',
    icon: Clock,
    color: 'text-red-500',
    bg: 'bg-red-100',
    stat: '<10m',
    statLabel: 'Average Wait Time'
  },
  {
    title: 'Insurance Accepted',
    desc: 'Partnered with major insurance providers to ensure premium healthcare is accessible.',
    icon: CreditCard,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
    stat: '200+',
    statLabel: 'Providers Covered'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-navy">Why Choose MediVerse</h2>
          <p className="text-lg text-text-gray max-w-2xl mx-auto">
            Redefining the healthcare experience with a commitment to excellence, innovation, and compassionate care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-card transition-all group">
                <div className={`w-16 h-16 ${reason.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} className={reason.color} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 font-heading">{reason.title}</h3>
                <p className="text-text-gray mb-8 line-clamp-3">
                  {reason.desc}
                </p>
                <div className="pt-6 border-t border-gray-200">
                  <div className="text-3xl font-bold text-navy mb-1 font-heading">{reason.stat}</div>
                  <div className="text-sm font-medium text-teal">{reason.statLabel}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
