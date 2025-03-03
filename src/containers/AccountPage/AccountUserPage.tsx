import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet-async";
import useResturantDataStore from "store/ShowResturantData";
import { Link } from "react-router-dom";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useUserDataStore from "store/ShowUserData";
import axios from "axios";
import Input from "shared/Input/Input";
import { useCountriesStore } from "store/AllCountries";

export interface AccountPageProps {
  className?: string;
}

const AccountUserPage: FC<AccountPageProps> = ({ className = "" }) => {
   const { userData, fetchUserData } = useUserDataStore();
  const { countries, fetchCountries } = useCountriesStore();
   const [isEditing, setIsEditing] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [cityID, setCityID] = useState<any>(userData?.city_id || "");
   const [phoneCode, setPhoneCode] = useState(userData?.phone_code || "");
   const [phone, setPhone] = useState(userData?.phone || "");
   const [logo, setLogo] = useState<File | null>(null);
   const [previewLogo, setPreviewLogo] = useState<string | null>(userData?.image || ""); 
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  console.log(cities);

  useEffect(() => {
    if (userData?.image !== 'N/A') {
      setPreviewLogo(userData?.image || '');
    }
  }, [userData]);
 

  const handleUpdateClick = () => {
    setIsEditing(true);
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void, setPreview?: (url: string | null) => void) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setter(file);
      if (setPreview) {
        const fileURL = URL.createObjectURL(file);
        setPreview(fileURL); 
      }
    }
  };
  const fetchCities = async () => {
    try {
      const response = await axios.get(`${baseURL}/show-country/${userData?.country_id}`);
      setCities(response.data.data.cities || []);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  useEffect(() => {
    fetchUserData()
    fetchCities()
    fetchCountries()
  }, [fetchUserData]);

  const handleSubmit = async () => {
    if (!logo && !cityID && !phoneCode && !phone) {
      toast.warning("Please update at least one field before submitting.");
      return;
    }
    setIsLoading(true);
    toast.info("Updating profile, please wait...");
    const formData = new FormData();
    if (logo) formData.append("image", logo);
   if (cityID !== userData?.city_id) formData.append("city_id", cityID);
    if (phoneCode !== userData?.phone_code) formData.append("phone_code", phoneCode);
    if (phone !== userData?.phone) formData.append("phone", phone);
   
  

    try {
      const response: any = await fetch(`${baseURL}/user/user-update-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
        body: formData,
      });

      const data: any = await response.json();
      if (response.ok) {
        toast.success(data?.data?.message || 'profile updated succesfully');
        setIsEditing(false);
        fetchUserData(); 
      } else {
        toast.error(data?.message  || "Failed to update profile.");
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };


     
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Booking React Template</title>
      </Helmet>
      <CommonLayout>
            <div className="space-y-6 sm:space-y-8">
            {/* HEADING */}
            <h2 className="text-3xl font-semibold">Account infomation</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 flex items-start">
                <div className="relative rounded-full overflow-hidden flex">
                    <Avatar imgUrl={previewLogo || ''} sizeClass="w-32 h-32" />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>

                    <span className="mt-1 text-xs">Change Image</span>
                    </div>
                    {isEditing && (
                    <input
                        title="avatar image"
                        type="file"
                        onChange={(e) => handleFileChange(e, setLogo, setPreviewLogo)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    )}
                </div>
                </div>
                <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input 
                    disabled
                    type="text" 
                    id="name" 
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                    defaultValue={userData?.name} 
                    />
                </div>
                <div>
                    <label htmlFor="username">@username</label>
                    <input 
                    disabled
                    type="text" 
                    id="username" 
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                    defaultValue={userData?.username} 
                    />
                </div>
                {/* ---- */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    disabled
                    type="text" 
                    id="email" 
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                    defaultValue={userData?.email} 
                    />
                </div>
                {/* ---- */}
                { !isEditing && 
                    <div>
                    <label htmlFor="fullphone">Phone number</label>
                    <input 
                    disabled
                    type="text" 
                    id="fullphone" 
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                    defaultValue={userData?.fullphone} 
                    />
                </div>
                }
                {
                isEditing &&
                    <div className="flex space-x-2">
                    <select
                    title="phone_code"
                    id="phone_code" 
                    name="phone_code"
                    value={phoneCode || ""}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    className="p-2 border rounded-lg">
                    {countries?.map((country: any) => (
                    <option key={country?.id} value={country?.phone_code}>
                    ({country?.name}) {country?.phone_code}
                    </option>
                    ))}
                    </select>
                    <Input 
                    type="text" id="phone" 
                    value={phone || ""}
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="Phone" 
                    className="w-full p-2 border rounded-lg" 
                    />
                    </div>
                }
                {/* ---- */}
                <div>
                    <label htmlFor="country_name">Country</label>
                    <input
                    disabled
                    type="text" 
                    id="country_name" 
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                    defaultValue={userData?.country_name} 
                    />
                </div>
                {/* ---- */}
               {!isEditing && 
               <div>
                    <label htmlFor="city_name">City</label>
                    <input
                    disabled
                    type="text" 
                    id="city_name" 
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                    defaultValue={userData?.city_name} 
                    />
                </div>
                }
                {isEditing && 
               <div>
                    <label htmlFor="city_id">City</label>
                    <select
                    id="city_id"
                    value={cityID || ""}
                    onChange={(e) => setCityID(e.target.value)}
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Select City</option>
                    {cities?.map((city: { id: number; name: string }) => (
                      <option key={city.id} value={city.id}>
                      {city.name}
                      </option>
                    ))}
                  </select>
                </div>
                }
                {/* ---- */}
                <div>
                    <Label>cuisines</Label>
                    <div className="flex items-center gap-2 px-4 py-6">
                    {
                        userData?.cuisines.map((cuisine) => (
                        <div key={cuisine?.id}>
                            <div className="flex items-center gap-2">
                            
                            <span>{cuisine?.name}</span>
                            </div>
                        </div>
                        )) 
                    }
                    </div>
                </div>
                {/* ---- */}
                <div className="pt-2">
                    {!isEditing ? (
                    <ButtonPrimary onClick={handleUpdateClick}>Update Info</ButtonPrimary>
                    ) : (
                    <ButtonPrimary onClick={handleSubmit} disabled={isLoading}> 
                    {isLoading ? "Saving..." : "Save Changes"}
                    </ButtonPrimary>
                    )}
                </div>
                </div>
            </div>
            </div>
      </CommonLayout>
    </div>
  );
};

export default AccountUserPage;
