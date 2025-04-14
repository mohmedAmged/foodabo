import { baseURL } from 'functions/baseUrl';
import {create} from 'zustand';

export interface DefaultCountry {
    id: number;
    name: string;
    flag: string;
    code: string;
    phone_code: string;
}

interface DefaultCountryState {
    defaultCountry: DefaultCountry | null;
    fetchDefaultCountry: () => void;
}

export const useDefaultCountryStore = create<DefaultCountryState>((set) => ({
    defaultCountry: null,
    fetchDefaultCountry: async () => {
        try {
        const response = await fetch(`${baseURL}/default-country`);
        const data = await response.json();
        set({ defaultCountry: data.data.country });
        } catch (error) {
        console.error('Error fetching cuisines:', error);
        }
},
}));
