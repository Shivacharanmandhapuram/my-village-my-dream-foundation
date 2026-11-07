import React, { useRef } from 'react';
import { Quote, PlayCircle } from 'lucide-react';

// Student testimonial videos (public/videos). Only first names are shown — the speakers are minors.
const voices = [
  {
    name: 'Mizba',
    school: 'Indira Gandhi Vidyalaya, Padoli, Chandrapur',
    program: 'Medha Yoga Level 1 · Sudarshan Kriya',
    video: 'videos/student-voice-mizba.mp4',
    poster: 'videos/student-voice-mizba.jpg',
    quote: 'I never used to understand mathematics. Since doing the concentration pranayama, I remember cubes, roots, and examples.',
    highlight: 'Earlier my head would hurt about eight times a day. Now it does not hurt.',
  },
  {
    name: 'Saket',
    school: 'Indira Gandhi Vidyalaya, Padoli, Chandrapur',
    program: 'Student wellness session',
    video: 'videos/student-voice-saket.mp4',
    poster: 'videos/student-voice-saket.jpg',
    quote: 'After doing it, I felt calm and peaceful. Everything I learned was very helpful for my studies.',
    highlight: 'Earlier, I felt like giving up and leaving. Now I feel like staying longer.',
  },
];

const StudentVoices: React.FC<{ className?: string }> = ({ className = '' }) => {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  // Play one video at a time.
  const onPlay = (i: number) => refs.current.forEach((v, j) => j !== i && v && !v.paused && v.pause());

  return (
    <section className={className} aria-labelledby="student-voices-heading">
      <div className="text-center mb-12">
        <div className="inline-block bg-orange-100 rounded-full px-4 py-1 text-sm font-semibold text-ngo-maroon mb-4">
          Student Voices
        </div>
        <h2 id="student-voices-heading" className="text-3xl md:text-4xl font-bold text-gray-900">In their own words</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Students from our breathing, Medha Yoga and student-wellness sessions in Chandrapur district share what changed for them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {voices.map((v, i) => (
          <figure key={v.name} className="bg-white rounded-3xl border border-orange-50 shadow-sm overflow-hidden grid grid-cols-1 sm:grid-cols-[minmax(0,220px)_1fr]">
            <div className="relative bg-gray-900 aspect-[9/16] sm:aspect-auto">
              <video
                ref={(el) => { refs.current[i] = el; }}
                src={v.video}
                poster={v.poster}
                controls
                playsInline
                preload="none"
                onPlay={() => onPlay(i)}
                className="absolute inset-0 w-full h-full object-cover"
                aria-label={`${v.name} talks about the programme`}
              />
            </div>
            <figcaption className="p-6 flex flex-col">
              <Quote className="text-ngo-orange mb-3" size={28} aria-hidden="true" />
              <p className="text-gray-900 font-semibold leading-relaxed">“{v.highlight}”</p>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">“{v.quote}”</p>
              <div className="mt-auto pt-5 border-t border-gray-100">
                <p className="font-bold text-gray-900">{v.name}</p>
                <p className="text-sm text-gray-500">{v.school}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-ngo-teal">
                  <PlayCircle size={14} /> {v.program}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default StudentVoices;
