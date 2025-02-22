import React, { FC, useEffect, useState } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
// import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import Checkbox from "shared/Checkbox/Checkbox";
import Textarea from "shared/Textarea/Textarea";
import { useAllMenuItemsStore } from "store/AllMenuItems";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import useAllMenuItemsStore from "store/AllMenuItems";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  category_id: number;
}
interface FormValues {
  items: number[];
  deal_type: string;
  discount_type: string;
  discount_value: string;
  used_in: string;
  terms: string;
  expiary_deal?: string;
  capacity_for_deal?: string;
}
const AddNewDeal  = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      items: [],
      deal_type: "",
      discount_type: "",
      discount_value: "",
      used_in: "",
      terms: "",
      expiary_deal: "",
      capacity_for_deal: "",
    },
  });

const { categories, fetchItems } = useAllMenuItemsStore();

useEffect(() => {
  fetchItems();
}, [fetchItems]);

const selectedItems = watch("items");
const dealType = watch("deal_type");
const navigate = useNavigate()
const handleCheckAll = (category: any) => {
  const categoryItemIds = category?.items?.map((item: any) => item?.id);
  const isAllChecked = categoryItemIds?.every((id: number) =>
    selectedItems?.includes(id)
  );
  if (isAllChecked) {
    const newItems = selectedItems.filter(
      (id: number) => !categoryItemIds.includes(id)
    );
    setValue("items", newItems);
  } else {
    const newItems = Array.from(
      new Set([...(selectedItems || []), ...categoryItemIds])
    );
    setValue("items", newItems);
  }
};


const handleCheckboxChange = (itemId: number, checked: boolean) => {
  if (checked) {
    setValue("items", [...selectedItems, itemId]);
  } else {
    setValue(
      "items",
      selectedItems.filter((id: number) => id !== itemId)
    );
  }
};

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();
      data.items.forEach((itemId) => {
        formData.append("items[]", String(itemId)); 
      });

      formData.append("deal_type", data?.deal_type);
      formData.append("discount_type", data?.discount_type);
      formData.append("discount_value", data?.discount_value);
      formData.append("used_in", data?.used_in);
      formData.append("terms", data?.terms);

      if (data.deal_type === "limited_deal") {
        formData.append("expiary_deal", data?.expiary_deal || "");
        formData.append("capacity_for_deal", data?.capacity_for_deal || "");
      }

      const response: any = await axios.post(
        `${baseURL}/restaurant/create-deal`,
        formData,
        {
          headers: {
           "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );

      toast.success(response?.data?.message);
      setTimeout(() => {
        navigate("/account-deals");
        }, 3000);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {categories?.map((category: any) => (
            <div key={category?.id}>
              <h3 className="text-lg font-semibold mt-5">{category?.name}</h3>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Checkbox 
                  label="All"
                  name={`${category}-all`} 
                  checked={category.items.every((item: any) =>
                    selectedItems?.includes(item.id)
                  )}
                  onChange={() => handleCheckAll(category)}                 
                />
                {category?.items?.map((item: any) => (
                  <Checkbox
                   key={item.id} 
                   label={item.title} 
                   name={item.title} 
                   checked={selectedItems?.includes(item.id)}
                   onChange={(checked) => handleCheckboxChange(item.id, checked)}
                   />
                ))}
              </div>
            </div>
          ))}
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Deal Type">
          <select
              {...register("deal_type")}
              // id={`deal_type`}
              name="deal_type"
              title="deal_type"
              className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
            >
               <option value="">Select Deal type</option>
                <option value="instant_deal">Instant Deal</option>
                <option value="collect_points">Collect Points</option>
                <option value="limited_deal">Limited Deal</option>
            </select>
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* if limited deal type */}
          {dealType === "limited_deal" && ( 
            <>
              <FormItem label="Expiry Deal">
                <div className="relative">
                  <input 
                  className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 !pl-8 !pr-10" 
                  placeholder="7"  
                  {...register("expiary_deal")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">/day</span>
                  </div>
                </div>
              </FormItem>
              <FormItem label="Cap (capacity) for Deal">
                <div className="relative">
                  <input 
                  className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 !pl-8 !pr-10" 
                  placeholder="7" 
                  {...register("capacity_for_deal")}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">/deal</span>
                  </div>
                </div>
              </FormItem>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            </>
          )}
          
          <FormItem label="Discount Type">
              <select
              {...register("discount_type")}
              // id={`discount_type`}
              name="discount_type"
              title="discount_type"
              className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
            >
               <option value="">Selcet Discount type</option>
              <option value="percentage">Percentage</option>
              <option value="amount">Amount</option>
            </select>
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Discount value">
            <div className="relative">
              <input 
              className="" 
              id="discount_value"
              type="text"
              placeholder="ex: 10% or 20$" 
              {...register("discount_value")}/>
              
            </div>
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Where Can It Be Used?">
            
            <select
              {...register("used_in")}
              id={`used_in`}
              name="used_in"
              title="used_in"
              className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
            >
              <option value="">Selcet where</option>
              <option value="dine_in">Dine-in</option>
              <option value="takeaway">Takeway</option>
              <option value="delivery">Delivery</option>
              <option value="food_ordering_apps">Food Ordering Apps</option>
            </select>
          </FormItem>
         
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <FormItem label="Terms">
            <Textarea 
            placeholder="add your terms for deal" rows={6} 
            {...register("terms")} />
          </FormItem>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Create Deal
        </button>
      </form>
    </div>
  );
};

export default AddNewDeal;
