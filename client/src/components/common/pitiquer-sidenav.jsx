import {
  faBell,
  faCalendar,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PitiquerSideNav = ({ setShowNav }) => {
  return (
    <div
      className={`w-full h-screen fixed flex  backdrop-blur-[1px] poppins z-10`}
    >
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
              <a href={`/profile/pitique/${sampleidhere}`}>Account Settings </a>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faUser} />
              <a href="/booking/pitique">My Bookings </a>
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

export default PitiquerSideNav;
