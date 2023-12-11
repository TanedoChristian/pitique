import React, { useEffect, useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/common/header";
import { faChevronLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../helper/api";

const PitiquerSubscription = () => {
  const [details, setDetails] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("p-user"));

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/subscriptions/pitiquers/${user.id}`);

        setDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  if (user === undefined) return <p>Forbidden Page.</p>;
  console.log(details);
  return (
    <div className="poppins">
      <Header className="flex items-center w-full gap-16 relative">
        <button className="p-5 absolute" onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className="w-full flex justify-center   ">
          <h1 className=" text-xl text-white font-bold ">
            {"Subscription Details"}
          </h1>
        </div>
      </Header>

      <div></div>
    </div>
  );
};

export default PitiquerSubscription;
