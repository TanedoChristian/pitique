import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/common/header";
import RealtorLayout from "../components/realtor-homepage-layout/layout";
import { useEffect, useState } from "react";
import api from "../helper/api";
import SideNav from "../components/common/sidenav";
import PitiqueRatingLayout from "../components/pitique-rating-layout/layout";
const RealtorDashboard = () => {
  const user = localStorage.getItem("user");
  const [pitiquer, setPitiquer] = useState([]);

  const [showSideNav, setShowNav] = useState(false);
  useEffect(() => {
    if (user === undefined || !user) window.location.href = "/login";
  }, [user]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get("/pitiquers");
      if (data) {
        setPitiquer(data);
      }
    };

    fetch();
  }, []);

  const realtors = [
    {
      firstname: "Tyler",
      lastname: "Creator",
      address: "Cebu City, Cebu",
      price: "10,000",
    },
    {
      firstname: "Tyler",
      lastname: "Creator",
      address: "Cebu City, Cebu",
      price: "10,000",
    },
    {
      firstname: "Tyler",
      lastname: "Creator",
      address: "Cebu City, Cebu",
      price: "10,000",
    },

    {
      firstname: "Tyler",
      lastname: "Creator",
      address: "Cebu City, Cebu",
      price: "10,000",
    },
  ];

  return (
    <div className="w-full">
      {/* <PitiqueRatingLayout /> */}
      {showSideNav ? <SideNav setShowNav={setShowNav} /> : ""}

      <Header className="flex items-center p-5 gap-5">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <input
          type="text"
          name=""
          id=""
          className="w-[80%] bg-cyan-500 border-b border-white placeholder-white outline-none"
          placeholder="Search Pitiquer's"
        />
        <FontAwesomeIcon icon={faSearch} />
      </Header>

      <RealtorLayout realtors={pitiquer} />
    </div>
  );
};

export default RealtorDashboard;
