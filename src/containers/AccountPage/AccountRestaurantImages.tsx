import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import CommonLayout from "./CommonLayout";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useDealsStore } from "store/AllResturantDeals";
import ResturantDealsCard from "components/ResturantDealsCard/ResturantDealsCard";
import { withRegion } from "functions/withRegionRoute";
import { useAllRestaurantImages } from "store/UseAllResturantImages";
import RestaurantCoverImage from "components/RestaurantCoverCard/RestaurantCoverCard";
import { useDeleteCoverImageStore } from "store/UseDeleteRestaurantCoverImage";
import { useNavigate } from "react-router-dom";


const AccountRestaurantImages = () => {
        const navigate = useNavigate();
  const { images, loading, error, fetchImages } = useAllRestaurantImages();
console.log(images);
    const { deleteCoverImage } = useDeleteCoverImageStore();

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);
    // const [loading, setLoading] = useState(false);
    const handleDeleteImage = async (imgId:number) => {
        await deleteCoverImage(imgId);
        navigate(withRegion(`/account-images`))
    };
  const [items, setItems] = useState([]);

  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item: any) => item.id !== id));

  };
  const renderSection2 = () => {
    return (
      <div className="space-y-10 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Resturant Images</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
            <div  className="py-10">
                <ButtonPrimary 
                // href={'/Add-new-deal'}
                href={`${withRegion('/account-images/store-new-image')}`}
                >Add New Image  <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/></ButtonPrimary>
            </div>
            
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
             
              <Tab as={Fragment}>
                  {({ selected }) => (
                    <button 
                    type="button"
                    // onClick={() => handleCategoryClick(undefined)}
                    className={`px-5 py-2.5 text-sm sm:text-base rounded-full ${selected ? "bg-secondary-900 text-secondary-50" : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                    
                    >
                      All Images
                    </button>
                  )}
              </Tab>
                {/* {categories?.map((item) => (
                  <Tab key={item?.id} as={Fragment}>
                    {({ selected }) => (
                    
                    
                    <button
                        type="button"
                        // onClick={() => handleCategoryClick(item.id)}
                        className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                          selected
                            ? "bg-secondary-900 text-secondary-50 "
                            : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        } `}
                      >
                        {item?.name}
                      </button>
                    )}
                  </Tab>
                ))} */}
            </Tab.List>
            <div>
                  <div className="mt-4">
                    {loading ? <p>Loading...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {images?.map(img => (
                            <RestaurantCoverImage
                                key={img.id}
                                data={img}
                                isDashboard={true}
                                deleteImage={()=>handleDeleteImage(img?.id)}
                            />
                      ))}
                  </div>
                  
                    )}
                      
                  </div>
            </div>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>
      
      {renderSection2()}

        
      </CommonLayout>
    </div>
  );
};

export default AccountRestaurantImages;
