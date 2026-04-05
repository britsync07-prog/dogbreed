/**
 * Footer Component - Site footer with links
 */

import { Link } from 'react-router-dom';
import { Dog, Heart, Github, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'All Breeds', path: '/breeds' },
      { name: 'Popular Breeds', path: '/breeds?sort=popular' },
      { name: 'Favorites', path: '/favorites' },
    ],
    resources: [
      { name: 'Dog Care Tips', path: '#' },
      { name: 'Training Guides', path: '#' },
      { name: 'Health Information', path: '#' },
    ],
    about: [
      { name: 'About Us', path: '#' },
      { name: 'Contact', path: '#' },
      { name: 'Privacy Policy', path: '#' },
    ],
  };

  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <Dog className="h-8 w-8 text-blue-600" />
              <span>Dog Breed Explorer</span>
            </Link>
            <p className="text-sm text-slate-600">
              Discover your perfect canine companion with our comprehensive dog breed guide. 
              Explore hundreds of breeds with detailed information and photos.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              {currentYear} Dog Breed Explorer. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for dog lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
