/**
 * Header Component - Navigation with mobile menu
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Heart, Dog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  favoritesCount?: number;
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'All Breeds', path: '/breeds' },
  { name: 'Favorites', path: '/favorites' },
];

export function Header({ favoritesCount = 0 }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-2xl font-black text-slate-900 hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <Dog className="h-6 w-6 text-white" />
            </div>
            <span className="hidden sm:inline tracking-tight">Dog Breed <span className="text-blue-600">Explorer</span></span>
            <span className="sm:hidden">DogBreeds</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold tracking-wide transition-all duration-300 hover:text-blue-600 relative py-2 group ${
                  isActive(link.path) 
                    ? 'text-blue-600' 
                    : 'text-slate-600'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-transform duration-300 ${
                  isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
                {link.path === '/favorites' && favoritesCount > 0 && (
                  <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-md shadow-blue-200">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 text-xl font-bold">
                  <Dog className="h-8 w-8 text-blue-600" />
                  <span>Dog Breed Explorer</span>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 text-lg font-medium transition-colors hover:text-blue-600 ${
                        isActive(link.path) 
                          ? 'text-blue-600' 
                          : 'text-slate-600'
                      }`}
                    >
                      {link.name === 'Favorites' && (
                        <Heart className="h-5 w-5" />
                      )}
                      {link.name}
                      {link.path === '/favorites' && favoritesCount > 0 && (
                        <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                          {favoritesCount}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
