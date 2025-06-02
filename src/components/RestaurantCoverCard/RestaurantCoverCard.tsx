import { PencilSquareIcon,PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { withRegion } from "functions/withRegionRoute";
import React, { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import { GalleryItem } from "store/UseAllResturantImages";

export interface TagItemProps {
    data: GalleryItem
    removeTag?: () => void;
    deleteImage?: () => void;
    isDashboard: boolean;
  };



const RestaurantCoverImage: FC<TagItemProps> = ({data, removeTag, deleteImage, isDashboard}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow p-4 relative">
       {/* { !data?.has_tags && isDashboard === true &&
        <div className="absolute top-6 right-6 bg-[rgba(0,0,0,0.4)] p-2 rounded-full">
        <PlusCircleIcon
        onClick={()=>(navigate(withRegion(`/user-tags/add-tag-for/${data?.id}`)))} 
         title="Add Tag" aria-hidden="true" className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
        </div>
      } */}
      { isDashboard === true &&
        <div className="absolute top-6 left-6 bg-[rgba(0,0,0,0.4)] p-2 rounded-full">
        <TrashIcon 
        onClick={deleteImage} 
        title="Delete Shot" aria-hidden="true" className="w-4 h-4 text-white cursor-pointer hover:text-gray-300" />
      </div>
      }
      <img src={data?.image} 
      alt={`image_${data?.id}`}
       className="w-full h-48 object-cover rounded-t-2xl" />
      {/* {renderMotalAmenities()} */}
      <ToastContainer />
    </div>
  );
};

export default RestaurantCoverImage;
