"use client";

import { IconType } from "react-icons";

interface CategoryFormProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-amber-400
        transition 
        cursor-pointer
        ${selected ? " border-amber-600" : "border-neutral-200"}
        `}
    >
      <Icon size={26} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryForm;
