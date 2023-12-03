import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../helper/api";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const RealtorAllBooking = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const auser = JSON.parse(localStorage.getItem("admin"));

  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/realtors/statistics/report/${id}`);

        setBookings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Header className={`flex items-center w-full text-center relative`}>
        <button onClick={() => navigate(-1)} className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">
            All bookings
          </h1>
        </div>
      </Header>
      <div className="px-3 flex flex-col gap-3">
        {bookings.length > 0 ? (
          bookings.map((r, index) => (
            <Link
              to={
                auser === undefined
                  ? `/booking/feedback/${r.id}`
                  : `/admin/booking/feedback/${r.id}`
              }
              className="rounded-md flex flex-col  bg-gray-100 poppins shadow-md p-2 text-sm"
              key={index}
            >
              <div className="flex w-full  justify-end px-3">
                <p className="font-bold text-green-400">Completed</p>
              </div>
              <div className="flex justify-between px-3 items-center  p-1 border-b border-gray-300">
                <div className="flex gap-2 items-center">
                  <img
                    className="w-8 h-8 rounded-full "
                    src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
                  />
                  <h1 className="text-xs font-bold capitalize">{r.name}</h1>
                </div>

                <div className="flex flex-col gap-2 justify-end items-end">
                  <p className="text-xs">
                    {" "}
                    {r.day},{" "}
                    {new Date(r.completed).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center px-3 ">
                <div className="flex gap-3 items-center p-2">
                  <h1 className="text-xs capitalize">
                    Client asked for: <b>{r.pkg_desc} </b>
                  </h1>
                </div>
                <h1 className="text-xs">
                  <span className="font-bold">
                    Php {Number(r.total).toFixed(2)}
                  </span>
                </h1>
              </div>
            </Link>
          ))
        ) : (
          <div>
            <p>No bookings found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtorAllBooking;
