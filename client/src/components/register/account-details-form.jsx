import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import api from "../../helper/api";
const AccountDetailsForm = ({ setUser, user }) => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isChecked, setChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleConfirmPassword = (e) => {
    const { value } = e.target;
    if (value != user.password) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const areAllFieldsEmpty = () => {
    return Object.values(user).every((value) => !value);
  };

  const handleRegister = async () => {
    const { data } = await api.post("/realtors", user);

    if (data) {
      window.location.href = "/login";
    } else {
      //TODO: change this to swal2
      alert("Something went wrong");
    }
  };

  return (
    <form
      className="flex flex-col gap-3 p-5 justify-between h-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-3">
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
            <span className="font-bold">Terms and Conditions </span>
          </p>
        </div>
        <button
          className="mt-5 p-3 w-full bg-cyan-400 text-white font-bold rounded-sm shadow-md"
          onClick={handleRegister}
          disabled={!isChecked || areAllFieldsEmpty() || !passwordMatch}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default AccountDetailsForm;
