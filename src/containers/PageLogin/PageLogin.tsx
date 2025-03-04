import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "functions/baseUrl";

export interface PageLoginProps {
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

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const [isBusiness, setIsBusiness] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const currLoginType = isBusiness ? 'business' : 'user';
console.log(currLoginType);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
        const toastId = toast.loading("Login...");
        try {
          const endpoint = isBusiness ? "/restaurant/login" : "/user/user-login";
          const response = await axios.post(`${baseURL}${endpoint}`, formData);
          
        const token = response.data.data.token;
        const loginData = isBusiness ? response?.data?.data?.restaurant : response?.data?.data?.user;
          if (token) {
            Cookies.set("auth_token", token, {
              expires: 7,
              secure: process.env.NODE_ENV === "production", 
              sameSite: "Strict", 
            });
            Cookies.set("logInData", JSON.stringify(loginData), { expires: 7 });
            Cookies.set("loginType", currLoginType, { expires: 7 });
            if (!isBusiness && !loginData?.is_verified ) {
              navigate("/verify-account");  
            }
            navigate("/");  
            toast.update(toastId, { 
              render: response?.data?.message, 
              type: "success", 
              isLoading: false, 
              autoClose: 3000 
            });
          }
        } catch (err: any) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
              const errors = err.response.data.errors as Record<string, string[]>; 
              const firstError = Object.values(errors)?.[0]?.[0] || "Validation Error";
              toast.update(toastId, { 
                render: firstError, 
                type: "error", 
                isLoading: false, 
                autoClose: 5000 
              });
              Object.values(errors).forEach((errorMessages) => {
                errorMessages.forEach((message) => toast.error(message));
              });
            } else {
              toast.update(toastId, { 
                render: err.response?.data?.message || "An unexpected error occurred", 
                type: "error", 
                isLoading: false, 
                autoClose: 5000 
              });
            }
            }
     
    };
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        {/* User / Business Button Toggle */}
        <div className="flex justify-center mb-24 space-x-6">
          <button
            type="button"
            className={`px-6 py-2 rounded-lg text-sm font-medium ${!isBusiness ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-700'}`}
            onClick={() => setIsBusiness(false)}
          >
            User
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-lg text-sm font-medium ${isBusiness ? 'bg-primary-500 text-white' : 'bg-neutral-200 text-neutral-700'}`}
            onClick={() => setIsBusiness(true)}
          >
            Business
          </button>
        </div>
        <div className="max-w-md mx-auto space-y-6">
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
                Email address
              </span>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input 
              id="password"
              value={formData.password}
              onChange={handleChange}
              type="password" 
              className="mt-1" 
              />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default PageLogin;
