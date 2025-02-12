import React, { useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { useCategoriesStore } from "store/AllMenuCategories";
import Textarea from "shared/Textarea/Textarea";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

type FormItem = {
  category_id: string;
  items: {
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    price: string;
    image: File | null;
  }[];
};

const AddNewMenuItem = () => {
  const { categories, fetchCategories, currentPage } = useCategoriesStore();
  const [formData, setFormData] = useState<{
    menu: FormItem[];
  }>({
    menu: [
      {
        category_id: '',
        items: [
          {
            title_en: '',
            title_ar: '',
            description_en: '',
            description_ar: '',
            price: '',
            image: null,
          }
        ]
      }
    ]
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    fetchCategories(currentPage);
  }, [fetchCategories, currentPage]);

  // Add a new menu item with a new category
  const handleAddItemWithCategory = () => {
    setFormData(prevState => ({
      ...prevState,
      menu: [
        ...prevState.menu,
        {
          category_id: selectedCategory || '', // Use selectedCategory here
          items: [
            {
              title_en: '',
              title_ar: '',
              description_en: '',
              description_ar: '',
              price: '',
              image: null,
            }
          ]
        }
      ]
    }));
  };

  // Add a new menu item under the selected category (without sending category_id again)
  const handleAddItemToSameCategory = (menuIndex: number) => {
    if (!selectedCategory) {
      toast.error('Please select a category first');
      return;
    }

    // Add a new item under the same category (using the menuIndex)
    setFormData(prevState => ({
      ...prevState,
      menu: prevState.menu.map((menu, index) => {
        if (index === menuIndex) {
          return {
            ...menu,
            items: [
              ...menu.items,
              {
                title_en: '',
                title_ar: '',
                description_en: '',
                description_ar: '',
                price: '',
                image: null,
              }
            ]
          };
        }
        return menu;
      })
    }));
  };

  const handleMenuChange = (menuIndex: number, field: keyof FormItem, value: any) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[menuIndex][field] = value;
    setFormData({ ...formData, menu: updatedMenu });
  };

  const handleItemChange = (menuIndex: number, itemIndex: number, field: keyof FormItem["items"][0], value: any) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[menuIndex].items[itemIndex][field] = value;
    setFormData({ ...formData, menu: updatedMenu });
  };

  const handleImageChange = (menuIndex: number, itemIndex: number, file: File | null) => {
    const updatedMenu = [...formData.menu];
    updatedMenu[menuIndex].items[itemIndex].image = file;
    setFormData({ ...formData, menu: updatedMenu });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>, menuIndex: number) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId); // Set the selected category
    const updatedMenu = [...formData.menu];
    updatedMenu[menuIndex].category_id = categoryId; // Update the category_id in formData
    setFormData({ ...formData, menu: updatedMenu });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the menu array has items
    if (formData.menu.length === 0) {
      toast.error('The menu is required.');
      return;
    }

    try {
      const submissionData = new FormData();

      formData.menu.forEach((menu, menuIndex) => {
        // Only append category_id if it's a new category (not adding to an existing category)
        if (menu.category_id && formData.menu[menuIndex].items[0].title_en) {
          submissionData.append(`menu[${menuIndex}][category_id]`, menu.category_id);
        }

        // Dynamically iterate over items in each menu
        menu.items.forEach((menuItem, itemIndex) => {
          submissionData.append(`menu[${menuIndex}][items][${itemIndex}][title_en]`, menuItem.title_en);
          submissionData.append(`menu[${menuIndex}][items][${itemIndex}][title_ar]`, menuItem.title_ar);
          submissionData.append(`menu[${menuIndex}][items][${itemIndex}][description_en]`, menuItem.description_en);
          submissionData.append(`menu[${menuIndex}][items][${itemIndex}][description_ar]`, menuItem.description_ar);
          submissionData.append(`menu[${menuIndex}][items][${itemIndex}][price]`, menuItem.price);
          if (menuItem.image) {
            submissionData.append(`menu[${menuIndex}][items][${itemIndex}][image]`, menuItem.image);  // Assuming image is a file object
          }
        });
      });

      console.log('Submission Data:', submissionData);  // Check the data structure in the console

      // Send the data to the backend using FormData
      const response = await axios.post(`${baseURL}/restaurant/create-menu`, submissionData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data", // Ensure the correct content type for FormData
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      });

      toast.success(response.data.message);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.response?.data.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Add Menu Items</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <form onSubmit={handleSubmit}>
            <div style={{ borderBottom: '1px solid rgba(var(--c-neutral-700))' }} className="AllformItems max-w-xl space-y-6">
              {formData.menu.map((formItem, menuIndex) => (
                <div key={menuIndex} className="space-y-6">
                  {/* Category Selector */}
                  {menuIndex === formData.menu.length - 1 && (
                    <div className="w-80">
                      <label htmlFor={`category_id_${menuIndex}`} className="flex justify-between items-center text-neutral-800 dark:text-neutral-200 mb-2">
                        Select Item Category
                      </label>
                      <select
                        id={`category_id_${menuIndex}`}
                        value={formItem.category_id}
                        onChange={(e) => handleCategoryChange(e, menuIndex)}
                        className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
                      >
                        <option value="">Choose Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Item Fields */}
                  {formItem.items.map((item, itemIndex) => (
                    <div style={{borderBottom: '1px solid #fff', paddingBottom: "15px"}} key={itemIndex} className="space-y-6">
                      <div>
                        <label>Item Name (En)</label>
                        <Input
                          type="text"
                          value={item.title_en}
                          onChange={(e) => handleItemChange(menuIndex, itemIndex, 'title_en', e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Item Name (Ar)</label>
                        <Input
                          type="text"
                          value={item.title_ar}
                          onChange={(e) => handleItemChange(menuIndex, itemIndex, 'title_ar', e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Price</label>
                        <Input
                          type="text"
                          value={item.price}
                          onChange={(e) => handleItemChange(menuIndex, itemIndex, 'price', e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Description (En)</label>
                        <Textarea
                          value={item.description_en}
                          onChange={(e) => handleItemChange(menuIndex, itemIndex, 'description_en', e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Description (Ar)</label>
                        <Textarea
                          value={item.description_ar}
                          onChange={(e) => handleItemChange(menuIndex, itemIndex, 'description_ar', e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Image</label>
                        <input
                        title="image"
                          type="file"
                          onChange={(e) => handleImageChange(menuIndex, itemIndex, e.target.files ? e.target.files[0] : null)}
                        />
                      </div>

                     
                    </div>
                  ))}
                   {/* Button to add new item under the same category */}
                   <div className="py-4">
                        <ButtonSecondary type="button" onClick={() => handleAddItemToSameCategory(menuIndex)}>
                          Add New Item to Same Category
                        </ButtonSecondary>
                      </div>
                </div>
              ))}
              <div className="py-4">
                <ButtonSecondary type="button" onClick={handleAddItemWithCategory}>
                  Create New Item with Another Category
                </ButtonSecondary>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: "center" }} className="py-4">
              <ButtonPrimary type="submit">Submit</ButtonPrimary>
            </div>
          </form>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AddNewMenuItem;
