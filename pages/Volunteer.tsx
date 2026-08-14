import React, { useState } from 'react';
import { Hand, MapPin, Clock, CheckCircle, Users, Stethoscope, BookOpen, Smartphone } from 'lucide-react';

const volunteerTypes = [
  {
    icon: <Stethoscope size={24} />,
    title: "Medical Camp Support",
    commitment: "Weekends, 1-2 days per camp",
    description: "Assist during health screening camps and joint injection sessions in villages. Help with patient registration, BP monitoring, and camp logistics.",
    location: "Chandrapur & Yavatmal"
  },
  {
    icon: <BookOpen size={24} />,
    title: "Teaching & Tutoring",
    commitment: "Weekdays, 2-3 hours/week",
    description: "Support the Village Tuition Program by teaching after-school classes. Subjects needed: Math, Science, English, and basic computer skills.",
    location: "Chandrapur District"
  },
  {
    icon: <Users size={24} />,
    title: "Event & Outreach",
    commitment: "Flexible, event-based",
    description: "Help organize Navachetna Shibirs, anti-addiction awareness sessions, and community yoga programs. Ideal for one-time or periodic involvement.",
    location: "All districts"
  },
  {
    icon: <Stethoscope size={24} />,
    title: "Health Screening and Education Support",
    commitment: "Flexible, camp-based",
    description: "Volunteers may help with participant registration, crowd flow, organizing screening stations, recording nonclinical program information, preparing educational materials, distributing approved health handouts, helping families understand where to go next, coordinating follow-up reminders, supporting WhatsApp education, and organizing nutrition and sanitation demonstrations.",
    location: "Chandrapur & Yavatmal"
  },
  {
    icon: <Smartphone size={24} />,
    title: "Remote / Digital",
    commitment: "Flexible, remote",
    description: "Contribute from anywhere — social media management, content creation, data entry, translation (English/Marathi/Hindi), or fundraising support.",
    location: "Work from anywhere"
  }
];

const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    type: '',
    availability: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Volunteer Application: ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0ACity: ${formData.city}%0D%0AVolunteer Type: ${formData.type}%0D%0AAvailability: ${formData.availability}%0D%0AMessage: ${formData.message}`;
    window.location.href = `mailto:volunteer@myvillagemydream.org?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-ngo-beige min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full text-ngo-maroon mb-4">
            <Hand size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Get Involved</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you have medical skills, teaching experience, or just a heart to serve — there's a meaningful role for you in our mission.
          </p>
        </div>

        {/* Volunteer Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">How You Can Help</h2>
          <p className="text-gray-500 text-center mb-8">Choose the type that fits your skills and availability.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerTypes.map((type, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-orange-50 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 rounded-xl text-ngo-orange flex-shrink-0">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{type.title}</h3>
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="inline-flex items-center text-xs font-medium text-ngo-teal bg-teal-50 px-2.5 py-1 rounded-full">
                        <Clock size={12} className="mr-1" /> {type.commitment}
                      </span>
                      <span className="inline-flex items-center text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                        <MapPin size={12} className="mr-1" /> {type.location}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-xl p-5">
            <Stethoscope size={18} className="text-ngo-maroon mt-0.5 flex-shrink-0" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Blood-pressure measurement, blood-sugar testing, child-growth assessment, interpretation of results, medical advice, and clinical procedures must be performed or supervised by appropriately trained and authorized personnel.
            </p>
          </div>
        </div>

        {/* What to Expect */}
        <div className="bg-ngo-teal rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Orientation call with our team within 48 hours of applying",
              "Hands-on involvement — no passive roles, every volunteer matters",
              "Certificate of volunteering upon completion of your commitment",
              "Travel support provided for on-ground volunteers visiting villages",
              "Join a WhatsApp group with other active volunteers and the core team",
              "Flexible scheduling — we work around your availability"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-white/80 mt-0.5 flex-shrink-0" />
                <span className="text-white/90 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Volunteer Application</h2>
            <p className="text-gray-500 text-sm mb-6">Fill in your details and we'll reach out within 48 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text" name="name" id="name" required
                  value={formData.name} onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5"
                  placeholder="Your Name"
                />
              </div>

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email" name="email" id="email" required
                    value={formData.email} onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone / WhatsApp</label>
                  <input
                    type="tel" name="phone" id="phone" required
                    value={formData.phone} onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">Your City</label>
                  <input
                    type="text" name="city" id="city"
                    value={formData.city} onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5"
                    placeholder="e.g. Nagpur, Mumbai"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Volunteer Type</label>
                  <select
                    name="type" id="type"
                    value={formData.type} onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5 bg-white"
                  >
                    <option value="">Select type...</option>
                    <option value="Medical Camp Support">Medical Camp Support</option>
                    <option value="Teaching & Tutoring">Teaching & Tutoring</option>
                    <option value="Event & Outreach">Event & Outreach</option>
                    <option value="Remote / Digital">Remote / Digital</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
                <select
                  name="availability" id="availability"
                  value={formData.availability} onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5 bg-white"
                >
                  <option value="">Select availability...</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends only</option>
                  <option value="Both">Both weekdays & weekends</option>
                  <option value="Flexible">Flexible / Event-based</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Why do you want to volunteer? (Optional)</label>
                <textarea
                  name="message" id="message" rows={3}
                  value={formData.message} onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-ngo-maroon focus:ring-ngo-maroon sm:text-sm border p-3.5"
                  placeholder="Tell us about your interests, skills, or motivation..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white bg-ngo-teal hover:bg-[#4a857c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ngo-teal transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Hand size={20} />
                  Submit Application
                </button>
                <p className="mt-3 text-xs text-center text-gray-500">
                  This opens your email client to send the application. We'll respond within 48 hours.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
