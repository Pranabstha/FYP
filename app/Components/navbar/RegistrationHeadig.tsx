"use client";

import React from "react";

interface registrationHeadigProps {
  heading: string;
  secondHeading: string | null;
  center?: boolean;
}

const RegistrationHeadig: React.FC<registrationHeadigProps> = ({
  heading,
  secondHeading,
  center,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{heading}</div>
      <div className="font-semibold text-neutral-600 mt-2">{secondHeading}</div>
    </div>
  );
};

export default RegistrationHeadig;
