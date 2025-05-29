import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from 'functions/baseUrl';
import Cookies from 'js-cookie';

// Types
    interface Restaurant {
    slug: string;
    name: string;
    logo: string;
    }

    export interface Deal {
    id: number;
    deal_type_translated: string;
    deal_type: string;
    discount_type_translated: string;
    discount_type: string;
    discount_value: string;
    expiary_deal: string | null;
    capacity_for_deal: string | null;
    start_date: string | null;
    end_date: string | null;
    used_in_translated: string;
    used_in: string;
    terms: string;
    restaurant: Restaurant;
    items_count: number;
    }

    interface DealsMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    }

    interface DealsResponse {
    deals: Deal[];
    meta: DealsMeta;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    pages: string[];
    }

    interface DealsStore {
    deals: Deal[];
    meta: DealsMeta | null;
    loading: boolean;
    fetchDeals: () => Promise<void>;
    }

    // Store
    export const useShowAllDealsHome = create<DealsStore>((set) => ({
    deals: [],
    meta: null,
    loading: false,

    fetchDeals: async () => {
        set({ loading: true });
        try {
            const region = Cookies.get("region");
            const response = await axios.get(`${baseURL}/show-all-deals`, 
            {
                headers: {
                    country: region || "",
                }
            });
        const { deals, meta } = response.data.data.deals;

        set({ deals, meta });
        } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to load deals.');
        } finally {
        set({ loading: false });
        }
    },
    }));
