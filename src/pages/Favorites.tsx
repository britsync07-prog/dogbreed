/**
 * Favorites Page - Display user's favorite breeds
 */

import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/seo/SEO';
import { JsonLd, generateBreadcrumbSchema } from '@/components/seo/JsonLd';
import { BreedCard } from '@/components/ui-custom/BreedCard';
import { useFavorites } from '@/hooks/useFavorites';

export default function Favorites() {
  const { favorites, toggleFavorite, clearFavorites, isLoaded } = useFavorites();

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://dogbreedexplorer.pages.dev/' },
    { name: 'Favorites', url: 'https://dogbreedexplorer.pages.dev/favorites' },
  ]);

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="My Favorite Dog Breeds | Dog Breed Explorer"
        description="View and manage your favorite dog breeds. Save breeds you love and compare them easily."
        canonical="https://dogbreedexplorer.pages.dev/favorites"
      />
      <JsonLd type="breed" data={breadcrumbSchema} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-slate-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 font-medium" aria-current="page">
              Favorites
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              My Favorite Breeds
            </h1>
            <p className="mt-2 text-slate-600">
              {favorites.length > 0 
                ? `You have ${favorites.length} favorite breed${favorites.length !== 1 ? 's' : ''}`
                : 'Save your favorite breeds to compare and revisit them later'
              }
            </p>
          </div>

          {favorites.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearFavorites}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <BreedCard
                key={favorite.slug}
                name={favorite.name}
                slug={favorite.slug}
                imageUrl={favorite.imageUrl}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite({
                  name: favorite.name,
                  slug: favorite.slug,
                  imageUrl: favorite.imageUrl,
                })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-xl">
            <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No Favorites Yet
            </h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Start exploring dog breeds and click the heart icon to add them to your favorites.
            </p>
            <Button asChild>
              <Link to="/breeds">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse All Breeds
              </Link>
            </Button>
          </div>
        )}

        {/* Back to Browse */}
        {favorites.length > 0 && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/breeds">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse More Breeds
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
