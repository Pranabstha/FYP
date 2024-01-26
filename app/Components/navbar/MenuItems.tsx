"use client";

import React from "react";

// defines the structure of props that a React component can receive.
interface MenuItemsProps {
  onClick: () => void;
  label: string;
}
const MenuItem: React.FC<MenuItemsProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
    "
    >
      {label}
    </div>
  );
};

export default MenuItem;
