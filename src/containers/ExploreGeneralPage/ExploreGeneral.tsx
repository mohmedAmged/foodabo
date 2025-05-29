import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import React, { FC, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useAllGeneralImageStore } from "store/UseAllGeneralImages";


export interface ListingStayPageProps {
    className?: string;
    categoryCardType?: "card1";
    // categories?: TaxonomyType[];
    headingCenter?: boolean;
    gridClassName?: string;

}

const ExploreGeneral: FC<ListingStayPageProps> = (
    { 
        className = "" ,
        // categories ,
        categoryCardType = "card1",
        headingCenter = true,
        gridClassName = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
) => {
        const {
        tags,
        cuisines,
        restaurants,
        meta,
        fetchImages,
        isLoading,
    } = useAllGeneralImageStore();

    const [showFilter, setShowFilter] = useState(false);
    const filterRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setShowFilter(false);
        }
        };

        if (showFilter) {
        document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilter]);
    const [selectedCuisine, setSelectedCuisine] = useState<number | null>(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

    // fetch page 1 on mount
    useEffect(() => {
        fetchImages({ page: 1 });
    }, [])

    const handleFilterChange = (type: "cuisine" | "restaurant", value: number | string | null) => {
        if (type === "cuisine") {
        setSelectedCuisine(value as number | null);
        } else {
        setSelectedRestaurant(value as string | null);
        }

        fetchImages({
        page: 1,
        cuisine: type === "cuisine" ? (value as number) : selectedCuisine ?? undefined,
        restaurant: type === "restaurant" ? (value as string) : selectedRestaurant ?? undefined,
        });
    };
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
                {showFilter && (
                    <div  ref={filterRef} className="absolute top-1/4 right-1/2 translate-x-1/2 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 z-50 w-full max-w-md">
                        <div className="mb-8">
                            <label htmlFor="filterCuisine" className="block mb-1 text-sm font-semibold" >Filter by Cuisine</label>
                            <select
                                id="filterCuisine"
                                className="w-full p-2 border rounded"
                                value={selectedCuisine ?? ""}
                                onChange={(e) =>
                                handleFilterChange("cuisine", e.target.value ? Number(e.target.value) : null)
                                }
                            >
                                <option value="">All</option>
                                {cuisines.map((cuisine) => (
                                <option key={cuisine.id} value={cuisine.id}>
                                    {cuisine.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div>
                        <label htmlFor="filterResturant" className="block mb-1 text-sm font-semibold">Filter by Restaurant</label>
                        <select
                            id="filterResturant"
                            className="w-full p-2 border rounded"
                            value={selectedRestaurant ?? ""}
                            onChange={(e) =>
                            handleFilterChange("restaurant", e.target.value || null)
                            }
                        >
                            <option value="">All</option>
                            {restaurants.map((rest) => (
                            <option key={rest.slug} value={rest.slug}>
                                {rest.name}
                            </option>
                            ))}
                        </select>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* {
                        GALLERY_IMAGES?.map((el)=>(
                        <div key={el?.id}>
                            <img className="h-auto max-w-full rounded-lg" src={el?.img} alt=""/>
                        </div>
                        ))
                    } */}
                    {tags.map((tag) => (
                        <div key={tag.id} className="h-full w-full">
                        <img className="h-full w-full rounded-lg object-cover" src={tag.image} alt="tag" />
                        </div>
                    ))}
                </div>
                
                {meta && meta.current_page < meta.last_page && (
                    <div className="text-center mt-6">
                        <button
                        type="button"
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded"
                        disabled={isLoading}
                        onClick={() =>
                            fetchImages({
                            page: meta.current_page + 1,
                            cuisine: selectedCuisine ?? undefined,
                            restaurant: selectedRestaurant ?? undefined,
                            })
                        }
                        >
                        {isLoading ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
                <div  className="fixed bottom-16 right-5 bg-gray-600 text-white p-3 rounded-lg opacity-80 shadow-lg z-50 cursor-pointer hover:bg-gray-700"
                onClick={() => setShowFilter(!showFilter)}
                >
                    <FunnelIcon aria-hidden="true" className="w-7 h-7"/>
                 </div>
            </div>
        </div>
  );
};

export default ExploreGeneral;
