import Header from "../common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import RealtorTransactionPending from "./realtor-transaction-pending";

const RealtorHistoryLayout = () => {
  return (
    <div>
      <Header className={`flex items-center w-full text-center relative`}>
        <div className="absolute flex p-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </div>
        <div className=" w-full">
          <h1 className="flex-grow text-xl text-white font-bold ">
            Transaction History
          </h1>
        </div>
      </Header>

      <div className="p-3">
        <RealtorTransactionPending />
      </div>
    </div>
  );
};

export default RealtorHistoryLayout;
