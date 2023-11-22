import RealtorCard from "../realtor-homepage-layout/realtor-card";
import RealtorTransactionCard from "./realtor-history-card";
import RealtorTransactionCompeleted from "./realtor-transaction-completed";

const RealtorTransactionPending = () => {
  return (
    <div className="">
      <h1 className="text-xl text-cyan-500 font-bold">
        Pending Booking Request
      </h1>
      <p className="text-cyan-500">May 2023</p>

      <div className="w-full bg-gray-200 p-3 flex justify-between items-center mt-3 rounded-md">
        <div className="flex gap-3 items-center">
          <img
            className="w-9 h-9  rounded-full "
            src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
          />
          <div>
            <h1 className="font-bold text-sm">Php 11,000.00</h1>
            <p className="text-sm">John Doe</p>
            <p className="text-sm">Aerial Videography + Edit - May 13</p>
          </div>
        </div>

        <div className="">
          <div className="flex justify-end flex-col gap-1">
            <button className="text-white bg-cyan-500 py-1 px-1.5 text-sm">
              Edit
            </button>
            <button className="text-white bg-cyan-500 py-1 px-1.5 text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <RealtorTransactionCompeleted />
    </div>
  );
};

export default RealtorTransactionPending;
