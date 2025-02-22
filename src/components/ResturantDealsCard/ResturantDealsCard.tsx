import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import React, { FC, Fragment, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
interface DealItem {
    deal_item_id: number;
    item_id: number;
    item: string;
  }
export interface MenuBuisnessCardProps {
  data: {
    id: number;
    deal_type_translated: string;
    deal_type: string;
    discount_type_translated: string;
    discount_type: string;
    discount_value: string;
    expiary_deal: string | null;
    capacity_for_deal: string | null;
    start_date: string | null;
    end_date: string | null;
    used_in_translated: string;
    used_in: string;
    terms: string;
    deal_items: DealItem[];
  };
  onDelete: (id: number) => void;
//   onDelete: (id: number) => void;
}

const ResturantDealsCard: FC<MenuBuisnessCardProps> = ({ data, onDelete }) => {
  const [loaded, setLoaded] = useState(false);
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoaded(true);
      console.log("Rendered with data:", data);
    };
    fetchData();
  }, [data]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${baseURL}/restaurant/delete-deal/${data.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });
      
       // Notify the parent component that the item has been deleted
      if (response?.data?.status === 200) {
        toast.success(response?.data?.mesage)
        onDelete(id);
      }
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  if (!loaded) {
    return <p>Loading item...</p>;
  }

  const { id, deal_type_translated, discount_type_translated, discount_value, expiary_deal, capacity_for_deal, start_date, end_date, used_in_translated, terms,  deal_items} = data;
  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Deal Items
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {deal_items?.map((item) => (
                      <div
                        key={item.item_id}
                        className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                      >
                        
                        <span>{item.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow p-4 relative">
       <div className="absolute top-6 right-6 bg-[rgba(0,0,0,0.4)] p-2 rounded-full">
        <PencilSquareIcon title="Edit item" aria-hidden="true" className="w-4 h-4 text-white cursor-pointer hover:text-gray-300" />
      </div>
      <div className="absolute top-6 left-6 bg-[rgba(0,0,0,0.4)] p-2 rounded-full">
        <TrashIcon onClick={handleDelete} title="Delete Item" aria-hidden="true" className="w-4 h-4 text-white cursor-pointer hover:text-gray-300" />
      </div>
      <img src={'https://i.pinimg.com/736x/20/2d/6a/202d6aed6af25e2afec26baea4b4cff4.jpg'} alt={deal_type_translated} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{deal_type_translated}</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{terms}</p>
        {/* <p className="text-base font-bold mt-2">${price}</p> */}
        { start_date !== null &&
            <p className="text-sm mt-1">Start Date: {start_date}</p>
        }
        { end_date !== null &&
            <p className="text-sm mt-1">End Date: {end_date}</p>
        }
        <p className="text-sm mt-1">discount type: {discount_type_translated}</p>
        <p className="text-sm mt-1">discount value: {discount_value}</p>
        <p className="text-sm mt-1">Where used: {used_in_translated}</p>
        <ButtonSecondary className="mt-3" onClick={openModalAmenities}>
            View Items in this deal
          </ButtonSecondary>
      </div>
      {renderMotalAmenities()}
      <ToastContainer />
    </div>
  );
};

export default ResturantDealsCard;
