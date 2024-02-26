"use client";
import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalanderProps {
  value: Range;
  disableDate?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calander: React.FC<CalanderProps> = ({
  value,
  disableDate,
  onChange,
}) => {
  return (
    <DateRange
      rangeColors={["#ADD8E6"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disableDate}
    />
  );
};

export default Calander;
