import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { name: 'Sarah M.', rating: 5, quote: 'The staff was incredibly attentive and the facilities are top-notch. I felt heard and cared for from the moment I walked in.', avatar: 'bg-blue-200 text-blue-700' },
  { name: 'James T.', rating: 5, quote: 'Scheduling an appointment was seamless, and Dr. Jenkins was brilliant. Highly recommend MediVerse to anyone.', avatar: 'bg-green-200 text-green-700' },
  { name: 'Elena R.', rating: 4, quote: 'Very professional environment. The patient portal makes managing my prescriptions and records incredibly easy.', avatar: 'bg-purple-200 text-purple-700' },
  { name: 'David L.', rating: 5, quote: 'The emergency care team saved my life. Fast, efficient, and deeply compassionate. I cannot thank them enough.', avatar: 'bg-red-200 text-red-700' },
  { name: 'Michael K.', rating: 5, quote: 'A truly modern healthcare experience. No long waits, clear communication, and excellent follow-up care.', avatar: 'bg-yellow-200 text-yellow-700' },
  { name: 'Amanda P.', rating: 4, quote: 'Beautiful clinic and wonderful doctors. The pediatrician was amazing with my kids.', avatar: 'bg-teal/30 text-teal' },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const maxIndex = testimonials.length - 1;

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  const nextSlide = () => setActiveIndex(prev => prev === maxIndex ? 0 : prev + 1);
  const prevSlide = () => setActiveIndex(prev => prev === 0 ? maxIndex : prev - 1);

  return (
    <section className="section-padding bg-light-gray relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-navy">Patient Stories</h2>
          <p className="text-lg text-text-gray max-w-2xl mx-auto">
            Don't just take our word for it. Read what our patients have to say about their experience.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="overflow-hidden px-4 py-8">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {testimonials.map((test, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 md:p-12 rounded-3xl shadow-card relative border border-gray-100">
                    <Quote size={60} className="absolute top-6 right-8 text-teal/10 rotate-180" />
                    <div className="flex items-center gap-2 mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} className={i < test.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />)}
                    </div>
                    <p className="text-xl md:text-2xl text-navy font-heading italic mb-8 relative z-10">"{test.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full ${test.avatar} flex items-center justify-center text-xl font-bold`}>{test.name.charAt(0)}</div>
                      <div><h4 className="font-bold text-navy">{test.name}</h4><p className="text-sm text-text-gray">Verified Patient</p></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-navy hover:text-teal hover:scale-110 transition-all z-20 border border-gray-100"><ChevronLeft size={24} /></button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-navy hover:text-teal hover:scale-110 transition-all z-20 border border-gray-100"><ChevronRight size={24} /></button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, idx) => (
              <button key={idx} onClick={() => setActiveIndex(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-teal w-8' : 'bg-gray-300 hover:bg-teal/50'}`} aria-label={`Go to slide ${idx + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
