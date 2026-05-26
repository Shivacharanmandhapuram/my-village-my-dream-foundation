import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface Photo {
  url: string;
  caption: string;
  category: string;
  location: string;
}

const allPhotos: Photo[] = [
  // Medical Camp & Pain Relief
  { url: "images/gallery/medical_camp/1.jpg", caption: "Medical camp organized for pain relief in Pandharkawada", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/medical_camp/2.jpg", caption: "Providing steroid injections for neck and back pain", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/medical_camp/3.jpg", caption: "Treating patients with chronic knee and shoulder pain", category: "Healthcare", location: "Chandrapur" },
  { url: "images/gallery/medical_camp/4.jpg", caption: "Community members receiving specialized medical care", category: "Healthcare", location: "Pandharkawada" },

  // Screening
  { url: "images/gallery/screening/1.jpg", caption: "Health awareness session for villagers", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/screening/2.jpg", caption: "Blood pressure and blood sugar screening in progress", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/screening/3.jpg", caption: "Educating villagers about disease prevention", category: "Healthcare", location: "Chandrapur" },
  { url: "images/gallery/screening/4.jpg", caption: "Community Q&A on healthy lifestyle choices", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/screening/5.jpg", caption: "Villagers participating in the health education session", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/screening/6.jpg", caption: "BP monitoring during village health camp", category: "Healthcare", location: "Chandrapur" },
  { url: "images/gallery/screening/7.jpg", caption: "Diabetes screening at community health center", category: "Healthcare", location: "Chandrapur" },
  { url: "images/gallery/screening/8.jpg", caption: "Malnutrition assessment during screening drive", category: "Healthcare", location: "Chandrapur" },

  // Breathing & Yoga
  { url: "images/gallery/breathing/1.jpg", caption: "Introducing Sudarshan Kriya at Adarsh High School, Punwat", category: "Wellness", location: "Punwat, Yavatmal" },
  { url: "images/gallery/breathing/2.jpg", caption: "Students learning Medha Yoga at Adarsh High School, Mardi", category: "Wellness", location: "Mardi" },
  { url: "images/gallery/breathing/3.jpg", caption: "Daily Utkarsh Yoga practice for focus and stress relief", category: "Wellness", location: "Mardi" },
  { url: "images/gallery/yoga/1.jpg", caption: "Navachetna Shibir with Art of Living in village Wadha", category: "Wellness", location: "Wadha" },
  { url: "images/gallery/yoga/2.jpg", caption: "Villagers learning Ram Meditation for stress management", category: "Wellness", location: "Wadha" },
  { url: "images/gallery/yoga/3.jpg", caption: "Community wellness session in full swing", category: "Wellness", location: "Wadha" },
  { url: "images/gallery/yoga/4.jpg", caption: "Yoga group discussing healthy lifestyle changes", category: "Wellness", location: "Chandrapur" },
  { url: "images/gallery/yoga/5.jpg", caption: "Interactive session on maintaining mobility with age", category: "Wellness", location: "Chandrapur" },
  { url: "images/gallery/yoga/6.jpg", caption: "Senior community members practicing wellness techniques", category: "Wellness", location: "Chandrapur" },

  // Anti-Addiction
  { url: "images/gallery/cessation/1.jpg", caption: "Anti-addiction session at Janata Mahavidyalaya, Dhanora", category: "Anti-Addiction", location: "Dhanora" },
  { url: "images/gallery/cessation/2.jpg", caption: "Educating students about harmful effects of alcohol", category: "Anti-Addiction", location: "Dhanora" },
  { url: "images/gallery/cessation/3.jpg", caption: "Anti-tobacco awareness for primary school children", category: "Anti-Addiction", location: "Dhanora" },
  { url: "images/gallery/cessation/4.jpg", caption: "Teaching young students to make healthier choices", category: "Anti-Addiction", location: "Dhanora" },
  { url: "images/gallery/anti_addiction/1.jpg", caption: "Children learning about dangers of chewing tobacco", category: "Anti-Addiction", location: "Dhanora" },
  { url: "images/gallery/anti_addiction/2.jpg", caption: "How addiction affects health, family, and future", category: "Anti-Addiction", location: "Dhanora" },
  { url: "images/gallery/anti_addiction/3.jpg", caption: "Building awareness at Zilla Parishad School", category: "Anti-Addiction", location: "Dhanora" },
  { url: "images/gallery/anti_addiction/4.jpg", caption: "Teachers joining the anti-addiction awareness drive", category: "Anti-Addiction", location: "Dhanora" },
  { url: "images/gallery/anti_addiction/5.jpg", caption: "Helping build a tobacco-free future for village children", category: "Anti-Addiction", location: "Dhanora" },

  // Education & Outreach
  { url: "images/gallery/tuition/1.jpg", caption: "Village tuition program providing after-school support", category: "Education", location: "Chandrapur" },
  { url: "images/gallery/tuition/2.jpg", caption: "Students engaged in learning activities at village school", category: "Education", location: "Chandrapur" },
  { url: "images/gallery/mission/1.jpg", caption: "Interacting with Ayurvedic doctors at Dhariwal Industries", category: "Education", location: "Chandrapur" },
  { url: "images/gallery/mission/2.jpg", caption: "Planning healthcare strategies with rural outreach team", category: "Education", location: "Chandrapur" },
  { url: "images/gallery/mission/3.jpg", caption: "Discussing community outreach for 10 surrounding villages", category: "Education", location: "Chandrapur" },
  { url: "images/gallery/mission/4.jpg", caption: "Ensuring real, positive impact on villagers' lives", category: "Education", location: "Chandrapur" },

  // Orthopaedic Camp (from Facebook)
  { url: "images/gallery/ortho_camp/1.jpg", caption: "Orthopaedic health checkup camp at Indira Gramin School", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/ortho_camp/2.jpg", caption: "65 citizens examined in collaboration with Dhariwal Infrastructure", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/ortho_camp/3.jpg", caption: "Dr. Nikhil Gohokar and team providing orthopaedic consultations", category: "Healthcare", location: "Pandharkawada" },

  // Village Screening (from Facebook)
  { url: "images/gallery/village_screening/1.jpg", caption: "Hypertension and diabetes screening — 55 individuals screened", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/village_screening/2.jpg", caption: "Village health screening with BP and sugar monitoring", category: "Healthcare", location: "Pandharkawada" },
  { url: "images/gallery/village_screening/3.jpg", caption: "Yerur village screening — 51 individuals screened", category: "Healthcare", location: "Yerur" },
  { url: "images/gallery/village_screening/4.jpg", caption: "Screening results: tracking hypertension and diabetes", category: "Healthcare", location: "Yerur" },
  { url: "images/gallery/bp_checkup/1.jpg", caption: "Free BP and diabetes check-ups for villagers", category: "Healthcare", location: "Chandrapur" },
  { url: "images/gallery/bp_checkup/2.jpg", caption: "Health awareness and preventive care guidance", category: "Healthcare", location: "Chandrapur" },

  // Menstrual Health (from Facebook)
  { url: "images/gallery/menstrual_health/1.jpg", caption: "Menstrual health awareness for adolescent girls", category: "Women's Health", location: "Pandharkawada" },
  { url: "images/gallery/menstrual_health/2.jpg", caption: "40 girls participated in the hygiene awareness session", category: "Women's Health", location: "Pandharkawada" },
  { url: "images/gallery/menstrual_health/3.jpg", caption: "Breaking stigma around menstrual health in rural areas", category: "Women's Health", location: "Pandharkawada" },
  { url: "images/gallery/menstrual_health2/1.jpg", caption: "Health awareness at New English High School", category: "Women's Health", location: "Pandharkawada" },

  // Chief Guest & Education (from Facebook)
  { url: "images/gallery/chief_guest/1.jpg", caption: "Dr. Nikhil Gohokar providing guidance as chief guest", category: "Education", location: "Pandharkawada" },
  { url: "images/gallery/chief_guest/2.jpg", caption: "Mr. Chandrakant Gohokar addressing students", category: "Education", location: "Pandharkawada" },

  // Navratri & Community Events (from Facebook)
  { url: "images/gallery/navratri/1.jpg", caption: "Navratri drawing competition for village students", category: "Community", location: "Chandrapur" },
  { url: "images/gallery/navratri/2.jpg", caption: "Students showcasing creativity during Navratri celebration", category: "Community", location: "Chandrapur" },
  { url: "images/gallery/navratri/3.jpg", caption: "Young artists expressing talent through art", category: "Community", location: "Chandrapur" },
  { url: "images/gallery/rangoli/1.jpg", caption: "Navratri Rangoli competition for women", category: "Community", location: "Chandrapur" },
  { url: "images/gallery/rangoli/2.jpg", caption: "Women creating traditional Rangoli designs", category: "Community", location: "Chandrapur" },
  { url: "images/gallery/rangoli/3.jpg", caption: "Community bonding through cultural celebration", category: "Community", location: "Chandrapur" },
];

const categories = ["All", "Healthcare", "Women's Health", "Wellness", "Anti-Addiction", "Education", "Community"];

const Lightbox: React.FC<{
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ photos, currentIndex, onClose, onPrev, onNext }) => {
  const photo = photos[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white/80 hover:text-white z-50 p-2">
        <X size={28} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-50"
      >
        <ChevronLeft size={36} />
      </button>

      <div className="max-w-5xl max-h-[85vh] mx-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={photo.url}
          alt={photo.caption}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 text-center px-4">
          <p className="text-white text-lg font-medium">{photo.caption}</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="text-white/50 text-sm flex items-center gap-1">
              <MapPin size={14} /> {photo.location}
            </span>
            <span className="text-white/30">|</span>
            <span className="text-ngo-orange text-sm font-medium">{photo.category}</span>
            <span className="text-white/30">|</span>
            <span className="text-white/50 text-sm">{currentIndex + 1} of {photos.length}</span>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/60 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-50"
      >
        <ChevronRight size={36} />
      </button>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activeCategory === "All"
    ? allPhotos
    : allPhotos.filter(p => p.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev === 0 ? filteredPhotos.length - 1 : prev - 1) : null);
  }, [filteredPhotos.length]);
  const nextPhoto = useCallback(() => {
    setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredPhotos.length : null);
  }, [filteredPhotos.length]);

  // Masonry-style height classes for visual variety
  const heightClasses = [
    "h-64", "h-80", "h-72", "h-64", "h-96", "h-72",
    "h-80", "h-64", "h-72", "h-96", "h-64", "h-80"
  ];

  return (
    <div className="bg-ngo-beige min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 rounded-full px-4 py-1 text-sm font-semibold text-ngo-maroon mb-4">
            Visual Stories
          </div>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Impact Gallery</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Real moments from the field — medical camps, school sessions, community gatherings, and village outreach across Maharashtra.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-ngo-maroon text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-ngo-maroon border border-gray-200'
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-2 text-xs opacity-70">
                  ({allPhotos.filter(p => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Photo Count */}
        <p className="text-center text-gray-500 text-sm mb-8 font-medium">
          Showing {filteredPhotos.length} photos
        </p>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={`${photo.url}-${activeCategory}`}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className={heightClasses[index % heightClasses.length]}>
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-sm font-medium leading-snug">{photo.caption}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={12} className="text-white/60" />
                    <span className="text-white/60 text-xs">{photo.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
};

export default Gallery;
