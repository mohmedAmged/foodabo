import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { baseURL } from "functions/baseUrl";

interface DeleteCoverImageState {
  loading: boolean;
  error: string | null;
  success: boolean;
  deleteCoverImage: (imgId: number) => Promise<void>;
}

export const useDeleteCoverImageStore = create<DeleteCoverImageState>((set) => ({
  loading: false,
  error: null,
  success: false,

  deleteCoverImage: async (imgId: number) => {
    const token = Cookies.get("auth_token");
    set({ loading: true, error: null, success: false });

    try {
      await axios.delete(`${baseURL}/restaurant/delete-image/${imgId}`, {
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
