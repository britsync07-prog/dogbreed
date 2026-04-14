/**
 * BreedList Page - List all breeds with search and filter
 */

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/seo/SEO';
import { JsonLd, generateBreadcrumbSchema } from '@/components/seo/JsonLd';
import { SearchBar } from '@/components/ui-custom/SearchBar';
import { BreedCard } from '@/components/ui-custom/BreedCard';
import { LoadingSpinner } from '@/components/ui-custom/LoadingSpinner';
import { ErrorMessage } from '@/components/ui-custom/ErrorMessage';
import { getAllBreeds, getRandomImages } from '@/api/dogApi';
import { useFavorites } from '@/hooks/useFavorites';
import type { Breed } from '@/types';

const IMAGES_PER_BATCH = 12;

export default function BreedList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [breedImages, setBreedImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(IMAGES_PER_BATCH);

  const { toggleFavorite, isFavorite } = useFavorites();

  // Get search query from URL
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const breedsData = await getAllBreeds();
        setBreeds(breedsData);

        // Load initial batch of images
        const initialBatch = breedsData.slice(0, IMAGES_PER_BATCH);
        const images = await getRandomImages(initialBatch.length);
        
        const imagesMap: Record<string, string> = {};
        initialBatch.forEach((breed, index) => {
          imagesMap[breed.slug] = images[index];
        });
        setBreedImages(imagesMap);
      } catch (err) {
        setError('Failed to load dog breeds. Please try again later.');
        console.error('Error loading breeds:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBreeds();
  }, []);

  // Filter breeds based on search query
  const filteredBreeds = useMemo(() => {
    if (!searchQuery.trim()) return breeds;
    
    const query = searchQuery.toLowerCase();
    return breeds.filter(breed => 
      breed.displayName.toLowerCase().includes(query) ||
      breed.name.toLowerCase().includes(query)
    );
  }, [breeds, searchQuery]);

  // Paginated breeds
  const displayedBreeds = filteredBreeds.slice(0, displayCount);

  // Load more images as user scrolls
  useEffect(() => {
    const loadMoreImages = async () => {
      const breedsToLoad = displayedBreeds.filter(b => !breedImages[b.slug]);
      if (breedsToLoad.length === 0) return;

      try {
        const images = await getRandomImages(breedsToLoad.length);
        const imagesMap: Record<string, string> = { ...breedImages };
        breedsToLoad.forEach((breed, index) => {
          imagesMap[breed.slug] = images[index];
        });
        setBreedImages(imagesMap);
      } catch (error) {
        console.error('Error loading more images:', error);
      }
    };

    loadMoreImages();
  }, [displayedBreeds]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
    setDisplayCount(IMAGES_PER_BATCH);
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + IMAGES_PER_BATCH);
  };

  const handleToggleFavorite = (breed: Breed) => {
    const imageUrl = breedImages[breed.slug] || '';
    toggleFavorite({
      name: breed.displayName,
      slug: breed.slug,
      imageUrl,
    });
  };

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://dogsbreed.pages.dev/' },
    { name: 'All Breeds', url: 'https://dogsbreed.pages.dev/breeds' },
  ]);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading dog breeds..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  return (
    <>
      <SEO 
        title={searchQuery 
          ? `Search: ${searchQuery} | Dog Breed Explorer`
          : 'All Dog Breeds | Complete Breed Guide | Dog Breed Explorer'
        }
        description={searchQuery
          ? `Search results for "${searchQuery}" - Find detailed information, photos, and characteristics of dog breeds.`
          : 'Browse our complete collection of dog breeds. Find detailed information, photos, and characteristics for hundreds of breeds.'
        }
        canonical="https://dogsbreed.pages.dev/breeds"
      />
      <JsonLd type="breadcrumb" data={breadcrumbSchema} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            All Dog Breeds
          </h1>
          <p className="mt-2 text-slate-600">
            Browse our collection of {breeds.length}+ dog breeds
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search breeds by name..."
            initialValue={searchQuery}
          />
        </div>

        {/* Results count */}
        {searchQuery && (
          <p className="mb-6 text-slate-600">
            Found {filteredBreeds.length} breed{filteredBreeds.length !== 1 ? 's' : ''} 
            matching "{searchQuery}"
          </p>
        )}

        {/* Breed Grid */}
        {filteredBreeds.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedBreeds.map((breed) => (
                <BreedCard
                  key={breed.slug}
                  name={breed.name}
                  slug={breed.slug}
                  imageUrl={breedImages[breed.slug] || '/placeholder-dog.jpg'}
                  subBreeds={breed.subBreeds}
                  isFavorite={isFavorite(breed.slug)}
                  onToggleFavorite={() => handleToggleFavorite(breed)}
                />
              ))}
            </div>

            {/* Load More */}
            {displayCount < filteredBreeds.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Breeds ({filteredBreeds.length - displayCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-slate-600">
              No breeds found matching "{searchQuery}"
            </p>
            <button
              onClick={() => handleSearch('')}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </>
  );
}
