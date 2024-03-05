import { Rate } from "antd";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ReviewStars {
  size: number;
}

const ReviewStar: React.FC<ReviewStars> = ({ size }) => {
  const stars = [
    ...Array(5).map((star) => {
      return <FaStar size={size} />;
    }),
  ];
  return (
    <div className="flex p-5 gap-5">
      <Rate
        style={{ display: "flex", gap: 5 }}
        allowHalf
        onChange={(value) => console.log(value)}
      />
    </div>
  );
};

export default ReviewStar;
