import axios from "axios";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";

interface PackageData {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  data: {
    deals: string;
    menu: string;
    awards: string;
    tags: string;
  };
  status: string;
  status_translation: string;
}

interface ActivePackageStore {
  activePackage: PackageData | null;
  options: string[];
  isLoading: boolean;
  error: string | null;
  fetchActivePackage: () => void;
}

const useActivePackageStore = create<ActivePackageStore>((set) => ({
  activePackage: null,
  options: [],
  isLoading: false,
  error: null,
  fetchActivePackage: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${baseURL}/restaurant/active-package?t=${new Date().getTime()}`, {
         headers: 
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
      });

      if (response.status === 200) {
        const { package: activePackage, options } = response.data.data;
        set({ activePackage, options, isLoading: false });
        toast.success(response?.data?.message);
      } else {
        set({ error: "Failed to fetch active package", isLoading: false });
        toast.error(response?.data?.message ||"Failed to fetch active package");
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      toast.error(error?.response?.data?.message||"An error occurred while fetching the active package");
    }
  },
}));

export default useActivePackageStore;
