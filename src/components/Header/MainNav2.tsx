"use client"
import React, { FC, useEffect, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "./LangDropdown";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import DropdownTravelers from "./DropdownTravelers";
import { Link, useNavigate } from "react-router-dom";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import { toast, ToastContainer } from "react-toastify";
export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("auth_token");
  const loginType = Cookies.get("loginType");
  const ResturantData: any =  Cookies.get("logInData");
  const currResturantData = JSON.parse(ResturantData || '{}')
  useEffect(() => {
  const token = Cookies.get("auth_token");
    setIsLoggedIn(!!token); 
  }, []);
  console.log( currResturantData);
  const handleLogout = async () => {
    const token = Cookies.get("auth_token");
    try {
      const endPoint = loginType === 'business' ? '/restaurant/logout' : '/user/user-logout'
      const response = await axios.post(`${baseURL}${endPoint}?t=${new Date().getTime()}`,{},  {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        window.location.reload();
        Cookies.remove("auth_token");
        Cookies.remove("logInData");
        Cookies.remove("loginType");
        navigate("/");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };
  return (
    <div className={`nc-MainNav1 nc-MainNav2 relative z-10 ${className}`}>
      <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
        <div className="hidden md:flex justify-start flex-1 items-center space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
          <div className="hidden lg:block h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
          <div className="hidden lg:block">
            <DropdownTravelers />
          </div>
        </div>

        {/* <div className="lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <HeroSearchForm2MobileFactory />
        </div> */}

        <div className="hidden md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden items-center lg:flex space-x-1">
            {/* <CurrencyDropdown /> */}
            {/* <LangDropdown /> */}
            {/* <Link
              to="/add-listing-1"
              className="
                text-opacity-90
                group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              List your property
            </Link> */}
            <SwitchDarkMode />
            {token ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-opacity-90 group px-4 py-2 border border-red-500 hover:border-red-600 dark:border-red-700 rounded-full inline-flex items-center text-sm text-red-700 dark:text-red-300 font-medium hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Login/Signup
              </Link>
            )}
            <div></div>
            {/* <SwitchDarkMode /> */}
            {/* <div className="pr-1.5">
              <NotifyDropdown className="-ml-2 xl:-ml-1" />
            </div> */}
            { loginType &&
              <AvatarDropdown loginType={loginType} token={token} currentRestaurantData={currResturantData}/>
            }
          </div>
          <div className="flex items-center space-x-2 lg:hidden">
            {/* <NotifyDropdown /> */}
            { loginType &&
              <AvatarDropdown loginType={loginType} token={token} currentRestaurantData={currResturantData}/>
            }
            <MenuBar />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainNav2;
