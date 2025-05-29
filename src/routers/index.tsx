import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "containers/ListingExperiencesPage/ListingExperiencesPage";
import ListingExperiencesMapPage from "containers/ListingExperiencesPage/ListingExperiencesMapPage";
import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
import PageHome2 from "containers/PageHome/PageHome2";
import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
import ListingRealEstatePage from "containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "containers/SiteHeader";
import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
import PageHome3 from "containers/PageHome/PageHome3";
import ListingStayDetailPage from "containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage";
import ListingCarDetailPage from "containers/ListingDetailPage/listing-car-detail/ListingCarDetailPage";
import ListingExperiencesDetailPage from "containers/ListingDetailPage/listing-experiences-detail/ListingExperiencesDetailPage";
import AllCategories from "containers/AllCategoriesPage/AllCategories";
import LatestDeals from "containers/LatestDealsPage/LatestDeals";
import AllMenuItemsPage from "containers/AllMenuItemsPage/AllMenuItems";
import AddNewDeal from "containers/PageAddListing1/AddNewDeal";
import AccountMenu from "containers/AccountPage/AccountMenu";
import AddNewMenuItem from "containers/AccountPage/AddNewMenuItem";
import CreateMenuCategory from "containers/AccountPage/CreateMenuCategory";
import AccountDeals from "containers/AccountPage/AccountDeals";
import { ToastContainer } from "react-toastify";
import PayFailed from "containers/PayFailed/PayFailed";
import AccountPackages from "containers/AccountPage/AccountPackages";
import VerifyUserAccount from "containers/AccountPage/VerifyUserAccount";
import AccountUserPage from "containers/AccountPage/AccountUserPage";
import ExploreGeneral from "containers/ExploreGeneralPage/ExploreGeneral";
import { useDefaultCountryStore } from "store/DefaultCountry";
import Cookies from "js-cookie";
import SingleResturantDetails from "containers/ListingDetailPage/listing-stay-detail/SingleResturantDetails";
import MyClaimedDeals from "containers/AccountPage/MyClaimedDeals";
import MySingleClaimedDealInfo from "containers/AccountPage/MySingleClaimedDealInfo";
import UserAccountTags from "containers/AccountPage/UserAccountTags";
import AddNewTag from "containers/AccountPage/AddNewTag";
import AddTagForImage from "containers/AccountPage/AddTagForImage";
import SingleUserPage from "containers/SingleUserPage/SingleUserPage";
import CuisineSinglePage from "containers/CuisineSinglePage/CuisineSinglePage";
import AllDealsPage from "containers/AllDealsPage/AllDealsPage";

export const pages = [
  // fodaboo routes
  { path: '/', exact: true, component: PageHome3 },
  { path: "/#", exact: true, component: PageHome3 },
  { path: '/All-categories' , component: AllCategories },
  { path: '/All-deals' , component: AllDealsPage },
  { path: '/:singleResturant' , component: SingleResturantDetails },
  { path: '/categories/:categSlug' , component: ListingStayPage },
  { path: '/cuisine/:cuisineID' , component: CuisineSinglePage },
  { path: '/latest-deals' , component: LatestDeals },
  { path: "/:resturantName/menu-items", component: AllMenuItemsPage },
  { path: "/Add-new-deal", component: AddNewDeal },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/account", component: AccountPage },
  { path: "/user-account", component: AccountUserPage },
  { path: "/my-claimed-deals", component: MyClaimedDeals },
  { path: "/my-claimed-deals/:singleDeal", component: MySingleClaimedDealInfo },
  { path: "/user-tags", component: UserAccountTags },
  { path: "/user-tags/add-new-tag", component: AddNewTag },
  { path: "/user-tags/add-tag-for/:tagID", component: AddTagForImage },
  { path: "/show-user/:userID", component: SingleUserPage },
  { path: "/author", component: AuthorPage },
  { path: "/account-menu", component: AccountMenu },
  { path: "/account-menu/add-items", component: AddNewMenuItem },
  { path: "/account-menu/create-category", component: CreateMenuCategory },
  { path: "/account-menu/edit-category/:categID", component: CreateMenuCategory },
  { path: "/account-deals", component: AccountDeals },
  { path: "/account-packages", component: AccountPackages },
  { path: "/pay-failed", component: PayFailed },
  { path: "/verify-account", component: VerifyUserAccount },
  { path: "/explore", component: ExploreGeneral },
  
  { path: "/home-1-header-2", exact: true, component: PageHome },
  { path: "/home-2", component: PageHome2 },
  { path: "/home-3", component: PageHome3 },
  //
  { path: "/listing-stay", component: ListingStayPage },
  { path: "/listing-stay-map", component: ListingStayMapPage },
  { path: "/listing-stay-detail", component: ListingStayDetailPage },
  //
  {
    path: "/listing-experiences",
    component: ListingExperiencesPage,
  },
  {
    path: "/listing-experiences-map",
    component: ListingExperiencesMapPage,
  },
  {
    path: "/listing-experiences-detail",
    component: ListingExperiencesDetailPage,
  },
  //
  { path: "/listing-car", component: ListingCarPage },
  { path: "/listing-car-map", component: ListingCarMapPage },
  { path: "/listing-car-detail", component: ListingCarDetailPage },
  //
  { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
  { path: "/listing-real-estate", component: ListingRealEstatePage },
  //
  { path: "/listing-flights", component: ListingFlightsPage },
  //
  { path: "/checkout", component: CheckOutPage },
  { path: "/pay-done", component: PayPage },
  //
  
  
  { path: "/account-password", component: AccountPass },
  { path: "/account-savelists", component: AccountSavelists },
  { path: "/account-billing", component: AccountBilling },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/add-listing-1", component: PageAddListing1 },
  { path: "/add-listing-2", component: PageAddListing2 },
  { path: "/add-listing-3", component: PageAddListing3 },
  { path: "/add-listing-4", component: PageAddListing4 },
  { path: "/add-listing-5", component: PageAddListing5 },
  { path: "/add-listing-6", component: PageAddListing6 },
  { path: "/add-listing-7", component: PageAddListing7 },
  { path: "/add-listing-8", component: PageAddListing8 },
  { path: "/add-listing-9", component: PageAddListing9 },
  { path: "/add-listing-10", component: PageAddListing10 },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },

  { path: "/subscription", component: PageSubcription },
  //
];
const CountryCodeRedirect = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { countryCode } = useParams<{ countryCode: string }>();
  const { fetchDefaultCountry } = useDefaultCountryStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      let code = Cookies.get("region");

      if (!code) {
        await fetchDefaultCountry();

        const state = useDefaultCountryStore.getState();
        const defaultCountry = state.defaultCountry;

        if (defaultCountry && defaultCountry.code) {
          code = defaultCountry.code;
          Cookies.set("region", code);
        }
      }

      // Extract the first segment of the path
      const pathParts = location.pathname.split("/").filter(Boolean);

      // If first part is not a country code (e.g., longer than 3 chars), redirect
      if (!pathParts[0] || pathParts[0].length > 3) {
        const newPath = `/${code}${location.pathname}`;
        navigate(newPath, { replace: true });
      } else {
        setLoading(false);
      }
    };

    init();
  }, [location.pathname, fetchDefaultCountry, navigate]);

  if (loading) return null;
  return children;
};


const MyRoutes = () => {
  let WIN_WIDTH = useWindowSize().width;
  if (typeof window !== "undefined") {
    WIN_WIDTH = WIN_WIDTH || window.innerWidth;
  }

  return (
    // <BrowserRouter>
    //   <ScrollToTop />
    //   <CountryCodeRedirect>
    //   <>
    //     <SiteHeader />
    //     <Routes>
    //       {pages.map(({ component, path }) => {
    //         const Component = component;
    //         return <Route key={path} element={<Component />} 
    //         path={`/:countryCode${path === '/' ? '' : path}`} />;
    //       })}
    //       <Route element={<Page404 />} />
    //     </Routes>

    //     {WIN_WIDTH < 768 && <FooterNav />}
    //     <Footer />
    //   </>
    //   </CountryCodeRedirect>
    // </BrowserRouter>
    <BrowserRouter>
    <ScrollToTop />
    <CountryCodeRedirect>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
        <SiteHeader />
        
        <div className="flex-1">
          <Routes>
            {pages.map(({ component, path }) => {
              const Component = component;
              return (
                <Route
                  key={path}
                  element={<Component />}
                  path={`/:countryCode${path === '/' ? '' : path}`}
                />
              );
            })}
            <Route element={<Page404 />} />
          </Routes>
        </div>

        {WIN_WIDTH < 768 && <FooterNav />}
        <Footer />
      </div>
    </CountryCodeRedirect>
  </BrowserRouter>
  );
};

export default MyRoutes;
