import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, FileText, Pill, CreditCard, Activity, Droplet, Heart, User, LogOut, Mail, ArrowRight, X, Thermometer, Scale, Dna, Layers } from 'lucide-react';

const PatientPortal = ({ user, onBookClick, appointments = [] }) => {
  const [vitals, setVitals] = useState({
    bloodPressure: '120/80',
    heartRate: '72',
    glucose: '95',
    spo2: '98',
    weight: '70',
    temperature: '98.6',
    cholesterol: '185',
    bmi: '24.2'
  });

  const [reports, setReports] = useState([
    { id: 1, cat: 'Hemoglobin', val: '14.2', unit: 'g/dL', status: 'Normal', action: 'None', date: '2026-04-15', file: null },
    { id: 2, cat: 'Uric Acid', val: '7.2', unit: 'mg/dL', status: 'Elevated', action: 'Hydration', date: '2026-05-01', file: null },
    { id: 3, cat: 'White Blood Cells', val: '6500', unit: '/mcL', status: 'Normal', action: 'None', date: '2026-04-10', file: null },
    { id: 4, cat: 'Vitamin D', val: '28', unit: 'ng/mL', status: 'Low', action: 'Supplements', date: '2026-04-05', file: null },
  ]);

  const [newEntry, setNewEntry] = useState({ type: 'Vital', label: 'Blood Pressure', value: '', file: null });
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [appTab, setAppTab] = useState('Upcoming');

  useEffect(() => {
    if (!showEntryModal) return;

    const getTargetValue = () => {
      if (newEntry.type === 'Vital') {
        const key = newEntry.label === 'Blood Pressure' ? 'bloodPressure' : 
                    newEntry.label === 'Heart Rate' ? 'heartRate' : 
                    newEntry.label.toLowerCase();
        return vitals[key] || '';
      } else {
        const report = reports.find(r => r.cat === newEntry.label);
        return report ? report.val : '';
      }
    };

    const currentValue = getTargetValue();
    if (newEntry.value !== currentValue) {
      setNewEntry(prev => ({ ...prev, value: currentValue }));
    }
  }, [newEntry.label, newEntry.type, showEntryModal]);

  const getWarning = (label, value) => {
    if (!value) return null;
    
    if (label === 'Blood Pressure') {
      const systolic = parseInt(value.split('/')[0]);
      if (systolic >= 140) return { text: 'Hypertension detected. Consult a cardiologist soon.', severity: 'high' };
      if (systolic <= 90) return { text: 'Low blood pressure. Monitor closely.', severity: 'medium' };
    }
    if (label === 'Glucose') {
      const val = parseFloat(value);
      if (val >= 140) return { text: 'High sugar level. Avoid sweets and see a doctor.', severity: 'high' };
      if (val <= 70) return { text: 'Low sugar level. Consult a doctor immediately.', severity: 'high' };
    }
    if (label === 'Cholesterol') {
      if (parseFloat(value) >= 240) return { text: 'Critical cholesterol levels. See a doctor.', severity: 'high' };
      if (parseFloat(value) >= 200) return { text: 'High cholesterol. Monitor diet.', severity: 'medium' };
    }
    if (label === 'Heart Rate') {
      const val = parseFloat(value);
      if (val >= 100 || val <= 50) return { text: 'Irregular heart rate. Schedule a checkup.', severity: 'medium' };
    }
    if (label === 'BMI') {
      const val = parseFloat(value);
      if (val >= 30) return { text: 'Obesity level. Consult a nutritionist.', severity: 'high' };
      if (val >= 25) return { text: 'Overweight. Maintain healthy diet.', severity: 'medium' };
    }
    if (label === 'Temperature') {
      const val = parseFloat(value);
      if (val >= 101) return { text: 'High fever. Consult a doctor.', severity: 'high' };
      if (val <= 95) return { text: 'Hypothermia risk. Stay warm.', severity: 'high' };
    }
    return null;
  };

  const getStatusColor = (label, value) => {
    const warning = getWarning(label, value);
    if (!warning) return 'text-green-500';
    return warning.severity === 'high' ? 'text-red-500' : 'text-orange-500';
  };

  const getStatusText = (label, value) => {
    const warning = getWarning(label, value);
    if (!warning) return 'Optimal';
    return warning.severity === 'high' ? 'Critical' : 'Warning';
  };

  const vitalCards = [
    { label: 'Blood Pressure', value: vitals.bloodPressure, unit: 'mmHg', icon: Activity, color: 'teal' },
    { label: 'Heart Rate', value: vitals.heartRate, unit: 'bpm', icon: Heart, color: 'red' },
    { label: 'Glucose', value: vitals.glucose, unit: 'mg/dL', icon: Droplet, color: 'blue' },
    { label: 'SpO2', value: vitals.spo2, unit: '%', icon: Activity, color: 'orange' },
    { label: 'Weight', value: vitals.weight, unit: 'kg', icon: Scale, color: 'indigo' },
    { label: 'Temperature', value: vitals.temperature, unit: '°F', icon: Thermometer, color: 'yellow' },
    { label: 'Cholesterol', value: vitals.cholesterol, unit: 'mg/dL', icon: Dna, color: 'purple' },
    { label: 'BMI', value: vitals.bmi, unit: '', icon: Layers, color: 'emerald' },
  ];

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    const { type, label, value, file } = newEntry;
    
    if (type === 'Vital') {
      const key = label === 'Blood Pressure' ? 'bloodPressure' : 
                  label === 'Heart Rate' ? 'heartRate' : 
                  label.toLowerCase();
      setVitals(prev => ({ ...prev, [key]: value }));
    } else {
      const warning = getWarning(label, value);
      const newReport = {
        id: Date.now(),
        cat: label,
        val: value,
        unit: label === 'Cholesterol' ? 'mg/dL' : label === 'Uric Acid' ? 'mg/dL' : label === 'Hemoglobin' ? 'g/dL' : '',
        status: warning ? (warning.severity === 'high' ? 'Critical' : 'Elevated') : 'Normal',
        action: warning ? 'Consult Doctor' : 'None',
        date: new Date().toISOString().split('T')[0],
        file: file ? file.name : null
      };
      setReports(prev => [newReport, ...prev]);
    }
    
    setShowEntryModal(false);
    setNewEntry({ type: 'Vital', label: 'Blood Pressure', value: '', file: null });
  };

  const [activeTab, setActiveTab] = useState('Vitals');

  const categories = {
    Vital: ['Blood Pressure', 'Heart Rate', 'Glucose', 'SpO2', 'Weight', 'Temperature', 'Cholesterol', 'BMI'],
    Report: ['Hemoglobin', 'Uric Acid', 'White Blood Cells', 'Vitamin D', 'Thyroid', 'Liver Function']
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header / Profile Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.fullName?.[0] || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-navy font-heading">Welcome back, {user?.fullName || 'Sneha'}</h1>
              <p className="text-text-gray flex items-center gap-2 text-sm">
                Patient ID: #MV-2024-{Math.floor(1000 + Math.random() * 9000)} • <span className="text-teal font-bold">Blood Group: O+</span>
              </p>
            </div>
          </div>
          
          {/* Conditional Update Button */}
          {(activeTab === 'Vitals' || activeTab === 'Reports') && (
            <button 
              onClick={() => setShowEntryModal(true)}
              className="bg-white border-2 border-teal text-teal px-6 py-3 rounded-2xl font-bold hover:bg-teal hover:text-white transition-all shadow-sm flex items-center gap-2 animate-fade-in"
            >
              <FileText size={20} /> Update Health Data
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white p-3 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col gap-2">
              {[
                { id: 'Vitals', icon: LayoutDashboard, label: 'Vitality Dashboard' },
                { id: 'Reports', icon: FileText, label: 'Medical Reports' },
                { id: 'Appointments', icon: Calendar, label: 'My Appointments' }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all text-left ${activeTab === tab.id ? 'bg-navy text-white shadow-lg' : 'text-text-gray hover:bg-gray-100'}`}
                  >
                    <Icon size={22} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0 animate-fade-in">
            {/* Vitality Dashboard Section */}
            {activeTab === 'Vitals' && (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 animate-scale-in">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-navy font-heading flex items-center gap-3">
                    <LayoutDashboard className="text-teal" /> Vitality Dashboard
                  </h2>
                  <span className="text-sm text-text-gray">Today, 09:45 AM</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {vitalCards.map((card) => {
                    const Icon = card.icon;
                    const warning = getWarning(card.label, card.value);
                    const statusColor = getStatusColor(card.label, card.value);
                    const statusText = getStatusText(card.label, card.value);
                    
                    return (
                      <div 
                        key={card.label} 
                        className={`p-6 rounded-[2rem] bg-white border-2 ${warning ? 'border-red-100 bg-red-50/20' : 'border-gray-50'} shadow-sm hover:shadow-xl hover:border-teal/20 transition-all group relative overflow-hidden`}
                      >
                        {/* Decorative background element */}
                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full bg-${card.color}-500/5 group-hover:scale-150 transition-transform duration-500`}></div>
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className={`p-3.5 rounded-2xl bg-gray-50 text-${card.color}-500 group-hover:bg-white group-hover:shadow-md transition-all`}>
                            <Icon size={24} />
                          </div>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white border shadow-sm ${statusColor} border-gray-100`}>
                            {statusText}
                          </div>
                        </div>
                        
                        <div className="relative z-10">
                          <p className="text-text-gray text-[11px] font-bold mb-1 uppercase tracking-widest opacity-70">{card.label}</p>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-4xl font-bold text-navy tracking-tight">{card.value}</span>
                            <span className="text-text-gray text-xs font-medium">{card.unit}</span>
                          </div>
                          
                          {warning && (
                            <div className="mt-4 text-[10px] font-bold text-red-600 bg-red-100/50 p-3 rounded-2xl flex items-start gap-2 leading-tight border border-red-100/50">
                              <Activity size={14} className="shrink-0 mt-0.5" /> 
                              <span>{warning.text}</span>
                            </div>
                          )}
                          
                          <div className="mt-6 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${warning ? 'bg-red-500' : 'bg-teal'} rounded-full transition-all duration-1000 ease-out`} 
                              style={{ width: warning ? '85%' : '70%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Health Log / Medical Reports Section */}
            {activeTab === 'Reports' && (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 animate-scale-in">
                <h2 className="text-2xl font-bold text-navy font-heading mb-6 flex items-center gap-3">
                  <FileText className="text-teal" /> Medical Reports & Values
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-text-gray text-sm border-b border-gray-50">
                        <th className="pb-4 font-bold">Category</th>
                        <th className="pb-4 font-bold">Value</th>
                        <th className="pb-4 font-bold">Status</th>
                        <th className="pb-4 font-bold">Warning / Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-navy divide-y divide-gray-50">
                      {reports.map((row) => {
                        const warning = getWarning(row.cat, row.val);
                        return (
                          <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4">
                              <p className="font-bold">{row.cat}</p>
                              <p className="text-[10px] text-text-gray">{row.date}</p>
                              {row.file && <span className="text-[10px] text-teal flex items-center gap-1 mt-1"><FileText size={10} /> {row.file}</span>}
                            </td>
                            <td className="py-4">{row.val} {row.unit}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${!warning ? 'bg-green-100 text-green-600' : warning.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                {warning ? (warning.severity === 'high' ? 'Critical' : 'Elevated') : 'Normal'}
                              </span>
                            </td>
                            <td className="py-4">
                              {warning ? (
                                <div className="text-xs text-red-600 font-bold leading-tight">
                                  {warning.text}
                                </div>
                              ) : (
                                <span className="text-text-gray text-xs">All values optimal</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Appointments Section */}
            {activeTab === 'Appointments' && (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 animate-scale-in">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h2 className="text-2xl font-bold text-navy font-heading flex items-center gap-3">
                    <Calendar className="text-teal" /> My Appointments
                  </h2>
                  <div className="flex gap-2 p-1 bg-gray-50 rounded-xl w-full md:w-auto">
                    <button 
                      onClick={() => setAppTab('Upcoming')}
                      className={`flex-1 md:px-6 py-2 rounded-lg text-xs font-bold transition-all ${appTab === 'Upcoming' ? 'bg-teal text-white shadow-sm' : 'text-text-gray hover:bg-gray-100'}`}
                    >
                      Upcoming
                    </button>
                    <button 
                      onClick={() => setAppTab('History')}
                      className={`flex-1 md:px-6 py-2 rounded-lg text-xs font-bold transition-all ${appTab === 'History' ? 'bg-teal text-white shadow-sm' : 'text-text-gray hover:bg-gray-100'}`}
                    >
                      History
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {appointments
                    .filter(app => appTab === 'Upcoming' ? app.status === 'Upcoming' : app.status === 'Completed')
                    .map((app) => (
                      <div key={app.id} className="p-6 rounded-3xl border border-gray-50 bg-gray-50/50 hover:border-teal/30 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-navy text-lg">{app.doctor}</p>
                            <p className="text-sm text-text-gray">{app.specialty}</p>
                          </div>
                          <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${app.status === 'Upcoming' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                            {app.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm font-bold text-navy">
                          <div className="flex items-center gap-2"><Calendar size={16} className="text-teal" /> {app.date}</div>
                          <div className="flex items-center gap-2"><Activity size={16} className="text-teal" /> {app.time}</div>
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={onBookClick}
                    className="bg-navy text-white px-10 py-4 rounded-2xl font-bold hover:bg-navy/90 transition-all shadow-lg flex items-center gap-3"
                  >
                    Book New Appointment <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Entry Modal */}
      {showEntryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-navy/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-navy">Update Health Info</h3>
              <button onClick={() => setShowEntryModal(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex gap-2 mb-6 p-1 bg-gray-50 rounded-2xl">
              <button 
                onClick={() => setNewEntry({ ...newEntry, type: 'Vital', label: 'Blood Pressure' })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${newEntry.type === 'Vital' ? 'bg-white text-teal shadow-sm' : 'text-text-gray'}`}
              >
                Vitals
              </button>
              <button 
                onClick={() => setNewEntry({ ...newEntry, type: 'Report', label: 'Cholesterol' })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${newEntry.type === 'Report' ? 'bg-white text-teal shadow-sm' : 'text-text-gray'}`}
              >
                Medical Report
              </button>
            </div>

            <form onSubmit={handleUpdateEntry} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Select Category</label>
                <select 
                  value={newEntry.label}
                  onChange={(e) => setNewEntry({ ...newEntry, label: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-teal"
                >
                  {categories[newEntry.type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-navy mb-2">Value</label>
                <input 
                  type="text" 
                  required
                  placeholder={`e.g. ${newEntry.label === 'Blood Pressure' ? '120/80' : '72'}`}
                  value={newEntry.value}
                  onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
                  className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-teal"
                />
              </div>
              
              {newEntry.type === 'Report' && (
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Upload Report (Optional)</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      onChange={(e) => setNewEntry({ ...newEntry, file: e.target.files[0] })}
                      className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-teal text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-teal/10 file:text-teal hover:file:bg-teal/20"
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="w-full py-4 bg-teal text-white rounded-2xl font-bold hover:bg-[#00a892] transition-all shadow-lg">
                Save & Update
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PatientPortal;
