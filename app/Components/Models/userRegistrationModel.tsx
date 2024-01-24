"use client";

// Importing necessary React components and libraries
import React, { useCallback } from "react";
import axios from "axios";
import RegistrationHeadig from "../navbar/RegistrationHeadig";
import { useState } from "react";
import Form from "../Forms/Form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Model from "./Model";
import { toast } from "react-hot-toast";
import userRegisterHook from "@/app/hooks/UserRegisterHook";
import userLoginHook from "@/app/hooks/UserLoginHook";

// Defining the user registration model component
const userRegistrationModel = () => {
  // Fetching custom hook for user registration
  const RegisterModel = userRegisterHook();
  const loginModel = userLoginHook();

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // Initializing React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      updatedAt: new Date(),
    },
  });

  // Handling form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Check if the password and confirm password match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      setIsLoading(true);

      // Making a POST request to the registration API endpoint
      axios
        .post("/api/register", data) // data is a field value
        .then(() => {
          // Closing the registration modal and displaying success toast
          RegisterModel.onClose();
          toast.success("Account registered");
        })
        .catch((error) => {
          // Displaying error toast if registration fails
          toast.error("Could not register");
        })
        .finally(() => {
          // Resetting loading state
          setIsLoading(false);
        });
    }
  };

  const toggle = useCallback(() => {
    RegisterModel.onClose();
    loginModel.onOpen();
  }, [loginModel, RegisterModel]);

  // JSX for the main form body
  const body = (
    <div className="flex flex-col gap-4">
      <RegistrationHeadig
        heading="Welcome to Nameastay,"
        secondHeading="Where Comfort and Hospitality Unite!"
        center
      />
      <Form
        id="name"
        label="Name"
        type="text"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Form
        id="email"
        label="Email"
        type="email"
        disable={false}
        formatPrice={false}
        required={true}
        register={register}
        errors={errors}
        pattern={{
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, //passing pattern to email to validate email
        }}
      />
      <Form
        id="password"
        label="Password"
        type="password"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Form
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // JSX for the footer content
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="text-neutral-500 justify-center mt-4 font-light">
        <div className="flex text-center justify-center flex-row items-center gap-2">
          <p>
            Already Have an Account?
            <button
              className="text-neutral-500 cursor-pointer hover:underline"
              onClick={toggle}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // JSX for the entire modal component
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

// Exporting the userRegistrationModel component
export default userRegistrationModel;
