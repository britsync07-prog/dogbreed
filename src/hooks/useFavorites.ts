/**
 * Favorites Hook - Manage favorite breeds with localStorage
 */

import { useState, useEffect, useCallback } from 'react';
import type { FavoriteBreed } from '@/types';

const STORAGE_KEY = 'dog-breed-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteBreed[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((breed: Omit<FavoriteBreed, 'addedAt'>) => {
    setFavorites(prev => {
      if (prev.some(f => f.slug === breed.slug)) {
        return prev;
      }
      return [...prev, { ...breed, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeFavorite = useCallback((slug: string) => {
    setFavorites(prev => prev.filter(f => f.slug !== slug));
  }, []);

  const toggleFavorite = useCallback((breed: Omit<FavoriteBreed, 'addedAt'>) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.slug === breed.slug);
      if (exists) {
        return prev.filter(f => f.slug !== breed.slug);
      }
      return [...prev, { ...breed, addedAt: new Date().toISOString() }];
    });
  }, []);

  const isFavorite = useCallback((slug: string) => {
    return favorites.some(f => f.slug === slug);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };
}
