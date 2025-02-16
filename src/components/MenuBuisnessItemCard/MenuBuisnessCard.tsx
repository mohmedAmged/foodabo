import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export interface MenuBuisnessCardProps {
  data: {
    id: number;
    image: string;
    title_en: string;
    price: string;
    description_en: string;
    category: string;
    number_of_recommendations: number;
  };
  onDelete: (id: number) => void;
}

const MenuBuisnessCard: FC<MenuBuisnessCardProps> = ({ data, onDelete }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoaded(true);
      console.log("Rendered with data:", data);
    };
    fetchData();
  }, [data]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${baseURL}/restaurant/delete-item/${data.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      
       // Notify the parent component that the item has been deleted
      if (response?.data?.status === 200) {
        toast.success(response?.data?.mesage)
        onDelete(id);
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  if (!loaded) {
    return <p>Loading item...</p>;
  }

  const { image, title_en, price, description_en, category, number_of_recommendations, id } = data;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow p-4 relative">
       <div className="absolute top-6 right-6 bg-[rgba(0,0,0,0.4)] p-2 rounded-full">
        <PencilSquareIcon title="Edit item" aria-hidden="true" className="w-4 h-4 text-white cursor-pointer hover:text-gray-300" />
      </div>
      <div className="absolute top-6 left-6 bg-[rgba(0,0,0,0.4)] p-2 rounded-full">
        <TrashIcon  onClick={handleDelete} title="Delete Item" aria-hidden="true" className="w-4 h-4 text-white cursor-pointer hover:text-gray-300" />
      </div>
      <img src={image} alt={title_en} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{title_en}</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{description_en}</p>
        <p className="text-base font-bold mt-2">${price}</p>
        <p className="text-sm mt-1">Category: {category}</p>
        <p className="text-sm mt-1">Recommendations: {number_of_recommendations}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MenuBuisnessCard;
