"use client";
import React from "react";
import { safeUser } from "../Types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import usefav from "../hooks/favHooks";

interface FavButtonProps {
  listingId: string;
  currentUser?: safeUser | null;
}

const FavButton: React.FC<FavButtonProps> = ({ listingId, currentUser }) => {
  const { hasFav, toggleFav } = usefav({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFav}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={hasFav ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default FavButton;
