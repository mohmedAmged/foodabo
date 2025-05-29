import CuisineCardBox from "components/CuisineCardBox/CuisineCardBox";
import Heading from "components/Heading/Heading";
import React, { useEffect } from "react";
import { UseHomeResturantsAndCuisinesStore } from "store/UseHomeResturantsAndCuisinesStore";

export interface SectionGridCategoryBoxProps {
  headingCenter?: boolean;
  className?: string;
  gridClassName?: string;
}


const CuisineHomeSection = ({
  headingCenter = true,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  
  const {
    cuisines,
    cuisineMeta,
    loading,
    fetchCuisines,
  } = UseHomeResturantsAndCuisinesStore();

    useEffect(() => {
      fetchCuisines();
    }, [fetchCuisines]);
    console.log(cuisines);
    
  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
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
  );
};

export default CuisineHomeSection;
