import Header from "../common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import PitiqueBookingCard from "./pitique-booking-card";
import { useEffect, useState } from "react";
import api from "../../helper/api";
import PitiquerSideNav from "../common/pitiquer-sidenav";

const PitiqueBookingLayout = () => {
  const [bookings, setBookings] = useState([]);
  const [showSideNav, setShowNav] = useState(false);

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
      {showSideNav ? <PitiquerSideNav setShowNav={setShowNav} /> : ""}
      <Header className="flex items-center p-5 gap-5">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </Header>

      <div className="w-full p-3">
        {bookings.length !== 0 &&
          bookings.map((booking) => (
            <PitiqueBookingCard booking={booking} key={booking.id} />
          ))}
      </div>
    </div>
  );
};

export default PitiqueBookingLayout;
