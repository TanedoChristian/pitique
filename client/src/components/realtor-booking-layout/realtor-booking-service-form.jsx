import { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/bookingContext";
import api from "../../helper/api";

const BookingServiceForm = ({ setCount, pitiquerId, handleChangePackage }) => {
  const [bookingInfo, setBookingInfo] = useContext(BookingContext);
  const [packageInfos, setPackageInfos] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get(`/packages/pitiquer/${pitiquerId}`);

      if (data) {
        setPackageInfos(data);
      }
    };

    fetch();
  }, []);

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
      className="flex flex-col gap-3 p-3 justify-between h-full"
      onSubmit={handleSubmit}
    >
      {packageInfos.length > 0 ? (
        packageInfos.map((packages, index) => (
          <div
            className="bg-gray-200 shadow-md"
            key={packages.id}
            onClick={() => handleChangePackage(packages.id, packages.pkg_desc)}
          >
            <input
              className="hidden"
              id={`radio ${index}`}
              type="radio"
              name="price"
              value={packages.min_price}
              onChange={handleChange}
            />

            <label
              className="flex flex-col p-2 border-2  cursor-pointer"
              htmlFor={`radio ${index}`}
            >
              <div className="flex gap-3">
                <img
                  className="w-[150px] h-[70px] rounded-xl"
                  src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <div>
                  <h1 className="font-bold">{packages.pkg_desc}</h1>
                  <p>Php {packages.min_price.toFixed(2)}</p>
                </div>
              </div>
            </label>
          </div>
        ))
      ) : (
        <div>No package available</div>
      )}

      <div>
        <button
          className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md"
          disabled={packageInfos.length === 0}
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </div>
    </form>
  );
};

export default BookingServiceForm;
