import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { StayDataType, TaxonomyType } from "data/types";
import React, { FC, useEffect } from "react";
// import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet-async";
import SectionHero2ArchivePage from "components/SectionHero2ArchivePage/SectionHero2ArchivePage";
import SectionGridFilterCard from "containers/ListingRealEstatePage/SectionGridFilterCard";
import SectionGridFeaturePlaces from "containers/PageHome/SectionGridFeaturePlaces";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { useShowAllDealsHome } from "store/UseShowAllDealsHome";
import ResturantDealsCard from "components/ResturantDealsCard/ResturantDealsCard";


export interface ListingRealEstatePageProps {
  className?: string;
  headText?: string;
}



// const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 16);
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter(item => item.saleOff !== null);

const AllDealsPage: FC<ListingRealEstatePageProps> = ({
  className = "",
}) => {
  useEffect(() => {
    const $body = document.querySelector("body");
    if ($body) {
      $body.className = "theme-cyan-blueGrey";
    }
    return () => {
      if ($body) {
        $body.className = "";
      }
    };
  }, []);
 const { deals, loading, fetchDeals } = useShowAllDealsHome();

  useEffect(() => {
    fetchDeals();
  }, []);
  // console.log(deals);
  
  return (
    <div
      className={`nc-ListingRealEstatePage relative overflow-hidden ${className}`}
      data-nc-id="ListingRealEstatePage"
    >
      <Helmet>
        <title>Chisfis || Booking React Template</title>
      </Helmet>

      <div className="container relative">
        {/* SECTION HERO */}
        <SectionHero2ArchivePage headText={`All Deals`} className="" />

        {/* SECTION */}
        {/* <SectionGridFilterCard className="py-24 lg:py-28" /> */}
        <div className="relative py-24 lg:py-28">
          <BackgroundSection />
          <SectionGridFeaturePlaces stayListings={DEMO_DATA}/>
        </div>
        

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default AllDealsPage;
