import React, { useEffect, useRef, useState } from "react";
import Header from "../components/common/header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import api from "../helper/api";

const RealtorProfilePageId = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/realtors/${id}`);

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [id]);

  if (user === null || user === undefined) return <div>No User exist!</div>;

  return (
    <div>
      <Header className="flex items-center w-full gap-16 relative">
        <button className="p-5 absolute" onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className="w-full flex justify-center   ">
          <h1 className=" text-xl text-white font-bold ">
            {"Realtor Details"}
          </h1>
        </div>
      </Header>
      <div className="w-full justify-center ">
        <div className="  ml-5 w-[95%]  flex justify-center p-5 border-b-2 border-gray-300">
          <img
            className="w-48 h-48 rounded-full object-cover "
            src={
              user.prof_img
                ? `data:image/png;base64,${user.prof_img}`
                : "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D}"
            }
          />
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-400 mb-3">Realtor</p>
        <p className="text-2xl font-semibold capitalize">
          {user.fname} {user.mname} {user.lname}
        </p>
        <p className="text-gray-500">{user.email}</p>
        <p className="text-gray-500 mb-10">{user.phone}</p>
        <button
          onClick={() => navigate(`/booking/realtor/all/${user.id}`)}
          className="py-2 px-6 bg-orange-400 text-white text-center w-[95%]"
        >
          All Bookings
        </button>
      </div>
    </div>
  );
};

export default RealtorProfilePageId;
