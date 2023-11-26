"use client";

import React, { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModelProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  primaryActionLable: string;
  disable?: boolean;
  secondaryAction?: () => void;
  secondaryActionLable?: string;
}

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

  const handleClose = useCallback(() => {
    if (disable) {
      return;
    }
    setShowModel(false);
    setTimeout(() => {
      onClose();
    }, 300); //delating the function to set up animation
  }, [disable,onClose]);

  const handleSubmit = useCallback(() => {
    if (disable) {
      return;
    }
    onSubmit();
  }, [disable,onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disable || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disable, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
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
          {/* content */}
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
              {/* header */}
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
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* body */}
              <div className=" relative p-6 flex-auto">{body}</div>
              {/* footer */}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                  flex 
                  flex-row
                  items-center
                  gap-4
                  w-full
                "
                >
                  {secondaryAction && secondaryActionLable &&(
                  <Button
                    outline
                    disabled={disable}
                    label={secondaryActionLable}
                    onClick={handleSecondaryAction}
                  />
                  )}
                  <Button
                    disabled={disable}
                    label={primaryActionLable}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
