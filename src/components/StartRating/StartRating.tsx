import { CameraIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";

export interface StartRatingProps {
  className?: string;
  point?: number;
  reviewCount?: any;
}

const StartRating: FC<StartRatingProps> = ({
  className = "",
  point = 4.5,
  reviewCount = '112',
}) => {
  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <div className="pb-[2px]">
        <CameraIcon className="w-[18px] h-[18px] text-orange-500" />
      </div>
      <span className="font-medium ">{point}</span>
      <span title="ll" className="text-neutral-500 dark:text-neutral-400">
        ({reviewCount})
      </span>
    </div>
  );
};

export default StartRating;
