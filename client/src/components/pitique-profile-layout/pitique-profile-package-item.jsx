import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { formattedAmount } from "../../helper/currencyHelper";

const PitiqueProfilePackageItem = ({
  setShowModal,
  info,
  setPackage,
  packageType,
}) => {
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
                <h1 className="font-bold">{info.pkg_desc}</h1>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setPackage(info, packageType);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-sm text-cyan-500"
                  />
                </button>
              </div>

              <p>{formattedAmount(info.min_price ?? 0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitiqueProfilePackageItem;
