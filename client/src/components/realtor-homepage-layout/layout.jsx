import PitiquerCard from "./pitiquer-card";

const RealtorLayout = ({ pitiquers }) => {
  return (
    <div className="w-full p-3 flex flex-col items-center  h-[90vh] overflow-auto">
      {pitiquers.length !== 0 ? (
        pitiquers.map((pitiquer, index) => (
          <PitiquerCard key={index} pitiquer={pitiquer} />
        ))
      ) : (
        <p>No pitiquers package available yet.</p>
      )}
    </div>
  );
};

export default RealtorLayout;
