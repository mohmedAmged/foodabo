import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import CommonLayout from "./CommonLayout";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import MenuBuisnessCard from "components/MenuBuisnessItemCard/MenuBuisnessCard";
import { useDealsStore } from "store/AllResturantDeals";
import ResturantDealsCard from "components/ResturantDealsCard/ResturantDealsCard";
import ButtonClose from "shared/ButtonClose/ButtonClose";



const AccountDeals = () => {
  const { deals, fetchDeals } = useDealsStore();
console.log(deals);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);
    const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const handleDelete = (id: number) => {
    setItems((prevItems) => prevItems.filter((item: any) => item.id !== id));

  };
  const renderSection2 = () => {
    return (
      <div className="space-y-10 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Menu Items</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
            <div  className="py-10">
                <ButtonPrimary href={'/Add-new-deal'}>Create New Deal  <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/></ButtonPrimary>
            </div>
            
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
             
              <Tab as={Fragment}>
                  {({ selected }) => (
                    <button 
                    type="button"
                    // onClick={() => handleCategoryClick(undefined)}
                    className={`px-5 py-2.5 text-sm sm:text-base rounded-full ${selected ? "bg-secondary-900 text-secondary-50" : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                    
                    >
                      All Deals
                    </button>
                  )}
              </Tab>
                {/* {categories?.map((item) => (
                  <Tab key={item?.id} as={Fragment}>
                    {({ selected }) => (
                    
                    
                    <button
                        type="button"
                        // onClick={() => handleCategoryClick(item.id)}
                        className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                          selected
                            ? "bg-secondary-900 text-secondary-50 "
                            : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        } `}
                      >
                        {item?.name}
                      </button>
                    )}
                  </Tab>
                ))} */}
            </Tab.List>
            <div>
                  <div>
                    {loading ? <p>Loading...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {deals?.map(deal => (
                          <ResturantDealsCard
                            key={deal.id}
                            data={deal}
                            onDelete={handleDelete} 
                          />
                      ))}
                  </div>
                  
                    )}
                      
                  </div>
            </div>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>
      
      {renderSection2()}

        
      </CommonLayout>
    </div>
  );
};

export default AccountDeals;
