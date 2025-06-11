import React from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Logo from "shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO } from "data/navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import SocialsList from "shared/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "components/Header/LangDropdown";
import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import AvatarDropdown from "components/Header/AvatarDropdown";

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}
export interface FoodaboNavItemType {
  id: number;
  name: string;
  href: string;
  isNew?: boolean;
  targetBlank?: boolean;
  type?: "dropdown" | "megaMenu" | "none";
}

const FoodaboNavMobile: React.FC<NavMobileProps> = ({
//   data = FOODABO_NAVIGATION,
  onClickClose,
}) => {
  const navigate = useNavigate();
    const loginType = Cookies.get("loginType");
    const token = Cookies.get("auth_token");
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
  const _renderItem = () => {
    return (
      <Disclosure
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <NavLink
          end
          className={({ isActive }) =>
            `flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isActive ? "text-secondary" : ""
            }`
          }
          to={'/'}
        >
          <span
            className={`py-2.5 pr-3 `}
          >
            Home
          </span>
        </NavLink>
        <NavLink
          end
          className={({ isActive }) =>
            `flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isActive ? "text-secondary" : ""
            }`
          }
          to={'/All-categories'}
        >
          <span
            className={`py-2.5 pr-3 `}
          >
           All Categories
          </span>
        </NavLink>
        <NavLink
          end
          className={({ isActive }) =>
            `flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isActive ? "text-secondary" : ""
            }`
          }
          to={'/All-deals'}
        >
          <span
            className={`py-2.5 pr-3 `}
          >
           All Deals
          </span>
        </NavLink>
        { token && loginType === 'business' &&
        <NavLink
          end
          className={({ isActive }) =>
            `flex items-center w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isActive ? "text-secondary" : ""
            }`
          }
          to={'/Add-new-deal'}
        >
        
          <span
            className={`py-2.5 pr-3 `}
          >
           Add New Deal
          </span>
          <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/>
        </NavLink>
        }
        { token && loginType === 'user' &&
        <NavLink
          end
          className={({ isActive }) =>
            `flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isActive ? "text-secondary" : ""
            }`
          }
          to={'/user-tags/add-new-tag'}
        >
          <span
            className={`py-2.5 pr-3 `}
          >
            Add New Tag
          </span>
          <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/>
        </NavLink>
        }
        { token &&
            <NavLink
            end
            className={({ isActive }) =>
                `flex items-center w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg mb-5 ${
                isActive ? "text-secondary" : ""
                }`
            }
            to={loginType === 'business' ? '/account' : '/user-account'}
            >
            
            <span
                className={`py-2.5 pr-3 `}
            >
            Dashboard
            </span>
            </NavLink>
        }
        {token ? (
            <button
            type="button"
            onClick={handleLogout}
            className="text-opacity-90 group px-4 py-2 border border-red-500 hover:border-red-600 dark:border-red-700 rounded-full inline-flex items-center text-sm text-red-700 dark:text-red-300 font-medium hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 `"
            >
            Logout
            </button>
        ) : (
            <NavLink
            to="/login"
            className="text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
            Login/Signup
            </NavLink>
        )}
         
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {_renderItem()}
      </ul>
      <div className="flex items-center justify-end py-6 px-5">
        <LangDropdown panelClassName="z-10 w-screen max-w-[280px] px-4 mb-3 -right-3 bottom-full sm:px-0" />
      </div>
    </div>
  );
};

export default FoodaboNavMobile;
