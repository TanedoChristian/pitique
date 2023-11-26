import { useState } from "react";
import RealtorCard from "../realtor-homepage-layout/realtor-card";
import RealtorRatingLayout from "../realtor-rating-layout/layout";
import RealtorTransactionCard from "./realtor-history-card";

const RealtorTransactionCompeleted = ({ data }) => {
  const [show, setShow] = useState(false);

  return (
    data.length !== 0 && (
      <div className="mt-3">
        <h1 className="text-xl text-cyan-500 font-bold">Completed</h1>

        {data.map((booking) => (
          <RealtorTransactionCard
            booking={booking}
            key={booking.id}
            setShow={setShow}
          />
        ))}

        {show && <RealtorRatingLayout setShow={setShow} />}
      </div>
    )
  );
};

export default RealtorTransactionCompeleted;
