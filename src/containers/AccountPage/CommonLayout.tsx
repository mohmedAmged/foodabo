import { withRegion } from "functions/withRegionRoute";
import Cookies from "js-cookie";
import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
    const loginType = Cookies.get("loginType");
  
  return (
    <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
        <div className="container">
          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            <NavLink
              to={loginType === 'business' ? `${withRegion('account')}` : `${withRegion('/user-account')}`}
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Profile 
            </NavLink>
            {loginType !== 'user' &&
              <NavLink
              to={withRegion('/account-packages')}
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Packages
            </NavLink>
            }
            <NavLink
              to={loginType !== 'user' ? withRegion('/account-deals') : withRegion('/my-claimed-deals')}
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              {loginType !== 'user' ? 'Deals' : 'Claimed Deals'}
            </NavLink>
            <NavLink
              to={withRegion('/account-password')}
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Change password
            </NavLink>
            <NavLink
              to={withRegion('/account-billing')}
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Change Billing
            </NavLink>
            { loginType !== 'user' &&
              <NavLink
              to={withRegion('/account-menu')}
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Menu
            </NavLink>}
            <NavLink
              to={withRegion('/account-awards')}
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Awards
            </NavLink>
            { loginType === 'user' &&
              <NavLink
              to={withRegion('/user-tags')}
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  !isActive ? "border-transparent" : "border-primary-500"
                }`
              }
            >
              Tags
            </NavLink>}
          </div>
        </div>
      </div>
      <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">{children}</div>
    </div>
  );
};

export default CommonLayout;
