import React from 'react';
import { EventItem } from '../types';
import { Calendar, MapPin } from 'lucide-react';

const events: EventItem[] = [
  {
    id: 1,
    title: "Medical Camp — Pain Relief Injections",
    date: "Pandharkawada, Chandrapur",
    description: "A medical camp was organized in Pandharkawada where steroid and trigger point injections were provided to patients suffering from neck pain, lower back pain, knee pain, and shoulder pain. Grateful for the opportunity to serve the community.",
    imageUrl: "images/events/health_camp.jpg"
  },
  {
    id: 2,
    title: "Health Education & Screening Drive",
    date: "Pandharkawada Village",
    description: "An educational session was organized for villagers to help them understand healthy lifestyle choices and disease prevention. Blood pressure and blood sugar screenings were conducted, and we addressed their health-related questions.",
    imageUrl: "images/events/village_screening.jpg"
  },
  {
    id: 3,
    title: "Anti-Addiction Awareness for High School Students",
    date: "Janata Mahavidyalaya, Dhanora",
    description: "Alcohol addiction is a serious problem in villages of Chandrapur district. A session was organized for high school students to educate them about the harmful effects of addiction. Key message: preventing addiction is far easier than stopping it.",
    imageUrl: "images/events/addiction_awareness.jpg"
  },
  {
    id: 4,
    title: "Navachetna Shibir — Ram Meditation",
    date: "Village Wadha, Chandrapur",
    description: "Navachetna Shibir was organized in collaboration with the Art of Living in village Wadha. Villagers were introduced to Ram Meditation to help manage stress levels effectively in today's challenging environment.",
    imageUrl: "images/events/cleanliness_drive.jpg"
  },
  {
    id: 5,
    title: "Student Focus & Motivation Session",
    date: "Indira Gandhi Vidyalaya, Pandharkawada",
    description: "Had the opportunity to address students, sharing insights on how to stay focused on studies while fostering learning, growth, and curiosity. The session aimed to inspire students to pursue excellence.",
    imageUrl: "images/events/education_workshop.jpg"
  },
  {
    id: 6,
    title: "Yoga & Wellness for Seniors",
    date: "Community Yoga Group",
    description: "A great interactive session with participants of the Yoga group. We talked about simple lifestyle changes that can help maintain health and mobility with advancing age. Focus was on practical daily routines.",
    imageUrl: "images/events/yoga_session.jpg"
  }
];

const Events: React.FC = () => {
  return (
    <div className="bg-ngo-beige min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <div className="inline-block bg-orange-100 rounded-full px-4 py-1 text-sm font-semibold text-ngo-maroon mb-4">
            On The Ground
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Events & Activities</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">Real events from our work across villages in Chandrapur, Yavatmal, and Nagpur districts.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-orange-50 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-56 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-ngo-teal font-medium mb-3">
                  <MapPin size={16} className="mr-2" />
                  {event.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
