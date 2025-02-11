import React, { useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const CreateMenuCategory = () => {
    const {categID} = useParams()
    console.log(categID);
    
const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
});
const [errors, setErrors] = useState<any>({});
const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
  // Fetch the category data when the component mounts or when categoryID changes
  useEffect(() => {
    const fetchCategory = async () => {
      if (categID) {
        try {
          const response = await axios.get(
            `${baseURL}/restaurant/show-category/${categID}?t=${new Date().getTime()}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json", // Adjust based on your API requirements
                    Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
            }
          );
          const category = response.data.data.category;
          setFormData({
            name_en: category?.name_en || "",
            name_ar: category?.name_ar || "",
          });
        } catch (error) {
          console.error("Error fetching category:", error);
          toast.error("Failed to load category data.");
        }
      }
    };

    fetchCategory();
  }, [categID]);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
};
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loadingToast = toast.loading("Submitting...");

    setIsLoading(true); // Set loading state

    try {
        let response;
        if (categID) {
        // If categoryID exists, it's an update request
        response = await axios.post(
            `${baseURL}/restaurant/update-category/${categID}`,
            formData,
            {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json", // Adjust based on your API requirements
                 Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
            }
        );
        toast.update(loadingToast, {
            render: response?.data?.message || "Category updated successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
        });
        } else {
        // If categoryID doesn't exist, it's a create request
        response = await axios.post(
            `${baseURL}/restaurant/create-category`,
            formData,
            {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json", // Adjust based on your API requirements
                 Authorization: `Bearer ${Cookies.get("auth_token")}`,
            },
            }
        );
        toast.update(loadingToast, {
            render: response?.data?.message || "Category created successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
        });
        }

        // Navigate after the success toast disappears
        setTimeout(() => {
        navigate("/account-menu");
        }, 3000);
    } catch (error: any) {
        // Check if there are validation errors
        if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors;
        setErrors(errorMessages); // Set the validation errors

        // Display error messages in toast
        const errorToastMessages = Object.values(errorMessages)
            .flat()
            .join(" ");
        toast.update(loadingToast, {
            render: errorToastMessages || "An error occurred.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
        });
        } else {
        toast.update(loadingToast, {
            render: error?.response?.data?.message || "An error occurred.",
            type: "error",
            isLoading: false,
            autoClose: 5000,
        });
        }
    } finally {
        setIsLoading(false); // Disable loading state for the button
    }
  };
  return (
    <div>
        <CommonLayout>
            <div className="space-y-6 sm:space-y-8">
            {/* HEADING */}
            <h2 className="text-3xl font-semibold">Create Menu Categories</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <form className=" max-w-xl space-y-6" onSubmit={handleSubmit}>
                <div className="flex space-x-6 overflow-x-auto">
                    <div>
                        <label htmlFor="name_en">
                            Category Name (En)
                        </label>
                        <Input 
                        type="text"
                        id="name_en" 
                        value={formData?.name_en}
                        onChange={handleChange}
                        className="mt-1.5" 
                        />
                        {errors?.name_en && (
                            <p className="text-red-500 text-sm mt-1">{errors?.name_en}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="name_ar">Category Name (Ar)</label>
                        <Input 
                        type="text"
                        id="name_ar"
                        value={formData?.name_ar}
                        onChange={handleChange}
                        className="mt-1.5" />
                        {errors?.name_ar && (
                            <p className="text-red-500 text-sm mt-1">{errors?.name_ar}</p>
                        )}
                    </div>
                </div>
                <div className="pt-2">
                <ButtonPrimary 
                type="submit" 
                disabled={isLoading}>
                {isLoading ? (
                  'submiting...' 
                ) : (
                    <>
                    {categID ? "Update Category" : "Create Category"}
                  </>
                )}
              </ButtonPrimary>
                </div>
            </form>
            </div>
        </CommonLayout>
        <ToastContainer />
    </div>
  );
};

export default CreateMenuCategory;
