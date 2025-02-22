// store/dealsStore.ts
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";

export interface DealItem {
  deal_item_id: number;
  item_id: number;
  item: string;
}

export interface Deal {
  id: number;
  deal_type_translated: string;
  deal_type: string;
  discount_type_translated: string;
  discount_type: string;
  discount_value: string;
  expiary_deal: string | null;
  capacity_for_deal: string | null;
  start_date: string | null;
  end_date: string | null;
  used_in_translated: string;
  used_in: string;
  terms: string;
  deal_items: DealItem[];
}

interface DealsStore {
  deals: Deal[];
  setDeals: (deals: Deal[]) => void;
  fetchDeals: () => Promise<void>;
}

export const useDealsStore = create<DealsStore>((set) => ({
  deals: [],
  setDeals: (deals) => set({ deals }),
  fetchDeals: async () => {
    try {
      const response = await axios.get(`${baseURL}/restaurant/all-deals?t=${new Date().getTime()}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      const fetchedDeals: Deal[] = response.data.data.deals;
      set({ deals: fetchedDeals });
      toast.success('deals loaded successfully');
    } catch (error: any) {
      toast.error("deals data not found");
    }
  },
}));
