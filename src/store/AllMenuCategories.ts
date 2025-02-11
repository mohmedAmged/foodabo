import { baseURL } from 'functions/baseUrl';
import { create } from 'zustand';
import { toast } from 'react-toastify'; // Importing the toast function
import Cookies from 'js-cookie';

interface Category {
    id: number;
    name: string;
    name_ar: string;
    name_en: string;
}

interface CategoriesState {
    categories: Category[];
    totalPages: number;
    currentPage: number;
    fetchCategories: (page: number) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
    categories: [],
    totalPages: 1,
    currentPage: 1,
    fetchCategories: async (page: number = 1) => {
        try {
        const response = await fetch(`${baseURL}/restaurant/categories?page=${page}?t=${new Date().getTime()}`
            ,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("auth_token")}`,
                    },
                }
        );
        const data = await response.json();

        // Check if the request is successful
        if (response.ok) {
            set({
            categories: data.data.categories,
            totalPages: data.data.meta.last_page,
            currentPage: page,
            });

            // Display success toast
            toast.success('Categories fetched successfully!');
        } else {
            // Handle non-200 response
            toast.error('Failed to fetch categories.');
        }
        } catch (error) {
        console.error('Error fetching categories:', error);
        // Show error toast if something goes wrong
        toast.error('Error fetching categories.');
        }
    },
}));
