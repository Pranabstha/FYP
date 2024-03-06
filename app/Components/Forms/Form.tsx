import React, { ChangeEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiRupee } from "react-icons/bi";

// Define the props interface for the Form component
interface FormProps {
  id: string;
  label: string;
  type: string;
  disable: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>; // React Hook Form register function
  errors: FieldErrors; // Object containing validation errors
  pattern?: {
    value: RegExp;
  };
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // Add onChange event
}

// Form component is a functional component that takes in FormProps as its props
const Form: React.FC<FormProps> = ({
  id,
  label,
  type,
  disable,
  formatPrice,
  required,
  register,
  errors,
  pattern,
  onChange, // Destructure onChange from props
}) => {
  return (
    <div className="w-full relative">
      {/* Display currency icon if formatPrice prop is provided */}
      {formatPrice && (
        <BiRupee size={24} className="text-neutral-700 absolute top-5 left-2" />
      )}
      {/* Input field with dynamic styling based on various conditions */}
      <input
        min="1"
        id={id}
        disabled={disable}
        {...register(id, {
          required,
          ...(pattern && { pattern: pattern.value }),
        })}
        onChange={onChange} // Include onChange event handler directly
        placeholder=" "
        type={type}
        className={`
        peer
        w-full
        p-4
        pt-6
        font-light
        bg-white
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-red-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-red-500" : "focus:border-black"}
        `}
      />

      {/* Floating label that animates based on input state */}
      <label
        className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-red-500" : "text-zinc-400"}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Form;
