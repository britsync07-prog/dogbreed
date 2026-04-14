/**
 * Home Page - Landing page with hero, featured breeds, and search
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/seo/SEO';
import { JsonLd, generateWebsiteSchema, generateItemListSchema } from '@/components/seo/JsonLd';
import { SearchBar } from '@/components/ui-custom/SearchBar';
import { BreedCard } from '@/components/ui-custom/BreedCard';
import { BreedOfDay } from '@/components/ui-custom/BreedOfDay';
import { LoadingSpinner } from '@/components/ui-custom/LoadingSpinner';
import { ErrorMessage } from '@/components/ui-custom/ErrorMessage';
import { getAllBreeds, getRandomImages } from '@/api/dogApi';
import { useFavorites } from '@/hooks/useFavorites';
import { useBreedOfDay } from '@/hooks/useBreedOfDay';
import type { Breed } from '@/types';

const FEATURED_BREEDS = ['golden-retriever', 'german-shepherd', 'labrador', 'beagle', 'poodle', 'bulldog'];

export default function Home() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [heroImage, setHeroImage] = useState<string>('');
  const [featuredBreeds, setFeaturedBreeds] = useState<Array<Breed & { imageUrl: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { toggleFavorite, isFavorite } = useFavorites();
  const { breedOfDay } = useBreedOfDay(breeds);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load breeds and hero image in parallel
        const [breedsData, heroImages] = await Promise.all([
          getAllBreeds(),
          getRandomImages(1),
        ]);

        setBreeds(breedsData);
        setHeroImage(heroImages[0]);

        // Load featured breeds with images
        const featured = breedsData.filter(b => 
          FEATURED_BREEDS.includes(b.slug)
        );

        const featuredWithImages = await Promise.all(
          featured.map(async (breed) => {
            const images = await getRandomImages(1);
            return { ...breed, imageUrl: images[0] };
          })
        );

        setFeaturedBreeds(featuredWithImages);
      } catch (err) {
        setError('Failed to load dog breeds. Please try again later.');
        console.error('Error loading home data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      window.location.href = `/breeds?search=${encodeURIComponent(query)}`;
    }
  };

  const handleToggleFavorite = (breed: Breed, imageUrl: string) => {
    toggleFavorite({
      name: breed.displayName,
      slug: breed.slug,
      imageUrl,
    });
  };

  // Generate structured data
  const websiteSchema = generateWebsiteSchema();
  const itemListSchema = generateItemListSchema(
    featuredBreeds.map(b => ({
      name: b.displayName,
      url: `https://dogsbreed.pages.dev/breed/${b.slug}`,
      image: b.imageUrl,
    }))
  );

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading amazing dog breeds..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <>
      <SEO 
        title="Dog Breed Explorer | Discover Your Perfect Canine Companion"
        description="Explore hundreds of dog breeds with detailed information, photos, and characteristics. Find the perfect dog breed for your lifestyle with our comprehensive guide."
        canonical="https://dogsbreed.pages.dev/"
      />
      <JsonLd type="website" data={websiteSchema} />
      <JsonLd type="itemList" data={itemListSchema} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Beautiful dog showcasing various breeds"
            className="h-full w-full object-cover opacity-30"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/60 to-slate-950/90" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 flex flex-col justify-center min-h-[80vh]">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-6 border-blue-500/30 text-blue-300 bg-blue-500/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
              <Sparkles className="w-4 h-4 mr-2 inline-block text-blue-400" />
              Over 100+ Breeds to Discover
            </Badge>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
              Discover Your Perfect <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Canine Companion</span>
            </h1>
            
            <p className="mt-8 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              Explore hundreds of dog breeds with detailed information, high-quality photos, 
              and characteristics. Find the perfect match for your lifestyle.
            </p>

            <div className="mt-10 max-w-2xl mx-auto p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search by breed name..."
                />
              </div>
              <Button asChild size="lg" className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-blue-900/50 rounded-xl transition-all duration-300 hover:scale-105">
                <Link to="/breeds">
                  <Search className="h-5 w-5 mr-2" />
                  Browse
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>Verified Data</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Search className="h-4 w-4 text-blue-400" />
                <span>Smart Filters</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breed of the Day */}
      {breedOfDay && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BreedOfDay 
              breed={breedOfDay.breed} 
              imageUrl={breedOfDay.imageUrl} 
            />
          </div>
        </section>
      )}

      {/* Featured Breeds */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Featured Breeds
              </h2>
              <p className="mt-2 text-slate-600">
                Popular dog breeds loved by families worldwide
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex gap-2">
              <Link to="/breeds">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBreeds.map((breed) => (
              <BreedCard
                key={breed.slug}
                name={breed.name}
                slug={breed.slug}
                imageUrl={breed.imageUrl}
                subBreeds={breed.subBreeds}
                isFavorite={isFavorite(breed.slug)}
                onToggleFavorite={() => handleToggleFavorite(breed, breed.imageUrl)}
              />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/breeds">
                View All Breeds
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose Dog Breed Explorer?
            </h2>
            
            <div className="mt-8 grid sm:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Easy Search</h3>
                <p className="text-sm text-slate-600">
                  Find the perfect breed with our powerful search and filter system
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Detailed Info</h3>
                <p className="text-sm text-slate-600">
                  Comprehensive breed information including temperament and care
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900">Photo Galleries</h3>
                <p className="text-sm text-slate-600">
                  Browse beautiful photos of each breed to see their unique features
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Find Your Perfect Dog?
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Browse our complete collection of dog breeds and discover which one 
            matches your lifestyle and preferences.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/breeds">
              Explore All Breeds
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
