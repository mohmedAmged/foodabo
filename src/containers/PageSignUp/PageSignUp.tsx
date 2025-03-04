"use client"
import React, { FC, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";
import { useCountriesStore } from "store/AllCountries";
import { useCuisinesStore } from "store/AllCuisines";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { baseURL } from "functions/baseUrl";

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  // {
  //   name: "Continue with Facebook",
  //   href: "#",
  //   icon: facebookSvg,
  // },
  // {
  //   name: "Continue with Twitter",
  //   href: "#",
  //   icon: twitterSvg,
  // },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const { countries, fetchCountries } = useCountriesStore();
  const { cuisines, fetchCuisines } = useCuisinesStore();
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCountries(); 
    fetchCuisines();
  }, [fetchCountries, fetchCuisines]);
  
  const [formData, setFormData] = useState<any>({
    applicant_full_name: "",
    name: "",
    email: "",
    phone: "",
    country_id: "",
    cuisine_id: "",
    password: "",
    documents: [],
    logo: null,
    username: "",
    phone_code:'',
    password_confirmation: '',
    city_id: '',
    cuisines: [],
    image: null
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
    if (id === "country_id") {
      fetchCities(value);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    if (files && files.length > 0) {
      setFormData((prev: any) => ({
        ...prev,
        [id]: id === "documents" ? Array.from(files) : files[0],
      }));
    }
  };

  const handleCuisineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCuisine = cuisines.find((cuisine) => cuisine.id.toString() === event.target.value);
    if (selectedCuisine && !selectedCuisines.some((c) => c.id === selectedCuisine.id)) {
      setSelectedCuisines([...selectedCuisines, selectedCuisine]);
      setFormData((prev: any) => ({ ...prev, cuisines: [...prev.cuisines, event.target.value] }));
    }
  };

  const removeCuisine = (id: number) => {
    setSelectedCuisines(selectedCuisines.filter((c) => c.id !== id));
    setFormData((prev: any) => ({ ...prev, cuisines: prev.cuisines.filter((c: string) => c !== id.toString()) }));
  };

  const fetchCities = async (countryId: string) => {
    try {
      const response = await axios.get(`${baseURL}/show-country/${countryId}`);
      setCities(response.data.data.cities || []);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };
  const currLoginType = isBusiness ? 'business' : 'user';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formToSubmit = new FormData();
    
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item: any) => formToSubmit.append(`${key}[]`, item));
      } else if (formData[key]) {
        formToSubmit.append(key, formData[key]);
      }
    }
    const toastId = toast.loading("Submitting...");
    try {
      const endpoint = isBusiness ? "/restaurant/register" : "/user/user-register";
      const response = await axios.post(`${baseURL}${endpoint}`, formToSubmit, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      // toast.success(`${response?.data?.message}`);
      toast.update(toastId, { 
        render: response?.data?.message, 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });
      if (!isBusiness) {
        Cookies.set("auth_token", response.data.data.token, { expires: 7 });
        Cookies.set("logInData", JSON.stringify(response?.data?.data?.user), { expires: 7 });
        Cookies.set("loginType", currLoginType, { expires: 7 });
         
        navigate("/verify-account");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      if (err.response?.status === 422 && err.response?.data?.errors) {
        const errors = err.response.data.errors as Record<string, string[]>; 
        const firstError = Object.values(errors)?.[0]?.[0] || "Validation Error";
        toast.update(toastId, { 
          render: firstError, 
          type: "error", 
          isLoading: false, 
          autoClose: 5000 
        });
        Object.values(errors).forEach((errorMessages) => {
          errorMessages.forEach((message) => toast.error(message));
        });
      } else {
        toast.update(toastId, { 
          render: err.response?.data?.message || "An unexpected error occurred", 
          type: "error", 
          isLoading: false, 
          autoClose: 5000 
        });
      }
    }
  };

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Booking React Template</title>
      </Helmet>
      <div className="container mb-8 lg:mb-32">
        <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        {/* User / Business Button Toggle */}
        <div className="flex justify-center mb-24 space-x-6">
          <button
            type="button"
            className={`px-6 py-2 rounded-lg text-sm font-medium ${!isBusiness ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-700'}`}
            onClick={() => setIsBusiness(false)}
          >
            User
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-lg text-sm font-medium ${isBusiness ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-700'}`}
            onClick={() => setIsBusiness(true)}
          >
            Business
          </button>
        </div>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email Address
              </span>
              <Input
                type="email"
                id="email"
                value={formData?.email}
                onChange={handleChange}
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            { isBusiness &&
              <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                Full Name
              </span>
              <Input 
              type="text" 
              className="mt-1" 
              id="applicant_full_name"
              value={formData?.applicant_full_name}
              onChange={handleChange}
              />
            </label>
            }
            { !isBusiness &&
              <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                Full Name
              </span>
              <Input 
              type="text" 
              className="mt-1" 
              id="name"
              value={formData?.name}
              onChange={handleChange}
              />
            </label>
            }
            {
              !isBusiness &&
              <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                User Name
              </span>
              <Input 
              type="text" 
              className="mt-1" 
              id="username"
              value={formData?.username}
              onChange={handleChange}
              />
            </label>
            }
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input 
              type="password" 
              className="mt-1" 
              id="password"
              value={formData?.password}
              onChange={handleChange}
              />
            </label>
            { !isBusiness &&
              <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password Confirmation
              </span>
              <Input 
              type="password" 
              className="mt-1" 
              id="password_confirmation"
              value={formData?.password_confirmation}
              onChange={handleChange}
              />
            </label>
            }
            { isBusiness &&
              <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Phone Number
              </span>
              <Input 
              type="text" 
              className="mt-1" 
              id="phone"
              value={formData?.phone}
              onChange={handleChange}
              />
            </label>
            }
            {
              !isBusiness && (
                <div className="flex space-x-2">
            <select
            title="phone_code"
             id="phone_code" 
             name="phone_code"
             value={formData.phone_code} 
             onChange={handleChange} 
             className="p-2 border rounded-lg">
               {countries?.map((country: any) => (
                <option key={country?.id} value={country?.phone_code}>
                ({country?.name}) {country?.phone_code}
                </option>
              ))}
              
              
            </select>
            <Input type="text" id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded-lg" />
                </div>
              )

            }
            <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select Country
                  </span>
                  <select
                    id="country_id"
                    value={formData?.country_id}
                    onChange={handleChange}
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Choose a country</option>
                    {countries?.map((country: { id: number; name: string }) => (
                      <option key={country.id} value={country.id}>
                      {country.name}
                      </option>
                    ))}
                  </select>
                </label>
            {isBusiness ? (
              <>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Business Name
                  </span>
                  <Input 
                  type="text" 
                  className="mt-1" 
                  id="name"
                  value={formData?.name}
                  onChange={handleChange}
                  />
                </label>
                
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select Business cuisines
                  </span>
                  <select
                    id="cuisine_id"
                    value={formData?.cuisine_id}
                    onChange={handleChange}
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Select Business cuisines</option>
                    {cuisines?.map((cuisine: { id: number; name: string }) => (
                      <option key={cuisine.id} value={cuisine.id}>
                      {cuisine.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Business Logo
                  </span>
                  <input
                  id="logo"
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl h-11 px-4 py-3"
                    accept="image/*"
                  />
                </label>
                <label className="block">
                  <span className="text-neutral-800 dark:text-neutral-200">Documents</span>
                  <input
                  id="documents"

                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    className="block w-full"
                  />
                </label>
              </>
            ) : (
              <>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select Your City
                  </span>
                  <select
                    id="city_id"
                    value={formData?.city_id}
                    onChange={handleChange}
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Choose a country</option>
                    {cities?.map((city: any) => (
                      <option key={city.id} value={city.id}>
                      {city.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select cuisines
                  </span>
                  <select
                    id="cuisines"
                    // value={formData?.cuisines}
                    onChange={handleCuisineChange}
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Select Business cuisines</option>
                    {cuisines?.map((cuisine: { id: number; name: string }) => (
                      <option key={cuisine.id} value={cuisine.id}>
                      {cuisine.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 space-y-1">
                    {selectedCuisines.map((cuisine) => (
                      <div key={cuisine.id} className="flex justify-between items-center p-2  rounded-lg">
                        <span>{cuisine.name}</span>
                        <button type="button" onClick={() => removeCuisine(cuisine.id)} className="text-red-500">Remove</button>
                      </div>
                    ))}
                </div>
                </label>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Image
                  </span>
                  <input
                    id="image"
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl h-11 px-4 py-3"
                    accept="image/*"
                  />
                </label>
              </>
            )}
            {/* <ButtonPrimary type="submit">Continue</ButtonPrimary> */}
            <button type="submit" >
    Submit
  </button>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PageSignUp;
