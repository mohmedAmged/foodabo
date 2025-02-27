// src/store/useCountriesStore.ts
import { baseURL } from 'functions/baseUrl';
import {create} from 'zustand';

interface Country {
  id: number;
  name: string;
  flag: string;
  phone_code: string;
}

interface CountriesState {
  countries: Country[];
  fetchCountries: () => void;
}

export const useCountriesStore = create<CountriesState>((set) => ({
  countries: [],
  fetchCountries: async () => {
    try {
      const response = await fetch(`${baseURL}/all-countries`);
      const data = await response.json();
      set({ countries: data.data.countries });
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  },
}));
