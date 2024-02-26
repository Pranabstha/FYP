import React from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icons: IconType;
  label: string;
}
const ListingCategory: React.FC<ListingCategoryProps> = ({
  icons: Icon,
  label,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-500" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
