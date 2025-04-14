import { baseURL } from 'functions/baseUrl';
import {create} from 'zustand';

interface CountriesHasData {
    id: number;
    name: string;
    flag: string;
    code: string;
    phone_code: string;
}

interface CountriesHasDataState {
    countriesHasData: CountriesHasData[];
    fetchCountriesHasData: () => void;
}

export const useCountriesHasDataStore = create<CountriesHasDataState>((set) => ({
    countriesHasData: [],
    fetchCountriesHasData: async () => {
        try {
        const response = await fetch(`${baseURL}/countries-restaurants?t=${new Date().getTime()}`);
        const data = await response.json();
        set({ countriesHasData: data.data.countries });
        } catch (error) {
        console.error('Error fetching cuisines:', error);
        }
},
}));
