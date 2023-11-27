import { Link } from "react-router-dom";

const RealtorTransactionHistory = ({ data }) => {
  return (
    data &&
    data.length !== 0 &&
    data.map((booking) => (
      <Link to={`/booking/${booking.id}`} className="" key={booking.id}>
        <h1 className="text-xl text-cyan-500 font-bold">History Bookings</h1>

        <div className="w-full bg-gray-200 p-3 flex justify-between items-center mt-3 rounded-md">
          <div className="flex gap-3 items-center">
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
          </div>

          <div className="">
            <div className="flex justify-end flex-col gap-1">
              <p className="text-white rounded-md bg-cyan-500 py-1 px-1.5 text-sm">
                {booking.status}
              </p>
            </div>
          </div>
        </div>
      </Link>
    ))
  );
};

export default RealtorTransactionHistory;
