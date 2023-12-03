import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import api from "../helper/api";

const PitiquerNotification = () => {
  const user = JSON.parse(localStorage.getItem("p-user"));
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
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

  const handleOnClick = async (id, book_id) => {
    try {
      const { data } = await api.put(`notifications/${id}`);

      if (data) {
        navigate(`/booking/pitique/${book_id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const NotificationItem = ({ notif }) => {
    return (
      <button
        onClick={() => handleOnClick(notif.id, notif.book_id)}
        className={`rounded w-full ${
          notif.status === "unread" ? " bg-cyan-500  " : " bg-gray-400 "
        } p-2 mb-2 flex justify-between items-center`}
      >
        <div>
          <p className="text-white capitalize text-left">
            Booking #{notif.book_id}
          </p>
          <p className="text-sm text-white opacity-50">{notif.message}</p>
        </div>
        <p className="text-white opacity-50">
          {new Date(notif.date).toLocaleDateString()}
        </p>
      </button>
    );
  };

  return (
    <div>
      <Header className="flex items-center w-full gap-16">
        <Link to="/dashboard/pitique" className="p-5">
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
          notifications.map((notif, index) => (
            <NotificationItem key={index} notif={notif} />
          ))
        )}
      </div>
    </div>
  );
};

export default PitiquerNotification;
