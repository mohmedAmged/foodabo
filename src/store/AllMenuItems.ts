import axios from 'axios';
import { baseURL } from 'functions/baseUrl';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { create } from 'zustand';

// Define the interface for the API response directly in the store
interface Item {
  id: number;
  title: string;
}

interface Category {
  id: number;
  name: string;
  items: Item[];
}

interface ApiResponse {
  data: {
    category_items: Category[];
  };
  message: string;
  errors: string[];
  status: number;
}

interface StoreState {
  categories: Category[];
  loading: boolean;
  fetchItems: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAllMenuItemsStore = create<StoreState>((set) => ({
  categories: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  fetchItems: async () => {
    set({ loading: true });
    try {
      const response = await axios.get<ApiResponse>(`${baseURL}/restaurant/all-items?t=${new Date().getTime()}`, {
              headers: 
              {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("auth_token")}`,
              }
                        },); // Replace {{url}} with the actual URL
      set({ categories: response.data.data.category_items });
      toast.success("Items fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch items!");
    } finally {
      set({ loading: false });
    }
  },
}));
