import React from "react";
import { Link } from "react-router-dom";
import api from "../../helper/api";

const RealtorTransactionPayment = ({ data, refresh }) => {
  const handleCancel = async (id) => {
    try {
      const { data } = await api.put(`/bookings/cancel/${id}`);

      if (data) {
        alert("Cancel Successfully!");
        refresh.setFlag(!refresh.flag);
      }
    } catch (error) {
      console.error("Error completing booking" + error);
    }
  };

  return (
    data &&
    data.length !== 0 && (
      <div>
        <h1 className="text-xl text-cyan-500 font-bold">
          Payment Booking Pending
        </h1>
        {data.map((booking) => (
          <div className="" key={booking.id}>
            <div className="w-full bg-gray-200 p-3 flex justify-between items-center mt-3 rounded-md">
              <Link
                to={`/booking/${booking.id}`}
                className="flex gap-3 items-center"
              >
                <img
                  className="w-9 h-9  rounded-full "
                  src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
                />
                <div>
                  <h1 className="font-bold text-sm">Php {booking.total}</h1>
                  <p className="text-sm">
                    {booking.fname} {booking.lname}
                  </p>
                  <p className="text-sm">
                    {booking.pkg_desc} -{" "}
                    {new Date(booking.date).toLocaleString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>

              <div className="">
                <div className="flex justify-end flex-col gap-1">
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="text-white bg-cyan-500 py-1 px-1.5 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default RealtorTransactionPayment;
