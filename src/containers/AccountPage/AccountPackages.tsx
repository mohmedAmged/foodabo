import React, {  useEffect, useState } from "react";
import CommonLayout from "./CommonLayout";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useAllPackageStore } from "store/AllPackages";
import FormItem from "containers/PageAddListing1/FormItem";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useResturantDataStore from "store/ShowResturantData";
import useActivePackageStore from "store/CurrentActivePackage";

interface PackageData {
  id: number;
  name: string;
  price: string;
  price_after_discount: string;
  duration: number;
  data: {
    deals: string;
    menu: string;
    awards: string;
    tags: string;
  };
}
interface SubscriptionFormData {
  type: string;
  payment_method: string;
}
const AccountPackages = () => {
  const { packages, isLoading, fetchPackages } = useAllPackageStore();
  const { resturant, fetchResturant } = useResturantDataStore();
  const { activePackage, options, error, fetchActivePackage } = useActivePackageStore();

  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const { register, handleSubmit, setValue } = useForm<SubscriptionFormData>();
console.log(activePackage);
console.log(packages);

  useEffect(() => {
    fetchPackages();
    fetchResturant();
    fetchActivePackage();
  }, [fetchPackages, fetchResturant, fetchActivePackage]);

  const handleSelectPackage = (id: number) => {
    setSelectedPackageId(id === selectedPackageId ? null : id); // Toggle selection
  };

  const handleSubscribe = async (data: { type: string; payment_method: string }) => {
    if (selectedPackageId !== null) {
      try {
        const response = await axios.post(
          `${baseURL}/restaurant/subscribe-package`,
          {
            package_id: `${selectedPackageId}`,
            type: data.type,
            payment_method: "stripe", 
          },
          {
          headers: 
            {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success(response?.data?.message || "Successfully subscribed to the package!");
          const redirectUrl = response.data?.data?.url?.[0];
          setTimeout(() => {
            if (redirectUrl) {
              window.location.assign(redirectUrl);
            }
          }, 3000); 
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Error subscribing to the package. Please try again.");
      }
    }
  };

  const renderPricingItem = (pkg: PackageData, index: number) => {
   
    const isSelected = pkg?.id === selectedPackageId;
    return (
      <div
        key={pkg?.id}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          isSelected ? "border-primary-500" : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        {isSelected && (
          <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
            SELECTED
          </span>
        )}
        <div className="mb-8">
          <h3 className="block text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-300 mb-2 font-medium">
            {pkg?.name}
          </h3>
          <h2 className="text-5xl leading-none flex items-center text-neutral-900 dark:text-neutral-300">
            <span>${pkg?.price_after_discount}</span>
            <span className="text-lg ml-1 font-normal text-neutral-500  line-through mr-2">
              ${pkg?.price}
            </span>
          </h2>
        </div>
        <nav className="space-y-4 mb-8">
          {Object.entries(pkg?.data).map(([key, value], idx) => (
            <li className="flex items-center" key={idx}>
              <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
              </span>
            </li>
          ))}
        </nav>
      
          <div className="flex flex-col mt-auto">
          <ButtonPrimary onClick={() => handleSelectPackage(pkg.id)}>
            {isSelected ? "Selected" : "Select"}
          </ButtonPrimary>
        </div>

      </div>
    );
  };
  const renderSection1 = () => {
    const currentPackage = activePackage;

    if (!activePackage || activePackage?.id === null|| !currentPackage?.data) {
      return (
        <div>
          <p>No active package available. Please subscribe to a package.</p>
          
        </div>
      );
    }
    // if (!currentPackage?.data) {
    //   return <p>No details available for the selected package.</p>;
    // }
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Current Active Package</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
  
        <div className="grid lg:grid-cols-3 gap-5 xl:gap-8">
          <div
            key={currentPackage?.id}
            className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden border-primary-500`}
          >
            <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
              SELECTED
            </span>

            <div className="mb-8">
              <h3 className="block text-sm uppercase tracking-widest text-neutral-600 dark:text-neutral-300 mb-2 font-medium">
                {currentPackage?.name}
              </h3>
             
            </div>
            <nav className="space-y-4 mb-8">
                <li className="flex items-center" >
                      {/* <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span> */}
                      <span className="text-neutral-700 dark:text-neutral-300">
                        Start Date: {currentPackage?.start_date}
                      </span>
                </li>
                <li className="flex items-center" >
                  {/* <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  </span> */}
                  <span className="text-neutral-700 dark:text-neutral-300">
                    End Date: {currentPackage?.end_date}
                  </span>
                </li>
              {Object.entries(currentPackage?.data).map(([key, value], idx) => (
                <li className="flex items-center" key={idx}>
                  <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                  </span>
                </li>
              ))}
            </nav>
            <div className="flex flex-col mt-auto">
              <ButtonPrimary>Selected</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };
  


  return (
    <div>
      <CommonLayout>
        
        {
            renderSection1()
        }
        
        <div className="nc-PageSubcription container pb-24 lg:pb-32" data-nc-id="PageSubcription">
          <header className="text-center max-w-2xl mx-auto my-20">
            <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              <span className="mr-4 text-3xl md:text-4xl leading-none">💎</span>
              Subscription
            </h2>
            <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
              Pricing to fit the needs of any company size.
            </span>
          </header>
          <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
            <div className="grid lg:grid-cols-4 gap-5 xl:gap-8 ">
              {packages?.map(renderPricingItem)}
            </div>
            {selectedPackageId !== null && (
              <div className="my-6 grid lg:grid-cols-4">
                <FormItem label="Subscribe Type">
                  <select
                    // name="type"
                    title="type"
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                    {...register("type", { required: true })}
                  >
                    <option value="">Select Subscribe Type</option>
                      { resturant?.package === null &&
                        <option value="new">new</option>
                      }
                      { resturant?.package !== null &&
                        <option value="renew">renew</option>
                      }
                      { resturant?.package !== null &&
                        <option value="upgrade">upgrade</option>
                      }
                      
                  </select>
                </FormItem>
              </div>
            )}
            {selectedPackageId !== null && (
              <div className="mt-6 text-center">
                <ButtonPrimary onClick={handleSubmit(handleSubscribe)}>Subscribe</ButtonPrimary>
              </div>
            )}
          </section>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPackages;
