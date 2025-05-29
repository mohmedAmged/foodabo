import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { baseURL } from 'functions/baseUrl';

interface RestaurantData {
    name: string;
    slug: string;
    logo: string;
}

interface RestaurantsDataState {
    restaurants: RestaurantData[];
    isLoading: boolean;
    fetchAllRestaurants: () => Promise<void>;
}

export const useAllRestaurantsToTagStore = create<RestaurantsDataState>((set) => ({
    restaurants: [],
    isLoading: false,

    fetchAllRestaurants: async () => {
    set({ isLoading: true });

    try {
      const token = Cookies.get('auth_token');

      const response = await axios.get(`${baseURL}/user/all-restaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const restaurants = response.data?.data?.restaurants || [];
      set({ restaurants });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to fetch restaurants');
    } finally {
      set({ isLoading: false });
    }
  },
}));
