import React, { FC, useState } from "react";
import FormItem from "containers/PageAddListing1/FormItem";
import CommonLayout from "./CommonLayout";
import { toast } from "react-toastify";
import { withRegion } from "functions/withRegionRoute";
import { useNavigate } from "react-router-dom";
import { useStoreRestaurantImage } from "store/UseStoreNewImageForRestaurant";


const StoreNewRestaurantImage  = () => {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { storeRestaurantImage, isLoading: submitting } = useStoreRestaurantImage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!imageFile) {
            toast.error("Image is required.");
            return;
        }
    
        const formData = new FormData();
        formData.append("image", imageFile);
    
        await storeRestaurantImage(formData);
        setImageFile(null);
        navigate(withRegion('/account-images'));
    };
  return (
    <CommonLayout>
        <div className="nc-PageAddListing1 space-y-10 sm:space-y-8">
      <form 
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl font-semibold">List New Image</h2>
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

        </div>
        <button type="submit"  disabled={submitting} className="px-4 py-2 bg-blue-500 text-white rounded">
        {submitting ? "Submitting..." : "Add Image"}
        </button>
      </form>
    </div>
    </CommonLayout>
  );
};

export default StoreNewRestaurantImage;
