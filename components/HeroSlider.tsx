import React, { useState, useEffect } from 'react';

// Relative paths
const images = [
  "images/hero/slider_1.jpg",
  "images/hero/slider_2.jpg",
  "images/hero/slider_3.jpg"
];

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden shadow-2xl bg-gray-100" style={{
      clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 0 100%)",
      borderRadius: "0 0 0 30px"
    }}>
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <img
            src={img}
            alt="Impact"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-8 flex space-x-2 z-10">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white w-8' : 'bg-white/60 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;