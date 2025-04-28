import { create } from 'zustand';
import axios from 'axios';
import { baseURL } from 'functions/baseUrl';

// ========== Interfaces ==========

export interface RestaurantImage {
  image: string;
}

export interface Cuisine {
  id: number;
  name: string;
  image: string;
}

export interface Restaurant {
  id: number;
  name: string;
  about_us: string | null;
  slug: string;
  applicant_full_name: string;
  logo: string;
  cover: string;
  country: number;
  country_name: string;
  country_code: string;
  menu_file: string;
  images: RestaurantImage[];
  followed: boolean;
  cuisines: Cuisine[];
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: string;
  price_with_currency: string;
  price_after_discount: string;
  category_id: number;
  category_name: string;
  number_of_recommendations: number;
  image: string;
  discount_value: string | null;
  discount_type: string | null;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ItemsData {
  items: Item[];
  meta: PaginationMeta;
  links: PaginationLinks;
  pages: string[];
}

export interface DealItem {
  item_id: number;
  item_title: string;
  item_description: string;
  item_price: string;
  item_price_with_currency: string;
  item_image: string;
}

export interface Deal {
  id: number;
  deal_type_translated: string;
  deal_type: string;
  discount_type_translated: string;
  discount_type: string;
  discount_value: string;
  expiary_deal: string;
  capacity_for_deal: string;
  start_date: string;
  end_date: string;
  used_in_translated: string;
  used_in: string;
  terms: string;
  deal_items: DealItem[];
}

export interface DealsData {
  deals: Deal[];
  meta: PaginationMeta;
  links: PaginationLinks;
  pages: string[];
}

interface RestaurantApiResponse {
  data: {
    restaurant: Restaurant;
    items: ItemsData;
    deals: DealsData;
  };
  message: string;
  errors: string[];
  status: number;
}

// ========== Store Interface ==========

interface SingleRestaurantStore {
  restaurant: Restaurant | null;
  items: Item[];
  deals: Deal[];
  loading: boolean;
  error: string | null;
  getRestaurant: (slug: string) => Promise<void>;
}

export const useSingleRestaurantStore = create<SingleRestaurantStore>((set) => ({
  restaurant: null,
  items: [],
  deals: [],
  loading: false,
  error: null,

  getRestaurant: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<RestaurantApiResponse>(`${baseURL}/show-restaurant/${slug}?t=${new Date().getTime()}`);
      const { restaurant, items, deals } = response.data.data;

      set({
        restaurant,
        items: items.items,
        deals: deals.deals,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error?.response?.data?.message || 'Something went wrong',
      });
    }
  },
}));
