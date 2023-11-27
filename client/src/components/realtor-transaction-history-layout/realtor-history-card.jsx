const RealtorTransactionCard = ({ booking }) => {
  return (
    <>
      <div className="w-full bg-gray-200 p-3 flex justify-between items-center rounded-md mt-2">
        <div className="flex gap-3 items-center">
          <img
            className="w-9 h-9  rounded-full "
            src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
          />
          <div>
            <h1 className="font-bold text-sm">
              Php {booking.total.toFixed(2)}
            </h1>
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
      </div>
    </>
  );
};

export default RealtorTransactionCard;
