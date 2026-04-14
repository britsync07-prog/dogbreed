/**
 * BreedCard Component - Display breed information in a card
 */

import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generateAltText, formatBreedName } from '@/api/dogApi';

interface BreedCardProps {
  name: string;
  slug: string;
  imageUrl: string;
  subBreeds?: string[];
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showFavorite?: boolean;
}

export function BreedCard({
  name,
  slug,
  imageUrl,
  subBreeds = [],
  isFavorite = false,
  onToggleFavorite,
  showFavorite = true,
}: BreedCardProps) {
  const displayName = formatBreedName(name);
  const altText = generateAltText(name);

  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 border border-slate-200/60 hover:border-blue-200 bg-white/80 backdrop-blur-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Link to={`/breed/${slug}`} className="block h-full relative">
          <img
            src={imageUrl}
            alt={altText}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            onError={(e) => {
              // Fallback image on error
              (e.target as HTMLImageElement).src = '/placeholder-dog.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
        
        {showFavorite && onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/30 hover:bg-white/80 backdrop-blur-md shadow-sm border border-white/40 transition-all duration-300 rounded-full h-10 w-10 z-10"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-300 ${
                isFavorite 
                  ? 'fill-red-500 text-red-500 scale-110' 
                  : 'text-slate-700 hover:text-red-500'
              }`} 
            />
          </Button>
        )}
      </div>
      
      <CardContent className="p-5">
        <Link to={`/breed/${slug}`}>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">
            {displayName}
          </h3>
        </Link>
        
        {subBreeds.length > 0 && (
          <p className="mt-1.5 text-sm text-slate-500 font-medium">
            {subBreeds.length} sub-breed{subBreeds.length !== 1 ? 's' : ''} available
          </p>
        )}
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link 
            to={`/breed/${slug}`}
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link"
          >
            Explore Breed
            <svg 
              className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
