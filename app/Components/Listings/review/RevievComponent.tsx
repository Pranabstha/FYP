"use client";
import { useCallback, useState } from "react";
import Form from "../../Forms/Form";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../../Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import React from "react";
import userLoginHook from "@/app/hooks/UserLoginHook";
import { safeListings, safeUser } from "@/app/Types";
import ReviewStar from "./ReviewStar";
import { Review } from "@prisma/client";

interface ReviewComponentProps {
  review?: Review[];
  currentUser: safeUser | null;
  listing: safeListings & {
    user: safeUser;
  };
}

const RevievComponent: React.FC<ReviewComponentProps> = ({
  currentUser,
  listing,
}) => {
  const loginModel = userLoginHook();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();
  const createReview = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/Review", {
        rating,
        review,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Thank you for your feedback");
        router.refresh();
        reset();
      });
  }, [rating, review, listing]);

  return (
    <div className=" flex flex-col gap-4">
      <div className="font-semibold text-neutral-600 text-lg">Review</div>
      <div className="font-semibold text-neutral-600">
        <Form
          id="review"
          onChange={(e) => setReview(e.target.value)}
          label="Write a review"
          type="text"
          disable={isLoading}
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex justify-around text-neutral-500">
        <ReviewStar size={28} setRating={setRating} />
      </div>
      <div>
        <Button label="Reserve" onClick={createReview} disabled={isLoading} />
      </div>
    </div>
  );
};

export default RevievComponent;
