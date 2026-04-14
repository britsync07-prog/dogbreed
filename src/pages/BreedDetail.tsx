/**
 * BreedDetail Page - Detailed view of a specific breed
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Calendar, Ruler, Activity, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SEO } from '@/components/seo/SEO';
import { JsonLd, generateBreedSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/components/seo/JsonLd';
import { BreedGallery } from '@/components/ui-custom/BreedGallery';
import { FAQSection } from '@/components/ui-custom/FAQSection';
import { LoadingSpinner } from '@/components/ui-custom/LoadingSpinner';
import { ErrorMessage } from '@/components/ui-custom/ErrorMessage';
import { 
  getAllBreeds, 
  getAllBreedImages, 
  getBreedInfo, 
  getBreedFAQ,
  generateAltText 
} from '@/api/dogApi';
import { useFavorites } from '@/hooks/useFavorites';
import type { Breed } from '@/types';

export default function BreedDetail() {
  const { breed: breedSlug } = useParams<{ breed: string }>();
  const [breed, setBreed] = useState<Breed | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadBreedData = async () => {
      if (!breedSlug) return;

      try {
        setIsLoading(true);
        setError(null);

        // Get all breeds and find the matching one
        const allBreeds = await getAllBreeds();
        const foundBreed = allBreeds.find(b => b.slug === breedSlug.toLowerCase());

        if (!foundBreed) {
          setError('Breed not found. Please check the URL and try again.');
          setIsLoading(false);
          return;
        }

        setBreed(foundBreed);

        // Load breed images
        const breedImages = await getAllBreedImages(foundBreed.name);
        setImages(breedImages);
      } catch (err) {
        setError('Failed to load breed information. Please try again later.');
        console.error('Error loading breed data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBreedData();
  }, [breedSlug]);

  const handleToggleFavorite = () => {
    if (!breed || images.length === 0) return;
    
    toggleFavorite({
      name: breed.displayName,
      slug: breed.slug,
      imageUrl: images[0],
    });
  };

  const handleShare = async () => {
    if (navigator.share && breed) {
      try {
        await navigator.share({
          title: `${breed.displayName} - Dog Breed Explorer`,
          text: `Check out the ${breed.displayName} on Dog Breed Explorer!`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading breed information..." />;
  }

  if (error || !breed) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ErrorMessage 
          title="Breed Not Found"
          message={error || 'The requested breed could not be found.'}
          onRetry={() => window.location.reload()}
        />
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link to="/breeds">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse All Breeds
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const breedInfo = getBreedInfo(breed.name);
  const faqs = getBreedFAQ(breed.name);
  const isFav = isFavorite(breed.slug);

  // Generate structured data
  const breedSchema = generateBreedSchema(
    breed.displayName,
    images[0] || '',
    breedInfo.description,
    breedInfo.characteristics
  );
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://dogsbreed.pages.dev/' },
    { name: 'All Breeds', url: 'https://dogsbreed.pages.dev/breeds' },
    { name: breed.displayName, url: `https://dogsbreed.pages.dev/breed/${breed.slug}` },
  ]);

  return (
    <>
      <SEO 
        title={`${breed.displayName} | Dog Breed Information & Photos | Dog Breed Explorer`}
        description={breedInfo.description}
        canonical={`https://dogsbreed.pages.dev/breed/${breed.slug}`}
        ogImage={images[0]}
        keywords={`${breed.displayName}, ${breed.name} dog, dog breed, ${breed.displayName} temperament, ${breed.displayName} care`}
      />
      <JsonLd type="breed" data={breedSchema} />
      <JsonLd type="faq" data={faqSchema} />
      <JsonLd type="breadcrumb" data={breadcrumbSchema} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-slate-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/breeds" className="hover:text-blue-600 transition-colors">Breeds</Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 font-medium" aria-current="page">
              {breed.displayName}
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <img
              src={images[0] || '/placeholder-dog.jpg'}
              alt={generateAltText(breed.displayName)}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
                {breed.displayName}
              </h1>
              {breed.subBreeds.length > 0 && (
                <p className="mt-2 text-slate-600">
                  {breed.subBreeds.length} sub-breed{breed.subBreeds.length !== 1 ? 's' : ''} available
                </p>
              )}
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              {breedInfo.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={isFav ? 'default' : 'outline'}
                onClick={handleToggleFavorite}
                className="gap-2"
              >
                <Heart className={`h-5 w-5 ${isFav ? 'fill-white' : ''}`} />
                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Ruler className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-bold text-[10px] text-blue-600 uppercase tracking-widest">Size</p>
                  <p className="text-sm font-semibold text-slate-700">{breedInfo.characteristics.size}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-bold text-[10px] text-blue-600 uppercase tracking-widest">Lifespan</p>
                  <p className="text-sm font-semibold text-slate-700">{breedInfo.characteristics.lifespan}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-bold text-[10px] text-blue-600 uppercase tracking-widest">Exercise</p>
                  <p className="text-sm font-semibold text-slate-700">{breedInfo.characteristics.exercise}</p>
                </div>
              </div>
              {/* @ts-ignore - New AI SEO Fields */}
              {breedInfo.characteristics.energyLevel && (
                <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-[10px] text-blue-600 uppercase tracking-widest">Energy</p>
                    <p className="text-sm font-semibold text-slate-700">{breedInfo.characteristics.energyLevel}</p>
                  </div>
                </div>
              )}
              {/* @ts-ignore */}
              {breedInfo.characteristics.trainability && (
                <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-bold text-[10px] text-blue-600 uppercase tracking-widest">Training</p>
                    <p className="text-sm font-semibold text-slate-700">{breedInfo.characteristics.trainability}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 p-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <Scissors className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-bold text-[10px] text-blue-600 uppercase tracking-widest">Grooming</p>
                  <p className="text-sm font-semibold text-slate-700">{breedInfo.characteristics.grooming}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Temperament */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Temperament
          </h2>
          <div className="flex flex-wrap gap-2">
            {breedInfo.temperament.map((trait) => (
              <Badge key={trait} variant="secondary" className="text-sm px-3 py-1">
                {trait}
              </Badge>
            ))}
          </div>
        </section>

        {/* Photo Gallery */}
        {images.length > 1 && (
          <section className="mb-12">
            <BreedGallery images={images.slice(1)} breedName={breed.displayName} />
          </section>
        )}

        <Separator className="my-8" />

        {/* FAQ Section */}
        <FAQSection faqs={faqs} breedName={breed.displayName} />

        {/* Back to Browse */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link to="/breeds">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse All Breeds
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
