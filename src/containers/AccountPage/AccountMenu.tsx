import { Tab } from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StayCard from "components/StayCard/StayCard";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "data/listings";
import React, { Fragment, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { MagnifyingGlassPlusIcon, PencilSquareIcon, PlusCircleIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";

const AccountMenu = () => {
  let [categories] = useState(["burger", "kabab", "shawerma", "sea food"]);
//   const plusIcon: any = {MagnifyingGlassPlusIcon};
  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Menu Items Category</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
            <div className="pt-8 pb-10">
                <ButtonPrimary href={'/'} className="me-4">
                Create category <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/>
                </ButtonPrimary>
                <ButtonSecondary href={'/'} className="me-4">
                Edit Category <PencilSquareIcon aria-hidden="true" className="w-6 h-6 ms-2" />
                </ButtonSecondary>
            </div>
        </div>
        <div className="pb-10 flex space-x-1 overflow-x-auto">
        <button
        type="button"
        className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none bg-secondary-900 text-secondary-50`}
        >
            burger
        </button>
        <button
        type="button"
        className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none bg-secondary-900 text-secondary-50`}
        >
            shawerma
        </button>
        <button
        type="button"
        className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none bg-secondary-900 text-secondary-50`}
        >
            kabab
        </button>
        <button
        type="button"
        className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none bg-secondary-900 text-secondary-50`}
        >
            sea food
        </button>  
        </div>
      </div>
    );
  };
  const renderSection2 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Menu Items</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
            <div className="py-10">
                <ButtonPrimary href={'/account-menu/add-items'}>Add menu Item  <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/></ButtonPrimary>
            </div>
            
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {DEMO_STAY_LISTINGS.filter((_, i) => i < 8).map((stay) => (
                    <StayCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 8).map(
                    (stay) => (
                      <ExperiencesCard key={stay.id} data={stay} />
                    )
                  )}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {DEMO_CAR_LISTINGS.filter((_, i) => i < 8).map((stay) => (
                    <CarCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>
        
            {renderSection1()}
            {renderSection2()}
        
      </CommonLayout>
    </div>
  );
};

export default AccountMenu;
