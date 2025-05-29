import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import HeaderFilter from "containers/PageHome/HeaderFilter";
import ResturantSection from "containers/PageHome/ResturantsSection";
import React, { FC, useEffect } from "react";
// import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { UseHomeResturantsAndCuisinesStore } from "store/UseHomeResturantsAndCuisinesStore";

export interface ListingStayPageProps {
  className?: string;
  categSlug?: string;
}

const CuisineSinglePage: FC<ListingStayPageProps> = ({ className = "" }) => {
  const {cuisineID} = useParams();
  const uniqueCuisineID: any = cuisineID;
  console.log(cuisineID);
    const {
      restaurants,
      cuisines,
      restaurantMeta,
      cuisineMeta,
      loading,
      fetchRestaurants,
      fetchCuisines,
    } = UseHomeResturantsAndCuisinesStore();
    console.log(Number(uniqueCuisineID));
    
      useEffect(() => {
        fetchRestaurants(1,uniqueCuisineID);
        fetchCuisines(1, uniqueCuisineID)
      }, [fetchRestaurants,fetchCuisines, uniqueCuisineID]);
      console.log(restaurants);
      const cuisineFetched = cuisines?.find(
        (cuisine) => cuisine.id.toString() === cuisineID
      );
      console.log(cuisineFetched);
      
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
              currentPage="Stays"
              currentTab="Stays"
              currentSlug= {restaurants[0]?.cuisine_name}
              countryName={restaurants[0]?.country_name}
              resturantsCount={restaurants?.length}
              rightImage={cuisineFetched?.image}
              className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
            />
    
            {/* SECTION 1 */}
            {/* <div className="relative  py-24">
              <BackgroundSection />
              <SectionSliderNewCategories
                heading="Explore The Best Chosen"
                subHeading="As per the customers rating"
                categoryCardType="card5"
                itemPerRow={5}
                sliderStyle="style2"
                uniqueClassName="ListingStayMapPage"
              />
            </div> */}
            <div className="relative py-16">
            <BackgroundSection />
            <HeaderFilter
                tabActive={cuisineFetched?.name}
                subHeading={"As per the customers rating"}
                // tabs={cuisineFetched?.name}
                heading={'Explore The Best Chosen'}
                onClickTab={() => {}}
                allItemsLink="/latest-deals"
            />
            <ResturantSection hasHeaderFilter={false} restaurants={restaurants} cuisines={cuisines}/>
            </div>
    
            {/* SECTION */}
            {/* <SectionGridFilterCard currentSlug= {categSlug || ''} className="py-16 lg:pb-28" /> */}
    
           {/* SECTION */}
           {/* <div className="relative py-16 mb-24 lg:mb-28">
              <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
              <SectionGridAuthorBox />
            </div> */}
    
            {/* SECTION */}
            <SectionSubscribe2 className="py-24 lg:py-28" />
    
            
          </div>
        </div>
      );
};

export default CuisineSinglePage;
