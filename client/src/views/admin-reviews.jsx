import { useEffect, useState } from "react";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AdminSideNav from "../components/common/admin-sidenav";

import { swearWords } from "../assets/swearwords";

const AdminReviews = () => {
  const [showSideNav, setShowNav] = useState(false);

  const COMMENT = ["Bati kaayo ilang service", "Good Quality", "Bad Service"];

  const filteredComments = COMMENT.filter((comment) => {
    return swearWords.some((word) =>
      comment.toLowerCase().includes(word.toLowerCase())
    );
  });

  console.log(filteredComments);

  return (
    <div className="w-full h-screen poppins">
      {showSideNav ? <AdminSideNav setShowNav={setShowNav} /> : ""}
      <Header className="flex items-center p-5 gap-5">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </Header>

      <div className="w-full justify-center items-center flex p-3">
        <h1 className="text-gray-800 font-bold text-3xl">Bad Reviews</h1>
      </div>

      <div className="w-full p-3 h-screen overflow-auto">
        {filteredComments.map((word) => (
          <div class="flex flex-col gap-4 bg-white border border-gray-300 p-4 mt-5 shadow-md rounded-xl">
            <div className="flex items-center gap-1  w-full justify-end">
              <p className="font-bold">5</p>
              <svg
                class="w-4 h-4 text-yellow-300 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>

            <div class="flex justify justify-between">
              <div class="flex justify-between gap-3 text-xs w-full">
                <span className="bg-cyan-500 text-white p-2">
                  Pitiquer: John Doe
                </span>
                <span className="bg-cyan-500 text-white p-2">
                  Realtor: Jess Hopkins
                </span>
              </div>
            </div>

            <div>{word}</div>

            <div class="flex justify-between">
              <button className="p-3 w-full bg-red-500 text-white">
                Suspend Pitiquer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
