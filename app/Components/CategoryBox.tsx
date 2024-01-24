"use client";

import { useSearchParams, useRouter } from "next/navigation";
// // import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const categoryClick = useCallback(
    () => {
      // empty query
      let currentQuerry = {};

      // checking in to params and also changing strings in to objects
      if (params) {
        currentQuerry = qs.parse(params.toString());
      }
      // spreading the new querry
      const updatedQuery: any = {
        ...currentQuerry,
        category: label,
      };
      // remove other category when a category is selected
      if (params?.get("category") === label) {
        delete updatedQuery.category;
      }
      // URl with the newest query
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        //filtering empyty options
        { skipNull: true }
      );
      // pushing the updated url in the router
      router.push(url);
    },
    // passing dependancy array
    [label, router, params]
  );

  return (
    <div
      className={`flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      boarder-b-3
      hover:text-yellow-400
      transition
      cursor-pointer
      ${selected ? " border-b-yellow-400" : "border-transparent"}
      ${selected ? "text-yellow-400" : "text-neutral-500"}
      `}
      onClick={categoryClick}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
