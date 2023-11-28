import Header from "../common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import RealtorTransactionPending from "./realtor-transaction-pending";
import { useEffect, useState } from "react";
import api from "../../helper/api";
import RealtorTransactionCompeleted from "./realtor-transaction-completed";
import RealtorTransactionHistory from "./realtor-transaction-history";
import { Link } from "react-router-dom";
import RealtorTransactionPayment from "./realtor-transaction-payment";
import RealtorTransactionIncoming from "./realtor-transaction-incoming";

const RealtorHistoryLayout = () => {
  const [bookings, setBookings] = useState([]);
  const [flag, setFlag] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  if (user === undefined) {
    window.location.href = "/login";
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/bookings/realtor/${user.id}`);

        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings" + error);
      }
    };

    fetch();
  }, [flag]);
  return (
    <div>
      <Header className={`flex items-center w-full text-center relative`}>
        <Link to={"/dashboard"} className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </Link>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">
            Transaction History
          </h1>
        </div>
      </Header>

      <div className="p-3">
        <RealtorTransactionPayment
          data={bookings.filter((booking) => booking.status === "payment")}
          refresh={{ setFlag, flag }}
        />
        <div className="mb-5"></div>
        <RealtorTransactionIncoming
          data={bookings.filter((booking) => booking.status === "accepted")}
          refresh={{ setFlag, flag }}
        />
        <div className="mb-5"></div>
        <RealtorTransactionPending
          data={bookings.filter((booking) => booking.status === "pending")}
          refresh={{ setFlag, flag }}
        />
        <div className="mb-5"></div>
        <RealtorTransactionCompeleted
          data={bookings.filter((booking) => booking.status === "completed")}
        />
        <div className="mb-5"></div>
        <RealtorTransactionHistory
          data={bookings.filter(
            (booking) =>
              booking.status !== "pending" &&
              booking.status !== "completed" &&
              booking.status !== "payment" &&
              booking.status !== "accepted"
          )}
          refresh={{ setFlag, flag }}
        />
      </div>
    </div>
  );
};

export default RealtorHistoryLayout;
