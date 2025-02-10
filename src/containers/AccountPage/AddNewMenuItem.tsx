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
