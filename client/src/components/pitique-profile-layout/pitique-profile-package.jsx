import PitiqueProfilePackageItem from "./pitique-profile-package-item";
import { packageItems } from "../../helper/package-item";
import { useEffect, useState } from "react";
import api from "../../helper/api";

const PitiqueProfilePackage = () => {
  const [showModal, setShowModal] = useState(false);
  const [packageInfo, setPackageInfo] = useState({});
  const [packages, setPackages] = useState([{}]);
  const [flag, setFlag] = useState(false);

  // TODO: change this to dynamic
  const pitiquerId = 1;
  useEffect(() => {
    const fetch = async () => {
      const { data } = await api.get(`/packages/pitiquer/${pitiquerId}`);
      setPackages(data);
    };

    fetch();
  }, [flag]);

  const onClickPackageInfo = (info, type) => {
    setPackageInfo((prevState) => {
      return {
        ...prevState,
        packageId: info.id ?? -1, // -1 = its not from the table
        pkg_desc: info.pkg_desc,
        min_price: info.min_price,
        hasphoto: type === "photo",
        hasvid: type === "video",
        hasamnty: type === "amenity",
        isavailable: info.isavailable ?? false,
        isvisible: info.isvisible ?? false,
        // TODO: change this if the pitiquer is ready
        ptqr_id: 1,
      };
    });
  };

  const handleSubmit = async () => {
    const { data } = await api.post("/packages", packageInfo);

    if (data) {
      setFlag(!flag);
      setShowModal(false);
    }
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
              value={packageInfo.min_price ?? 0}
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
                checked={packageInfo.isavailable}
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
      {packageItems.map((item, index) => {
        const _item = packages.find((i) => i.pkg_desc === item.pkg_desc);

        return (
          <PitiqueProfilePackageItem
            setShowModal={setShowModal}
            info={_item === undefined ? item : _item}
            key={index}
            setPackage={onClickPackageInfo}
            packageType={item.type}
          />
        );
      })}

      <div>
        <button className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md">
          NEXT
        </button>
      </div>
    </>
  );
};

export default PitiqueProfilePackage;
