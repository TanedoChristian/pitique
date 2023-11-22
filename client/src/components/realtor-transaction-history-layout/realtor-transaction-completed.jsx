import RealtorCard from "../realtor-homepage-layout/realtor-card";
import RealtorTransactionCard from "./realtor-history-card";

const RealtorTransactionCompeleted = () => {
  return (
    <div className="mt-3">
      <h1 className="text-xl text-cyan-500 font-bold">Completed</h1>
      <p className="text-cyan-500">May 2023</p>

      <RealtorTransactionCard />
      <RealtorTransactionCard />
      <RealtorTransactionCard />
    </div>
  );
};

export default RealtorTransactionCompeleted;
