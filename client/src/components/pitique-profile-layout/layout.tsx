import PitiqueProfileDetails from "./pitique-profile-details";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPen } from "@fortawesome/free-solid-svg-icons";

import Header from "../common/header";
import PitiqueProfilePackage from "./pitique-profile-package";
import PitiqueProfilePortfolio from "./pitique-profile-portfolio";

const PitiqueProfileLayout = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showPackage, setShowPackage] = useState(false);

  const handleBack = () => {
    if (showPortfolio) {
      setShowPortfolio(false);
      setShowPackage(false);
    } else {
      window.location.href = "/dashboard/pitique";
    }
  };
  return (
    <div className="poppins">
      <Header className="flex items-center w-full gap-16 relative">
        <button className="p-5 absolute" onClick={handleBack}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className="w-full flex justify-center   ">
          <h1 className=" text-xl text-white font-bold ">
            {showPortfolio ? "Portfolio" : "Personal Details "}
          </h1>
        </div>
      </Header>

      {showPortfolio ? (
        <div className="p-4 flex justify-center">
          <PitiqueProfilePortfolio />
        </div>
      ) : showPackage ? (
        <PitiqueProfilePackage />
      ) : (
        <PitiqueProfileDetails
          setShowPortfolio={setShowPortfolio}
          setShowPackage={setShowPackage}
        />
      )}
    </div>
  );
};

export default PitiqueProfileLayout;
