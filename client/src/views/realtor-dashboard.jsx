import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/common/header";
import RealtorLayout from "../components/realtor-homepage-layout/layout";

const RealtorDashboard = () => {
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
      <Header className="flex items-center p-5 gap-5">
        <FontAwesomeIcon icon={faBars} />
        <input
          type="text"
          name=""
          id=""
          className="w-[80%] bg-cyan-500 border-b border-white placeholder-white outline-none"
          placeholder="Search Pitiquer's"
        />
        <FontAwesomeIcon icon={faSearch} />
      </Header>

      <RealtorLayout realtors={realtors} />
    </div>
  );
};

export default RealtorDashboard;
