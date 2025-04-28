import CardAuthorBox from "components/CardAuthorBox/CardAuthorBox";
import CardAuthorBox2 from "components/CardAuthorBox2/CardAuthorBox2";
import Heading from "components/Heading/Heading";
import ItemHomeCard from "components/ItemHomeCard/ItemHomeCard";
import { DEMO_AUTHORS } from "data/authors";
import { AuthorType } from "data/types";
import React, { FC, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { UseHomeRankedItemsStore } from "store/UseHomeRankedItemsStore";

export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: "box1" | "box2";
  gridClassName?: string;
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 10);

const ItemsHomeSection: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors = DEMO_DATA,
  boxCard = "box1",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
}) => {
    const {
        rankedItems,
        itemMeta,
        loading,
        fetchRankedItems,
      } = UseHomeRankedItemsStore();
        useEffect(() => {
            fetchRankedItems();
        }, [fetchRankedItems]);
      console.log(rankedItems);
      
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc="Top 10 ranked of the month by user review" isCenter>
        Most ranked this month
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {/* {authors.map((author, index) =>
          boxCard === "box2" ? (
            <CardAuthorBox2 key={author.id} author={author} />
          ) : (
            <CardAuthorBox
              index={index < 3 ? index + 1 : undefined}
              key={author.id}
              author={author}
            />
          )
        )} */}
        {
            rankedItems?.map((el)=>(
            <ItemHomeCard key={el.id} rankedItem={el} />
            ))
        }
      </div>
      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        <ButtonSecondary>Show me more </ButtonSecondary>
        <ButtonPrimary>Become a host</ButtonPrimary>
      </div>
    </div>
  );
};

export default ItemsHomeSection;
