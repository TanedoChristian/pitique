import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookingReviewForm = ({ setCount }) => {
  return (
    <div className="poppins">
      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Property Address</p>
            <div>
              <h1 className="font-bold">123 Ucona Court</h1>
              <p className="text-gray-500 text-sm">Gold River, BC VOP 1G0</p>
            </div>
          </div>
          <button className="text-cyan-500 font-bold">Edit </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Appointment Details</p>
            <div>
              <h1 className="font-bold">Tuesday - April 11, 2023</h1>
              <p className="text-gray-500 text-sm">Mid-day</p>
            </div>
          </div>
          <button className="text-cyan-500 font-bold">Edit </button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md p-3 mt-5">
        <div className="flex  justify-between p-2">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">Contact Info</p>
            <div>
              <h1 className="font-bold">Juan Dela Cruz</h1>
              <p className="text-gray-500 text-sm">09604984958</p>
              <p className="text-gray-500 text-sm">juan@gmail.com</p>
            </div>
          </div>
          <button className="text-cyan-500 font-bold">Edit </button>
        </div>
      </div>

      <div className="p-3 mt-5">
        <div className="w-full  flex justify-between">
          <h1>Aerial Photography</h1>
          <p>Php 8,000.00</p>
        </div>
        <div className="w-full  flex justify-between  mt-3">
          <h1>Subtotal</h1>
          <p>Php 8,000.00</p>
        </div>

        <div className="w-full  flex justify-between mt-2 p-3 border-t border-gray-300">
          <h1>Total </h1>
          <p className="font-bold">Php 8,000.00</p>
        </div>
      </div>
      <button
        className=" text-xl mt-5 p-3 w-full border-2  text-white bg-cyan-500  font-bold rounded-sm shadow-md"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        CONFIRM BOOKING
      </button>
    </div>
  );
};

export default BookingReviewForm;
