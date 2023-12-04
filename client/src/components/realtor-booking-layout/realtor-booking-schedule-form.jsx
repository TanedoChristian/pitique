import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { BookingContext } from "../../context/bookingContext";

const BookingScheduleForm = ({ setCount }) => {
  const [value, setValue] = useState(dayjs());

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [bookingInfo, setBookingInfo] = useContext(BookingContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setCount((prev) => prev + 1);
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;

    // Convert time to 12-hour format with AM/PM
    const formattedTime = dayjs(selectedTime, "HH:mm").format("h:mm A");

    setBookingInfo((prev) => ({
      ...prev,
      day: formattedTime,
    }));
  };

  return (
    <div className="w-full p-3">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar"]}>
          <DemoItem label="">
            <DateCalendar
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                setBookingInfo((prev) => ({
                  ...prev,
                  date: newValue ? newValue.$d : null,
                }));
              }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

      <div>
        <h1 className="font-bold">{formattedDate}</h1>

        <form
          className="flex flex-col gap-3 p-3 justify-between h-full"
          onSubmit={handleSubmit}
        >
          <div className="bg-gray-200 shadow-md">
            <div className="bg-gray-200 shadow-md">
              <label
                htmlFor="timeInput"
                className="flex flex-col p-2 border-2 cursor-pointer"
              >
                <h1 className="text-md">Select Time:</h1>
                <input
                  id="timeInput"
                  type="time"
                  onChange={handleTimeChange}
                  required
                />
              </label>
            </div>
          </div>
          <div>
            <button
              className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md"
              onClick={handleSubmit}
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
