import React, { FC, useEffect } from "react";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
// import SectionGridHasMap from "./SectionGridHasMap";
import { Helmet } from "react-helmet-async";
import heroRightImage from "images/fodaboo images/collage2.png";
import SectionGridHasMap from "containers/ListingCarPage/SectionGridHasMap";
import { useParams } from "react-router-dom";
import { useSingleRestaurantStore } from "store/SingleResturantStore";

export interface ListingCarMapPageProps {
  className?: string;
}

const AllMenuItemsPage: FC<ListingCarMapPageProps> = ({ className = "" }) => {
const {resturantName} =useParams()
const {
    restaurant,
    items,
    deals,
    loading,
    error,
    getRestaurant,
  } = useSingleRestaurantStore();

  useEffect(() => {
    if (resturantName) {
      getRestaurant(resturantName);
    }
  }, [resturantName, getRestaurant]);
  // console.log(items);
  
  return (
    <div
      className={`nc-ListingCarMapPage relative ${className}`}
      data-nc-id="ListingCarMapPage"
    >
      <Helmet>
        <title>Chisfis || Booking React Template</title>
      </Helmet>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        <SectionHeroArchivePage
        currentSlug={restaurant?.name}
          rightImage={heroRightImage}
          currentPage="Cars"
          currentTab="Cars"
          countryName={restaurant?.country_name}
          listingType={
            <>
              <i className="text-2xl las la-utensils"></i>
              <span className="ml-2.5">{items?.length} Items</span>
            </>
          }
        />
      </div>

      {/* SECTION */}
      <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap ownerImage={restaurant?.logo} OwnerName={restaurant?.applicant_full_name} countryName={restaurant?.country_name} menuItems={items} dealsItems={deals}/>
      </div>

      <div className="container overflow-hidden">
        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingCarMapPage"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />

        {/* SECTION */}
        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>
      </div>
    </div>
  );
};

export default AllMenuItemsPage;
