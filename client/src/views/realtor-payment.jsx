import React from "react";
import StripeCheckout from "react-stripe-checkout";
import api from "../helper/api";
import Header from "../components/common/header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  faCashRegister,
  faChevronLeft,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import card from "../assets/card.png";
import {
  showLoadingMessage,
  showSuccessMessage,
} from "../helper/messageHelper";

const RealtorPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const tokenHandler = async (token) => {
    showLoadingMessage("Transacting...");
    try {
      const tempData = {
        ptqr_id: state.ptqr_id,
        rltr_id: state.rltr_id,
        book_id: state.id,
        status: "",
        total: state.price,
        pamt: state.price,
        preceipt: "",
        famt: state.price,
        freceipt: "",
        rmrks: "card",
      };
      const { data } = await api.post("/payments", {
        token,
        userPaymentInfo: tempData,
      });

      if (data) {
        const res = await api.put(`/bookings/pay/${state.id}`);

        if (res.data) {
          showSuccessMessage("Success", "Successfully paid the booking!");

          navigate(`/booking/${state.id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCashPayment = async () => {
    showLoadingMessage("Transacting...");
    try {
      const tempData = {
        ptqr_id: state.ptqr_id,
        rltr_id: state.rltr_id,
        book_id: state.id,
        status: "completed",
        total: state.price,
        pamt: state.price,
        preceipt: "",
        famt: state.price,
        freceipt: "",
        rmrks: "cash",
        preceipt: "none",
        freceipt: "none",
      };
      const { data } = await api.post("/payments/cash", {
        userPaymentInfo: tempData,
      });

      if (data) {
        const res = await api.put(`/bookings/pay/${state.id}`);

        if (res.data) {
          showSuccessMessage("Success", "Successfully paid the booking!");

          navigate(`/booking/${state.id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (state === undefined) return <div>Forbidden Page!</div>;

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
          <h4>BOOKING # {state.id}</h4>
        </div>
      </Header>
      <StripeCheckout
        token={tokenHandler}
        name="Pitique"
        // Amount * 100
        amount={state.price * 100}
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
      <button
        variant="primary"
        className={`mx-7 border-b-2 text-left py-4 flex items-center mt-5 `}
        onClick={handleCashPayment}
      >
        {/* Add your cash icon or design here */}
        <FontAwesomeIcon
          icon={faMoneyBill}
          className="text-2xl text-gray-600"
        />
        <h5 className="ml-5 font-semibold">Cash</h5>
      </button>
    </div>
  );
};

export default RealtorPayment;
