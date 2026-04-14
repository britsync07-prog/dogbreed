/**
 * Dog CEO API Service
 * https://dog.ceo/dog-api/
 */

import type { 
  BreedsListResponse, 
  RandomImageResponse, 
  BreedImagesResponse,
  Breed,
  BreedInfo
} from '@/types';

const BASE_URL = 'https://dog.ceo/api';

// Cache for API responses
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Generic fetch with caching
 */
async function fetchWithCache<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cache.set(url, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

/**
 * Get all breeds from the API
 */
export async function getAllBreeds(): Promise<Breed[]> {
  const response = await fetchWithCache<BreedsListResponse>(`${BASE_URL}/breeds/list/all`);
  
  return Object.entries(response.message).map(([name, subBreeds]) => ({
    name,
    subBreeds,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    displayName: formatBreedName(name),
  }));
}

/**
 * Get a random dog image
 */
export async function getRandomImage(): Promise<string> {
  const response = await fetchWithCache<RandomImageResponse>(`${BASE_URL}/breeds/image/random`);
  return response.message;
}

/**
 * Get random images (for hero/featured sections)
 */
export async function getRandomImages(count: number): Promise<string[]> {
  const response = await fetchWithCache<{ message: string[]; status: string }>(
    `${BASE_URL}/breeds/image/random/${count}`
  );
  return response.message;
}

/**
 * Get images for a specific breed
 */
export async function getBreedImages(breed: string, count: number = 10): Promise<string[]> {
  const formattedBreed = breed.toLowerCase().replace(/-/g, ' ');
  const url = `${BASE_URL}/breed/${formattedBreed}/images/random/${count}`;
  const response = await fetchWithCache<BreedImagesResponse>(url);
  return response.message;
}

/**
 * Get all images for a breed (for galleries)
 */
export async function getAllBreedImages(breed: string): Promise<string[]> {
  const formattedBreed = breed.toLowerCase().replace(/-/g, ' ');
  const url = `${BASE_URL}/breed/${formattedBreed}/images`;
  const response = await fetchWithCache<{ message: string[]; status: string }>(url);
  return response.message.slice(0, 24); // Limit to 24 images
}

/**
 * Format breed name for display (e.g., "german-shepherd" -> "German Shepherd")
 */
export function formatBreedName(slug: string): string {
  return slug
    .split(/[-\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Create kebab-case slug from breed name
 */
export function createSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Generate alt text for breed images
 */
export function generateAltText(breedName: string, index?: number): string {
  const displayName = formatBreedName(breedName);
  const suffix = index !== undefined ? ` - Photo ${index + 1}` : '';
  return `${displayName} dog breed photo${suffix}`;
}

/**
 * Get breed info (mock data since API doesn't provide this)
 */
export function getBreedInfo(breed: string): BreedInfo {
  const breedData: Record<string, Omit<BreedInfo, 'name'>> = {
    default: {
      description: `The ${formatBreedName(breed)} is a versatile and beloved canine companion. Highly regarded for its adaptable nature and distinct characteristics, this breed serves as an ideal choice for families seeking a loyal partner.`,
      temperament: ['Friendly', 'Loyal', 'Intelligent', 'Adaptable'],
      characteristics: {
        size: 'Medium (30-60 lbs)',
        lifespan: '10-15 years',
        exercise: 'Moderate',
        grooming: 'Weekly brushing',
        energyLevel: 'High',
        trainability: 'Excellent',
        goodWithChildren: 'Yes'
      },
    },
    'german-shepherd': {
      description: 'The German Shepherd Dog is a leading police, guard, and military dog—and a loving family companion. Renowned for its courage, intelligence, and unwavering loyalty.',
      temperament: ['Confident', 'Courageous', 'Intelligent', 'Loyal', 'Protective'],
      characteristics: {
        size: 'Large (50-90 lbs)',
        lifespan: '9-13 years',
        exercise: 'High - needs mental and physical stimulation',
        grooming: 'Daily brushing during shedding seasons',
        energyLevel: 'Very High',
        trainability: 'Excellent (Top 3 most intelligent)',
        goodWithChildren: 'Yes, with proper socialization'
      },
    },
    'golden-retriever': {
      description: 'Golden Retrievers are one of the most popular dog breeds in the world. Known for their friendly, tolerant attitude, they make wonderful family pets and excellent working dogs.',
      temperament: ['Friendly', 'Intelligent', 'Devoted', 'Gentle', 'Eager to please'],
      characteristics: {
        size: 'Large (55-75 lbs)',
        lifespan: '10-12 years',
        exercise: 'High - loves outdoor activities',
        grooming: 'Regular brushing, moderate shedding',
      },
    },
    'labrador': {
      description: 'Labrador Retrievers are outgoing, even-tempered, and high-spirited companions. They are excellent family dogs and remain the most popular breed for their versatility and loving nature.',
      temperament: ['Outgoing', 'Even-tempered', 'Gentle', 'Intelligent', 'Agile'],
      characteristics: {
        size: 'Large (55-80 lbs)',
        lifespan: '10-12 years',
        exercise: 'High - very active breed',
        grooming: 'Low maintenance, occasional brushing',
      },
    },
    'beagle': {
      description: 'Beagles are small to medium-sized hounds known for their incredible sense of smell and tracking instincts. They are merry, friendly, and make great family companions.',
      temperament: ['Friendly', 'Curious', 'Merry', 'Determined', 'Gentle'],
      characteristics: {
        size: 'Small to Medium (20-30 lbs)',
        lifespan: '12-15 years',
        exercise: 'Moderate - daily walks needed',
        grooming: 'Low maintenance',
      },
    },
    'poodle': {
      description: 'Poodles are highly intelligent, elegant dogs that come in three sizes. They are known for their hypoallergenic coat and excel in obedience and agility competitions.',
      temperament: ['Intelligent', 'Active', 'Alert', 'Trainable', 'Instinctual'],
      characteristics: {
        size: 'Toy/Miniature/Standard',
        lifespan: '12-15 years',
        exercise: 'Moderate to High',
        grooming: 'High - professional grooming recommended',
      },
    },
    'bulldog': {
      description: 'Bulldogs are docile, willful, and friendly companions. Despite their tough appearance, they are gentle, affectionate dogs that make excellent family pets.',
      temperament: ['Docile', 'Willful', 'Friendly', 'Gregarious'],
      characteristics: {
        size: 'Medium (40-50 lbs)',
        lifespan: '8-10 years',
        exercise: 'Low - short walks',
        grooming: 'Low maintenance',
      },
    },
    'pomeranian': {
      description: 'Pomeranians are small, fluffy dogs with big personalities. They are alert, intelligent, and make excellent watchdogs despite their tiny size.',
      temperament: ['Playful', 'Extroverted', 'Intelligent', 'Friendly', 'Active'],
      characteristics: {
        size: 'Toy (3-7 lbs)',
        lifespan: '12-16 years',
        exercise: 'Low to Moderate',
        grooming: 'High - daily brushing recommended',
      },
    },
  };

  const data = breedData[breed.toLowerCase()] || breedData.default;
  return { ...data, name: breed };
}

/**
 * Get FAQ items for a breed
 */
export function getBreedFAQ(breed: string): { question: string; answer: string }[] {
  const displayName = formatBreedName(breed);
  
  return [
    {
      question: `How big do ${displayName}s get?`,
      answer: `The size of a ${displayName} varies, but most fall into the medium to large category. It's important to research the specific needs of this breed to ensure you can provide adequate space and exercise.`,
    },
    {
      question: `Are ${displayName}s good family dogs?`,
      answer: `Yes, ${displayName}s generally make excellent family companions. They are known for being loyal, affectionate, and good with children when properly socialized and trained.`,
    },
    {
      question: `How much exercise does a ${displayName} need?`,
      answer: `Most ${displayName}s require moderate to high levels of exercise. Daily walks, playtime, and mental stimulation are essential for their physical and mental well-being.`,
    },
    {
      question: `What is the lifespan of a ${displayName}?`,
      answer: `The average lifespan of a ${displayName} is typically 10-14 years, though this can vary based on genetics, diet, exercise, and overall health care.`,
    },
    {
      question: `Do ${displayName}s shed a lot?`,
      answer: `Shedding varies by breed. Regular grooming and brushing can help manage shedding and keep your ${displayName}'s coat healthy and shiny.`,
    },
    {
      question: `Are ${displayName}s easy to train?`,
      answer: `${displayName}s are generally intelligent and respond well to positive reinforcement training methods. Consistency, patience, and early socialization are key to successful training.`,
    },
  ];
}

/**
 * Clear the API cache
 */
export function clearCache(): void {
  cache.clear();
}
