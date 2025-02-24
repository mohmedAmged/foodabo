
import axios from 'axios';
import { baseURL } from 'functions/baseUrl';
import { toast } from 'react-toastify';
import { create } from 'zustand';

interface PackageData {
  id: number;
  name: string;
  price: string;
  price_after_discount: string;
  duration: number;
  data: {
    deals: string;
    menu: string;
    awards: string;
    tags: string;
  };
}

interface AllPackageStore {
  packages: PackageData[];
  isLoading: boolean;
  fetchPackages: () => Promise<void>;
  setPackages: (packages: PackageData[]) => void;
}

export const useAllPackageStore = create<AllPackageStore>((set) => ({
  packages: [],
  isLoading: false,
  fetchPackages: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${baseURL}/all-packages`);

      if (response.data.status === 200) {
        set({ packages: response.data.data.packages });
       
        toast.success(response?.data?.message || 'Packages fetched successfully!')
      } else {
        toast.error(response?.data?.message ||'Failed to fetch packages.')
      }
    } catch (error: any) {
        toast.error(error?.response?.data?.message || 'An error occurred while fetching packages.')
    } finally {
      set({ isLoading: false });
    }
  },
  setPackages: (packages) => set({ packages }),
}));
