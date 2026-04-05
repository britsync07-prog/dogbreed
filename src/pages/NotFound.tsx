/**
 * NotFound Page - 404 error page
 */

import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/seo/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found | Dog Breed Explorer"
        description="Sorry, the page you're looking for doesn't exist. Explore our dog breed collection instead."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-9xl font-bold text-blue-100 mb-4">404</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/breeds">
                <Search className="mr-2 h-4 w-4" />
                Browse Breeds
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
