import React, { useState, useEffect, useRef } from 'react';
import { Stethoscope, BookOpen, Heart, Activity, Users, Smile, ChevronLeft, ChevronRight, MapPin, Leaf, AlertTriangle, GraduationCap, HandHeart, Siren, Bone, Ribbon, Palette, Sparkles } from 'lucide-react';

interface ProgramData {
  id: number;
  title: string;
  description: string;
  images: string[];
  icon: React.ReactNode;
  location: string;
  stats: string;
  tag: string;
  tagColor: string;
}

const programs: ProgramData[] = [
  {
    id: 1,
    title: "Medical Camp — Pain Relief Injections",
    description: "A medical camp was organized in the village of Pandharkawada, near Chandrapur. We provided steroid and trigger point injections to patients suffering from neck pain, lower back pain, knee pain, and shoulder pain. Grateful for the opportunity to serve the community and help relieve pain for so many individuals.",
    images: [
      "images/programs/joint_camp.jpg",
      "images/gallery/medical_camp/1.jpg",
      "images/gallery/medical_camp/2.jpg",
      "images/gallery/medical_camp/3.jpg",
      "images/gallery/medical_camp/4.jpg"
    ],
    icon: <Siren />,
    location: "Pandharkawada, Chandrapur",
    stats: "Pain Relief Camp",
    tag: "Healthcare",
    tagColor: "bg-red-500"
  },
  {
    id: 2,
    title: "Health Education & Screening Drive",
    description: "An educational session was organized for the villagers of Pandharkawada to help them better understand healthy lifestyle choices and disease prevention. This included Blood Pressure, Diabetes and Malnutrition Screening combined with Health Education and Follow-Up Guidance, and we addressed their health-related questions. It was a meaningful opportunity to promote awareness and preventive care within the community.",
    images: [
      "images/programs/screening.jpg",
      "images/gallery/screening/1.jpg",
      "images/gallery/screening/2.jpg",
      "images/gallery/screening/3.jpg",
      "images/gallery/screening/4.jpg",
      "images/gallery/screening/5.jpg",
      "images/gallery/screening/6.jpg",
      "images/gallery/screening/7.jpg",
      "images/gallery/screening/8.jpg",
      "images/gallery/village_screening/1.jpg",
      "images/gallery/village_screening/2.jpg",
      "images/gallery/bp_checkup/1.jpg",
      "images/gallery/bp_checkup/2.jpg"
    ],
    icon: <Stethoscope />,
    location: "Pandharkawada, Chandrapur",
    stats: "9,500+ Screened",
    tag: "Healthcare",
    tagColor: "bg-red-500"
  },
  {
    id: 3,
    title: "Sudarshan Kriya for Students",
    description: "We had the opportunity to introduce Sudarshan Kriya to students at Adarsh High School in Punwat, Yavatmal District. With stress levels rising among children, techniques like Sudarshan Kriya offer effective tools for managing stress and may help prevent some from turning to addiction. This year, we plan to conduct the course for 300 students at the school.",
    images: [
      "images/programs/breathing.jpg",
      "images/gallery/breathing/1.jpg"
    ],
    icon: <Smile />,
    location: "Adarsh High School, Punwat, Yavatmal",
    stats: "300 Students Planned",
    tag: "Student Wellness",
    tagColor: "bg-blue-500"
  },
  {
    id: 4,
    title: "Anti-Addiction Awareness — High School",
    description: "Alcohol addiction is a serious problem in villages of Chandrapur district. To address this, a session was organized for high school students at Janata Mahavidyalaya in Dhanora to educate them about the harmful effects of addiction and how to prevent it. The key message: preventing addiction is far easier than stopping it once it starts.",
    images: [
      "images/programs/alcohol_cessation.jpg",
      "images/gallery/cessation/1.jpg",
      "images/gallery/cessation/2.jpg"
    ],
    icon: <AlertTriangle />,
    location: "Janata Mahavidyalaya, Dhanora, Chandrapur",
    stats: "Addiction Prevention",
    tag: "Anti-Addiction",
    tagColor: "bg-purple-500"
  },
  {
    id: 5,
    title: "Navachetna Shibir — Ram Meditation",
    description: "Navachetna Shibir was organized in collaboration with the Art of Living in my village, Wadha. During the program, villagers were introduced to Ram Meditation. In today's environment, where stress levels are high, initiatives like this can play a valuable role in helping people manage stress more effectively.",
    images: [
      "images/gallery/yoga/1.jpg",
      "images/gallery/yoga/2.jpg",
      "images/gallery/yoga/3.jpg"
    ],
    icon: <Leaf />,
    location: "Village Wadha, Chandrapur",
    stats: "Community Wellness",
    tag: "Wellness",
    tagColor: "bg-green-500"
  },
  {
    id: 6,
    title: "Anti-Tobacco Awareness for Children",
    description: "These days, children are getting exposed to addictive substances at a very young age. The use of chewing tobacco (Kharra/Gutkha) is becoming increasingly common. A session was organized for students from 1st to 7th standard at Zilla Parishad School, Dhanora, educating them about how addiction can affect their health, family, and future. The goal: to help children stay away from addiction and make healthier choices.",
    images: [
      "images/gallery/anti_addiction/1.jpg",
      "images/gallery/anti_addiction/2.jpg",
      "images/gallery/anti_addiction/3.jpg",
      "images/gallery/anti_addiction/4.jpg",
      "images/gallery/anti_addiction/5.jpg",
      "images/gallery/cessation/3.jpg",
      "images/gallery/cessation/4.jpg"
    ],
    icon: <Activity />,
    location: "Zilla Parishad School, Dhanora, Chandrapur",
    stats: "1st to 7th Standard",
    tag: "Anti-Addiction",
    tagColor: "bg-purple-500"
  },
  {
    id: 7,
    title: "Healthcare Outreach — Ayurvedic Team",
    description: "Had the opportunity to interact with Ayurvedic doctors and the outreach team at Dhariwal Industries, who provide medical services to 10 surrounding villages. We discussed strategies to bridge the gap with rural communities and ensure every interaction creates a real, positive impact on villagers' lives.",
    images: [
      "images/gallery/mission/1.jpg",
      "images/gallery/mission/2.jpg",
      "images/gallery/mission/3.jpg",
      "images/gallery/mission/4.jpg"
    ],
    icon: <HandHeart />,
    location: "Dhariwal Industries, Chandrapur",
    stats: "10 Villages Covered",
    tag: "Healthcare",
    tagColor: "bg-red-500"
  },
  {
    id: 8,
    title: "Student Focus & Motivation Session",
    description: "Had the opportunity to address the students at Indira Gandhi Vidyalaya, Pandharkawada, sharing insights on how to stay focused on studies while fostering learning, growth, and curiosity.",
    images: [
      "images/events/education_workshop.jpg"
    ],
    icon: <GraduationCap />,
    location: "Indira Gandhi Vidyalaya, Pandharkawada",
    stats: "Student Engagement",
    tag: "Education",
    tagColor: "bg-yellow-500"
  },
  {
    id: 9,
    title: "Medha Yoga & Utkarsh Yoga",
    description: "Had the opportunity to engage with students at Adarsh High School, Mardi, and talk about the importance of practicing Medha Yoga and Utkarsh Yoga daily. These practices help improve concentration in studies and manage stress effectively.",
    images: [
      "images/gallery/breathing/2.jpg",
      "images/gallery/breathing/3.jpg"
    ],
    icon: <Smile />,
    location: "Adarsh High School, Mardi",
    stats: "Daily Yoga Practice",
    tag: "Student Wellness",
    tagColor: "bg-blue-500"
  },
  {
    id: 10,
    title: "Yoga & Wellness for Seniors",
    description: "Had a great interactive session with the participants of Yoga group. We talked about simple lifestyle changes that can help them maintain health and mobility with the age advancing.",
    images: [
      "images/gallery/yoga/4.jpg",
      "images/gallery/yoga/5.jpg",
      "images/gallery/yoga/6.jpg"
    ],
    icon: <Heart />,
    location: "Community Yoga Group, Chandrapur",
    stats: "Senior Wellness",
    tag: "Wellness",
    tagColor: "bg-green-500"
  },
  {
    id: 11,
    title: "Village Tuition Program",
    description: "To bridge the educational gap, we employ local teachers who provide supplementary after-school tuition. This initiative ensures that children in remote areas receive the personalized attention and academic support they need to succeed.",
    images: [
      "images/programs/tuition.jpg",
      "images/gallery/tuition/1.jpg",
      "images/gallery/tuition/2.jpg"
    ],
    icon: <BookOpen />,
    location: "10 Villages, Chandrapur District",
    stats: "30 Teachers Employed",
    tag: "Education",
    tagColor: "bg-yellow-500"
  },
  {
    id: 12,
    title: "Special Needs School Support",
    description: "We proudly sponsor specialized educational programs for the Deaf & Dumb school in Saoner. Through the Art of Living's intuition program, we create an inclusive environment where children with hearing and speech impairments can thrive and express themselves freely.",
    images: [
      "images/programs/special_needs.jpg"
    ],
    icon: <Users />,
    location: "Saoner, Nagpur",
    stats: "Inclusive Education",
    tag: "Education",
    tagColor: "bg-yellow-500"
  },
  {
    id: 13,
    title: "Orthopaedic Health Checkup Camp",
    description: "An Orthopaedic Health checkup was organized at Indira Gramin School, Pandharkawada, in collaboration with Dhariwal Infrastructure Limited and Pahel Multipurpose Society. Residents from Wadha, Pandharkawada, Sonegaon, Yerur, Shegaon, Tadali, Morwa, and Dhanora villages attended. The camp was led by Dr. Nikhil Gohokar (President, MVMD) and Dr. Anish Nair (Chief Manager, Dhariwal Infrastructure). 65 citizens received orthopaedic consultations.",
    images: [
      "images/gallery/ortho_camp/1.jpg",
      "images/gallery/ortho_camp/2.jpg",
      "images/gallery/ortho_camp/3.jpg"
    ],
    icon: <Bone />,
    location: "Indira Gramin School, Pandharkawada",
    stats: "65 Citizens Examined",
    tag: "Healthcare",
    tagColor: "bg-red-500"
  },
  {
    id: 14,
    title: "Menstrual Health Awareness for Girls",
    description: "A Health Awareness Program was conducted at Indira Gramin School, Pandharkawada, specifically targeting adolescent girls. The program encompassed comprehensive guidance on menstrual health and hygiene. A total of 40 adolescent girls participated in the session, learning about healthy practices and breaking the stigma around menstrual health.",
    images: [
      "images/gallery/menstrual_health/1.jpg",
      "images/gallery/menstrual_health/2.jpg",
      "images/gallery/menstrual_health/3.jpg",
      "images/gallery/menstrual_health2/1.jpg",
      "images/gallery/menstrual_health2/2.jpg",
      "images/gallery/menstrual_health2/3.jpg"
    ],
    icon: <Ribbon />,
    location: "Indira Gramin School & New English HS, Pandharkawada",
    stats: "40+ Girls Educated",
    tag: "Women's Health",
    tagColor: "bg-pink-500"
  },
  {
    id: 15,
    title: "Navratri Drawing Competition",
    description: "On the vibrant occasion of Navratri, we organized a joyful drawing competition for students. The event celebrated art and culture while encouraging creativity and self-expression among village children. The enthusiasm and talent displayed by the young artists was truly inspiring.",
    images: [
      "images/gallery/navratri/1.jpg",
      "images/gallery/navratri/2.jpg",
      "images/gallery/navratri/3.jpg"
    ],
    icon: <Palette />,
    location: "Chandrapur District",
    stats: "Art & Culture",
    tag: "Community",
    tagColor: "bg-amber-500"
  },
  {
    id: 16,
    title: "Navratri Rangoli Competition for Women",
    description: "Under the My Village My Dream initiative, a Rangoli competition was organized for women on the occasion of Navratri. The event saw enthusiastic participation from women across the village, showcasing traditional art forms and fostering community bonding through cultural celebration.",
    images: [
      "images/gallery/rangoli/1.jpg",
      "images/gallery/rangoli/2.jpg",
      "images/gallery/rangoli/3.jpg"
    ],
    icon: <Sparkles />,
    location: "Chandrapur District",
    stats: "Women's Engagement",
    tag: "Community",
    tagColor: "bg-amber-500"
  }
];

const ImageCarousel: React.FC<{ images: string[], title: string }> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (images.length <= 1) return;
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [currentIndex, images.length]);

  if (images.length <= 1) {
    return (
      <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-gray-100">
        <img loading="lazy" src={images[0]} alt={title} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="h-64 sm:h-72 w-full overflow-hidden relative group bg-gray-100">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img loading="lazy" src={img} alt={`${title} - ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute top-1/2 left-2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute top-1/2 right-2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.length <= 8 && images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
              idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
            }`}
          />
        ))}
        {images.length > 8 && (
          <div className="text-white text-xs font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

const Programs: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { name: 'All', colorClass: 'bg-gray-100 text-gray-700', dotClass: 'bg-gray-500' },
    { name: 'Healthcare', colorClass: 'bg-red-100 text-red-700', dotClass: 'bg-red-500' },
    { name: "Women's Health", colorClass: 'bg-pink-100 text-pink-700', dotClass: 'bg-pink-500' },
    { name: 'Student Wellness', colorClass: 'bg-blue-100 text-blue-700', dotClass: 'bg-blue-500' },
    { name: 'Anti-Addiction', colorClass: 'bg-purple-100 text-purple-700', dotClass: 'bg-purple-500' },
    { name: 'Wellness', colorClass: 'bg-green-100 text-green-700', dotClass: 'bg-green-500' },
    { name: 'Education', colorClass: 'bg-yellow-100 text-yellow-700', dotClass: 'bg-yellow-500' },
    { name: 'Community', colorClass: 'bg-amber-100 text-amber-700', dotClass: 'bg-amber-500' },
  ];

  const filteredPrograms = activeCategory === 'All'
    ? programs
    : programs.filter(p => p.tag === activeCategory);

  return (
    <div className="bg-ngo-beige min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="inline-block bg-orange-100 rounded-full px-4 py-1 text-sm font-semibold text-ngo-maroon mb-4">
            Our Work in Action
          </div>
          <h1 className="font-serif text-4xl font-bold text-gray-900 sm:text-5xl">Our Programs</h1>
          <p className="mt-3 text-lg font-semibold text-ngo-maroon">Programs built around real village needs.</p>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our programs span preventive healthcare, nutrition, student wellness, addiction prevention, women's health, sanitation, inclusion, livelihoods, and community engagement. Each initiative is designed to be practical, locally relevant, respectful, prevention-focused, partnership-based, and capable of continuing through local involvement.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.name
                    ? 'ring-2 ring-offset-2 ring-ngo-teal shadow-md ' + cat.colorClass
                    : cat.colorClass + ' opacity-70 hover:opacity-100 cursor-pointer'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${cat.dotClass}`}></span> {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-orange-50 hover:shadow-xl transition-all duration-300 flex flex-col h-full">

              <div className="relative">
                <ImageCarousel images={program.images} title={program.title} />
                <div className={`absolute top-4 left-4 z-20 ${program.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm`}>
                  {program.tag}
                </div>
                <div className="absolute top-4 right-4 z-20 bg-black/50 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                  {program.images.length} {program.images.length === 1 ? 'photo' : 'photos'}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-orange-50 rounded-lg text-ngo-orange border border-orange-100 shadow-sm">
                    {React.cloneElement(program.icon as React.ReactElement<any>, { size: 18 })}
                  </div>
                  <span className="text-xs font-bold text-ngo-maroon bg-red-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-red-100">
                    {program.stats}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-ngo-teal transition-colors">{program.title}</h3>

                <div className="flex items-center text-xs font-medium text-gray-500 mb-3">
                  <MapPin size={14} className="mr-1 text-ngo-teal flex-shrink-0" />
                  {program.location}
                </div>

                <p className="text-gray-600 leading-relaxed text-sm flex-1 border-t border-gray-100 pt-4">
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Impact Section */}
        <div className="mt-16 bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-40">
            <img loading="lazy" src="images/programs/global_impact.jpg" className="w-full h-full object-cover" alt="Global Impact" />
          </div>
          <div className="relative z-10 p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Global Expertise, Local Impact</h2>
            <p className="text-gray-200 text-lg max-w-3xl mx-auto font-medium">
              Our founder brings global medical expertise to rural India. The "ER Can Wait" presentation at the Massleague conference was designated as a 'Great Session', underlining our philosophy that primary prevention in villages saves lives more effectively than emergency intervention in cities.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Programs;
