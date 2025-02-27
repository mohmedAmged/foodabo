import Label from "components/Label/Label";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import axios from "axios";
import { baseURL } from "functions/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const VerifyUserAccount = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<any>({
    otp: ''
    });

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = event.target;
        setFormData((prev: any) => ({ ...prev, [id]: value }));
    };

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
        
        try {
            
            const response = await axios.post(`${baseURL}/user/verify-account`, formToSubmit, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Cookies.get("auth_token")}`,
                
            },
            });
            toast.success(`${response?.data?.message}`);
            navigate("/");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "An unexpected error occurred");
        }
        };
  return (
    <div>
        <>
            <div className="max-w-md mx-auto space-y-6 my-6">
            {/* HEADING */}
            <h2 className="text-3xl font-semibold">Verify your Account</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className=" max-w-xl space-y-6" >
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                    Otp
                </span>
                <Input
                    type="otp"
                    id="otp"
                    value={formData?.otp}
                    onChange={handleChange}
                    placeholder="example@example.com"
                    className="mt-3"
                />
                </label>
                <ButtonPrimary type="submit" >
                    Submit
                </ButtonPrimary>
                </form>
                
            </div>
            </div>
        </>
    </div>
  );
};

export default VerifyUserAccount;
