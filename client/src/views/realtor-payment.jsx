import React from "react";
import StripeCheckout from "react-stripe-checkout";
import api from "../helper/api";
import Header from "../components/common/header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import card from "../assets/card.png";

const RealtorPayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const tokenHandler = async (token) => {
    try {
      const tempData = {
        ptqr_id: state.ptqr_id,
        rltr_id: state.rltr_id,
        book_id: state.id,
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

      if (data) {
        const res = await api.put(`/bookings/pay/${state.id}`);

        if (res.data) {
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
          variant="primary"
          className=" mx-7 border-b-2 text-left py-4 flex items-center mt-5"
        >
          <img src={`${card}`} alt="card" className="w-[50%]" />
          <h5 className="ml-5 font-semibold">Credit Cards</h5>
        </button>
      </StripeCheckout>

      <div className="mt-auto mb-4  text-xl p-3 w-full border-2  text-white bg-cyan-500   font-bold rounded-md shadow-md text-center">
        ADD NEW PAYMENT METHOD
      </div>
    </div>
  );
};

export default RealtorPayment;
