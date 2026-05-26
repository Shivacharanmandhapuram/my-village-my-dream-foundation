import React, { useState } from 'react';
import { Heart, Shield, CheckCircle, Users, BookOpen, Stethoscope } from 'lucide-react';

const impactLevels = [
  { amount: "500", label: "School supplies for 5 children", icon: <BookOpen size={20} /> },
  { amount: "1,000", label: "One month tuition for a village student", icon: <BookOpen size={20} /> },
  { amount: "2,500", label: "Health screening for 25 villagers", icon: <Stethoscope size={20} /> },
  { amount: "5,000", label: "Full medical camp supplies for one session", icon: <Stethoscope size={20} /> },
];

const Contribute: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectAmount = (amount: string) => {
    setFormData(prev => ({ ...prev, amount: amount.replace(',', '') }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Contribution Pledge from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APledge Amount: INR ${formData.amount}%0D%0AMessage: ${formData.message}`;
    window.location.href = `mailto:contact@myvillagemydream.org?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-ngo-beige min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full text-ngo-maroon mb-4">
            <Heart size={32} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Contribute to the Cause</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Every contribution directly reaches the villages we serve. No middlemen, no overhead — just real impact on real lives.
          </p>
        </div>

        {/* Impact Calculator */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">See Your Impact</h2>
          <p className="text-gray-500 text-sm mb-6">Select an amount to see what your contribution achieves:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {impactLevels.map((level) => (
              <button
                key={level.amount}
                onClick={() => selectAmount(level.amount)}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                  formData.amount === level.amount.replace(',', '')
                    ? 'border-ngo-maroon bg-red-50 shadow-md'
                    : 'border-gray-200 hover:border-ngo-orange hover:bg-orange-50'
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  formData.amount === level.amount.replace(',', '')
                    ? 'bg-ngo-maroon text-white'
                    : 'bg-orange-100 text-ngo-orange'
                }`}>
                  {level.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Rs {level.amount}</div>
                  <div className="text-gray-600 text-sm">{level.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Make a Contribution</h2>
            <p className="text-gray-500 text-sm mb-6">Fill in your details and we'll connect with you for payment.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text" name="name" id="name" required
                    value={formData.name} onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email" name="email" id="email" required
                    value={formData.email} onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Contribution Amount (INR)</label>
                <div className="mt-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rs</span>
                  <input
                    type="text" name="amount" id="amount" required
                    value={formData.amount} onChange={handleChange}
                    className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5 pl-12"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                <textarea
                  name="message" id="message" rows={3}
                  value={formData.message} onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5"
                  placeholder="Any specific program you'd like to support?"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-ngo-maroon hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ngo-maroon transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Heart size={20} fill="currentColor" />
                  Send Contribution Request
                </button>
                <p className="mt-3 text-xs text-center text-gray-500">
                  This opens your email client to send a pledge. We'll respond with payment details.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 bg-white rounded-2xl p-8 border border-orange-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={24} className="text-ngo-teal" />
            <h3 className="text-lg font-bold text-gray-900">Trust & Transparency</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">80G Tax Exemption</div>
                <div className="text-gray-500 text-xs">50% tax deduction on your donation under Section 80G</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">12A Registered</div>
                <div className="text-gray-500 text-xs">Income tax exemption as a registered charitable trust</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 text-sm">100% to Programs</div>
                <div className="text-gray-500 text-xs">Every rupee goes directly to our village initiatives</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
