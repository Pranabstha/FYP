// "use client" directive indicates that this component should be executed on the client side
"use client";

// Importing necessary dependencies
import React from "react";
import { IconType } from "react-icons";

// Defining the properties for the Button component
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType; // Alias for the icon prop
}

// Button component with various styling options
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon, // Alias for the icon prop
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      relative
      disabled
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      w-full
      ${outline ? "bg-white" : "bg-amber-500"}
      ${outline ? "border-black" : "bg-amber-500"}
      ${outline ? "text-black" : "text-white"}
      ${small ? "py-1" : "py-3"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {/* Render the Icon component if it is provided */}
      {Icon && (
        <Icon
          size={24}
          className="
          absolute
          left-4
          top-3
          "
        />
      )}
      {label}
    </button>
  );
};

// Exporting the Button component
export default Button;
