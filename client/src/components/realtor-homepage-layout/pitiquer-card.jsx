import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const PitiquerCard = ({ pitiquer }) => {
  return (
    <Link
      to={{ pathname: "/booking", state: pitiquer.id }}
      state={{ id: pitiquer.id }}
      className=" h-[250px] w-[95%] rounded-md flex flex-col poppins p-3 bg-gray-100 shadow-md m-2"
    >
      <img
        className="h-[70%]  w-full rounded-md"
        src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className="flex justify-between p-1 border-b border-gray-300">
        <div className="flex gap-2 items-center">
          <img
            className="w-8 h-8 rounded-full "
            src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
          />
          <h1 className="text-sm font-bold">
            {`${pitiquer?.fname} ${pitiquer?.lname}`}
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <h1 className="font-bold text-sm">4.8</h1>
        </div>
      </div>

      <div className="flex justify-between items-center ">
        <div className="flex gap-3 items-center p-2">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="text-red-500 w-5 h-5"
          />
          <h1 className="text-sm ">{`${pitiquer?.city}, ${pitiquer?.province}`}</h1>
        </div>
        <h1 className="text-sm">
          Starts at{" "}
          <span className="font-bold">{`Php ${pitiquer.min_price.toFixed(
            2
          )}`}</span>
        </h1>
      </div>
    </Link>
  );
};

export default PitiquerCard;
