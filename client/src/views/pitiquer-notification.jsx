import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import api from "../helper/api";

const PitiquerNotification = () => {
  const user = JSON.parse(localStorage.getItem("p-user"));
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/notifications/pitiquer/${user.id}`);

        if (data) {
          setNotifications(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  const NotificationItem = () => {
    return (
      <Link className="rounded bg-cyan-500 p-2 flex justify-between">
        <div>
          <p className="text-white">John Doe</p>
          <p className="text-sm text-white opacity-50">Message</p>
        </div>
        <p className="text-white opacity-50">date</p>
      </Link>
    );
  };

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
          Notification ({notifications.length})
        </h1>
      </Header>

      <div className="p-2">
        {notifications.length === 0 ? (
          <div>No notification available</div>
        ) : (
          notifications.map((notif) => <NotificationItem key={notif.id} />)
        )}
      </div>
    </div>
  );
};

export default PitiquerNotification;
