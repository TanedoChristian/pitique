import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import api from "../helper/api";
const FeedbackBooking = () => {
  const { bid } = useParams();
  const navigate = useNavigate();
  const [rFeedback, setRFeedback] = useState();
  const [pFeedback, setpFeedback] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/realtor-feedbacks/booking/${bid}`);

        setRFeedback(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/pitiquer-feedbacks/booking/${bid}`);

        setpFeedback(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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
          <h1 className="flex-grow text-xl text-white font-bold ">{`Feedback of Booking ${bid}`}</h1>
        </div>
      </Header>
      <div className="p-5">
        {rFeedback !== undefined ? (
          <div className="bg-teal-500 text-white p-6 rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-4">Realtor Rating</h2>
            <div className="text-2xl font-bold mb-2">
              Rating: {rFeedback.rtng}
            </div>
            <div className="text-sm mb-4">
              Date of Rating:{" "}
              {new Date(rFeedback.date).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </div>
            <div className="text-base">Description: {rFeedback.fdbk}</div>
          </div>
        ) : (
          <div className="bg-gray-200 text-gray-600 p-6 rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-4">No Feedback</h2>
            <p>There is no feedback from the realtor.</p>
          </div>
        )}

        <div className="w-full border-b-2 my-5"></div>

        {pFeedback !== undefined ? (
          <div className="bg-cyan-500 text-white p-6 rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-4">Realtor Rating</h2>
            <div className="text-2xl font-bold mb-2">
              Rating: {pFeedback.rtng}
            </div>
            <div className="text-sm mb-4">
              Date of Rating:{" "}
              {new Date(pFeedback.date).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </div>
            <div className="text-base">Description: {pFeedback.fdbk}</div>
          </div>
        ) : (
          <div className="bg-gray-200 text-gray-600 p-6 rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-4">No Feedback</h2>
            <p>There is no feedback from the realtor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackBooking;
