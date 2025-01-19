import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { FC } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export interface ListingStayPageProps {
  className?: string;
  categSlug?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  const {categSlug} = useParams()
  console.log(categSlug);
  
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
          currentSlug= {categSlug}
          className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
        />

        {/* SECTION 1 */}
        <div className="relative  py-24">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore The Best Chosen"
            subHeading="As per the customers rating"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingStayMapPage"
          />
        </div>

        {/* SECTION */}
        <SectionGridFilterCard currentSlug= {categSlug || ''} className="py-16 lg:pb-28" />

       {/* SECTION */}
       <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />

        
      </div>
    </div>
  );
};

export default ListingStayPage;
