import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const BookingScheduleForm = ({ setCount }) => {
  const [value, setValue] = useState(dayjs());

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full p-3">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar"]}>
          <DemoItem label="">
            <DateCalendar
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

      <div>
        <h1 className="font-bold">{formattedDate}</h1>

        <form
          className="flex flex-col gap-3 p-3 justify-between h-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="bg-gray-200 shadow-md">
            <input className="hidden" id="radio_1" type="radio" name="radio" />
            <label
              className="flex flex-col p-2 border-2  cursor-pointer"
              htmlFor="radio_1"
            >
              <h1 className="text-md ">Morning</h1>
            </label>
          </div>
          <div className="bg-gray-200 shadow-md">
            <input className="hidden" id="radio_2" type="radio" name="radio" />
            <label
              className="flex flex-col p-2 border-2  cursor-pointer"
              htmlFor="radio_2"
            >
              <h1 className="text-md ">Mid Day</h1>
            </label>
          </div>

          <div className="bg-gray-200 shadow-md">
            <input className="hidden" id="radio_3" type="radio" name="radio" />
            <label
              className="flex flex-col p-2 border-2  cursor-pointer"
              htmlFor="radio_3"
            >
              <h1 className="text-md ">Afternoon</h1>
            </label>
          </div>
          <div>
            <button
              className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md"
              onClick={() => {
                setCount((prev) => prev + 1);
              }}
            >
              NEXT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingScheduleForm;
