import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { BookingContext } from "../../context/bookingContext";

const BookingReviewForm = ({ setCount }) => {
  const [bookingInfo, setBookingInfo] = useContext(BookingContext);

  const handleSubmit = () => {
    console.log(bookingInfo);
  };

  return (
    <div className="poppins">
      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Property Address</p>
            <div>
              <h1 className="font-bold">{bookingInfo?.unit}</h1>
              <p className="text-gray-500 text-sm">{bookingInfo?.street}</p>
            </div>
          </div>
          <button className="text-cyan-500 font-bold">Edit </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Appointment Details</p>
            <div>
              <h1 className="font-bold">Test Date</h1>
              <p className="text-gray-500 text-sm">Mid-day</p>
            </div>
          </div>
          <button className="text-cyan-500 font-bold">Edit </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Contact Info</p>
            <div>
              <h1 className="font-bold">{`${bookingInfo?.firstName} ${bookingInfo.lastName}`}</h1>
              <p className="text-gray-500 text-sm">{bookingInfo?.phone}</p>
              <p className="text-gray-500 text-sm">{bookingInfo?.email}</p>
            </div>
          </div>
          <button className="text-cyan-500 font-bold">Edit </button>
        </div>
      </div>

      <div className="p-3 mt-5">
        <div className="w-full  flex justify-between">
          <h1>{bookingInfo?.pkg_name}</h1>
          <p>Php {bookingInfo?.price}</p>
        </div>
        <div className="w-full  flex justify-between  mt-3">
          <h1>Subtotal</h1>
          <p>{bookingInfo?.price}</p>
        </div>

        <div className="w-full  flex justify-between mt-2 p-3 border-t border-gray-300">
          <h1>Total </h1>
          <p className="font-bold">{bookingInfo?.price}</p>
        </div>
      </div>
      <button
        className=" text-xl mt-5 p-3 w-full border-2  text-white bg-cyan-500  font-bold rounded-sm shadow-md"
        onClick={handleSubmit}
      >
        CONFIRM BOOKING
      </button>
    </div>
  );
};

export default BookingReviewForm;
