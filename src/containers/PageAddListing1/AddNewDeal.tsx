import React, { FC } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
// import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing8Props {}

const AddNewDeal: FC<PageAddListing8Props> = () => {
  return (
    <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32">
      <>
        <div>
          <h2 className="text-2xl font-semibold">Price your Deal</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            choose which menu item you want to add a deal for
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem className="mt-8" label="Menu Items">
            <Select>
              <option value="all">All</option>
              <option value="cheese">cheese Burger</option>
              <option value="lava">lava burger</option>
              <option value="smash">smash bureger</option>
              <option value="chicken">chicken bureger</option>
            </Select>
          </FormItem>
          <FormItem label="Base price  (Monday -Thuday)">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input className="!pl-8 !pr-10" placeholder="0.00" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">USD</span>
              </div>
            </div>
          </FormItem>
          {/* ----- */}
          <FormItem label="Base price  (Friday-Sunday)">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input className="!pl-8 !pr-10" placeholder="0.00" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">USD</span>
              </div>
            </div>
          </FormItem>
          {/* ----- */}
          <FormItem label="Long term price (Monthly discount) ">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
              <Input className="!pl-8 !pr-10" placeholder="0.00" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">every month</span>
              </div>
            </div>
          </FormItem>
        </div>
      </>
    </div>
  );
};

export default AddNewDeal;
