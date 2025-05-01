import React, { FC, useEffect, useState } from "react";
import FormItem from "containers/PageAddListing1/FormItem";
import CommonLayout from "./CommonLayout";
import { useRestaurantItemsToTagStore } from "store/UseRestaurantItemsToTagStore";
import { useTagRestaurantStore } from "store/UseTagRestaurantStore";
import { toast } from "react-toastify";
// import useAllMenuItemsStore from "store/AllMenuItems";


const AddNewTag  = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { items, fetchRestaurantItems, isLoading: itemsLoading } = useRestaurantItemsToTagStore();
    const { tagRestaurant, isLoading: submitting } = useTagRestaurantStore();

    useEffect(() => {
    if (selectedRestaurant) {
        fetchRestaurantItems(selectedRestaurant);
    }
    }, [selectedRestaurant]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!imageFile) {
            toast.error("Image is required.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", imageFile);
        if (selectedRestaurant) formData.append("restaurant", selectedRestaurant);
        if (selectedItem) formData.append("item", selectedItem);
    
        await tagRestaurant(formData);

        setSelectedRestaurant("");
        setSelectedItem("");
        setImageFile(null);
    };
  return (
    <CommonLayout>
        <div className="nc-PageAddListing1 space-y-10 sm:space-y-8">
      <form 
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl font-semibold">List your Tag</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            choose which menu item you want to add a deal for
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <FormItem>
        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Choose Image</label>
        <input
        id="image" 
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
        className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2" 
        />
        </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Choose restaurant to tag (optional)">
            <select
              name="restaurant"
              title="restaurant"
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
            >
               <option value="">Select Restaurant</option>
                <option value="restaurant-1">restaurant</option>
                <option value="buffalo-burger-12">buffalo burger</option>
            </select>
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* if limited deal type */}
          
          <FormItem label="Choose Menu Item to tag (optional)">
              <select
              name="item"
              title="item"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
            >
                <option value="">Select Menu Item</option>
                {items?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.title}
                  </option>
                ))}
            </select>
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        </div>
        <button type="submit"  disabled={submitting} className="px-4 py-2 bg-blue-500 text-white rounded">
        {submitting ? "Submitting..." : "Create Tag"}
        </button>
      </form>
    </div>
    </CommonLayout>
  );
};

export default AddNewTag;
