import React, { FC, useEffect, useState } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
// import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import Checkbox from "shared/Checkbox/Checkbox";
import Textarea from "shared/Textarea/Textarea";
import useAllMenuItemsStore from "store/AllMenuItems";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  category_id: number;
}
const AddNewDeal  = () => {
  const [dealType, setDealType] = useState<string>(""); 
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({}); 

  const {
    menuItems,
    currentPage,
    totalPages,
    loading,
    fetchMenuItems,
  } = useAllMenuItemsStore();
console.log(menuItems);

  useEffect(() => {
    // for (let page = 1; page <= totalPages; page++) {
      
    // }
    let page = 1 
    fetchMenuItems(page);
  }, [totalPages, fetchMenuItems]);

  const groupedByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const handleCheckboxChange = (itemId: number) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId], 
    }));
  };

  const handleAllCheckboxChange = (category: string) => {
    const categoryItems = groupedByCategory[category];
    const allChecked = categoryItems.every((item) => checkedItems[item.id] === true); 

    const newCheckedItems: Record<number, boolean> = {};
    categoryItems.forEach((item) => {
      newCheckedItems[item.id] = !allChecked;
    });

    setCheckedItems((prevState) => ({
      ...prevState,
      ...newCheckedItems,
    }));
  };

  const handleDealTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDealType(e.target.value);
  };
  return (
    <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32">
      <>
        <div>
          <h2 className="text-2xl font-semibold">List your Deal</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            choose which menu item you want to add a deal for
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          <div className="space-y-8 mt-4 listingSection__wrap">
          {Object.entries(groupedByCategory).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mt-5">{category}</h3>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Checkbox 
                  label="All"
                  name={`${category}-all`}
                  onChange={() => handleAllCheckboxChange(category)}
                  checked={items.every((item) => checkedItems[item.id] === true)}
                />
                {items.map((item) => (
                  <Checkbox
                   key={item.id} 
                   label={item.title} 
                   name={item.title} 
                   checked={checkedItems[item.id] === true}
                   onChange={() => handleCheckboxChange(item.id)}
                   />
                ))}
              </div>
            </div>
          ))}
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Deal Type">
            <Select value={dealType} onChange={handleDealTypeChange}>
            <option value="USD">Selcet Deal type</option>
              <option value="USD">Instant Deal</option>
              <option value="VND">Collect Points</option>
              <option value="Limited Deal">Limited Deal</option>
            </Select>
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* if limited deal type */}
          {dealType === "Limited Deal" && ( 
            <>
              <FormItem label="Expiry Deal">
                <div className="relative">
                  <Input className="!pl-8 !pr-10" placeholder="7" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">/day</span>
                  </div>
                </div>
              </FormItem>
              <FormItem label="Cap (capacity) for Deal">
                <div className="relative">
                  <Input className="!pl-8 !pr-10" placeholder="7" />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">/deal</span>
                  </div>
                </div>
              </FormItem>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            </>
          )}
          
          <FormItem label="Discount Type">
            <Select>
            <option value="USD">Selcet Discount type</option>
              <option value="USD">Percentage</option>
              <option value="VND">Amount</option>
            </Select>
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Discount value">
            <div className="relative">
              
              <Input className="" placeholder="ex: 10% or 20$" />
              
            </div>
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Where Can It Be Used?">
            <Select>
            <option value="USD">Selcet where</option>
              <option value="USD">Dine-in</option>
              <option value="VND">Takeway</option>
              <option value="VND">Delivery</option>
              <option value="VND">Food Ordering Apps</option>
            </Select>
          </FormItem>
         
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Terms">
            <Textarea placeholder="add your terms for deal" rows={6} />
          </FormItem>
          
        </div>
      </>
    </div>
  );
};

export default AddNewDeal;
