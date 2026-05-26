import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Volunteer', path: '/volunteer' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col sticky top-0 z-50">
      <div className="bg-[#E89F71] text-white text-center py-2 text-sm font-medium px-4">
        Thank you for your support! Together we build stronger villages.
      </div>

      <nav className="bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                 <img loading="lazy" src="images/logo.png" alt="My Village My Dream Logo" className="w-12 h-12 object-contain" />
                <span className="font-extrabold text-2xl text-gray-900 tracking-tight">My Village My Dream</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold transition-colors ${
                    isActive(link.path)
                      ? 'text-ngo-maroon'
                      : 'text-gray-600 hover:text-ngo-maroon'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contribute"
                className="ml-2 px-8 py-3 rounded-full bg-ngo-maroon text-white text-sm font-bold hover:bg-red-900 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Heart size={16} fill="currentColor" />
                Contribute
              </Link>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-ngo-maroon focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'text-ngo-maroon bg-orange-50'
                      : 'text-gray-600 hover:text-ngo-maroon hover:bg-orange-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contribute"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 rounded-md bg-ngo-maroon text-white font-medium hover:bg-red-900 transition-colors"
              >
                Contribute
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
