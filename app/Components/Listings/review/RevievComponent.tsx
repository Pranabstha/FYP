"use client";
import { useState } from "react";
import Form from "../../Forms/Form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../Button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import React from "react";
import userLoginHook from "@/app/hooks/UserLoginHook";
import { safeUser } from "@/app/Types";
import ReviewStar from "./ReviewStar";
import { Review } from "@prisma/client";

interface ReviewComponentProps {
  review?: Review[];
  currentUser: safeUser | null;
}

const RevievComponent: React.FC<ReviewComponentProps> = ({
  currentUser,
  review = [],
}) => {
  const loginModel = userLoginHook();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    const submit_data = { ...data };
    setIsLoading(true);

    axios
      .post("/api/Review", submit_data)
      .then(() => {
        toast.success("Review added successfully");
        router.refresh();
        reset();
      })
      .catch((error) => {
        // Displaying error toast if registration fails
        toast.error("Something went wrong, try again later");
      })
      .finally(() => {
        // Resetting loading state
        setIsLoading(false);
      });
  };
  return (
    <div className=" flex flex-col gap-4">
      <div className="font-semibold text-neutral-600 text-lg">Review</div>
      <div className="font-semibold text-neutral-600">
        <Form
          id="review"
          label="Write a review"
          type="text"
          disable={isLoading}
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex justify-around text-neutral-500">
        <ReviewStar size={25} />
      </div>
      <div>
        <Button label="Reserve" onClick={onSubmit} disabled={isLoading} />
      </div>
    </div>
  );
};

export default RevievComponent;
