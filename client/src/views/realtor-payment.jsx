import React from "react";
import StripeCheckout from "react-stripe-checkout";
import api from "../helper/api";
const RealtorPayment = ({ booking }) => {
  const tokenHandler = async (token) => {
    try {
      const tempData = {
        ptqr_id: 1,
        rltr_id: 5,
        book_id: 1,
        status: "done",
        total: 52,
        pamt: 52,
        pdate: new Date().toISOString().slice(0, 10),
        preceipt: "",
        famt: 52,
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

  return (
    <div>
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
