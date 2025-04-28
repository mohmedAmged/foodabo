import { create } from 'zustand';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { baseURL } from 'functions/baseUrl';

// Interfaces
interface MyClaimedDealItem {
    id: number;
    title: string;
    description: string;
    price: string;
    price_after_discount: string;
    number_of_recommendations: number;
    category: string;
}

interface MyClaimedDeal {
    code: string;
    deal_type: string;
    discount_type: string;
    discount_value: string;
    restaurant_name: string;
    restaurant_slug: string;
    coupon_image: string;
    restaurant_logo: string;
    used_in: string;
    terms: string;
    items: MyClaimedDealItem[];
}

interface MyClaimedDealsMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface MyClaimedDealsLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

interface MyClaimedDealsAPIResponse {
    deals: MyClaimedDeal[];
    meta: MyClaimedDealsMeta;
    links: MyClaimedDealsLinks;
    pages: string[];
}

interface MyClaimedDealsStoreState {
    deals: MyClaimedDeal[];
    loading: boolean;
    error: string | null;
    fetchMyClaimedDeals: (code?: string, page?: number) => Promise<void>;
}

    export const useMyClaimedDealsStore = create<MyClaimedDealsStoreState>((set) => ({
    deals: [],
    loading: false,
    error: null,

    fetchMyClaimedDeals: async (code, page=1) => {
        try {
        set({ loading: true, error: null });

        const token = Cookies.get('auth_token'); 

        if (!token) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get<{ data: MyClaimedDealsAPIResponse }>(
            `${baseURL}/user/my-claimed-deal?${page}?code=${code}`,
            {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            }
        );

        set({ deals: response.data.data.deals, loading: false });

        } catch (error: any) {
        console.error(error);
        set({
            error: error?.response?.data?.message || error.message || 'Something went wrong',
            loading: false,
        });
        toast.error(error?.response?.data?.message || error.message || 'Failed to fetch deals');
        }
    },
    }));
