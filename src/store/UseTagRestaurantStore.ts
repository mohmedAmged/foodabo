import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { baseURL } from "functions/baseUrl";

interface TagRestaurantState {
  isLoading: boolean;
  tagRestaurant: (formData: FormData) => Promise<void>;
}

export const useTagRestaurantStore = create<TagRestaurantState>((set) => ({
  isLoading: false,

  tagRestaurant: async (formData: FormData) => {
    set({ isLoading: true });

    try {
      const token = Cookies.get("auth_token"); 

      const response = await axios.post(
        `${baseURL}/user/tag-restaurant`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Tag created successfully");
    } catch (error: any) {
      console.error("Tag error:", error);
      const message = error?.response?.data?.message || "Failed to create tag";
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
