import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminSideNav from "../components/common/admin-sidenav";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import api from "../helper/api";
import { showSuccessMessage } from "../helper/messageHelper";

const AdminCreateAccount = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [user, setUser] = useState();
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    if (value !== user.pass) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.type === "pitiquer") {
      try {
        const { data } = await api.post("/pitiquers", user);

        if (data) {
          showSuccessMessage(
            "Success",
            user.type + " has been created successfully!"
          );

          setUser({});
        }
      } catch (error) {
        console.error(error);
      }
    } else if (user.type === "admin") {
      try {
        const { data } = await api.post("/admins", user);

        if (data) {
          showSuccessMessage(
            "Success",
            user.type + " has been created successfully!"
          );
          setUser({});
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Choose account type!");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-screen">
      {showSideNav ? <AdminSideNav setShowNav={setShowNav} /> : ""}
      <Header className="flex items-center p-5 gap-5">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-center">Create Account</h1>
        </div>
      </Header>
      <form className="flex flex-col gap-3 p-5  h-full" onSubmit={handleSubmit}>
        <div>Select User Type:</div>
        <div className="">
          <div className="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value="pitiquer"
              name="type"
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />

            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 p-2"
            >
              Pitiquer
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value="admin"
              name="type"
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-medium text-gray-900 p-2"
            >
              Admin
            </label>
          </div>
        </div>
        {user !== undefined && (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First name"
              name="fname"
              onChange={handleChange}
              className="p-3 bg-gray-200 w-full rounded-sm"
              value={user.fname ?? ""}
            />

            <input
              type="text"
              placeholder="Middle name"
              name="mname"
              onChange={handleChange}
              className="p-3 bg-gray-200 w-full rounded-sm "
              value={user.mname ?? ""}
            />

            <input
              type="text"
              placeholder="Last name"
              name="lname"
              onChange={handleChange}
              className="p-3 bg-gray-200 w-full rounded-sm "
              value={user.lname ?? ""}
            />

            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              className="p-3 bg-gray-200 w-full rounded-sm "
              value={user.phone ?? ""}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="p-3 bg-gray-200 w-full rounded-sm"
              onChange={handleChange}
              value={user.email ?? ""}
            />
            {user.type === "pitiquer" && (
              <>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  className="p-3 bg-gray-200 w-full rounded-sm"
                  onChange={handleChange}
                  value={user.province ?? ""}
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="p-3 bg-gray-200 w-full rounded-sm"
                  onChange={handleChange}
                  value={user.city ?? ""}
                />
              </>
            )}

            <input
              type="password"
              placeholder="Password"
              name="pass"
              className="p-3 bg-gray-200 w-full rounded-sm "
              onChange={handleChange}
              onBlur={handleConfirmPassword}
              value={user.pass ?? ""}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 bg-gray-200 w-full rounded-sm"
              onBlur={handleConfirmPassword}
            />
            <p className="text-xs text-red-500">
              {!passwordMatch ? "Password does not match" : ""}
            </p>
            <div className="flex w-full justify-center gap-2"></div>

            <button
              disabled={!passwordMatch}
              className="mt-10 mb-5 p-3 w-full border-2 text-lg bg-cyan-500 text-white font-bold rounded-sm shadow-md"
            >
              Create Account
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminCreateAccount;
