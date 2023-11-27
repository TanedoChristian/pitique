import RealtorTransactionCard from "./realtor-history-card";

const RealtorTransactionCompeleted = ({ data }) => {
  return (
    data.length !== 0 && (
      <div className="mt-3">
        <h1 className="text-xl text-cyan-500 font-bold">Completed</h1>

        {data.map((booking) => (
          <RealtorTransactionCard
            booking={booking}
            key={booking.id}
            setShow={setShow}
            setPitiquer={setPitiquer}
          />
        ))}
      </div>
    )
  );
};

export default RealtorTransactionCompeleted;
