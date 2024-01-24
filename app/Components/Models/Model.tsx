// "use client" directive indicates that this component should be executed on the client side
"use client";
// Importing necessary dependencies
import React, { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

// Defining the properties for the Model component
interface ModelProps {
  isOpen?: boolean; // Flag to determine whether the modal is open or closed
  onClose: () => void; // Callback function to handle closing the modal
  onSubmit: () => void; // Callback function to handle form submission
  title?: string; // Title for the modal
  body?: React.ReactElement; // JSX element for the main content of the modal
  footer?: React.ReactElement; // JSX element for the footer content of the modal
  primaryActionLable: string; // Label for the primary action button
  disable?: boolean; // Flag to disable interaction with the modal
  secondaryAction?: () => void; // Callback function for secondary action button
  secondaryActionLable?: string; // Label for the secondary action button
}

// Model component for displaying a modal
const Model: React.FC<ModelProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  primaryActionLable,
  disable,
  secondaryAction,
  secondaryActionLable,
}) => {
  const [showModel, setShowModel] = useState(isOpen);

  useEffect(() => {
    setShowModel(isOpen);
  }, [isOpen]);

  // Callback to handle closing the modal
  const handleClose = useCallback(() => {
    if (disable) {
      return;
    }
    setShowModel(false);
    setTimeout(() => {
      onClose();
    }, 300); // Delaying the function to set up animation
  }, [disable, onClose]);

  // Callback to handle form submission
  const handleSubmit = useCallback(() => {
    if (disable) {
      return;
    }
    onSubmit();
  }, [disable, onSubmit]);

  // Callback to handle secondary action (if provided)
  const handleSecondaryAction = useCallback(() => {
    if (disable || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disable, secondaryAction]);

  // If the modal is not open, return null
  if (!isOpen) {
    return null;
  }

  // JSX structure for the modal
  return (
    <>
      {/* Modal overlay */}
      <div
        className="
      justify-center
      items-center
      flex
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-neutral-800/80
      "
      >
        {/* Modal container */}
        <div
          className="
          relative
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
        "
        >
          {/* Content */}
          <div
            className={`
              translate
              duration-300
              h-full
              ${showModel ? "translate-y-0" : "translate-y-full"}
              ${showModel ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              "
            >
              {/* Header */}
              <div
                className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
              "
              >
                {/* Close button */}
                <button
                  className="
                p-1
                border-0
                hover:opacity-70
                transition
                absolute
                left-9
                "
                  onClick={handleClose}
                >
                  <IoMdClose size={15} />
                </button>
                {/* Title */}
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* Body */}
              <div className=" relative p-6 flex-auto">{body}</div>
              {/* Footer */}
              <div className="flex flex-col gap-2 p-6">
                {/* Action buttons */}
                <div
                  className="
                  flex 
                  flex-row
                  items-center
                  gap-4
                  w-full
                "
                >
                  {/* Render secondary action button if provided */}
                  {secondaryAction && secondaryActionLable && (
                    <Button
                      outline
                      disabled={disable}
                      label={secondaryActionLable}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  {/* Primary action button */}
                  <Button
                    disabled={disable}
                    label={primaryActionLable}
                    onClick={handleSubmit}
                  />
                </div>
                {/* Custom footer content */}
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Exporting the Model component
export default Model;
