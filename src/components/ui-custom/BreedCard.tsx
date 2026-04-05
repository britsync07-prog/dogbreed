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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Link to={`/breed/${slug}`} className="block h-full">
          <img
            src={imageUrl}
            alt={altText}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback image on error
              (e.target as HTMLImageElement).src = '/placeholder-dog.jpg';
            }}
          />
        </Link>
        
        {showFavorite && onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`h-5 w-5 transition-colors ${
                isFavorite 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-slate-400 hover:text-red-500'
              }`} 
            />
          </Button>
        )}
      </div>
      
      <CardContent className="p-4">
        <Link to={`/breed/${slug}`}>
          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {displayName}
          </h3>
        </Link>
        
        {subBreeds.length > 0 && (
          <p className="mt-1 text-sm text-slate-500">
            {subBreeds.length} sub-breed{subBreeds.length !== 1 ? 's' : ''}
          </p>
        )}
        
        <Link 
          to={`/breed/${slug}`}
          className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Details
          <svg 
            className="ml-1 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  );
}
