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
    description: "Accommodation is caregories as a hotel",
  },
  {
    label: "HomeStays",
    icon: FiHome,
    description: "Accommodation is caregories as a Homestays",
  },
  {
    label: "Apartment",
    icon: MdApartment,
    description: "Accommodation is caregories as an Appartment",
  },
  {
    label: "Private property",
    icon: FaHome,
    description: "Accommodation is caregories as a private property",
  },
  {
    label: "Farm House",
    icon: GiBarn,
    description: "This property is in a farm!",
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
