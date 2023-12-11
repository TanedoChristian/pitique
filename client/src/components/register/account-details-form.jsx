import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../helper/api";
const AccountDetailsForm = ({ setUser, user }) => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    if (value != user.pass) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleRegisterPitiquer = () => {
    api
      .post("/realtors", user)
      .then((data) => {
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const areAllFieldsEmpty = () => {
    return Object.values(user).every((value) => !value);
  };

  const handleRegister = async () => {
    navigate("/register/payment", { state: user });
  };

  return (
    <form
      className="flex flex-col gap-3 p-5 justify-between h-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-3">
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
          type="text"
          placeholder="Email"
          name="email"
          className="p-3 bg-gray-200 w-full rounded-sm"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="pass"
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
      </div>
      <div>
        <div className="flex gap-3">
          <input
            type="checkbox"
            name=""
            id=""
            onChange={(e) => setChecked(e.target.checked)}
          />
          <p>
            I agree to the
            <span className="font-bold"> Terms and Conditions </span>
          </p>
        </div>

        {user.type == "realtor" ? (
          <button
            className="mt-5 p-3 w-full bg-cyan-400 text-white font-bold rounded-sm shadow-md"
            onClick={handleRegisterPitiquer}
            disabled={!isChecked || areAllFieldsEmpty() || !passwordMatch}
          >
            Register
          </button>
        ) : (
          <button
            className="mt-5 p-3 w-full bg-cyan-400 text-white font-bold rounded-sm shadow-md"
            onClick={handleRegister}
            disabled={!isChecked || areAllFieldsEmpty() || !passwordMatch}
          >
            Pay
          </button>
        )}
      </div>
    </form>
  );
};

export default AccountDetailsForm;
