import Label from "components/Label/Label";
import React from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";

const AddNewMenuItem = () => {
  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Add Menu Items</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className=" max-w-xl space-y-6">
            <div className="">
                <div>
                <label htmlFor="category" className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select Item Category
                </label>
                {/* <Label>Item Name (En)</Label> */}

                <select
                    id="category"
                    // value={formData?.country_id}
                    // onChange={handleChange}
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Choose Category</option>
                    <option >burger</option>
                    <option >kabab</option>
                    <option >shawerma</option>
                    
                  </select>
                </div>
            </div>
            <div className="flex space-x-6 overflow-x-auto">
                <div>
                <Label>Item Name (En)</Label>
                <Input type="text" className="mt-1.5" />
                </div>
                <div>
                <Label>Item Name (Ar)</Label>
                <Input type="text" className="mt-1.5" />
                </div>
            </div>
            <div className="flex space-x-6 overflow-x-auto">
                <div>
                <Label>price</Label>
                <Input type="text" className="mt-1.5" />
                </div>
                <div>
                <Label>Image </Label>
                <Input type="file" className="mt-1.5" />
                </div>
            </div>
            <div className="pt-2">
              <ButtonPrimary>Submit</ButtonPrimary>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AddNewMenuItem;
