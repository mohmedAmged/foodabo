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

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
   const { resturant, fetchResturant } = useResturantDataStore();
   const { userData, fetchUserData } = useUserDataStore();
console.log(userData);

   const [isEditing, setIsEditing] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [callCenterNumber, setCallCenterNumber] = useState("");
   const [menuFile, setMenuFile] = useState<File | null>(null);
   const [logo, setLogo] = useState<File | null>(null);
   const [previewLogo, setPreviewLogo] = useState<string | null>(null); 
   useEffect(() => {
    if (resturant?.call_center_number !== 'N/A') {
      setCallCenterNumber(resturant?.call_center_number || "");
    }
  }, [resturant]);
  useEffect(() => {
    if (resturant?.logo !== 'N/A') {
      setPreviewLogo(resturant?.logo || '');
    }
  }, [resturant]);
  useEffect(() => {
    fetchResturant();
    fetchUserData()
  }, [fetchResturant]);

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

  const handleSubmit = async () => { 
    if (!logo && !callCenterNumber && !menuFile) {
      toast.warning("Please update at least one field before submitting.");
      return;
    }
    setIsLoading(true);

    const toastId = toast.loading("Updating profile, please wait...");

    const formData = new FormData();
    
    if (logo) formData.append("logo", logo);
    if (callCenterNumber) formData.append("call_center_number", callCenterNumber);
    if (menuFile) formData.append("menu_file", menuFile);

    try {
      const response = await axios.post(`${baseURL}/restaurant/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
          "Accept": "application/json",
        },
      });

      toast.update(toastId, { 
        render: response.data?.message || "Profile updated successfully!", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });

      setIsEditing(false);
      fetchResturant();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update profile.";
      const validationErrors = error.response?.data?.errors;
      toast.update(toastId, { 
        render: errorMessage, 
        type: "error", 
        isLoading: false, 
        autoClose: 5000 
      });
      if (validationErrors && Object.keys(validationErrors).length > 0) {
        Object.values(validationErrors).forEach((errorMessages: any) => {
          errorMessages.forEach((msg: string) => toast.error(msg));
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

     console.log(resturant);
     
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
                <label htmlFor="applicant_full_name">Full Name</label>
                <input 
                  disabled
                  type="text" 
                  id="applicant_full_name" 
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                  defaultValue={resturant?.applicant_full_name} 
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
                  defaultValue={resturant?.email} 
                />
              </div>
              {/* ---- */}
              <div>
                <label htmlFor="phone">Phone number</label>
                <input 
                  disabled
                  type="text" 
                  id="phone" 
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                  defaultValue={resturant?.phone} 
                />
              </div>
              {/* ---- */}
              <div>
                <label htmlFor="country">Country</label>
                <input
                  disabled
                  type="text" 
                  id="country" 
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                  defaultValue={resturant?.country} 
                />
              </div>
               {/* ---- */}
              <div>
                  <label htmlFor="name">Business Name</label>
                  <input 
                  disabled
                  type="text" 
                  id="name" 
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                  defaultValue={resturant?.name} 
                />
              </div>
              <div>
                  <label htmlFor="cuisine">Cuisine</label>
                  <input 
                  disabled
                  type="text" 
                  id="cuisine" 
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                  defaultValue={resturant?.cuisine} 
                />
              </div>
             
              {/* ---- */}
              <div>
                <Label>Business Documents</Label>
                <div className="flex items-center gap-2 px-4 py-6">
                  {
                    resturant?.documents.map((doc) => (
                      <div key={doc?.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={doc.document}
                            alt="document"
                            className="w-10 h-10 rounded-full"
                          />
                          <span>{doc.type}</span>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center">No documents uploaded yet.</div>
                    )
                  }
                </div>
              </div>
              {/* ---- */}
              <div>
                <label htmlFor="call_center_number">Call Center Number</label>
                <input 
                  disabled={!isEditing}
                  type="text" 
                  id="call_center_number" 
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3`} 
                  value={callCenterNumber} 
                  onChange={(e) => setCallCenterNumber(e.target.value)}
                />
              </div>
              {/* ---- */}
              <div>
              <label htmlFor="menu_file">Menu File</label>
              {isEditing ? (
                  <input
                    type="file"
                    id="menu_file"
                    onChange={(e) => handleFileChange(e, setMenuFile)}
                    className="block w-full border-neutral-200 bg-white dark:border-neutral-700 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  />
                ) : resturant?.menu_file !== "N/A" ? (
                  <div className="py-4">
                    <Link className="ps-3" to={resturant?.menu_file || ""} target="_blank">View Menu</Link>
                  </div>
                ) : (
                  <input
                    title="menu-file"
                    type="text"
                    disabled
                    value="No menu uploaded"
                    className="block w-full border-neutral-200 bg-white dark:border-neutral-700 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  />
                )}
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

export default AccountPage;
