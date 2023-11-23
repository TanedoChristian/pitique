import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PitiqueProfilePackageItem = ({ setShowModal, title }) => {
  return (
    <div>
      <div className="w-full justify-center flex flex-col gap-3 p-3">
        <div className="bg-gray-200 shadow-md p-3">
          <div className="flex gap-3">
            <img
              className="w-[150px] h-[70px] rounded-xl"
              src="https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <div>
              <div className="flex gap-5 items-center">
                <h1 className="font-bold">{title}</h1>
                <button
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-sm text-cyan-500"
                  />
                </button>
              </div>

              <p>Php 9,000.00</p>
            </div>
          </div>
        </div>

        <div>
          <button className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md">
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PitiqueProfilePackageItem;
