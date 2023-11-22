const BookingSuccess = () => {
  return (
    <div className="w-full h-screen bg-cyan-500 relative poppins   ">
      <div className="w-full  justify-center items-center h-[40vh] flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-wide text-white">
          Booking Confirmed
        </h1>
        <p className="w-[90%] text-sm text-white text-center">
          Booking for <b>Tyler Boulelarire</b> on<b> May 3, 2023</b> was
          confirmed Referenced ID - Booking # 00001
        </p>
      </div>

      <div className="w-full justify-center flex absolute bottom-0 p-5">
        <button className=" w-[80%] text-xl  p-3  border-2  text-white bg-cyan-500  font-bold rounded-sm shadow-md">
          OK
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
