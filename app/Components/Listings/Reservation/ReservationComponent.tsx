"use client";

import { Range } from "react-date-range";
import Calander from "../../Forms/Calander";
import Button from "../../Button";
import Counter from "../../Forms/Counter";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";

interface ReservationComponentProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disable?: boolean;
  disableDate: Date[];
  setGuestCount: React.Dispatch<React.SetStateAction<number>>;
  setRoomCount: React.Dispatch<React.SetStateAction<number>>;
  maxRoomCount: number;
  maxGuestCount: number;
}
const ReservationComponent: React.FC<ReservationComponentProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disable,
  disableDate,
  setRoomCount,
  setGuestCount,
  maxRoomCount,
  maxGuestCount,
}) => {
  const { setValue, watch, reset } = useForm<FieldValues>({
    defaultValues: {
      guestCount: 1,
      roomCount: 1,
    },
  });

  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");

  useEffect(() => {
    setGuestCount(guestCount);
    setRoomCount(roomCount);
  }, [guestCount, setGuestCount, setRoomCount, roomCount]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div
      className="
    bg-white
    rounded-xl
    border-[1px]
    border-neutral-200
    overflow-hidden
  "
    >
      <div
        className="flex
      flex-row
      items-center
      justi
      gap-1
      p-4
      "
      >
        <div className="text-2xl font-semibold">Rs{price}</div>
        <div className="font-light text-neutral-500"> per Person</div>
      </div>
      <hr />
      <div className="items-center justify-center">
        <Calander
          value={dateRange}
          disableDate={disableDate}
          // onChange={(value) => console.log(value)}
          onChange={(value) => onChangeDate(value.selection)}
        />
      </div>
      <hr />
      <div className="p-4 gap-2 flex flex-col">
        <div>
          <Counter
            title="Guests"
            subtitle="Number of guests"
            value={guestCount}
            onChange={(value) => {
              setCustomValue("guestCount", value);
            }}
            maxValue={maxGuestCount}
          />
        </div>
        <hr />
        <div>
          <Counter
            title="Rooms"
            subtitle="Select the number of rooms"
            value={roomCount}
            onChange={(value) => {
              setCustomValue("roomCount", value);
            }}
            maxValue={maxRoomCount}
          />
        </div>
      </div>
      <hr />
      <div className="p-4">
        <Button label="Reserve" onClick={onSubmit} disabled={disable} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>Rs{totalPrice * guestCount}</div>
      </div>
    </div>
  );
};

export default ReservationComponent;
