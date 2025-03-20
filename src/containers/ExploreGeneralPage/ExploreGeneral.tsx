
import CardCategoryBox1 from "components/CardCategoryBox1/CardCategoryBox1";

import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { TaxonomyType } from "data/types";
import { FunnelIcon } from "@heroicons/react/24/outline";


export interface ListingStayPageProps {
    className?: string;
    categoryCardType?: "card1";
    categories?: TaxonomyType[];
    headingCenter?: boolean;
    gridClassName?: string;

}
interface gallerry_interface{
    id?: number;
    img?:string;
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
const GALLERY_IMAGES: gallerry_interface[] = [
    {
        id: 1,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg'
    },
    {
        id: 2,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
    },
    {
        id: 3,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
    },
    {
        id: 4,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
    },
    {
        id: 5,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg'
    },
    {
        id: 6,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
    },
    {
        id: 7,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
    },
    {
        id: 8,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
    },
]
const SPONSORED_GALLERY_IMAGES: gallerry_interface[] = [
    {
        id: 2,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
    },
    {
        id: 3,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
    },
    {
        id: 4,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
    },
    {
        id: 5,
        img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg'
    },
   
]
const ExploreGeneral: FC<ListingStayPageProps> = (
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
            <div className="container my-5 px-5 relative overflow-hidden">
                {/* SECTION HERO */}
                <div className="grid mb-4 grid-cols-2 gap-4">
                    <div>
                        <img className="h-auto w-full rounded-lg" src='https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg' alt="" />
                    </div>
                    <div className="grid grid-cols-2  gap-4">
                        {
                            SPONSORED_GALLERY_IMAGES?.map((el)=>(
                        <div>
                            <img key={el?.id} className="h-auto w-full rounded-lg" src={el?.img} alt="" />
                        </div>
                            ))
                        }
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {
                        GALLERY_IMAGES?.map((el)=>(
                        <div key={el?.id}>
                            <img className="h-auto max-w-full rounded-lg" src={el?.img} alt=""/>
                        </div>
                        ))
                    }
                </div>
                <div  className="fixed bottom-16 right-5 bg-gray-600 text-white p-3 rounded-lg opacity-80 shadow-lg z-50 cursor-pointer hover:bg-gray-700">
                    <FunnelIcon aria-hidden="true" className="w-7 h-7"/>
                 </div>
            </div>
        </div>
  );
};

export default ExploreGeneral;
