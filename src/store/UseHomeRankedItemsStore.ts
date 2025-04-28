import { create } from 'zustand';
import axios from 'axios';
import { baseURL } from 'functions/baseUrl';
import Cookies from 'js-cookie';

export interface RankedItem {
    id: number;
    title: string;
    description: string;
    price: string;
    price_with_currency: string;
    price_after_discount: string;
    category_id: number;
    category_name: string;
    discount_value: string | null;
    discount_type: string | null;
    restaurant_slug: string;
    restaurant_name: string;
    number_of_recommendations: number;
    country_name: string;
    restaurant_logo: string;
    image: string;
}



interface Meta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface State {
    rankedItems: RankedItem[];
    itemMeta: Meta | null;
    loading: boolean;
    error: string | null;
    fetchRankedItems: (page?: number) => Promise<void>;
}

export const UseHomeRankedItemsStore = create<State>((set) => ({
    rankedItems: [],
    itemMeta: null,
    loading: false,
    error: null,

    fetchRankedItems: async (page = 1) => {
        try {
        set({ loading: true, error: null });
        const region = Cookies.get("region");
        const response = await axios.get(`${baseURL}/show-items?restaurants_page=${page}?t=${new Date().getTime()}`, {
            headers: {
                country: region || "",
            },
        });
        

        set({
            rankedItems: response.data.data.items,
            itemMeta: response.data.data.meta,
            loading: false,
        });
        } catch (error) {
        set({ error: 'Failed to fetch items', loading: false });
        }
    },

   
}));
