import React from "react";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RealtorNotification = () => {
  return (
    <div>
      <Header className="flex items-center w-full gap-16">
        <Link to="/dashboard" className="p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </Link>

        <h1 className="flex-grow text-xl text-white font-bold ">
          Notification
        </h1>
      </Header>
    </div>
  );
};

export default RealtorNotification;
