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

export interface Cuisine {
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
    fetchRestaurants: (page?: number, cuisine?: any) => Promise<void>;
    fetchCuisines: (page?: number, cuisine?: any) => Promise<void>;
}

export const UseHomeResturantsAndCuisinesStore = create<State>((set) => ({
    restaurants: [],
    cuisines: [],
    restaurantMeta: null,
    cuisineMeta: null,
    loading: false,
    error: null,

    // fetchRestaurants: async (page = 1, cuisineID) => {
    //     try {
    //     set({ loading: true, error: null });
    //     const region = Cookies.get("region");
    //     const response = await axios.get(`${baseURL}/home-restaurants?restaurants_page=${page}?cuisine=${cuisineID}?t=${new Date().getTime()}`, {
    //         headers: {
    //             country: region || "",
    //         },
    //     });
    //     const { restaurants } = response.data.data;

    //     set({
    //         restaurants: restaurants.restaurants,
    //         restaurantMeta: restaurants.meta,
    //         loading: false,
    //     });
    //     } catch (error) {
    //     set({ error: 'Failed to fetch restaurants', loading: false });
    //     }
    // },

    fetchRestaurants: async (page = 1, cuisineID) => {
        try {
            set({ loading: true, error: null });
            const region = Cookies.get("region");
    
            // Build query params
            const params: Record<string, any> = {
                restaurants_page: page,
                t: new Date().getTime(),
            };
            if (cuisineID) {
                params.cuisine = cuisineID;
            }
    
            const response = await axios.get(`${baseURL}/home-restaurants`, {
                headers: {
                    country: region || "",
                },
                params,
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

    // fetchCuisines: async (page = 1, cuisineID) => {
    //     try {
    //     set({ loading: true, error: null });
    //     const region = Cookies.get("region");
    //     const response = await axios.get(`${baseURL}/home-restaurants?cuisines_page=${page}?cuisine=${cuisineID}`,{
    //         headers: {
    //             country: region || "",
    //         },
            
    //     });
    //     const { cuisines } = response.data.data;

    //     set({
    //         cuisines: cuisines.cuisines,
    //         cuisineMeta: cuisines.meta,
    //         loading: false,
    //     });
    //     } catch (error) {
    //     set({ error: 'Failed to fetch cuisines', loading: false });
    //     }
    // },
    fetchCuisines: async (page = 1, cuisineID) => {
        try {
            set({ loading: true, error: null });
            const region = Cookies.get("region");
    
            // Build query params
            const params: Record<string, any> = {
                cuisines_page: page,
                t: new Date().getTime(),
            };
            if (cuisineID) {
                params.cuisine = cuisineID;
            }
    
            const response = await axios.get(`${baseURL}/home-restaurants`, {
                headers: {
                    country: region || "",
                },
                params,
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
