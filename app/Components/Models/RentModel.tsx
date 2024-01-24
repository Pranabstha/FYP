"use client";

import UserRentHook from "@/app/hooks/UserRentHook";
import Model from "./Model";
import { useMemo, useState } from "react";
import RegistrationHeadig from "../navbar/RegistrationHeadig";
import { categories } from "../navbar/Categories";
import CategoryForm from "../Forms/CategoryForm";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Counter from "../Forms/Counter";
import Form from "../Forms/Form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  INFO = 1,
  DESCRIPTION = 2,
  PRICE = 3,
  IMAGE = 4,
  // LOCATION = 5,
}

const RentModel = () => {
  const router = useRouter();
  const rentModel = UserRentHook();

  const [step, setSteps] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      title: "",
      description: "",
      imageSrc: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      // location: null,
    },
  });

  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const Back = () => {
    setSteps((value) => value - 1);
  };

  const Forward = () => {
    setSteps((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return Forward;
    }

    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing added successfully");
        router.refresh();
        reset();
        setSteps(STEPS.CATEGORY);
        rentModel.onClose();
      })
      .catch((error) => {
        // Displaying error toast if registration fails
        toast.error("Could list property");
      })
      .finally(() => {
        // Resetting loading state
        setIsLoading(false);
      });
  };

  const CheckEndLsiting = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const CheckStartLsiting = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return "Undefine";
    }
    return "Back";
  }, [step]);

  // // change able body content which changes according the step that the listing page is in
  let body = (
    <div className="flex flex-col gap-8">
      <RegistrationHeadig
        heading="Which describes your accomodation best?"
        secondHeading="Select a category"
      />
      <div
        className="grid 
      grid-cols-1 
      md:grid-cols-2 
      gap-3 
      max-h-[50vh] 
      overflow-y-auto"
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryForm
              label={item.label}
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  // if (step === STEPS.LOCATION) {
  //   body = (
  //     <div className="flex flex-col gap-8">
  //       <RegistrationHeadig
  //         heading="What are the information that "
  //         secondHeading="Select the location"
  //       />
  //       <RegionSelect />
  //     </div>
  //   );
  // }

  if (step === STEPS.INFO) {
    body = (
      <div className="flex flex-col gap-8">
        <RegistrationHeadig
          heading="Share some basic your accomodation provides"
          secondHeading="What servces your accomodation has?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests?"
          value={guestCount}
          onChange={(value) => {
            setCustomValue("guestCount", value);
          }}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many Rooms are in your accomodation?"
          value={roomCount}
          onChange={(value) => {
            setCustomValue("roomCount", value);
          }}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many Bathrooms are in your accomodation?"
          value={bathroomCount}
          onChange={(value) => {
            setCustomValue("bathroomCount", value);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className="flex flex-col gap-8">
        <RegistrationHeadig
          heading="Describe your accomodation"
          secondHeading="keep it short and sweet"
        />
        <Form
          id="title"
          label="Title"
          type="text"
          disable={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Form
          id="descrition"
          label="Description"
          type="text"
          disable={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    body = (
      <div className="flex flex-col gap-8">
        <RegistrationHeadig
          heading="set the price of your accomodation"
          secondHeading="what is the price of your acconodation per night?"
        />
        <Form
          id="price"
          label="Price"
          formatPrice={true}
          type="number"
          disable={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Model
      isOpen={rentModel.isOpen}
      onClose={rentModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      primaryActionLable={CheckEndLsiting}
      secondaryActionLable={CheckStartLsiting}
      secondaryAction={step === STEPS.CATEGORY ? undefined : Back}
      title="List your property"
      body={body}
    />
  );
};

export default RentModel;
