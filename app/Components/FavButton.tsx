"use client";
import React from "react";
import client from "../Library/prismdb";
import { safeUser } from "../Types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface FavButtonProps {
  lisitngId: string;
  currentUser?: safeUser | null;
}

const FavButton: React.FC<FavButtonProps> = ({ lisitngId, currentUser }) => {
  const fav = false;
  const toggleFav = () => {};
  return (
    <div
      onClick={toggleFav}
      className="relative hover: opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white
            absolute
            -top-[2px]
            -right-[2px]
        "
      />
      <AiFillHeart
        size={22}
        className={fav ? "fill-rose-700" : "fill-neutral-700/70"}
      />
    </div>
  );
};

export default FavButton;
