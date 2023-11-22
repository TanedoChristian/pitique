import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ProcessDetails = ({ count }) => {
  const processDetails = [
    "Location",
    "Services",
    "Schedule",
    "Contact Info",
    "Review",
  ];

  return (
    <div
      className={`p-2 w-full flex gap-5 justify-center items-center poppins border-b-2 border-gray-300 ${
        count > 5 ? "hidden" : ""
      }`}
    >
      <div className="flex gap-3 items-center">
        <div className="w-8 h-8 rounded-full  bg-cyan-500 font-bold flex items-center justify-center text-white">
          {count}
        </div>
        <p className="font-bold">{processDetails[count - 1]}</p>
      </div>
      <div className={`flex items-center gap-3 ${count == 5 ? "hidden" : ""}`}>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="font-bold text-gray-400"
        />

        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full  border border-cyan-500  font-bold flex items-center justify-center text-cyan-500">
            {count + 1}
          </div>
          <p className="">{processDetails[count]}</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessDetails;
