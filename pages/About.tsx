import React from 'react';
import { ExternalLink, Heart, BookOpen, Shield, Users, Stethoscope, Target, Eye } from 'lucide-react';

const milestones = [
  { year: "2014", title: "Foundation Established", description: "Dr. Nikhil Gohokar registered My Village My Dream Foundation with a mission to transform rural villages in Vidarbha." },
  { year: "2015", title: "First Medical Camp", description: "Organized the first joint injection camp in Pandharkawada, providing pain relief to elderly manual laborers." },
  { year: "2017", title: "Screening Drive Launched", description: "Began systematic BP, diabetes, and malnutrition screening across 7 villages in Chandrapur district." },
  { year: "2019", title: "Education Initiative", description: "Launched the Village Tuition Program, employing 30 local teachers across 10 villages." },
  { year: "2021", title: "Breathing Program Expansion", description: "Introduced Sudarshan Kriya and Pranayam programs for 2,000+ students in Yavatmal schools." },
  { year: "2023", title: "Anti-Addiction Campaign", description: "Partnered with schools to run addiction prevention sessions reaching children from 1st to 12th standard." },
  { year: "2024", title: "Navachetna Shibir Launch", description: "Organized community yoga and meditation camps in collaboration with the Art of Living." },
  { year: "2025", title: "9,500+ Lives Touched", description: "Reached the milestone of screening 9,500+ villagers and expanding to 10+ active villages." },
];

const values = [
  { icon: <Heart size={24} />, title: "Community First", description: "We believe sustainable progress begins within the village itself — led by its own people." },
  { icon: <Shield size={24} />, title: "Prevention Over Cure", description: "From health screenings to addiction awareness, we focus on preventing problems before they start." },
  { icon: <BookOpen size={24} />, title: "Education as Foundation", description: "Every child deserves quality education regardless of where they are born." },
  { icon: <Users size={24} />, title: "Inclusive Impact", description: "Our programs serve everyone — from special needs children to elderly community members." },
];

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero / Mission Section */}
      <div className="bg-ngo-beige py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-100/30 rounded-l-full blur-3xl -z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block bg-orange-100 rounded-full px-4 py-1 text-sm font-semibold text-ngo-maroon mb-6">
            Who We Are
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 max-w-4xl leading-tight">
            We Are a Team Creating Change in Rural India
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="text-gray-600 text-lg leading-relaxed">
              <p className="mb-4">
                My Village My Dream Foundation was born from a simple observation: the children of rural India deserve the same opportunities as those born in cities. Founded by Dr. Nikhil Gohokar, we work at the grassroots level in Vidarbha's villages — areas affected by farmer crises and insurgency — to bridge the urban-rural divide through healthcare, education, and community wellness.
              </p>
              <p>
                Our team consists of local changemakers, youth leaders, educators, Ayurvedic practitioners, and volunteers who understand village life because they live it. We don't impose solutions from outside — we build capacity from within.
              </p>
            </div>
            <div className="text-gray-800 text-xl font-medium leading-relaxed border-l-4 border-ngo-orange pl-6">
              "Our vision is rooted in one belief: progress becomes possible when communities, leaders, and volunteers work together. By combining local knowledge with compassionate action, we create long-lasting change in health, education, and livelihoods."
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-ngo-maroon/10 rounded-xl text-ngo-maroon">
                  <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To transform rural villages into self-reliant communities by providing accessible healthcare, quality education, addiction prevention, and wellness programs — ensuring that no villager is left behind due to geography or poverty.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-ngo-teal/10 rounded-xl text-ngo-teal">
                  <Eye size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                A rural India where every village child completes their education, every family has access to preventive healthcare, and every community has the tools to lead a healthy, addiction-free, and dignified life.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-orange-200 pt-12">
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold text-ngo-orange mb-2">9,500+</div>
              <div className="text-gray-700 font-medium">Villagers screened for BP, diabetes & malnutrition</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold text-ngo-orange mb-2">2,000+</div>
              <div className="text-gray-700 font-medium">Students in wellness & breathing programs</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold text-ngo-orange mb-2">16</div>
              <div className="text-gray-700 font-medium">Active programs across 8+ villages</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-bold text-ngo-orange mb-2">30</div>
              <div className="text-gray-700 font-medium">Local teachers employed in tuition program</div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-teal-50 rounded-full px-4 py-1 text-sm font-semibold text-ngo-teal mb-4">
              What Drives Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-ngo-beige rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-orange-50">
                <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl text-ngo-orange shadow-sm mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder Bio */}
      <div className="bg-ngo-beige py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-orange-100">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 bg-gray-100 relative h-96 md:h-auto">
                <img
                  className="h-full w-full object-cover"
                  src="images/founder.jpg"
                  alt="Dr. Nikhil Gohokar"
                />
              </div>
              <div className="p-8 sm:p-12 md:w-2/3 flex flex-col justify-center">
                <div className="uppercase tracking-wide text-sm text-ngo-maroon font-bold mb-2">Founder</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Dr. Nikhil Gohokar</h2>
                <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                  <p>
                    Dr. Nikhil Gohokar is a visionary leader with a deep personal connection to rural Maharashtra. Having witnessed firsthand the struggles of farming communities — the lack of basic healthcare, the cycle of addiction, the educational gaps — he dedicated his career to bridging the urban-rural divide.
                  </p>
                  <p>
                    With a background in medicine and global healthcare experience, Dr. Gohokar brings a unique approach: combining modern medical practices with community-driven solutions. His "ER Can Wait" presentation at the Massleague conference was recognized as a 'Great Session', underlining his philosophy that primary prevention in villages saves lives more effectively than emergency intervention in cities.
                  </p>
                  <p>
                    Under his leadership, the foundation has established a core team managing grants and expanding programs across Chandrapur, Yavatmal, and Nagpur districts — from joint injection camps for the elderly to Sudarshan Kriya for school children.
                  </p>
                  <p className="font-medium text-gray-900 italic text-xl">
                    "Our dream is simple: To ensure that a child born in a village has the same opportunities to succeed as a child born in a city. We are building that bridge, one village at a time."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency & Governance */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-teal-50 rounded-full px-4 py-1 text-sm font-semibold text-ngo-teal mb-4">
              Transparency & Trust
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">Governance & Accountability</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We are committed to operating with complete transparency so you know exactly where your contributions go.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Registration Details */}
            <div className="bg-ngo-beige rounded-2xl p-8 border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="text-ngo-teal mr-3" size={28} /> Legal Status
              </h3>
              <div className="space-y-4 text-gray-700 text-lg">
                <div className="flex justify-between border-b border-orange-200 pb-2">
                  <span className="font-semibold">Registered NGO:</span>
                  <span>Section 8 Company</span>
                </div>
                <div className="flex justify-between border-b border-orange-200 pb-2">
                  <span className="font-semibold">80G Status:</span>
                  <span className="text-ngo-teal font-bold">Approved</span>
                </div>
                <div className="flex justify-between border-b border-orange-200 pb-2">
                  <span className="font-semibold">12A Status:</span>
                  <span className="text-ngo-teal font-bold">Approved</span>
                </div>
                <p className="text-sm text-gray-500 italic mt-4">
                  * All donations are eligible for tax deductions in India under Section 80G of the Income Tax Act.
                </p>
              </div>
            </div>

            {/* Where Your Money Goes - Infographic Style */}
            <div className="bg-ngo-teal text-white rounded-2xl p-8 shadow-lg">
               <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Heart className="text-ngo-orange mr-3" size={28} /> Where Your Money Goes
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Direct Program Costs (Healthcare/Education)</span>
                    <span className="font-bold">90%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-ngo-orange h-3 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Community Outreach & Events</span>
                    <span className="font-bold">7%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-white h-3 rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">Administrative Overhead</span>
                    <span className="font-bold">3%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-gray-300 h-3 rounded-full" style={{ width: '3%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 rounded-full px-4 py-1 text-sm font-semibold text-ngo-maroon mb-4">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Milestones That Matter</h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 transform md:-translate-x-1/2"></div>

            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-start mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-ngo-orange rounded-full border-4 border-white shadow-md transform -translate-x-1/2 mt-1.5 z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-ngo-beige rounded-2xl p-6 shadow-sm border border-orange-50 hover:shadow-md transition-shadow">
                    <div className="text-ngo-orange font-bold text-lg mb-1">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas of Operation */}
      <div className="bg-ngo-teal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where We Work</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Our operations span across three districts in eastern Maharashtra's Vidarbha region.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope className="text-white" size={24} />
                <h3 className="text-xl font-bold text-white">Chandrapur District</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                Our primary hub — villages including Pandharkawada, Wadha, Dhanora, Sonegaon, Yerur, Shegaon, Tadali, and Morwa. Home to our medical camps, village screening, tuition programs, and anti-addiction drives.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-white" size={24} />
                <h3 className="text-xl font-bold text-white">Yavatmal District</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                Where our student wellness programs thrive — Punwat and Mardi villages. Sudarshan Kriya and breathing programs reach 2,000+ students across schools here.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-white" size={24} />
                <h3 className="text-xl font-bold text-white">Nagpur District</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                Home to our special needs education sponsorship at the Deaf & Dumb school in Saoner, supporting inclusive education through Art of Living programs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
