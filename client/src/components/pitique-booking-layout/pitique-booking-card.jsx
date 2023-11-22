import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const PitiqueBookingCard = () => {
  return (
    <div className="rounded-md flex flex-col  bg-gray-100 poppins shadow-md p-2 text-sm">
      <div className="flex w-full  justify-end px-3">
        <p className="font-bold text-green-400">Completed</p>
      </div>
      <div className="flex justify-between px-3 items-center  p-1 border-b border-gray-300">
        <div className="flex gap-2 items-center">
          <img
            className="w-8 h-8 rounded-full "
            src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
          />
          <h1 className="text-xs font-bold">James Reid</h1>
        </div>

        <div className="flex flex-col gap-2 justify-end items-end">
          <p className="text-xs"> Morning, May 3, 2023</p>
        </div>
      </div>

      <div className="flex justify-between items-center px-3 ">
        <div className="flex gap-3 items-center p-2">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-red-500 w-4 h-4"
          />
          <h1 className="text-xs ">Cebu City</h1>
        </div>
        <h1 className="text-xs">
          Starts at <span className="font-bold">Php 18,000</span>
        </h1>
      </div>

      <div className="px-1 border-t border-gray-300 p-2">
        <p className="text-xs">
          Client asked for: <b>Aerial Photography, Aerial Videography </b>
        </p>
      </div>
    </div>
  );
};

export default PitiqueBookingCard;
