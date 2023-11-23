import { useContext } from "react";
import { BookingContext } from "../../context/bookingContext";

const BookingContactForm = ({ setCount }) => {
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
          placeholder="First name"
          name="firstName"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          name="province"
          placeholder="Province"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm "
        />

        <input
          type="text"
          placeholder="Company"
          name="company"
          onChange={handleChange}
          className="p-3 bg-gray-200 w-full rounded-sm "
        />
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

export default BookingContactForm;
