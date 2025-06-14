import React, { FC, Fragment, useEffect, useState } from "react";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import StartRating from "components/StartRating/StartRating";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";
import SectionDateRange from "../SectionDateRange";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Amenities_demos, PHOTOS } from "./constant";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import DetailPagetLayout from "../Layout";
import GuestsInput from "./GuestsInput";
import { useSingleRestaurantStore } from "store/SingleResturantStore";
import { useClaimDealStore } from "store/useClaimDealStore";
import { withRegion } from "functions/withRegionRoute";
import Cookies from "js-cookie";
interface gallerry_interface{
  id?: number;
  img?:string;
}
const GALLERY_IMAGES: gallerry_interface[] = [
  {
      id: 1,
      img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg'
  },
  {
      id: 2,
      img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
  },
  {
      id: 3,
      img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
  },
  {
      id: 4,
      img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg'
  },
  {
      id: 5,
      img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg'
  },
  {
      id: 6,
      img: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg'
  },
]
const SingleResturantDetailPageContainer: FC<{}> = () => {
  //
const {singleResturant} = useParams()
console.log(singleResturant);
const {
    restaurant,
    items,
    deals,
    tags,
    loading,
    error,
    getRestaurant,
  } = useSingleRestaurantStore();

  useEffect(() => {
    if (singleResturant) {
      getRestaurant(singleResturant);
    }
  }, [singleResturant, getRestaurant]);
console.log(tags);
    const loginType = Cookies.get("loginType");

const { claimDeal, isLoading } = useClaimDealStore();

  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const thisPathname = useLocation().pathname;
  const router = useNavigate();

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {
    router(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE`);
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge name="Wooden house" />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {restaurant?.name}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating point={restaurant?.number_of_tags} reviewCount="Tags"/>
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">{restaurant?.country_name}</span>
          </span>
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <Avatar imgUrl={restaurant?.logo} hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Owned by{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              {restaurant?.applicant_full_name}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        { 
            <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          {
            restaurant?.cuisines?.map((item)=>(
                <div key={item?.id} className="flex items-center space-x-3 ">
                    <img style={{width:'50px', height:'50px'}} src={item?.image} alt={item?.name} />
                    <span className="">
                     <span className="hidden sm:inline-block">{item?.name}</span>
                    </span>
          </div>
            ))
          }
        </div>
        }
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Resturant information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>
            {restaurant?.about_us ? restaurant?.about_us : 'no information yet'}
          </span>
          
        </div>
      </div>
    );
  };
  const renderGallerySection = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Gallery Tags</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the resturant's Items and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-neutral-700 dark:text-neutral-300 ">
          {tags?.map((tag, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div>
              <img className="h-auto max-w-full rounded-lg" src={tag?.image} alt="" />
                
                
                <div className="flex items-center mt-2">
                <NavLink to={withRegion(`/show-user/1`)} className={'nav-link'}>
                  <Avatar imgUrl={tag?.user?.image} hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
                </NavLink>
                  <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
                    take by{" "}
                    <span className="text-neutral-900 dark:text-neutral-200 font-medium">
                      <NavLink to={withRegion(`/show-user/1`)}>
                      {tag?.user?.name}
                      </NavLink>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <Link to={'/explore'} className=" relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0">
            Explore more gallery items
          </Link>
        </div>
      </div>
    );
  };
  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Cuisines </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
        {
            restaurant?.cuisines?.map((item)=>(
                <div key={item?.id} className="flex items-center space-x-3 ">
                    <img style={{width:'50px', height:'50px'}} src={item?.image} alt={item?.name} />
                    <span className="">
                     <span className="hidden sm:inline-block">{item?.name}</span>
                    </span>
          </div>
            ))
          }
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <ButtonSecondary onClick={openModalAmenities}>
            View more Cuisines
          </ButtonSecondary>
        </div>
        {renderMotalAmenities()}
      </div>
    );
  };

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
                      Cuisines
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                  {
                    restaurant?.cuisines?.map((item)=>(
                        <div key={item?.id} className="flex items-center space-x-3 ">
                            <img style={{width:'50px', height:'50px'}} src={item?.image} alt={item?.name} />
                            <span className="">
                            <span className="hidden sm:inline-block">{item?.name}</span>
                            </span>
                        </div>
                    ))
                    }
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Our Menu </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            View Our best menu items
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            { items?.slice(0,4)?.map((item)=>(
                <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
                <div>
                    <Avatar
                    imgUrl = {item?.image}
                    // hasChecked
                    hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
                    sizeClass="h-14 w-14"
                    radius="rounded-full"
                  />
                  <span className="ms-2">{item?.title}</span>
                </div>
  
                <span>{item?.price_with_currency}</span>
                  </div>
            ))
                
            }
            {/* <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
            <div>
                  <Avatar
                  imgUrl ="https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  // hasChecked
                  hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
                  sizeClass="h-14 w-14"
                  radius="rounded-full"
                />
                <span className="ms-2">Seafood Pizza</span>
              </div>
              <span>$199</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
            <div>
                  <Avatar
                  imgUrl ="https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  // hasChecked
                  hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
                  sizeClass="h-14 w-14"
                  radius="rounded-full"
                />
                <span className="ms-2">kabab</span>
              </div>
              <span>$199</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
            <div>
            <Avatar
                  imgUrl ="https://images.pexels.com/photos/5779368/pexels-photo-5779368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  // hasChecked
                  hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
                  sizeClass="h-14 w-14"
                  radius="rounded-full"
                />
                <span className="ms-2">Shawerma</span>
            </div>
            <span>$199</span>
            </div> */}
            {/* <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>1 night</span>
            </div> */}
            {/* <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>90 nights</span>
            </div> */}
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-6"></div>
            <div>
              <ButtonSecondary onClick={()=>router(`/${singleResturant}/menu-items`)}>
                View more menu items
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Owner Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            imgUrl = {restaurant?.logo}
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {restaurant?.applicant_full_name}
            </a>
            {/* <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating />
              <span className="mx-2">·</span>
              <span> 12 places</span>
            </div> */}
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
          accommodation, an outdoor swimming pool, a bar, a shared lounge, a
          garden and barbecue facilities...
        </span>

        {/* info */}
        {/* <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Joined in March 2016</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div> */}

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="/author">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {restaurant?.country_name}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <iframe
              title="x"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Refund 50% of the booking value when customers cancel the room
            within 48 hours after successful booking and 14 days before the
            check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50%
            refund of the total amount paid (minus the service fee).
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Check-in time</h4>
          <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
            <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span>Check-in</span>
              <span>08:00 am - 12:00 am</span>
            </div>
            <div className="flex space-x-10 justify-between p-3">
              <span>Check-out</span>
              <span>02:00 pm - 04:00 pm</span>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Special Note</h4>
          <div className="prose sm:prose">
            <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
              <li>
                Ban and I will work together to keep the landscape and
                environment green and clean by not littering, not using
                stimulants and respecting people around.
              </li>
              <li>Do not sing karaoke past 11:30</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* DEALS SECTION */}
        <div className="flex flex-col space-y-4">
          <div className="text-2xl font-semibold">Exclusive deals</div>
          <p className="text-neutral-6000 dark:text-neutral-300">
            Select a deal that best fits your needs, purchase the certificate, and present it using our mobile app or a printed copy when you dine. Our deals never expire and are easy to exchange if plans change!
          </p>
  
          {/* $15 OFF DEAL */}
          {
            deals?.map((deal)=>(
            <div key={deal?.id} className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-xl font-semibold">{deal?.deal_type_translated} for {deal?.discount_value}</span>
                  { loginType === 'user' &&
                    <button
                    type="button"
                    onClick={() => claimDeal(`${deal?.id}`)}
                    className="bg-primary-6000 text-white px-4 py-2 sm:px-2 rounded-lg"
                  >
                    Claim
                  </button>}
                </div>
                <span className="text-neutral-6000 dark:text-neutral-300">you can use in {deal?.used_in} (view terms)</span>
            </div>
            ))
          }
          
  
          {/* $25 OFF DEAL */}
          {/* <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">$25 Off Deal</span>
              <button className="bg-primary-6000 text-white px-4 py-2 rounded-lg">Add to cart</button>
            </div>
            <span className="text-neutral-6000 dark:text-neutral-300">Grab this deal for only $10.00 (view terms)</span>
          </div> */}
  
          {/* DINING DISCOUNT PASS */}
          {/* <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Dining Discount Pass</span>
              <button className="bg-primary-6000 text-white px-4 py-2 rounded-lg">View Offer</button>
            </div>
            <span className="text-neutral-6000 dark:text-neutral-300">Get discounts at over 170,000 restaurants and retailers nationwide.</span>
          </div> */}
        </div>
      </div>
    );
  };
  return (
    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer "
            onClick={handleOpenModalImageGallery}
          >
            <img
              className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
              src={PHOTOS[0]}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                index >= 3 ? "hidden sm:block" : ""
              }`}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <img
                  className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                  src={item || ""}
                  alt=""
                  sizes="400px"
                />
              </div>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderGallerySection()}
          {renderSection3()}
          {renderSection4()}
          {/* <SectionDateRange /> */}
          {renderSection5()}
          {/* {renderSection6()} */}
          {renderSection7()}
          {/* {renderSection8()} */}
        </div>

        {/* SIDEBAR */}
        <div className=" lg:block flex-grow mt-8 lg:mt-0 xl:w-3/5">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default function SingleResturantDetails() {
  return (
    <DetailPagetLayout>
      <SingleResturantDetailPageContainer />
    </DetailPagetLayout>
  );
}
