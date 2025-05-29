import { Tab } from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import CommentListing from "components/CommentListing/CommentListing";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StartRating from "components/StartRating/StartRating";
import StayCard from "components/StayCard/StayCard";
import {
  DEMO_CAR_LISTINGS,
  DEMO_EXPERIENCES_LISTINGS,
  DEMO_STAY_LISTINGS,
} from "data/listings";
import React, { FC, Fragment, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import SocialsList from "shared/SocialsList/SocialsList";
import { Helmet } from "react-helmet-async";
import { useUserStore } from "store/UseShowSingleUserProfile";
import { useParams } from "react-router-dom";
import UserShotCard from "components/UserShotCard/UserShotCard";

export interface AuthorPageProps {
  className?: string;
}

const SingleUserPage: FC<AuthorPageProps> = ({ className = "" }) => {
    const {userID} = useParams();
    const uniqueUserID: any = userID;
    const { userData, loading, error, fetchUser } = useUserStore();
    useEffect(() => {
        fetchUser(uniqueUserID);
      }, [fetchUser]);
      console.log(userData?.data);
      
  let [categories] = useState(["Stays", "Experiences", "Car for rent"]);
  let [userCategories] = useState(['Tags', 'Favorites'])
  const renderSidebar = () => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
          imgUrl={userData?.data?.user?.image}
        />

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{userData?.data?.user?.name}</h2>
          <StartRating point={userData?.data?.user?.shots_count} reviewCount={'shots'} className="!text-base" />
        </div>

        {/* ---- */}
        {/* <p className="text-neutral-500 dark:text-neutral-400">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor.
        </p> */}

        {/* ---- */}
        <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
        />

        {/* ---- */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* ---- */}
        <div className="space-y-4 ">
          <div className="flex items-center space-x-4">
            <span>
              Followers
            </span>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {userData?.data?.user?.followers_count}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>
              Following
            </span>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {userData?.data?.user?.followings_count}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span>
            Favorite Restaurants
            </span>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {userData?.data?.user?.favorite_restaurant_count}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">{userData?.data?.user?.name} Tags</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {userData?.data?.user?.name} tags is very rich, {userData?.data?.user?.shots_count} tag reviews help him to be
            more branded.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {userCategories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {
                    userData?.data?.tags?.tags?.map((tag)=>(
                      <UserShotCard
                      isDashboard={false}
                      key={tag?.id}
                      data={tag}
                    />
                    ))
                  }
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              {/* <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 4).map(
                    (stay) => (
                      <ExperiencesCard key={stay.id} data={stay} />
                    )
                  )}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel> */}
              {/* <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {DEMO_CAR_LISTINGS.filter((_, i) => i < 4).map((stay) => (
                    <CarCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel> */}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {/* {renderSection2()} */}
        </div>
      </main>
    </div>
  );
};

export default SingleUserPage;
