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
  const [showModal, setShowModal] = useState(false);

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
      {showModal ? (
        <div className="w-full fixed h-screen flex justify-center items-center backdrop-blur-sm">
          <div className="w-[70%]  border border-gray-300 flex flex-col gap-6 bg-white rounded-md p-5">
            <div className="flex justify-center items-center">
              <h1 className="text-sm font-bold">Aerial Photography</h1>
            </div>
            <input
              type="text"
              name="price"
              placeholder="Price (Php)"
              id=""
              className="p-1 bg-gray-100 "
            />

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold">Offer Service</label>
              <input
                type="checkbox"
                name="price"
                placeholder="Price (Php)"
                id=""
                className="p-1 bg-gray-100 "
              />
            </div>

            <div className="flex justify-center gap-3 ">
              <button
                className="p-1 px-4 bg-gray-200 text-gray-500 rounded-md"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </button>

              <button className="p-1 px-4 bg-cyan-400 text-white rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

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
        <PitiqueProfilePackage setShowModal={setShowModal} />
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
