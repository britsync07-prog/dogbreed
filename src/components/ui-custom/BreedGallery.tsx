/**
 * BreedGallery Component - Image gallery for breed detail page
 */

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { generateAltText } from '@/api/dogApi';

interface BreedGalleryProps {
  images: string[];
  breedName: string;
}

export function BreedGallery({ images, breedName }: BreedGalleryProps) {

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Photo Gallery</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button 
                className="group relative aspect-square overflow-hidden rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`View ${generateAltText(breedName, index)}`}
              >
                <img
                  src={image}
                  alt={generateAltText(breedName, index)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  srcSet={`${image} 300w, ${image} 600w`}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
              <img
                src={image}
                alt={generateAltText(breedName, index)}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
