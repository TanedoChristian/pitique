import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/common/header";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../helper/api";
import StripeCheckout from "react-stripe-checkout";
import {
  showLoadingMessage,
  showSuccessMessage,
} from "../helper/messageHelper";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const calculateRemainingDays = (lastPaidDate) => {
  const currentDate = new Date();
  const lastPaid = new Date(lastPaidDate);

  // Calculate the next payment date as +1 year from the last paid date
  const nextPaymentDate = new Date(lastPaid);
  nextPaymentDate.setFullYear(lastPaid.getFullYear() + 1);

  // Calculate the remaining days
  const remainingDays = Math.ceil(
    (nextPaymentDate - currentDate) / (24 * 60 * 60 * 1000)
  );

  return remainingDays;
};

const isPayButtonEnabled = (lastPaidDate) => {
  const remainingDays = calculateRemainingDays(lastPaidDate);

  // Check if the remaining days are within 5 days before the next payment date
  return remainingDays <= 5;
};

const PitiquerSubscription = () => {
  const [details, setDetails] = useState();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const user = JSON.parse(localStorage.getItem("p-user"));

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/subscriptions/pitiquers/${user.id}`);
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user === undefined) return; // Check user before fetching details
    fetchDetails();
  }, [flag]);

  const tokenHandler = async (token) => {
    showLoadingMessage("Transacting...");
    try {
      const { data } = await api.post("/payments/register", {
        token,
      });

      if (data) {
        const amount = 200;
        const { data } = await api.put("/subscriptions", {
          ptqr_id: user.id,
          amount,
          prev_amount: details.prev_amount,
        });

        if (data) {
          showSuccessMessage("Success", "Succesfully paid!");
          setFlag(!flag);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="poppins">
      <Header className="flex items-center w-full gap-16 relative">
        <button className="p-5 absolute" onClick={() => navigate(-1)}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className="w-full flex justify-center">
          <h1 className="text-xl text-white font-bold">
            {"Subscription Details"}
          </h1>
        </div>
      </Header>

      <div className="flex justify-center items-center w-full p-4">
        {details && (
          <div className="shadow p-6">
            <p className="my-3">
              <strong>PTQR ID:</strong> {details.ptqr_id}
            </p>

            <p className="my-3">
              <strong>Subscription Started Date:</strong>{" "}
              {formatDate(details.started_date)}
            </p>
            <p className="my-3">
              <strong>Last Paid Date:</strong>{" "}
              {formatDate(details.last_paid_date)}
            </p>
            <p className="my-3">
              <strong>Amount:</strong> {details.amount}
            </p>

            <p className="my-3">
              <strong>Remaining Days Before Expired:</strong>{" "}
              {calculateRemainingDays(details.last_paid_date)} days
            </p>

            <StripeCheckout
              token={tokenHandler}
              name="Pitique"
              billingAddress
              shippingAddress
              currency="PHP"
              stripeKey="pk_test_51H4nyJL4yJIlpmX8YdYhwND9xFKXeWjML0s6ToNT5Ru2dzxaE6VMPs8TOp4qFlw78cYWesygUmchkWUOJLCxGfCP00bZyMFgy0"
            >
              <button
                className={`my-3 px-4 py-2 bg-blue-500 w-full text-white rounded ${
                  isPayButtonEnabled(details.last_paid_date)
                    ? ""
                    : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isPayButtonEnabled(details.last_paid_date)}
              >
                <h5 className="font-semibold">Pay</h5>
              </button>
            </StripeCheckout>
          </div>
        )}
      </div>
    </div>
  );
};

export default PitiquerSubscription;
