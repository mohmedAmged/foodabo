import React, { FC, useEffect, useState } from "react";
import FormItem from "containers/PageAddListing1/FormItem";
import CommonLayout from "./CommonLayout";
import { useRestaurantItemsToTagStore } from "store/UseRestaurantItemsToTagStore";
import { useTagRestaurantStore } from "store/UseTagRestaurantStore";
import { toast } from "react-toastify";
import { useTagRestaurantOrItemForImage } from "store/UseTagResurantOrItemForImage";
import { useNavigate, useParams } from "react-router-dom";
import { useAllRestaurantsToTagStore } from "store/AllResturantInTags";
import { withRegion } from "functions/withRegionRoute";
// import useAllMenuItemsStore from "store/AllMenuItems";


const AddTagForImage  = () => {
    const {tagID} = useParams();
    const navigate = useNavigate();
    const [selectedRestaurant, setSelectedRestaurant] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const uniqueTagID: any = tagID;
    const { items, fetchRestaurantItems, isLoading: itemsLoading } = useRestaurantItemsToTagStore();
    const { restaurants, fetchAllRestaurants } = useAllRestaurantsToTagStore();
    const { tagRestaurant, isLoading: submitting } = useTagRestaurantOrItemForImage();
    
    useEffect(() => {
      fetchAllRestaurants()
      }, [fetchAllRestaurants]);
    
      useEffect(() => {
    if (selectedRestaurant) {
        fetchRestaurantItems(selectedRestaurant);
    }
    }, [selectedRestaurant]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("tag", uniqueTagID);
        if (selectedRestaurant) formData.append("restaurant", selectedRestaurant);
        if (selectedItem) formData.append("item", selectedItem);
    
        await tagRestaurant(formData);

        setSelectedRestaurant("");
        setSelectedItem("");
        navigate(withRegion('/user-tags'));
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
          <FormItem label="Choose restaurant to tag">
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

export default AddTagForImage;
