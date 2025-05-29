import React, { FC, ReactNode } from "react";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import { Link } from "react-router-dom";
import HomeResturantCard from "components/HomeResturantCardSec/HomeResturantCard";
import { Cuisine, Restaurant } from "store/UseHomeResturantsAndCuisinesStore";

export interface SectionGridFeaturePlacesProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  restaurants: Restaurant[];
  cuisines: Cuisine[];
  hasHeaderFilter?: boolean;
}

const ResturantSection: FC<SectionGridFeaturePlacesProps> = ({
  gridClass = "",
  heading = "Latest Deals in Amman",
  subHeading = "Discounts & Offers from the best resturants",
  headingIsCenter,
  restaurants,
  cuisines,
  hasHeaderFilter = true
}) => {
 
  console.log(restaurants);
  console.log(cuisines);
  
  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      {hasHeaderFilter &&
        <HeaderFilter
        tabActive={cuisines[0]?.name}
        subHeading={subHeading}
        tabs={cuisines.map(cuisine => cuisine.name)}
        heading={heading}
        onClickTab={() => {}}
        allItemsLink="/latest-deals"
      />
      }
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
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
