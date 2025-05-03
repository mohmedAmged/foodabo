import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { baseURL } from "functions/baseUrl";

interface DeleteImageTagState {
  loading: boolean;
  error: string | null;
  success: boolean;
  deleteImageTag: (tagId: number) => Promise<void>;
}

export const useDeleteImageTagStore = create<DeleteImageTagState>((set) => ({
  loading: false,
  error: null,
  success: false,

  deleteImageTag: async (tagId: number) => {
    const token = Cookies.get("auth_token");
    set({ loading: true, error: null, success: false });

    try {
      await axios.delete(`${baseURL}/user/delete-image-tag/${tagId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ loading: false, success: true });
      toast.success("Image deleted successfully!");
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Failed to delete image tag";
      set({ loading: false, error: errorMsg });
      toast.error(errorMsg);
    }
  },
}));
