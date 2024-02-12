"use client";

import Container from "@/app/Components/Container";
import ListingHeading from "@/app/Components/Listings/ListingHeading";
import { categories } from "@/app/Components/navbar/Categories";
import { safeListings, safeUser } from "@/app/Types";
import { Reservation } from "@prisma/client";
import React, { useMemo } from "react";

interface ListingComponentProps {
  reservation?: Reservation[];
  listing: safeListings & {
    user: safeUser;
  };
  currentUser?: safeUser | null;
}

const ListingComponent: React.FC<ListingComponentProps> = ({
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((cat) => cat.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeading
            title={listing.title}
            imageSrc={listing.imageSrc}
            id={listing.id}
            currentUser={currentUser}
            // location={title}
          />
          <div
            className="
          grid
          grid-col-1
          md:grid-cols-7
          md:gap-10
          mt-6
          "
          >
            {/* <LisitngDetails
              user= {listing.user}

            /> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingComponent;
