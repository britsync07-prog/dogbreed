/**
 * SEO Component - Dynamic meta tags and Open Graph
 */

import { useEffect } from 'react';
import type { SEOProps } from '@/types';

const DEFAULT_TITLE = 'Dog Breed Explorer | Discover Your Perfect Canine Companion';
const DEFAULT_DESCRIPTION = 'Explore hundreds of dog breeds with detailed information, photos, and characteristics. Find the perfect dog breed for your lifestyle with our comprehensive guide.';
const DEFAULT_KEYWORDS = 'dog breeds, dog breed guide, dog photos, canine breeds, pet dogs, dog information, breed characteristics';
const SITE_URL = 'https://dogbreedexplorer.pages.dev';
const DEFAULT_OG_IMAGE = '/og-image.jpg';

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  keywords = DEFAULT_KEYWORDS,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonical || SITE_URL, true);
    updateMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`, true);
    updateMetaTag('og:site_name', 'Dog Breed Explorer', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || SITE_URL;

    // Cleanup function
    return () => {
      // Meta tags are not removed on unmount to prevent flickering
    };
  }, [title, description, canonical, ogImage, ogType, keywords]);

  return null;
}
