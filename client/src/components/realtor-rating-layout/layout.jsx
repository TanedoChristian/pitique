import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import api from "../../helper/api";

const RealtorRatingLayout = ({ setShow, pitiquer, setPitiquer }) => {
  const [feedback, setFeedback] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const _feedback = {
        rltr_id: pitiquer.rltr_id,
        book_id: pitiquer.id,
        rtng: feedback.rtng,
        fdbk: feedback.fdbk,
      };

      const { data } = await api.post("/realtor-feedbacks", _feedback);

      if (data) {
        alert("Rating Created!");
        setShow(false);
      }
    } catch (error) {
      alert("Please input the required fields");
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center backdrop-blur-[1px] fixed top-0 bg-gray-300 bg-opacity-90 left-0">
      <div className="w-[350px] border border-white bg-white p-2 rounded-md flex flex-col gap-2 items-center">
        <div className="w-full flex justify-center ">
          <div className="  ml-5 w-full  flex justify-center p-3">
            <img
              className="w-48 h-48 rounded-full object-cover "
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </div>
        <h1 className="font-bold">
          {pitiquer.fname} {pitiquer.lname}
        </h1>
        <p className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faLocationDot} className="text-red-600" />
          <span>
            {pitiquer.city}, {pitiquer.province}
          </span>
        </p>

        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <svg
                className={`w-4 h-4 text-${
                  index <= feedback.rtng ? "yellow" : "gray"
                }-300 ms-1 cursor-pointer`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                key={index}
                onClick={() => {
                  setFeedback((prevState) => ({
                    ...prevState,
                    // Since index starts at 0
                    rtng: index + 1,
                  }));
                }}
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            );
          })}
        </div>
        <div className="w-full  px-3">
          <p className="text-gray-600 font-semibold">Leave a comment</p>
        </div>
        <div className="w-full flex justify-center">
          <textarea
            rows={10}
            className="bg-gray-200 w-[95%] rounded-md px-2 py-1"
            name="fdbk"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="p-3 w-full flex justify-center">
          <button
            onClick={handleSubmit}
            className="text-white uppercase font-semibold bg-cyan-500 p-3 w-[90%] rounded-md"
          >
            Submit Feedback
          </button>
        </div>
      </div>
      <button
        className="absolute top-5 right-5 hover:text-red-500"
        onClick={() => {
          setShow(false);
          setPitiquer({});
        }}
      >
        X
      </button>
    </div>
  );
};

export default RealtorRatingLayout;
