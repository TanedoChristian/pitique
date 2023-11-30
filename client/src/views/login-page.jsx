import { useState } from "react";
import api from "../helper/api";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  showErrorMessage,
  showInfoMessage,
  showLoadingMessage,
  showSuccessMessage,
} from "../helper/messageHelper";
const LoginPage = () => {
  const [type, setType] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoadingMessage("Logging in...");
    if (type !== "admins") {
      try {
        const { data } = await api.post(`/${type}/login`, user);

        if (data.user.status !== "active") {
          showInfoMessage(
            "Alert!",
            "Account is suspended/terminated! Please contact an admin."
          );
        } else if (data) {
          showSuccessMessage("Logging in successfully!");

          localStorage.setItem(
            `${type === "pitiquers" ? "p-user" : "user"}`,
            JSON.stringify(data.user)
          );
          window.location.href =
            type === "realtors" ? "/dashboard" : "/dashboard/pitique";
        } else {
          showErrorMessage("Account not found!");
        }
      } catch (e) {
        if (e.response.status === 401) showErrorMessage("Unauthorized!");
        else showErrorMessage("Error!", "Account not found!");
      }
    } else {
      try {
        // TODO: Temporary
        if (user.email === "jdoe@gmail.com" && user.password === "asd") {
          showSuccessMessage("Logging in successfully!");

          window.location.href = "/admin";
          return;
        }

        const { data } = await api.post(`/admins/login`, user);

        if (data.user.status !== "active") {
          showInfoMessage(
            "Alert!",
            "Account is suspended/terminated! Please contact an admin."
          );
        } else if (data) {
          localStorage.setItem("admin", JSON.stringify(data.user));
          showSuccessMessage("Logging in successfully!");

          window.location.href = "/admin";
        } else {
          showErrorMessage("Account not found!");
        }
      } catch (e) {
        if (e.response.status === 401) showErrorMessage("Unauthorized!");
        else showErrorMessage("Error!", "Account not found!");
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-between flex-col poppins tracking-wide">
      <div className="h-[40vh] w-full  bg-cyan-400 rounded-b-[50%] flex items-center  justify-center ">
        <h1 className=" text-5xl font-bold tracking-wide  text-white poppins">
          Pitique
        </h1>
      </div>

      {type === "" ? (
        <div className="h-[50vh] flex justify-center">
          <div>
            {" "}
            <p className="text-center mb-3">Login as</p>
            <div className="w-64 relative">
              <select
                className="block appearance-none w-full bg-cyan-500 border border-gray-400 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-cyan-500 focus:border-cyan-500"
                id="userType"
                name="userType"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="pitiquers">Pitiquer</option>
                <option value="realtors">Realtor</option>
                <option value="admins">Admin</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold">Login </h1>
            <input
              type="text"
              placeholder="Email"
              className="p-3 bg-gray-200 w-full rounded-sm"
              onChange={handleChange}
              name="email"
            />

            <input
              type="password"
              placeholder="Password"
              className="p-3 bg-gray-200 w-full rounded-sm "
              name="password"
              onChange={handleChange}
            />

            <button className="mt-5 p-3 w-full bg-cyan-400 text-white font-bold rounded-sm shadow-md">
              Login
            </button>
          </form>
          <button
            onClick={() => setType("")}
            className="mt-5 p-3 w-full text-black font-bold text-sm hover:text-cyan-500"
          >
            Select another type
          </button>
        </div>
      )}
      <Link
        to="/register"
        className="mt-5 p-3 w-full text-black font-bold text-sm hover:text-cyan-500 text-center"
      >
        Register
      </Link>
    </div>
  );
};

export default LoginPage;
