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

  const handleToggleSignUp = (type: "user" | "business") => {
    setIsBusiness(type === "business");
  };
  const { countries, fetchCountries } = useCountriesStore();
  const { cuisines, fetchCuisines } = useCuisinesStore();
  const navigate = useNavigate()
  useEffect(() => {
    fetchCountries(); 
    fetchCuisines();
  }, [fetchCountries, fetchCuisines]);
  const [formData, setFormData] = useState<{
    applicant_full_name: string;
    name: string;
    email: string;
    phone: string;
    country_id: string;
    cuisine_id: string;
    password: string;
    documents: File[];
    logo: File | null;
  }>({
    applicant_full_name: "",
    name: "",
    email: "",
    phone: "",
    country_id: "",
    cuisine_id: "",
    password: "",
    documents: [],
    logo: null,
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [id]: id === "documents" ? Array.from(files) : files[0],
      }));
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formToSubmit = new FormData();

    formToSubmit.append("applicant_full_name", formData.applicant_full_name);
    formToSubmit.append("name", formData.name);
    formToSubmit.append("email", formData.email);
    formToSubmit.append("phone", formData.phone);
    formToSubmit.append("password", formData.password);
    formToSubmit.append("country_id", formData.country_id);
    formToSubmit.append("cuisine_id", formData.cuisine_id);

    if (formData.logo instanceof File) {
      formToSubmit.append("logo", formData.logo);
    } else {
      toast.error("The Logo field is required.");
      return;
    }

    if (Array.isArray(formData.documents) && formData.documents.length > 0) {
      formData.documents.forEach((file) => {
        formToSubmit.append("documents[]", file);
      });
    } else {
      toast.error("The Documents field is required.");
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/restaurant/register`, formToSubmit, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(formData);
      
      
      navigate('/');
      toast.success(`${response?.data?.message}`);
      // if (token) {
      //   Cookies.set("auth_token", token, { expires: 7 });
      //   Cookies.set("currentRestaurantData", JSON.stringify(restaurantData), { expires: 7 });
      //   toast.success("Registration successful!");
      // } else {
      //   toast.error("Registration failed. Please try again.");
      // }
      console.log(formData);

    } catch (err: any) {
      console.log(formData);
      const errorMessage = err.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
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
            onClick={() => handleToggleSignUp("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-lg text-sm font-medium ${isBusiness ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-700'}`}
            onClick={() => handleToggleSignUp("business")}
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
                {/* <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Business Type
                  </span>
                  <select
                    id="businessType"
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Choose Business Type</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Store">Store</option>
                    <option value="Cafe">Cafe</option>
                  </select>
                </label> */}
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select Business Location
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
                {/* <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select Your Gender
                  </span>
                  <select
                    id="gender"
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Choose a gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    
                  </select>
                </label> */}
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select Your Country
                  </span>
                  <select
                    id="countries"
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Choose a country</option>
                    <option value="US">Amman</option>
                    <option value="CA">Riyadh</option>
                    <option value="FR">Dubai</option>
                    <option value="DE">Cairo</option>
                  </select>
                </label>
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                    Select Food Category
                  </span>
                  <select
                    id="foodCategory"
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                  >
                    <option selected>Choose Category</option>
                    <option value="US">Burger</option>
                    <option value="CA">Pizza</option>
                    <option value="FR">Shawarma</option>
                    <option value="DE">Kabab</option>
                  </select>
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
