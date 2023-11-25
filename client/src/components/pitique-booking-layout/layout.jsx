import Header from "../common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import PitiqueBookingCard from "./pitique-booking-card";
import { useEffect, useState } from "react";
import api from "../../helper/api";

const PitiqueBookingLayout = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      // CHANGE The 1 to current user
      try {
        const { data } = await api.get("/bookings/pitiquer/1");

        setBookings(data);
      } catch (error) {
        alert("No bookings found");
        console.error(error);
      }
    };

    fetch();
  }, []);
  return (
    <div>
      <Header className="flex items-center p-5 gap-5">
        <FontAwesomeIcon icon={faBars} />
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
        {bookings.length !== 0 &&
          bookings.map((booking) => <PitiqueBookingCard booking={booking} />)}
      </div>
    </div>
  );
};

export default PitiqueBookingLayout;
