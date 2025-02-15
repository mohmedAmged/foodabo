import React, { FC, useEffect, useState } from "react";

export interface MenuBuisnessCardProps {
  data: {
    image: string;
    title_en: string;
    price: string;
    description_en: string;
    category: string;
    number_of_recommendations: number;
  };
}

const MenuBuisnessCard: FC<MenuBuisnessCardProps> = ({ data }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoaded(true);
      console.log("Rendered with data:", data);
    };
    fetchData();
  }, [data]);

  if (!loaded) {
    return <p>Loading item...</p>;
  }

  const { image, title_en, price, description_en, category, number_of_recommendations } = data;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow p-4">
      <img src={image} alt={title_en} className="w-full h-48 object-cover rounded-t-2xl" />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{title_en}</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{description_en}</p>
        <p className="text-base font-bold mt-2">${price}</p>
        <p className="text-sm mt-1">Category: {category}</p>
        <p className="text-sm mt-1">Recommendations: {number_of_recommendations}</p>
      </div>
    </div>
  );
};

export default MenuBuisnessCard;
