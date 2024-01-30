"use client";

import { useRouter } from "next/navigation";
import React from "react";
import RegistrationHeadig from "./navbar/RegistrationHeadig";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No match found",
  subtitle = "Try changing applied filter",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div
      className="
   h-[60vh]
   flex
   flex-col
   gap-2 
   justify-center
   items-center
   "
    >
      <RegistrationHeadig heading={title} secondHeading={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Reset applied filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
