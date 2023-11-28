import React, { useEffect, useRef, useState } from "react";
import Header from "../components/common/header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import api from "../helper/api";

const RealtorProfilePage = () => {
  const [user, setUser] = useState();
  const [flag, setFlag] = useState(false);
  const [userInfo, setUserInfo] = useState({
    rltr_id: 0,
    fname: "",
    mname: "",
    lname: "",
    birthdate: "",
    prof_img: "",
  });
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    setUser(_user);

    setUserInfo({
      rltr_id: _user.rltr_id,
      fname: _user.fname,
      mname: _user.mname,
      lname: _user.lname,
      birthdate: _user.birthdate,
      prof_img: _user.prof_img,
    });
  }, [flag]);

  const fileInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const _name = {
      fname: userInfo.fname,
      lname: userInfo.lname,
      mname: userInfo.mname,
      birthdate: userInfo.birthdate,
      rltr_id: userInfo.rltr_id,
    };
    try {
      const { data } = await api.put("/realtors/edit/name", _name);

      if (data) {
        alert("Updated Succesfully!");

        const newUser = {
          ...user,
          fname: _name.fname,
          lname: _name.lname,
          mname: _name.mname,
          birthdate: _name.birthdate,
        };
        //   save again
        localStorage.setItem("user", JSON.stringify(newUser));
        setFlag(!flag);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePhoto = async (e) => {
    const pic = e.target.files[0];
    const formData = new FormData();
    formData.append("rltr_id", user.id);
    formData.append("prof_img", pic);

    try {
      const { data } = await api.put("/realtors/edit/picture", formData);

      if (data) {
        alert("Updated Succesfully!");

        const newUser = {
          ...user,
          prof_img: data.image,
        };
        //   save again
        localStorage.setItem("user", JSON.stringify(newUser));
        setFlag(!flag);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  if (user === null || user === undefined) return <div>Forbidden Page</div>;

  return (
    <div>
      <Header className="flex items-center w-full gap-16 relative">
        <button className="p-5 absolute" onClick={handleBack}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className="w-full flex justify-center   ">
          <h1 className=" text-xl text-white font-bold ">
            {"PERSONAL DETAILS"}
          </h1>
        </div>
      </Header>
      <div className="w-full justify-center ">
        <div className="  ml-5 w-[80%]  flex justify-center p-5 border-b-2 border-gray-300">
          <img
            className="w-48 h-48 rounded-full object-cover "
            src={
              user.prof_img
                ? `data:image/png;base64,${user.prof_img}`
                : "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D}"
            }
          />
          {/* Hidden file input */}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            name="prof_img"
            onChange={handleChangePhoto}
          />
          {
            <span
              className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="text-white font-bold text-lg "
              />
            </span>
          }
        </div>
        <form
          className="flex flex-col gap-3 p-5 justify-between h-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="p-3 bg-gray-200 w-full rounded-sm"
              name="fname"
              value={userInfo.fname}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Middle Name"
              name="mname"
              onChange={handleChange}
              className="p-3 bg-gray-200 w-full rounded-sm"
              value={userInfo.mname}
            />

            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              onChange={handleChange}
              value={userInfo.lname}
              className="p-3 bg-gray-200 w-full rounded-sm"
            />
            <label htmlFor="date">Birthdate:</label>
            <input
              type="date"
              value={
                userInfo.birthdate
                  ? new Date(userInfo.birthdate).toISOString().slice(0, 10)
                  : new Date()
              }
              name="birthdate"
              placeholder="BirthDate"
              className="p-3 bg-gray-200 w-full rounded-sm"
              onChange={handleChange}
            />

            <button className=" text-xl mt-5 p-3 w-full border-2 border-cyan-500 text-cyan-500  font-bold rounded-sm shadow-md">
              SAVE CHANGES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RealtorProfilePage;
