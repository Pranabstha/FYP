// Import necessary modules and components
"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

// Declare global variable for TypeScript
declare global {
  var cloudinary: any;
}

// Define props for the UploadImage component
interface UploadImageProps {
  onChange: (value: string) => void;
  value: string;
}

// UploadImage component
const UploadImage: React.FC<UploadImageProps> = ({ onChange, value }) => {
  // Callback function to handle image upload
  const handleUpload = useCallback(
    (result: any) => {
      // Update parent component with the secure URL of the uploaded image
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      {/* Cloudinary Upload Widget */}
      <CldUploadWidget
        onUpload={handleUpload}
        // created a new preset in cloudinary
        uploadPreset="wcpekheo"
        options={{
          maxFiles: 5, // Set the maximum number of files that can be uploaded
        }}
      >
        {(props: any) => {
          // Destructure the 'props' object, and get the 'open' function.
          // The 'props' object is passed as an argument to the function component.
          // We use destructuring to extract the 'open' function from 'props'.
          // The '|| {}' is used as a fallback in case 'props' is undefined or null,
          // ensuring that 'open' is assigned an empty object if 'props' is falsy.
          // Ensure that 'props' is not falsy before destructuring
          const { open } = props || {};

          return (
            // Clickable container for triggering the file upload dialog
            <div
              onClick={() => open?.()}
              className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed 
                border-2 
                p-20 
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600
              "
            >
              {/* Icon for indicating image upload */}
              <TbPhotoPlus size={50} />
              {/* Text prompting the user to click to upload */}
              <div className="font-semibold text-lg">Click to upload</div>
              {/* Display the uploaded image if available */}
              {value && (
                <div className="absolute inset-0 w-full h-full">
                  {/* Display the uploaded image using the Next.js Image component */}
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src={value}
                    alt="House"
                  />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
