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
            <p className="text-ngo-orange font-semibold text-sm mb-2">Connecting Bharat to India</p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering villages through preventive health screening, wellness education, addiction prevention and recovery support, sanitation, nutrition, inclusion, livelihood development, and direct community outreach.
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
                { name: 'Contact', path: '/about' },
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
                  Opposite Government Hospital<br />
                  Main Road<br />
                  Chandrapur, Maharashtra 442401<br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-ngo-orange flex-shrink-0" />
                <a href="mailto:mvmdstaff@gmail.com" className="text-gray-400 hover:text-ngo-orange transition-colors text-sm">
                  mvmdstaff@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-ngo-orange flex-shrink-0" />
                <a href="tel:+919970681002" className="text-gray-400 hover:text-ngo-orange transition-colors text-sm">+91 99706 81002</a>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Trust & Transparency</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p>Registration: MAHA/699/2025</p>
              <p>F-17219 (CDP)</p>
              <div className="pt-4 border-t border-gray-800 mt-4">
                <p className="text-gray-500 text-xs leading-relaxed">
                  My Village My Dream is committed to responsible governance, respectful community partnerships, accurate reporting, and transparent use of resources.
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
              Connecting Bharat to India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
