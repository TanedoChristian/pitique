import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const PersonalDetailsForm = ({ setShowAccountForm, setUser, user }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="p-5">
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
              value="realtor"
              name="type"
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-medium text-gray-900 p-2"
            >
              Realtor
            </label>
          </div>
        </div>
      </div>
      {user.type !== undefined && (
        <form
          className="flex flex-col gap-3 p-5 justify-between h-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First name"
              name="fname"
              onChange={handleChange}
              className="p-3 bg-gray-200 w-full rounded-sm"
            />

            <input
              type="text"
              placeholder="Middle name"
              name="mname"
              onChange={handleChange}
              className="p-3 bg-gray-200 w-full rounded-sm "
            />

            <input
              type="text"
              placeholder="Last name"
              name="lname"
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

            {user.type === "realtor" && (
              <>
                <label>Birthday</label>

                <input
                  type="date"
                  placeholder="Birthday"
                  onChange={handleChange}
                  name="birthdate"
                  className="p-3 bg-gray-200 w-full rounded-sm text-gray-700 "
                />
              </>
            )}
          </div>
          <div>
            <button
              className="mt-5 p-3 w-full border-2 text-lg border-cyan-400 font-bold rounded-sm shadow-md"
              onClick={() => {
                setShowAccountForm(true);
              }}
            >
              Continue
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default PersonalDetailsForm;
