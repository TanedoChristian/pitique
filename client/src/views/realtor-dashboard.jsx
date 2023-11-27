import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/common/header";
import RealtorLayout from "../components/realtor-homepage-layout/layout";
import { useEffect, useState } from "react";
import api from "../helper/api";
import SideNav from "../components/common/sidenav";
import { useNavigate } from "react-router-dom";

const RealtorDashboard = () => {
  const user = localStorage.getItem("user");
  const [search, setSearch] = useState("");
  const [pitiquer, setPitiquer] = useState([]);
  const navigate = useNavigate();

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

  const handleSearch = () => {
    if (search === "") return;

    navigate(`/search/pitiquer/${search}`);
  };

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
          className="w-[80%] bg-cyan-500 border-b border-white placeholder-white outline-none"
          placeholder="Search Pitiquer's"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
              console.log("asdasd");
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FontAwesomeIcon icon={faSearch} />
      </Header>

      <RealtorLayout pitiquers={pitiquer} />
    </div>
  );
};

export default RealtorDashboard;
