'use client';
import React from "react";




// marking component as a cliet component to import the container in other components

// defines the structure of props that a React component can receive.
interface ContainerProps {
  children: React.ReactNode;
}
// component can accept a prop called children
// asigning propes to the Functional component
const Container: React.FC<ContainerProps> = ({ children}) => {
  return (
    <div
      className="max-w-[2520px] 
    mx-auto 
    xl:px-20
    md:px-10
    sm:px-2
    "
    >
      {children}
    </div>
  );
};

export default Container;
