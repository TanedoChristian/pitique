import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { BookingContext } from "../../context/bookingContext";
import api from "../../helper/api";
import { showSuccessMessage } from "../../helper/messageHelper";
import { useNavigate } from "react-router-dom";

const BookingReviewForm = ({ setCount }) => {
  const [bookingInfo, setBookingInfo] = useContext(BookingContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleSubmit = async () => {
    // console.log(bookingInfo);

    const { data } = await api.post("/bookings/request", bookingInfo);

    if (data) {
      showSuccessMessage("Success", "Book successfully!");
      navigate(`/transaction`);
    }
  };

  return (
    <div className="poppins">
      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Property Address</p>
            <div className="flex items-center gap-2">
              <h1 className="font-bold capitalize">{bookingInfo?.unit_no}</h1>
              <p className="font-bold capitalize">{bookingInfo?.street}</p>
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <h1>{bookingInfo?.city}</h1> <p>, {bookingInfo?.province}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Appointment Details</p>
            <div>
              <h1 className="font-bold">
                {new Date(bookingInfo.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h1>
              <p className="text-gray-500 text-sm">{bookingInfo.day}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Contact Info</p>
            <div>
              <h1 className="font-bold capitalize">{`${user?.fname} ${user.lname}`}</h1>
              <p className="text-gray-500 text-sm">{user?.phone}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 mt-5">
        <div className="w-full  flex justify-between">
          <h1>{bookingInfo?.pkg_name}</h1>
          <p>Php {Number(bookingInfo?.price).toFixed(2)}</p>
        </div>
        <div className="w-full  flex justify-between  mt-3">
          <h1>Subtotal</h1>
          <p>{Number(bookingInfo?.price).toFixed(2)}</p>
        </div>

        <div className="w-full  flex justify-between mt-2 p-3 border-t border-gray-300">
          <h1>Total </h1>
          <p className="font-bold">{Number(bookingInfo?.price).toFixed(2)}</p>
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
