import React, { FC, ReactNode, useEffect } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import { Link, useNavigate } from "react-router-dom";
import { Restaurant, UseHomeResturantsAndCuisinesStore } from "store/UseHomeResturantsAndCuisinesStore";
import HomeResturantCard from "components/HomeResturantCardSec/HomeResturantCard";
import Cookies from "js-cookie";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const ResturantSection: FC<SectionGridFeaturePlacesProps> = ({
  stayListings,
  gridClass = "",
  heading = "Latest Deals in Amman",
  subHeading = "Discounts & Offers from the best resturants",
  headingIsCenter,
  // tabs = ["Burger", "Pizza", "Shawerma", "Kabab"],
}) => {
  // const renderCard = (restaurant: Restaurant) => {
  //   const stayFormatted = {
  //     id: restaurant.id,
  //     title: `${restaurant.name}`,
  //     href: `/restaurant/${restaurant.slug}`,
  //     galleryImgs: restaurant.images.map((img) => img.image),
  //     address: `${restaurant.country_name}`,
  //     like: restaurant.followed,
  //     saleOff: "10% OFF", // static or remove if not needed
  //     isAds: false,
  //     reviewStart: 4.3,
  //     reviewCount: 120,
  //     bedrooms: 0, // optional
  //     // listingCategory: { name: restaurant.cuisine_name },
  //     price: "$$", // optional
  //     author: "",  // Add missing fields, even if static
  //     date: "",    // Add missing fields, even if static
  //     featuredImage: "", // Add missing fields, even if static
  //     commentCount: 0, 
  //   };
  
  //   return <StayCard key={stayFormatted.id} data={stayFormatted} />;
  // };
  const {
    restaurants,
    cuisines,
    restaurantMeta,
    cuisineMeta,
    loading,
    fetchRestaurants,
    fetchCuisines,
  } = UseHomeResturantsAndCuisinesStore();
        const region = Cookies.get("region");
  useEffect(() => {
    fetchRestaurants();
    fetchCuisines();
  }, [fetchRestaurants, fetchCuisines]);
  console.log(restaurants);
  console.log(cuisines);
  
  // const transformRestaurantToStay = (restaurant: Restaurant) => {
  //   return {
  //     id: restaurant.id,
  //     title: restaurant.name,
  //     href: `/restaurant/${restaurant.slug}`,
  //     galleryImgs: restaurant.images.map((img) => img.image),
  //     address: restaurant.country_name,
  //     like: restaurant.followed,
  //     saleOff: "10% OFF", 
  //     isAds: false, 
  //     reviewStart: 4.5, 
  //     reviewCount: 100, 
  //     bedrooms: 0, 
     
  //     price: "$$", 
  //   };
  // };
  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={cuisines[0]?.name}
        subHeading={subHeading}
        tabs={cuisines.map(cuisine => cuisine.name)}
        heading={heading}
        onClickTab={() => {}}
        allItemsLink="/latest-deals"
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >

        {/* {
          stayListings ? 
            stayListings?.map((stay) => renderCard(stay))
          :
            DEMO_DATA.map((stay) => renderCard(stay))
          // restaurants?.map((el)=>(
          //   <HomeResturantCard key={el?.id} data={el}/>
          // ))
        } */}
        {restaurants.length > 0
  ? restaurants?.map((el)=>(
       <HomeResturantCard key={el?.id} data={el}/>
     ))
  : ''
}
       
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Link to={'/latest-deals'}>
          <ButtonPrimary loading>Show me more</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default ResturantSection;
