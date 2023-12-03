import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import api from "../../helper/api";
import { useEffect, useRef, useState } from "react";
import { showSuccessMessage } from "../../helper/messageHelper";
import { Link } from "react-router-dom";

const PitiqueProfileDetails = ({
  setShowPortfolio,
  setShowPackage,
  user,
  pitiquerId,
}) => {
  const realtorUser = JSON.parse(localStorage.getItem("user"));
  const id = realtorUser ? realtorUser.id : undefined;
  const [showFavorite, setShowFavorite] = useState(true);
  const [profileImg, setProfileImg] = useState();
  const [name, setName] = useState();
  const [flag, setFlag] = useState(false);
  const fileInputRef = useRef(null);

  //Retreiving the favorite
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

  // Retreiving the image
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/pitiquers/${pitiquerId}`);

        if (data) {
          setProfileImg(data.prof_img);
          setName(`${data.fname} ${data.mname} ${data.lname}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [flag]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("prof_img", file);
      formData.append("ptqr_id", pitiquerId);

      try {
        const { data } = await api.put("/pitiquers/edit/picture", formData);

        if (data) {
          showSuccessMessage(
            "Success",
            "Updated profile picture successfully!"
          );
          setFlag(!flag);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="poppins">
      <div className="w-full flex justify-center ">
        <div className="  ml-5 w-[80%]  flex justify-center p-5 border-b-2 border-gray-300">
          <img
            className="w-48 h-48 rounded-full object-cover "
            src={
              profileImg
                ? `data:image/png;base64,${profileImg}`
                : "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D}"
            }
          />
          {/* Hidden file input */}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
          />
          {user && user.id == pitiquerId && (
            <span
              className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="text-white font-bold text-lg "
              />
            </span>
          )}
        </div>
      </div>

      <div className="p-5 w-full flex flex-col gap-2x ">
        <p className="text-gray-400 text-center">Pitiquer</p>
        <p className="capitalize font-semibold text-center text-2xl  mb-6 under">
          {name}
        </p>
        <button
          className="py-2 px-6 bg-cyan-400 text-white mb-3"
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
        <Link
          className="py-2 px-6 bg-orange-400 text-white text-center"
          to={`/booking/pitique/all/${pitiquerId}`}
        >
          All Bookings
        </Link>

        {/* Check if the current user is a realtor */}
        {realtorUser !== null &&
          (id !== undefined && showFavorite ? (
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
          ))}
      </div>
    </div>
  );
};

export default PitiqueProfileDetails;
