import React, { useEffect } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
// import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionHero3 from "components/SectionHero/SectionHero3";
import CardCategory6 from "components/CardCategory6/CardCategory6";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Link, useNavigate } from "react-router-dom";
import ResturantSection from "./ResturantsSection";
import ItemsHomeSection from "./ItemsHomeSection";
import CuisineHomeSection from "components/CuisineHomeSection/CuisineHomeSection";
import { UseHomeResturantsAndCuisinesStore } from "store/UseHomeResturantsAndCuisinesStore";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { withRegion } from "functions/withRegionRoute";

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/All-categories",
    name: "Find the best in Amman",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "222",
    href: "/explore",
    name: "Explore Shots",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/All-deals",
    name: "Deal of the day",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: "5",
    href: "",
    name: "Tag & Get Discounts",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/4921400/pexels-photo-4921400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

function PageHome3() {
  // CUSTOM THEME STYLE
  useEffect(() => {
    const $body = document.querySelector("body");
    if (!$body) return;
    $body.classList.add("theme-purple-blueGrey");
    return () => {
      $body.classList.remove("theme-purple-blueGrey");
    };
  }, []);
 const {
    restaurants,
    cuisines,
    restaurantMeta,
    cuisineMeta,
    loading,
    fetchRestaurants,
    fetchCuisines,
  } = UseHomeResturantsAndCuisinesStore();
  const loginType = Cookies.get("loginType");
  const navigate = useNavigate();
  useEffect(() => {
    fetchRestaurants();
    fetchCuisines();
  }, [fetchRestaurants, fetchCuisines]);
  return (
    <div className="nc-PageHome3 relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container px-1 sm:px-4 mb-24 ">
        <SectionHero3 className="" />
      </div>

      <div className="container relative space-y-24 mb-24 ">
        {/* SECTION 1 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[0]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
            <CardCategory6 taxonomy={DEMO_CATS_2[3]} />
            <CardCategory6 taxonomy={DEMO_CATS_2[1]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 
            taxonomy={DEMO_CATS_2[4]} 
            onClick={() => {
                if (!loginType) {
                  toast.error("You need to login first");
                  navigate("/login");
                } else if (loginType === "business") {
                  toast.error("You need to login as user to make a tag");
                } else if (loginType === "user") {
                  navigate(withRegion('/user-tags/add-new-tag'));
                }
              }}
            />
          </div>
        </div>

        {/* SECTION */}
        <>
          <CuisineHomeSection />
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
            <Link to={'/All-categories'}>
              <ButtonSecondary>Show me more </ButtonSecondary>
            </Link>
          </div>
        </>
        

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <ItemsHomeSection boxCard="box2" />
        </div>

        {/* SECTION */}
        {/* <SectionHowItWork /> */}

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <ResturantSection restaurants={restaurants} cuisines={cuisines}/>
        </div>

        {/* SECTION */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
}

export default PageHome3;
