import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/common/header";
import { faChevronLeft, faPen } from "@fortawesome/free-solid-svg-icons";

const RealtorAccount = () => {
  return (
    <div className="poppins">
      <Header className="flex items-center w-full gap-16">
        <div className="p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </div>

        <h1 className="flex-grow text-xl text-white font-bold ">
          Personal Details
        </h1>
      </Header>

      <div className="w-full flex justify-center ">
        <div className="  ml-5 w-full  flex justify-center p-5 border-b-2 border-gray-300">
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

      <form className="flex flex-col gap-3 p-5 justify-between h-full">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="First name"
            className="p-3 bg-gray-200 w-full rounded-sm"
          />

          <input
            type="password"
            placeholder="Middle name"
            className="p-3 bg-gray-200 w-full rounded-sm "
          />

          <input
            type="password"
            placeholder="Last name"
            className="p-3 bg-gray-200 w-full rounded-sm "
          />

          <label>Birthday</label>
          <input
            type="date"
            placeholder="Birthday"
            className="p-3 bg-gray-200 w-full rounded-sm text-gray-700 "
          />
        </div>
        <div>
          <button className="mt-5 p-3 w-full border-2 text-lg bg-cyan-500 text-white font-bold rounded-sm shadow-md">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default RealtorAccount;
