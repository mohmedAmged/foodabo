import { baseURL } from 'functions/baseUrl';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface MenuItem {
  id: number;
  title: string;
  title_ar: string;
  title_en: string;
  description: string;
  description_ar: string;
  description_en: string;
  price: string;
  image: string;
  number_of_recommendations: number;
  category: string;
  category_id: number;
}

interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

interface ApiResponse {
  data: {
    items: MenuItem[];
    meta: Meta;
    links: Record<string, string | null>;
    pages: string[];
  };
  message: string;
  errors: any[];
  status: number;
}

interface MenuState {
  items: MenuItem[];
  meta: Meta | null;
  loading: boolean;
  error: string | null;
  fetchItems: (category_id?: number) => Promise<void>;
}

export const useFilterMenuStore = create<MenuState>((set) => ({
  items: [],
  meta: null,
  loading: false,
  error: null,
  fetchItems: async (category_id) => {
    set({ loading: true, error: null });
    try {
      const url = category_id !== null && category_id !== undefined
        ? `${baseURL}/restaurant/filter-menu?category=${category_id}`
        : `${baseURL}/restaurant/filter-menu`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        }
      });
      const data: ApiResponse = await response.json();
      if (data.status === 200) {
        set({ items: data.data.items, meta: data.data.meta, loading: false });
      } else {
        set({ error: 'Failed to fetch items', loading: false });
        toast.error('Failed to fetch items');
      }
    } catch (error) {
      set({ error: 'An error occurred while fetching items', loading: false });
      toast.error('An error occurred while fetching items');
    }
  },
}));
