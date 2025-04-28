import { FC, useState } from "react";
import { DEMO_CAR_LISTINGS, DEMO_MENU_LISTINGS } from "data/listings";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Pagination from "shared/Pagination/Pagination";
// import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import CarCardH from "components/CarCardH/CarCardH";

import MapContainer from "containers/MapContainer";
import { Deal, DealsData, Item, ItemsData } from "store/SingleResturantStore";
import TabFilters from "./TabFilters";
import MenuItemCard from "components/MenuItemCard/MenuItemCard";
import { useClaimDealStore } from "store/useClaimDealStore";

const DEMO_MENUS = DEMO_MENU_LISTINGS.filter((_, i) => i < 12);

export interface SectionGridHasMapProps {
  menuItems?: Item[];
  dealsItems?: Deal[]; 
  countryName?: string;
  ownerImage?: string;
  OwnerName?:string;
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({
  menuItems,
  dealsItems, 
  countryName,
  ownerImage,
  OwnerName,
}) => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const [showDealsFixed, setShowDealsFixed] = useState(false);
  // console.log(menuItems);
    const { claimDeal, isLoading } = useClaimDealStore();
  
  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDSSSS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[880px] flex-shrink-0 xl:px-8 ">
          <Heading2
            heading="Menu Items"
            subHeading={
              <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                {menuItems ? menuItems.length : '30'} Items
                {/* <span className="mx-2">·</span>
                Aug 12 - 18 */}
              </span>
            }
          />
          {/* <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div> */}
          <div className="grid grid-cols-1 gap-8">
            { menuItems ?
              menuItems.map((item)=>(
                <div
                  key={item.id}
                  onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                  onMouseLeave={() => setCurrentHoverID((_) => -1)}
                >
                  <MenuItemCard ownerImage={ownerImage} ownerName={OwnerName} countryName={countryName} MenuItem={item} />
                </div>
              ))
              :
              DEMO_MENUS.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                  onMouseLeave={() => setCurrentHoverID((_) => -1)}
                >
                  <CarCardH data={item} />
                </div>
              ))
            }
          </div>
          <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div>
        </div>

        {/* <div
          className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer"
          onClick={() => setShowFullMapFixed(true)}
        >
          <i className="text-lg las la-map"></i>
          <span>Show map</span>
        </div> */}
        <div
          className="flex xl:hidden items-center justify-center fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30 space-x-3 text-sm cursor-pointer"
          onClick={() => setShowDealsFixed(true)}
        >
          <i className="text-lg las la-gift"></i>
          <span>Show Deals</span>
        </div>

        {/* MAPPPPP */}
        {/* <div
          className={`xl:flex-grow xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <MapContainer
              currentHoverID={currentHoverID}
              DEMO_DATA={DEMO_MENUS}
              listingType="car"
            />
          </div>
        </div> */}

<div
          className={`xl:flex-grow xl:static xl:block ${
            showDealsFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showDealsFixed && (
            <ButtonClose
              onClick={() => setShowDealsFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-0px)] rounded-md overflow-hidden">
            <div className="listingSectionSidebar__wrap shadow-xl">
              {/* DEALS SECTION */}
              <div className="flex flex-col space-y-4">
                <div className="text-2xl font-semibold">Exclusive deals</div>
                <p className="text-neutral-6000 dark:text-neutral-300">
                  Select a deal that best fits your needs, purchase the certificate, and present it using our mobile app or a printed copy when you dine. Our deals never expire and are easy to exchange if plans change!
                </p>

                {/* $15 OFF DEAL */}
                {
                dealsItems?.map((deal)=>(
                <div key={deal?.id} className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4">
                    <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">{deal?.deal_type_translated} for {deal?.discount_value}</span>
                    <button
                     onClick={() => claimDeal(`${deal?.id}`)}
                     className="bg-primary-6000 text-white px-4 py-2 rounded-lg">Claim</button>
                    </div>
                    <span className="text-neutral-6000 dark:text-neutral-300">you can use in {deal?.used_in} (view terms)</span>
                </div>
              ))
            }

                {/* $25 OFF DEAL */}
                {/* <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">$25 Off Deal</span>
                    <button className="bg-primary-6000 text-white px-4 py-2 rounded-lg">Add to cart</button>
                  </div>
                  <span className="text-neutral-6000 dark:text-neutral-300">Grab this deal for only $10.00 (view terms)</span>
                </div> */}

                {/* DINING DISCOUNT PASS */}
                {/* <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Dining Discount Pass</span>
                    <button className="bg-primary-6000 text-white px-4 py-2 rounded-lg">View Offer</button>
                  </div>
                  <span className="text-neutral-6000 dark:text-neutral-300">Get discounts at over 170,000 restaurants and retailers nationwide.</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
