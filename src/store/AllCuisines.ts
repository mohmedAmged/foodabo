// src/store/useCountriesStore.ts
import { baseURL } from 'functions/baseUrl';
import {create} from 'zustand';

interface Cuisines {
  id: number;
  name: string;
  image: string;
}

interface CuisinesState {
    cuisines: Cuisines[];
    fetchCuisines: () => void;
}

export const useCuisinesStore = create<CuisinesState>((set) => ({
    cuisines: [],
    fetchCuisines: async () => {
    try {
      const response = await fetch(`${baseURL}/all-cuisines`);
      const data = await response.json();
      set({ cuisines: data.data.cuisines });
    } catch (error) {
      console.error('Error fetching cuisines:', error);
    }
  },
}));
