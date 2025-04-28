import React, { FC } from "react";
import { DEMO_CAR_LISTINGS, DEMO_MENU_LISTINGS } from "data/listings";
import { CarDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { Item } from "store/SingleResturantStore";

export interface MenuCardProps {
  className?: string;
  MenuItem?: Item;
  countryName?: string;
  ownerName?: string;
  ownerImage?: string
}

// const DEMO_DATA: CarDataType = DEMO_MENU_LISTINGS[0];

const MenuItemCard: FC<MenuCardProps> = ({
     className = "", 
     MenuItem,
     countryName,
     ownerName,
     ownerImage
    }) => {
console.log(MenuItem);

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full flex items-center justify-center md:w-72 flex-shrink-0 border-r border-neutral-100 dark:border-neutral-800">
        <div className="w-full py-5 sm:py-0">
          <NcImage className="w-full" src={MenuItem?.image} />
        </div>
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3" /> */}
        {MenuItem?.discount_value !== null && <SaleOffBadge desc={MenuItem?.discount_value} className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2 className="text-xl font-semibold capitalize">
              <span className="line-clamp-1">{MenuItem?.title}</span>
            </h2>
          </div>
          <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
            <StartRating reviewCount={MenuItem?.number_of_recommendations} point={3} />
            <span>· </span>
            <div className="flex items-center">
              <span className="hidden sm:inline-block  text-base">
                <i className="las la-map-marked"></i>
              </span>
              <span className="sm:ml-2 line-clamp-1"> {countryName}</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        {/* SHOW MOBILE */}
        <div className="flex sm:hidden items-center text-sm text-neutral-500 dark:text-neutral-400 space-x-2 mt-4 sm:mt-0">
          {/* <span>4 seats</span>
          <span>· </span>
          <span>Auto gearbox</span>
          <span>· </span>
          <span>4 seats</span> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, aut vel repudiandae ratione omnis earum ut. Corrupti harum mollitia delectus tempore ipsum. Ad quam provident deserunt sapiente, atque minima sequi.
          </p>
        </div>
        {/* SHOW DESK */}
        <div className="hidden sm:flex items-center space-x-8">
          {/* --- */}
          <div className="flex items-center space-x-2">
            {/* <i className="las la-user-friends text-xl"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              4 seats
            </span> */}
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque consequatur, fugiat facere ullam ratione omnis et atque magni dicta impedit consequuntur ad quos nobis iusto molestias, placeat sit, amet nulla.
            </p>
          </div>
          {/* --- */}
          {/* <div className="flex items-center space-x-2">
            <i className="las la-dharmachakra text-xl"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Auto gearbox
            </span>
          </div> */}
          {/* --- */}
          {/* <div className="flex items-center space-x-2">
            <i className="las la-suitcase text-xl"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              2 bags
            </span>
          </div> */}
        </div>

        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-3 text-sm text-neutral-700  dark:text-neutral-300">
            <Avatar imgUrl={ownerImage} userName={ownerName} />
            {/* <span className="hidden sm:inline-block">
              <span className="hidden sm:inline">users Review</span>{" "}
              {author.displayName}
            </span> */}
          </div>
          {/* <span className="text-lg font-semibold text-secondary-700">
            {MenuItem?.price_with_currency}
          </span> */}
          <span className="text-lg font-semibold text-secondary-700">
            {MenuItem?.discount_value !== null ? (
              <>
                <span className="line-through text-gray-500 ml-3">
                  {MenuItem?.price_with_currency}
                </span>
                <span className="text-primary-600">
                  {MenuItem?.price_after_discount}
                </span>
              </>
            ) : (
              MenuItem?.price_with_currency
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-CarCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="CarCardH"
    >
      <Link to={''} className="flex flex-col md:flex-row">
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default MenuItemCard;
