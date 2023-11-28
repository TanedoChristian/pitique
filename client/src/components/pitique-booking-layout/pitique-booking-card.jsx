import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PitiqueBookingCard = ({ booking }) => {
  return (
    <Link
      to={`/booking/pitique/${booking.id}`}
      className="rounded-md flex flex-col  bg-gray-100 poppins shadow-md p-2 text-sm"
    >
      <div className="flex w-full  justify-end px-3">
        <p className="font-bold text-green-400">{booking.status}</p>
      </div>
      <div className="flex justify-between px-3 items-center  p-1 border-b border-gray-300">
        <div className="flex gap-2 items-center">
          <img
            className="w-8 h-8 rounded-full "
            src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
          />
          <h1 className="text-xs font-bold">
            {booking.fname} {booking.lname}
          </h1>
        </div>

        <div className="flex flex-col gap-2 justify-end items-end">
          <p className="text-xs">
            {" "}
            Morning,{" "}
            {new Date(booking.date).toLocaleString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center px-3 ">
        <div className="flex gap-3 items-center p-2">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-red-500 w-4 h-4"
          />
          <h1 className="text-xs ">
            {booking.unit_no} {booking.street} {booking.city},{" "}
            {booking.province} {booking.postal}
          </h1>
        </div>
        <h1 className="text-xs">
          Starts at <span className="font-bold">Php {booking.total}</span>
        </h1>
      </div>

      <div className="px-1 border-t border-gray-300 p-2">
        <p className="text-xs">
          Client asked for: <b>{booking.pkg_desc} </b>
        </p>
      </div>
    </Link>
  );
};

export default PitiqueBookingCard;
