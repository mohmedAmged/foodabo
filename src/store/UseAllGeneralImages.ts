import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from 'functions/baseUrl';
import Cookies from 'js-cookie';

// Interfaces
    interface IUser {
    id: number;
    name: string;
    username: string;
    image: string;
    }

    interface IItem {
    id: number;
    title: string;
    image: string;
    number_of_tags: string;
    }

    interface IRestaurant {
    slug: string;
    name: string;
    logo: string;
    number_of_tags: string;
    }

    interface ITag {
    id: number;
    user: IUser;
    item: IItem | null;
    restaurant: IRestaurant | null;
    image: string;
    }

    interface IMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    }

    interface IRestaurantFilter {
    name: string;
    slug: string;
    }

    interface ICuisineFilter {
    id: number;
    name: string;
    }

    interface IImageStore {
    tags: ITag[];
    meta: IMeta | null;
    restaurants: IRestaurantFilter[];
    cuisines: ICuisineFilter[];
    isLoading: boolean;
    fetchImages: (params?: { restaurant?: string; cuisine?: number; page?: number }) => Promise<void>;
    }


    export const useAllGeneralImageStore = create<IImageStore>((set) => ({
    tags: [],
    meta: null,
    restaurants: [],
    cuisines: [],
    isLoading: false,

    fetchImages: async (params = {}) => {
        set({ isLoading: true });
        const region = Cookies.get("region");
        try {
        const response = await axios.get(`${baseURL}/all-images`, {
            headers: 
            {
                country: region || "",
            }, 
            params
            });
        const resData = response.data?.data?.data;

        set({
            tags: resData.tags.tags,
            meta: resData.tags.meta,
            restaurants: resData.restaurants,
            cuisines: resData.cuisines,
            isLoading: false,
        });
        } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to fetch images');
        set({ isLoading: false });
        }
    },
    }));
