
import { create } from 'zustand';

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface FavoritesState {
  favorites: Photo[];
  addFavorite: (photo: Photo) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  addFavorite: (photo) => set((state) => ({ 
    favorites: [...state.favorites, photo] 
  })),
  removeFavorite: (id) => set((state) => ({ 
    favorites: state.favorites.filter(photo => photo.id !== id) 
  })),
  isFavorite: (id) => get().favorites.some(photo => photo.id === id)
}));
