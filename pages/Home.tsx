import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Users, MapPin, Quote, HandHeart, ExternalLink } from 'lucide-react';
import CountUp from '../components/CountUp';
import HeroSlider from '../components/HeroSlider';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleProgramClick = () => {
    navigate('/programs');
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <div id="hero" className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" aria-hidden="true" />
        
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-8">
                Connecting Bharat to India
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed font-normal max-w-lg">
                Empowering villages to become healthier, stronger, and more self-reliant.
                <br /><br />
                My Village My Dream is a community-led rural development platform helping villagers take ownership of their community's future.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <Link
                  to="/volunteer"
                  className="flex items-center justify-center px-10 py-5 rounded-full text-white bg-ngo-teal hover:bg-[#4a857c] font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                >
                  <HandHeart size={20} className="mr-2 fill-current" />
                  Join the Movement
                </Link>
                <Link
                  to="/programs"
                  className="flex items-center justify-center px-10 py-5 rounded-full border-2 border-ngo-teal text-ngo-teal bg-transparent hover:bg-ngo-teal hover:text-white font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                >
                  Explore Our Programs
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end mt-12 lg:mt-0 relative">
               <div className="w-full max-w-md relative z-10 transform transition-transform duration-500 hover:scale-[1.01]">
                   <HeroSlider />
                   
                   <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 max-w-[200px] hidden md:block">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-100 rounded-full text-ngo-orange">
                          <Users size={20} />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">Lives Touched</span>
                      </div>
                      <div className="text-3xl font-bold text-gray-900">
                        <CountUp end={9.5} suffix="k+" decimals={1} />
                      </div>
                   </div>
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mission & Stats (Who We Are) */}
      <div id="mission" className="bg-ngo-beige py-[72px] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-0">
            <div className="inline-block bg-orange-100 rounded-full px-4 py-1 text-sm font-semibold text-ngo-maroon mb-3">
              Who We Are
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 max-w-4xl">
              Local knowledge. Shared responsibility. Lasting change.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="text-gray-600 text-lg leading-relaxed">
                My Village My Dream works with villagers—not simply for villagers. We identify needs together, involve local people in planning and delivery, and develop programs that strengthen preventive health, nutrition, sanitation, wellness, inclusion, livelihoods, and community confidence.
                <br /><br />
                Our health work focuses on bringing early screening and understandable education closer to rural families, especially for conditions that may remain silent until complications develop.
              </div>
              <div className="text-gray-800 text-xl font-medium leading-relaxed border-l-4 border-ngo-orange pl-6">
                "Our vision is rooted in one belief: progress becomes possible when communities, leaders, and volunteers work together. By combining local knowledge with compassionate action, we create long-lasting change in health, education, and livelihoods."
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-orange-200 pt-16">
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-bold text-ngo-orange mb-3">
                  <CountUp end={9500} suffix="+" duration={2500} />
                </div>
                <div className="text-gray-700 font-medium text-lg">People screened or reached through health activities</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-bold text-ngo-orange mb-3">
                  <CountUp end={2000} suffix="+" duration={2500} />
                </div>
                <div className="text-gray-700 font-medium text-lg">Students reached through wellness & breathing programs</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-bold text-ngo-orange mb-3">
                  <CountUp end={10} suffix="+ Villages" duration={2500} />
                </div>
                <div className="text-gray-700 font-medium text-lg">Where our initiatives are active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Impact Stories (Initiatives) */}
      <div id="initiatives" className="bg-white py-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 rounded-full px-4 py-1 text-sm font-semibold text-ngo-maroon mb-4">
              Our Initiatives
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Impact in Action</h2>
            <p className="mt-4 text-xl text-gray-600">Every initiative begins with a real need identified by villagers and local partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
            {/* Poster 1: Breathing (Large) */}
            <div 
              onClick={handleProgramClick}
              className="lg:col-span-2 lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img loading="lazy" src="images/programs/breathing.jpg" alt="Breathing Exercises" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <div className="bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">Student Wellness</div>
                <h3 className="text-3xl font-bold mb-2">Breathing & Focus Program</h3>
                <p className="text-gray-200 line-clamp-2 mb-4">Teaching Pranayam to 2,000+ students in Punwat to improve mental health and focus.</p>
                <div className="flex items-center text-sm font-medium text-blue-200">
                  <MapPin size={16} className="mr-1" /> Yavatmal Dist.
                </div>
              </div>
            </div>

            {/* Poster 2: Tuition (Tall) */}
            <div 
              onClick={handleProgramClick}
              className="lg:col-span-1 lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img loading="lazy" src="images/programs/tuition.jpg" alt="Village Tuition" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="bg-yellow-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">Education</div>
                <h3 className="text-xl font-bold mb-2">Village Tuition Centers</h3>
                <p className="text-gray-200 text-sm mb-3">30 teachers across 10 villages enhancing education quality.</p>
                <div className="flex items-center text-sm font-medium text-yellow-200">
                  <MapPin size={16} className="mr-1" /> Chandrapur
                </div>
              </div>
            </div>

            {/* Poster 3: Medical Screening */}
            <div 
              onClick={handleProgramClick}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img loading="lazy" src="images/programs/screening.jpg" alt="Health Screening" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="bg-red-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">Healthcare</div>
                <h3 className="text-lg font-bold">BP & Diabetes Screening</h3>
                <p className="text-xs text-gray-300 mt-1">Reaching 9,500+ villagers.</p>
              </div>
            </div>

             {/* Poster 4: Alcohol Cessation */}
             <div 
              onClick={handleProgramClick}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img loading="lazy" src="images/programs/alcohol_cessation.jpg" alt="Support Group" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="bg-purple-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">Community</div>
                <h3 className="text-lg font-bold">Alcohol Cessation</h3>
                <p className="text-xs text-gray-300 mt-1">Transforming habits in Vihirgaon.</p>
              </div>
            </div>

             {/* Poster 5: Joint Injection */}
             <div 
              onClick={handleProgramClick}
              className="lg:col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img loading="lazy" src="images/programs/joint_camp.jpg" alt="Medical Camp" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white flex flex-col justify-end h-full">
                <div>
                   <div className="bg-teal-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">Pain Relief</div>
                   <h3 className="text-xl font-bold">Joint Injection Camps</h3>
                   <p className="text-sm text-gray-200 mt-1 max-w-md">Providing long-term pain relief for knee, back, and shoulder issues in underserved rural areas.</p>
                </div>
              </div>
            </div>

             {/* Poster 6: Special Needs */}
             <div 
              onClick={handleProgramClick}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img loading="lazy" src="images/programs/special_needs.jpg" alt="Special Education" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="bg-pink-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">Sponsorship</div>
                <h3 className="text-lg font-bold">Deaf & Dumb School</h3>
                <p className="text-xs text-gray-300 mt-1">Saoner, Nagpur</p>
              </div>
            </div>

            {/* Poster 7: Founder's Global Impact */}
             <div 
              onClick={handleProgramClick}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-gray-900"
            >
              <img loading="lazy" src="images/programs/global_impact.jpg" alt="Conference" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="bg-gray-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">Leadership</div>
                <h3 className="text-lg font-bold">Global Impact</h3>
                <p className="text-xs text-gray-300 mt-1">Recognized at Massleague.</p>
              </div>
            </div>

          </div>
          
          <div className="mt-12 text-center">
            <Link to="/programs" className="inline-flex items-center text-ngo-maroon font-bold hover:text-red-800 transition-colors">
              View All Programs <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Voices from the Village (Testimonials) */}
      <div id="testimonials" className="bg-ngo-teal py-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
                Our Reach
              </h2>
              <Link to="/volunteer" className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors shadow-md">
                Read More
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white/50 rounded-2xl p-8 flex flex-col h-full bg-white/5 transition-colors hover:bg-white/10">
                 <p className="text-white text-lg leading-relaxed flex-1">
                   9,500+ people screened or reached through health activities
                 </p>
              </div>
              <div className="border border-white/50 rounded-2xl p-8 flex flex-col h-full bg-white/5 transition-colors hover:bg-white/10">
                 <p className="text-white text-lg leading-relaxed flex-1">
                   2,000+ students reached through breathing, focus, and wellness programs
                 </p>
              </div>
              <div className="border border-white/50 rounded-2xl p-8 flex flex-col h-full bg-white/5 transition-colors hover:bg-white/10">
                 <p className="text-white text-lg leading-relaxed flex-1">
                   10+ villages connected through active initiatives
                 </p>
              </div>
              <div className="border border-white/50 rounded-2xl p-8 flex flex-col h-full bg-white/5 transition-colors hover:bg-white/10">
                 <p className="text-white text-lg leading-relaxed flex-1">
                   13 active or developing program areas across health, wellness, inclusion, sanitation, addiction prevention, livelihoods, and community engagement
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* 5. Founder Bio */}
      <div id="founder" className="bg-white py-[72px]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-ngo-warm-gray shadow-xl rounded-2xl overflow-hidden border border-orange-100">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/3 bg-gray-100 relative h-96 md:h-auto">
                {/* Relative path used here */}
                <img
                  className="h-full w-full object-cover"
                  src="images/founder.jpg"
                  alt="Dr. Nikhil Gohokar"
                />
              </div>
              <div className="p-8 sm:p-12 md:w-2/3 flex flex-col justify-center">
                <div className="uppercase tracking-wide text-sm text-ngo-maroon font-bold mb-2">Founder</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Dr. Nikhil Gohokar</h3>
                <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                  <p>
                    Dr. Nikhil Gohokar is a physician and social-impact leader with a deep connection to Vidarbha. Having witnessed the effects of limited healthcare access, undiagnosed chronic disease, childhood malnutrition, addiction, and economic hardship, he helped create a team dedicated to bridging the divide between rural Bharat and urban India.
                  </p>
                  <p className="font-medium text-gray-900 italic">
                    "Our dream is simple: To ensure that a child born in a village has the same opportunities to succeed as a child born in a city."
                  </p>
                </div>
                
                <div className="mt-8">
                  <a 
                    href="https://blessingsmedical.org/about/nikhil" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-ngo-maroon text-base font-bold rounded-full text-ngo-maroon bg-white hover:bg-ngo-maroon hover:text-white transition-all duration-300 shadow-sm"
                  >
                    Know More About Dr. Gohokar
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
         </div>
      </div>

      {/* 6. Map Section (Footprint) */}
      <div id="footprint" className="bg-ngo-beige py-[72px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/50 rounded-l-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
               <div className="inline-block bg-teal-50 rounded-full px-4 py-1 text-sm font-semibold text-ngo-teal mb-6">
                Our Footprint
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Rooted in Maharashtra, <br />
                <span className="text-ngo-orange">Expanding Hope.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We started our journey in the rural heartlands of Maharashtra. Today, our mobile health units and education volunteers cover over 10 villages in the region.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100 text-ngo-maroon">
                      <MapPin size={16} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Headquarters</h4>
                    <p className="text-gray-500">Vidarbha region, Maharashtra</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-100 text-ngo-teal">
                      <Users size={16} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">Active Zones</h4>
                    <p className="text-gray-500">10+ villages with weekly educational & health camps.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[500px] flex items-center justify-center">
              <svg 
                viewBox="0 0 400 500" 
                className="w-full h-full max-w-md drop-shadow-2xl"
                style={{ filter: "drop-shadow(0px 20px 30px rgba(232, 159, 113, 0.2))" }}
              >
                <path 
                  d="M135.5,50 C145,45 155,40 160,30 C165,35 175,35 180,45 C190,45 195,50 200,60 C205,70 230,75 240,80 C250,85 270,90 280,100 C275,110 260,115 250,120 C240,125 245,135 250,140 C260,145 270,140 280,135 C290,130 310,125 320,135 C330,145 320,160 310,170 C300,180 290,175 285,185 C280,195 275,210 270,220 C265,230 250,235 240,240 C230,245 220,260 215,270 C210,280 205,300 200,310 C195,320 190,340 185,350 C180,360 175,380 170,400 C165,420 160,430 155,440 C150,430 145,410 140,390 C135,370 120,350 115,330 C110,310 100,290 95,270 C90,250 80,240 75,230 C70,220 60,210 55,200 C60,190 70,185 80,180 C90,175 100,160 105,150 C110,140 105,130 100,120 C95,110 90,100 95,90 C100,80 110,75 120,70 C125,60 130,55 135.5,50 Z" 
                  fill="#ffffff" 
                  stroke="#E89F71" 
                  strokeWidth="2"
                />
                <g transform="translate(130, 230)">
                  <circle cx="0" cy="0" r="10" className="fill-ngo-maroon opacity-20 animate-ping" />
                  <circle cx="0" cy="0" r="10" className="fill-ngo-maroon opacity-20 animate-ping delay-75" />
                  <circle cx="0" cy="0" r="4" className="fill-ngo-maroon" />
                  <foreignObject x="15" y="-30" width="160" height="70">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-orange-100 text-xs transform transition-all hover:scale-105 cursor-pointer">
                      <div className="font-bold text-gray-900 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Maharashtra
                      </div>
                      <div className="text-gray-500 mt-1">
                        Hub of Operations <br/>
                        <span className="font-semibold text-ngo-orange">10 Villages</span>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 7. CTA / Sponsorship Section */}
      <div id="cta" className="bg-white py-[72px]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-ngo-orange rounded-[2.5rem] px-6 py-16 md:p-24 text-center shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
             </div>
             
             <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                  Delivering Help And Hope To Children Through Sponsorship.
                </h2>
                <p className="text-white text-lg md:text-xl mb-10 leading-relaxed font-medium max-w-2xl mx-auto opacity-95">
                  We believe that together, we can create a world that is kinder, more compassionate, and more just. Join us in our mission and help us make a difference today. Thank you for your support!
                </p>
                <Link 
                  to="/volunteer" 
                  className="inline-block bg-white text-gray-900 font-bold text-lg px-12 py-5 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-gray-50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300"
                >
                  Become A Volunteer
                </Link>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;