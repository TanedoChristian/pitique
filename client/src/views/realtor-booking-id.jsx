import { Link, useParams } from "react-router-dom";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "../helper/api";
import RealtorRatingLayout from "../components/realtor-rating-layout/layout";

const RealtorBookingId = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/bookings/${id}`);

        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking", error);
      }
    };

    fetch();
  }, [flag]);

  useEffect(() => {
    if (booking.rltr_id === undefined) return;
    const fetch = async () => {
      try {
        const { data } = await api.get(
          `/realtor-feedbacks/${booking.rltr_id}/booking/${booking.id}`
        );

        if (data) {
          setShowFeedback(false);
        }
      } catch (error) {
        // If rating not found

        setShowFeedback(true);
      }
    };

    fetch();
  }, [booking]);

  const handleCancel = async () => {
    try {
      const { data } = await api.put(`/bookings/cancel/${id}`);

      if (data) {
        setFlag(!flag);
      }
    } catch (error) {
      console.error("Error completing booking" + error);
    }
  };

  if (!user || booking.rltr_id !== user.id) {
    return <div className="p-4">Forbidden Page.</div>;
  }
  return (
    <div>
      <Header className={`flex items-center w-full text-center relative`}>
        <Link to="/transaction" className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </Link>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">{`Booking ${id}`}</h1>
          <div className="flex justify-center items-center mt-1">
            <p className=" bg-orange-400 text-white px-3  py-0 rounded-full text-sm">
              {booking.status}
            </p>
          </div>
        </div>
      </Header>

      <div className="poppins p-2">
        <div className="border border-gray-300 shadow-md ">
          <div className="flex  justify-between">
            <div className="flex flex-col gap-1 p-3">
              <p className="text-gray-500 text-sm">Property Address</p>
              <div>
                <h1 className="font-bold">
                  {booking.unit_no} {booking.street}
                </h1>
                <p className="text-gray-500 text-sm">
                  {booking.city}, {booking.province} {booking.postal}
                </p>
              </div>
            </div>
            {booking.status === "pending" ||
              (booking.status === "paid" && (
                <button className="text-cyan-500 font-bold">Edit </button>
              ))}
          </div>
        </div>

        <div className="border border-gray-300 shadow-md p-3 mt-1">
          <div className="flex  justify-between p-2">
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm">Appointment Details</p>
              <div>
                <h1 className="font-bold">
                  {new Date(booking.date).toLocaleString("en-us", {
                    weekday: "long",
                  })}{" "}
                  -{" "}
                  {new Date(booking.date).toLocaleString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h1>
                <p className="text-gray-500 text-sm">{booking.day}</p>
              </div>
            </div>
            {booking.status === "pending" ||
              (booking.status === "paid" && (
                <button className="text-cyan-500 font-bold">Edit </button>
              ))}
          </div>
        </div>

        <div className="border border-gray-300 shadow-md p-3 mt-1">
          <div className="flex  justify-between p-2">
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm">Contact Info</p>
              <div>
                <h1 className="font-bold">
                  {booking.fname} {booking.lname}
                </h1>
                <p className="text-gray-500 text-sm">
                  {booking.phone ?? "No Phone"}
                </p>
                <p className="text-gray-500 text-sm">{booking.email}</p>
              </div>
            </div>
            {booking.status === "pending" ||
              (booking.status === "paid" && (
                <button className="text-cyan-500 font-bold">Edit </button>
              ))}
          </div>
        </div>

        <div className="p-3 mt-5">
          <div className="w-full  flex justify-between">
            <h1>{booking.pkg_desc}</h1>
            <p>Php {booking.fee}</p>
          </div>
          <div className="w-full  flex justify-between  mt-3">
            <h1>Subtotal</h1>
            <p>Php {booking.total}</p>
          </div>

          <div className="w-full  flex justify-between mt-2 p-3 border-t border-gray-300">
            <h1>Total </h1>
            <p className="font-bold">Php {booking.total}</p>
          </div>
        </div>

        {booking.status === "accepted" ||
          (booking.status === "pending" && (
            <div className="w-full">
              <button
                onClick={handleCancel}
                className=" text-xl mt-5 p-3 w-full border-2  text-white bg-red-600   font-bold rounded-md shadow-md"
              >
                CANCEL BOOKING
              </button>
            </div>
          ))}

        {booking.status === "payment" && (
          <div className="w-full">
            <Link to={{ pathname: "/payment" }} state={booking}>
              <div className=" text-xl mt-5 p-3 w-full border-2  text-white bg-green-500   font-bold rounded-md shadow-md text-center">
                PAY
              </div>
            </Link>
            <button
              onClick={handleCancel}
              className=" text-xl mt-5 p-3 w-full border-2  text-white bg-red-600   font-bold rounded-md shadow-md"
            >
              CANCEL BOOKING
            </button>
          </div>
        )}

        {booking.status === "completed" && showFeedback && (
          <div className="w-full">
            <button
              onClick={() => setShow(true)}
              className=" text-xl mt-5 p-3 w-full border-2  text-white bg-cyan-500   font-bold rounded-md shadow-md"
            >
              ADD FEEDBACK
            </button>
          </div>
        )}

        {show && (
          <RealtorRatingLayout
            setShow={setShow}
            booking={booking}
            refresh={{ setFlag, flag }}
          />
        )}
      </div>
    </div>
  );
};

export default RealtorBookingId;
