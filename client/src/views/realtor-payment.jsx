import React from "react";
import StripeCheckout from "react-stripe-checkout";
import api from "../helper/api";
import Header from "../components/common/header";
import { Link, useLocation } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RealtorPayment = () => {
  const { state } = useLocation();

  const tokenHandler = async (token) => {
    try {
      const tempData = {
        ptqr_id: state.ptqr_id,
        rltr_id: state.rltr_id,
        book_id: state.book_id,
        status: "",
        total: state.price,
        pamt: state.price,
        pdate: new Date().toISOString().slice(0, 10),
        preceipt: "",
        famt: state.price,
        fdate: new Date().toISOString().slice(0, 10),
        freceipt: "",
        rmrks: "",
      };
      const { data } = await api.post("/payments", {
        token,
        userPaymentInfo: tempData,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (state === undefined) return <div>Forbidden Page!</div>;

  return (
    <div>
      <Header className={`flex items-center w-full text-center relative`}>
        <Link to={`/booking/${state.id}`} className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </Link>
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
        amount={52 * 100}
        billingAddress
        shippingAddress
        currency="PHP"
        stripeKey="pk_test_51H4nyJL4yJIlpmX8YdYhwND9xFKXeWjML0s6ToNT5Ru2dzxaE6VMPs8TOp4qFlw78cYWesygUmchkWUOJLCxGfCP00bZyMFgy0"
      >
        <button
          style={{ width: "100%", borderRadius: "40px", height: "3rem" }}
          variant="primary"
          className="mt-3 shadow"
        >
          <h5 className="mt-1">Pay</h5>
        </button>
      </StripeCheckout>
    </div>
  );
};

export default RealtorPayment;
