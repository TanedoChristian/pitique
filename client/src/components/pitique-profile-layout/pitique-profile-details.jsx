import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPen } from "@fortawesome/free-solid-svg-icons";

const PitiqueProfileDetails = ({ setShowPortfolio, setShowPackage }) => {
  return (
    <div className="poppins">
      <div className="w-full flex justify-center ">
        <div className="  ml-5 w-[80%]  flex justify-center p-5 border-b-2 border-gray-300">
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
      <div className="p-5 w-full flex flex-col gap-3 ">
        <button
          className="py-2 px-6 bg-cyan-400 text-white "
          onClick={() => {
            setShowPortfolio(true);
          }}
        >
          View Portfolio
        </button>

        <button
          className="py-2 px-6 bg-cyan-400 text-white"
          onClick={() => {
            setShowPackage(true);
          }}
        >
          View Package
        </button>
      </div>
    </div>
  );
};

export default PitiqueProfileDetails;
