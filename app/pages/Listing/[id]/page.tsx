import EmptyState from "@/app/Components/EmptyState";
import getListingId from "@/app/action/getListingId";
import React from "react";
import ListingComponent from "./ListingComponent";
import getCurrentUser from "@/app/action/getUser";

interface IParams {
  id?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listingData = await getListingId(params);
  const currentUser = await getCurrentUser();
  if (!listingData) {
    return <EmptyState />;
  }

  return <ListingComponent listing={listingData} currentUser={currentUser} />;
};

export default ListingPage;
