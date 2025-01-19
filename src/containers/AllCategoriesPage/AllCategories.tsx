// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CardCategoryBox1 from "components/CardCategoryBox1/CardCategoryBox1";

import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
// import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
// import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import React, { FC } from "react";
// import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet-async";
import Heading from "components/Heading/Heading";
import { TaxonomyType } from "data/types";


export interface ListingStayPageProps {
    className?: string;
    categoryCardType?: "card1";
    categories?: TaxonomyType[];
    headingCenter?: boolean;
    gridClassName?: string;

}
const DEMO_CATS: TaxonomyType[] = [
{
    id: "1",
    href: "#",
    name: "Burgers",
    taxonomy: "category",
    count: 1882,
    thumbnail:
    "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
},
{
    id: "2",
    href: "#",
    name: "Pizza",
    taxonomy: "category",
    count: 8288,
    thumbnail:
    "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
},
{
    id: "3",
    href: "#",
    name: "Shawerma",
    taxonomy: "category",
    count: 1288,
    thumbnail:
    "https://images.pexels.com/photos/5779368/pexels-photo-5779368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
},
{
    id: "4",
    href: "#",
    name: "kabab",
    taxonomy: "category",
    count: 112,
    thumbnail:
    "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
},
{
    id: "5",
    href: "#",
    name: "Burgers",
    taxonomy: "category",
    count: 1882,
    thumbnail:
        "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
},
{
    id: "6",
    href: "#",
    name: "Pizza",
    taxonomy: "category",
    count: 8288,
    thumbnail:
        "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
},
{
    id: "7",
    href: "#",
    name: "Shawerma",
    taxonomy: "category",
    count: 1288,
    thumbnail:
        "https://images.pexels.com/photos/5779368/pexels-photo-5779368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
},
{
    id: "8",
    href: "#",
    name: "kabab",
    taxonomy: "category",
    count: 112,
    thumbnail:
        "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
},
];
const AllCategories: FC<ListingStayPageProps> = (
    { 
        className = "" ,
        categories = DEMO_CATS,
        categoryCardType = "card1",
        headingCenter = true,
        gridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
) => {
    let CardComponentName = CardCategoryBox1;
    switch (categoryCardType) {
      case "card1":
        CardComponentName = CardCategoryBox1;
        break;
  
      default:
        CardComponentName = CardCategoryBox1;
    }
  
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
                        {categories.map((item, i) => (
                        <CardComponentName key={i} taxonomy={item} />
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
  );
};

export default AllCategories;
