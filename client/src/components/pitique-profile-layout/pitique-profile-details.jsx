import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import api from "../../helper/api";
import { useEffect, useState } from "react";

const PitiqueProfileDetails = ({
  setShowPortfolio,
  setShowPackage,
  user,
  pitiquerId,
}) => {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const [showFavorite, setShowFavorite] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(
          `/realtors/${id}/favorite/${pitiquerId}`
        );

        if (data) {
          setShowFavorite(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="poppins">
      <div className="w-full flex justify-center ">
        <div className="  ml-5 w-[80%]  flex justify-center p-5 border-b-2 border-gray-300">
          <img
            className="w-48 h-48 rounded-full object-cover "
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <span className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faPen}
              className="text-white font-bold text-lg "
            />
          </span>
        </div>
      </div>
      <div className="p-5 w-full flex flex-col gap-3 ">
        <button
          className="py-2 px-6 bg-cyan-400 text-white "
          onClick={() => {
            setShowPortfolio(true);
          }}
        >
          View Portfolio
        </button>

        {user && user.id == pitiquerId && (
          <button
            className="py-2 px-6 bg-cyan-400 text-white"
            onClick={() => {
              setShowPackage(true);
            }}
          >
            View Package
          </button>
        )}

        {/* Check if the current user is a pitiquer */}
        {user === null && id && showFavorite ? (
          <button
            className="py-2 px-6 bg-green-400 text-white"
            onClick={async () => {
              try {
                await api.post(`/realtors/${id}/favorite/${pitiquerId}`);
                setShowFavorite(false);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Add to Favorite Pitiquer
          </button>
        ) : (
          <button
            className="py-2 px-6 bg-red-400 text-white"
            onClick={async () => {
              try {
                await api.delete(`/realtors/${id}/favorite/${pitiquerId}`);

                setShowFavorite(true);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Unfavorite Pitiquer
          </button>
        )}
      </div>
    </div>
  );
};

export default PitiqueProfileDetails;
