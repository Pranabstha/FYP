"use client";
import React from "react";
import Container from "../Container";
import { GiBarn } from "react-icons/gi";
import { MdApartment, MdBusiness } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { FaHome } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Hotels",
    icon: MdBusiness,
  },
  {
    label: "HomeStays",
    icon: FiHome,
  },
  {
    label: "Apartment",
    icon: MdApartment,
  },
  {
    label: "Private property",
    icon: FaHome,
  },
  {
    label: "Farm House",
    icon: GiBarn,
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  const pathname = usePathname();
  const homePage = pathname === "/";

  if (!homePage) {
    return null;
  }

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
