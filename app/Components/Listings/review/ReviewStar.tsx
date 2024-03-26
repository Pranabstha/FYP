import { Rate } from "antd";
import React from "react";

interface ReviewStars {
  size: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  defaultValue: number;
}

const ReviewStar: React.FC<ReviewStars> = ({ setRating, defaultValue }) => {
  return (
    <div className="flex p-5 gap-5">
      <Rate
        defaultValue={defaultValue}
        value={defaultValue}
        style={{ display: "flex", gap: 5, color: "#87CEEB" }}
        allowHalf
        onChange={(value) => setRating(value)}
      />
    </div>
  );
};

export default ReviewStar;
