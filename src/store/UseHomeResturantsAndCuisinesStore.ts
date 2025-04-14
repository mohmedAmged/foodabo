import { create } from 'zustand';
import axios from 'axios';
import { baseURL } from 'functions/baseUrl';
import Cookies from 'js-cookie';
interface ResturantGallery{
    id: number;
    image: string;
}
export interface Restaurant {
    id: number;
    name: string;
    slug: string;
    logo: string;
    cover: any;
    country_id: number;
    country_name: string;
    country_code: string;
    cuisine_id: number;
    cuisine_name: string;
    images: ResturantGallery[]
    followed: boolean;
    discount: number;
}

interface Cuisine {
    id: number;
    name: string;
    image: string;
}

interface Meta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface State {
    restaurants: Restaurant[];
    cuisines: Cuisine[];
    restaurantMeta: Meta | null;
    cuisineMeta: Meta | null;
    loading: boolean;
    error: string | null;
    fetchRestaurants: (page?: number) => Promise<void>;
    fetchCuisines: (page?: number) => Promise<void>;
}

export const UseHomeResturantsAndCuisinesStore = create<State>((set) => ({
    restaurants: [],
    cuisines: [],
    restaurantMeta: null,
    cuisineMeta: null,
    loading: false,
    error: null,

    fetchRestaurants: async (page = 1) => {
        try {
        set({ loading: true, error: null });
        const region = Cookies.get("region");
        const response = await axios.get(`${baseURL}/home-restaurants?restaurants_page=${page}?t=${new Date().getTime()}`, {
            headers: {
                country: region || "",
            },
        });
        const { restaurants } = response.data.data;

        set({
            restaurants: restaurants.restaurants,
            restaurantMeta: restaurants.meta,
            loading: false,
        });
        } catch (error) {
        set({ error: 'Failed to fetch restaurants', loading: false });
        }
    },

    fetchCuisines: async (page = 1) => {
        try {
        set({ loading: true, error: null });
        const region = Cookies.get("region");
        const response = await axios.get(`${baseURL}/home-restaurants?cuisines_page=${page}`,{
            headers: {
                country: region || "",
            },
        });
        const { cuisines } = response.data.data;

        set({
            cuisines: cuisines.cuisines,
            cuisineMeta: cuisines.meta,
            loading: false,
        });
        } catch (error) {
        set({ error: 'Failed to fetch cuisines', loading: false });
        }
    },
}));
