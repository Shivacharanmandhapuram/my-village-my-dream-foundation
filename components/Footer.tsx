import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img loading="lazy" src="images/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              <span className="font-bold text-xl text-white">My Village My Dream</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Transforming rural villages into self-reliant communities through healthcare, education, addiction prevention, and wellness programs across Maharashtra.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61577594464613" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-800 hover:bg-ngo-orange rounded-full text-gray-400 hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2.5 bg-gray-800 hover:bg-ngo-orange rounded-full text-gray-400 hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2.5 bg-gray-800 hover:bg-ngo-orange rounded-full text-gray-400 hover:text-white transition-all duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Our Programs', path: '/programs' },
                { name: 'Impact Gallery', path: '/gallery' },
                { name: 'Events & Activities', path: '/events' },
                { name: 'About Us', path: '/about' },
                { name: 'Volunteer', path: '/volunteer' },
                { name: 'Contribute', path: '/contribute' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-ngo-orange transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-ngo-orange mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  AT POST KOTHARI, TH BALLARPUR<br />
                  DIST CHANDRAPUR 442701<br />
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-ngo-orange flex-shrink-0" />
                <a href="mailto:contact@myvillagemydream.org" className="text-gray-400 hover:text-ngo-orange transition-colors text-sm">
                  contact@myvillagemydream.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-ngo-orange flex-shrink-0" />
                <a href="tel:+919225520074" className="text-gray-400 hover:text-ngo-orange transition-colors text-sm">092255 20074</a>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Trust & Transparency</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>Registered under the Indian Trust Act</p>
              <p>Eligible for 80G Tax Exemption</p>
              <p>12A Registration: Active</p>
              <div className="pt-4 border-t border-gray-800 mt-4">
                <p className="text-gray-500 text-xs leading-relaxed">
                  100% of your contributions go directly to our village programs. We maintain complete financial transparency and publish annual reports.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} My Village My Dream Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-xs text-gray-500 hover:text-ngo-orange transition-colors">
              Privacy Policy
            </Link>
            <p className="text-xs text-gray-600">
              Made with purpose for rural India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
