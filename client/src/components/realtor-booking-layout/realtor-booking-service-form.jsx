const BookingServiceForm = ({ setCount }) => {
  return (
    <form
      className="flex flex-col gap-3 p-3 justify-between h-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="bg-gray-200 shadow-md">
        <input className="hidden" id="radio_1" type="radio" name="radio" />
        <label
          className="flex flex-col p-2 border-2  cursor-pointer"
          htmlFor="radio_1"
        >
          <div className="flex gap-3">
            <img
              className="w-[150px] h-[70px] rounded-xl"
              src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <div>
              <h1 className="font-bold">Arial Photography</h1>
              <p>Php 9,000.00</p>
            </div>
          </div>
        </label>
      </div>
      <div className="bg-gray-200 shadow-md">
        <input className="hidden" id="radio_2" type="radio" name="radio" />
        <label
          className="flex flex-col p-2 border-2  cursor-pointer"
          htmlFor="radio_2"
        >
          <div className="flex gap-3">
            <img
              className="w-[150px] h-[70px] rounded-xl"
              src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <div>
              <h1 className="font-bold">Arial Photography</h1>
              <p>Php 9,000.00</p>
            </div>
          </div>
        </label>
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

export default BookingServiceForm;
