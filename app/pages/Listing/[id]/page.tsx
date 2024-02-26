import EmptyState from "@/app/Components/EmptyState";
import getListingId from "@/app/action/getListingId";
import React from "react";
import ListingComponent from "./ListingComponent";
import getCurrentUser from "@/app/action/getUser";
import getReservation from "@/app/action/getReservation";

interface IParams {
  id?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listingData = await getListingId(params);
  const currentUser = await getCurrentUser();
  const reservationData = await getReservation(params);
  if (!listingData) {
    return <EmptyState />;
  }

  return (
    <ListingComponent
      listing={listingData}
      reservation={reservationData}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
