import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/common/header";
import { useEffect, useState } from "react";
import PitiquerSideNav from "../components/common/pitiquer-sidenav";
import api from "../helper/api";
const PitiqueDashboard = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [statistics, setStatistics] = useState();
  const [ratings, setRatings] = useState();
  const user = JSON.parse(localStorage.getItem("p-user"));
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/pitiquers/statistics/${user.id}`);

        setStatistics(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(
          `/pitiquers/statistics/ratings/${user.id}`
        );

        setRatings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  if (statistics === undefined || ratings === undefined)
    return <div>Loading...</div>;

  return (
    <div className="poppins">
      {showSideNav ? <PitiquerSideNav setShowNav={setShowNav} /> : ""}
      <Header className="flex items-center p-5 gap-5">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </Header>

      <h1 className="text-xl font-bold p-5">Welcome, Pitiquer! </h1>

      <div className="grid grid-cols-3 gap-4 p-3">
        <div className="bg-orange-500 col-span-2 flex p-3 justify-center items-center rounded-xl shadow-xl">
          <div className="flex justify-center flex-col items-center">
            <div className=" h-10 w-10 rounded-full flex items-center justify-center bg-orange-600 ">
              <h1 className="text-white font-bold">{statistics.all_booking}</h1>
            </div>
            <p className="text-white font-bold">View All Bookings</p>
          </div>
        </div>
        <div className="bg-yellow-500 rounded-xl">
          <div className="flex justify-center flex-col items-center h-full">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-yellow-600 ">
              <h1 className="text-white font-bold">{statistics.pending}</h1>
            </div>
            <p className="text-white">Pending</p>
          </div>
        </div>
        <div className="bg-cyan-500 p-3 rounded-xl">
          <div className="flex justify-center flex-col items-center h-full">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-cyan-600 ">
              <h1 className="text-white font-bold">{statistics.accepted}</h1>
            </div>
            <p className="text-white">Accepted</p>
          </div>
        </div>
        <div className="bg-blue-500 p-3 rounded-xl">
          <div className="flex justify-center flex-col items-center h-full">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-600 ">
              <h1 className="text-white font-bold">{statistics.paid}</h1>
            </div>
            <p className="text-white">Paid</p>
          </div>
        </div>
        <div className="bg-green-500 p-3 rounded-xl">
          <div className="flex justify-center flex-col items-center h-full">
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-600 ">
              <h1 className="text-white font-bold">{statistics.completed}</h1>
            </div>
            <p className="text-white">Completed</p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center p-5">
        <div className="w-[90%] border-t-2 border-gray-300 pt-5">
          <div className="flex gap-2 items-center">
            <svg
              className="w-10 h-10 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <div className="flex flex-col ">
              <div className="flex gap-1 items-center">
                <h1 className="font-bold text-xl">
                  {Number(ratings.rating).toFixed(1)}
                </h1>
                <p className="text-gray-500">average rating</p>
              </div>
              <p className="text-blue-600 text-sm font-bold">
                {ratings.total_rating} Total Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitiqueDashboard;
