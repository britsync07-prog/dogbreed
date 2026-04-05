/**
 * BreedOfDay Component - Featured breed of the day
 */

import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Breed } from '@/types';
import { generateAltText } from '@/api/dogApi';

interface BreedOfDayProps {
  breed: Breed;
  imageUrl: string;
}

export function BreedOfDay({ breed, imageUrl }: BreedOfDayProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Breed of the Day
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={generateAltText(breed.displayName)}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">
              {breed.displayName}
            </h3>
            
            {breed.subBreeds.length > 0 && (
              <p className="text-slate-600">
                Includes {breed.subBreeds.length} sub-breed{breed.subBreeds.length !== 1 ? 's' : ''}
              </p>
            )}

            <p className="text-slate-600">
              Discover everything about the {breed.displayName} - from temperament 
              to care requirements. Learn why this breed might be perfect for you!
            </p>

            <Button asChild>
              <Link to={`/breed/${breed.slug}`}>
                Explore {breed.displayName}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
