import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { create } from "zustand";
interface DocumentItem {
    id: number;
    document: string;
    type: string; // If 'type' can have specific values, use: type: "image" | "pdf" | "other";
}
interface SingleResturant {
    id: number;
    applicant_full_name: string;
    name: string;
    email: string;
    phone: string;
    call_center_number: string;
    country: string;
    cuisine: string;
    logo: string;
    documents: DocumentItem[];
    remaining_documents: number;
    menu_file: string;
    package: number;
    package_status: string;
}

interface ResturantState {
  resturant: SingleResturant | null;
  fetchResturant: () => Promise<void>;
}

const useResturantDataStore = create<ResturantState>((set) => ({
        resturant: null,
        fetchResturant: async () => {
        try {
        const response = await fetch(`${baseURL}/restaurant/show-profile?t=${new Date().getTime()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
            }
        );
        const data = await response.json();

        if (data.data && data.data.restaurant) {
            set({ resturant: data.data.restaurant });
            toast.success('resturant data loaded successfully')
        } else {
            toast.error('resturant data not found')
        }
        } catch (error: any) {
            toast.error(error.response.data.message)

        console.error("Error fetching resturant data:", error);
        }
    },
}));

export default useResturantDataStore;