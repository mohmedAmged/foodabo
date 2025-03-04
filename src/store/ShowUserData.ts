import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
interface cuisineItem {
    id: number;
    name: string;
}
interface SingleUserData {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    phone_code: string;
    fullphone: string;
    country_id: number;
    country_name: string;
    city_id: number;
    city_name: string;
    lang: string;
    followers_count: number;
    following_count: number;
    shots_count: number;
    is_verified: boolean;
    cuisines: cuisineItem[];
    cuisines_count: number;
    favorite_restaurant_count: number;
    image: string;
}

interface UserState {
  userData: SingleUserData | null;
  fetchUserData: () => Promise<void>;
}

const useUserDataStore = create<UserState>((set) => ({
    userData: null,
    fetchUserData: async () => {
        const loginType = Cookies.get("loginType");
        if (loginType !== 'user') {
            return;
        }
        try {
        const response = await fetch(`${baseURL}/user/user-show-profile?t=${new Date().getTime()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
            }
        );
        const data = await response.json();

        if (data.data && data.data.user) {
            set({ userData: data.data.user });
        }
        } catch (error: any) {
            toast.error(error.response.data.message || 'Error fetching user data');
        }
    },
}));

export default useUserDataStore;