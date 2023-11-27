import Header from "../common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import RealtorTransactionPending from "./realtor-transaction-pending";
import { useEffect, useState } from "react";
import api from "../../helper/api";
import RealtorTransactionCompeleted from "./realtor-transaction-completed";
import RealtorTransactionHistory from "./realtor-transaction-history";

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
        <div className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </div>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">
            Transaction History
          </h1>
        </div>
      </Header>

      <div className="p-3">
        <RealtorTransactionPending
          data={bookings.filter((booking) => booking.status === "pending")}
          refresh={{ setFlag, flag }}
        />
        <RealtorTransactionCompeleted
          data={bookings.filter((booking) => booking.status === "completed")}
        />

        <RealtorTransactionHistory
          data={bookings.filter(
            (booking) =>
              booking.status !== "pending" &&
              booking.status !== "completed" &&
              booking.status !== "payment"
          )}
          refresh={{ setFlag, flag }}
        />
      </div>
    </div>
  );
};

export default RealtorHistoryLayout;
