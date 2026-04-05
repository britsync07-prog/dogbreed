/**
 * Breed of the Day Hook - Select a random breed each day
 */

import { useState, useEffect, useMemo } from 'react';
import type { Breed } from '@/types';

const STORAGE_KEY = 'breed-of-day';

interface BreedOfDayData {
  breed: Breed;
  imageUrl: string;
  date: string;
}

export function useBreedOfDay(breeds: Breed[]) {
  const [breedOfDay, setBreedOfDay] = useState<BreedOfDayData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get today's date string
  const today = useMemo(() => new Date().toDateString(), []);

  useEffect(() => {
    if (breeds.length === 0) return;

    const loadBreedOfDay = async () => {
      try {
        // Check if we have a stored breed for today
        const stored = localStorage.getItem(STORAGE_KEY);
        
        if (stored) {
          const parsed: BreedOfDayData & { date: string } = JSON.parse(stored);
          
          // If it's still the same day, use stored breed
          if (parsed.date === today) {
            setBreedOfDay(parsed);
            setIsLoading(false);
            return;
          }
        }

        // Select a new random breed
        const randomIndex = Math.floor(Math.random() * breeds.length);
        const selectedBreed = breeds[randomIndex];

        // Fetch a random image for this breed
        const response = await fetch(
          `https://dog.ceo/api/breed/${selectedBreed.name}/images/random`
        );
        const data = await response.json();

        const newBreedOfDay: BreedOfDayData = {
          breed: selectedBreed,
          imageUrl: data.message,
          date: today,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newBreedOfDay));
        setBreedOfDay(newBreedOfDay);
      } catch (error) {
        console.error('Error loading breed of day:', error);
        // Fallback to random breed without image
        const randomIndex = Math.floor(Math.random() * breeds.length);
        setBreedOfDay({
          breed: breeds[randomIndex],
          imageUrl: '',
          date: today,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBreedOfDay();
  }, [breeds, today]);

  return { breedOfDay, isLoading };
}
