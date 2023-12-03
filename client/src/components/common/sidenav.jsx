import {
  faBell,
  faCalendar,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = ({ setShowNav }) => {
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

            <li className="flex gap-2 items-center font-semibold -ml-3">
              <span className="p-2.5 relative ">
                <FontAwesomeIcon icon={faBell} className="" />

                <span className="w-5 h-5 rounded-full bg-red-500 text-white font-bold flex justify-center items-center text-xs absolute top-0 right-0">
                  2
                </span>
              </span>

              <a>Notification </a>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faRightFromBracket} />

              <a>Logout </a>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
