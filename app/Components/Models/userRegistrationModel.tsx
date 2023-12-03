"use client";

import React from "react";
import axios from "axios";
import RegistrationHeadig from "../navbar/RegistrationHeadig";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import Form from "../Forms/Form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import userRegister from "@/app/hooks/userHook";
import Model from "./Model";
import { toast } from "react-hot-toast";
import Button from "../Button";

const userRegistrationModel = () => {
  const RegisterModel = userRegister();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data) // data is a field value
      .then(() => {
        RegisterModel.onClose();
      })
      .catch((error) => {
        toast.error("Could not register");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <div className="flex flex-col gap-4">
      <RegistrationHeadig
        heading="Welcome to Nameastay,"
        secondHeading="Where Comfort and Hospitality Unite!"
        center
      />
      <Form
        id="Name"
        label="Name"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Form
        id="Email"
        label="Email"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Form
        id="Password"
        label="Password"
        type="password"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      
    </div>
  );

  const footerContent = (
    <div className=" flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <div
        className="
       text-neutral-500
        justify-center
        mt-4  
        font-light"
      >
        <div className="flex text-center flex-row items-center gap-2">
          <div>Already Have an Account?</div>
          <div
            className="text-neutral-500
          cursor-pointer
          hover:underline
          "
          onClick={RegisterModel.onClose}
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Model
      disable={isLoading}
      isOpen={RegisterModel.isOpen}
      title="Sign In"
      primaryActionLable="Continue"
      onClose={RegisterModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footerContent}
    />
  );
};

export default userRegistrationModel;
