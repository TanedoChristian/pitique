import { useState } from "react";
import api from "../helper/api";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/realtors/login", user);
  };

  return (
    <div className="w-full h-screen flex justify-between flex-col poppins tracking-wide">
      <div className="h-[40vh] w-full  bg-cyan-400 rounded-b-[50%] flex items-center  justify-center ">
        <h1 className=" text-5xl font-bold tracking-wide  text-white poppins">
          Pitique
        </h1>
      </div>

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
      </div>
    </div>
  );
};

export default LoginPage;
