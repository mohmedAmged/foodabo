import { PencilSquareIcon,PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { withRegion } from "functions/withRegionRoute";
import React, { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import { RemoveTagState } from "store/UseRemoveTagShot";
import { UserTag } from "store/UseUserShotsStore";

export interface TagItemProps {
    data: UserTag
    removeTag?: () => void;
    deleteShot?: () => void;
    isDashboard: boolean;
  };



const UserShotCard: FC<TagItemProps> = ({data, removeTag, deleteShot, isDashboard}) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate()
  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

 


//   const renderMotalAmenities = () => {
//     return (
//       <Transition appear show={isOpenModalAmenities} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-50 overflow-y-auto"
//           onClose={closeModalAmenities}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block py-8 h-screen w-full max-w-4xl">
//                 <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
//                   <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
//                     <h3
//                       className="text-lg font-medium leading-6 text-gray-900"
//                       id="headlessui-dialog-title-70"
//                     >
//                       Deal Items
//                     </h3>
//                     <span className="absolute left-3 top-3">
//                       <ButtonClose onClick={closeModalAmenities} />
//                     </span>
//                   </div>
//                   <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
//                     {deal_items?.map((item) => (
//                       <div
//                         key={item.item_id}
//                         className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
//                       >
                        
//                         <span>{item.item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     );
//   };
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow p-4 relative">
       { !data?.has_tags && isDashboard === true &&
        <div className="absolute top-6 right-6 bg-[rgba(0,0,0,0.4)] p-2 rounded-full">
        <PlusCircleIcon
        onClick={()=>(navigate(withRegion(`/user-tags/add-tag-for/${data?.id}`)))} 
         title="Add Tag" aria-hidden="true" className="w-5 h-5 text-white cursor-pointer hover:text-gray-300" />
        </div>
      }
      { isDashboard === true &&
        <div className="absolute top-6 left-6 bg-[rgba(0,0,0,0.4)] p-2 rounded-full">
        <TrashIcon 
        onClick={deleteShot} 
        title="Delete Shot" aria-hidden="true" className="w-4 h-4 text-white cursor-pointer hover:text-gray-300" />
      </div>
      }
      <img src={data?.image} 
      alt={`image_${data?.id}`}
       className="w-full h-48 object-cover rounded-t-2xl" />
      { data?.has_tags &&
        <div className="mt-4">
        <div style={{alignItems:'center', gap:'8px'}} className="flex">
            <span>@</span>
            <img style={{width:'40px', height:'40px', borderRadius:'50%'}} src={data?.restaurant?.logo} alt={data?.restaurant?.name} />
            <NavLink  to={withRegion(`/${data?.restaurant?.slug}`)}>
            <h2 style={{textTransform:'capitalize'}} className="text-lg font-semibold">{data?.restaurant?.name}</h2>
            </NavLink>
        </div>
        { data?.item !== null &&
            <div className="mt-2 ms-2">
                <p style={{textTransform:'capitalize'}} className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    shot for <span>{data?.item?.title}</span> item
                </p>
            </div>
        }
            { isDashboard === true &&
              <div style={{textAlign:'start'}}>
            <ButtonSecondary className="mt-5" onClick={removeTag}>
            Remove Tag
            </ButtonSecondary>
            </div>
            }
            
      </div>}
      {/* {renderMotalAmenities()} */}
      <ToastContainer />
    </div>
  );
};

export default UserShotCard;
