import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "functions/baseUrl";
import { toast } from "react-toastify";

export interface RemoveTagState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  removeTag: (tagId: number) => Promise<void>;
}

export const useRemoveTagStore = create<RemoveTagState>((set) => ({
  isLoading: false,
  error: null,
  success: false,

  removeTag: async (tagId: number) => {
    const token = Cookies.get("auth_token");
    if (!token) {
      set({ error: "Authentication token not found." });
      return;
    }

    try {
      set({ isLoading: true, error: null, success: false });

      const response = await axios.post(
        `${baseURL}/user/remove-tag`,
        { tag: tagId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ isLoading: false, success: true });
      toast.success(response?.data?.message)
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to remove tag.",
        isLoading: false,
        success: false,
      });
    }
  },
}));
