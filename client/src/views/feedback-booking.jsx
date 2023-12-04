import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import api from "../helper/api";
import { showSuccessMessage } from "../helper/messageHelper";

const FeedbackBooking = () => {
  const { bid } = useParams();
  const navigate = useNavigate();
  const [rFeedback, setRFeedback] = useState();
  const [pFeedback, setpFeedback] = useState();
  const [rEditFeedback, setREditFeedback] = useState("");
  const [pEditFeedback, setPEditFeedback] = useState("");
  const [isREditMode, setREditMode] = useState(false);
  const [isPEditMode, setPEditMode] = useState(false);
  const ruser = JSON.parse(localStorage.getItem("user"));
  const puser = JSON.parse(localStorage.getItem("p-user"));

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/realtor-feedbacks/booking/${bid}`);

        setRFeedback(data);
        setREditFeedback(data?.fdbk || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [bid]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/pitiquer-feedbacks/booking/${bid}`);

        setpFeedback(data);
        setPEditFeedback(data?.fdbk || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [bid]);

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const handleEdit = async () => {
    try {
      await api.put(`/realtor-feedbacks/booking/${bid}`, {
        fdbk: rEditFeedback,
      });

      showSuccessMessage("Success", "Successfully updated the feedback");
      setREditMode(false);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePEdit = async () => {
    try {
      await api.put(`/pitiquer-feedbacks/booking/${bid}`, {
        fdbk: pEditFeedback,
      });

      showSuccessMessage("Success", "Successfully updated the feedback");
      setPEditMode(false);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleREditMode = () => {
    setREditMode(!isREditMode);
  };

  const togglePEditMode = () => {
    setPEditMode(!isPEditMode);
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
            {!isREditMode ? (
              <>
                <div className="text-base">Description: {rFeedback.fdbk}</div>
                {ruser && ruser.id === rFeedback.rltr_id && (
                  <button
                    onClick={toggleREditMode}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                )}
              </>
            ) : (
              <>
                <textarea
                  value={rEditFeedback}
                  onChange={(e) => setREditFeedback(e.target.value)}
                  className="w-full h-24 p-2 border text-black"
                ></textarea>
                <button
                  onClick={handleEdit}
                  className="mt-4 mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  onClick={toggleREditMode}
                  className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </>
            )}
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
            <h2 className="text-3xl font-bold mb-4">Pitiquer Rating</h2>
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
            {!isPEditMode ? (
              <>
                <div className="text-base">Description: {pFeedback.fdbk}</div>
                {puser && puser.id === pFeedback.ptqr_id && (
                  <button
                    onClick={togglePEditMode}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                )}
              </>
            ) : (
              <>
                <textarea
                  value={pEditFeedback}
                  onChange={(e) => setPEditFeedback(e.target.value)}
                  className="w-full h-24 p-2 border text-black"
                ></textarea>
                <button
                  onClick={handlePEdit}
                  className="mt-4 mr-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                <button
                  onClick={togglePEditMode}
                  className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-gray-200 text-gray-600 p-6 rounded-md shadow-md">
            <h2 className="text-3xl font-bold mb-4">No Feedback</h2>
            <p>There is no feedback from the pitiquer.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackBooking;
