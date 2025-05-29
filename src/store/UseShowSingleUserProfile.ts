// stores/useUserStore.ts
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from 'functions/baseUrl';

    interface Restaurant {
    name: string;
    slug: string;
    logo: string;
    }

    interface Item {
    id: number;
    title: string;
    image: string;
    }

    interface Tag {
    id: number;
    restaurant: Restaurant;
    item: Item | null;
    image: string;
    has_tags: boolean;
    }

    interface User {
    id: number;
    name: string;
    username: string;
    image: string;
    shots_count: number;
    followers_count: number;
    followings_count: number;
    favorite_restaurant_count: number;
    }

    interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    }

    interface PaginationLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
    }

    interface UserResponse {
        data: {
            user: User;
            restaurants: {
                restaurants: Restaurant[];
                meta: PaginationMeta;
                links: PaginationLinks;
                pages: string[];
            };
            tags: {
                tags: Tag[];
                meta: PaginationMeta;
                links: PaginationLinks;
                pages: string[];
            };
        }
    }

    interface UserStore {
    userData: UserResponse | null;
    loading: boolean;
    error: string | null;
    fetchUser: (userId: number, restaurantSlug?: string) => Promise<void>;
    }

    export const useUserStore = create<UserStore>((set) => ({
    userData: null,
    loading: false,
    error: null,

    fetchUser: async (userId, restaurantSlug) => {
        set({ loading: true, error: null });

        try {
        const response = await axios.get<UserResponse>(`${baseURL}/show-user/${userId}`, {
            params: restaurantSlug ? { restaurant: restaurantSlug } : {},
        });

        set({ userData: response.data, loading: false });
        } catch (error: any) {
        const errMsg = error.response?.data?.message || 'Failed to fetch user data';
        toast.error(errMsg);
        set({ error: errMsg, loading: false });
        }
    },
    }));
