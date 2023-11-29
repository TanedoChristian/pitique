import {
  faBell,
  faCalendar,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

const SideNav = ({ setShowNav }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`w-full h-screen fixed flex  backdrop-blur-[1px] poppins `}>
      <div className="w-[200px] h-full  bg-cyan-500 text-white border-r border-gray-200">
        <div className="flex justify-end w-full">
          <button
            className="text-white font-black text-2xl right-2 top-2 p-2 "
            onClick={() => {
              setShowNav(false);
            }}
          >
            X
          </button>
        </div>

        <div className=" w-full h-screen flex flex-col gap-3 p-3 justify-between mt-10">
          <div className="flex flex-col gap-10">
            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faUser} />
              <Link to={"/profile/realtor"}>Account Settings </Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faCalendar} />
              <Link to={"/transaction"}>My Bookings</Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faBell} />
              <Link to={"/r/notification"}>Notification</Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <button onClick={handleLogout}>Logout </button>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
