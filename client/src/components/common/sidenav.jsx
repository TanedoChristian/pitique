import {
  faBell,
  faBook,
  faCalendar,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../helper/api";

const SideNav = ({ setShowNav }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifCount, setNotifCount] = useState(0);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(
          `notifications/count/realtor/${user.id}`
        );

        setNotifCount(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

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

            <li className="flex gap-2 -mb-2.5 items-center font-semibold">
              <FontAwesomeIcon icon={faCalendar} />
              <Link to={"/transaction"}>My Bookings</Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <span className="py-2.5 relative ">
                <FontAwesomeIcon icon={faBell} className="" />

                <span className="w-5 h-5 rounded-full bg-red-500 text-white font-bold flex justify-center items-center text-xs absolute top-0 right-0">
                  {notifCount.notif}
                </span>
              </span>
              <Link to={"/r/notification"}>Notification</Link>
            </li>
            <li className="flex gap-2 -mt-3.5 items-center font-semibold">
              <FontAwesomeIcon icon={faBook} />
              <Link to={"/report/realtor"}>Expense Report</Link>
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
