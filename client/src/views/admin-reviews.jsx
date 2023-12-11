import { useEffect, useState } from "react";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AdminSideNav from "../components/common/admin-sidenav";

import { swearWords } from "../assets/swearwords";
import api from "../helper/api";

const AdminReviews = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [reviewType, setReviewType] = useState("good");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/admins/realtor/reviews");

        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const filteredComments = reviews.filter((review) => {
    return (
      review.rtng < 3 ||
      swearWords.some((word) =>
        review.fdbk.toLowerCase().includes(word.toLowerCase())
      )
    );
  });

  const filteredGoodComments = reviews.filter((review) => {
    return swearWords.some((_) => review.rtng >= 3);
  });

  const handleReviewType = (type) => {
    setReviewType(type);

    console.log(type);
  };

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

      <div className="w-full justify-center items-center flex p-3 gap-3">
        <button
          className="p-3 text-white font-bold bg-cyan-500"
          onClick={() => {
            handleReviewType("good");
          }}
        >
          Good Reviews
        </button>

        <button
          className="p-3 text-white font-bold bg-cyan-500"
          onClick={() => {
            handleReviewType("bad");
          }}
        >
          Bad Reviews
        </button>
      </div>

      <div className="w-full p-3 h-screen overflow-auto">
        {reviewType == "bad" ? (
          <div>
            {filteredComments.map((comment) => (
              <div class="flex flex-col gap-4 bg-white border border-gray-300 p-4 mt-5 shadow-md rounded-xl">
                <div className="flex items-center gap-1  w-full justify-end">
                  <p className="font-bold">{comment.rtng}</p>
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
                    <span className="bg-cyan-500 text-white p-2 capitalize">
                      Pitiquer: {comment.pname}
                    </span>
                    <span className="bg-cyan-500 text-white p-2 capitalize">
                      Realtor: {comment.rname}
                    </span>
                  </div>
                </div>

                <div>{comment.fdbk}</div>

                <div class="flex justify-between">
                  <button className="p-3 w-full bg-red-500 text-white">
                    Suspend Pitiquer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {filteredGoodComments.map((comment) => (
              <div class="flex flex-col gap-4 bg-white border border-gray-300 p-4 mt-5 shadow-md rounded-xl">
                <div className="flex items-center gap-1  w-full justify-end">
                  <p className="font-bold">{comment.rtng}</p>
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
                    <span className="bg-cyan-500 text-white p-2 capitalize">
                      Pitiquer: {comment.pname}
                    </span>
                    <span className="bg-cyan-500 text-white p-2 capitalize">
                      Realtor: {comment.rname}
                    </span>
                  </div>
                </div>

                <div>{comment.fdbk}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
