// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CardCategoryBox1 from "components/CardCategoryBox1/CardCategoryBox1";

import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
// import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
// import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { FC, useEffect } from "react";
// import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet-async";
import Heading from "components/Heading/Heading";
import { TaxonomyType } from "data/types";
import CuisineCardBox from "components/CuisineCardBox/CuisineCardBox";
import { UseHomeResturantsAndCuisinesStore } from "store/UseHomeResturantsAndCuisinesStore";


export interface ListingStayPageProps {
    className?: string;
    headingCenter?: boolean;
    gridClassName?: string;

}
const AllCategories: FC<ListingStayPageProps> = (
    { 
        className = "" ,
        headingCenter = true,
        gridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
) => {
   const {
      cuisines,
      restaurants,
      cuisineMeta,
      loading,
      fetchRestaurants,
      fetchCuisines,
    } = UseHomeResturantsAndCuisinesStore();
  
      useEffect(() => {
        fetchRestaurants();
        fetchCuisines();
      }, [fetchCuisines]);
      console.log(cuisines);
  return (
        <div
        className={`nc-ListingStayPage relative overflow-hidden ${className}`}
        data-nc-id="ListingStayPage"
        >
            <Helmet>
                <title>Chisfis || Booking React Template</title>
            </Helmet>
            <BgGlassmorphism />

            <div className="container relative overflow-hidden">
                {/* SECTION HERO */}
                <SectionHeroArchivePage
                resturantsCount={restaurants?.length}
                countryName={restaurants[0]?.country_name}
                currentPage="Stays"
                currentTab="Stays"
                currentSlug= 'All Categories'
                className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
                />

                {/* SECTION 1 */}
                <div className={`nc-SectionGridCategoryBox py-16 relative ${className}`}>
                    <Heading
                        desc="Check What ammanis voted for"
                        isCenter={headingCenter}
                    >
                        Find The Best
                    </Heading>
                    <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-8`}>
                    {cuisines?.map((item) => (
          <CuisineCardBox key={item?.id} data={item} />
        ))}
                    </div>
                </div>
                
            </div>
        </div>
  );
};

export default AllCategories;
