import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../helper/api";
import Header from "../components/common/header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import RealtorCard from "../components/realtor-homepage-layout/realtor-card";

const PitiquerSearchPage = () => {
  const { name } = useParams();
  const [pitiquers, setPitiquers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/pitiquers/name/${name}`);
        setPitiquers(data);
      } catch (error) {
        console.error("Error occur", error);
      }
    };

    fetch();
  }, [name]);

  return (
    <div>
      <Header className={`flex items-center w-full text-center relative`}>
        <div className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </div>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">
            Result of "{name}"
          </h1>
        </div>
      </Header>

      <div className="p-4">
        {pitiquers.length === 0 ? (
          <div>No found!</div>
        ) : (
          <div className="w-full p-3 flex flex-col items-center  h-[90vh] overflow-auto">
            {pitiquers.map((pitiquer, index) => (
              <RealtorCard key={index} pitiquer={pitiquer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PitiquerSearchPage;
