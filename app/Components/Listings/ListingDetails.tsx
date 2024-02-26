"use client";

import { safeUser } from "@/app/Types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../navbar/Avatar";
import ListingCategory from "./ListingCategory";
import DisplayListingMap from "./DisplayListingMap";

interface ListingDetailsProps {
  user: safeUser;
  category:
    | {
        icon: IconType;
        label: string;
      }
    | undefined;
  desciption: string;
  roomCount: number;
  guestCount: number;
  address: string | null; // Update type to allow null
  longitude: number;
  latitude: number;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
  user,
  category,
  desciption,
  roomCount,
  guestCount,
  address,
  longitude,
  latitude,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center 
            gap-2

        "
        >
          Accomodation listed by {user?.name}
          <Avatar />
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            font-light
            text-nuteral-500
            gap-4
        "
        >
          <div>{guestCount} Guests</div>
          <div>{roomCount} Rooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory icons={category.icon} label={category.label} />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{desciption}</div>
      <hr />
      <DisplayListingMap
        latitude={latitude}
        longitude={longitude}
        address={address}
        setAddress={() => {}}
        handleSetCoordinates={() => {}}
      />
    </div>
  );
};

export default ListingDetails;
