import Header from "../common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import PitiqueBookingCard from "./pitique-booking-card";
import { useState } from "react";
import SideNav from "../common/sidenav";

const PitiqueBookingLayout = () => {
  const [showSideNav, setShowNav] = useState(false);
  return (
    <div>
      {showSideNav ? <SideNav setShowNav={setShowNav} /> : ""}
      <Header className="flex items-center p-5 gap-5">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <input
          type="text"
          name=""
          id=""
          className="w-[80%] bg-cyan-500 border-b border-white placeholder-white outline-none"
          placeholder="Search Pitiquer's"
        />
        <FontAwesomeIcon icon={faSearch} />
      </Header>

      <div className="w-full p-3">
        <PitiqueBookingCard />
      </div>
    </div>
  );
};

export default PitiqueBookingLayout;
