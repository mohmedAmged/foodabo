import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "functions/baseUrl";

interface TaggedRestaurant {
  name: string;
  logo: string;
  slug: string;
}

interface TaggedItem {
  id: number;
  title: string;
  image: string;
}

export interface UserTag {
  id: number;
  restaurant: TaggedRestaurant | null;
  item: TaggedItem | null;
  image: string;
  has_tags: boolean;
}

interface UserImagesState {
  tags: UserTag[];
  isLoading: boolean;
  error: string | null;
  fetchUserImages: () => Promise<void>;
}

export const useUserImagesStore = create<UserImagesState>((set) => ({
  tags: [],
  isLoading: false,
  error: null,

  fetchUserImages: async () => {
    const token = Cookies.get("auth_token");
    if (!token) {
      set({ error: "Authentication token not found." });
      return;
    }

    try {
      set({ isLoading: true, error: null });

      const response = await axios.get(`${baseURL}/user/all-images?t=${new Date().getTime()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        tags: response.data.data.tags,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch user images.",
        isLoading: false,
      });
    }
  },
}));
