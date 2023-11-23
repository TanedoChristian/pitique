import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { HeaderContext } from "../../context/headerContext";

const RegisterHeader = ({ title, setShowAccountForm }) => {
  const showAccountForm = useContext(HeaderContext);

  return (
    <header className="w-full h-[8vh] bg-cyan-400  relative">
      {showAccountForm ? (
        <button
          className="absolute"
          onClick={() => {
            setShowAccountForm(false);
          }}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white  p-5 text-xl font-bold"
          />
        </button>
      ) : (
        ""
      )}

      <div className="h-[6vh] w-full bg-cyan-500 flex justify-center items-center">
        <h1 className="font-bold text-xl text-white tracking-wide poppins">
          {!showAccountForm ? "Personal Details" : "Account Details"}
        </h1>
      </div>
    </header>
  );
};

export default RegisterHeader;
