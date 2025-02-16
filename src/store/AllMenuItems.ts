import axios from "axios";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  category_id: number;
}

interface MenuState {
  menuItems: MenuItem[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  fetchMenuItems: (page: number) => void;
}

const useAllMenuItemsStore = create<MenuState>((set) => ({
  menuItems: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  fetchMenuItems: async (page: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${baseURL}/restaurant/show-menu?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
            Accept: "application/json",
          },
        }
      );

      const { items, meta } = response.data.data;
      set({
        menuItems: items,
        currentPage: page,
        totalPages: meta.last_page,
        loading: false,
      });

      toast.success("Menu loaded successfully!");
    } catch (error) {
      set({ loading: false, error: "Failed to fetch menu items." });
      toast.error("Failed to load menu.");
    }
  },
}));

export default useAllMenuItemsStore;
