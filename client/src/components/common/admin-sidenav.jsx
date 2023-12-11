import {
  faBell,
  faCalendar,
  faRightFromBracket,
  faUser,
  faCog,
  faGauge,
  faBook,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const AdminSideNav = ({ setShowNav }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div
      className={`w-full h-screen fixed flex  backdrop-blur-[1px] poppins z-10`}
    >
      <div className="w-[200px] h-full  bg-cyan-500 text-white border-r border-gray-200">
        <div className="flex justify-end w-full py-4 ">
          <div className="flex gap-3 items-center p-3">
            <img src={logo} className="w-[20%]" />
            <h1 className="text-xl">Pitique</h1>
          </div>
          <button
            className="text-white font-black text-2xl right-2 top-2 px-4 "
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
              <FontAwesomeIcon icon={faGauge} />
              <Link to="/admin">Dashboard </Link>
            </li>
            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faUser} />
              <Link to="/admin/create-account">Create Account </Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faUser} />
              <Link to="/admin/manage-pitiquer">Manage Pitiquer </Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faUser} />
              <Link to="/admin/manage-realtor">Manage Realtor </Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faBook} />
              <Link to="/admin/manage-reviews">Manage Reviews </Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faCalendar} />
              <Link to="/admin/bookings/all">All Bookings </Link>
            </li>

            <li className="flex gap-2 items-center font-semibold text-sm">
              <FontAwesomeIcon icon={faUser} />
              <Link to="/admin/manage-transaction-reports">
                Transaction Reports{" "}
              </Link>
            </li>

            <li className="flex gap-2 items-center font-semibold">
              <FontAwesomeIcon icon={faMoneyBill} />
              <Link to={`/admin/commissions`}>View Commissions</Link>
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

export default AdminSideNav;
