"use client";

// Importing necessary React components and libraries
import React, { useCallback } from "react";
import RegistrationHeadig from "../navbar/RegistrationHeadig";
import { useState } from "react";
import Form from "../Forms/Form";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import userLoginHook from "@/app/hooks/UserLoginHook";
import Model from "./Model";
import { toast } from "react-hot-toast";
import userRegisterHook from "@/app/hooks/UserRegisterHook";
import { useRouter } from "next/navigation";

// Defining the user login model component
const userLoginModel = () => {
  // Initializing Next.js router
  const router = useRouter();

  // Fetching custom hooks for user registration and login
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
      email: "",
      password: "",
    },
  });

  // Handling form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Signing in using NextAuth.js credentials provider
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        // Displaying success toast and refreshing the page
        toast.success("Log in successful");
        router.refresh();
        loginModel.onClose();
      }

      if (callback?.error) {
        // Displaying error toast if authentication fails
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModel.onClose();
    RegisterModel.onOpen();
  }, [loginModel, RegisterModel]);

  // JSX for the main form body
  const body = (
    <div className="flex flex-col gap-4">
      <RegistrationHeadig
        heading="Welcome back to Namestay,"
        secondHeading="Log in to your account"
        center
      />
      <Form
        id="email"
        label="Email"
        disable={isLoading}
        register={register}
        errors={errors}
        required
        type={""}
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
    </div>
  );

  // JSX for the footer content
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="text-neutral-500 justify-center mt-4 font-light">
        <div className="flex text-center justify-center flex-row items-center gap-2">
          <div>Don't have an account?</div>
          <div
            className="text-neutral-500 cursor-pointer hover:underline"
            onClick={toggle}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );

  // JSX for the entire modal component
  return (
    <Model
      disable={isLoading}
      isOpen={loginModel.isOpen}
      title="Log In"
      primaryActionLable="Continue"
      onClose={loginModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footerContent}
    />
  );
};

// Exporting the userLoginModel component
export default userLoginModel;
