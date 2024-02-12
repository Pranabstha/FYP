"use client";
import { safeUser } from "@/app/Types";
import React from "react";
import RegistrationHeadig from "../navbar/RegistrationHeadig";
import Image from "next/image";
import FavButton from "../FavButton";

interface ListingHeadingProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser: safeUser | null;
  //   location: string
}

const ListingHeading: React.FC<ListingHeadingProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
  //   location
}) => {
  return (
    <>
      <RegistrationHeadig
        heading={title}
        secondHeading="locaiton hal na parcha ya"
      />
      <div
        className="
        w-full
      h-[60vh]
      overflow-hidden
      rounded-2xl
      relative
      "
      >
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <FavButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHeading;
