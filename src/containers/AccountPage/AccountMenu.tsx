import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import {  PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useCategoriesStore } from "store/AllMenuCategories";
import { useNavigate } from "react-router-dom";
import MenuBuisnessCard from "components/MenuBuisnessItemCard/MenuBuisnessCard";
import { toast, ToastContainer } from "react-toastify";
import { baseURL } from "functions/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { withRegion } from "functions/withRegionRoute";

interface MenuItem {
  id: number;
  title: string;
  title_ar: string;
  title_en: string;
  description: string;
  description_ar: string;
  description_en: string;
  price: string;
  image: string;
  number_of_recommendations: number;
  category: string;
  category_id: number;
}
const AccountMenu = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<any>(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [currentCategory, setCurrentCategory] = useState<number | undefined>(undefined);
  const { categories, fetchCategories, currentPage, totalPages } = useCategoriesStore();
  // get all category of menu items
  useEffect(() => {
    fetchCategories(currentPage);
  }, [fetchCategories, currentPage]);

  

    const fetchItems = async (categoryId?: number,  pageNum = 1) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${baseURL}/restaurant/filter-menu?t=${new Date().getTime()}`, {
          params:{
            category: categoryId,
            page: pageNum
          },
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${Cookies.get("auth_token")}`,
             Accept:  "application/json"
            }
        });
        // console.log(response);
        const newItems = pageNum === 1 ? response.data.data.items : [...items, ...response.data.data.items];
        setItems(response?.data?.data?.items);
        setMeta(response.data.data.meta);
      } catch (err) {
        // setError('Failed to fetch items');
        toast.error('Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchItems(currentCategory, 1);
      setPage(1);
    }, [currentCategory]);
    const handleCategoryClick = (categoryId?: number) => {
      setCurrentCategory(categoryId);
    };
    const loadMoreItems = () => { 
      const nextPage = page + 1; setPage(nextPage);
      fetchItems(currentCategory, nextPage); 
      };

      const handleDelete = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));

      };
    
  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Menu Items Category</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
            <div className="pt-8 pb-10">
                <ButtonPrimary 
                // href={'/account-menu/create-category'} 
                href={`${withRegion('account-menu/create-category')}`}
                className="me-4">
                Create category <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/>
                </ButtonPrimary>
            </div>
        </div>
        <div className="pb-10 flex space-x-1 overflow-x-auto">
          {
            categories.map((category: any)=>(
              <button
              key={category?.id}
              type="button"
              onClick={()=>(navigate(`${withRegion(`account-menu/edit-category/${category?.id}`)}`))}
              className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none bg-secondary-900 text-secondary-50 flex items-center space-x-2`} // Added items-center and space-x-2
            >
              {category?.name} <PencilSquareIcon aria-hidden="true" className="w-6 h-6 ml-2" />
            </button>
            
            ))
          }
          
        </div>
        

      </div>
    );
  };
  const renderSection2 = () => {
    return (
      <div className="space-y-10 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Menu Items</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
            <div  className="py-10">
                <ButtonPrimary 
                // href={'/account-menu/add-items'}
                href={`${withRegion('account-menu/add-items')}`}
                >
                  Add menu Item  
                <PlusCircleIcon aria-hidden="true" className="w-6 h-6 ms-2"/>
                </ButtonPrimary>
            </div>
            
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
             
              <Tab as={Fragment}>
                  {({ selected }) => (
                    <button 
                    type="button"
                    onClick={() => handleCategoryClick(undefined)}
                    className={`px-5 py-2.5 text-sm sm:text-base rounded-full ${selected ? "bg-secondary-900 text-secondary-50" : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
                    
                    >
                      All Items
                    </button>
                  )}
              </Tab>
                {categories?.map((item) => (
                  <Tab key={item?.id} as={Fragment}>
                    {({ selected }) => (
                    
                    
                    <button
                        type="button"
                        onClick={() => handleCategoryClick(item.id)}
                        className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                          selected
                            ? "bg-secondary-900 text-secondary-50 "
                            : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        } `}
                      >
                        {item?.name}
                      </button>
                      
                      
                    )}
                  </Tab>
                ))}
            </Tab.List>
            <div>
                  <div>
                    {loading ? <p>Loading...</p> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {items.map(item => (
                          <MenuBuisnessCard
                            key={item.id}
                            data={item}
                            onDelete={handleDelete} 
                          />
                      ))}
                  </div>
                  
                    )}
                      {
                      meta && meta.current_page < meta.last_page && (<div className="flex mt-11 justify-center items-center"><ButtonSecondary onClick={loadMoreItems}>Show me more</ButtonSecondary></div>)
                      }
                  </div>
            </div>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>
      
      {renderSection1()}
      {renderSection2()}

        
      </CommonLayout>
      <ToastContainer />
    </div>
  );
};

export default AccountMenu;
