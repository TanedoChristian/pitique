import PitiqueProfilePackageItem from "./pitique-profile-package-item";
import { packageItems } from "../../helper/package-item";
import { useState } from "react";
import api from "../../helper/api";

const PitiqueProfilePackage = () => {
  const [showModal, setShowModal] = useState(false);
  const [packageInfo, setPackageInfo] = useState({});

  const onClickPackageInfo = (info) => {
    setPackageInfo((prevState) => {
      return {
        ...prevState,
        pkg_desc: info.title,
        min_price: info.price,
        hasphoto: info.type === "photo",
        hasvid: info.type === "video",
        hasamnty: info.type === "amenity",
        isavailable: info.availability,
        isvisible: info.availability,
        // TODO: change this if the pitiquer is ready
        ptqr_id: 1,
      };
    });
  };

  const handleSubmit = async () => {
    const { data } = await api.post("/packages", packageInfo);

    console.log(data);
  };

  return (
    <>
      {showModal ? (
        <div className="w-full fixed h-screen flex justify-center items-center backdrop-blur-sm">
          <div className="w-[70%]  border border-gray-300 flex flex-col gap-6 bg-white rounded-md p-5">
            <div className="flex justify-center items-center">
              <h1 className="text-sm font-bold">
                {packageInfo.pkg_desc && packageInfo.pkg_desc}
              </h1>
            </div>
            <input
              type="number"
              name="price"
              placeholder="Price (Php)"
              id=""
              className="p-1 bg-gray-100 "
              onChange={(e) =>
                setPackageInfo((prevState) => ({
                  ...prevState,
                  min_price: e.target.value,
                }))
              }
            />

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold">Offer Service</label>
              <input
                type="checkbox"
                name="price"
                placeholder="Price (Php)"
                id=""
                className="p-1 bg-gray-100 "
                onChange={(e) =>
                  setPackageInfo((prevState) => ({
                    ...prevState,
                    isavailable: e.target.checked,
                    isvisible: e.target.checked,
                  }))
                }
              />
            </div>

            <div className="flex justify-center gap-3 ">
              <button
                className="p-1 px-4 bg-gray-200 text-gray-500 rounded-md"
                onClick={() => {
                  setShowModal(false);
                  setPackageInfo({});
                }}
              >
                Cancel
              </button>

              <button
                className="p-1 px-4 bg-cyan-400 text-white rounded-md"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {packageItems.map((item) => (
        <PitiqueProfilePackageItem
          setShowModal={setShowModal}
          info={item}
          key={item.id}
          setPackage={onClickPackageInfo}
        />
      ))}

      <div>
        <button className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md">
          NEXT
        </button>
      </div>
    </>
  );
};

export default PitiqueProfilePackage;
