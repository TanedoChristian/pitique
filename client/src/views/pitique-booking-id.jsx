import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "../helper/api";
import PitiquerRatingLayout from "../components/pitiquer-rating-layout/layout";
import { showSuccessMessage } from "../helper/messageHelper";
import DeclineForm from "../components/pitiquer-rating-layout/decline-form";
import ReportForm from "../components/pitiquer-rating-layout/report-form";

const PitiqueBookingId = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [flag, setFlag] = useState(false);
  const [show, setShow] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const [newDate, setNewDate] = useState();

  const [decline, setDecline] = useState({
    show: false,
    description: "",
  });

  const [report, setReport] = useState({
    show: false,
    description: "",
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("p-user"));

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
    if (booking.ptqr_id === undefined) return;
    const fetch = async () => {
      try {
        const { data } = await api.get(
          `/pitiquer-feedbacks/${booking.ptqr_id}/booking/${booking.id}`
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

  const handleDecline = async () => {
    try {
      const { data } = await api.put(`/bookings/decline/${id}`, {
        msg: decline.description,
      });

      if (data) {
        setFlag(!flag);
        setDecline({ show: false, description: "" });
        showSuccessMessage("Success", "Successfully declined the booking!");
      }
    } catch (error) {
      console.error("Error declining booking" + error);
    }
  };

  const handleReport = async () => {
    try {
      const info = {
        msg: report.description,
        id: booking.ptqr_id,
        user_type: "pitiquer",
      };

      const { data } = await api.post(`/reports`, { info });

      if (data) {
        setFlag(!flag);
        setReport({ show: false, description: "" });
        showSuccessMessage("Success", "Successfully report the transacting!");
      }
    } catch (error) {
      console.error("Error report transaction" + error);
    }
  };

  const handleConfirm = async () => {
    try {
      const { data } = await api.put(`/bookings/accept/${id}`);

      if (data) {
        showSuccessMessage("Success", "Successfully accept the booking!");
        setFlag(!flag);
      }
    } catch (error) {
      console.error("Error accepting booking" + error);
    }
  };

  const handleComplete = async () => {
    try {
      const { data } = await api.put(`/bookings/complete/${id}`);

      if (data) {
        showSuccessMessage("Success", "Successfully done the booking!");
        setFlag(!flag);
      }
    } catch (error) {
      console.error("Error completing booking" + error);
    }
  };

  const handleReschedule = async () => {
    try {
      const { data } = await api.put(`/bookings/reschedule/${booking.id}`, {
        date: new Date(newDate).toISOString().slice(0, 10),
      });

      if (data) {
        showSuccessMessage("Success", "Successfully reschedule the booking!");
        setFlag(!flag);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user || booking.ptqr_id !== user.id) {
    return <div className="p-4">Forbidden Page.</div>;
  }

  return (
    <div>
      <Header className={`flex items-center w-full text-center relative`}>
        <button onClick={() => navigate(-1)} className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">{`Booking ${id}`}</h1>
          <div className="flex justify-center items-center mt-1">
            <p className=" bg-orange-400 text-white px-3  py-0 rounded-full text-sm capitalize">
              {booking.status}
            </p>
          </div>
        </div>
      </Header>

      <div className="poppins p-2">
        {booking.status === "declined" && (
          <div className="flex gap-2 items-center my-4">
            <h1 className="text-lg font-semibold">Reason for decline:</h1>
            <p className="text-gray-600">{booking.reason}</p>
          </div>
        )}
        <div className="border border-gray-300 shadow-md ">
          <div className="flex  justify-between">
            <div className="flex flex-col gap-1 p-3">
              <p className="text-gray-500 text-sm">Property Address</p>
              <div>
                <h1 className="font-bold capitalize">
                  {booking.unit_no} {booking.street}
                </h1>
                <p className="text-gray-500 text-sm capitalize">
                  {booking.city}, {booking.province} {booking.postal}
                </p>
              </div>
            </div>
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
            {booking.status === "pending" && (
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="text-cyan-500 font-bold"
              >
                {showCalendar ? "Cancel" : "Edit"}{" "}
              </button>
            )}
          </div>
          {showCalendar && (
            <div className="p-2">
              <label htmlFor="new_date" className="text-gray-400 pr-2">
                Select New Date:{" "}
              </label>
              <input
                type="date"
                name="new_date"
                id="new_date"
                onChange={(e) => setNewDate(e.target.value)}
              />

              <button
                onClick={handleReschedule}
                className="text-xl mt-5 p-3 w-full border-2  text-white bg-cyan-500   font-bold rounded-md shadow-md"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="border border-gray-300 shadow-md p-3 mt-1">
          <div className="flex  justify-between p-2">
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm">Contact Info</p>
              <div>
                <h1 className="font-bold capitalize">
                  {booking.rfname} {booking.rlname}
                </h1>
                <p className="text-gray-500 text-sm">
                  {booking.rphone ?? "No Phone"}
                </p>
                <p className="text-gray-500 text-sm">{booking.remail}</p>
              </div>
            </div>
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
        {booking.status === "pending" && (
          <div className="w-full">
            <button
              onClick={() => setDecline({ show: true })}
              className=" text-xl mt-5 p-3 w-full border-2  text-white bg-red-600   font-bold rounded-md shadow-md"
            >
              DECLINE BOOKING
            </button>
            <button
              className=" text-xl mt-2 p-3 w-full border-2  text-white bg-cyan-500  font-bold rounded-md shadow-md"
              onClick={handleConfirm}
            >
              CONFIRM BOOKING
            </button>
          </div>
        )}

        {booking.status === "completed" && (
          <div className="w-full">
            <button
              className=" text-xl mt-2 p-3 w-full border-2  text-white bg-red-500  font-bold rounded-md shadow-md"
              onClick={() => setReport({ show: true })}
            >
              REPORT ISSUES
            </button>
          </div>
        )}

        {booking.status === "accepted" && (
          <div className="w-full">
            <button
              className=" text-xl mt-2 p-3 w-full border-2  text-white bg-cyan-500  font-bold rounded-md shadow-md"
              onClick={handleComplete}
            >
              COMPLETE
            </button>
          </div>
        )}

        {booking.status === "completed" &&
          (showFeedback ? (
            <div className="w-full">
              <button
                onClick={() => setShow(true)}
                className=" text-xl mt-5 p-3 w-full border-2  text-white bg-cyan-500   font-bold rounded-md shadow-md"
              >
                ADD FEEDBACK
              </button>
            </div>
          ) : (
            <div className="w-full">
              <button
                onClick={() => navigate(`/booking/feedback/${booking.id}`)}
                className=" text-xl mt-5 p-3 w-full border-2  text-white bg-cyan-500   font-bold rounded-md shadow-md"
              >
                SHOW FEEDBACK
              </button>
            </div>
          ))}
        {(booking.status === "completed" || booking.status === "accepted") && (
          <button
            onClick={() => navigate(`/payment/info/${booking.id}`)}
            className=" text-xl mt-5 p-3 w-full border-2  text-white bg-cyan-500   font-bold rounded-md shadow-md"
          >
            SHOW RECEIPT
          </button>
        )}

        {show && (
          <PitiquerRatingLayout
            setShow={setShow}
            booking={booking}
            refresh={{ setFlag, flag }}
          />
        )}
        {decline.show && (
          <DeclineForm
            setDecline={setDecline}
            handleDecline={handleDecline}
            decline={decline}
          />
        )}

        {report.show && (
          <ReportForm
            setReport={setReport}
            handleReport={handleReport}
            report={report}
          />
        )}
      </div>
    </div>
  );
};

export default PitiqueBookingId;
