import { Rate } from "antd";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface ReviewStars {
  size: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewStar: React.FC<ReviewStars> = ({ setRating }) => {
  return (
    <div className="flex p-5 gap-5">
      <Rate
        defaultValue={0}
        style={{ display: "flex", gap: 5, color: "#87CEEB" }}
        allowHalf
        onChange={(value) => setRating(value)}
      />
    </div>
  );
};

export default ReviewStar;
