/**
 * Type definitions for Dog Breed Explorer
 */

// API Response types
export interface BreedsListResponse {
  message: Record<string, string[]>;
  status: string;
}

export interface RandomImageResponse {
  message: string;
  status: string;
}

export interface BreedImagesResponse {
  message: string[];
  status: string;
}

// Application types
export interface Breed {
  name: string;
  subBreeds: string[];
  slug: string;
  displayName: string;
}

export interface BreedImage {
  url: string;
  alt: string;
}

export interface BreedInfo {
  name: string;
  description: string;
  temperament: string[];
  characteristics: {
    size: string;
    lifespan: string;
    exercise: string;
    grooming: string;
    energyLevel?: string;
    trainability?: string;
    goodWithChildren?: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
}

export interface JsonLdProps {
  type: 'breed' | 'faq' | 'itemList' | 'website' | 'breadcrumb';
  data: Record<string, unknown>;
}

export interface FavoriteBreed {
  name: string;
  slug: string;
  imageUrl: string;
  addedAt: string;
}
