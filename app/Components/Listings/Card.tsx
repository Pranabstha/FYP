"use client";

import { safeUser } from "@/app/Types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import FavButton from "../FavButton";
import getListing from "@/app/action/getListings";
import Button from "../Button";

interface CardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  currentUser: safeUser | null;
}

const Card: React.FC<CardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  currentUser,
  actionLabel,
}) => {
  const router = useRouter();
  const handelCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "pp")} - ${format(end, "pp")}`;
  }, [reservation]);
  return (
    <div
      className="col-span-1
    cursor-pointer
    group
    "
      onClick={() => router.push(`/lisitngs/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="aspect-square
        w-full
        relative
        overflow-hidden
        rounded-xl
        "
        >
          <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className="object-cover
            h-full
            w-full
            group-hover:scale-100
            transition
            "
          />
          <div className="absolute top-3 right-3">
            <FavButton lisitngId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.title}</div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">Rs {price}</div>
          {!reservation && <div className="font-light"> per night</div>}
        </div>
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handelCancel}
        />
      )}
    </div>
  );
};

export default Card;
