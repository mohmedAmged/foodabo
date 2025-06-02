import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { baseURL } from "functions/baseUrl";

interface StoreImageRestaurantState {
  isLoading: boolean;
  storeRestaurantImage: (formData: FormData) => Promise<void>;
}

export const useStoreRestaurantImage = create<StoreImageRestaurantState>((set) => ({
  isLoading: false,

  storeRestaurantImage: async (formData: FormData) => {
    set({ isLoading: true });

    try {
      const token = Cookies.get("auth_token"); 

      const response = await axios.post(
        `${baseURL}/restaurant/store-new-image`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.status === 200) {
        toast.success("Image Added successfully");
      }
    } catch (error: any) {
      console.error("Tag error:", error);
      const message = error?.response?.data?.message || "Failed to create tag";
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
