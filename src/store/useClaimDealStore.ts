
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from 'functions/baseUrl';
import Cookies from 'js-cookie';

type ClaimDealStore = {
    isLoading: boolean;
    claimDeal: (dealId: string) => Promise<void>;
};

export const useClaimDealStore = create<ClaimDealStore>((set) => ({
    isLoading: false,
    claimDeal: async (dealId: string) => {
        set({ isLoading: true });
        try {
        const response = await axios.post(`${baseURL}/user/claim-deal`, 
            {
                deal: dealId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
            }
    );
    if (response.status === 200) {
        toast.success(response.data?.message || 'Claimed successfully');
      }
        console.log('Response:', response.data);
        } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to claim deal');
        console.error('Error claiming deal:', error);
        } finally {
        set({ isLoading: false });
        }
    },
}));
