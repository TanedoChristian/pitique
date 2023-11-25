import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/common/header";
import RealtorLayout from "../components/realtor-homepage-layout/layout";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import api from "../helper/api";
const RealtorDashboard = () => {
  const user = localStorage.getItem("user");
  const [pitiquer, setPitiquer] = useState([]);

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

=======
import SideNav from "../components/common/sidenav";

const RealtorDashboard = () => {
  const user = localStorage.getItem("user");
  const [showSideNav, setShowNav] = useState(false);
>>>>>>> tanedo
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
