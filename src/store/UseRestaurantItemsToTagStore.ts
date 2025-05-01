import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { baseURL } from 'functions/baseUrl';

interface RestaurantItem {
  id: number;
  title: string;
  image: string;
}

interface RestaurantItemsState {
  items: RestaurantItem[];
  isLoading: boolean;
  fetchRestaurantItems: (slug: string) => Promise<void>;
}

export const useRestaurantItemsToTagStore = create<RestaurantItemsState>((set) => ({
  items: [],
  isLoading: false,

  fetchRestaurantItems: async (slug) => {
    set({ isLoading: true });

    try {
      const token = Cookies.get('auth_token');

      const response = await axios.get(`${baseURL}/user/restaurant-items/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const items = response.data?.data?.items || [];
      set({ items });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to fetch restaurant items');
    } finally {
      set({ isLoading: false });
    }
  },
}));
