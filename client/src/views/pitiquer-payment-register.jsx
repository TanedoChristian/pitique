import React from "react";
import Header from "../components/common/header";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import StripeCheckout from "react-stripe-checkout";
import card from "../assets/card.png";
import {
  showLoadingMessage,
  showSuccessMessage,
} from "../helper/messageHelper";
import api from "../helper/api";

const PitiquerPaymentRegister = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const tokenHandler = async (token) => {
    showLoadingMessage("Transacting...");
    try {
      const { data } = await api.post("/payments/register", {
        token,
      });

      if (data) {
        showSuccessMessage("Success", "Successfully paid the booking!");

        if (state.type === "pitiquer") {
          try {
            const { data } = await api.post("/pitiquers", state);

            if (data) {
              showSuccessMessage(
                "Success",
                state.type + " has been created successfully!"
              );

              window.location.href = "/login";
            }
          } catch (error) {
            console.error(error);
          }
        } else if (state.type === "realtor") {
          try {
            const { data } = await api.post("/realtors", state);

            if (data) {
              showSuccessMessage(
                "Success",
                state.type + " has been created successfully!"
              );
              window.location.href = "/login";
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          showErrorMessage("Choose account type!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col h-screen ">
      <Header className={`flex items-center w-full text-center relative`}>
        <button onClick={() => navigate(-1)} className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">
            CHOOSE PAYMENT METHOD
          </h1>
        </div>
      </Header>
      <div className="p-5">
        The platform fee is <span className="font-semibold">Php 200.00</span>
      </div>
      <StripeCheckout
        token={tokenHandler}
        name="Pitique"
        billingAddress
        shippingAddress
        currency="PHP"
        stripeKey="pk_test_51H4nyJL4yJIlpmX8YdYhwND9xFKXeWjML0s6ToNT5Ru2dzxaE6VMPs8TOp4qFlw78cYWesygUmchkWUOJLCxGfCP00bZyMFgy0"
      >
        <button
          variant="primary"
          className=" mx-7 border-b-2 text-left py-4 flex items-center mt-5"
        >
          <img src={`${card}`} alt="card" className="w-[50%]" />
          <h5 className="ml-5 font-semibold">Credit Cards</h5>
        </button>
      </StripeCheckout>
      {/* Cash Payment */}
    </div>
  );
};

export default PitiquerPaymentRegister;
