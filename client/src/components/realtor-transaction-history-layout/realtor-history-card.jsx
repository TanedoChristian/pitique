import api from "../../helper/api";

const RealtorTransactionCard = ({ booking, setShow, setPitiquer }) => {
  const handleRate = async () => {
    try {
      const { data } = await api.get(
        `/realtor-feedbacks/${booking.rltr_id}/booking/${booking.id}`
      );

      if (data) alert("already rate this pitiquer/booking");
    } catch (error) {
      // TRUE since no rating is found in database
      // This is intended
      setShow(true);
      setPitiquer(booking);
    }
  };

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
        <div className="">
          <div className="flex justify-end flex-col gap-1">
            <button
              onClick={handleRate}
              className="text-white bg-yellow-500 py-1 px-1.5 text-sm"
            >
              Rate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RealtorTransactionCard;
