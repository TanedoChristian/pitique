import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../helper/api";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const PaymentInfo = () => {
  const { bid } = useParams();
  const [info, setInfo] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/payments/info/${bid}`);

        setInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);
  if (info === undefined) return <p>Loading...</p>;
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  }
  return (
    <div className="poppins">
      <Header className={`flex items-center w-full text-center relative`}>
        <button onClick={() => navigate(-1)} className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">
            Payment Info
          </h1>
        </div>
      </Header>
      <div className="bg-cyan-100 p-8 my-4 mx-2 rounded-lg shadow-md grid grid-cols-2 gap-4">
        <div className="text-cyan-700 text-md font-semibold">Reference No:</div>
        <div className="text-gray-800 text-md">{info.id}</div>
        <div className="text-cyan-700 text-md font-semibold">Paid in:</div>
        <div className="text-gray-800 text-md capitalize">{info.rmrks}</div>
        <div className="text-cyan-700 text-md font-semibold">
          Package Description:
        </div>
        <div className="text-gray-800 text-md">{info.pkg_desc}</div>

        <div className="text-cyan-700 text-md font-semibold">Amount:</div>
        <div className="text-gray-800 text-md">
          Php {Number(info.total).toFixed(2)}
        </div>

        <div className="text-cyan-700 text-md font-semibold">Realtor Name:</div>
        <div className="text-gray-800 text-md capitalize">
          {info.realtor_name}
        </div>

        <div className="text-cyan-700 text-md font-semibold">
          Pitiquer Name:
        </div>
        <div className="text-gray-800 text-md capitalize">
          {info.pitiquer_name}
        </div>

        {info.status === "card" && (
          <>
            <div className="text-cyan-700 text-md font-semibold">
              Stripe Reference No:
            </div>

            <div className="text-gray-800 text-md">{info.freceipt}</div>
          </>
        )}
        <div className="text-cyan-700 text-md font-semibold">Paid in:</div>
        <div className="text-gray-800 text-md capitalize">{info.rmrks}</div>

        <div className="text-cyan-700 text-md font-semibold">Date:</div>
        <div className="text-gray-800 text-md">{formatDate(info.fdate)}</div>
      </div>
    </div>
  );
};

export default PaymentInfo;
