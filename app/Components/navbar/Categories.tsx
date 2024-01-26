"use client";
import React from "react";
import Container from "../Container";
import { BsSnow } from "react-icons/bs";
import { TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiForestCamp } from "react-icons/gi";
import {
  MdBusiness,
  MdDirectionsBike,
  MdHotel,
  MdLocalHotel,
  MdLocationCity,
} from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { FaHiking } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { usePathname, useSearchParams } from "next/navigation";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Hotels",
    icon: MdBusiness,
    description: "Accommodation is caregories as a hotel",
  },
  {
    label: "HomeStays",
    icon: FiHome,
    description: "Accommodation is caregories as a Homestays",
  },
  {
    label: "Pool",
    icon: FiHome,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "City",
    icon: MdLocationCity,
    description: "Accommodation is in a majorcity",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Farm",
    icon: GiBarn,
    description: "This property is in a farm!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  const pathname = usePathname();
  const mainPage = pathname === "/";

  return (
    <div>
      <Container>
        <div
          className="
        pt-4
        flex
        flex-row
        items-center
        justify-center
        overflow-x-auto
        "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
