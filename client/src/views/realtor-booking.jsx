import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/common/header";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ProcessDetails from "../components/common/process-details";
import BookingLocationForm from "../components/realtor-booking-layout/realtor-booking-location-form";
import { useState } from "react";
import BookingServiceForm from "../components/realtor-booking-layout/realtor-booking-service-form";
import BookingScheduleForm from "../components/realtor-booking-layout/realtor-booking-schedule-form";
import BookingContactForm from "../components/realtor-booking-layout/realtor-booking-contact-form";
import BookingReviewForm from "../components/realtor-booking-layout/realtor-booking-review-form";
import BookingSuccess from "../components/realtor-booking-layout/realtor-booking-success";

const RealtorBooking = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="poppins">
      <Header
        className={`flex items-center w-full text-center relative ${
          count > 5 ? "hidden" : ""
        }`}
      >
        <div className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </div>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">Booking</h1>
        </div>
      </Header>

      <div className={`w-full  ${count > 5 ? "" : "p-3"}`}>
        <ProcessDetails count={count} />

        {count == 1 ? (
          <BookingLocationForm setCount={setCount} />
        ) : count == 2 ? (
          <BookingServiceForm setCount={setCount} />
        ) : count == 3 ? (
          <BookingScheduleForm setCount={setCount} />
        ) : count == 4 ? (
          <BookingContactForm setCount={setCount} />
        ) : count == 5 ? (
          <BookingReviewForm setCount={setCount} />
        ) : count == 6 ? (
          <BookingSuccess />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RealtorBooking;
