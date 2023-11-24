import { useContext } from "react";
import { BookingContext } from "../../context/bookingContext";

const BookingLocationForm = ({ setCount }) => {
  const [bookingInfo, setBookingInfo] = useContext(BookingContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCount((prev) => prev + 1);
  };

  return (
    <form
      className="flex flex-col gap-3 p-5 justify-between h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Street name"
          className="p-3 bg-gray-200 w-full rounded-sm"
          name="street"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Unit no."
          name="unit_no"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          placeholder="Province"
          name="province"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          placeholder="Postal Code"
          name="postal"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm "
        />

        <input
          type="text"
          placeholder="Property Size"
          name="property_size"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm "
        />

        <textarea
          cols={15}
          className="bg-gray-200 p-3"
          placeholder="Add Notes"
          name="rmrks"
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <button
          className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </div>
    </form>
  );
};

export default BookingLocationForm;
