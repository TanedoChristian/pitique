const BookingContactForm = ({ setCount }) => {
  return (
    <form
      className="flex flex-col gap-3 p-5 justify-between h-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="First name"
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          placeholder="Last name"
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          placeholder="Email"
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          placeholder="Province"
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="text"
          placeholder="Phone"
          className="p-3 bg-gray-200 w-full rounded-sm "
        />

        <input
          type="text"
          placeholder="Company"
          className="p-3 bg-gray-200 w-full rounded-sm "
        />
      </div>
      <div>
        <button
          className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md"
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          NEXT
        </button>
      </div>
    </form>
  );
};

export default BookingContactForm;
