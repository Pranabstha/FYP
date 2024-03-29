"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  maxValue?: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
  maxValue,
}) => {
  const addition = useCallback(() => {
    if (value !== maxValue) {
      onChange(value + 1);
    } else {
      toast.error("You have exicided the Limit");
    }
  }, [onChange, value]);

  const substration = useCallback(() => {
    if (value == 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-grey-500">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={substration}
          className=" w-10
        h-10
        rounded-full
        border-[1px]
        border-nutral-400
        flex
        items-center
        justify-center
        text-neutral-600
        cursor-pointer
        hover:opacity-80
        transition
        "
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-500">{value}</div>
        <div
          onClick={addition}
          className=" w-10
        h-10
        rounded-full
        border-[1px]
        border-nutral-400
        flex
        items-center
        justify-center
        text-neutral-600
        cursor-pointer
        hover:opacity-80
        transition
        "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
