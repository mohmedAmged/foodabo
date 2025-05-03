import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import CommonLayout from "./CommonLayout";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { withRegion } from "functions/withRegionRoute";
import Cookies from "js-cookie";
import { useUserImagesStore } from "store/UseUserShotsStore";
import UserShotCard from "components/UserShotCard/UserShotCard";
import { useRemoveTagStore } from "store/UseRemoveTagShot";
import { useDeleteImageTagStore } from "store/UseDeleteFullShot";
import { useNavigate } from "react-router-dom";


const UserAccountTags = () => {
     const loginData = Cookies.get("logInData");
     const navigate = useNavigate()
 console.log(loginData);
 const { tags, isLoading, error, fetchUserImages } = useUserImagesStore();
 const { removeTag, success } = useRemoveTagStore();
 const { deleteImageTag, loading } = useDeleteImageTagStore();
 useEffect(() => {
   fetchUserImages();
 }, []);
 const handleRemove = (tagId:number) => {
  removeTag(tagId);
  navigate(withRegion(`/user-tags`));
};
const handleDeleteShot = async (tagId:number) => {
  await deleteImageTag(tagId);
  navigate(withRegion(`/user-tags`))
};
 console.log(tags);
 
  const renderSection2 = () => {
    return (
      <div className="space-y-10 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">User Tags</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
            <div  className="py-10">
                <ButtonPrimary 
                href={`${withRegion('/user-tags/add-new-tag')}`}
                >Add New Tag  <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/></ButtonPrimary>
            </div>
            
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
             
              <Tab as={Fragment}>
                  {({ selected }) => (
                    <button 
                    type="button"
                   
                    className={`px-5 py-2.5 text-sm sm:text-base rounded-full ${selected ? "bg-secondary-900 text-secondary-50" : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                    
                    >
                      All Tags
                    </button>
                  )}
              </Tab>
               
            </Tab.List>
            <div className="mt-4">
                  <div>
                    {isLoading ? <p>Loading...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tags?.map(tag => (
                          <UserShotCard
                            key={tag?.id}
                            data={tag}
                            removeTag={()=>handleRemove(tag?.id)}
                            deleteShot={()=> handleDeleteShot(tag?.id)}
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

export default UserAccountTags;
