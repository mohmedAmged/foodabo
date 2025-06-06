import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home-2"?: {};
  "/home-3"?: {};
  "/home-1-header-2"?: {};
  //
  "/listing-flights"?: {};
  //
  "/listing-stay"?: {};
  "/categories/:categSlug"?: {}; //new added for fodabo
  "/All-categories"?: {}; //new added for fodabo
  "/latest-deals"?: {}; //new added for fodabo
  "/:resturantName/menu-items"?: {}; //new added for fodabo
  "/Add-new-deal"?:{}; //new added for fodabo
  "/account-menu"?:{}; //new added for fodabo
  "/account-menu/add-items"?:{}; //new added for fodabo
  "/account-menu/create-category"?:{}; //new added for fodabo
  "/account-menu/edit-category/:categID"?:{}; //new added for fodabo
  "/account-deals"?:{}; //new added for fodabo
  "/pay-failed"?:{}; //new added for fodabo
  "/account-packages"?:{}; //new added for fodabo
  "/verify-account"?:{}; //new added for fodabo
  "/user-account"?:{}; //new added for fodabo
  "/explore"?:{}; //new added for fodabo

  "/listing-stay-map"?: {};
  "/listing-stay-detail"?: {};
  //
  "/listing-experiences"?: {};
  "/listing-experiences-map"?: {};
  "/listing-experiences-detail"?: {};
  //
  "/listing-real-estate"?: {};
  "/listing-real-estate-map"?: {};
  "/listing-real-estate-detail"?: {};
  //
  "/listing-car"?: {};
  "/listing-car-map"?: {};
  "/listing-car-detail"?: {};
  //
  "/checkout"?: {};
  "/pay-done"?: {};
  //
  "/account"?: {};
  "/account-savelists"?: {};
  "/account-password"?: {};
  "/account-billing"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};
  //
  "/add-listing-1"?: {};
  "/add-listing-2"?: {};
  "/add-listing-3"?: {};
  "/add-listing-4"?: {};
  "/add-listing-5"?: {};
  "/add-listing-6"?: {};
  "/add-listing-7"?: {};
  "/add-listing-8"?: {};
  "/add-listing-9"?: {};
  "/add-listing-10"?: {};
  //
  "/author"?: {};
  "/search"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
