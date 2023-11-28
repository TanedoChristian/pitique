import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminSideNav from "../components/common/admin-sidenav";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const AdminCreateAccount = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    if (value != user.password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleChange = () => {};
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
      <form
        className="flex flex-col gap-3 p-5 justify-between h-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="First name"
            name="firstname"
            onChange={handleChange}
            className="p-3 bg-gray-200 w-full rounded-sm"
          />

          <input
            type="text"
            placeholder="Middle name"
            name="middlename"
            onChange={handleChange}
            className="p-3 bg-gray-200 w-full rounded-sm "
          />

          <input
            type="text"
            placeholder="Last name"
            name="lastname"
            onChange={handleChange}
            className="p-3 bg-gray-200 w-full rounded-sm "
          />

          <input
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
            className="p-3 bg-gray-200 w-full rounded-sm "
          />

          <label>Birthday</label>
          <input
            type="date"
            placeholder="Birthday"
            onChange={handleChange}
            name="birthday"
            className="p-3 bg-gray-200 w-full rounded-sm text-gray-700 "
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-3 bg-gray-200 w-full rounded-sm"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-3 bg-gray-200 w-full rounded-sm "
            onChange={handleChange}
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
          <div class="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />

            <label
              for="default-radio-1"
              class="ms-2 text-sm font-medium text-gray-900"
            >
              Pitiquer
            </label>
          </div>

          <div class="flex items-center">
            <input
              checked
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              for="default-radio-2"
              class="ms-2 text-sm font-medium text-gray-900 "
            >
              Admin
            </label>
          </div>
          <button className="mt-10 p-3 w-full border-2 text-lg bg-cyan-500 text-white font-bold rounded-sm shadow-md">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateAccount;
