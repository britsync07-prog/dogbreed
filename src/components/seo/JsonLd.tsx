/**
 * JSON-LD Component - Structured data for SEO
 */

import { useEffect } from 'react';
import type { JsonLdProps } from '@/types';

const SITE_URL = 'https://dogbreedexplorer.pages.dev';

export function JsonLd({ type, data }: JsonLdProps) {
  useEffect(() => {
    const scriptId = `jsonld-${type}`;
    
    // Remove existing script if present
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [type, data]);

  return null;
}

/**
 * Generate Website schema
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dog Breed Explorer',
    url: SITE_URL,
    description: 'Explore hundreds of dog breeds with detailed information, photos, and characteristics.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/breeds?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Breed schema (Dog breed type)
 */
export function generateBreedSchema(breed: string, imageUrl: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Thing', 'DogBreed'],
    name: breed,
    description,
    image: imageUrl,
    url: `${SITE_URL}/breed/${breed.toLowerCase().replace(/\s+/g, '-')}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/breed/${breed.toLowerCase().replace(/\s+/g, '-')}`,
    },
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate ItemList schema (for homepage featured breeds)
 */
export function generateItemListSchema(items: { name: string; url: string; image: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      image: item.image,
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
