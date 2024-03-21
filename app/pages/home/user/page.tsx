"use client";

import React, { useEffect } from "react";
import getListing from "@/app/action/getListings";
import Card from "@/app/Components/Listings/Card";
import getCurrentUser from "@/app/action/getUser";
import { useRouter } from "next/router";
import { safeUser } from "@/app/Types";

interface homePageProps {
  currentUser: safeUser | null;
}

const homepage = async () => {
  const showListings = await getListing();
  const currentUser = await getCurrentUser();
  const router = useRouter();

  console.log(currentUser);

  return (
    <div
      className="
        pt-24
        grid 
        grid-cols-1
        sm: grid-cols-2
        md: grid-cols-3
        lg: grid-cols-4
        xl: grid-cols-5
        2xl: grid-cols-6
        gap-8
        "
    >
      {showListings.map((listing: any) => {
        return (
          <div>
            <Card data={listing} key={listing.id} currentUser={currentUser} />
          </div>
        );
      })}
    </div>
  );
};

export default homepage;
