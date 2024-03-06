"use client";

import Container from "@/app/Components/Container";
import ListingDetails from "@/app/Components/Listings/ListingDetails";
import ListingHeading from "@/app/Components/Listings/ListingHeading";
import ReservationComponent from "@/app/Components/Listings/Reservation/ReservationComponent";
import RevievComponent from "@/app/Components/Listings/review/RevievComponent";
import { categories } from "@/app/Components/navbar/Categories";
import { safeListings, safeUser } from "@/app/Types";
import userLoginHook from "@/app/hooks/UserLoginHook";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
  Rooms: 1,
  guests: 1,
};

interface ListingComponentProps {
  reservation?: Reservation[];
  listing: safeListings & {
    user: safeUser;
  };
  currentUser: safeUser | null;
}

const ListingComponent: React.FC<ListingComponentProps> = ({
  listing,
  currentUser,
  reservation = [],
}) => {
  const loginModel = userLoginHook();
  const router = useRouter();

  const disabledates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);

  const [isloading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/Reservations/", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
        guestCount: guestCount,
        roomCount: roomCount,
      })
      .then(() => {
        toast.success("Reservation successfull");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    totalPrice,
    dateRange,
    listing?.id,
    router,
    currentUser,
    loginModel,
    guestCount,
    roomCount,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const sumDays = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (sumDays) {
        setTotalPrice(sumDays * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return categories.find((cat) => cat.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div
        className="max-w-screen-lg 
          mx-auto"
      >
        <div className="flex flex-col gap-6">
          <ListingHeading
            title={listing.title}
            imageSrc={listing.imageSrc}
            id={listing.id}
            address={listing.address}
            currentUser={currentUser}
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
            <ListingDetails
              user={listing.user}
              category={category}
              desciption={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              address={listing.address}
              longitude={listing.longitude}
              latitude={listing.latitude}
            />
            <div
              className="
              order-first
              mb-10
              md:order-last
              md:col-span-3
            "
            >
              <ReservationComponent
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => {
                  setDateRange(value);
                }}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disable={isloading}
                disableDate={disabledates}
                setGuestCount={setGuestCount}
                setRoomCount={setRoomCount}
                maxRoomCount={listing.roomCount}
                maxGuestCount={listing.guestCount}
              />
              <div className="p-4">
                <RevievComponent currentUser={currentUser} listing={listing} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingComponent;
