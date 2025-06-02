import { create } from 'zustand';
import axios from 'axios';
import { baseURL } from 'functions/baseUrl';
import Cookies from 'js-cookie';

export interface GalleryItem {
  id: number;
  image: string;
}

interface GalleryState {
  images: GalleryItem[];
  loading: boolean;
  error: string | null;
  fetchImages: () => Promise<void>;
}

export const useAllRestaurantImages = create<GalleryState>((set) => ({
  images: [],
  loading: false,
  error: null,

  fetchImages: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${baseURL}/restaurant/all-gallery?t=${new Date().getTime()}`, {
            headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
            });

      const gallery: GalleryItem[] = response.data.data.gallery;
      set({ images: gallery, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch images', loading: false });
    }
  },
}));
