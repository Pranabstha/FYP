"use client";

import React from "react";
import RegistrationHeadig from "../navbar/RegistrationHeadig";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Form from "../Forms/Form";
import {signIn} from  "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import userLoginHook from "@/app/hooks/userLoginHook";
import Model from "./Model";
import { toast } from "react-hot-toast";
import Button from "../Button";
import userRegisterHook from "@/app/hooks/userRegisterHook";
import { useRouter } from "next/navigation";



const userLoginModel = () => {
  const router = useRouter();
  const RegisterModel = userRegisterHook();
  const loginModel = userLoginHook();
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    signIn("credentials", {
      ...data,
      redirect: false
    })
    .then((callback) =>{
      setIsLoading(false);

      if(callback?.ok){
        toast.success("Log in successfull")
        router.refresh();
        loginModel.onClose();
      }

      if(callback?.error){
        toast.error(callback.error);
      }
    })
  };

  const body = (
    <div className="flex flex-col gap-4">
      <RegistrationHeadig
        heading="Welcome back to Nameastay,"
        secondHeading="Log in to yout account"
        center
      />
      <Form
        id="email"
        label="Email"
        disable={isLoading}
        register={register}
        errors={errors}
        required
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
        <div className="flex text-center justify-center flex-row items-center gap-2">
          <div>Don't have an account?</div>
          <div
            className="text-neutral-500
          cursor-pointer
          hover:underline
          "
          onClick={RegisterModel.onClose}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
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

export default userLoginModel;
