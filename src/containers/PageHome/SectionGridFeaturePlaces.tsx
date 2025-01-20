import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import { Link, useNavigate } from "react-router-dom";

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

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings,
  gridClass = "",
  heading = "Latest Deals in Amman",
  subHeading = "Discounts & Offers from the best resturants",
  headingIsCenter,
  tabs = ["Burger", "Pizza", "Shawerma", "Kabab"],
}) => {
  const renderCard = (stay: StayDataType) => {
    return <StayCard key={stay.id} data={stay} />;
  };
  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={() => {}}
        allItemsLink="/latest-deals"
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >

        {
          stayListings ? 
            stayListings?.map((stay) => renderCard(stay))
          :
            DEMO_DATA.map((stay) => renderCard(stay))
        }
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <Link to={'/latest-deals'}>
          <ButtonPrimary loading>Show me more</ButtonPrimary>
        </Link>
      </div> */}
    </div>
  );
};

export default SectionGridFeaturePlaces;
