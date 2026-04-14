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
    <Card className="overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-blue-100 shadow-xl shadow-blue-900/5 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10">
      <CardContent className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-blue-100 p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">
            Breed of the Day
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 group">
            <img
              src={imageUrl}
              alt={generateAltText(breed.displayName)}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {breed.displayName}
              </h3>
              
              {breed.subBreeds.length > 0 && (
                <p className="mt-2 text-slate-500 font-medium">
                  Includes {breed.subBreeds.length} sub-breed{breed.subBreeds.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              Discover everything about the {breed.displayName} - from temperament 
              to care requirements. Learn why this breed might be perfect for you!
            </p>

            <Button asChild size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all duration-300 hover:scale-105">
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
