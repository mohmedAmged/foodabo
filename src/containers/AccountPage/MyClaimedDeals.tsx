import React, { FC, useEffect, useState } from "react";

import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet-async";
import { useMyClaimedDealsStore } from "store/MyClaimedDealsStore";
import { useNavigate } from "react-router-dom";
import { withRegion } from "functions/withRegionRoute";


export interface AccountPageProps {
  className?: string;
}

const MyClaimedDeals: FC<AccountPageProps> = ({ className = "" }) => {
    const { deals, loading, error, fetchMyClaimedDeals } = useMyClaimedDealsStore();
    const navigate = useNavigate()
    useEffect(() => {
      fetchMyClaimedDeals(); 
    }, []);
    console.log(deals);
    
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Booking React Template</title>
      </Helmet>
      <CommonLayout>
            <div className="space-y-6 sm:space-y-8">
            {/* HEADING */}
            <h2 className="text-3xl font-semibold">My Deals</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                {/* Table Head */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" className="px-6 py-3">Restaurant Logo</th>
                    <th scope="col" className="px-6 py-3">Restaurant Name</th>
                    <th scope="col" className="px-6 py-3">Deal Code</th>
                    <th scope="col" className="px-6 py-3">Deal Type</th>
                    <th scope="col" className="px-6 py-3">Discount Value</th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Show</span>
                    </th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {loading ? (
                    <tr>
                        <td colSpan={6} className="text-center px-6 py-4">
                        Loading...
                        </td>
                    </tr>
                    ) : error ? (
                    <tr>
                        <td colSpan={6} className="text-center text-red-500 px-6 py-4">
                        {error}
                        </td>
                    </tr>
                    ) : deals.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="text-center px-6 py-4">
                        No deals found.
                        </td>
                    </tr>
                    ) : (
                    deals.map((deal) => (
                        <tr key={deal.code} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">
                            <img
                            src={deal.restaurant_logo}
                            alt="Restaurant Logo"
                            className="w-12 h-12 rounded-full object-cover"
                            />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {deal.restaurant_name} 
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {deal.code}
                        </td>
                        <td className="px-6 py-4">
                            {deal.deal_type}
                        </td>
                        <td className="px-6 py-4">
                            {deal.discount_value}%
                        </td>
                        <td className="px-6 py-4 text-right">
                            <button
                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            onClick={() => navigate(withRegion(`/my-claimed-deals/${deal?.code}`))}
                            >
                            Show
                            </button>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>

            </div>

      </CommonLayout>
    </div>
  );
};

export default MyClaimedDeals;
